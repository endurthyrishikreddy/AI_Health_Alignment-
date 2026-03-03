import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log('=== SUPABASE CONFIG CHECK ===');
console.log('SUPABASE_URL:', supabaseUrl ? '✓ Set' : '✗ MISSING');
console.log('SUPABASE_ANON_KEY:', supabaseAnonKey ? '✓ Set' : '✗ MISSING');

let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ CRITICAL: Missing Supabase environment variables');
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✓ Supabase client initialized successfully');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if Supabase is configured
  if (!supabase) {
    console.error('❌ Supabase client not initialized - missing env variables');
    return res.status(500).json({ 
      error: 'Server configuration error - Supabase not initialized',
      details: 'Missing SUPABASE_URL or SUPABASE_ANON_KEY'
    });
  }

  try {
    const { name, organization, role, email, message } = req.body;

    console.log('📝 Form submission received:', { name, email, role });

    // Validate required fields
    if (!name || !email) {
      console.warn('⚠️ Validation failed: Missing name or email');
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('⚠️ Validation failed: Invalid email format');
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Insert into Supabase (DO NOT set created_at - let Supabase auto-generate it)
    console.log('🔄 Attempting to insert contact into Supabase...');
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          organization: organization || null,
          role: role || null,
          email,
          message: message || null
        }
      ])
      .select();

    if (error) {
      console.error('❌ SUPABASE ERROR:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return res.status(500).json({ 
        error: 'Failed to save contact information',
        details: error.message,
        code: error.code
      });
    }

    console.log('✓ Contact saved successfully:', data);

    return res.status(201).json({
      success: true,
      message: 'Contact information saved successfully. We will get back to you soon!'
    });
  } catch (error) {
    console.error('❌ UNEXPECTED ERROR:', error);
    return res.status(500).json({ 
      error: 'Failed to process contact information',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

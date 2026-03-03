import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { validateContactRequest, checkRateLimit, getClientIp } from './utils/security.js';

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

/**
 * Security-hardened contact form endpoint
 * Protections:
 * - Input validation & sanitization (XSS prevention)
 * - Rate limiting
 * - Request size limit
 * - Email validation
 * - CORS headers
 * - SQL injection protected (via Supabase ORM)
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  // STRICT: Only allow POST requests - reject all others
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      error: 'Method not allowed - only POST requests are accepted'
    });
  }

  // Check if Supabase is configured
  if (!supabase) {
    console.error('❌ Supabase client not initialized - missing env variables');
    return res.status(500).json({
      error: 'Server error - please try again later',
    });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(req);

    // Check rate limit (5 requests per hour per IP)
    if (checkRateLimit(clientIp, 5, 3600000)) {
      console.warn(`🚫 Rate limit exceeded for IP: ${clientIp}`);
      return res.status(429).json({
        error: 'Too many requests. Please try again in an hour.',
      });
    }

    // Check request size (10KB limit)
    const contentLength = parseInt(req.headers['content-length'] || '0', 10);
    if (contentLength > 10240) {
      console.warn(`⚠️ Request too large: ${contentLength} bytes from ${clientIp}`);
      return res.status(413).json({
        error: 'Request payload too large',
      });
    }

    // Validate and sanitize request body
    const validation = validateContactRequest(req.body);

    if (!validation.valid) {
      console.warn('⚠️ Validation failed:', validation.errors);
      return res.status(400).json({
        error: 'Invalid input',
        details: validation.errors[0], // Return only first error to avoid info leakage
      });
    }

    const { name, email, organization, role, message } = validation.data!;

    console.log('📝 Form submission received (sanitized):', {
      name: name.substring(0, 20) + '...',
      email: email.substring(0, 10) + '***',
      role,
    });

    // Insert into Supabase
    console.log('🔄 Attempting to insert contact into Supabase...');
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          organization,
          role,
          email,
          message,
        },
      ])
      .select();

    if (error) {
      console.error('❌ SUPABASE ERROR:', {
        message: error.message,
        code: error.code,
      });
      return res.status(500).json({
        error: 'Failed to save contact information - please try again later',
      });
    }

    console.log('✓ Contact saved successfully from IP:', clientIp);

    return res.status(201).json({
      success: true,
      message: 'Contact information saved successfully. We will get back to you soon!',
    });
  } catch (error) {
    console.error('❌ UNEXPECTED ERROR:', error);
    return res.status(500).json({
      error: 'Failed to process contact information - please try again later',
    });
  }
}

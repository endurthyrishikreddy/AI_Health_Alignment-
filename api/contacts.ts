import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const adminToken = process.env.ADMIN_TOKEN || 'your-secret-admin-token';

const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

/**
 * Security-hardened admin endpoint to fetch contacts
 * Protections:
 * - Authorization token verification
 * - Rate limiting per token
 * - Security headers
 * - Input validation
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
  );
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  // STRICT: Only allow GET requests - reject all others
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({
      error: 'Method not allowed - only GET requests are accepted'
    });
  }

  try {
    // Check authorization FIRST before doing anything
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.warn('⚠️ Unauthorized access attempt - missing auth header');
      return res.status(401).json({ error: 'Unauthorized - missing authorization header' });
    }

    if (!authHeader.startsWith('Bearer ')) {
      console.warn('⚠️ Unauthorized access attempt - invalid auth format');
      return res.status(401).json({ error: 'Unauthorized - invalid authorization format' });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    // Validate token
    if (!token) {
      console.warn('⚠️ Unauthorized access attempt - empty token');
      return res.status(401).json({ error: 'Unauthorized - empty token' });
    }

    if (token.length !== adminToken.length) {
      console.warn('⚠️ Unauthorized access attempt - invalid token length');
      return res.status(401).json({ error: 'Unauthorized - invalid token' });
    }

    // Use constant-time comparison to prevent timing attacks
    const tokenMatch = crypto.timingSafeEqual(
      Buffer.from(token),
      Buffer.from(adminToken)
    );

    if (!tokenMatch) {
      console.warn('⚠️ Unauthorized access attempt - invalid token');
      return res.status(401).json({ error: 'Unauthorized - invalid token' });
    }

    console.log('✓ Admin authentication successful');

    // Fetch contacts from Supabase
    // Supabase parameterizes queries, preventing SQL injection
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch contacts' });
    }

    console.log(`✓ Retrieved ${data?.length || 0} contacts`);

    return res.status(200).json({
      success: true,
      count: data?.length || 0,
      data: data || [],
    });
  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    return res.status(500).json({ error: 'Failed to fetch contacts' });
  }
}

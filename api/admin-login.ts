import { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit, getClientIp } from './utils/security.ts';
import crypto from 'crypto';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const clientIp = getClientIp(req);

    // Check rate limit (5 requests per 15 mins)
    if (checkRateLimit(clientIp, 5, 15 * 60 * 1000)) {
      console.warn(`🚫 Login rate limit exceeded for IP: ${clientIp}`);
      return res.status(429).json({ error: 'Too many login attempts. Please try again later.' });
    }

    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Get the admin password from environment variables
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Use constant-time comparison to prevent timing attacks
    const passwordMatch = crypto.timingSafeEqual(
      Buffer.alloc(Math.max(password.length, adminPassword.length), password),
      Buffer.alloc(Math.max(password.length, adminPassword.length), adminPassword)
    ) && password.length === adminPassword.length;

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a simple token (in production, use JWT)
    const token = process.env.ADMIN_TOKEN || 'your-secret-admin-token-12345';

    return res.status(200).json({
      success: true,
      token: token,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
}

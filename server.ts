import express from 'express';
import { createServer as createViteServer } from 'vite';
import db from './src/db/index.js';
import { validateContactRequest, checkRateLimit, getClientIp } from './api/utils/security.ts';
import crypto from 'crypto';

async function startServer() {
  const app = express();
  const PORT = 3000;
  const ADMIN_TOKEN = (process.env.ADMIN_TOKEN || 'your-secret-admin-token-12345').trim();

  // Middleware to parse JSON bodies with size limit
  app.use(express.json({ limit: '10kb' }));

  // Security headers middleware
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
  });

  // ============================================
  // GET /api/contacts - Admin endpoint
  // ============================================
  app.get('/api/contacts', (req, res) => {
    try {
      // Check authorization FIRST
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.warn('⚠️ Unauthorized access attempt - missing/invalid auth header');
        return res.status(401).json({ error: 'Unauthorized - missing or invalid authorization' });
      }

      const token = authHeader.substring(7);

      if (!token || token.length < 32) {
        console.warn('⚠️ Unauthorized access attempt - invalid token format');
        return res.status(401).json({ error: 'Unauthorized - invalid token' });
      }

      // Constant-time comparison
      const tokenMatch = crypto.timingSafeEqual(
        Buffer.from(token),
        Buffer.from(ADMIN_TOKEN)
      );

      if (!tokenMatch) {
        console.warn('⚠️ Unauthorized access attempt - token mismatch');
        return res.status(401).json({ error: 'Unauthorized - invalid token' });
      }

      console.log('✓ Admin authentication successful');

      const stmt = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC');
      const contacts = stmt.all();
      
      return res.status(200).json({
        success: true,
        count: contacts.length,
        data: contacts
      });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  });

  // Reject POST on /api/contacts
  app.post('/api/contacts', (req, res) => {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed - only GET requests are accepted' });
  });

  // ============================================
  // POST /api/contact - Form submission
  // ============================================
  app.post('/api/contact', (req, res) => {
    try {
      const clientIp = getClientIp(req);

      // Check rate limit (50 requests per hour per IP)
      if (checkRateLimit(clientIp, 50, 3600000)) {
        console.warn(`🚫 Rate limit exceeded for IP: ${clientIp}`);
        return res.status(429).json({ error: 'Too many requests. Please try again in an hour.' });
      }

      // Validate and sanitize request body
      const validation = validateContactRequest(req.body);

      if (!validation.valid) {
        console.warn('⚠️ Validation failed:', validation.errors);
        return res.status(400).json({
          error: 'Invalid input',
          details: validation.errors[0],
        });
      }

      const { name, email, organization, role, message } = validation.data!;

      console.log('📝 Form submission received (sanitized):', {
        name: name.substring(0, 20),
        email: email.substring(0, 10) + '***',
        role,
      });

      // Insert into database with parameterized query
      const stmt = db.prepare(`
        INSERT INTO contacts (name, organization, role, email, message, created_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `);

      const info = stmt.run(name, organization, role, email, message);

      console.log('✓ Contact saved successfully from IP:', clientIp);

      return res.status(201).json({
        success: true,
        id: info.lastInsertRowid,
        message: 'Contact information saved successfully. We will get back to you soon!',
      });
    } catch (error) {
      console.error('❌ Error saving contact:', error);
      return res.status(500).json({ error: 'Failed to process contact information - please try again later' });
    }
  });

  // Reject GET on /api/contact
  app.get('/api/contact', (req, res) => {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed - only POST requests are accepted' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

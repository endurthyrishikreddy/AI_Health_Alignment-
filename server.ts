import express from 'express';
import { createServer as createViteServer } from 'vite';
import db from './src/db/index.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // API Routes
  app.get('/api/contacts', (req, res) => {
    try {
      const stmt = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC');
      const contacts = stmt.all();
      res.json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  });

  app.post('/api/contact', (req, res) => {
    try {
      const { name, organization, role, email, message } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }

      const stmt = db.prepare(`
        INSERT INTO contacts (name, organization, role, email, message)
        VALUES (?, ?, ?, ?, ?)
      `);

      const info = stmt.run(name, organization, role, email, message);

      res.status(201).json({ 
        success: true, 
        id: info.lastInsertRowid,
        message: 'Contact information saved successfully' 
      });
    } catch (error) {
      console.error('Error saving contact:', error);
      res.status(500).json({ error: 'Failed to save contact information' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving (if needed later)
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

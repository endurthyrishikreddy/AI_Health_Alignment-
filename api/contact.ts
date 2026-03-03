import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, organization, role, email, message } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Log to console (check Vercel logs in dashboard)
    console.log('Contact form submission:', {
      name,
      organization,
      role,
      email,
      message,
      timestamp: new Date().toISOString()
    });

    // TODO: Implement persistent storage using one of:
    // 1. Supabase PostgreSQL Database
    // 2. MongoDB Atlas
    // 3. Firebase Firestore
    // 4. Send email notification

    return res.status(201).json({
      success: true,
      message: 'Contact information received successfully. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Error processing contact:', error);
    return res.status(500).json({ error: 'Failed to process contact information' });
  }
}

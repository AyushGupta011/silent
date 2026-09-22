import express from 'express';
import prisma from '../prismaClient.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, company, projectType, message } = req.body;
    
    if (!name || !email || !projectType || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const submission = await prisma.contactSubmission.create({
      data: { name, email, company, projectType, message }
    });

    res.status(201).json({ success: true, data: submission });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

export default router;

import express from 'express';
import prisma from '../utils/db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/tickets', authenticate, async (req, res) => {
  try {
    const { subject, description, category, priority } = req.body || {};

    if (!subject || !String(subject).trim()) {
      return res.status(400).json({ error: 'Ticket subject is required' });
    }
    if (!description || !String(description).trim()) {
      return res.status(400).json({ error: 'Ticket description is required' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true },
    });

    const ticket = await prisma.supportTicket.create({
      data: {
        requesterUserId: req.userId,
        requesterEmail: user?.email || null,
        subject: String(subject).trim(),
        description: String(description).trim(),
        category: category || 'OTHER',
        priority: priority || 'MEDIUM',
      },
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error('Create support ticket error:', error);
    res.status(500).json({ error: 'Failed to create support ticket' });
  }
});

export default router;

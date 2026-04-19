import express from 'express';
import prisma from '../utils/db.js';
import { authenticate, requireEmailVerified } from '../middleware/auth.js';
import { buildAdminTicketFeed } from '../utils/adminTickets.js';

const router = express.Router();

// Get all notifications for current user
router.get('/', authenticate, requireEmailVerified, async (req, res) => {
  try {
    if (req.isAdmin) {
      const ticketFeed = await buildAdminTicketFeed(prisma);
      const adminNotifications = ticketFeed.tickets.map((ticket) => ({
        id: ticket.id,
        message: `${ticket.title}: ${ticket.message}`,
        type: `TICKET_${ticket.category}`,
        isRead: ticket.status !== 'OPEN',
        createdAt: ticket.createdAt,
        link: ticket.link,
        priority: ticket.priority,
      }));
      return res.json(adminNotifications);
    }

    const notifications = await prisma.notification.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(notifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: 'Failed to get notifications' });
  }
});

// Mark notification as read
router.patch('/:id/read', authenticate, requireEmailVerified, async (req, res) => {
  try {
    const notification = await prisma.notification.update({
      where: { id: req.params.id, userId: req.userId },
      data: { isRead: true },
    });
    res.json(notification);
  } catch (error) {
    console.error('Update notification error:', error);
    res.status(500).json({ error: 'Failed to update notification' });
  }
});

// Mark all as read
router.patch('/read-all', authenticate, requireEmailVerified, async (req, res) => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.userId, isRead: false },
      data: { isRead: true },
    });
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Read all notifications error:', error);
    res.status(500).json({ error: 'Failed to mark all as read' });
  }
});

// Delete notification
router.delete('/:id', authenticate, requireEmailVerified, async (req, res) => {
  try {
    await prisma.notification.delete({
      where: { id: req.params.id, userId: req.userId },
    });
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ error: 'Failed to delete notification' });
  }
});

export default router;

import express from 'express';
import prisma from '../prismaClient.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', requireAuth, (req, res) => {
  const { id, name, email, role, status, createdAt } = req.user;
  res.json({ id, name, email, role, status, createdAt });
});

router.put('/deactivate', requireAuth, async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { status: 'deactivated' }
    });
    res.clearCookie('token');
    res.json({ success: true, message: 'Account deactivated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/delete', requireAuth, async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.user.id } });
    res.clearCookie('token');
    res.json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

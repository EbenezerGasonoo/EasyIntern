import express from 'express';
import prisma from '../utils/db.js';
import { authenticate, requireCompany } from '../middleware/auth.js';

const router = express.Router();

// Get company profile
router.get('/profile', authenticate, requireCompany, async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { userId: req.userId },
      include: {
        user: {
          select: { email: true, createdAt: true },
        },
        jobs: {
          include: {
            _count: {
              select: { applications: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    console.error('Get company profile error:', error);
    res.status(500).json({ error: 'Failed to get company profile' });
  }
});

// Update company profile
router.put('/profile', authenticate, requireCompany, async (req, res) => {
  try {
    const { name, description, website, industry, location, logo } = req.body;

    const company = await prisma.company.update({
      where: { userId: req.userId },
      data: {
        name,
        description,
        website,
        industry,
        location,
        logo,
      },
    });

    res.json(company);
  } catch (error) {
    console.error('Update company profile error:', error);
    res.status(500).json({ error: 'Failed to update company profile' });
  }
});

// Get company's applications
router.get('/applications', authenticate, requireCompany, async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { userId: req.userId },
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const applications = await prisma.application.findMany({
      where: {
        job: {
          company: {
            userId: req.userId,
          },
        },
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            company: {
              select: {
                name: true,
              },
            },
          },
        },
        intern: {
          include: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
      orderBy: { appliedAt: 'desc' },
    });

    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Failed to get applications' });
  }
});

export default router;

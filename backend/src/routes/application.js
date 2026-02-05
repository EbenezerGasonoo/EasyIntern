import express from 'express';
import prisma from '../utils/db.js';
import { authenticate, requireIntern, requireCompany } from '../middleware/auth.js';

const router = express.Router();

// Apply to job (intern only)
router.post('/', authenticate, requireIntern, async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;

    if (!jobId) {
      return res.status(400).json({ error: 'Job ID is required' });
    }

    const intern = await prisma.intern.findUnique({
      where: { userId: req.userId },
    });

    if (!intern) {
      return res.status(404).json({ error: 'Intern not found' });
    }

    // Check if job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { company: true },
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = await prisma.application.findUnique({
      where: {
        jobId_internId: {
          jobId,
          internId: intern.id,
        },
      },
    });

    if (existingApplication) {
      return res.status(400).json({ error: 'Already applied to this job' });
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        internId: intern.id,
        coverLetter,
      },
      include: {
        job: {
          include: {
            company: {
              select: {
                name: true,
                logo: true,
              },
            },
          },
        },
        intern: {
          select: {
            firstName: true,
            lastName: true,
            skills: true,
          },
        },
      },
    });

    res.status(201).json(application);
  } catch (error) {
    console.error('Apply to job error:', error);
    res.status(500).json({ error: 'Failed to apply to job' });
  }
});

// Get intern's applications
router.get('/my-applications', authenticate, requireIntern, async (req, res) => {
  try {
    const intern = await prisma.intern.findUnique({
      where: { userId: req.userId },
    });

    if (!intern) {
      return res.status(404).json({ error: 'Intern not found' });
    }

    const applications = await prisma.application.findMany({
      where: { internId: intern.id },
      include: {
        job: {
          include: {
            company: {
              select: {
                name: true,
                logo: true,
                location: true,
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

// Update application status (company only)
router.patch('/:id/status', authenticate, requireCompany, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['PENDING', 'REVIEWED', 'ACCEPTED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const company = await prisma.company.findUnique({
      where: { userId: req.userId },
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Check if application belongs to company's job
    const application = await prisma.application.findUnique({
      where: { id: req.params.id },
      include: { 
        job: {
          include: { company: true }
        }
      },
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (application.job.company.userId !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to update this application' });
    }

    const updatedApplication = await prisma.application.update({
      where: { id: req.params.id },
      data: {
        status,
        reviewedAt: status !== 'PENDING' ? new Date() : null,
      },
      include: {
        job: {
          include: {
            company: {
              select: {
                name: true,
                logo: true,
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
    });

    res.json(updatedApplication);
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ error: 'Failed to update application status' });
  }
});

export default router;

import express from 'express';
import prisma from '../utils/db.js';
import { authenticate, requireIntern, requireCompany, requireEmailVerified } from '../middleware/auth.js';
import { sendEmail } from '../utils/email.js';

const router = express.Router();

const statusEmailContent = {
  PENDING: {
    subjectPrefix: 'Application Received',
    heading: 'Application Submitted',
    messageBuilder: (jobTitle, companyName) =>
      `Your application for the <strong>${jobTitle}</strong> internship at <strong>${companyName}</strong> is now pending review.`,
  },
  REVIEWED: {
    subjectPrefix: 'Application Shortlisted',
    heading: 'You have been shortlisted',
    messageBuilder: (jobTitle, companyName) =>
      `Great news! Your application for the <strong>${jobTitle}</strong> internship at <strong>${companyName}</strong> has been shortlisted and is now under review.`,
  },
  ACCEPTED: {
    subjectPrefix: 'Internship Accepted',
    heading: 'Congratulations!',
    messageBuilder: (jobTitle, companyName) =>
      `Your application for the <strong>${jobTitle}</strong> internship at <strong>${companyName}</strong> has been accepted!`,
  },
  REJECTED: {
    subjectPrefix: 'Application Update',
    heading: 'Application Update',
    messageBuilder: (jobTitle, companyName) =>
      `Your application for the <strong>${jobTitle}</strong> internship at <strong>${companyName}</strong> was not selected at this time.`,
  },
};

async function sendApplicationStatusEmail({ to, status, jobTitle, companyName }) {
  const emailContent = statusEmailContent[status];
  if (!emailContent) return;

  await sendEmail({
    to,
    subject: `${emailContent.subjectPrefix}: ${jobTitle}`,
    html: `<h1>${emailContent.heading}</h1>
           <p>${emailContent.messageBuilder(jobTitle, companyName)}</p>
           <p>Please log in to the portal to view details and next steps.</p>`,
  });
}

// Apply to job (intern only)
router.post('/', authenticate, requireIntern, requireEmailVerified, async (req, res) => {
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
                userId: true,
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

    // Notify Company
    await prisma.notification.create({
      data: {
        userId: application.job.company.userId,
        message: `${application.intern.firstName} ${application.intern.lastName} applied for ${application.job.title}.`,
        type: 'INFO'
      }
    });

    // Notify intern when the application is created (initial status: PENDING)
    const internWithUser = await prisma.intern.findUnique({
      where: { id: application.internId },
      select: {
        user: {
          select: { email: true },
        },
      },
    });

    if (internWithUser?.user?.email) {
      try {
        await sendApplicationStatusEmail({
          to: internWithUser.user.email,
          status: application.status,
          jobTitle: application.job.title,
          companyName: application.job.company.name,
        });
      } catch (err) {
        console.error('Failed to send pending application email:', err);
      }
    }

    res.status(201).json(application);
  } catch (error) {
    console.error('Apply to job error:', error);
    res.status(500).json({ error: 'Failed to apply to job' });
  }
});

// Get intern's applications
router.get('/my-applications', authenticate, requireIntern, requireEmailVerified, async (req, res) => {
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
router.patch('/:id/status', authenticate, requireCompany, requireEmailVerified, async (req, res) => {
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
                id: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Create In-App Notification
    await prisma.notification.create({
      data: {
        userId: updatedApplication.intern.user.id,
        message: `Your application for ${updatedApplication.job.title} has been ${status.toLowerCase()}.`,
        type: status === 'ACCEPTED' ? 'SUCCESS' : (status === 'REJECTED' ? 'WARNING' : 'INFO')
      }
    });

    // Email intern on status updates
    if (['PENDING', 'REVIEWED', 'ACCEPTED', 'REJECTED'].includes(status)) {
      try {
        await sendApplicationStatusEmail({
          to: updatedApplication.intern.user.email,
          status,
          jobTitle: updatedApplication.job.title,
          companyName: updatedApplication.job.company.name,
        });
      } catch (err) {
        console.error('Failed to send application status email:', err);
      }
    }

    res.json(updatedApplication);
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ error: 'Failed to update application status' });
  }
});

export default router;

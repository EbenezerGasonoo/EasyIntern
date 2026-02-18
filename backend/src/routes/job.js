import express from 'express';
import prisma from '../utils/db.js';
import { authenticate, requireCompany } from '../middleware/auth.js';

const router = express.Router();

// Get all jobs (public)
router.get('/', async (req, res) => {
  try {
    const { search, location, remote, skills } = req.query;

    const where = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (remote !== undefined) {
      where.remote = remote === 'true';
    }

    const jobs = await prisma.job.findMany({
      where,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            location: true,
            industry: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Filter by skills if provided
    let filteredJobs = jobs;
    if (skills) {
      const skillArray = Array.isArray(skills) ? skills : [skills];
      filteredJobs = jobs.filter(job =>
        (job.skills || []).length > 0 &&
        skillArray.some(skill =>
          (job.skills || []).some(js => String(js).toLowerCase().includes(skill.toLowerCase()))
        )
      );
    }

    res.json(filteredJobs);
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Failed to get jobs' });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: req.params.id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            description: true,
            website: true,
            logo: true,
            location: true,
            industry: true,
            benefits: true,
            companySize: true,
            contactEmail: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ error: 'Failed to get job' });
  }
});

// Create job (company only)
router.post('/', authenticate, requireCompany, async (req, res) => {
  try {
    const { title, description, requirements, responsibilities, benefits, location, remote, duration, stipend, skills } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const company = await prisma.company.findUnique({
      where: { userId: req.userId },
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const job = await prisma.job.create({
      data: {
        companyId: company.id,
        title,
        description,
        requirements: requirements || [],
        responsibilities: responsibilities || [],
        benefits: benefits || [],
        location,
        remote: remote || false,
        duration,
        stipend,
        skills: skills || [],
      },
      include: {
        company: {
          select: {
            name: true,
            logo: true,
          },
        },
      },
    });

    res.status(201).json(job);
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// Update job (company only)
router.put('/:id', authenticate, requireCompany, async (req, res) => {
  try {
    const { title, description, requirements, responsibilities, benefits, location, remote, duration, stipend, skills } = req.body;

    const company = await prisma.company.findUnique({
      where: { userId: req.userId },
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Check if job belongs to company
    const existingJob = await prisma.job.findUnique({
      where: { id: req.params.id },
    });

    if (!existingJob || existingJob.companyId !== company.id) {
      return res.status(403).json({ error: 'Not authorized to update this job' });
    }

    const job = await prisma.job.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        requirements: requirements || [],
        responsibilities: responsibilities || [],
        benefits: benefits || [],
        location,
        remote,
        duration,
        stipend,
        skills: skills || [],
      },
      include: {
        company: {
          select: {
            name: true,
            logo: true,
          },
        },
      },
    });

    res.json(job);
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// Delete job (company only)
router.delete('/:id', authenticate, requireCompany, async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { userId: req.userId },
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Check if job belongs to company
    const existingJob = await prisma.job.findUnique({
      where: { id: req.params.id },
    });

    if (!existingJob || existingJob.companyId !== company.id) {
      return res.status(403).json({ error: 'Not authorized to delete this job' });
    }

    await prisma.job.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

export default router;

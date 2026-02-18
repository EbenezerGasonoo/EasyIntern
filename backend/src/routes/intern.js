import express from 'express';
import prisma from '../utils/db.js';
import { authenticate, requireIntern } from '../middleware/auth.js';
import { getSupabase, PROFILE_BUCKET } from '../utils/supabase.js';

const router = express.Router();

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

// Upload profile picture (intern only)
router.post('/upload-profile-picture', authenticate, requireIntern, async (req, res) => {
  try {
    const { image: dataUrl } = req.body || {};
    if (!dataUrl || typeof dataUrl !== 'string') {
      return res.status(400).json({ error: 'Image data is required (base64 data URL)' });
    }

    const match = dataUrl.match(/^data:(image\/(jpeg|png|webp));base64,(.+)$/i);
    if (!match) {
      return res.status(400).json({ error: 'Invalid image. Use JPEG, PNG, or WebP.' });
    }
    const mime = match[1].toLowerCase();
    const ext = match[2].toLowerCase() === 'jpeg' ? 'jpg' : match[2];
    const base64 = match[3];

    const buffer = Buffer.from(base64, 'base64');
    if (buffer.length > MAX_SIZE_BYTES) {
      return res.status(400).json({ error: 'Image must be 2MB or smaller.' });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return res.status(503).json({
        error: 'Image upload is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to enable uploads, or use a profile picture URL instead.',
      });
    }

    const path = `interns/${req.userId}/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from(PROFILE_BUCKET)
      .upload(path, buffer, { contentType: mime, upsert: false });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      if (uploadError.message?.includes('Bucket not found')) {
        return res.status(503).json({
          error: 'Storage bucket not set up. Create a bucket named "profile-pictures" in Supabase Dashboard (Storage).',
        });
      }
      return res.status(500).json({ error: 'Upload failed. Try again or use a profile picture URL.' });
    }

    const { data: urlData } = supabase.storage.from(PROFILE_BUCKET).getPublicUrl(path);
    res.json({ url: urlData.publicUrl });
  } catch (err) {
    console.error('Upload profile picture error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// PUBLIC: Get all intern profiles (for browsing)
router.get('/browse', async (req, res) => {
  try {
    const { search, location, skills } = req.query;

    const where = {};

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { bio: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    const interns = await prisma.intern.findMany({
      where,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        bio: true,
        skills: true,
        education: true,
        location: true,
        profilePic: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Filter by skills if provided
    let filteredInterns = interns;
    if (skills) {
      const skillArray = Array.isArray(skills) ? skills : [skills];
      filteredInterns = interns.filter(intern =>
        intern.skills && intern.skills.some(skill =>
          skillArray.some(s => 
            skill.toLowerCase().includes(s.toLowerCase()) || 
            s.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    res.json(filteredInterns);
  } catch (error) {
    console.error('Get interns error:', error);
    res.status(500).json({ error: 'Failed to get interns' });
  }
});

// PUBLIC: Get single intern profile (for viewing)
router.get('/:id', async (req, res) => {
  try {
    const intern = await prisma.intern.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        bio: true,
        skills: true,
        education: true,
        experience: true,
        location: true,
        resume: true,
        profilePic: true,
        createdAt: true,
      },
    });

    if (!intern) {
      return res.status(404).json({ error: 'Intern not found' });
    }

    res.json(intern);
  } catch (error) {
    console.error('Get intern error:', error);
    res.status(500).json({ error: 'Failed to get intern' });
  }
});

// Get own intern profile (authenticated)
router.get('/profile', authenticate, requireIntern, async (req, res) => {
  try {
    const intern = await prisma.intern.findUnique({
      where: { userId: req.userId },
      include: {
        user: {
          select: { email: true, createdAt: true },
        },
        applications: {
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
          },
          orderBy: { appliedAt: 'desc' },
        },
      },
    });

    if (!intern) {
      return res.status(404).json({ error: 'Intern not found' });
    }

    res.json(intern);
  } catch (error) {
    console.error('Get intern profile error:', error);
    res.status(500).json({ error: 'Failed to get intern profile' });
  }
});

// Update intern profile
router.put('/profile', authenticate, requireIntern, async (req, res) => {
  try {
    const { firstName, lastName, bio, skills, education, experience, location, resume, profilePic } = req.body;

    const intern = await prisma.intern.update({
      where: { userId: req.userId },
      data: {
        firstName,
        lastName,
        bio,
        skills: skills || [],
        education,
        experience,
        location,
        resume,
        profilePic,
      },
    });

    res.json(intern);
  } catch (error) {
    console.error('Update intern profile error:', error);
    res.status(500).json({ error: 'Failed to update intern profile' });
  }
});

// Get recommended jobs for intern
router.get('/recommended-jobs', authenticate, requireIntern, async (req, res) => {
  try {
    const intern = await prisma.intern.findUnique({
      where: { userId: req.userId },
    });

    if (!intern) {
      return res.status(404).json({ error: 'Intern not found' });
    }

    // Get all jobs
    const allJobs = await prisma.job.findMany({
      include: {
        company: {
          select: {
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

    // Simple matching: score jobs based on skill overlap
    const scoredJobs = allJobs.map(job => {
      const internSkills = intern.skills || [];
      const jobSkills = job.skills || [];
      const matchingSkills = internSkills.filter(skill =>
        jobSkills.some(js => js.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(js.toLowerCase()))
      );
      const score = (matchingSkills.length / Math.max(jobSkills.length, 1)) * 100;

      return {
        ...job,
        matchScore: Math.round(score),
      };
    });

    // Sort by match score
    scoredJobs.sort((a, b) => b.matchScore - a.matchScore);

    res.json(scoredJobs);
  } catch (error) {
    console.error('Get recommended jobs error:', error);
    res.status(500).json({ error: 'Failed to get recommended jobs' });
  }
});

export default router;

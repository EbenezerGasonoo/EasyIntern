import express from 'express';
import prisma from '../utils/db.js';
import { authenticate, requireIntern, requireEmailVerified } from '../middleware/auth.js';
import { getSupabase, PROFILE_BUCKET } from '../utils/supabase.js';
import { submitInternUniversityVerification } from '../utils/internUniversityVerification.js';

const router = express.Router();

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

// Upload profile picture (intern only)
router.post('/upload-profile-picture', authenticate, requireIntern, requireEmailVerified, async (req, res) => {
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
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { bio: { contains: search } },
      ];
    }

    if (location) {
      where.location = { contains: location };
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
        isVerified: true,
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

// Get own intern profile (authenticated)
router.get('/profile', authenticate, requireIntern, requireEmailVerified, async (req, res) => {
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
        university: {
          select: { id: true, name: true },
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
router.put('/profile', authenticate, requireIntern, requireEmailVerified, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      bio,
      skills,
      education,
      experience,
      location,
      resume,
      profilePic,
      phone,
      dateOfBirth,
      ghanaCardNumber,
      ghanaCardDocument,
      schoolAffiliationDocument,
      notifyIndustryJobs,
      preferredIndustry,
    } = req.body;

    const existing = await prisma.intern.findUnique({
      where: { userId: req.userId },
      select: {
        firstName: true,
        lastName: true,
        phone: true,
        dateOfBirth: true,
        ghanaCardNumber: true,
        ghanaCardDocument: true,
        education: true,
        schoolAffiliationDocument: true,
      },
    });

    const eff = (incoming, prior) => (incoming !== undefined ? incoming : prior);
    const eFirst = eff(firstName, existing?.firstName);
    const eLast = eff(lastName, existing?.lastName);
    const ePhone = eff(phone, existing?.phone);
    const eDob = eff(dateOfBirth, existing?.dateOfBirth);
    const eGhanaNum = eff(ghanaCardNumber, existing?.ghanaCardNumber);
    const eGhanaDoc = eff(ghanaCardDocument, existing?.ghanaCardDocument);
    const eEducation = eff(education, existing?.education);
    const eSchoolDoc = eff(schoolAffiliationDocument, existing?.schoolAffiliationDocument);

    const educationTrimmed = eEducation != null ? String(eEducation).trim() : '';
    const hasSchoolVerification = Boolean(
      educationTrimmed &&
      eSchoolDoc &&
      String(eSchoolDoc).trim()
    );

    const hasKyiDetails = Boolean(
      eFirst &&
      eLast &&
      ePhone &&
      eDob &&
      eGhanaNum &&
      eGhanaDoc &&
      hasSchoolVerification
    );

    const intern = await prisma.intern.update({
      where: { userId: req.userId },
      data: {
        firstName,
        lastName,
        bio,
        phone,
        skills: skills || [],
        education,
        experience,
        location,
        resume,
        profilePic,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        ghanaCardNumber,
        ghanaCardDocument,
        schoolAffiliationDocument,
        notifyIndustryJobs: Boolean(notifyIndustryJobs),
        preferredIndustry,
        isVerified: hasKyiDetails,
      },
    });

    res.json(intern);
  } catch (error) {
    console.error('Update intern profile error:', error);
    res.status(500).json({ error: 'Failed to update intern profile' });
  }
});

// Get recommended jobs for intern
router.get('/recommended-jobs', authenticate, requireIntern, requireEmailVerified, async (req, res) => {
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

    // Simple matching: score jobs based on skill overlap + preferred industry boost
    const scoredJobs = allJobs.map(job => {
      const internSkills = intern.skills || [];
      const jobSkills = job.skills || [];
      const matchingSkills = internSkills.filter(skill =>
        jobSkills.some(js => js.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(js.toLowerCase()))
      );
      const baseScore = (matchingSkills.length / Math.max(jobSkills.length, 1)) * 100;
      const preferredIndustry = intern.preferredIndustry?.toLowerCase().trim();
      const companyIndustry = job.company?.industry?.toLowerCase().trim();
      const industryMatch = Boolean(
        preferredIndustry &&
        companyIndustry &&
        (companyIndustry.includes(preferredIndustry) || preferredIndustry.includes(companyIndustry))
      );

      // Keep score bounded at 100 while favoring jobs in the intern's selected industry.
      const score = Math.min(100, baseScore + (industryMatch ? 20 : 0));

      return {
        ...job,
        matchScore: Math.round(score),
        industryMatch,
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

// Request student verification with a university on the platform (after email verification; from dashboard)
router.post('/request-university-verification', authenticate, requireIntern, requireEmailVerified, async (req, res) => {
  try {
    const { universityId, enrollmentYear, course, graduationDate } = req.body || {};
    if (!universityId) {
      return res.status(400).json({ error: 'Please select a university that uses EasyIntern.' });
    }
    const row = await prisma.intern.findUnique({ where: { userId: req.userId } });
    if (!row) {
      return res.status(404).json({ error: 'Intern not found' });
    }
    const result = await submitInternUniversityVerification({
      internId: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      studentId: row.studentId,
      universityId,
      enrollmentYear,
      course,
      graduationDate,
    });
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    const intern = await prisma.intern.findUnique({
      where: { id: row.id },
      include: {
        university: { select: { id: true, name: true } },
        user: { select: { email: true, createdAt: true } },
        applications: {
          include: {
            job: {
              include: {
                company: { select: { name: true, logo: true } },
              },
            },
          },
          orderBy: { appliedAt: 'desc' },
        },
      },
    });
    return res.json({
      ...result,
      intern,
      message: result.autoApproved
        ? `Your student record matched the ${result.universityName} catalog; verification is complete.`
        : result.updated
          ? 'Your verification request was updated.'
          : `Request sent to ${result.universityName}. They will review and confirm your student status.`,
    });
  } catch (error) {
    console.error('Request university verification error:', error);
    res.status(500).json({ error: 'Failed to submit student verification' });
  }
});

// PUBLIC: Get single intern profile (for viewing) — keep after static paths
router.get('/:id', async (req, res) => {
  try {
    const intern = await prisma.intern.findUnique({
      where: { id: req.params.id },
      include: {
        user: {
          select: { email: true }
        }
      }
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

export default router;

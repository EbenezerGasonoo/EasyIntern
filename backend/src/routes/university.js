import express from 'express';
import prisma from '../utils/db.js';
import { authenticate, requireUniversity, requireEmailVerified } from '../middleware/auth.js';
import { formatInstitutionName } from '../utils/universityDisplay.js';

const router = express.Router();

function parseCatalogRecord(payload) {
  const { enrollmentYear, studentId, course, graduationDate } = payload || {};
  if (!enrollmentYear || !studentId || !course || !graduationDate) {
    return { error: 'Year, student ID, course, and graduation date are required.' };
  }

  const parsedYear = Number.parseInt(String(enrollmentYear), 10);
  if (Number.isNaN(parsedYear)) {
    return { error: 'Enrollment year must be a valid number.' };
  }

  const parsedGraduationDate = new Date(graduationDate);
  if (Number.isNaN(parsedGraduationDate.getTime())) {
    return { error: 'Graduation date must be a valid date.' };
  }

  return {
    value: {
      enrollmentYear: parsedYear,
      studentId: String(studentId).trim(),
      course: String(course).trim(),
      graduationDate: parsedGraduationDate,
    },
  };
}

async function approvePendingForStudent(universityId, studentId, catalogRecordId) {
  return prisma.$transaction([
    prisma.studentVerificationRequest.updateMany({
      where: {
        universityId,
        requestedStudentId: studentId,
        status: 'PENDING',
      },
      data: {
        status: 'APPROVED',
        catalogRecordId,
        reviewedAt: new Date(),
        notes: 'Approved via university catalog update.',
      },
    }),
    prisma.intern.updateMany({
      where: {
        universityId,
        studentId,
      },
      data: {
        studentVerificationStatus: 'APPROVED',
        studentVerificationNotes: 'Approved via university catalog update.',
      },
    }),
  ]);
}

router.get('/profile', authenticate, requireUniversity, requireEmailVerified, async (req, res) => {
  try {
    const university = await prisma.university.findUnique({
      where: { userId: req.userId },
      include: {
        user: { select: { email: true, createdAt: true } },
      },
    });
    if (!university) return res.status(404).json({ error: 'University not found' });
    res.json({ ...university, name: formatInstitutionName(university.name) });
  } catch (error) {
    console.error('Get university profile error:', error);
    res.status(500).json({ error: 'Failed to load university profile' });
  }
});

router.put('/profile', authenticate, requireUniversity, requireEmailVerified, async (req, res) => {
  try {
    const { name, website, studentIdFormatHint } = req.body || {};
    const existing = await prisma.university.findUnique({ where: { userId: req.userId } });
    if (!existing) return res.status(404).json({ error: 'University not found' });
    const data = {};
    if (name !== undefined) {
      const trimmed = formatInstitutionName(name);
      if (!trimmed) return res.status(400).json({ error: 'Name cannot be empty.' });
      data.name = trimmed;
    }
    if (website !== undefined) {
      data.website = website ? String(website).trim() : null;
    }
    if (studentIdFormatHint !== undefined) {
      const t = String(studentIdFormatHint || '').trim();
      data.studentIdFormatHint = t ? t.slice(0, 500) : null;
    }
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'No fields to update.' });
    }
    const university = await prisma.university.update({
      where: { userId: req.userId },
      data,
      include: { user: { select: { email: true, createdAt: true } } },
    });
    res.json({ ...university, name: formatInstitutionName(university.name) });
  } catch (error) {
    console.error('Update university profile error:', error);
    res.status(500).json({ error: 'Failed to update university profile' });
  }
});

router.get('/catalog', authenticate, requireUniversity, requireEmailVerified, async (req, res) => {
  try {
    const university = await prisma.university.findUnique({
      where: { userId: req.userId },
      select: { id: true },
    });
    if (!university) return res.status(404).json({ error: 'University not found' });

    const records = await prisma.universityStudentCatalog.findMany({
      where: { universityId: university.id },
      orderBy: [{ enrollmentYear: 'desc' }, { updatedAt: 'desc' }],
    });

    res.json(records);
  } catch (error) {
    console.error('Get university catalog error:', error);
    res.status(500).json({ error: 'Failed to load student catalog' });
  }
});

router.post('/catalog', authenticate, requireUniversity, requireEmailVerified, async (req, res) => {
  try {
    const parsed = parseCatalogRecord(req.body);
    if (parsed.error) {
      return res.status(400).json({ error: parsed.error });
    }

    const university = await prisma.university.findUnique({
      where: { userId: req.userId },
      select: { id: true },
    });
    if (!university) return res.status(404).json({ error: 'University not found' });

    const record = await prisma.universityStudentCatalog.upsert({
      where: {
        universityId_studentId: {
          universityId: university.id,
          studentId: parsed.value.studentId,
        },
      },
      update: {
        enrollmentYear: parsed.value.enrollmentYear,
        course: parsed.value.course,
        graduationDate: parsed.value.graduationDate,
      },
      create: {
        universityId: university.id,
        enrollmentYear: parsed.value.enrollmentYear,
        studentId: parsed.value.studentId,
        course: parsed.value.course,
        graduationDate: parsed.value.graduationDate,
      },
    });

    await approvePendingForStudent(university.id, record.studentId, record.id);

    res.status(201).json(record);
  } catch (error) {
    console.error('Upsert university catalog error:', error);
    res.status(500).json({ error: 'Failed to save student catalog record' });
  }
});

router.post('/catalog/bulk', authenticate, requireUniversity, requireEmailVerified, async (req, res) => {
  try {
    const records = Array.isArray(req.body?.records) ? req.body.records : [];
    if (!records.length) {
      return res.status(400).json({ error: 'records must be a non-empty array.' });
    }
    if (records.length > 5000) {
      return res.status(400).json({ error: 'Maximum bulk upload size is 5000 records.' });
    }

    const university = await prisma.university.findUnique({
      where: { userId: req.userId },
      select: { id: true },
    });
    if (!university) return res.status(404).json({ error: 'University not found' });

    const failed = [];
    let upserted = 0;
    let approvedRequests = 0;
    let matchedInterns = 0;

    for (let idx = 0; idx < records.length; idx += 1) {
      const raw = records[idx];
      const parsed = parseCatalogRecord(raw);
      if (parsed.error) {
        failed.push({
          index: idx,
          studentId: raw?.studentId || null,
          error: parsed.error,
        });
        continue;
      }

      try {
        const record = await prisma.universityStudentCatalog.upsert({
          where: {
            universityId_studentId: {
              universityId: university.id,
              studentId: parsed.value.studentId,
            },
          },
          update: {
            enrollmentYear: parsed.value.enrollmentYear,
            course: parsed.value.course,
            graduationDate: parsed.value.graduationDate,
          },
          create: {
            universityId: university.id,
            enrollmentYear: parsed.value.enrollmentYear,
            studentId: parsed.value.studentId,
            course: parsed.value.course,
            graduationDate: parsed.value.graduationDate,
          },
        });

        const [requestUpdate, internUpdate] = await approvePendingForStudent(
          university.id,
          record.studentId,
          record.id
        );

        approvedRequests += requestUpdate.count;
        matchedInterns += internUpdate.count;
        upserted += 1;
      } catch (error) {
        failed.push({
          index: idx,
          studentId: parsed.value.studentId,
          error: 'Failed to upsert record.',
        });
      }
    }

    res.json({
      totalReceived: records.length,
      upserted,
      approvedRequests,
      matchedInterns,
      failedCount: failed.length,
      failed,
    });
  } catch (error) {
    console.error('Bulk upsert university catalog error:', error);
    res.status(500).json({ error: 'Failed to process bulk student catalog upload' });
  }
});

router.get('/verification-requests', authenticate, requireUniversity, requireEmailVerified, async (req, res) => {
  try {
    const university = await prisma.university.findUnique({
      where: { userId: req.userId },
      select: { id: true },
    });
    if (!university) return res.status(404).json({ error: 'University not found' });

    const { q } = req.query;
    const search = typeof q === 'string' && q.trim() ? q.trim() : '';
    let where = { universityId: university.id };
    if (search) {
      where = {
        AND: [
          { universityId: university.id },
          {
            OR: [
              { requestedStudentId: { contains: search } },
              { intern: { firstName: { contains: search } } },
              { intern: { lastName: { contains: search } } },
              { intern: { studentId: { contains: search } } },
              { intern: { user: { email: { contains: search } } } },
            ],
          },
        ],
      };
    }

    const requests = await prisma.studentVerificationRequest.findMany({
      where,
      include: {
        intern: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            studentId: true,
            course: true,
            graduationDate: true,
            enrollmentYear: true,
            user: { select: { email: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(requests);
  } catch (error) {
    console.error('Get verification requests error:', error);
    res.status(500).json({ error: 'Failed to load verification requests' });
  }
});

async function reviewVerificationRequestHandler(req, res) {
  try {
    const { status, notes } = req.body || {};
    if (status !== 'APPROVED' && status !== 'REJECTED') {
      return res.status(400).json({ error: 'Status must be APPROVED or REJECTED.' });
    }

    const university = await prisma.university.findUnique({
      where: { userId: req.userId },
      select: { id: true },
    });
    if (!university) return res.status(404).json({ error: 'University not found' });

    const request = await prisma.studentVerificationRequest.findFirst({
      where: { id: req.params.id, universityId: university.id },
      include: { intern: true },
    });
    if (!request) return res.status(404).json({ error: 'Verification request not found' });

    const actor = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { email: true },
    });

    const updated = await prisma.$transaction(async (tx) => {
      const updatedRequest = await tx.studentVerificationRequest.update({
        where: { id: request.id },
        data: {
          status,
          notes: notes ? String(notes).trim() : null,
          reviewedAt: new Date(),
        },
      });

      await tx.intern.update({
        where: { id: request.internId },
        data: {
          studentVerificationStatus: status,
          studentVerificationNotes: notes ? String(notes).trim() : null,
        },
      });

      await tx.auditLog.create({
        data: {
          actorUserId: req.userId,
          actorEmail: actor?.email || null,
          action: 'STUDENT_VERIFICATION_REVIEW',
          entityType: 'StudentVerificationRequest',
          entityId: request.id,
          reason: status,
          metadata: {
            internId: request.internId,
            notes: notes ? String(notes).trim() : null,
            at: new Date().toISOString(),
          },
        },
      });

      return updatedRequest;
    });

    res.json(updated);
  } catch (error) {
    console.error('Review verification request error:', error);
    res.status(500).json({ error: 'Failed to update verification request' });
  }
}

router.patch(
  '/verification-requests/:id',
  authenticate,
  requireUniversity,
  requireEmailVerified,
  reviewVerificationRequestHandler
);

router.post(
  '/verification-requests/:id/review',
  authenticate,
  requireUniversity,
  requireEmailVerified,
  reviewVerificationRequestHandler
);

export default router;

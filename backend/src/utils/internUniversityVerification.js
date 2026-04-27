import prisma from './db.js';

/**
 * Submits or updates a university’s student verification for an intern
 * (catalog auto-approval, pending request, university notification). Used after signup from dashboard.
 */
export async function submitInternUniversityVerification({
  internId,
  firstName,
  lastName,
  studentId,
  universityId,
  enrollmentYear,
  course,
  graduationDate,
}) {
  const parsedEnrollmentYear = enrollmentYear ? Number.parseInt(String(enrollmentYear), 10) : null;
  if (enrollmentYear && Number.isNaN(parsedEnrollmentYear)) {
    return { error: 'Enrollment year must be a valid number.' };
  }
  const parsedGraduationDate = graduationDate ? new Date(graduationDate) : null;
  if (graduationDate && Number.isNaN(parsedGraduationDate.getTime())) {
    return { error: 'Graduation date must be a valid date.' };
  }

  const intern = await prisma.intern.findUnique({
    where: { id: internId },
    select: { id: true, studentId: true, studentVerificationStatus: true },
  });
  if (!intern) {
    return { error: 'Intern not found.' };
  }
  if (intern.studentVerificationStatus === 'APPROVED') {
    return { error: 'Your student status is already verified with a university.' };
  }

  const resolvedUniversity = await prisma.university.findUnique({
    where: { id: universityId },
    select: { id: true, name: true, userId: true },
  });
  if (!resolvedUniversity) {
    return { error: 'Selected university was not found.' };
  }

  const existingPending = await prisma.studentVerificationRequest.findFirst({
    where: { internId, status: 'PENDING' },
  });
  if (existingPending && existingPending.universityId !== resolvedUniversity.id) {
    return {
      error:
        'You already have a pending verification request. Please wait for a response before choosing a different school.',
    };
  }

  const sid = studentId || intern.studentId;
  const catalogRecord = await prisma.universityStudentCatalog.findUnique({
    where: {
      universityId_studentId: {
        universityId: resolvedUniversity.id,
        studentId: sid,
      },
    },
    select: { id: true },
  });

  const requestPayload = {
    internId,
    universityId: resolvedUniversity.id,
    catalogRecordId: catalogRecord?.id || null,
    status: catalogRecord ? 'APPROVED' : 'PENDING',
    requestedStudentId: sid,
    requestedEnrollmentYear: parsedEnrollmentYear,
    requestedCourse: course || null,
    requestedGraduationDate: parsedGraduationDate,
    reviewedAt: catalogRecord ? new Date() : null,
    notes: catalogRecord ? 'Auto-approved from university catalog match.' : null,
  };

  const internUpdate = {
    universityId: resolvedUniversity.id,
    enrollmentYear: parsedEnrollmentYear,
    course: course || null,
    graduationDate: parsedGraduationDate,
    studentVerificationStatus: catalogRecord ? 'APPROVED' : 'PENDING',
    studentVerificationNotes: catalogRecord
      ? 'Auto-approved from university catalog match.'
      : null,
  };

  if (existingPending && existingPending.universityId === resolvedUniversity.id) {
    await prisma.$transaction([
      prisma.studentVerificationRequest.update({
        where: { id: existingPending.id },
        data: {
          catalogRecordId: requestPayload.catalogRecordId,
          status: requestPayload.status,
          requestedStudentId: requestPayload.requestedStudentId,
          requestedEnrollmentYear: requestPayload.requestedEnrollmentYear,
          requestedCourse: requestPayload.requestedCourse,
          requestedGraduationDate: requestPayload.requestedGraduationDate,
          reviewedAt: requestPayload.reviewedAt,
          notes: requestPayload.notes,
        },
      }),
      prisma.intern.update({
        where: { id: internId },
        data: internUpdate,
      }),
    ]);
    return {
      success: true,
      updated: true,
      autoApproved: Boolean(catalogRecord),
      universityName: resolvedUniversity.name,
    };
  }

  await prisma.studentVerificationRequest.create({ data: requestPayload });
  await prisma.intern.update({
    where: { id: internId },
    data: internUpdate,
  });

  if (!catalogRecord) {
    try {
      await prisma.notification.create({
        data: {
          userId: resolvedUniversity.userId,
          type: 'WARNING',
          message: `${firstName} ${lastName} (student ID: ${sid}) registered on EasyIntern as a student of ${resolvedUniversity.name} and is requesting verification. Open your university dashboard to review pending requests.`,
        },
      });
    } catch (notifErr) {
      console.error('University verification notification failed:', notifErr);
    }
  }

  return {
    success: true,
    updated: false,
    autoApproved: Boolean(catalogRecord),
    universityName: resolvedUniversity.name,
  };
}

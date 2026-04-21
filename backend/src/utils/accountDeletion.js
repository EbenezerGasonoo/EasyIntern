import prisma from './db.js';

/**
 * Permanently removes intern/company users whose grace period has ended.
 */
export async function processScheduledAccountDeletions() {
  const now = new Date();
  const due = await prisma.user.findMany({
    where: {
      scheduledAccountDeletionAt: { lte: now },
      userType: { in: ['INTERN', 'COMPANY'] },
    },
    select: { id: true, email: true, userType: true },
  });

  for (const u of due) {
    try {
      await prisma.auditLog.create({
        data: {
          actorEmail: u.email,
          action: 'ACCOUNT_DELETED_SCHEDULED',
          entityType: 'User',
          entityId: u.id,
          metadata: { userType: u.userType },
        },
      });
    } catch (e) {
      console.error('[account-deletion] audit log failed', e);
    }
    await prisma.user.delete({ where: { id: u.id } });
  }

  if (due.length) {
    console.log(`[account-deletion] Permanently removed ${due.length} scheduled account(s).`);
  }
  return { removedCount: due.length };
}

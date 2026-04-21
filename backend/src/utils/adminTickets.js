const STALE_APPLICATION_DAYS = 7;
const UNVERIFIED_USER_DAYS = 2;

function toIsoSafe(date) {
  return date instanceof Date ? date.toISOString() : new Date(date).toISOString();
}

export async function buildAdminTicketFeed(prisma) {
  const staleApplicationCutoff = new Date(Date.now() - STALE_APPLICATION_DAYS * 24 * 60 * 60 * 1000);
  const unverifiedUserCutoff = new Date(Date.now() - UNVERIFIED_USER_DAYS * 24 * 60 * 60 * 1000);

  const [
    pendingCompanyVerification,
    staleApplications,
    staleUnverifiedUsers,
    activeJobs,
    supportTickets,
    pendingScheduledDeletions,
  ] = await Promise.all([
    prisma.company.findMany({
      where: {
        isVerified: false,
        OR: [
          { companyTaxId: { not: null } },
          { registrationDoc: { not: null } },
        ],
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        companyTaxId: true,
        registrationDoc: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
    prisma.application.findMany({
      where: {
        status: 'PENDING',
        appliedAt: { lte: staleApplicationCutoff },
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            company: { select: { name: true } },
          },
        },
        intern: { select: { firstName: true, lastName: true } },
      },
      orderBy: { appliedAt: 'asc' },
      take: 12,
    }),
    prisma.user.findMany({
      where: {
        isEmailVerified: false,
        createdAt: { lte: unverifiedUserCutoff },
      },
      select: {
        id: true,
        email: true,
        userType: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
      take: 12,
    }),
    prisma.job.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        company: { select: { name: true } },
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
    prisma.supportTicket.findMany({
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
      take: 50,
    }).catch(() => []),
    prisma.user
      .findMany({
        where: {
          scheduledAccountDeletionAt: { not: null, gt: new Date() },
        },
        select: {
          id: true,
          email: true,
          userType: true,
          scheduledAccountDeletionAt: true,
          updatedAt: true,
          intern: { select: { firstName: true, lastName: true } },
          company: { select: { name: true } },
        },
        orderBy: { scheduledAccountDeletionAt: 'asc' },
        take: 20,
      })
      .catch(() => []),
  ]);

  const hiringSpikeJobs = activeJobs
    .filter((job) => (job?._count?.applications || 0) >= 25)
    .slice(0, 8);

  const workflowTickets = supportTickets.map((ticket) => {
    const dueAt = ticket.dueAt ? new Date(ticket.dueAt) : null;
    const now = new Date();
    const isSlaBreached =
      ticket.slaBreached ||
      (ticket.status !== 'RESOLVED' && dueAt instanceof Date && !Number.isNaN(dueAt.getTime()) && dueAt < now);

    return {
      id: ticket.id,
      source: 'SUPPORT',
      category: ticket.category,
      priority: ticket.priority,
      status: ticket.status,
      title: ticket.subject,
      message: ticket.description,
      createdAt: toIsoSafe(ticket.createdAt),
      link: '/notifications',
      ownerAdminEmail: ticket.ownerAdminEmail,
      dueAt: ticket.dueAt ? toIsoSafe(ticket.dueAt) : null,
      internalNotes: ticket.internalNotes,
      slaBreached: isSlaBreached,
      requesterEmail: ticket.requesterEmail,
    };
  });

  const systemTickets = [
    ...pendingCompanyVerification.map((company) => ({
      id: `company-verify-${company.id}`,
      source: 'SYSTEM',
      category: 'VERIFICATION',
      priority: company.companyTaxId && company.registrationDoc ? 'HIGH' : 'MEDIUM',
      status: 'OPEN',
      title: `Review company verification: ${company.name}`,
      message: 'Company submitted verification details and is waiting for admin approval.',
      createdAt: toIsoSafe(company.createdAt),
      link: '/admin',
    })),
    ...staleApplications.map((application) => ({
      id: `application-${application.id}`,
      source: 'SYSTEM',
      category: 'HIRING',
      priority: 'MEDIUM',
      status: 'OPEN',
      title: `Pending application aging: ${application.job?.title || 'Job'}`,
      message: `${application.intern?.firstName || 'Intern'} ${application.intern?.lastName || ''}`.trim() +
        ` has been waiting on ${application.job?.company?.name || 'company'} review.`,
      createdAt: toIsoSafe(application.appliedAt),
      link: application.job?.id ? `/jobs/${application.job.id}` : '/admin',
    })),
    ...staleUnverifiedUsers.map((user) => ({
      id: `email-verify-${user.id}`,
      source: 'SYSTEM',
      category: 'ACCOUNT',
      priority: 'LOW',
      status: 'OPEN',
      title: 'Email verification follow-up',
      message: `${user.email} has not verified email (${user.userType}).`,
      createdAt: toIsoSafe(user.createdAt),
      link: '/admin',
    })),
    ...pendingScheduledDeletions.map((u) => {
      const label =
        u.userType === 'INTERN'
          ? `${u.intern?.firstName || ''} ${u.intern?.lastName || ''}`.trim() || u.email
          : u.company?.name || u.email;
      return {
        id: `scheduled-delete-${u.id}`,
        source: 'SYSTEM',
        category: 'ACCOUNT',
        priority: 'HIGH',
        status: 'OPEN',
        title: `Account deletion scheduled: ${label}`,
        message: `${u.email} (${u.userType}) requested permanent account deletion. Permanently removed after ${toIsoSafe(u.scheduledAccountDeletionAt)} (UTC) unless they cancel.`,
        createdAt: toIsoSafe(u.updatedAt),
        link: '/notifications',
      };
    }),
    ...hiringSpikeJobs.map((job) => ({
      id: `job-spike-${job.id}`,
      source: 'SYSTEM',
      category: 'SYSTEM',
      priority: 'LOW',
      status: 'INFO',
      title: 'High activity job post',
      message: `${job.title} (${job.company?.name || 'Company'}) crossed ${job._count.applications} applications.`,
      createdAt: toIsoSafe(job.createdAt),
      link: `/jobs/${job.id}`,
    })),
  ];

  const tickets = [
    ...workflowTickets,
    ...systemTickets,
  ]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 40);

  const summary = {
    total: tickets.length,
    open: tickets.filter((ticket) => ticket.status === 'OPEN').length,
    highPriority: tickets.filter((ticket) => ticket.priority === 'HIGH').length,
    byCategory: tickets.reduce((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + 1;
      return acc;
    }, {}),
  };

  return { tickets, summary };
}

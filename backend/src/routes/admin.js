import express from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../utils/db.js';
import { authenticate, requireAdmin, requireSuperAdmin } from '../middleware/auth.js';
import { buildAdminTicketFeed } from '../utils/adminTickets.js';
import { sendEmail } from '../utils/email.js';

const router = express.Router();

const ticketStatuses = new Set(['OPEN', 'IN_PROGRESS', 'RESOLVED']);
const ticketPriorities = new Set(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
const allowedAdminRoles = new Set(['SUPER_ADMIN', 'OPS_ADMIN', 'SUPPORT_ADMIN']);

const DEFAULT_SETTINGS = {
  security: {
    sessionTimeoutMinutes: 60,
    passwordMinLength: 10,
    enforceTwoFactor: false,
  },
  moderation: {
    autoHideRiskyJobs: true,
    riskyJobScoreThreshold: 80,
    duplicateCompanySignalThreshold: 2,
    suspiciousSignupBurstPerHour: 20,
  },
  notifications: {
    staleApplicationReminderDays: 7,
    ticketEscalationHours: 24,
    sendTicketDigestDaily: true,
  },
  verification: {
    requireCompanyTaxId: true,
    requireRegistrationDocument: true,
    verificationSlaHours: 48,
  },
};

router.get('/overview', authenticate, requireAdmin, async (req, res) => {
  try {
    const range = String(req.query.range || '30d').toLowerCase();
    const rangeToDays = { '7d': 7, '30d': 30, '90d': 90, all: null };
    const days = Object.prototype.hasOwnProperty.call(rangeToDays, range) ? rangeToDays[range] : 30;
    const sinceDate = days ? new Date(Date.now() - days * 24 * 60 * 60 * 1000) : null;
    const createdFilter = sinceDate ? { gte: sinceDate } : undefined;

    const [
      totalCompanies,
      totalInterns,
      totalJobs,
      totalApplications,
      totalNotifications,
      verifiedCompanies,
      verifiedInterns,
      submittedResumes,
      companies,
      interns,
      recentJobs,
      recentUsers,
    ] = await Promise.all([
      prisma.company.count({ where: createdFilter ? { createdAt: createdFilter } : undefined }),
      prisma.intern.count({ where: createdFilter ? { createdAt: createdFilter } : undefined }),
      prisma.job.count({ where: createdFilter ? { createdAt: createdFilter } : undefined }),
      prisma.application.count({ where: createdFilter ? { appliedAt: createdFilter } : undefined }),
      prisma.notification.count({ where: createdFilter ? { createdAt: createdFilter } : undefined }),
      prisma.company.count({
        where: {
          isVerified: true,
          ...(createdFilter ? { createdAt: createdFilter } : {}),
        },
      }),
      prisma.intern.count({
        where: {
          isVerified: true,
          ...(createdFilter ? { createdAt: createdFilter } : {}),
        },
      }),
      prisma.intern.count({
        where: {
          resume: { not: null },
          ...(createdFilter ? { createdAt: createdFilter } : {}),
        },
      }),
      prisma.company.findMany({
        where: createdFilter ? { createdAt: createdFilter } : undefined,
        select: { industry: true },
      }),
      prisma.intern.findMany({
        where: createdFilter ? { createdAt: createdFilter } : undefined,
        select: { preferredIndustry: true },
      }),
      prisma.job.findMany({
        where: createdFilter ? { createdAt: createdFilter } : undefined,
        select: {
          id: true,
          title: true,
          createdAt: true,
          location: true,
          company: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 8,
      }),
      prisma.user.findMany({
        where: createdFilter ? { createdAt: createdFilter } : undefined,
        select: { id: true, email: true, userType: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 8,
      }),
    ]);

    const groupByIndustry = (list, key) => {
      const counts = {};
      list.forEach((item) => {
        const raw = item?.[key];
        const name = raw && String(raw).trim() ? String(raw).trim() : 'Unspecified';
        counts[name] = (counts[name] || 0) + 1;
      });
      const total = Object.values(counts).reduce((sum, n) => sum + n, 0) || 1;
      return Object.entries(counts)
        .map(([industry, count]) => ({
          industry,
          count,
          percent: Math.round((count / total) * 100),
        }))
        .sort((a, b) => b.count - a.count);
    };

    const companyIndustryBreakdown = groupByIndustry(companies, 'industry');
    const internIndustryBreakdown = groupByIndustry(interns, 'preferredIndustry');

    const ticketFeed = await buildAdminTicketFeed(prisma);

    res.json({
      range: days ? `${days}d` : 'all',
      metrics: {
        totalCompanies,
        totalInterns,
        totalJobs,
        totalApplications,
        totalNotifications,
        verifiedCompanies,
        verifiedInterns,
        submittedResumes,
      },
      companyIndustryBreakdown,
      internIndustryBreakdown,
      recentJobs,
      recentUsers,
      ticketSummary: ticketFeed.summary,
      recentTickets: ticketFeed.tickets.slice(0, 10),
    });
  } catch (error) {
    console.error('Get admin overview error:', error);
    res.status(500).json({ error: 'Failed to get admin overview' });
  }
});

router.get('/tickets', authenticate, requireAdmin, async (req, res) => {
  try {
    const ticketFeed = await buildAdminTicketFeed(prisma);
    res.json(ticketFeed);
  } catch (error) {
    console.error('Get admin tickets error:', error);
    res.status(500).json({ error: 'Failed to get admin tickets' });
  }
});

router.patch('/tickets/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { status, priority, ownerAdminEmail, dueAt, internalNotes, slaBreached } = req.body || {};

    const data = {};

    if (status !== undefined) {
      if (!ticketStatuses.has(String(status))) {
        return res.status(400).json({ error: 'Invalid ticket status' });
      }
      data.status = String(status);
      if (String(status) === 'RESOLVED') {
        data.resolvedAt = new Date();
      }
    }

    if (priority !== undefined) {
      if (!ticketPriorities.has(String(priority))) {
        return res.status(400).json({ error: 'Invalid ticket priority' });
      }
      data.priority = String(priority);
    }

    if (ownerAdminEmail !== undefined) {
      data.ownerAdminEmail = ownerAdminEmail ? String(ownerAdminEmail).trim() : null;
    }

    if (dueAt !== undefined) {
      data.dueAt = dueAt ? new Date(dueAt) : null;
    }

    if (internalNotes !== undefined) {
      data.internalNotes = internalNotes ? String(internalNotes) : null;
    }

    if (slaBreached !== undefined) {
      data.slaBreached = Boolean(slaBreached);
    }

    data.lastActivityAt = new Date();

    const updated = await prisma.supportTicket.update({
      where: { id: req.params.id },
      data,
    });

    await prisma.auditLog.create({
      data: {
        actorUserId: req.userId !== 'admin' ? req.userId : null,
        actorEmail: req.adminEmail || null,
        action: 'ADMIN_TICKET_UPDATED',
        entityType: 'SUPPORT_TICKET',
        entityId: updated.id,
        metadata: data,
      },
    }).catch(() => null);

    res.json(updated);
  } catch (error) {
    console.error('Update admin ticket error:', error);
    res.status(500).json({ error: 'Failed to update ticket' });
  }
});

router.get('/smtp-config', authenticate, requireAdmin, async (req, res) => {
  try {
    const config = await prisma.smtpConfiguration.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    if (!config) {
      return res.json({ configured: false });
    }

    res.json({
      configured: true,
      id: config.id,
      host: config.host,
      port: config.port,
      secure: config.secure,
      username: config.username,
      fromName: config.fromName,
      fromEmail: config.fromEmail,
      isActive: config.isActive,
      updatedBy: config.updatedBy,
      updatedAt: config.updatedAt,
      passwordMasked: config.password ? '********' : '',
    });
  } catch (error) {
    console.error('Get smtp config error:', error);
    res.status(500).json({ error: 'Failed to get SMTP config' });
  }
});

router.put('/smtp-config', authenticate, requireAdmin, async (req, res) => {
  try {
    const {
      host,
      port,
      secure,
      username,
      password,
      fromName,
      fromEmail,
      isActive,
    } = req.body || {};

    if (!host || !username || !fromEmail) {
      return res.status(400).json({ error: 'Host, username, and from email are required' });
    }

    const hostNormalized = String(host).trim().toLowerCase() === 'mail.easyintern.app'
      ? 'easyintern.app'
      : String(host).trim();

    const previous = await prisma.smtpConfiguration.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    const nextPassword = password && String(password).trim()
      ? String(password).trim()
      : previous?.password;

    if (!nextPassword) {
      return res.status(400).json({ error: 'SMTP password is required for first-time setup' });
    }

    const saved = await prisma.smtpConfiguration.create({
      data: {
        host: hostNormalized,
        port: Number(port) || 587,
        secure: Boolean(secure),
        username: String(username).trim(),
        password: nextPassword,
        fromName: fromName ? String(fromName).trim() : 'EasyIntern',
        fromEmail: String(fromEmail).trim(),
        isActive: isActive !== false,
        updatedBy: req.adminEmail || 'admin',
      },
    });

    await prisma.auditLog.create({
      data: {
        actorUserId: req.userId !== 'admin' ? req.userId : null,
        actorEmail: req.adminEmail || null,
        action: 'SMTP_CONFIGURATION_UPDATED',
        entityType: 'SMTP_CONFIGURATION',
        entityId: saved.id,
        metadata: {
          host: saved.host,
          port: saved.port,
          secure: saved.secure,
          username: saved.username,
          fromEmail: saved.fromEmail,
          isActive: saved.isActive,
        },
      },
    }).catch(() => null);

    res.json({
      message: 'SMTP configuration saved',
      configured: true,
      id: saved.id,
      host: saved.host,
      port: saved.port,
      secure: saved.secure,
      username: saved.username,
      fromName: saved.fromName,
      fromEmail: saved.fromEmail,
      isActive: saved.isActive,
      updatedAt: saved.updatedAt,
      passwordMasked: '********',
    });
  } catch (error) {
    console.error('Update smtp config error:', error);
    res.status(500).json({ error: 'Failed to save SMTP config' });
  }
});

router.post('/smtp-config/test', authenticate, requireAdmin, async (req, res) => {
  try {
    const testTo = req.body?.to || req.adminEmail || process.env.ADMIN_EMAIL;
    if (!testTo) {
      return res.status(400).json({ error: 'No recipient email provided for test send' });
    }

    await sendEmail({
      to: testTo,
      subject: 'EasyIntern SMTP Test',
      html: `<p>SMTP test successful.</p><p>Time: ${new Date().toISOString()}</p>`,
      text: `SMTP test successful at ${new Date().toISOString()}`,
    });

    res.json({ message: 'SMTP test email sent successfully' });
  } catch (error) {
    console.error('SMTP test send error:', error);
    res.status(500).json({ error: 'Failed to send SMTP test email' });
  }
});

router.get('/settings', authenticate, requireAdmin, async (req, res) => {
  try {
    const row = await prisma.adminSetting.findUnique({
      where: { key: 'platform' },
    });
    if (!row) {
      return res.json({
        settings: DEFAULT_SETTINGS,
        configured: false,
      });
    }

    res.json({
      settings: row.value || DEFAULT_SETTINGS,
      configured: true,
      updatedAt: row.updatedAt,
      updatedBy: row.updatedBy,
    });
  } catch (error) {
    console.error('Get admin settings error:', error);
    res.status(500).json({ error: 'Failed to get admin settings' });
  }
});

router.put('/settings', authenticate, requireAdmin, async (req, res) => {
  try {
    const incoming = req.body?.settings;
    if (!incoming || typeof incoming !== 'object') {
      return res.status(400).json({ error: 'Invalid settings payload' });
    }

    const merged = {
      ...DEFAULT_SETTINGS,
      ...incoming,
      security: { ...DEFAULT_SETTINGS.security, ...(incoming.security || {}) },
      moderation: { ...DEFAULT_SETTINGS.moderation, ...(incoming.moderation || {}) },
      notifications: { ...DEFAULT_SETTINGS.notifications, ...(incoming.notifications || {}) },
      verification: { ...DEFAULT_SETTINGS.verification, ...(incoming.verification || {}) },
    };

    const saved = await prisma.adminSetting.upsert({
      where: { key: 'platform' },
      update: {
        value: merged,
        updatedBy: req.adminEmail || null,
      },
      create: {
        key: 'platform',
        value: merged,
        updatedBy: req.adminEmail || null,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorUserId: req.userId !== 'admin' ? req.userId : null,
        actorEmail: req.adminEmail || null,
        action: 'ADMIN_SETTINGS_UPDATED',
        entityType: 'ADMIN_SETTING',
        entityId: saved.id,
      },
    }).catch(() => null);

    res.json({
      message: 'Admin settings saved',
      settings: saved.value,
      updatedAt: saved.updatedAt,
      updatedBy: saved.updatedBy,
    });
  } catch (error) {
    console.error('Update admin settings error:', error);
    res.status(500).json({ error: 'Failed to save admin settings' });
  }
});

router.get('/admin-users', authenticate, requireSuperAdmin, async (req, res) => {
  try {
    const admins = await prisma.user.findMany({
      where: { isAdmin: true },
      select: {
        id: true,
        email: true,
        adminRole: true,
        isSuspended: true,
        suspensionReason: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    res.json(admins);
  } catch (error) {
    console.error('Get admin users error:', error);
    res.status(500).json({ error: 'Failed to get admin users' });
  }
});

router.post('/admin-users', authenticate, requireSuperAdmin, async (req, res) => {
  try {
    const { email, password, role } = req.body || {};
    const normalizedRole = String(role || '').toUpperCase();
    if (!email || !password || !allowedAdminRoles.has(normalizedRole)) {
      return res.status(400).json({ error: 'Email, password, and valid role are required' });
    }
    if (String(password).length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.user.create({
      data: {
        email: String(email).trim().toLowerCase(),
        password: hashedPassword,
        userType: 'ADMIN',
        isAdmin: true,
        adminRole: normalizedRole,
        isEmailVerified: true,
      },
      select: {
        id: true,
        email: true,
        adminRole: true,
        isSuspended: true,
        createdAt: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorUserId: req.userId !== 'admin' ? req.userId : null,
        actorEmail: req.adminEmail || null,
        action: 'ADMIN_USER_CREATED',
        entityType: 'USER',
        entityId: admin.id,
        metadata: { role: normalizedRole, email: admin.email },
      },
    }).catch(() => null);

    res.status(201).json(admin);
  } catch (error) {
    console.error('Create admin user error:', error);
    res.status(500).json({ error: 'Failed to create admin user' });
  }
});

router.patch('/admin-users/:id', authenticate, requireSuperAdmin, async (req, res) => {
  try {
    const { role, isSuspended, suspensionReason } = req.body || {};

    const data = {};
    if (role !== undefined) {
      const normalizedRole = String(role).toUpperCase();
      if (!allowedAdminRoles.has(normalizedRole)) {
        return res.status(400).json({ error: 'Invalid admin role' });
      }
      data.adminRole = normalizedRole;
    }
    if (isSuspended !== undefined) {
      data.isSuspended = Boolean(isSuspended);
      data.suspendedAt = data.isSuspended ? new Date() : null;
      data.suspensionReason = data.isSuspended ? (suspensionReason ? String(suspensionReason) : 'Suspended by super admin') : null;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'No changes provided' });
    }

    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data,
      select: {
        id: true,
        email: true,
        adminRole: true,
        isSuspended: true,
        suspensionReason: true,
        updatedAt: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorUserId: req.userId !== 'admin' ? req.userId : null,
        actorEmail: req.adminEmail || null,
        action: 'ADMIN_USER_UPDATED',
        entityType: 'USER',
        entityId: updated.id,
        reason: updated.suspensionReason || null,
        metadata: data,
      },
    }).catch(() => null);

    res.json(updated);
  } catch (error) {
    console.error('Update admin user error:', error);
    res.status(500).json({ error: 'Failed to update admin user' });
  }
});

router.patch('/admin-users/:id/reset-password', authenticate, requireSuperAdmin, async (req, res) => {
  try {
    const { newPassword } = req.body || {};
    if (!newPassword || String(newPassword).length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters long' });
    }

    const hashedPassword = await bcrypt.hash(String(newPassword), 10);
    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        password: hashedPassword,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        adminRole: true,
        updatedAt: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorUserId: req.userId !== 'admin' ? req.userId : null,
        actorEmail: req.adminEmail || null,
        action: 'ADMIN_USER_PASSWORD_RESET',
        entityType: 'USER',
        entityId: updated.id,
      },
    }).catch(() => null);

    res.json({ message: 'Admin password reset successfully', user: updated });
  } catch (error) {
    console.error('Reset admin password error:', error);
    res.status(500).json({ error: 'Failed to reset admin password' });
  }
});

export default router;

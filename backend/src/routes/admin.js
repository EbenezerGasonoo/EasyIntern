import express from 'express';
import prisma from '../utils/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

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
    });
  } catch (error) {
    console.error('Get admin overview error:', error);
    res.status(500).json({ error: 'Failed to get admin overview' });
  }
});

export default router;

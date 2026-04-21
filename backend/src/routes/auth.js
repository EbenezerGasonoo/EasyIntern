import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../utils/db.js';
import { authenticate } from '../middleware/auth.js';
import { sendEmail } from '../utils/email.js';

const router = express.Router();

const ACCOUNT_DELETION_GRACE_MS = 3 * 24 * 60 * 60 * 1000;

/** Links in emails (verify email, password reset). Set `FRONTEND_URL` on the API; production falls back to easyintern.app. */
function frontendBaseUrl() {
  const raw = process.env.FRONTEND_URL?.trim();
  if (raw) return raw.replace(/\/$/, '');
  if (process.env.NODE_ENV === 'production') return 'https://easyintern.app';
  return 'http://localhost:3000';
}

async function sendVerificationEmail(to, verificationToken) {
  const verifyUrl = `${frontendBaseUrl()}/verify-email?token=${verificationToken}`;
  await sendEmail({
    to,
    subject: 'Verify your EasyIntern account',
    html: `<h1>Welcome to EasyIntern!</h1><p>Please click the link below to verify your email address:</p><p><a href="${verifyUrl}">${verifyUrl}</a></p>`,
  });
}

// Admin Login (hidden route use)
router.post('/admin-login', async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'Server misconfiguration: JWT_SECRET is not set' });
    }
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Production path: DB-backed admin account
    const adminUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true, isAdmin: true, isSuspended: true, adminRole: true },
    });

    if (adminUser?.isAdmin) {
      if (adminUser.isSuspended) {
        return res.status(403).json({ error: 'Admin account is suspended' });
      }

      const dbPasswordValid = await bcrypt.compare(password, adminUser.password);
      if (!dbPasswordValid) {
        return res.status(401).json({ error: 'Invalid admin credentials' });
      }

      const token = jwt.sign(
        { userId: adminUser.id, userType: 'ADMIN', isAdmin: true, email: adminUser.email, adminRole: adminUser.adminRole || 'SUPER_ADMIN' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        token,
        user: {
          id: adminUser.id,
          email: adminUser.email,
          userType: 'ADMIN',
          isAdmin: true,
          adminRole: adminUser.adminRole || 'SUPER_ADMIN',
        },
      });
    }

    // Fallback path: ENV-based admin (backward compatibility)
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      return res.status(500).json({ error: 'Admin login is not configured on the server.' });
    }
    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const token = jwt.sign(
      { userId: 'admin', userType: 'ADMIN', isAdmin: true, email: adminEmail, adminRole: 'SUPER_ADMIN' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: 'admin',
        email: adminEmail,
        userType: 'ADMIN',
        isAdmin: true,
        adminRole: 'SUPER_ADMIN',
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Admin login failed' });
  }
});

// Register Company
router.post('/register/company', async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'Server misconfiguration: JWT_SECRET is not set' });
    }
    const { email, password, name, description, website, industry, location, phone, companySize, internIntake, mapLocation } = req.body;

    if (!email || !password || !name || !companySize) {
      return res.status(400).json({ error: 'Email, password, company name, and company size are required' });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user and company
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userType: 'COMPANY',
        verificationToken,
        company: {
          create: {
            name,
            description,
            website,
            industry,
            location,
            phone,
            companySize,
            internIntake,
            mapLocation
          },
        },
      },
      include: { company: true },
    });

    // Send verification email (do not fail signup if SMTP is misconfigured)
    const verifyUrl = `${frontendBaseUrl()}/verify-email?token=${verificationToken}`;
    let emailSent = true;
    try {
      await sendEmail({
        to: email,
        subject: 'Verify your EasyIntern account',
        html: `<h1>Welcome to EasyIntern!</h1><p>Please click the link below to verify your email address:</p><a href="${verifyUrl}">${verifyUrl}</a>`,
      });
    } catch (emailErr) {
      console.error('Company verification email failed:', emailErr);
      emailSent = false;
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      emailSent,
      emailWarning: emailSent ? undefined : 'Verification email could not be sent. Check SMTP settings; you can still log in.',
      user: {
        id: user.id,
        email: user.email,
        userType: user.userType,
        isEmailVerified: user.isEmailVerified,
        company: user.company,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    const message = error.code === 'P2002' ? 'This email is already registered' : (error.message || 'Registration failed');
    res.status(500).json({ error: message });
  }
});

// Register Intern
router.post('/register/intern', async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'Server misconfiguration: JWT_SECRET is not set' });
    }
    const { email, password, firstName, lastName, studentId, bio, skills, education, educationWebsite, location, phone, experience } = req.body;

    if (!email || !password || !firstName || !lastName || !studentId) {
      return res.status(400).json({ error: 'Email, password, first name, last name, and student ID are required' });
    }

    // Normalize skills to array of non-empty strings
    const skillsArray = Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : []);
    const skillsClean = skillsArray.filter(Boolean);

    if (educationWebsite) {
      try {
        new URL(educationWebsite);
      } catch {
        return res.status(400).json({ error: 'Please provide a valid education website URL' });
      }
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user and intern
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userType: 'INTERN',
        verificationToken,
        intern: {
          create: {
            firstName,
            lastName,
            studentId,
            bio,
            phone,
            experience: experience || null,
            skills: skillsClean,
            education: education || null,
            educationWebsite: educationWebsite || null,
            location: location || null,
          },
        },
      },
      include: { intern: true },
    });

    // Send verification email (do not fail signup if SMTP is misconfigured)
    const verifyUrl = `${frontendBaseUrl()}/verify-email?token=${verificationToken}`;
    let emailSent = true;
    try {
      await sendEmail({
        to: email,
        subject: 'Verify your EasyIntern account',
        html: `<h1>Welcome to EasyIntern!</h1><p>Please click the link below to verify your email address:</p><a href="${verifyUrl}">${verifyUrl}</a>`,
      });
    } catch (emailErr) {
      console.error('Intern verification email failed:', emailErr);
      emailSent = false;
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      emailSent,
      emailWarning: emailSent ? undefined : 'Verification email could not be sent. Check SMTP settings; you can still log in.',
      user: {
        id: user.id,
        email: user.email,
        userType: user.userType,
        isEmailVerified: user.isEmailVerified,
        intern: user.intern,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    const message = error.code === 'P2002' ? 'This email is already registered' : (error.message || 'Registration failed');
    res.status(500).json({ error: message });
  }
});

// Verify Email
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: 'Token is required' });

    const user = await prisma.user.findFirst({
      where: { verificationToken: token }
    });

    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        verificationToken: null
      }
    });

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Resend verification email (session JWT after signup, or email for signed-out users)
router.post('/resend-verification', async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'Server misconfiguration: JWT_SECRET is not set' });
    }

    let resolvedUserId = null;
    const bearer = req.headers.authorization?.split(' ')[1];
    if (bearer) {
      try {
        const decoded = jwt.verify(bearer, process.env.JWT_SECRET);
        if (decoded?.userId && !decoded.isAdmin) {
          resolvedUserId = decoded.userId;
        }
      } catch {
        /* invalid token — may still use email below */
      }
    }

    const emailRaw = req.body?.email != null ? String(req.body.email).trim().toLowerCase() : '';

    const select = {
      id: true,
      email: true,
      isEmailVerified: true,
      userType: true,
    };

    let user = null;
    if (resolvedUserId) {
      user = await prisma.user.findUnique({ where: { id: resolvedUserId }, select: select });
    }
    if (!user && emailRaw) {
      user = await prisma.user.findUnique({ where: { email: emailRaw }, select: select });
    }

    if (!resolvedUserId && !emailRaw) {
      return res.status(400).json({
        error: 'Enter the email you registered with, or stay signed in and try again.',
      });
    }

    if (!user || user.isEmailVerified || user.userType === 'ADMIN') {
      return res.json({
        message: 'If that account still needs verification, we sent a new link to its email.',
      });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    await prisma.user.update({
      where: { id: user.id },
      data: { verificationToken },
    });

    try {
      await sendVerificationEmail(user.email, verificationToken);
    } catch (emailErr) {
      console.error('Resend verification email failed:', emailErr);
      return res.status(503).json({
        error: 'We could not send the email right now. Try again in a few minutes.',
      });
    }

    res.json({ message: 'Check your inbox for a new verification link.' });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ error: 'Could not resend verification email' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { company: true, intern: true },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        userType: user.userType,
        isEmailVerified: user.isEmailVerified,
        company: user.company,
        intern: user.intern,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success-like response to prevent email enumeration
    if (!user) {
      return res.json({ message: 'If an account exists for that email, a reset link has been sent.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    const resetUrl = `${frontendBaseUrl()}/reset-password?token=${resetToken}`;
    await sendEmail({
      to: email,
      subject: 'Reset your EasyIntern password',
      html: `<h1>Password Reset Request</h1><p>Click the link below to reset your password. This link expires in 1 hour.</p><a href="${resetUrl}">${resetUrl}</a>`,
    });

    res.json({ message: 'If an account exists for that email, a reset link has been sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process forgot password request' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: 'Token and new password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// Get current user
router.get('/me', authenticate, async (req, res) => {
  try {
    if (req.isAdmin) {
      const dbAdmin = req.userId && req.userId !== 'admin'
        ? await prisma.user.findUnique({
          where: { id: req.userId },
          select: { id: true, email: true, isAdmin: true },
        }).catch(() => null)
        : null;

      return res.json({
        id: dbAdmin?.id || 'admin',
        email: dbAdmin?.email || req.adminEmail || process.env.ADMIN_EMAIL || 'admin',
        userType: 'ADMIN',
        isAdmin: true,
        isEmailVerified: true,
        adminRole: dbAdmin?.adminRole || req.adminRole || 'SUPER_ADMIN',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        company: true,
        intern: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      userType: user.userType,
      isEmailVerified: user.isEmailVerified,
      scheduledAccountDeletionAt: user.scheduledAccountDeletionAt,
      company: user.company,
      intern: user.intern,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Schedule permanent account deletion (3-day grace). Alerts admins via support ticket.
router.post('/account/schedule-deletion', authenticate, async (req, res) => {
  try {
    if (req.isAdmin) {
      return res.status(403).json({ error: 'Admin accounts cannot use this flow.' });
    }

    const { password } = req.body || {};
    if (!password || !String(password).length) {
      return res.status(400).json({ error: 'Password is required to confirm account deletion.' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        password: true,
        userType: true,
        scheduledAccountDeletionAt: true,
        isAdmin: true,
        intern: { select: { firstName: true, lastName: true } },
        company: { select: { name: true } },
      },
    });

    if (!user || user.isAdmin) {
      return res.status(403).json({ error: 'Not allowed.' });
    }
    if (user.userType !== 'INTERN' && user.userType !== 'COMPANY') {
      return res.status(403).json({ error: 'Not allowed.' });
    }
    if (user.scheduledAccountDeletionAt) {
      return res.status(409).json({
        error: 'Account deletion is already scheduled.',
        scheduledAccountDeletionAt: user.scheduledAccountDeletionAt,
      });
    }

    const passwordOk = await bcrypt.compare(String(password), user.password);
    if (!passwordOk) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    const scheduledAccountDeletionAt = new Date(Date.now() + ACCOUNT_DELETION_GRACE_MS);
    const profileLabel =
      user.userType === 'INTERN'
        ? `${user.intern?.firstName || ''} ${user.intern?.lastName || ''}`.trim() || 'Intern'
        : user.company?.name || 'Company';

    const description = [
      'User requested permanent account deletion from the dashboard.',
      '',
      `User ID: ${user.id}`,
      `Email: ${user.email}`,
      `Account type: ${user.userType}`,
      `Profile / display name: ${profileLabel}`,
      '',
      `Scheduled permanent deletion (UTC): ${scheduledAccountDeletionAt.toISOString()}`,
      'Grace period: 3 days from this request.',
      '',
      'The user may cancel deletion from their dashboard before that time.',
    ].join('\n');

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { scheduledAccountDeletionAt },
      }),
      prisma.supportTicket.create({
        data: {
          requesterUserId: user.id,
          requesterEmail: user.email,
          category: 'ACCOUNT',
          priority: 'HIGH',
          subject: `Scheduled account deletion: ${user.email} (${user.userType})`,
          description,
        },
      }),
      prisma.auditLog.create({
        data: {
          actorUserId: user.id,
          actorEmail: user.email,
          action: 'ACCOUNT_DELETION_SCHEDULED',
          entityType: 'User',
          entityId: user.id,
          metadata: {
            scheduledAccountDeletionAt: scheduledAccountDeletionAt.toISOString(),
            userType: user.userType,
          },
        },
      }),
    ]);

    res.json({
      message:
        'Your account is scheduled for permanent deletion in 3 days. You can cancel anytime from your dashboard before then.',
      scheduledAccountDeletionAt,
    });
  } catch (error) {
    console.error('Schedule account deletion error:', error);
    res.status(500).json({ error: 'Failed to schedule account deletion' });
  }
});

router.post('/account/cancel-deletion', authenticate, async (req, res) => {
  try {
    if (req.isAdmin) {
      return res.status(403).json({ error: 'Not allowed.' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, scheduledAccountDeletionAt: true, isAdmin: true },
    });

    if (!user?.scheduledAccountDeletionAt) {
      return res.status(400).json({ error: 'No account deletion is scheduled.' });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { scheduledAccountDeletionAt: null },
      }),
      prisma.auditLog.create({
        data: {
          actorUserId: user.id,
          actorEmail: user.email,
          action: 'ACCOUNT_DELETION_CANCELLED',
          entityType: 'User',
          entityId: user.id,
        },
      }),
    ]);

    res.json({ message: 'Scheduled account deletion has been cancelled. Your account will remain active.' });
  } catch (error) {
    console.error('Cancel account deletion error:', error);
    res.status(500).json({ error: 'Failed to cancel scheduled deletion' });
  }
});

export default router;

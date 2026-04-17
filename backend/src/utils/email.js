import nodemailer from 'nodemailer';
import prisma from './db.js';

let cachedConfig = null;
let cachedAt = 0;
const CACHE_TTL_MS = 60 * 1000;

const getEnvSmtpConfig = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  return {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    username: process.env.SMTP_USER,
    password: process.env.SMTP_PASS,
    fromName: process.env.SMTP_FROM_NAME || 'Easy Intern',
    fromEmail: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
  };
};

const getDbSmtpConfig = async () => {
  try {
    const now = Date.now();
    if (cachedConfig && now - cachedAt < CACHE_TTL_MS) {
      return cachedConfig;
    }

    const config = await prisma.smtpConfiguration.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' },
    });

    cachedConfig = config || null;
    cachedAt = now;
    return cachedConfig;
  } catch (error) {
    return null;
  }
};

const getActiveSmtpConfig = async () => {
  const dbConfig = await getDbSmtpConfig();
  if (dbConfig) return dbConfig;
  return getEnvSmtpConfig();
};

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const smtpConfig = await getActiveSmtpConfig();
    if (!smtpConfig) {
      throw new Error('SMTP is not configured');
    }

    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: Number(smtpConfig.port || 587),
      secure: Boolean(smtpConfig.secure),
      auth: {
        user: smtpConfig.username,
        pass: smtpConfig.password,
      },
    });

    const info = await transporter.sendMail({
      from: `"${smtpConfig.fromName || 'Easy Intern'}" <${smtpConfig.fromEmail || smtpConfig.username}>`,
      to,
      subject,
      html,
      text,
    });
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Send email error:', error);
    // Don't throw in development if SMTP is not configured
    if (process.env.NODE_ENV === 'production') {
       throw error;
    }
    return null;
  }
};

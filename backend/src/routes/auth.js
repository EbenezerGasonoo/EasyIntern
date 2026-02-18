import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Register Company
router.post('/register/company', async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'Server misconfiguration: JWT_SECRET is not set' });
    }
    const { email, password, name, description, website, industry, location } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and company name are required' });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and company
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userType: 'COMPANY',
        company: {
          create: {
            name,
            description,
            website,
            industry,
            location,
          },
        },
      },
      include: { company: true },
    });

    // Generate token
    const token = jwt.sign(
      { userId: user.id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        userType: user.userType,
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
    const { email, password, firstName, lastName, bio, skills, education, location } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Email, password, first name, and last name are required' });
    }

    // Normalize skills to array of non-empty strings
    const skillsArray = Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : []);
    const skillsClean = skillsArray.filter(Boolean);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and intern
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userType: 'INTERN',
        intern: {
          create: {
            firstName,
            lastName,
            bio,
            skills: skillsClean,
            education: education || null,
            location: location || null,
          },
        },
      },
      include: { intern: true },
    });

    // Generate token
    const token = jwt.sign(
      { userId: user.id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        userType: user.userType,
        intern: user.intern,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    const message = error.code === 'P2002' ? 'This email is already registered' : (error.message || 'Registration failed');
    res.status(500).json({ error: message });
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
        company: user.company,
        intern: user.intern,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { company: true, intern: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      userType: user.userType,
      company: user.company,
      intern: user.intern,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

export default router;

import express from 'express';
import { authenticate } from '../middleware/auth.js';
import prisma from '../utils/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const saveLocalFile = (base64Data, originalName, userId) => {
    const extension = path.extname(originalName) || '.png';
    const fileName = `${userId}_${Date.now()}${extension}`;
    const filePath = path.join(uploadDir, fileName);
    
    // Remove header if present
    const base64Content = base64Data.includes('base64,') 
        ? base64Data.split('base64,')[1] 
        : base64Data;
        
    const buffer = Buffer.from(base64Content, 'base64');
    fs.writeFileSync(filePath, buffer);
    
    return fileName;
};

router.post('/profile-pic', authenticate, async (req, res) => {
  try {
    const { image, fileName } = req.body;
    if (!image) return res.status(400).json({ error: 'No image provided' });

    const savedFileName = saveLocalFile(image, fileName || 'profile.png', req.userId);
    const protocol = req.protocol === 'http' && req.headers['x-forwarded-proto'] === 'https' ? 'https' : req.protocol;
    const publicUrl = `${protocol}://${req.get('host')}/uploads/${savedFileName}`;

    // Update user profile
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { company: true, intern: true }
    });

    if (user.userType === 'COMPANY') {
      await prisma.company.update({
        where: { userId: req.userId },
        data: { logo: publicUrl }
      });
    } else {
      await prisma.intern.update({
        where: { userId: req.userId },
        data: { profilePic: publicUrl }
      });
    }

    res.json({ url: publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

router.post('/document', authenticate, async (req, res) => {
  try {
    const { file, fileName, type } = req.body;
    if (!file) return res.status(400).json({ error: 'No file provided' });

    const savedFileName = saveLocalFile(file, fileName, req.userId);
    const protocol = req.protocol === 'http' && req.headers['x-forwarded-proto'] === 'https' ? 'https' : req.protocol;
    const publicUrl = `${protocol}://${req.get('host')}/uploads/${savedFileName}`;

    if (type === 'registration') {
        await prisma.company.update({
            where: { userId: req.userId },
            data: { registrationDoc: publicUrl }
        });
    } else if (type === 'resume') {
        await prisma.intern.update({
            where: { userId: req.userId },
            data: { resume: publicUrl }
        });
    } else if (type === 'ghana-card') {
        await prisma.intern.update({
            where: { userId: req.userId },
            data: { ghanaCardDocument: publicUrl }
        });
    }

    res.json({ url: publicUrl });
  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

export default router;

import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getSupabase, PROFILE_BUCKET } from '../utils/supabase.js';
import prisma from '../utils/db.js';

const router = express.Router();

router.post('/profile-pic', authenticate, async (req, res) => {
  try {
    const { image, fileName } = req.body; // Base64 image
    if (!image) return res.status(400).json({ error: 'No image provided' });

    const supabase = getSupabase();
    if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });

    const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const path = `${req.userId}/${Date.now()}_${fileName || 'profile.png'}`;

    const { data, error } = await supabase.storage
      .from(PROFILE_BUCKET)
      .upload(path, buffer, {
        contentType: 'image/png',
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(PROFILE_BUCKET)
      .getPublicUrl(path);

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
    const { file, fileName, type } = req.body; // Base64 file
    if (!file) return res.status(400).json({ error: 'No file provided' });

    const supabase = getSupabase();
    if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });

    const buffer = Buffer.from(file.split(',')[1], 'base64');
    const path = `${req.userId}/docs/${Date.now()}_${fileName}`;

    const { data, error } = await supabase.storage
      .from('documents')
      .upload(path, buffer, {
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(path);

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
    }

    res.json({ url: publicUrl });
  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

export default router;

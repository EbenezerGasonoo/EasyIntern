import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import companyRoutes from './routes/company.js';
import internRoutes from './routes/intern.js';
import jobRoutes from './routes/job.js';
import applicationRoutes from './routes/application.js';
import uploadRoutes from './routes/upload.js';
import notificationRoutes from './routes/notification.js';
import adminRoutes from './routes/admin.js';
import supportRoutes from './routes/support.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://easyintern.app',
  'https://www.easyintern.app',
  'http://localhost:3000',
  'http://localhost:3001',
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow server-to-server / curl requests without Origin header
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS not allowed for this origin'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/intern', internRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/support', supportRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'EasyIntern API is running' });
});

// Root – so backend URL doesn’t 404 on Vercel
app.get('/', (req, res) => {
  res.redirect(302, '/api/health');
});
app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'EasyIntern API', docs: '/api/health' });
});

// Only listen when running locally (not on Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;

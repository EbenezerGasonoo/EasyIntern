import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import companyRoutes from './routes/company.js';
import internRoutes from './routes/intern.js';
import jobRoutes from './routes/job.js';
import applicationRoutes from './routes/application.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '6mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/intern', internRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

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

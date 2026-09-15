import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''));

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '2mb' }));

const portfolioSchema = new mongoose.Schema({
  key: { type: String, unique: true, default: 'main' },
  data: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

const createToken = () => jwt.sign({ role: 'owner' }, process.env.JWT_SECRET, { expiresIn: '7d' });

const requireOwner = (request, response, next) => {
  const token = request.headers.authorization?.replace('Bearer ', '');
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    response.status(401).json({ message: 'Unauthorized' });
  }
};

const publicData = (data) => {
  const { adminPin: _adminPin, ...safeData } = data;
  return safeData;
};

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/portfolio', async (_request, response) => {
  const portfolio = await Portfolio.findOne({ key: 'main' }).lean();
  if (!portfolio) return response.status(404).json({ message: 'Portfolio has not been saved yet' });
  response.json(publicData(portfolio.data));
});

app.post('/api/auth/login', async (request, response) => {
  const portfolio = await Portfolio.findOne({ key: 'main' }).lean();
  const configuredPin = portfolio?.data?.adminPin || process.env.ADMIN_PIN;
  if (!configuredPin || request.body?.pin !== configuredPin) {
    return response.status(401).json({ message: 'Invalid PIN' });
  }
  response.json({ token: createToken(), data: portfolio?.data });
});

app.use((error, _request, response, _next) => {
  console.error('API request failed:', error.message);
  response.status(500).json({ message: 'Internal server error' });
});

app.put('/api/portfolio', requireOwner, async (request, response) => {
  const saved = await Portfolio.findOneAndUpdate(
    { key: 'main' },
    { key: 'main', data: request.body },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).lean();
  response.json(publicData(saved.data));
});

const start = async () => {
  if (!process.env.MONGO_URI || !process.env.JWT_SECRET || !process.env.ADMIN_PIN) {
    throw new Error('MONGO_URI, JWT_SECRET, and ADMIN_PIN are required in backend/.env.');
  }

  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Portfolio API listening on port ${port}`);
  });
};

start().catch((error) => {
  console.error('Unable to start portfolio API:', error.message);
  process.exit(1);
});

import express from 'express';
import fundRoutes from './routes/fund.routes.js';
import investorRoutes from './routes/investor.routes.js';
import investmentRoutes from './routes/investment.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Global Middleware
app.use(express.json());

// 2. Simple Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 3. Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// 4. Routes
app.use('/funds', fundRoutes);
app.use('/investors', investorRoutes);
app.use('/', investmentRoutes);

// 5. Error Middleware (Must be last)
app.use(errorHandler);

// 6. Start the Server
app.listen(PORT, () => {
  console.log('--------------------------------------------------');
  console.log(`🚀 Titanbay API is running on http://localhost:${PORT}`);
  console.log(`🛠️  Health check: http://localhost:${PORT}/health`);
  console.log('--------------------------------------------------');
});

export default app;

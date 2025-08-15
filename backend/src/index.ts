import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { serverConfig } from './config';
import { db } from './database/connection';
import guestRoutes from './routes/guestRoutes';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: serverConfig.corsOrigin,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: serverConfig.rateLimitWindowMs,
  max: serverConfig.rateLimitMaxRequests,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Wedding API is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/guests', guestRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: serverConfig.nodeEnv === 'development' ? err.message : 'Something went wrong',
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await db.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await db.close();
  process.exit(0);
});

// Start server
const startServer = async () => {
  try {
    console.log('🚀 Starting Wedding API server...');
    console.log('🔍 Server Environment Variables:');
    console.log('  NODE_ENV:', process.env.NODE_ENV);
    console.log('  PORT:', process.env.PORT);
    console.log('  CORS_ORIGIN:', process.env.CORS_ORIGIN);
    console.log('  RATE_LIMIT_WINDOW_MS:', process.env.RATE_LIMIT_WINDOW_MS);
    console.log('  RATE_LIMIT_MAX_REQUESTS:', process.env.RATE_LIMIT_MAX_REQUESTS);
    
    console.log('🔍 Database Environment Variables:');
    console.log('  DB_HOST:', process.env.DB_HOST);
    console.log('  DB_PORT:', process.env.DB_PORT);
    console.log('  DB_NAME:', process.env.DB_NAME);
    console.log('  DB_USER:', process.env.DB_USER);
    console.log('  DB_PASSWORD:', process.env.DB_PASSWORD ? '***SET***' : '***NOT SET***');
    
    console.log('📊 Resolved Server Configuration:');
    console.log('  Port:', serverConfig.port);
    console.log('  Environment:', serverConfig.nodeEnv);
    console.log('  CORS Origin:', serverConfig.corsOrigin);
    console.log('  Rate Limit:', serverConfig.rateLimitMaxRequests, 'requests per', serverConfig.rateLimitWindowMs / 1000 / 60, 'minutes');
    
    // Initialize database tables
    console.log('🗄️ Initializing database tables...');
    await db.initializeTables();
    console.log('✅ Database tables initialized successfully');
    
    // Start the server
    app.listen(serverConfig.port, () => {
      console.log(`🚀 Wedding API server running on port ${serverConfig.port}`);
      console.log(`📊 Environment: ${serverConfig.nodeEnv}`);
      console.log(`🌐 CORS Origin: ${serverConfig.corsOrigin}`);
      console.log(`📈 Rate Limit: ${serverConfig.rateLimitMaxRequests} requests per ${serverConfig.rateLimitWindowMs / 1000 / 60} minutes`);
      console.log('🎉 Server startup completed successfully!');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 
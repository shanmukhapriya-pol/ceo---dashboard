require('dotenv').config();
const express = require('express');
const cors = require('cors');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5174';

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/notifications', notificationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'notification-service',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║                                                          ║');
  console.log('║   🚀 Management Dashboard Backend Server                ║');
  console.log('║                                                          ║');
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log('║                                                          ║');
  console.log(`║   Server running on: http://localhost:${PORT}              ║`);
  console.log(`║   Environment: ${process.env.NODE_ENV || 'development'}                        ║`);
  console.log(`║   Frontend URL: ${FRONTEND_URL}              ║`);
  console.log('║                                                          ║');
  console.log('║   📧 Email Service: Microsoft Graph API                ║');
  console.log('║   💾 Storage: In-Memory (logs)                          ║');
  console.log('║                                                          ║');
  console.log('║   Endpoints:                                             ║');
  console.log('║   - POST /api/notifications/task-assigned              ║');
  console.log('║   - POST /api/notifications/meeting-assigned           ║');
  console.log('║   - GET  /api/notifications/logs                       ║');
  console.log('║   - POST /api/notifications/test                       ║');
  console.log('║   - GET  /health                                       ║');
  console.log('║                                                          ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
});

const { validateEnv, resolved } = require('./src/config/env');

validateEnv();
const env = resolved();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const mongoose = require('mongoose');
const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const listingRoutes = require('./src/routes/listingRoutes');
const stripeRoutes = require('./src/routes/stripeRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const pricesRoutes = require('./src/routes/pricesRoutes');
const stripeController = require('./src/controllers/stripeController');

const app = express();

app.set('trust proxy', 1);

app.post(
  '/api/stripe/webhook',
  express.raw({ type: 'application/json' }),
  stripeController.handleWebhook
);

app.use(express.json({ limit: '10mb' }));
app.use(
  cors({
    origin(origin, callback) {
      const allow = env.corsOrigins;
      if (!origin) {
        return callback(null, true);
      }
      if (allow.includes(origin)) {
        return callback(null, true);
      }
      // Dev: allow any localhost / 127.0.0.1 port so FRONTEND_URL vs Vite port (5173 vs 5174) can't break CORS
      if (env.nodeEnv !== 'production') {
        const localDev = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/;
        if (localDev.test(origin)) {
          return callback(null, true);
        }
      }
      console.warn(`CORS rejected origin: ${origin}`);
      return callback(null, false);
    },
    credentials: true,
  })
);
// Default Helmet sets Cross-Origin-Resource-Policy: same-origin, which blocks the browser
// from using responses when the SPA (e.g. :5173) and API (e.g. :5001) differ by port.
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/prices', pricesRoutes);

app.get('/health', (req, res) => {
  const dbOk = mongoose.connection.readyState === 1;
  res.status(dbOk ? 200 : 503).json({
    status: dbOk ? 'ok' : 'degraded',
    mongo: dbOk ? 'connected' : 'disconnected',
    env: env.nodeEnv,
  });
});

async function start() {
  await connectDB();

  const server = app.listen(env.port, () => {
    console.log(`Server listening on port ${env.port} (${env.nodeEnv})`);
    console.log(`CORS origins: ${env.corsOrigins.join(', ')}`);
    if (!env.stripeConfigured) {
      console.log('Stripe: checkout not fully configured (optional).');
    }
    if (!process.env.METALS_API_KEY?.trim()) {
      console.log('METALS_API_KEY: unset — /api/prices/spot will return 503 until configured.');
    }
  });

  const shutdown = (signal) => {
    console.log(`\n${signal} received, closing…`);
    server.close(() => {
      mongoose.connection
        .close()
        .then(() => {
          console.log('MongoDB connection closed');
          process.exit(0);
        })
        .catch((err) => {
          console.error(err);
          process.exit(1);
        });
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});

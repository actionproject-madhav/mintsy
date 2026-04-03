/**
 * Central env loading + validation. Fails fast with clear errors if required vars are missing.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const REQUIRED = ['MONGODB_URI', 'JWT_SECRET', 'GOOGLE_CLIENT_ID'];

function validateEnv() {
  const missing = REQUIRED.filter((key) => !process.env[key]?.trim());
  if (missing.length > 0) {
    console.error(
      '\n❌ Missing required environment variables:\n',
      missing.map((k) => `   - ${k}`).join('\n'),
      '\n\nCopy backend/.env.example to backend/.env and fill in values.\n'
    );
    process.exit(1);
  }

  if (process.env.JWT_SECRET.length < 32) {
    console.warn(
      '⚠️  JWT_SECRET should be at least 32 characters in production. Generate with: openssl rand -base64 32'
    );
  }
}

/** Defaults applied after validateEnv() */
function resolved() {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 5000,
    mongodbUri: process.env.MONGODB_URI.trim(),
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE || '7d',
    googleClientId: process.env.GOOGLE_CLIENT_ID.trim(),
    frontendUrl: (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, ''),
    /** Comma-separated; falls back to FRONTEND_URL for a single origin */
    corsOrigins: parseOrigins(),
    stripeConfigured: Boolean(
      process.env.STRIPE_SECRET_KEY?.trim() &&
        process.env.STRIPE_WEBHOOK_SECRET?.trim() &&
        process.env.STRIPE_FEATURED_LISTING_PRICE_ID?.trim()
    ),
  };
}

function parseOrigins() {
  const raw = process.env.CORS_ORIGINS || process.env.FRONTEND_URL || 'http://localhost:5173';
  const list = raw
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean);

  // Browsers treat localhost and 127.0.0.1 as different origins; allow both in dev
  // when only one is listed so Google sign-in API calls are not silently blocked by CORS.
  const extras = [];
  for (const o of list) {
    const mLocal = o.match(/^http:\/\/localhost:(\d+)$/);
    const mLoop = o.match(/^http:\/\/127\.0\.0\.1:(\d+)$/);
    if (mLocal) extras.push(`http://127.0.0.1:${mLocal[1]}`);
    if (mLoop) extras.push(`http://localhost:${mLoop[1]}`);
  }
  return [...new Set([...list, ...extras])];
}

module.exports = {
  validateEnv,
  resolved,
};

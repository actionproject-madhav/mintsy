/**
 * Local smoke test: hit each API route and print status (no secrets printed).
 * Usage: from repo root, with backend running on PORT (default 5001):
 *   node backend/scripts/smoke-local.mjs
 */
import axios from 'axios';

const port = process.env.PORT || process.env.TEST_PORT || '5001';
const base = `http://127.0.0.1:${port}/api`;

const client = axios.create({ baseURL: base, validateStatus: () => true, timeout: 30_000 });

function line(name, status, extra = '') {
  const ok = status >= 200 && status < 300;
  const flag = ok ? 'OK' : status === 401 || status === 400 ? 'EXPECTED' : 'FAIL';
  console.log(`[${flag}] ${name} → HTTP ${status} ${extra}`);
}

async function main() {
  console.log(`Base: ${base}\n`);

  let health;
  try {
    health = await axios.get(`http://127.0.0.1:${port}/health`, { validateStatus: () => true, timeout: 5_000 });
    line('GET /health', health.status, health.data?.mongo ? `mongo=${health.data.mongo}` : '');
  } catch (e) {
    console.log('[FAIL] GET /health →', e.message);
    process.exit(1);
  }

  const spot = await client.get('/prices/spot');
  line('GET /prices/spot', spot.status, spot.data?.metals?.length ? `${spot.data.metals.length} metals` : '');

  const hist = await client.get('/prices/history', { params: { metal: 'GOLD', interval: 'daily' } });
  const hn = Array.isArray(hist.data?.points) ? hist.data.points.length : 0;
  const ht = hist.data?.seriesTotal ? `/${hist.data.seriesTotal}` : '';
  line(
    'GET /prices/history',
    hist.status,
    hist.status === 503 && hist.data?.code === 'NO_KEY'
      ? 'no AV key (expected)'
      : hn
        ? `points=${hn}${ht}`
        : ''
  );

  const listings = await client.get('/listings');
  line('GET /listings', listings.status, listings.data?.listings != null ? `count=${listings.data.listings?.length}` : '');

  const meNo = await client.get('/auth/me');
  line('GET /auth/me (no Bearer)', meNo.status);

  const googleBad = await client.post('/auth/google', { token: 'invalid' });
  line('POST /auth/google (bad token)', googleBad.status);

  const jwtMod = await import('jsonwebtoken');
  const dotenv = await import('dotenv');
  const path = await import('path');
  const { fileURLToPath } = await import('url');
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  dotenv.default.config({ path: path.join(__dirname, '..', '.env') });

  const mongoose = (await import('mongoose')).default;
  const User = (await import('../src/models/User.js')).default;

  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    console.log('[SKIP] JWT-protected routes — no MONGODB_URI');
    process.exit(0);
  }

  await mongoose.connect(uri);
  const user = await User.findOne().lean();
  await mongoose.disconnect();

  if (!user) {
    console.log('[SKIP] GET /auth/me (with JWT) — no users in DB yet');
    process.exit(0);
  }

  const secret = process.env.JWT_SECRET;
  const token = jwtMod.default.sign({ id: user._id.toString() }, secret, { expiresIn: '1h' });

  const meOk = await client.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  line('GET /auth/me (with JWT)', meOk.status, meOk.data?._id ? 'user document returned' : '');

  const mine = await client.get('/listings/user', {
    headers: { Authorization: `Bearer ${token}` },
  });
  line('GET /listings/user', mine.status, Array.isArray(mine.data?.listings) ? `n=${mine.data.listings.length}` : '');

  const conv = await client.get('/messages/conversations', {
    headers: { Authorization: `Bearer ${token}` },
  });
  line('GET /messages/conversations', conv.status, Array.isArray(conv.data?.conversations) ? `n=${conv.data.conversations.length}` : '');

  console.log('\nDone.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

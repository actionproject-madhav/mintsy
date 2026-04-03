const { fetchSpotUsdPerTroyOunce } = require('../services/metalpriceService');
const { fetchGoldSilverHistory } = require('../services/alphaVantageService');

const TTL_MS = 120_000;
let cache = { at: 0, payload: null, error: null };

const HISTORY_TTL_MS = 3_600_000;
const historyCache = new Map();

/** Keep only the most recent points for chart + payload size (full series cached server-side). */
function trimHistoryPoints(payload, req) {
  if (!payload || !Array.isArray(payload.points)) return payload;
  const parsed = Number.parseInt(String(req.query.limit ?? '730'), 10);
  const maxPoints = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 20), 8000) : 730;
  const total = payload.points.length;
  if (total <= maxPoints) {
    return { ...payload, seriesTotal: total, seriesTruncated: false };
  }
  return {
    ...payload,
    points: payload.points.slice(-maxPoints),
    seriesTotal: total,
    seriesTruncated: true,
  };
}

exports.getMetalHistory = async (req, res) => {
  const metal = req.query.metal || req.query.symbol || 'GOLD';
  const interval = req.query.interval || 'daily';
  const key = `${metal}:${interval}`;
  const now = Date.now();
  const hit = historyCache.get(key);
  if (hit && now - hit.at < HISTORY_TTL_MS) {
    return res.json({ ...trimHistoryPoints(hit.payload, req), cached: true });
  }

  try {
    const payload = await fetchGoldSilverHistory({ metal, interval });
    historyCache.set(key, { at: now, payload });
    return res.json({ ...trimHistoryPoints(payload, req), cached: false });
  } catch (err) {
    if (err.code === 'NO_KEY') {
      return res.status(503).json({
        message:
          'Metal history is not configured. Set ALPHA_VANTAGE_API_KEY or alpha_vantage_api_key in the backend environment.',
        code: 'NO_KEY',
      });
    }
    console.error('Alpha Vantage history error:', err.message);
    const stale = historyCache.get(key)?.payload;
    if (stale) {
      return res.json({
        ...trimHistoryPoints(stale, req),
        cached: true,
        stale: true,
        warning: err.message,
      });
    }
    return res.status(503).json({
      message: err.message || 'Unable to load metal history.',
      code: err.code || 'FETCH_FAILED',
    });
  }
};

exports.getSpot = async (req, res) => {
  const now = Date.now();
  if (cache.payload && now - cache.at < TTL_MS) {
    return res.json({ ...cache.payload, cached: true });
  }

  try {
    const payload = await fetchSpotUsdPerTroyOunce();
    cache = { at: now, payload, error: null };
    return res.json({ ...payload, cached: false });
  } catch (err) {
    if (err.code === 'NO_KEY') {
      return res.status(503).json({
        message: 'Spot pricing is not configured (missing METALS_API_KEY).',
        code: 'NO_KEY',
      });
    }
    console.error('Spot prices error:', err.message);
    if (cache.payload) {
      return res.json({ ...cache.payload, cached: true, stale: true, warning: err.message });
    }
    return res.status(503).json({
      message: err.message || 'Unable to load spot prices.',
      code: err.code || 'FETCH_FAILED',
    });
  }
};

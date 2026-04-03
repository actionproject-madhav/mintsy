const { fetchSpotUsdPerTroyOunce } = require('../services/metalpriceService');

const TTL_MS = 120_000;
let cache = { at: 0, payload: null, error: null };

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

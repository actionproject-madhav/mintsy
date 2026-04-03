const axios = require('axios');

const API_BASE = 'https://api.metalpriceapi.com/v1';
/** ISO 4217 precious-metal codes supported by MetalpriceAPI */
const METAL_CODES = ['XAU', 'XAG', 'XPT', 'XPD'];
const METAL_NAMES = {
  XAU: 'Gold',
  XAG: 'Silver',
  XPT: 'Platinum',
  XPD: 'Palladium',
};

/**
 * Fetches USD spot references per troy ounce from MetalpriceAPI.
 * Uses USDXAU-style fields when present; otherwise derives from inverse rate.
 */
async function fetchSpotUsdPerTroyOunce() {
  const apiKey = process.env.METALS_API_KEY?.trim();
  if (!apiKey) {
    const err = new Error('METALS_API_KEY is not configured');
    err.code = 'NO_KEY';
    throw err;
  }

  const currencies = METAL_CODES.join(',');
  const { data, status } = await axios.get(`${API_BASE}/latest`, {
    params: {
      api_key: apiKey,
      base: 'USD',
      currencies,
    },
    timeout: 20_000,
    validateStatus: () => true,
  });

  if (status !== 200 || !data || data.success !== true) {
    const msg =
      data?.error?.info ||
      data?.error?.message ||
      (typeof data?.error === 'number' ? `MetalpriceAPI error code ${data.error}` : null) ||
      `MetalpriceAPI request failed (${status})`;
    const err = new Error(msg);
    err.code = 'UPSTREAM';
    throw err;
  }

  const rates = data.rates || {};
  const rows = [];

  for (const code of METAL_CODES) {
    const usdKey = `USD${code}`;
    let usdPerOz = null;
    if (typeof rates[usdKey] === 'number' && rates[usdKey] > 0) {
      usdPerOz = rates[usdKey];
    } else if (typeof rates[code] === 'number' && rates[code] > 0) {
      usdPerOz = 1 / rates[code];
    }
    if (usdPerOz != null && Number.isFinite(usdPerOz)) {
      rows.push({
        symbol: code,
        name: METAL_NAMES[code] || code,
        priceUsd: Math.round(usdPerOz * 100) / 100,
      });
    }
  }

  const ts = data.timestamp;
  const asOf = typeof ts === 'number' ? new Date(ts * 1000).toISOString() : new Date().toISOString();

  return {
    currency: 'USD',
    unit: 'troy oz',
    asOf,
    source: 'MetalpriceAPI',
    disclaimer:
      'Indicative spot references only. Timing and freshness depend on your MetalpriceAPI plan; not a quote to buy or sell.',
    metals: rows,
  };
}

module.exports = { fetchSpotUsdPerTroyOunce };

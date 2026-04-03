const axios = require('axios');

const BASE = 'https://www.alphavantage.co/query';

function getApiKey() {
  return (
    process.env.ALPHA_VANTAGE_API_KEY?.trim() ||
    process.env.alpha_vantage_api_key?.trim() ||
    ''
  );
}

function normalizeMetal(metal) {
  const m = String(metal || 'GOLD').toUpperCase();
  if (m === 'SILVER' || m === 'XAG') return 'SILVER';
  return 'GOLD';
}

function normalizeInterval(interval) {
  const i = String(interval || 'daily').toLowerCase();
  if (i === 'weekly' || i === 'monthly') return i;
  return 'daily';
}

/**
 * Historical gold/silver from Alpha Vantage (GOLD_SILVER_HISTORY).
 * Free tier: respect rate limits; callers should cache aggressively.
 */
async function fetchGoldSilverHistory({ metal = 'GOLD', interval = 'daily' } = {}) {
  const apiKey = getApiKey();
  if (!apiKey) {
    const err = new Error('Alpha Vantage API key is not configured');
    err.code = 'NO_KEY';
    throw err;
  }

  const symbol = normalizeMetal(metal);
  const intv = normalizeInterval(interval);

  const { data, status } = await axios.get(BASE, {
    params: {
      function: 'GOLD_SILVER_HISTORY',
      symbol,
      interval: intv,
      apikey: apiKey,
    },
    timeout: 25_000,
    validateStatus: () => true,
  });

  if (status !== 200 || !data) {
    const err = new Error(`Alpha Vantage request failed (HTTP ${status})`);
    err.code = 'UPSTREAM';
    throw err;
  }

  if (data['Error Message']) {
    const err = new Error(String(data['Error Message']));
    err.code = 'UPSTREAM';
    throw err;
  }

  const note = data.Note || data.Information;
  if (note) {
    const err = new Error(String(note));
    err.code = 'RATE_LIMIT';
    throw err;
  }

  const raw = data.data;
  if (!Array.isArray(raw)) {
    const err = new Error('Unexpected Alpha Vantage response (no data series)');
    err.code = 'PARSE';
    throw err;
  }

  const points = raw
    .map((row) => {
      const date = row.date;
      const v = row.price ?? row.close ?? row.value ?? row.open;
      const close = Number(v);
      if (!date || !Number.isFinite(close)) return null;
      return { date: String(date), close };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    symbol,
    interval: intv,
    label: data.name || (symbol === 'GOLD' ? 'Gold' : 'Silver'),
    unit: data.unit || 'USD per troy ounce',
    currency: data.currency || 'USD',
    source: 'Alpha Vantage',
    disclaimer:
      'Historical reference prices from Alpha Vantage. Delays and limits apply on the free tier; not investment advice.',
    points,
  };
}

module.exports = {
  fetchGoldSilverHistory,
  getApiKey,
};

import { useState, useEffect, useCallback } from 'react';
import { getSpotPrices } from '../../services/pricesService';
import MetalHistoryChart from './MetalHistoryChart';

const money = (n) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

const timeFmt = (iso) => {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return '';
  }
};

export default function SpotPricesPanel({ variant = 'full' }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError(null);
    try {
      const json = await getSpotPrices();
      setData(json);
    } catch (e) {
      const msg = e.response?.data?.message || e.message || 'Request failed';
      setError(msg);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const id = setInterval(load, 120_000);
    return () => clearInterval(id);
  }, [load]);

  const compact = variant === 'compact';
  const pad = compact ? 'px-3 py-2' : 'px-4 py-3';

  if (loading) {
    return (
      <div
        className={`rounded-lg border border-zinc-200 bg-white ${compact ? 'py-8' : 'py-14'} animate-pulse`}
        aria-busy="true"
      >
        <div className={`mx-auto max-w-3xl ${compact ? 'h-24' : 'h-32'} rounded bg-zinc-100`} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm text-zinc-600">
        <p className="font-medium text-zinc-800">Spot data unavailable</p>
        <p className="mt-1 text-xs leading-relaxed text-zinc-500">{error}</p>
      </div>
    );
  }

  const metals = data?.metals || [];
  const asOf = data?.asOf;
  const disclaimer = data?.disclaimer;

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className={`flex flex-col gap-1 border-b border-zinc-100 sm:flex-row sm:items-center sm:justify-between ${pad}`}>
        <div>
          <h2 className={`font-medium text-zinc-900 ${compact ? 'text-xs uppercase tracking-wide text-zinc-500' : 'text-sm'}`}>
            {compact ? 'Spot reference' : 'Spot metals (USD)'}
          </h2>
          {!compact && (
            <p className="mt-0.5 text-xs text-zinc-500">
              Per troy ounce. Feeds from your data provider; delays apply by plan.
            </p>
          )}
        </div>
        {asOf && (
          <p className="text-xs tabular-nums text-zinc-400">
            As of {timeFmt(asOf)}
            {data?.cached ? ' · cached' : ''}
            {data?.stale ? ' · last good snapshot' : ''}
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50/80 text-xs font-medium uppercase tracking-wide text-zinc-500">
              <th className={`${pad} font-medium`}>Symbol</th>
              <th className={`${pad} font-medium`}>Name</th>
              <th className={`${pad} text-right font-medium tabular-nums`}>Last</th>
              <th className={`${pad} text-right font-medium text-zinc-400`}>Unit</th>
            </tr>
          </thead>
          <tbody>
            {metals.length === 0 ? (
              <tr>
                <td colSpan={4} className={`${pad} text-sm text-zinc-500`}>
                  No metal quotes returned. Check API key and plan.
                </td>
              </tr>
            ) : (
              metals.map((m) => (
                <tr key={m.symbol} className="border-b border-zinc-100 last:border-0">
                  <td className={`${pad} font-mono text-xs text-zinc-600`}>{m.symbol}</td>
                  <td className={`${pad} text-zinc-900`}>{m.name}</td>
                  <td className={`${pad} text-right font-medium tabular-nums text-zinc-900`}>
                    {money(m.priceUsd)}
                  </td>
                  <td className={`${pad} text-right text-xs text-zinc-400`}>t oz</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {disclaimer && (
        <div className="border-t border-zinc-100 bg-zinc-50 px-4 py-3 text-[11px] leading-relaxed text-zinc-500">
          {disclaimer}
        </div>
      )}

      {!compact && (
        <div className="border-t border-zinc-200 bg-zinc-100/80 p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
            Price history (Robinhood-style chart)
          </p>
          <MetalHistoryChart />
        </div>
      )}
    </div>
  );
}

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getMetalHistory } from '../../services/pricesService';

const RH_GREEN = '#00C805';
const RH_RED = '#FF5000';
const RH_BG = '#0d0d0d';
const RH_MUTED = '#8e8e93';

const money = (n) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

function pctChange(first, last) {
  if (!Number.isFinite(first) || !Number.isFinite(last) || first === 0) return null;
  return ((last - first) / first) * 100;
}

function buildSeries(points, pad, width, height) {
  if (!points?.length) return null;
  const vals = points.map((p) => p.close);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = max - min || 1;
  const innerW = Math.max(1, width - pad * 2);
  const innerH = Math.max(1, height - pad * 2);
  const n = points.length;
  const coords = points.map((p, i) => {
    const x = pad + (n === 1 ? innerW / 2 : (i / (n - 1)) * innerW);
    const y = pad + (1 - (p.close - min) / span) * innerH;
    return { x, y, ...p };
  });
  const lineD = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(2)} ${c.y.toFixed(2)}`).join(' ');
  const areaD =
    coords.length > 0
      ? `${lineD} L ${coords[coords.length - 1].x.toFixed(2)} ${(height - pad).toFixed(2)} L ${coords[0].x.toFixed(2)} ${(height - pad).toFixed(2)} Z`
      : '';
  return { coords, lineD, areaD, min, max };
}

function RobinhoodChartSvg({ points, stroke, height }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(560);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth || 560));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pad = 12;
  const series = useMemo(
    () => buildSeries(points, pad, width, height),
    [points, width, height]
  );
  const gid = useMemo(() => `rh-fill-${stroke.replace('#', '')}`, [stroke]);

  if (!series || points.length < 2) {
    return (
      <div
        ref={ref}
        className="flex items-center justify-center text-sm"
        style={{ height, background: RH_BG, color: RH_MUTED }}
      >
        {points.length === 1 ? 'Need more history points to draw a chart.' : 'No data.'}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ background: RH_BG }}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label="Price history chart"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
            <stop offset="70%" stopColor={stroke} stopOpacity="0.06" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={series.areaD} fill={`url(#${gid})`} stroke="none" />
        <path
          d={series.lineD}
          fill="none"
          stroke={stroke}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export default function MetalHistoryChart() {
  const [metal, setMetal] = useState('GOLD');
  const [interval, setInterval] = useState('daily');
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const json = await getMetalHistory({ metal, interval });
      setPayload(json);
    } catch (e) {
      setPayload(null);
      setError(e.response?.data?.message || e.message || 'Failed to load chart');
    } finally {
      setLoading(false);
    }
  }, [metal, interval]);

  useEffect(() => {
    void load();
  }, [load]);

  const points = payload?.points || [];
  const first = points[0]?.close;
  const last = points[points.length - 1]?.close;
  const delta = pctChange(first, last);
  const up = delta != null && delta >= 0;
  const stroke = up ? RH_GREEN : RH_RED;

  const intervalButtons = [
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800" style={{ background: RH_BG }}>
      <div className="flex flex-col gap-3 border-b border-zinc-800 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">
            {metal === 'SILVER' ? 'Silver' : 'Gold'} history
          </h3>
          <p className="mt-0.5 text-[11px]" style={{ color: RH_MUTED }}>
            Alpha Vantage · {payload?.unit || 'USD / oz t'}
            {payload?.seriesTruncated && payload?.seriesTotal
              ? ` · showing last ${payload.points?.length ?? '—'} of ${payload.seriesTotal} points`
              : ''}
            {payload?.cached ? ' · cached' : ''}
            {payload?.stale ? ' · offline snapshot' : ''}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-md border border-zinc-700 p-0.5">
            {['GOLD', 'SILVER'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMetal(m)}
                className={`rounded px-2 py-1 text-xs font-medium transition ${
                  metal === m
                    ? 'bg-zinc-700 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {m === 'GOLD' ? 'Gold' : 'Silver'}
              </button>
            ))}
          </div>
          <div className="flex rounded-md border border-zinc-700 p-0.5">
            {intervalButtons.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setInterval(key)}
                className={`rounded px-2 py-1 text-xs font-medium transition ${
                  interval === key
                    ? 'bg-zinc-700 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pt-3">
        {!loading && points.length > 0 && Number.isFinite(last) && (
          <div className="flex flex-wrap items-baseline gap-3 pb-2">
            <span className="text-2xl font-semibold tabular-nums tracking-tight text-white">{money(last)}</span>
            {delta != null && (
              <span
                className="text-sm font-medium tabular-nums"
                style={{ color: stroke }}
              >
                {up ? '+' : ''}
                {delta.toFixed(2)}%
              </span>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <div
          className="mx-4 mb-4 animate-pulse rounded-md bg-zinc-900"
          style={{ height: 200 }}
        />
      ) : error ? (
        <div className="px-4 pb-4 text-sm" style={{ color: RH_MUTED }}>
          {error}
        </div>
      ) : (
        <div className="pb-1">
          <RobinhoodChartSvg points={points} stroke={stroke} height={200} />
        </div>
      )}

      {payload?.disclaimer && (
        <div
          className="border-t border-zinc-800 px-4 py-2.5 text-[10px] leading-relaxed"
          style={{ color: RH_MUTED }}
        >
          {payload.disclaimer}
        </div>
      )}
    </div>
  );
}

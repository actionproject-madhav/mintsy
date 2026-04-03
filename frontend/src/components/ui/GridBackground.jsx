/**
 * Grid + radial mask. Glows are neutral (no “vibe” amber).
 */
const GRID = {
  dark:
    'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
  light:
    'linear-gradient(to right, rgba(24,24,27,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,24,27,0.06) 1px, transparent 1px)',
  muted:
    'linear-gradient(to right, rgba(24,24,27,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,24,27,0.035) 1px, transparent 1px)',
};

export default function GridBackground({
  className = '',
  variant = 'dark',
  showGlow = true,
}) {
  const bg = GRID[variant] ?? GRID.dark;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_78%_58%_at_50%_36%,black_18%,transparent_74%)]"
        style={{
          backgroundImage: bg,
          backgroundSize: '40px 40px',
        }}
      />
      {showGlow && variant === 'dark' && (
        <>
          <div className="absolute -top-[22%] left-1/2 h-[min(68vh,520px)] w-[min(88vw,680px)] -translate-x-1/2 rounded-full bg-white/[0.06] blur-[110px]" />
          <div className="absolute bottom-[-5%] right-[-8%] h-72 w-72 rounded-full bg-zinc-300/[0.05] blur-[90px]" />
        </>
      )}
      {showGlow && variant === 'light' && (
        <div className="absolute top-0 left-1/2 h-44 w-[78%] max-w-3xl -translate-x-1/2 rounded-full bg-zinc-400/[0.06] blur-[95px]" />
      )}
    </div>
  );
}

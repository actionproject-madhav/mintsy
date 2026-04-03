/** Soft neutral light pools — no images. */
export default function AmbientMesh({ variant = 'light' }) {
  if (variant === 'dark') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-1/4 top-0 h-[70%] w-[70%] rounded-full bg-white/[0.04] blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[50%] w-[60%] rounded-full bg-zinc-400/[0.06] blur-[100px]" />
      </div>
    );
  }
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-1/3 -top-1/4 h-[55%] w-[55%] rounded-full bg-zinc-300/25 blur-[100px]" />
      <div className="absolute -right-1/4 top-1/3 h-[45%] w-[50%] rounded-full bg-zinc-200/40 blur-[90px]" />
    </div>
  );
}

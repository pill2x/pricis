export default function Logo({ variant = "dark" }: { variant?: "dark" | "light" | "muted" }) {
  let wordmarkColor = "text-text-dark";
  if (variant === "light") wordmarkColor = "text-white";
  if (variant === "muted") wordmarkColor = "text-text-muted";

  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="flex-shrink-0" style={{ filter: "drop-shadow(0 2px 4px rgba(41, 93, 255, 0.2))" }}>
        <defs>
          <linearGradient id="midGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#12B38F" />
            <stop offset="100%" stopColor="#295DFF" />
          </linearGradient>
          <linearGradient id="rightGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#295DFF" />
            <stop offset="100%" stopColor="#12B38F" />
          </linearGradient>
        </defs>
        <rect x="2" y="14" width="6" height="10" rx="3" fill="#295DFF" />
        <rect x="11" y="8" width="6" height="16" rx="3" fill="url(#midGrad)" />
        <rect x="20" y="2" width="6" height="22" rx="3" fill="url(#rightGrad)" />
      </svg>
      <span className={`font-display font-bold text-2xl tracking-tight leading-none ${wordmarkColor}`}>
        pricis
      </span>
    </div>
  );
}

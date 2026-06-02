export default function Logo({ variant = "dark" }: { variant?: "dark" | "light" | "muted" }) {
  let wordmarkColor = "text-text-dark";
  if (variant === "light") wordmarkColor = "text-white";
  if (variant === "muted") wordmarkColor = "text-text-muted";

  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="flex-shrink-0">
        <rect x="2" y="14" width="6" height="10" rx="3" fill="#3b82f6" />
        <rect x="11" y="8" width="6" height="16" rx="3" fill="#4ade80" />
        <rect x="20" y="2" width="6" height="22" rx="3" fill="#3b82f6" />
      </svg>
      <span className={`font-display font-bold text-2xl tracking-tight leading-none ${wordmarkColor}`}>
        pricis
      </span>
    </div>
  );
}

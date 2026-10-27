/** Fine-line botanical drawings (decorative only, hidden from screen readers). */
type P = { className?: string; style?: React.CSSProperties };

export function Sprig({ className = "", style }: P) {
  return (
    <svg viewBox="0 0 120 160" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className={className} style={style} aria-hidden>
      <path d="M60 158 C58 120 62 80 60 8" />
      {[130, 105, 80, 55, 32].map((y, i) => (
        <g key={y}>
          <path d={`M60 ${y} C${40 - i * 2} ${y - 6} ${30 - i} ${y - 22} ${36} ${y - 30} C${46} ${y - 24} ${54} ${y - 12} 60 ${y}`} />
          <path d={`M60 ${y - 10} C${80 + i * 2} ${y - 16} ${90 + i} ${y - 32} ${84} ${y - 40} C${74} ${y - 34} ${66} ${y - 22} 60 ${y - 10}`} />
        </g>
      ))}
      <circle cx="60" cy="6" r="3.5" />
    </svg>
  );
}

export function Flower({ className = "", style }: P) {
  return (
    <svg viewBox="0 0 100 140" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className={className} style={style} aria-hidden>
      <path d="M50 138 C48 110 54 80 50 46" />
      <path d="M50 100 C36 96 26 84 28 74 C40 76 48 88 50 100" />
      <path d="M51 86 C64 80 74 70 72 60 C60 62 52 74 51 86" />
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="50" cy="28" rx="8" ry="16" transform={`rotate(${r} 50 40)`} />
      ))}
      <circle cx="50" cy="40" r="4" />
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto flex max-w-md items-center gap-3 text-sage ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-current opacity-60" />
      <svg viewBox="0 0 120 30" className="h-7 w-28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M5 15 H115" />
        {[20, 40, 80, 100].map((x, i) => (
          <path key={x} d={i % 2 ? `M${x} 15 C${x - 4} 8 ${x - 12} 6 ${x - 14} 9 C${x - 10} 14 ${x - 4} 15 ${x} 15` : `M${x} 15 C${x + 4} 22 ${x + 12} 24 ${x + 14} 21 C${x + 10} 16 ${x + 4} 15 ${x} 15`} />
        ))}
        {[0, 72, 144, 216, 288].map((r) => <ellipse key={r} cx="60" cy="9" rx="3" ry="6" transform={`rotate(${r} 60 15)`} className="text-coral" stroke="var(--coral)" />)}
      </svg>
      <span className="h-px flex-1 bg-current opacity-60" />
    </div>
  );
}

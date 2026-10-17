export function BowDefs() {
  return (
    <defs>
      <pattern id="gz" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
        <rect width="26" height="26" fill="#fff" />
        <path d="M13 2c5 4 5 10 0 14-5-4-5-10 0-14z" fill="#1B3FA0" />
        <path d="M3 17c5-1 8 2 9 6-5 1-8-2-9-6zM23 17c-5-1-8 2-9 6 5 1 8-2 9-6z" fill="#3F63C7" />
        <circle cx="13" cy="22" r="1.6" fill="#1B3FA0" />
      </pattern>
    </defs>
  );
}

export function Bow({ x, y, s = 1, r = 0 }: { x: number; y: number; s?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0C-34-40-74-16-58 14-46 36-12 20 0 0Z" fill="url(#gz)" stroke="#1B3FA0" strokeWidth="2.2" />
      <path d="M0 0C34-40 74-16 58 14 46 36 12 20 0 0Z" fill="url(#gz)" stroke="#1B3FA0" strokeWidth="2.2" />
      <path d="M-4 6C-14 34-26 52-20 70M4 6C14 34 26 52 20 70" fill="none" stroke="#1B3FA0" strokeWidth="2.2" strokeLinecap="round" />
      <circle r="9" fill="#1B3FA0" />
      <circle r="3" fill="#fff" />
    </g>
  );
}

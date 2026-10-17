import { Bow, BowDefs } from "./GzhelBow";

const strands = [
  "M330 -10C250 120 330 230 250 340C190 440 250 520 200 640",
  "M360 -10C300 130 400 250 340 360C290 450 350 540 310 650",
  "M300 -10C210 100 270 210 180 320C120 400 170 500 120 620",
  "M390 -10C350 120 450 220 420 340C400 430 450 520 430 640",
  "M270 -10C170 90 210 200 130 300C80 370 110 470 70 580",
  "M420 -10C400 110 490 190 480 320C470 420 500 500 490 600",
];

export function HeroArt() {
  return (
    <svg viewBox="0 0 520 640" role="img" aria-label="Тёмные длинные волосы с вплетёнными бантами в гжельской росписи" className="h-full w-full">
      <BowDefs />
      <g className="hair" fill="none" strokeLinecap="round">
        {strands.map((d, i) => (
          <path key={i} d={d} stroke={i % 2 ? "#2A1B16" : "#140D0A"} strokeWidth={34 - i * 3} opacity={0.96} />
        ))}
        {strands.map((d, i) => (
          <path key={"h" + i} d={d} stroke="#6B4A3C" strokeWidth={2} opacity={0.5} transform="translate(-6 0)" />
        ))}
        <Bow x={320} y={150} s={0.95} r={-14} />
        <Bow x={260} y={330} s={0.8} r={10} />
        <Bow x={205} y={520} s={0.7} r={-8} />
        <Bow x={400} y={420} s={0.6} r={16} />
      </g>
    </svg>
  );
}

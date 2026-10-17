import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.ts"],
  theme: {
    extend: {
      colors: { night: "#050B1E", navy: "#0A1A4A", cobalt: "#2B55D8", glow: "#8FB0FF", mist: "#DCE6FF", porcelain: "#EEF3FF" },
      fontFamily: { display: ["Cormorant", "Georgia", "serif"], body: ["Golos Text", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
} satisfies Config;

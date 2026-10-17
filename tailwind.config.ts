import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { cobalt: "#1B3FA0", deep: "#0E2A6B", glaze: "#8FA9E6", porcelain: "#F5F8FF" },
      fontFamily: { display: ["Cormorant", "Georgia", "serif"], body: ["Golos Text", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
} satisfies Config;

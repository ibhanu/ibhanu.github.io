import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0A0A0D",
        surface: "#121318",
        elevated: "#181920",
        highlight: "#22232D",
        ink: "#F5F5F7",
        muted: "#9596A3",
        dim: "#646572",
        accent: "#FF5520",
        "accent-dark": "#D94212",
        "accent-blue": "#2563EB",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

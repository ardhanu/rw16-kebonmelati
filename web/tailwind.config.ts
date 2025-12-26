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
        primary: {
          DEFAULT: "#0A1F44", // Dark Navy Blue
          dark: "#102A56", // Deep Blue (for sections)
        },
        accent: {
          DEFAULT: "#2563EB", // Royal Blue
          hover: "#1E3A8A", // Steel Blue
          light: "#60A5FA", // Sky Blue
        },
        neutral: {
          bg: "#FFFFFF", // Main Background
          soft: "#F1F5F9", // Light Section Background
          dark: "#020617", // Footer/Dark Mode
          text: {
            main: "#0F172A",
            secondary: "#334155",
            muted: "#64748B",
            onDark: "#F8FAFC",
          },
          border: "#CBD5E1",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-jakarta)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

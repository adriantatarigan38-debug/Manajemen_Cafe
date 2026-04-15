import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        soft: {
          background: "#2a3441",
          foreground: "#28465e",
          blue: "#7aa8c7",
          sky: "#d9edf5",
          mint: "#b8d8ca",
          sage: "#d8e7d8",
          cream: "#f6efe4",
          stone: "#d4d0c9",
          slate: "#70879c",
          peach: "#edc6b8",
          coral: "#dca89a",
          teal: "#89b9b0",
          gold: "#d4b483",
          lavender: "#d8d6ea",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        glass: "0 24px 55px rgba(71, 101, 126, 0.16)",
        soft: "0 14px 36px rgba(97, 120, 138, 0.16)",
        glow: "0 10px 30px rgba(122, 168, 199, 0.22)",
      },
      backgroundImage: {
        "soft-grid":
          "radial-gradient(circle at top left, rgba(255,255,255,0.45), transparent 30%), radial-gradient(circle at 82% 12%, rgba(122,168,199,0.18), transparent 22%), radial-gradient(circle at 18% 78%, rgba(184,216,202,0.22), transparent 24%), linear-gradient(135deg, rgba(246,239,228,0.72), rgba(217,237,245,0.5))",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#08070B",
          soft: "#100D16",
          card: "#15121C",
        },
        gold: {
          DEFAULT: "#D4AF37",
          bright: "#F4CE6E",
          muted: "#8A7226",
        },
        neon: {
          violet: "#8B5CF6",
          magenta: "#E1379F",
          cyan: "#3EE8E0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F4CE6E 0%, #D4AF37 45%, #8A7226 100%)",
        "aurora": "radial-gradient(60% 60% at 20% 20%, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0) 60%), radial-gradient(50% 50% at 80% 30%, rgba(225,55,159,0.25) 0%, rgba(225,55,159,0) 60%), radial-gradient(60% 60% at 50% 90%, rgba(62,232,224,0.18) 0%, rgba(62,232,224,0) 60%)",
      },
      boxShadow: {
        gold: "0 0 40px -10px rgba(212,175,55,0.55)",
        neon: "0 0 40px -10px rgba(139,92,246,0.55)",
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

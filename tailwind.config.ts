import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // En pantallas táctiles el :hover se queda "pegado" tras un tap;
  // así los estilos hover solo aplican donde hay puntero real.
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        // Base editorial: tinta casi negra + papel cálido.
        ink: {
          DEFAULT: "#0B0A0D",
          soft: "#141217",
          line: "#26232B",
        },
        paper: {
          DEFAULT: "#F3EFE7",
          soft: "#E9E3D8",
          line: "#D6CEBF",
        },
        // Marca: dorado del logo/flyers y vino del Mesón Terraza León.
        gold: {
          DEFAULT: "#D4AF37",
          bright: "#F4CE6E",
          muted: "#8A7226",
        },
        wine: {
          DEFAULT: "#7A1426",
          deep: "#3A0710",
        },
        // Se conservan para compatibilidad con piezas existentes.
        obsidian: {
          DEFAULT: "#08070B",
          soft: "#100D16",
          card: "#15121C",
        },
        neon: {
          violet: "#8B5CF6",
          magenta: "#E1379F",
          cyan: "#3EE8E0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        subheading: ["var(--font-subheading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F4CE6E 0%, #D4AF37 45%, #8A7226 100%)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
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

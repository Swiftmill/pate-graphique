import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        knight: {
          DEFAULT: "#0f2b6b",
          neon: "#3c7dff",
          aura: "#5cd4ff"
        },
        civil: {
          DEFAULT: "#f2c14e",
          glow: "#ffeaa7",
          aura: "#fff3b0"
        },
        pasta: {
          muted: "#f4d35e",
          creamy: "#fff1d0"
        }
      },
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui"],
        display: ["Playfair Display", "serif"]
      },
      backgroundImage: {
        pastaTexture: "url('/textures/pasta-texture.svg')",
        knightGradient: "radial-gradient(circle at top, rgba(60,125,255,0.7), rgba(10,16,43,0.9))",
        civilGradient: "radial-gradient(circle at top, rgba(242,193,78,0.6), rgba(43,30,10,0.85))"
      },
      animation: {
        glowPulse: "glowPulse 6s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite"
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { filter: "drop-shadow(0 0 1.5rem rgba(92,212,255,0.8))" },
          "50%": { filter: "drop-shadow(0 0 2.4rem rgba(92,212,255,1))" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;

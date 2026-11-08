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
        base: {
          bg: "#07070D",
          surface: "rgba(18, 18, 28, 0.72)",
          elevated: "rgba(24, 24, 38, 0.85)",
          border: "rgba(255, 255, 255, 0.08)",
          subtle: "#161622",
        },
        neon: {
          cyan: "var(--neon-cyan)",
          magenta: "var(--neon-magenta)",
          lime: "var(--neon-lime)",
          orange: "var(--neon-orange)",
          violet: "var(--neon-violet)",
          green: "var(--neon-green)",
          yellow: "var(--neon-yellow)",
          pink: "var(--neon-pink)",
        },
      },
      fontFamily: {
        heading: ["var(--font-unbounded)", "sans-serif"],
        body: ["var(--font-outfit)", "sans-serif"],
      },
      height: {
        dvh: "100dvh",
      },
      minHeight: {
        dvh: "100dvh",
        touch: "48px",
      },
      minWidth: {
        touch: "48px",
      },
      maxWidth: {
        mobile: "430px",
      },
      borderRadius: {
        "glass-sm": "12px",
        "glass-md": "18px",
        "glass-lg": "24px",
        "glass-pill": "9999px",
      },
      boxShadow: {
        "neon-cyan": "0 0 15px -2px rgba(0, 240, 255, 0.4), 0 0 30px -4px rgba(0, 240, 255, 0.2)",
        "neon-magenta": "0 0 15px -2px rgba(255, 43, 214, 0.4), 0 0 30px -4px rgba(255, 43, 214, 0.2)",
        "neon-lime": "0 0 15px -2px rgba(182, 255, 0, 0.4), 0 0 30px -4px rgba(182, 255, 0, 0.2)",
        "neon-orange": "0 0 15px -2px rgba(255, 138, 0, 0.4), 0 0 30px -4px rgba(255, 138, 0, 0.2)",
        "neon-violet": "0 0 15px -2px rgba(168, 85, 255, 0.4), 0 0 30px -4px rgba(168, 85, 255, 0.2)",
        "neon-green": "0 0 15px -2px rgba(57, 255, 20, 0.4), 0 0 30px -4px rgba(57, 255, 20, 0.2)",
        "neon-yellow": "0 0 15px -2px rgba(255, 230, 0, 0.4), 0 0 30px -4px rgba(255, 230, 0, 0.2)",
      },
      animation: {
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-shift": "gradientShift 12s ease infinite",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(15px, -20px) scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;


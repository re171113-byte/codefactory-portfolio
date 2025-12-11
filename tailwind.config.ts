import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 배경 색상 (딥 퍼플)
        background: {
          DEFAULT: "#0F0F1A",
          card: "#1A1A2E",
          hover: "#252538",
        },
        // 프라이머리 (바이올렛)
        primary: {
          DEFAULT: "#8B5CF6",
          light: "#A78BFA",
          dark: "#7C3AED",
        },
        // 세컨더리 (핑크)
        secondary: {
          DEFAULT: "#EC4899",
          light: "#F472B6",
        },
        // 텍스트 색상 (WCAG AA 4.5:1 이상)
        foreground: {
          DEFAULT: "#F8FAFC",
          muted: "#B4B4BD",   // 대비 ~8.5:1
          subtle: "#9898A4",  // 대비 ~5.8:1
        },
        // 보더
        border: {
          DEFAULT: "#2D2D44",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-kr)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
        "gradient-glow": "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(139, 92, 246, 0.3)",
        "glow-lg": "0 0 40px rgba(139, 92, 246, 0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "bounce-slow": "bounce 2s infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(139, 92, 246, 0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

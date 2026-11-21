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
        canvas: {
          DEFAULT: "#07090E", // Deep midnight obsidian
          subtle: "#0D111A",  // Elevated frosted card
          muted: "#131826",   // Secondary panel
          elevated: "#182032", // Elevated interactive layer
          surface: "rgba(13, 17, 26, 0.7)",
        },
        brand: {
          DEFAULT: "#6366F1", // Electric Indigo
          hover: "#4F46E5",
          light: "rgba(99, 102, 241, 0.12)",
          border: "rgba(99, 102, 241, 0.28)",
          glow: "rgba(99, 102, 241, 0.35)",
        },
        terracotta: {
          DEFAULT: "#FF6B4A", // Vibrant Luminous Sunset Coral
          hover: "#FA5532",
          dark: "#FDA48B",
          light: "rgba(255, 107, 74, 0.12)",
          border: "rgba(255, 107, 74, 0.3)",
        },
        ink: {
          primary: "#FFFFFF",   // Crisp radiant white
          secondary: "#94A3B8", // Silky slate 400
          muted: "#64748B",     // Sophisticated slate 500
          light: "#475569",     // Subdued slate 600
        },
        warm: {
          hairline: "rgba(255, 255, 255, 0.07)",  // Delicate hairline separator
          border: "rgba(255, 255, 255, 0.11)",    // High-def glass border
          active: "rgba(255, 255, 255, 0.24)",    // Active focus ring
        },
        sage: {
          DEFAULT: "#10B981",   // Luminous Emerald
          hover: "#059669",
          light: "rgba(16, 185, 129, 0.12)",
          border: "rgba(16, 185, 129, 0.28)",
        },
        cyan: {
          DEFAULT: "#06B6D4",   // Electric Cyan
          light: "rgba(6, 182, 212, 0.12)",
          border: "rgba(6, 182, 212, 0.28)",
        },
        violet: {
          DEFAULT: "#8B5CF6",   // Radiant Violet
          light: "rgba(139, 92, 246, 0.12)",
          border: "rgba(139, 92, 246, 0.28)",
        },
        ochre: {
          DEFAULT: "#F59E0B",   // Radiant Amber Gold
          light: "rgba(245, 158, 11, 0.12)",
          border: "rgba(245, 158, 11, 0.28)",
        },
        clay: {
          DEFAULT: "#FF6B4A",
          light: "rgba(255, 107, 74, 0.12)",
          border: "rgba(255, 107, 74, 0.28)",
        },
      },
      fontFamily: {
        serif: [
          '"Plus Jakarta Sans"',
          '"Inter"',
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        sans: [
          '"Inter"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      borderRadius: {
        sm: "8px",
        DEFAULT: "12px",
        md: "14px",
        lg: "18px",
        xl: "22px",
        "2xl": "26px",
        "3xl": "32px",
        full: "9999px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.4)",
        sm: "0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.4)",
        card: "0 4px 20px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)",
        cardHover: "0 14px 34px -4px rgba(0, 0, 0, 0.65), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)",
        dropdown: "0 18px 36px -4px rgba(0, 0, 0, 0.75), 0 6px 16px -2px rgba(0, 0, 0, 0.5)",
        popover: "0 28px 48px -6px rgba(0, 0, 0, 0.85), 0 12px 20px -4px rgba(0, 0, 0, 0.6)",
        glow: "0 0 35px -5px rgba(99, 102, 241, 0.3)",
        glowLg: "0 0 60px -8px rgba(99, 102, 241, 0.45)",
        glowEmerald: "0 0 35px -5px rgba(16, 185, 129, 0.3)",
        glowCoral: "0 0 35px -5px rgba(255, 107, 74, 0.35)",
        glowAmber: "0 0 35px -5px rgba(245, 158, 11, 0.35)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

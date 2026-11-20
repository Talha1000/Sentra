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
          DEFAULT: "#0A0D12", // Deep obsidian noir
          subtle: "#111622",  // Elevated card surface
          muted: "#161D2B",   // Secondary panel
        },
        terracotta: {
          DEFAULT: "#E07A5F", // Luminous warm terracotta
          hover: "#CC684D",
          dark: "#F49D85",
          light: "rgba(224, 122, 95, 0.12)",
          border: "rgba(224, 122, 95, 0.28)",
        },
        ink: {
          primary: "#F8FAFC",   // Crisp glowing white
          secondary: "#94A3B8", // Elegant slate 400
          muted: "#64748B",     // Refined slate 500
          light: "#475569",     // Subdued slate 600
        },
        warm: {
          hairline: "rgba(255, 255, 255, 0.08)",  // Soft 1px glass divider
          border: "rgba(255, 255, 255, 0.12)",    // Card border
          active: "rgba(255, 255, 255, 0.22)",    // Active focus border
        },
        sage: {
          DEFAULT: "#34D399",   // Luminous emerald truth
          light: "rgba(52, 211, 153, 0.12)",
          border: "rgba(52, 211, 153, 0.28)",
        },
        ochre: {
          DEFAULT: "#F59E0B",   // Warm amber ochre
          light: "rgba(245, 158, 11, 0.12)",
          border: "rgba(245, 158, 11, 0.28)",
        },
        clay: {
          DEFAULT: "#E07A5F",
          light: "rgba(224, 122, 95, 0.12)",
          border: "rgba(224, 122, 95, 0.28)",
        },
      },
      fontFamily: {
        serif: [
          '"Iowan Old Style"',
          '"Apple Garamond"',
          '"Baskerville"',
          '"Palatino Linotype"',
          '"Georgia"',
          "serif",
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
        "2xl": "28px",
        full: "9999px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.4)",
        sm: "0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.4)",
        card: "0 4px 16px 0 rgba(0, 0, 0, 0.45), 0 1px 2px 0 rgba(0, 0, 0, 0.3)",
        cardHover: "0 8px 24px -2px rgba(0, 0, 0, 0.6), 0 2px 6px -1px rgba(0, 0, 0, 0.4)",
        dropdown: "0 14px 28px -4px rgba(0, 0, 0, 0.7), 0 6px 12px -2px rgba(0, 0, 0, 0.5)",
        popover: "0 24px 38px -6px rgba(0, 0, 0, 0.8), 0 10px 16px -4px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;

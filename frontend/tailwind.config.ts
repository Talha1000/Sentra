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
          DEFAULT: "#0B0C0E", // Understated deep obsidian
          subtle: "#121417",  // Clean card surface
          muted: "#181A1E",   // Secondary element surface
          elevated: "#1F2228", // Elevated popover/modal
          surface: "rgba(18, 20, 23, 0.85)",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.07)",
          DEFAULT: "rgba(255, 255, 255, 0.11)",
          hover: "rgba(255, 255, 255, 0.2)",
        },
        ink: {
          primary: "#FFFFFF",   // Crisp primary text
          secondary: "#9CA3AF", // Soft slate/neutral text
          muted: "#6B7280",     // Muted captions & metadata
          light: "#4B5563",     // Subtle dividers & tags
        },
        brand: {
          DEFAULT: "#3B82F6", // Precision Cobalt Blue
          hover: "#2563EB",
          light: "rgba(59, 130, 246, 0.1)",
          border: "rgba(59, 130, 246, 0.25)",
        },
        terracotta: {
          DEFAULT: "#F43F5E", // Clean Rose / Penalty
          hover: "#E11D48",
          dark: "#FDA4AF",
          light: "rgba(244, 63, 94, 0.1)",
          border: "rgba(244, 63, 94, 0.25)",
        },
        sage: {
          DEFAULT: "#10B981", // Calibrated Emerald
          hover: "#059669",
          light: "rgba(16, 185, 129, 0.1)",
          border: "rgba(16, 185, 129, 0.25)",
        },
        warm: {
          hairline: "rgba(255, 255, 255, 0.08)",
          border: "rgba(255, 255, 255, 0.12)",
          active: "rgba(255, 255, 255, 0.25)",
        },
      },
      fontFamily: {
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
        sm: "6px",
        DEFAULT: "8px",
        md: "10px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)",
        elevation: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;

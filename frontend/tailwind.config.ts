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
        canvas: "#F8FAFC", // Sleek ultra-light slate background
        subtle: "#F1F5F9",
        border: {
          light: "#E2E8F0",
          DEFAULT: "#CBD5E1",
          dark: "#94A3B8",
        },
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#0F172A",
        },
        ink: {
          primary: "#0F172A", // Deep charcoal-navy for text
          secondary: "#475569", // Balanced body text
          muted: "#64748B", // Supporting captions
          light: "#94A3B8",
        },
        emerald: {
          subtle: "#ECFDF5",
          border: "#A7F3D0",
          DEFAULT: "#059669",
          dark: "#065F46",
        },
        amber: {
          subtle: "#FFFBEB",
          border: "#FDE68A",
          DEFAULT: "#D97706",
          dark: "#92400E",
        },
        rose: {
          subtle: "#FFF1F2",
          border: "#FECDD3",
          DEFAULT: "#E11D48",
          dark: "#9F1239",
        },
        sky: {
          subtle: "#F0F9FF",
          border: "#BAE6FD",
          DEFAULT: "#0284C7",
          dark: "#075985",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "8px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        full: "9999px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(15, 23, 42, 0.05)",
        sm: "0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06)",
        card: "0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)",
        cardHover: "0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)",
        dropdown: "0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)",
        popover: "0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;

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
        canvas: "#F8F7F4",
        panel: "#FFFFFF",
        subtle: "#F2F0EB",
        "surface-hover": "#EAE7DF",
        "surface-active": "#DFDBD1",
        
        hairline: "#E3DFD5",
        "border-medium": "#CBC6B8",
        "border-focus": "#111418",

        ink: {
          primary: "#111418",
          secondary: "#434B56",
          tertiary: "#727D8D",
          disabled: "#A4AFBD",
        },

        // Smart Semantic Palette
        cognition: {
          DEFAULT: "#B45309",
          subtle: "#FFFBEB",
          border: "#FDE68A",
          dark: "#92400E",
        },

        spruce: {
          DEFAULT: "#0F766E",
          subtle: "#F0FDFA",
          border: "#99F6E4",
          dark: "#115E59",
        },

        cobalt: {
          DEFAULT: "#1D4ED8",
          subtle: "#EFF6FF",
          border: "#BFDBFE",
          dark: "#1E40AF",
        },

        crimson: {
          DEFAULT: "#BE123C",
          subtle: "#FFF1F2",
          border: "#FECDD3",
          dark: "#9F1239",
        },

        iris: {
          DEFAULT: "#6D28D9",
          subtle: "#F5F3FF",
          border: "#DDD6FE",
          dark: "#5B21B6",
        },

        slateacc: {
          DEFAULT: "#334155",
          subtle: "#F1F5F9",
          border: "#CBD5E1",
          dark: "#1E293B",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        serif: [
          "Newsreader",
          "Instrument Serif",
          "Georgia",
          "serif",
        ],
        mono: [
          "JetBrains Mono",
          "SFMono-Regular",
          "Consolas",
          "Menlo",
          "monospace",
        ],
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
        none: "0px",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(17, 20, 24, 0.04)",
        elevated: "0 4px 16px -2px rgba(17, 20, 24, 0.08), 0 2px 6px -2px rgba(17, 20, 24, 0.04)",
        command: "0 20px 40px -4px rgba(17, 20, 24, 0.14), 0 8px 16px -2px rgba(17, 20, 24, 0.06)",
        smart: "0 0 0 1px rgba(17, 20, 24, 0.05), 0 2px 8px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;

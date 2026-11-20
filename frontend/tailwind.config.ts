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
          DEFAULT: "#FAF7F2", // Claude warm unbleached paper
          subtle: "#F4EFEA",  // Secondary warm card surface
          muted: "#EDE6DD",   // Deeper tactile sand
        },
        terracotta: {
          DEFAULT: "#CC785C", // Claude signature terracotta
          hover: "#B85D3B",
          dark: "#9E4828",
          light: "#FDF5F2",
          border: "#F5DDD4",
        },
        ink: {
          primary: "#1C1917",   // Warm charcoal / deep espresso
          secondary: "#44403C", // Warm stone 700 body
          muted: "#78716C",     // Warm stone 500 metadata
          light: "#A8A29E",     // Warm stone 400
        },
        warm: {
          hairline: "#EBE5DC",  // Soft paper divider
          border: "#E0D7CB",    // Card border
          active: "#D6CABE",    // Focused border
        },
        sage: {
          DEFAULT: "#3D6B52",   // Muted organic green
          light: "#EBF3ED",
          border: "#C4DEC9",
        },
        ochre: {
          DEFAULT: "#B45309",   // Warm amber ochre
          light: "#FEF3C7",
          border: "#FDE68A",
        },
        clay: {
          DEFAULT: "#A85338",
          light: "#FDF1ED",
          border: "#F5D6CB",
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
        xs: "0 1px 2px 0 rgba(45, 35, 25, 0.03)",
        sm: "0 1px 3px 0 rgba(45, 35, 25, 0.04), 0 1px 2px -1px rgba(45, 35, 25, 0.04)",
        card: "0 1px 3px 0 rgba(45, 35, 25, 0.04), 0 1px 2px -1px rgba(45, 35, 25, 0.04)",
        cardHover: "0 6px 16px -2px rgba(45, 35, 25, 0.06), 0 2px 4px -2px rgba(45, 35, 25, 0.03)",
        dropdown: "0 10px 20px -3px rgba(45, 35, 25, 0.07), 0 4px 6px -4px rgba(45, 35, 25, 0.04)",
        popover: "0 20px 30px -5px rgba(45, 35, 25, 0.09), 0 8px 12px -6px rgba(45, 35, 25, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;

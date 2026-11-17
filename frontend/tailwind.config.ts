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
        canvas: "#F7F6F2",
        panel: "#FFFFFF",
        subtle: "#F0EFEA",
        "surface-hover": "#EBE9E2",
        "surface-active": "#E3E0D6",
        
        hairline: "#E5E2D9",
        "border-medium": "#CEC9BC",
        "border-focus": "#14171A",

        ink: {
          primary: "#12151A",
          secondary: "#484F59",
          tertiary: "#7A8494",
          disabled: "#A8B1BD",
        },

        cognition: {
          DEFAULT: "#B45309",
          subtle: "#FEF3C7",
          border: "#FDE68A",
        },

        spruce: {
          DEFAULT: "#1E6B4A",
          subtle: "#E8F5EE",
          border: "#C1E7D3",
        },

        crimson: {
          DEFAULT: "#9E2A2B",
          subtle: "#FDF2F2",
          border: "#F8D0D0",
        },

        slateacc: {
          DEFAULT: "#334155",
          subtle: "#F1F5F9",
          border: "#CBD5E1",
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
        subtle: "0 1px 2px 0 rgba(18, 21, 26, 0.04)",
        elevated: "0 4px 12px -2px rgba(18, 21, 26, 0.06), 0 2px 4px -2px rgba(18, 21, 26, 0.03)",
        command: "0 16px 36px -4px rgba(18, 21, 26, 0.12), 0 6px 12px -2px rgba(18, 21, 26, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;

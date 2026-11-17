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
        // Deep Technical Obsidian & Slate Workstation Palette
        obsidian: {
          950: "#06080B", // Deepest background
          900: "#0B0E14", // Main app canvas
          850: "#10141D", // Surface canvas
          800: "#151B26", // Docked deck / panel background
          750: "#1B2230", // Panel header / subtle hover
          700: "#222B3D", // Border hairline
          600: "#2D374D", // Active element border
        },

        // High-Precision Semantic Phosphors
        phosphor: {
          green: "#00F59B", // Ground-truth optimal, high fidelity
          "green-dim": "rgba(0, 245, 155, 0.12)",
          cyan: "#00D4FF", // Active telemetry, parameters, distributions
          "cyan-dim": "rgba(0, 212, 255, 0.12)",
          amber: "#FFB020", // AI recommendations, cognitive attention
          "amber-dim": "rgba(255, 176, 32, 0.12)",
          crimson: "#FF4D4D", // Over-reliance failure, risk breach
          "crimson-dim": "rgba(255, 77, 77, 0.12)",
          violet: "#B388FF", // Neural epistemic uncertainty
          "violet-dim": "rgba(179, 136, 255, 0.12)",
        },

        terminal: {
          text: "#E6EDF3", // Primary high-contrast technical text
          muted: "#8B949E", // Secondary telemetry data
          dim: "#484F58", // Micro grid coordinates & inactive
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
        mono: [
          "JetBrains Mono",
          "SFMono-Regular",
          "Consolas",
          "Menlo",
          "monospace",
        ],
      },
      borderRadius: {
        xs: "1px",
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
        lg: "6px",
        none: "0px",
      },
      boxShadow: {
        glow: "0 0 20px -3px rgba(0, 245, 155, 0.15)",
        cyanGlow: "0 0 20px -3px rgba(0, 212, 255, 0.15)",
        terminal: "0 8px 32px -4px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;

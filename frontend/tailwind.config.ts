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
        // Stark Swiss Broadsheet & Archival Vellum Palette
        vellum: {
          50: "#FAF9F5",  // Purest page vellum
          100: "#F5F3EC", // Standard broadsheet background
          200: "#EAE6DB", // Substrate divider & borders
          300: "#DBD5C5", // Table borders & hairlines
          400: "#BEB6A2",
          800: "#22201C",
          900: "#141311", // Deep pitch ink
        },
        ink: {
          black: "#0C0D0E",    // Primary typography
          charcoal: "#2C3036", // Body text
          muted: "#6A7280",    // Technical annotations
          faint: "#9DA5B4",    // Coordinates & grid
        },
        // High-Impact Scientific Accents
        klein: {
          DEFAULT: "#0038FF", // International Klein Blue
          subtle: "#E6ECFF",
          border: "#99B4FF",
        },
        vermilion: {
          DEFAULT: "#FF3300", // Bauhaus Vermilion / Alert
          subtle: "#FFEBE6",
          border: "#FF9980",
        },
        spruce: {
          DEFAULT: "#008744", // Forest Green Ground Truth
          subtle: "#E6F4ED",
          border: "#80C9A2",
        },
        amberacc: {
          DEFAULT: "#D97706",
          subtle: "#FEF3C7",
          border: "#FCD34D",
        },
      },
      fontFamily: {
        serif: [
          "Newsreader",
          "Instrument Serif",
          "Georgia",
          "serif",
        ],
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
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
        none: "0px",
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        full: "9999px",
      },
      boxShadow: {
        none: "none",
        sharp: "2px 2px 0px 0px #0C0D0E",
        sharpLg: "4px 4px 0px 0px #0C0D0E",
        sharpKlein: "3px 3px 0px 0px #0038FF",
        sharpVermilion: "3px 3px 0px 0px #FF3300",
      },
    },
  },
  plugins: [],
};

export default config;

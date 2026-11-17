# SENTRA Editorial & Analytic Design System (SEDS)

## 1. Aesthetic Foundations

SENTRA is explicitly designed to reject generic "AI SaaS" aesthetics (e.g. neon orbs, heavy purple gradients, 24px pill cards, empty whitespace, and decorative neural graphics).

Instead, SEDS delivers an understated, high-density environment referencing precision financial software, scientific publications, and editorial clarity.

## 2. Color System

```css
/* Surface Tokens */
--surface-canvas: #F7F6F2;       /* Natural unbleached substrate */
--surface-panel: #FFFFFF;        /* Clean analytical work surface */
--surface-subtle: #F0EFEA;       /* Secondary groupings & table stripes */
--surface-hover: #EBE9E2;        /* Interactive row hover */
--surface-active: #E3E0D6;       /* Selected tab / row */

/* Border & Divider Tokens */
--border-hairline: #E5E2D9;      /* Crisp 1px structural separator */
--border-medium: #CEC9BC;        /* Active card borders, column dividers */
--border-focus: #14171A;         /* 2px high-contrast accessible outline */

/* Ink & Typography Tokens */
--ink-primary: #12151A;          /* Carbon ink (900) */
--ink-secondary: #484F59;        /* Slate graphite (700) */
--ink-tertiary: #7A8494;         /* Metadata & unit labels (500) */
--ink-disabled: #A8B1BD;         /* Disabled state */

/* Semantic Cognitive Markers */
--cognition-amber: #B45309;      /* AI recommendation & hypothesis highlight */
--cognition-surface: #FEF3C7;    /* AI card tint */
--cognition-border: #FDE68A;

--spruce-truth: #1E6B4A;         /* Ground-truth optimal, high-accuracy zone */
--spruce-surface: #E8F5EE;
--spruce-border: #C1E7D3;

--crimson-risk: #9E2A2B;         /* High risk, budget violation, severe bias */
--crimson-surface: #FDF2F2;
--crimson-border: #F8D0D0;

--slate-neutral: #334155;        /* Baseline condition, human-only mode */
--slate-surface: #F1F5F9;
--slate-border: #CBD5E1;
```

## 3. Typography & Numerics
- **Body & Controls**: Inter or system grotesk (13px, 14px, 15px).
- **Tabular Figures**: `font-variant-numeric: tabular-nums` used for all numerical displays, prices, inventory quantities, p-values, and timing measurements.
- **Editorial Titles**: Serif headings (Instrument Serif / Georgia) for executive reports and public landing pages.

## 4. Spacing & Radius Rules
- 4px baseline grid (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`).
- Border radii: Maximum `4px` on buttons, inputs, and badges; `6px` on analytical cards; `8px` on dialogs. *Never exceed 8px.*
- Elevation: Crisp 1px border lines dominate hierarchy; shadows are minimal (`0 1px 2px rgba(18,21,26,0.04)`).

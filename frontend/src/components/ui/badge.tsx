import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "neutral"
    | "terracotta"
    | "spruce"
    | "emerald"
    | "cognition"
    | "amber"
    | "cobalt"
    | "brand"
    | "crimson"
    | "rose"
    | "outline";
}

export function Badge({ className, variant = "neutral", children, ...props }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-3 py-1 text-[11px] font-medium rounded-full tabular-nums border transition-colors";

  const variants = {
    neutral: "bg-canvas-subtle text-ink-secondary border-warm-hairline",
    terracotta: "bg-terracotta-light text-terracotta-dark border-terracotta-border",
    brand: "bg-terracotta-light text-terracotta-dark border-terracotta-border",
    spruce: "bg-sage-light text-sage border-sage-border",
    emerald: "bg-sage-light text-sage border-sage-border",
    cobalt: "bg-stone-100 text-stone-700 border-stone-200",
    cognition: "bg-ochre-light text-ochre border-ochre-border",
    amber: "bg-ochre-light text-ochre border-ochre-border",
    crimson: "bg-rose-50 text-rose-800 border-rose-200",
    rose: "bg-rose-50 text-rose-800 border-rose-200",
    outline: "border-warm-border text-ink-secondary bg-white/70",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}

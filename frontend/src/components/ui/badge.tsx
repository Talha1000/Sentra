import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "cognition" | "spruce" | "crimson" | "outline";
}

export function Badge({ className, variant = "neutral", children, ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium tracking-wide uppercase tabular-nums";

  const variants = {
    neutral: "bg-subtle text-ink-secondary border border-hairline",
    cognition: "bg-cognition-subtle text-cognition border border-cognition-border",
    spruce: "bg-spruce-subtle text-spruce border border-spruce-border",
    crimson: "bg-crimson-subtle text-crimson border border-crimson-border",
    outline: "border border-hairline text-ink-secondary bg-transparent",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}

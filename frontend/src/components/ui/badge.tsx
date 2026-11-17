import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "cognition" | "spruce" | "crimson" | "cobalt" | "iris" | "outline";
}

export function Badge({ className, variant = "neutral", children, ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-medium tracking-wide uppercase tabular-nums";

  const variants = {
    neutral: "bg-subtle text-ink-secondary border border-hairline",
    cognition: "bg-cognition-subtle text-cognition-dark border border-cognition-border font-semibold",
    spruce: "bg-spruce-subtle text-spruce-dark border border-spruce-border font-semibold",
    crimson: "bg-crimson-subtle text-crimson-dark border border-crimson-border font-semibold",
    cobalt: "bg-cobalt-subtle text-cobalt-dark border border-cobalt-border font-semibold",
    iris: "bg-iris-subtle text-iris-dark border border-iris-border font-semibold",
    outline: "border border-hairline text-ink-secondary bg-panel shadow-sm",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}

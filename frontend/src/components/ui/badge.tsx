import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "spruce" | "cognition" | "cobalt" | "crimson" | "iris" | "outline";
}

export function Badge({ className, variant = "neutral", children, ...props }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase tabular-nums font-semibold border";

  const variants = {
    neutral: "bg-obsidian-750 text-terminal-muted border-obsidian-700",
    spruce: "bg-phosphor-green-dim text-phosphor-green border-phosphor-green/30 shadow-[0_0_10px_-2px_rgba(0,245,155,0.25)]",
    cobalt: "bg-phosphor-cyan-dim text-phosphor-cyan border-phosphor-cyan/30 shadow-[0_0_10px_-2px_rgba(0,212,255,0.25)]",
    cognition: "bg-phosphor-amber-dim text-phosphor-amber border-phosphor-amber/30 shadow-[0_0_10px_-2px_rgba(255,176,32,0.25)]",
    crimson: "bg-phosphor-crimson-dim text-phosphor-crimson border-phosphor-crimson/30 shadow-[0_0_10px_-2px_rgba(255,77,77,0.25)]",
    iris: "bg-phosphor-violet-dim text-phosphor-violet border-phosphor-violet/30",
    outline: "border-obsidian-700 text-terminal-muted bg-transparent",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}

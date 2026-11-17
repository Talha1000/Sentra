import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "spruce" | "cognition" | "cobalt" | "crimson" | "iris" | "outline" | "amber" | "vermilion" | "klein";
}

export function Badge({ className, variant = "neutral", children, ...props }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase tabular-nums font-bold border border-ink-black rounded-none";

  const variants = {
    neutral: "bg-vellum-200 text-ink-black",
    spruce: "bg-spruce-subtle text-spruce border-spruce font-bold",
    cobalt: "bg-klein-subtle text-klein border-klein font-bold",
    klein: "bg-klein-subtle text-klein border-klein font-bold",
    cognition: "bg-amberacc-subtle text-amberacc border-amberacc font-bold",
    amber: "bg-amberacc-subtle text-amberacc border-amberacc font-bold",
    crimson: "bg-vermilion-subtle text-vermilion border-vermilion font-bold",
    vermilion: "bg-vermilion-subtle text-vermilion border-vermilion font-bold",
    iris: "bg-purple-100 text-purple-900 border-purple-800",
    outline: "border-ink-black text-ink-black bg-white",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}

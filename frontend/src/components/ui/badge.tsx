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
    | "indigo"
    | "cyan"
    | "violet"
    | "crimson"
    | "rose"
    | "outline";
  dot?: boolean;
}

export function Badge({ className, variant = "neutral", dot = false, children, ...props }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium rounded-full tabular-nums border transition-all duration-150 backdrop-blur-md";

  const variants = {
    neutral: "bg-white/[0.05] text-slate-300 border-white/[0.1]",
    terracotta: "bg-orange-500/10 text-orange-400 border-orange-500/25 shadow-[0_0_12px_rgba(255,107,74,0.15)]",
    brand: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.2)]",
    indigo: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.2)]",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]",
    violet: "bg-violet-500/15 text-violet-300 border-violet-500/30 shadow-[0_0_12px_rgba(139,92,246,0.2)]",
    spruce: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
    cobalt: "bg-blue-500/15 text-blue-300 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.2)]",
    cognition: "bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
    crimson: "bg-rose-500/15 text-rose-300 border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.2)]",
    rose: "bg-rose-500/15 text-rose-300 border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.2)]",
    outline: "border-white/[0.15] text-slate-300 bg-transparent",
  };

  const dotColors = {
    neutral: "bg-slate-400",
    terracotta: "bg-orange-400 shadow-[0_0_6px_rgba(255,107,74,0.6)]",
    brand: "bg-indigo-400 shadow-[0_0_6px_rgba(99,102,241,0.6)]",
    indigo: "bg-indigo-400 shadow-[0_0_6px_rgba(99,102,241,0.6)]",
    cyan: "bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.6)]",
    violet: "bg-violet-400 shadow-[0_0_6px_rgba(139,92,246,0.6)]",
    spruce: "bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.6)]",
    emerald: "bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.6)]",
    cobalt: "bg-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.6)]",
    cognition: "bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.6)]",
    amber: "bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.6)]",
    crimson: "bg-rose-400 shadow-[0_0_6px_rgba(244,63,94,0.6)]",
    rose: "bg-rose-400 shadow-[0_0_6px_rgba(244,63,94,0.6)]",
    outline: "bg-slate-400",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])} />}
      {children}
    </span>
  );
}

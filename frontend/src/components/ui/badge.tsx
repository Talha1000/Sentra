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
    "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border transition-colors";

  const variants = {
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    terracotta: "bg-orange-50 text-orange-700 border-orange-200",
    brand: "bg-blue-50 text-blue-700 border-blue-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-200",
    violet: "bg-purple-50 text-purple-700 border-purple-200",
    spruce: "bg-emerald-50 text-emerald-700 border-emerald-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cobalt: "bg-blue-50 text-blue-700 border-blue-200",
    cognition: "bg-amber-50 text-amber-700 border-amber-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    crimson: "bg-rose-50 text-rose-700 border-rose-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
    outline: "border-slate-300 text-slate-700 bg-white",
  };

  const dotColors = {
    neutral: "bg-slate-500",
    terracotta: "bg-orange-500",
    brand: "bg-blue-600",
    indigo: "bg-indigo-600",
    cyan: "bg-cyan-600",
    violet: "bg-purple-600",
    spruce: "bg-emerald-600",
    emerald: "bg-emerald-600",
    cobalt: "bg-blue-600",
    cognition: "bg-amber-500",
    amber: "bg-amber-500",
    crimson: "bg-rose-600",
    rose: "bg-rose-600",
    outline: "bg-slate-400",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])} />}
      {children}
    </span>
  );
}

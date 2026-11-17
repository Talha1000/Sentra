import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "neutral"
    | "spruce"
    | "emerald"
    | "cognition"
    | "amber"
    | "cobalt"
    | "brand"
    | "klein"
    | "crimson"
    | "rose"
    | "vermilion"
    | "iris"
    | "outline";
}

export function Badge({ className, variant = "neutral", children, ...props }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 text-[11px] font-medium rounded-full tabular-nums border transition-colors";

  const variants = {
    neutral: "bg-slate-100 text-slate-700 border-slate-200/80",
    spruce: "bg-emerald-50 text-emerald-700 border-emerald-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cobalt: "bg-blue-50 text-blue-700 border-blue-200",
    brand: "bg-blue-50 text-blue-700 border-blue-200",
    klein: "bg-blue-50 text-blue-700 border-blue-200",
    cognition: "bg-amber-50 text-amber-850 border-amber-200 text-amber-800",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    crimson: "bg-rose-50 text-rose-700 border-rose-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
    vermilion: "bg-rose-50 text-rose-700 border-rose-200",
    iris: "bg-indigo-50 text-indigo-700 border-indigo-200",
    outline: "border-slate-200 text-slate-600 bg-white",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}

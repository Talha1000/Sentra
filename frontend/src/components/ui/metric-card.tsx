import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus, LucideIcon } from "lucide-react";

export interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  iconColor?: "indigo" | "coral" | "emerald" | "amber" | "cyan";
  delta?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  className?: string;
}

export function MetricCard({
  label,
  value,
  subtext,
  icon: Icon,
  iconColor = "indigo",
  delta,
  className,
}: MetricCardProps) {
  const iconColorMap = {
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20 shadow-[0_0_12px_rgba(99,102,241,0.2)]",
    coral: "text-orange-400 bg-orange-500/10 border-orange-500/20 shadow-[0_0_12px_rgba(255,107,74,0.2)]",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.2)]",
  };

  return (
    <div
      className={cn(
        "relative bg-[#0D111A]/85 backdrop-blur-xl border border-white/[0.09] rounded-2xl p-6 shadow-card hover:shadow-cardHover transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:border-white/20",
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <div className={cn("p-2 rounded-xl border", iconColorMap[iconColor])}>
                <Icon className="w-4 h-4" />
              </div>
            )}
            <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
              {label}
            </span>
          </div>
          {delta && (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full tabular-nums border",
                delta.isNeutral
                  ? "bg-white/[0.05] text-slate-300 border-white/[0.1]"
                  : delta.isPositive
                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                  : "bg-rose-500/15 text-rose-400 border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.15)]"
              )}
            >
              {delta.isNeutral ? (
                <Minus className="w-3 h-3" />
              ) : delta.isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              <span>{delta.value}</span>
            </span>
          )}
        </div>

        <div className="mt-4">
          <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight tabular-nums">
            {value}
          </span>
        </div>
      </div>

      {subtext && (
        <div className="mt-4 pt-3.5 border-t border-white/[0.06]">
          <p className="text-xs text-slate-400 leading-relaxed font-sans">{subtext}</p>
        </div>
      )}
    </div>
  );
}

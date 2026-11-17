import React from "react";
import { cn } from "@/lib/utils";

export interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  delta?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  className?: string;
}

export function MetricCard({ label, value, subtext, delta, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "p-4 bg-white border-2 border-ink-black shadow-sharp rounded-none flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted uppercase tracking-wider mb-2 border-b border-vellum-200 pb-1.5">
        <span className="font-bold text-ink-black">{label}</span>
        {delta && (
          <span
            className={cn(
              "px-1.5 py-0.2 font-mono font-bold text-[10px] tabular-nums border border-ink-black",
              delta.isNeutral
                ? "bg-vellum-200 text-ink-black"
                : delta.isPositive
                ? "bg-spruce-subtle text-spruce border-spruce"
                : "bg-vermilion-subtle text-vermilion border-vermilion"
            )}
          >
            {delta.value}
          </span>
        )}
      </div>

      <div className="text-3xl font-serif font-black text-ink-black tabular-nums tracking-tight">
        {value}
      </div>

      {subtext && (
        <div className="text-[10px] text-ink-muted mt-2 font-mono flex items-center gap-1.5 pt-1.5 border-t border-vellum-200">
          <span>// {subtext}</span>
        </div>
      )}
    </div>
  );
}

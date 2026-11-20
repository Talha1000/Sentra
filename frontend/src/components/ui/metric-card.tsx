import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

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
        "bg-canvas-subtle border border-warm-border rounded-2xl p-6 shadow-paper hover:shadow-cardHover transition-all duration-150 flex flex-col justify-between",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-sans font-medium text-ink-muted uppercase tracking-wider">
            {label}
          </span>
          {delta && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full tabular-nums border",
                delta.isNeutral
                  ? "bg-white/[0.06] text-ink-secondary border-warm-hairline"
                  : delta.isPositive
                  ? "bg-sage-light text-sage border-sage-border"
                  : "bg-rose-500/10 text-rose-400 border-rose-500/20"
              )}
            >
              {delta.isNeutral ? (
                <Minus className="w-3 h-3" />
              ) : delta.isPositive ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              <span>{delta.value}</span>
            </span>
          )}
        </div>

        <div className="mt-3">
          <span className="font-serif text-3xl font-bold text-ink-primary tracking-tight tabular-nums">
            {value}
          </span>
        </div>
      </div>

      {subtext && (
        <div className="mt-3 pt-3 border-t border-warm-hairline">
          <p className="text-xs text-ink-muted leading-relaxed font-sans">{subtext}</p>
        </div>
      )}
    </div>
  );
}

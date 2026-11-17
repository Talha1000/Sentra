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
        "bg-white border border-slate-200/80 rounded-xl p-5 shadow-card hover:shadow-cardHover transition-all duration-150 flex flex-col justify-between",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            {label}
          </span>
          {delta && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-full tabular-nums",
                delta.isNeutral
                  ? "bg-slate-100 text-slate-600"
                  : delta.isPositive
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                  : "bg-rose-50 text-rose-700 border border-rose-200/60"
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

        <div className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mt-2 tabular-nums">
          {value}
        </div>
      </div>

      {subtext && (
        <div className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
          {subtext}
        </div>
      )}
    </div>
  );
}

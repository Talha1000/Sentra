import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus, LucideIcon } from "lucide-react";

export interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  iconColor?: "indigo" | "coral" | "emerald" | "amber" | "cyan" | "blue";
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
  delta,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            {label}
          </span>
          {Icon && (
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
            {value}
          </span>
          {delta && (
            <span
              className={cn(
                "inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border",
                delta.isNeutral
                  ? "bg-slate-50 text-slate-600 border-slate-200"
                  : delta.isPositive
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-rose-50 text-rose-700 border-rose-200"
              )}
            >
              {delta.isPositive && !delta.isNeutral && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
              {!delta.isPositive && !delta.isNeutral && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {delta.isNeutral && <Minus className="w-3 h-3 mr-0.5" />}
              {delta.value}
            </span>
          )}
        </div>
      </div>

      {subtext && (
        <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
          {subtext}
        </p>
      )}
    </div>
  );
}

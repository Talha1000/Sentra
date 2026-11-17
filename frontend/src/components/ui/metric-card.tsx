import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

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
    <Card className={cn("p-5 flex flex-col justify-between", className)}>
      <div className="flex items-center justify-between text-xs font-medium text-ink-secondary mb-2">
        <span>{label}</span>
        {delta && (
          <span
            className={cn(
              "px-1.5 py-0.5 rounded text-[11px] font-mono tabular-nums",
              delta.isNeutral
                ? "bg-subtle text-ink-secondary"
                : delta.isPositive
                ? "bg-spruce-subtle text-spruce"
                : "bg-crimson-subtle text-crimson"
            )}
          >
            {delta.value}
          </span>
        )}
      </div>

      <div className="text-2xl font-semibold text-ink-primary tabular-nums tracking-tight font-sans">
        {value}
      </div>

      {subtext && <div className="text-[11px] text-ink-tertiary mt-2">{subtext}</div>}
    </Card>
  );
}

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
    <Card className={cn("p-4 flex flex-col justify-between border-obsidian-700 bg-obsidian-800", className)}>
      <div className="flex items-center justify-between text-[11px] font-mono text-terminal-muted uppercase tracking-wider mb-2">
        <span>{label}</span>
        {delta && (
          <span
            className={cn(
              "px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold tabular-nums border",
              delta.isNeutral
                ? "bg-obsidian-750 text-terminal-muted border-obsidian-700"
                : delta.isPositive
                ? "bg-phosphor-green-dim text-phosphor-green border-phosphor-green/30"
                : "bg-phosphor-crimson-dim text-phosphor-crimson border-phosphor-crimson/30"
            )}
          >
            {delta.value}
          </span>
        )}
      </div>

      <div className="text-2xl font-bold text-terminal-text tabular-nums tracking-tight font-mono">
        {value}
      </div>

      {subtext && (
        <div className="text-[10px] text-terminal-muted/80 mt-2 font-mono flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-obsidian-600 inline-block" />
          <span>{subtext}</span>
        </div>
      )}
    </Card>
  );
}

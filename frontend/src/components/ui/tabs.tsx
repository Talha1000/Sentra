"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "pill" | "underline";
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, variant = "pill", className }: TabsProps) {
  if (variant === "pill") {
    return (
      <div className={cn("inline-flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md", className)}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer select-none",
                isActive
                  ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-[0_2px_10px_rgba(99,102,241,0.4)] font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
              )}
            >
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-mono tabular-nums",
                    isActive ? "bg-white/20 text-white" : "bg-white/[0.08] text-slate-400"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2 border-b border-white/[0.08]", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-2.5 text-xs font-medium border-b-2 -mb-px transition-all duration-150 flex items-center gap-2 cursor-pointer",
              isActive
                ? "border-indigo-500 text-white font-semibold"
                : "border-transparent text-slate-400 hover:text-white hover:border-white/20"
            )}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded-full text-[10px] font-mono tabular-nums",
                  isActive ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" : "bg-white/[0.06] text-slate-400"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

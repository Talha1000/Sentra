"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  badge?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  rightElement?: React.ReactNode;
}

export function Breadcrumbs({ items, rightElement }: BreadcrumbsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-1.5 text-xs text-slate-400">
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 font-sans">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/[0.06]"
          title="Return to Homepage"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="sr-only">Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-white/20 shrink-0" />
              {isLast || !item.href ? (
                <div className="flex items-center gap-2 font-medium text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.8)] inline-block" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/25">
                      {item.badge}
                    </span>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-white transition-colors text-slate-400 font-medium"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {rightElement && (
        <div className="flex items-center gap-2.5 shrink-0">
          {rightElement}
        </div>
      )}
    </div>
  );
}

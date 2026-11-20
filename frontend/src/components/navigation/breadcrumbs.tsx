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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1 text-xs text-ink-muted">
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 font-sans">
        <Link
          href="/"
          className="flex items-center gap-1 text-ink-muted hover:text-ink-primary transition-colors"
          title="Return to Homepage"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="sr-only">Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-warm-hairline shrink-0" />
              {isLast || !item.href ? (
                <div className="flex items-center gap-1.5 font-medium text-ink-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta inline-block" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-canvas-elevated text-ink-muted border border-warm-hairline">
                      {item.badge}
                    </span>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-ink-primary transition-colors text-ink-secondary"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {rightElement && (
        <div className="flex items-center gap-2 shrink-0">
          {rightElement}
        </div>
      )}
    </div>
  );
}

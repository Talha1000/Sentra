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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-1 text-xs text-slate-500 mb-6">
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 font-sans">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors p-1 rounded-md hover:bg-slate-100"
          title="Return to Homepage"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="sr-only">Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              {isLast || !item.href ? (
                <div className="flex items-center gap-2 font-medium text-slate-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {item.badge}
                    </span>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-slate-900 transition-colors text-slate-500 font-medium"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {rightElement && (
        <div className="flex items-center gap-2.5 shrink-0 text-slate-500">
          {rightElement}
        </div>
      )}
    </div>
  );
}

"use client";

import React from "react";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      <Topbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 mt-16 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Sentra
            </span>
            <span>•</span>
            <span>Smart Decision Planning</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[11px]">
              v1.2.0
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Real-Time Forecasting Active
            </span>
            <span>•</span>
            <span>Enterprise Safe &amp; Protected</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import React from "react";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      <Topbar />
      <main className="flex-1 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="border-t border-slate-200 bg-white px-6 py-4 mt-16">
        <div className="max-w-[1520px] mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-700">SENTRA</span>
            <span>•</span>
            <span>Decision Intelligence Platform</span>
            <span>•</span>
            <span>v1.2.0</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500 text-[11px]">
            <span>Deterministic Scoring Engine</span>
            <span>•</span>
            <span>Welch t-Test Inference</span>
            <span>•</span>
            <span>SOC2 / ISO-27001 Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

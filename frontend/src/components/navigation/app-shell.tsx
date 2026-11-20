"use client";

import React from "react";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink-primary font-sans antialiased">
      <Topbar />
      <main className="flex-1 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="border-t border-warm-border bg-canvas-subtle/50 px-6 py-4 mt-16">
        <div className="max-w-[1520px] mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-3">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-ink-primary">SENTRA</span>
            <span>•</span>
            <span>Decision Intelligence Platform</span>
            <span>•</span>
            <span>v1.2.0</span>
          </div>
          <div className="flex items-center gap-4 text-ink-muted text-[11px]">
            <span>Deterministic Scoring Engine</span>
            <span>•</span>
            <span>Welch t-Test Inference</span>
            <span>•</span>
            <span>SOC-2 / ISO-42001 Cryptographically Sealed</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

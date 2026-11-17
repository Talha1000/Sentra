"use client";

import React from "react";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-vellum-100 text-ink-black font-sans antialiased selection:bg-klein selection:text-white">
      <Topbar />
      <main className="flex-1 w-full max-w-[1720px] mx-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>
      <footer className="border-t-2 border-ink-black bg-vellum-50 px-6 py-4 mt-12">
        <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-ink-muted uppercase tracking-wider gap-3">
          <div className="flex items-center gap-3">
            <span className="font-bold text-ink-black">SENTRA INSTITUTION</span>
            <span>/</span>
            <span>EDITION № 2026.11</span>
            <span>/</span>
            <span className="text-klein font-bold">CALIBRATED COGNITIVE LAB</span>
          </div>
          <div className="flex items-center gap-4">
            <span>DETERMINISTIC EVALUATOR: ONLINE</span>
            <span>|</span>
            <span>WELCH T-TEST ENGINE: READY</span>
            <span>|</span>
            <span>SOC2 / ISO-27001 COMPLIANT</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

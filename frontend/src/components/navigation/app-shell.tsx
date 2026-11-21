"use client";

import React from "react";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#07090E] text-slate-100 font-sans antialiased relative selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/15 via-purple-600/5 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute top-[30%] -left-40 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-[60%] -right-40 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Topbar />
        
        <main className="flex-1 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <footer className="border-t border-white/[0.07] bg-[#07090E]/80 backdrop-blur-xl px-6 py-5 mt-16">
          <div className="max-w-[1520px] mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div className="flex items-center gap-3">
              <span className="font-bold tracking-tight text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                SENTRA
              </span>
              <span className="text-white/20">•</span>
              <span className="text-slate-400">Decision Intelligence Platform</span>
              <span className="text-white/20">•</span>
              <span className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] text-slate-300 font-mono">
                v1.2.0-PRO
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                Deterministic Monte Carlo Engine
              </span>
              <span className="text-white/20">•</span>
              <span>Welch t-Test & Calibration Inference</span>
              <span className="text-white/20">•</span>
              <span className="text-indigo-300 font-medium">SOC-2 & ISO-42001 Cryptographically Sealed</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, X, Info } from "lucide-react";

export function SemiconHero() {
  const [showNews, setShowNews] = useState(true);

  return (
    <section className="relative w-full bg-[#000000] text-white pt-20 pb-24 overflow-hidden border-b border-neutral-900">
      {/* Dark Industrial Circuit / Chip Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-grid-pattern" style={{ backgroundSize: "40px 40px" }} />
        {/* Hardware Rim Light and Subtle Chip Shadows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-b from-neutral-800/30 via-neutral-900/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#000000] to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1380px] mx-auto px-6 space-y-12">
        {/* Floating Pure White Breaking News Ribbon (SemiconBio Signature) */}
        {showNews && (
          <div className="w-full bg-[#FFFFFF] text-black px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold uppercase text-[11px] tracking-wider text-black flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                BREAKING BENCHMARK
              </span>
              <span className="hidden sm:inline text-neutral-300">|</span>
              <span className="font-medium text-neutral-800 leading-snug">
                Sentra demonstrates the first Scalable Stochastic Decision Calibration Engine in Peer-Reviewed Trials.
              </span>
            </div>

            <div className="flex items-center gap-4 shrink-0 font-mono text-[11px] font-bold">
              <Link
                href="/analytics"
                className="underline hover:text-neutral-600 transition-colors flex items-center gap-1"
              >
                <span>READ REPORT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-neutral-300">|</span>
              <button
                onClick={() => setShowNews(false)}
                className="text-neutral-500 hover:text-black transition-colors"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Hero Headline & Subtitle */}
        <div className="max-w-5xl pt-4 sm:pt-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            <span className="w-2 h-2 bg-[#00F0FF] inline-block" />
            <span>THE SENTRA DECISION PLATFORM</span>
            <span className="text-neutral-600">·</span>
            <span>MOLECULAR & ENTERPRISE RISK ARCHITECTURE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-bold text-white tracking-tightest leading-[1.05]">
            The Sentra Platform, <br />
            Where the Impossible <br />
            Becomes Possible.
          </h1>

          <p className="text-base sm:text-xl text-neutral-400 font-sans max-w-2xl leading-relaxed">
            AI is remarkably articulate. It is also, at times, quietly wrong. Sentra replaces heuristic overconfidence with stochastic calculus, empirical cognitive testing, and tamper-proof governance.
          </p>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href="/workspace"
              className="px-6 py-3.5 bg-white text-black hover:bg-neutral-200 font-mono text-xs font-semibold tracking-wider flex items-center gap-2 transition-colors"
            >
              <span>EXPLORE WORKSTATION</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href="#scurve"
              className="px-6 py-3.5 bg-transparent text-white border border-neutral-700 hover:border-white font-mono text-xs font-medium tracking-wider flex items-center gap-2 transition-colors"
            >
              <span>INSPECT S-CURVE</span>
              <span className="text-[#00F0FF] text-[10px]">[02]</span>
            </a>

            <Link
              href="/experiments"
              className="px-5 py-3.5 text-neutral-400 hover:text-white font-mono text-xs font-medium tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <span className="text-[#FF4400] font-bold">[ · i · ]</span>
              <span>DOUBLE-BLIND LAB</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

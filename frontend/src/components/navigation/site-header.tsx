"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SiteHeaderProps {
  onOpenDemystifier: () => void;
  onOpenCommandPalette?: () => void;
}

const NAV_LINKS = [
  { name: "PLATFORM", href: "/workspace" },
  { name: "STOCHASTIC STUDIO", href: "/decisions" },
  { name: "BEHAVIORAL LAB", href: "/experiments" },
  { name: "EMPIRICAL METRICS", href: "/analytics" },
  { name: "GOVERNANCE LEDGER", href: "/governance" },
];

export function SiteHeader({ onOpenDemystifier, onOpenCommandPalette }: SiteHeaderProps) {
  const [showTicker, setShowTicker] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="sticky top-0 z-50 w-full select-none">
      {/* Top Precision News Ticker (SemiconBio Style) */}
      <AnimatePresence>
        {showTicker && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full bg-[#08090D] border-b border-white/[0.07] text-[11px] font-mono text-neutral-300 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-white/10 text-white text-[10px] uppercase font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                  EMPIRICAL REPORT
                </span>
                <span className="text-neutral-300 hidden sm:inline">
                  225 Seated Trials Demonstrating 23.2% Generative AI Decision Drift Interception
                </span>
                <span className="text-neutral-300 sm:hidden">
                  225 Trials: 23.2% AI Bias Intercepted
                </span>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <button
                  onClick={onOpenDemystifier}
                  className="text-white hover:text-[#00F0FF] transition-colors underline underline-offset-2 flex items-center gap-1 font-medium"
                >
                  <span>READ RESEARCH ↗</span>
                </button>
                <button
                  onClick={() => setShowTicker(false)}
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label="Dismiss Ticker"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Dark Glass Navigation Bar */}
      <nav className="w-full bg-[#050608]/90 backdrop-blur-xl border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
          
          {/* Brand Mark (SemiconBio Cyan Square Icon) */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-6 h-6 rounded-sm bg-[#00F0FF] flex items-center justify-center text-black font-black text-xs tracking-tighter shadow-[0_0_12px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
                S
              </div>
              <span className="font-bold text-sm tracking-tight text-white group-hover:text-neutral-200 transition-colors">
                SENTRA
              </span>
            </Link>
          </div>

          {/* Desktop Links with Vertical Hairline Dividers */}
          <div
            className="hidden lg:flex items-center text-[11px] font-mono tracking-wider text-neutral-400 border-l border-white/[0.08]"
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {NAV_LINKS.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredIdx(idx)}
                className={`relative px-4 py-2 border-r border-white/[0.08] transition-colors ${
                  hoveredIdx === idx ? "text-white font-semibold" : "hover:text-neutral-200"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {hoveredIdx === idx && (
                  <motion.div
                    layoutId="header-active-line"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00F0FF]"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] rounded-full transition-all"
                title="Search (⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-neutral-400" />
                <kbd className="font-mono text-[10px] text-neutral-400">⌘K</kbd>
              </button>
            )}

            <button
              onClick={onOpenDemystifier}
              className="btn-semicon-secondary hidden sm:inline-flex"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-neutral-400" />
              <span>Concept Guide</span>
            </button>

            <Link
              href="/workspace"
              className="btn-semicon-primary group"
            >
              <span>Enter Studio</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-neutral-500 group-hover:translate-x-0.5 group-hover:text-neutral-900 transition-all" />
            </Link>
          </div>

        </div>
      </nav>
    </div>
  );
}

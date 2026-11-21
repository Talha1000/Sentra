"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Search, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SiteHeaderProps {
  onOpenDemystifier: () => void;
  onOpenCommandPalette?: () => void;
}

const NAV_ITEMS = [
  { name: "DECISIONS", href: "/decisions" },
  { name: "STUDIO", href: "/workspace" },
  { name: "BEHAVIORAL LAB", href: "/experiments" },
  { name: "ANALYTICS", href: "/analytics" },
  { name: "GOVERNANCE", href: "/governance" },
];

export function SiteHeader({ onOpenDemystifier, onOpenCommandPalette }: SiteHeaderProps) {
  const [showBanner, setShowBanner] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="sticky top-0 z-50 w-full select-none">
      {/* Top Technical Notice Ticker (SemiconBio Style) */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full bg-[#0D0E11] text-white border-b border-white/[0.1] text-[11px] font-mono overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-white/10 text-white text-[10px] uppercase tracking-wider font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C4CC] animate-pulse" />
                  EMPIRICAL REPORT
                </span>
                <span className="text-neutral-300 hidden sm:inline">
                  225 Seated Trials Demonstrating 23.2% Generative AI Decision Drift Interception
                </span>
                <span className="text-neutral-300 sm:hidden">
                  225 Trials: 23.2% AI Skew Intercepted
                </span>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <button
                  onClick={onOpenDemystifier}
                  className="text-white hover:text-[#00C4CC] transition-colors underline underline-offset-2 flex items-center gap-1 font-medium"
                >
                  <span>READ EVIDENCE ↗</span>
                </button>
                <button
                  onClick={() => setShowBanner(false)}
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label="Close Announcement"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Precision White Nav Bar */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-neutral-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto h-14 px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo & Mark */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-6 h-6 rounded-sm bg-[#00C4CC] flex items-center justify-center text-white font-bold text-xs tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
                <span className="text-black font-black">S</span>
              </div>
              <span className="font-bold text-sm tracking-tight text-neutral-900 group-hover:text-black transition-colors">
                SENTRA
              </span>
            </Link>
          </div>

          {/* Desktop Nav Items with Hairline Separators */}
          <nav
            className="hidden md:flex items-center text-[11px] font-mono tracking-wider text-neutral-600 border-l border-neutral-200"
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {NAV_ITEMS.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredIdx(idx)}
                className={`relative px-4 py-2 border-r border-neutral-200 transition-colors ${
                  hoveredIdx === idx ? "text-neutral-950 font-semibold" : "hover:text-neutral-900"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {hoveredIdx === idx && (
                  <motion.div
                    layoutId="nav-line-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Tactile Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 rounded-md transition-colors border border-neutral-200"
                title="Search Command Palette (⌘K)"
              >
                <Search className="w-3 h-3 text-neutral-500" />
                <kbd className="font-mono text-[10px] text-neutral-400">⌘K</kbd>
              </button>
            )}

            <button
              onClick={onOpenDemystifier}
              className="btn-tactile-secondary px-3.5 py-1.5 text-xs text-neutral-800 hidden sm:inline-flex"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-neutral-500" />
              <span>Concept Guide</span>
            </button>

            <Link
              href="/workspace"
              className="btn-tactile-primary px-4 py-1.5 text-xs text-white group"
            >
              <span>Enter Studio</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-neutral-300 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

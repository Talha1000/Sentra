"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, BookOpen, Search, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SiteHeaderProps {
  onOpenDemystifier: () => void;
  onOpenCommandPalette?: () => void;
}

const NAV_LINKS = [
  { name: "Executive Workspace", href: "/workspace" },
  { name: "Decision Studio", href: "/decisions" },
  { name: "Behavioral Lab", href: "/experiments" },
  { name: "Empirical Analytics", href: "/analytics" },
  { name: "Governance Ledger", href: "/governance" },
];

export function SiteHeader({ onOpenDemystifier, onOpenCommandPalette }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0C0E]/90 backdrop-blur-xl border-b border-white/[0.08] select-none transition-all">
      <div className="max-w-6xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-b from-white to-neutral-200 text-neutral-900 flex items-center justify-center font-bold text-xs tracking-tighter shadow-sm border border-white/80 group-hover:scale-105 transition-transform duration-200">
                S
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-white group-hover:text-neutral-200 transition-colors">
                SENTRA
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                DECISION INTELLIGENCE
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation with Gliding Hover Pill */}
        <nav
          className="hidden md:flex items-center gap-1 text-xs text-neutral-400"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHoveredIndex(idx)}
              className="px-3.5 py-1.5 rounded-lg transition-colors font-medium relative hover:text-white"
            >
              <span className="relative z-10">{link.name}</span>
              {hoveredIndex === idx && (
                <motion.div
                  layoutId="nav-gliding-pill"
                  className="absolute inset-0 bg-white/[0.06] rounded-lg -z-0 border border-white/[0.08]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.09] rounded-xl transition-all shadow-sm active:scale-95"
              title="Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5" />
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-neutral-300">⌘K</kbd>
            </button>
          )}

          <button
            onClick={onOpenDemystifier}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-neutral-200 hover:text-white btn-shimmer-secondary rounded-xl transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Concept Guide</span>
          </button>

          <Link
            href="/workspace"
            className="btn-shimmer-primary flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-xl text-neutral-900 group"
          >
            <span>Enter Studio</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/[0.08] bg-[#0E1013] px-6 py-4 space-y-3 overflow-hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm text-neutral-300 hover:text-white py-1 font-medium"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemystifier();
                }}
                className="text-xs text-blue-400 flex items-center gap-1.5 py-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open Concept Guide</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

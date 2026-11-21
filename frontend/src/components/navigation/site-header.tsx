"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
  Search,
} from "lucide-react";

interface SiteHeaderProps {
  onOpenDemystifier: () => void;
  onOpenCommandPalette?: () => void;
}

const SYSTEMS_MENU = [
  {
    code: "N01.",
    name: "Executive Workstation",
    href: "/workspace",
    desc: "Live portfolio telemetry, real-time agreement rates, and anomaly detection feeds.",
  },
  {
    code: "N02.",
    name: "Decision Studio",
    href: "/decisions",
    desc: "Interactive Monte Carlo simulation with critical fractile optimization.",
  },
  {
    code: "N03.",
    name: "Cognitive Research Lab",
    href: "/experiments",
    desc: "Double-blind behavioral protocols with controlled injected bias stressors.",
  },
  {
    code: "N04.",
    name: "Evidence & Analytics",
    href: "/analytics",
    desc: "Welch’s t-tests, Cohen’s d effect sizes, and calibration curves.",
  },
  {
    code: "N05.",
    name: "Governance & Audit",
    href: "/governance",
    desc: "Immutable HMAC SHA-256 cryptographic ledger for compliance and board review.",
  },
];

export function SiteHeader({ onOpenDemystifier, onOpenCommandPalette }: SiteHeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<"systems" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown("systems");
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 px-4 sm:px-6 select-none bg-black/80 backdrop-blur-md border-b border-neutral-900 transition-all">
      <div className="max-w-[1380px] mx-auto h-12 flex items-center justify-between text-white">
        {/* Brand & Monogram (Exact step_9.png) */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-5 h-5 bg-[#00F0FF] rounded-none flex items-center justify-center font-mono font-bold text-xs text-black shadow-sm">
              S
            </div>
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-neutral-300 transition-colors">
              SENTRA
            </span>
          </Link>
          <div className="hidden lg:block h-4 w-[1px] bg-neutral-800 mx-1" />
          <span className="hidden xl:inline-block font-mono text-[10px] uppercase text-neutral-500 tracking-wider">
            DECISION INTELLIGENCE
          </span>
        </div>

        {/* Segmented Hairline Nav Bar (Exact step_9.png) */}
        <nav
          className="hidden md:flex items-center text-[11px] font-mono tracking-wider text-neutral-300"
          onMouseLeave={handleMouseLeave}
        >
          {/* Applications Dropdown */}
          <div
            className="relative h-12 flex items-center px-4 hover:text-white border-l border-neutral-800 cursor-pointer transition-colors"
            onMouseEnter={handleMouseEnter}
          >
            <div className="flex items-center gap-1.5 uppercase font-medium">
              <span>APPLICATIONS</span>
              <ChevronDown className="w-3 h-3 text-neutral-500" />
            </div>

            <AnimatePresence>
              {activeDropdown === "systems" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-96 p-3 bg-[#0A0A0A] border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 space-y-2 text-left"
                >
                  <div className="px-2 py-1 text-[10px] font-mono uppercase text-neutral-500 border-b border-neutral-800 flex justify-between">
                    <span>PLATFORM ENGINES</span>
                    <span>N01–N05</span>
                  </div>
                  <div className="space-y-1">
                    {SYSTEMS_MENU.map((item) => (
                      <Link
                        key={item.code}
                        href={item.href}
                        className="block p-2 hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors group"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-white">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-[#00F0FF]">
                              {item.code}
                            </span>
                            <span>{item.name}</span>
                          </div>
                          <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-transform" />
                        </div>
                        <div className="text-[11px] text-neutral-400 font-sans mt-0.5 pl-6 leading-tight">
                          {item.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* S-Curve Lab */}
          <a
            href="#scurve"
            className="h-12 flex items-center px-4 hover:text-white border-l border-neutral-800 uppercase font-medium transition-colors"
          >
            S-CURVE LAB
          </a>

          {/* Stressor */}
          <a
            href="#simulator"
            className="h-12 flex items-center px-4 hover:text-white border-l border-neutral-800 uppercase font-medium transition-colors"
          >
            STRESSOR
          </a>

          {/* Case Studies */}
          <a
            href="#case-studies"
            className="h-12 flex items-center px-4 hover:text-white border-l border-neutral-800 uppercase font-medium transition-colors"
          >
            EVIDENCE
          </a>

          {/* FAQ */}
          <a
            href="#faq"
            className="h-12 flex items-center px-4 hover:text-white border-l border-r border-neutral-800 uppercase font-medium transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Guide Monospace Button */}
          <button
            onClick={onOpenDemystifier}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-600 transition-colors"
          >
            <span className="text-[#FF4400] font-bold">[ · i · ]</span>
            <span>GUIDE</span>
          </button>

          {/* Search Trigger */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
              title="Search (⌘K)"
            >
              <Search className="w-3 h-3 text-neutral-400" />
              <span>⌘K</span>
            </button>
          )}

          {/* Workspace Button */}
          <Link
            href="/workspace"
            className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-black hover:bg-neutral-200 font-mono text-[11px] font-bold tracking-wide transition-colors"
          >
            <span>WORKSPACE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden mt-2 p-4 bg-[#0A0A0A] border border-neutral-800 shadow-2xl space-y-3 text-white text-xs font-mono"
          >
            <div className="pb-2 border-b border-neutral-800 font-bold uppercase text-[10px] text-neutral-500">
              NAVIGATION
            </div>
            <Link
              href="/workspace"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-1 hover:text-[#00F0FF]"
            >
              <span>N01. EXECUTIVE WORKSPACE</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <Link
              href="/decisions"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-1 hover:text-[#00F0FF]"
            >
              <span>N02. DECISION STUDIO</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <Link
              href="/experiments"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-1 hover:text-[#00F0FF]"
            >
              <span>N03. RESEARCH LAB</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <Link
              href="/analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-1 hover:text-[#00F0FF]"
            >
              <span>N04. EVIDENCE & ANALYTICS</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <Link
              href="/governance"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-1 hover:text-[#00F0FF]"
            >
              <span>N05. CRYPTOGRAPHIC GOVERNANCE</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

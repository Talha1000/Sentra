"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowUpRight,
  Search,
  Menu,
  X,
  Sparkles,
  Play,
  Cpu,
  FlaskConical,
  BarChart3,
  ShieldCheck,
  LayoutDashboard,
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
    dot: "#00F0FF",
  },
  {
    code: "N02.",
    name: "Decision Studio",
    href: "/decisions",
    desc: "Interactive Monte Carlo simulation with critical fractile optimization.",
    dot: "#FF4400",
  },
  {
    code: "N03.",
    name: "Cognitive Research Lab",
    href: "/experiments",
    desc: "Double-blind behavioral protocols with controlled injected bias stressors.",
    dot: "#A855F7",
  },
  {
    code: "N04.",
    name: "Evidence & Analytics",
    href: "/analytics",
    desc: "Welch’s t-tests, Cohen’s d effect sizes, and calibration curves.",
    dot: "#10B981",
  },
  {
    code: "N05.",
    name: "Governance & Audit",
    href: "/governance",
    desc: "Immutable HMAC SHA-256 cryptographic ledger for compliance and board review.",
    dot: "#00F0FF",
  },
];

const HOW_IT_WORKS_STEPS = [
  { step: "01", title: "Formulate Choice", desc: "Define parameters under stochastic demand uncertainty." },
  { step: "02", title: "Intercept AI", desc: "Examine AI recommendation for overconfidence bias." },
  { step: "03", title: "Simulate Futures", desc: "1,000 Monte Carlo draws pinpoint optimal fractile." },
  { step: "04", title: "Cryptographic Seal", desc: "Immutable HMAC audit certificate committed." },
];

export function SiteHeader({ onOpenDemystifier, onOpenCommandPalette }: SiteHeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<"systems" | "how-it-works" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterDropdown = (key: "systems" | "how-it-works") => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 px-4 sm:px-6 select-none transition-all duration-200">
      <div className="max-w-[1380px] mx-auto bg-white/95 backdrop-blur-md border border-neutral-300/80 shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-sm px-4 h-12 flex items-center justify-between text-black">
        {/* Brand & Monogram - SemiconBio Style */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-5 h-5 bg-[#00F0FF] rounded-none flex items-center justify-center font-mono font-bold text-xs text-black shadow-sm">
              S
            </div>
            <span className="font-semibold text-sm tracking-tight text-black group-hover:text-neutral-700 transition-colors">
              SENTRA
            </span>
          </Link>
          <div className="hidden lg:block h-4 w-[1px] bg-neutral-300 mx-1" />
          <span className="hidden xl:inline-block font-mono text-[10px] uppercase text-neutral-500 tracking-wider">
            DECISION INTELLIGENCE
          </span>
        </div>

        {/* Segmented Architectural Nav Bar */}
        <nav
          className="hidden md:flex items-center text-[10px] lg:text-[11px] font-mono tracking-wider text-neutral-800"
          onMouseLeave={handleMouseLeaveDropdown}
        >
          {/* 1. Applications / Systems */}
          <div
            className="relative h-12 flex items-center px-3 hover:text-black border-l border-neutral-200 cursor-pointer"
            onMouseEnter={() => handleMouseEnterDropdown("systems")}
          >
            <div className="flex items-center gap-1.5 uppercase font-medium">
              <span>APPLICATIONS</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </div>

            {/* Systems Dropdown */}
            <AnimatePresence>
              {activeDropdown === "systems" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-96 p-3 bg-white border border-neutral-300 shadow-[0_16px_40px_rgba(0,0,0,0.12)] rounded-none z-50 space-y-2 text-left"
                >
                  <div className="px-2 py-1 text-[10px] font-mono uppercase text-neutral-400 border-b border-neutral-100 flex justify-between">
                    <span>PLATFORM ENGINES</span>
                    <span>N01–N05</span>
                  </div>
                  <div className="space-y-1">
                    {SYSTEMS_MENU.map((item) => (
                      <Link
                        key={item.code}
                        href={item.href}
                        className="block p-2 rounded-none hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-colors group"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-black">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-neutral-400 group-hover:text-black">
                              {item.code}
                            </span>
                            <span>{item.name}</span>
                          </div>
                          <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <div className="text-[11px] text-neutral-500 font-sans mt-0.5 pl-6 leading-tight">
                          {item.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. How it Works */}
          <div
            className="relative h-12 flex items-center px-3 hover:text-black border-l border-neutral-200 cursor-pointer"
            onMouseEnter={() => handleMouseEnterDropdown("how-it-works")}
          >
            <div className="flex items-center gap-1.5 uppercase font-medium">
              <span>HOW IT WORKS</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </div>

            <AnimatePresence>
              {activeDropdown === "how-it-works" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-80 p-3 bg-white border border-neutral-300 shadow-[0_16px_40px_rgba(0,0,0,0.12)] rounded-none z-50 space-y-2 text-left"
                >
                  <div className="px-2 py-1 text-[10px] font-mono uppercase text-neutral-400 border-b border-neutral-100 flex justify-between">
                    <span>THE 4-STEP PROTOCOL</span>
                    <span>EMPIRICAL</span>
                  </div>
                  <div className="space-y-1">
                    {HOW_IT_WORKS_STEPS.map((st) => (
                      <div
                        key={st.step}
                        className="p-2 hover:bg-neutral-50 transition-colors flex items-start gap-2.5"
                      >
                        <span className="font-mono font-bold text-xs text-[#FF4400]">
                          {st.step}.
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-black">{st.title}</div>
                          <div className="text-[11px] text-neutral-500 font-sans leading-tight mt-0.5">
                            {st.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. S-Curve Lab */}
          <a
            href="#visual-tour"
            className="h-12 flex items-center px-3 hover:text-black border-l border-neutral-200 uppercase font-medium transition-colors"
          >
            S-CURVE LAB
          </a>

          {/* 4. Stressor */}
          <a
            href="#simulator"
            className="h-12 flex items-center px-3 hover:text-black border-l border-neutral-200 uppercase font-medium transition-colors"
          >
            STRESSOR
          </a>

          {/* 5. Evidence */}
          <a
            href="#case-studies"
            className="h-12 flex items-center px-3 hover:text-black border-l border-neutral-200 uppercase font-medium transition-colors"
          >
            EVIDENCE
          </a>

          {/* 6. FAQ */}
          <a
            href="#faq"
            className="h-12 flex items-center px-3 hover:text-black border-l border-r border-neutral-200 uppercase font-medium transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Right Actions - Telemetry & Buttons */}
        <div className="flex items-center gap-2">
          {/* Concept Guide Button [ · i · ] */}
          <button
            onClick={onOpenDemystifier}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-neutral-600 hover:text-black border border-neutral-200 hover:border-neutral-400 transition-colors"
          >
            <span className="text-[#FF4400] font-bold">[ · i · ]</span>
            <span>GUIDE</span>
          </button>

          {/* Search Trigger */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-neutral-500 hover:text-black border border-neutral-200 hover:border-neutral-300 transition-colors"
              title="Open Command Palette (⌘K)"
            >
              <Search className="w-3 h-3 text-neutral-400" />
              <span>⌘K</span>
            </button>
          )}

          {/* Engine Status Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono text-neutral-700 bg-neutral-100 border border-neutral-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
            <span>ENGINE READY</span>
          </div>

          {/* High-Contrast Action Button - Black Box with Diagonal Arrow */}
          <Link
            href="/workspace"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-black hover:bg-neutral-800 text-white font-mono text-[11px] font-medium tracking-wide transition-colors"
          >
            <span>WORKSPACE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 text-black"
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
            className="lg:hidden mt-2 p-4 bg-white border border-neutral-300 shadow-xl space-y-3 text-black text-xs font-mono"
          >
            <div className="pb-2 border-b border-neutral-200 font-bold uppercase text-[10px] text-neutral-400">
              NAVIGATION
            </div>
            <Link
              href="/workspace"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-1 hover:text-[#FF4400]"
            >
              <span>N01. EXECUTIVE WORKSPACE</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <Link
              href="/decisions"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-1 hover:text-[#FF4400]"
            >
              <span>N02. DECISION STUDIO</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <Link
              href="/experiments"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-1 hover:text-[#FF4400]"
            >
              <span>N03. RESEARCH LAB</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <Link
              href="/analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-1 hover:text-[#FF4400]"
            >
              <span>N04. EVIDENCE & ANALYTICS</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <Link
              href="/governance"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-1 hover:text-[#FF4400]"
            >
              <span>N05. CRYPTOGRAPHIC GOVERNANCE</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <div className="pt-2 border-t border-neutral-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemystifier();
                }}
                className="w-full text-left py-1 text-[#FF4400] font-bold"
              >
                [ · i · ] OPEN CONCEPT GUIDE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

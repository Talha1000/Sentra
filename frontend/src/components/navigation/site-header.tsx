"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  ArrowRight,
  ChevronDown,
  LayoutDashboard,
  Cpu,
  FlaskConical,
  BarChart3,
  ShieldCheck,
  Play,
  Menu,
  X,
  Search,
  Sparkles,
} from "lucide-react";

interface SiteHeaderProps {
  onOpenDemystifier: () => void;
  onOpenCommandPalette?: () => void;
}

const SYSTEMS_MENU = [
  {
    name: "Executive Workspace",
    href: "/workspace",
    desc: "Live portfolio telemetry, real-time agreement rates, and anomaly detection feeds.",
    icon: LayoutDashboard,
    badge: "Module A",
  },
  {
    name: "Decision Studio",
    href: "/decisions",
    desc: "Interactive Monte Carlo simulation with critical fractile optimization.",
    icon: Cpu,
    badge: "Module B",
  },
  {
    name: "Cognitive Research Lab",
    href: "/experiments",
    desc: "Double-blind behavioral protocols with controlled injected bias stressors.",
    icon: FlaskConical,
    badge: "Module C",
  },
  {
    name: "Evidence & Analytics",
    href: "/analytics",
    desc: "Welch’s t-tests, Cohen’s d effect sizes, and Expected Calibration Error curves.",
    icon: BarChart3,
    badge: "Module D",
  },
  {
    name: "Governance & Audit",
    href: "/governance",
    desc: "Immutable HMAC SHA-256 cryptographic ledger for compliance and board review.",
    icon: ShieldCheck,
    badge: "Module E",
  },
];

const HOW_IT_WORKS_STEPS = [
  { step: "01", title: "Formulate Choice", desc: "Define parameters under stochastic demand uncertainty." },
  { step: "02", title: "Intercept AI", desc: "Examine AI recommendation for overconfidence bias." },
  { step: "03", title: "Simulate Futures", desc: "1,000 Monte Carlo draws pinpoint optimal fractile." },
  { step: "04", title: "Cryptographic Seal", desc: "Immutable HMAC audit certificate committed." },
];

export function SiteHeader({ onOpenDemystifier, onOpenCommandPalette }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<"systems" | "how-it-works" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track scroll position to morph navbar into floating frosted glass capsule
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out select-none ${
        isScrolled
          ? "py-3 px-4 sm:px-6"
          : "py-4 px-6 bg-[#07090E]/80 backdrop-blur-xl border-b border-white/[0.06]"
      }`}
    >
      <div
        className={`mx-auto transition-all duration-300 ${
          isScrolled
            ? "max-w-6xl bg-[#0D111A]/90 backdrop-blur-2xl border border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.65)] rounded-2xl px-5 h-16 flex items-center justify-between"
            : "max-w-7xl flex items-center justify-between h-12"
        }`}
      >
        {/* Brand & Monogram */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-70 blur-sm group-hover:opacity-100 transition duration-300" />
              <div className="relative w-8 h-8 rounded-xl bg-[#0F1523] border border-white/20 flex items-center justify-center font-bold text-sm text-white shadow-md">
                S
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                SENTRA
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/25">
                Decision Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* Central Nav with Animated Gliding Hover Pill & Dropdowns */}
        <nav
          className="hidden lg:flex items-center gap-1 relative"
          onMouseLeave={() => {
            setHoveredNav(null);
            handleMouseLeaveDropdown();
          }}
        >
          {/* 1. How It Works (With Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => {
              setHoveredNav("how-it-works");
              handleMouseEnterDropdown("how-it-works");
            }}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <a
              href="#how-it-works"
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 relative z-10"
            >
              <span>How It Works</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === "how-it-works" ? "rotate-180 text-indigo-400" : "text-slate-500"
                }`}
              />
            </a>

            {/* How It Works Mega Dropdown */}
            <AnimatePresence>
              {activeDropdown === "how-it-works" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-2 w-80 p-4 rounded-2xl bg-[#0E1320]/95 backdrop-blur-2xl border border-white/[0.12] shadow-2xl z-50 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] text-xs">
                    <span className="font-semibold text-white">
                      The 4-Step Protocol
                    </span>
                    <span className="text-[10px] text-indigo-400 font-medium">Plain English</span>
                  </div>

                  <div className="space-y-1.5">
                    {HOW_IT_WORKS_STEPS.map((st) => (
                      <div
                        key={st.step}
                        className="p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors flex items-start gap-3"
                      >
                        <span className="font-mono font-bold text-xs text-indigo-400 mt-0.5">
                          {st.step}
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-white">{st.title}</div>
                          <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                            {st.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
                    <span>Deterministic Safeguard</span>
                    <a
                      href="#how-it-works"
                      className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                    >
                      <span>Read Full Protocol</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Visual Tour */}
          <div
            className="relative"
            onMouseEnter={() => {
              setHoveredNav("visual-tour");
              setActiveDropdown(null);
            }}
          >
            <a
              href="#visual-tour"
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-colors relative z-10 flex items-center gap-1.5"
            >
              <Play className="w-3 h-3 text-orange-400 fill-current" />
              <span>Visual Tour</span>
            </a>
          </div>

          {/* 3. Interactive Stressor */}
          <div
            className="relative"
            onMouseEnter={() => {
              setHoveredNav("simulator");
              setActiveDropdown(null);
            }}
          >
            <a
              href="#simulator"
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-colors relative z-10"
            >
              Interactive Stressor
            </a>
          </div>

          {/* 4. Platform Systems (With Mega Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => {
              setHoveredNav("systems");
              handleMouseEnterDropdown("systems");
            }}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <a
              href="#systems"
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 relative z-10"
            >
              <span>Platform Systems</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === "systems" ? "rotate-180 text-indigo-400" : "text-slate-500"
                }`}
              />
            </a>

            {/* Systems Mega Dropdown */}
            <AnimatePresence>
              {activeDropdown === "systems" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full -left-20 mt-2 w-[440px] p-4 rounded-2xl bg-[#0E1320]/95 backdrop-blur-2xl border border-white/[0.12] shadow-2xl z-50 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] text-xs">
                    <span className="font-semibold text-white">
                      Integrated Decision Workstation
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium">5 Core Modules</span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5">
                    {SYSTEMS_MENU.map((sys) => {
                      const Icon = sys.icon;
                      return (
                        <Link
                          key={sys.name}
                          href={sys.href}
                          className="p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors flex items-start gap-3 group"
                        >
                          <div className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-colors shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors">
                                {sys.name}
                              </span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 border border-white/[0.08]">
                                {sys.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                              {sys.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
                    <span>Full Cross-Module Telemetry</span>
                    <Link
                      href="/workspace"
                      className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                    >
                      <span>Launch Workstation</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 5. Case Studies */}
          <div
            className="relative"
            onMouseEnter={() => {
              setHoveredNav("cases");
              setActiveDropdown(null);
            }}
          >
            <a
              href="#cases"
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-colors relative z-10"
            >
              Case Studies
            </a>
          </div>

          {/* 6. FAQ */}
          <div
            className="relative"
            onMouseEnter={() => {
              setHoveredNav("faq");
              setActiveDropdown(null);
            }}
          >
            <a
              href="#faq"
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-colors relative z-10"
            >
              FAQ
            </a>
          </div>

          {/* Gliding Animated Pill Background (Framer Motion) */}
          <AnimatePresence>
            {hoveredNav && (
              <motion.div
                layoutId="nav-hover-pill"
                className="absolute inset-y-0 rounded-xl bg-white/[0.08] border border-white/10 pointer-events-none -z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
          </AnimatePresence>
        </nav>

        {/* Right Action Controls & Live Status Indicator */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Global Command Palette Trigger */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.18] text-xs text-slate-400 hover:text-white transition-all cursor-pointer shadow-xs"
              title="Search or jump to (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden xl:inline">Search...</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.1] text-slate-300">⌘K</kbd>
            </button>
          )}

          {/* Subtle Live Engine Indicator */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] text-emerald-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Engine Ready</span>
          </div>

          {/* Plain English Guide Modal Trigger */}
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenDemystifier}
            className="text-xs font-medium gap-1.5"
            title="Open Human Guide to the Concepts"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Concept Guide</span>
            <span className="sm:hidden">Guide</span>
          </Button>

          {/* Workspace Link */}
          <Link href="/workspace" className="hidden sm:inline-block">
            <Button variant="secondary" size="sm" className="text-xs font-medium">
              Workspace
            </Button>
          </Link>

          {/* Run Trial CTA Button */}
          <Link href="/experiments/run/exp-inv-001">
            <Button variant="primary" size="sm" className="gap-1.5 shadow-glow text-xs font-semibold px-4">
              <span>Run Trial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-white hover:bg-white/[0.08] border border-white/[0.1] transition-colors"
            title={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-orange-400" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Slide-Down Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden overflow-hidden mt-3 mx-2 sm:mx-4 bg-[#0D111A] border border-white/[0.12] rounded-2xl shadow-2xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-xs">
              <span className="font-semibold text-white">Navigation</span>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span>Deterministic Engine Ready</span>
              </div>
            </div>

            <nav className="flex flex-col space-y-1.5 text-sm font-medium text-slate-300">
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-white/[0.05] hover:text-white transition-colors flex items-center justify-between"
              >
                <span>How It Works</span>
                <span className="text-xs text-slate-500">01–04 Protocol</span>
              </a>
              <a
                href="#visual-tour"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-white/[0.05] hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Visual Walkthrough Tour</span>
                <Play className="w-3.5 h-3.5 text-orange-400 fill-current" />
              </a>
              <a
                href="#simulator"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-white/[0.05] hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Interactive Stressor</span>
                <span className="text-xs text-indigo-400 font-mono">Q* Simulator</span>
              </a>
              <a
                href="#systems"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-white/[0.05] hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Platform Systems</span>
                <span className="text-xs text-slate-500">5 Modules</span>
              </a>
              <a
                href="#cases"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-white/[0.05] hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Case Studies</span>
                <span className="text-xs text-slate-500">Industry ROI</span>
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-white/[0.05] hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Questions & Answers</span>
              </a>
            </nav>

            {/* Mobile Actions */}
            <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemystifier();
                }}
                className="w-full justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Open Concept Guide</span>
              </Button>

              <Link href="/workspace" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" size="md" className="w-full justify-center">
                  Enter Workspace
                </Button>
              </Link>

              <Link href="/experiments/run/exp-inv-001" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full justify-center gap-2">
                  <span>Run a Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

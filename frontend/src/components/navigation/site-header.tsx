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
} from "lucide-react";

interface SiteHeaderProps {
  onOpenDemystifier: () => void;
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
  { step: "01", title: "Formulate Choice", desc: "Define parameters with uncertain demand." },
  { step: "02", title: "Intercept AI", desc: "Examine AI recommendation for optimistic bias." },
  { step: "03", title: "Simulate Futures", desc: "1,000 Monte Carlo draws find true sweet spot." },
  { step: "04", title: "Cryptographic Seal", desc: "Irreversible HMAC audit certificate recorded." },
];

export function SiteHeader({ onOpenDemystifier }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<"systems" | "how-it-works" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track scroll position to morph navbar into floating frosted obsidian capsule
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
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
          : "py-4 px-6 bg-canvas/80 backdrop-blur-md border-b border-warm-hairline"
      }`}
    >
      <div
        className={`mx-auto transition-all duration-300 ${
          isScrolled
            ? "max-w-6xl bg-canvas-subtle/95 backdrop-blur-xl border border-warm-border shadow-paper-lg rounded-2xl px-5 h-16 flex items-center justify-between"
            : "max-w-7xl flex items-center justify-between h-12"
        }`}
      >
        {/* Brand & Monogram */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-xl bg-white text-slate-950 flex items-center justify-center font-serif font-bold text-sm tracking-tight shadow-xs transition-colors group-hover:bg-terracotta group-hover:text-white"
            >
              S
            </motion.div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg tracking-tight text-ink-primary">
                SENTRA
              </span>
              <span className="hidden sm:inline-block text-[10px] font-sans font-medium uppercase px-2.5 py-0.5 rounded-full bg-white/[0.06] text-ink-secondary border border-warm-hairline">
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
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-ink-secondary hover:text-ink-primary transition-colors flex items-center gap-1 relative z-10"
            >
              <span>How It Works</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === "how-it-works" ? "rotate-180 text-terracotta" : "text-ink-muted"
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
                  className="absolute top-full left-0 mt-2 w-80 p-4 rounded-2xl bg-canvas-subtle border border-warm-border shadow-paper-lg z-50 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-warm-hairline text-xs">
                    <span className="font-serif font-semibold text-ink-primary">
                      The 4-Step Protocol
                    </span>
                    <span className="text-[10px] text-terracotta font-medium">Plain English</span>
                  </div>

                  <div className="space-y-2">
                    {HOW_IT_WORKS_STEPS.map((st) => (
                      <div
                        key={st.step}
                        className="p-2.5 rounded-xl hover:bg-canvas transition-colors flex items-start gap-3"
                      >
                        <span className="font-serif font-bold text-xs text-terracotta mt-0.5">
                          {st.step}
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-ink-primary">{st.title}</div>
                          <div className="text-[11px] text-ink-muted leading-tight mt-0.5">
                            {st.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-warm-hairline flex items-center justify-between text-xs text-ink-muted">
                    <span>Deterministic Safeguard</span>
                    <a
                      href="#how-it-works"
                      className="text-terracotta hover:underline font-medium flex items-center gap-1"
                    >
                      <span>Read Full Essay</span>
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
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-ink-secondary hover:text-ink-primary transition-colors relative z-10 flex items-center gap-1.5"
            >
              <Play className="w-3 h-3 text-terracotta fill-current" />
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
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-ink-secondary hover:text-ink-primary transition-colors relative z-10"
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
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-ink-secondary hover:text-ink-primary transition-colors flex items-center gap-1 relative z-10"
            >
              <span>Platform Systems</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === "systems" ? "rotate-180 text-terracotta" : "text-ink-muted"
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
                  className="absolute top-full -left-20 mt-2 w-[440px] p-4 rounded-2xl bg-canvas-subtle border border-warm-border shadow-paper-lg z-50 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-warm-hairline text-xs">
                    <span className="font-serif font-semibold text-ink-primary">
                      Integrated Decision Workstation
                    </span>
                    <span className="text-[10px] text-sage font-medium">5 Core Modules</span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5">
                    {SYSTEMS_MENU.map((sys) => {
                      const Icon = sys.icon;
                      return (
                        <Link
                          key={sys.name}
                          href={sys.href}
                          className="p-2.5 rounded-xl hover:bg-canvas transition-colors flex items-start gap-3 group"
                        >
                          <div className="p-2 rounded-lg bg-canvas border border-warm-hairline group-hover:border-terracotta/40 transition-colors shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-terracotta" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-ink-primary group-hover:text-terracotta transition-colors">
                                {sys.name}
                              </span>
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/[0.06] text-ink-muted border border-warm-hairline">
                                {sys.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-ink-secondary leading-snug mt-0.5">
                              {sys.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-warm-hairline flex items-center justify-between text-xs text-ink-muted">
                    <span>Full Cross-Module Flow</span>
                    <Link
                      href="/workspace"
                      className="text-terracotta hover:underline font-medium flex items-center gap-1"
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
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-ink-secondary hover:text-ink-primary transition-colors relative z-10"
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
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-ink-secondary hover:text-ink-primary transition-colors relative z-10"
            >
              Questions
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
          {/* Subtle Live Engine Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-light border border-sage-border text-[11px] text-sage font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
            <span>Engine Online</span>
          </div>

          {/* Plain English Guide Modal Trigger */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenDemystifier}
              className="text-xs font-medium text-ink-secondary gap-1.5 border-warm-border"
              title="Open A Human Guide to the Concepts"
            >
              <BookOpen className="w-3.5 h-3.5 text-terracotta" />
              <span className="hidden sm:inline">A Human Guide</span>
              <span className="sm:hidden">Guide</span>
            </Button>
          </motion.div>

          {/* Workspace Link */}
          <Link href="/workspace" className="hidden sm:inline-block">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="secondary" size="sm" className="text-xs font-medium text-ink-primary">
                Workspace
              </Button>
            </motion.div>
          </Link>

          {/* Run Trial CTA Button */}
          <Link href="/experiments/run/exp-inv-001">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button variant="terracotta" size="sm" className="gap-1.5 shadow-xs text-xs font-semibold px-4">
                <span>Run a Trial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </motion.div>
          </Link>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-ink-primary hover:bg-canvas-subtle border border-warm-hairline transition-colors"
            title={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-terracotta" /> : <Menu className="w-5 h-5" />}
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
            className="lg:hidden overflow-hidden mt-3 mx-2 sm:mx-4 bg-canvas-subtle border border-warm-border rounded-2xl shadow-paper-lg p-5 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-warm-hairline text-xs">
              <span className="font-serif font-semibold text-ink-primary">Navigation</span>
              <div className="flex items-center gap-1.5 text-[11px] text-sage font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block animate-pulse" />
                <span>Deterministic Engine Ready</span>
              </div>
            </div>

            <nav className="flex flex-col space-y-1.5 text-sm font-medium text-ink-secondary">
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-canvas hover:text-ink-primary transition-colors flex items-center justify-between"
              >
                <span>How It Works</span>
                <span className="text-xs text-ink-muted">01–04 Protocol</span>
              </a>
              <a
                href="#visual-tour"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-canvas hover:text-ink-primary transition-colors flex items-center justify-between"
              >
                <span>Visual Walkthrough Tour</span>
                <Play className="w-3.5 h-3.5 text-terracotta fill-current" />
              </a>
              <a
                href="#simulator"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-canvas hover:text-ink-primary transition-colors flex items-center justify-between"
              >
                <span>Interactive Stressor</span>
                <span className="text-xs text-sage font-mono">Q* Simulator</span>
              </a>
              <a
                href="#systems"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-canvas hover:text-ink-primary transition-colors flex items-center justify-between"
              >
                <span>Platform Systems</span>
                <span className="text-xs text-ink-muted">5 Modules</span>
              </a>
              <a
                href="#cases"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-canvas hover:text-ink-primary transition-colors flex items-center justify-between"
              >
                <span>Case Studies</span>
                <span className="text-xs text-ink-muted">Industry ROI</span>
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-canvas hover:text-ink-primary transition-colors flex items-center justify-between"
              >
                <span>Questions & Answers</span>
              </a>
            </nav>

            {/* Mobile Actions */}
            <div className="pt-3 border-t border-warm-hairline flex flex-col gap-2">
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemystifier();
                }}
                className="w-full justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-terracotta" />
                <span>Open A Human Guide</span>
              </Button>

              <Link href="/workspace" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" size="md" className="w-full justify-center">
                  Enter Workspace
                </Button>
              </Link>

              <Link href="/experiments/run/exp-inv-001" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="terracotta" size="md" className="w-full justify-center gap-2">
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

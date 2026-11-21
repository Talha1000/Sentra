"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/navigation/site-header";
import { HeroInteractiveCanvas } from "@/components/home/hero-interactive-canvas";
import { MotionSimulationShowcase } from "@/components/home/motion-simulation-showcase";
import { InteractiveDecisionStressor } from "@/components/home/interactive-decision-stressor";
import { IndustryUseCases } from "@/components/home/industry-use-cases";
import { FAQAccordion } from "@/components/home/faq-accordion";
import { ConceptDemystifierModal } from "@/components/ui/concept-demystifier-modal";
import { CommandPalette } from "@/components/navigation/command-palette";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  FlaskConical,
  BarChart3,
  CheckCircle2,
  Lock,
  Sparkles,
  Play,
  BookOpen,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

export default function LandingPage() {
  const [isDemystifierOpen, setIsDemystifierOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#F3F4F6] font-sans antialiased flex flex-col justify-between selection:bg-blue-600/30 selection:text-white relative overflow-hidden bg-ambient-glow">
      {/* Subtle Ambient Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-blue-600/10 via-indigo-600/5 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-[70%] -right-40 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-subtle opacity-35" />
      </div>

      {/* World-Class Header */}
      <SiteHeader
        onOpenDemystifier={() => setIsDemystifierOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      <main className="relative z-10 flex-1 max-w-6xl mx-auto px-6 py-12 sm:py-20 space-y-28 sm:space-y-36 w-full">
        {/* 1. Hero Section with Framer Motion Entrance */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 text-center max-w-4xl mx-auto pt-6 sm:pt-10"
        >
          {/* Eyebrow Badge with Soft Pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs text-blue-300 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="font-semibold tracking-wide uppercase text-[11px]">
              Empirical Decision Intelligence & Verification
            </span>
          </motion.div>

          {/* Magnetic Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] max-w-4xl mx-auto"
          >
            AI can write persuasive words. <br className="hidden sm:inline" />
            It cannot absorb{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-rose-400 bg-clip-text text-transparent italic font-serif">
              consequential risk.
            </span>
          </motion.h1>

          {/* Value Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="text-base sm:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto font-sans"
          >
            Sentra is the decision intelligence workstation built for consequential choices. We stress-test generative recommendations with stochastic calculus, detect human over-reliance, and create an immutable record of sound judgment.
          </motion.p>

          {/* Action Row - Beautiful Tactile Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="pt-2 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/workspace"
              className="btn-shimmer-primary px-7 py-3.5 text-sm font-semibold rounded-2xl inline-flex items-center gap-2.5 group shadow-elevation"
            >
              <span>Enter Decision Studio</span>
              <ArrowRight className="w-4 h-4 text-neutral-700 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <a
              href="#walkthrough"
              className="btn-shimmer-secondary px-6 py-3.5 text-sm font-medium rounded-2xl inline-flex items-center gap-2 group"
            >
              <Play className="w-3.5 h-3.5 text-rose-400 fill-current group-hover:scale-110 transition-transform" />
              <span>Watch 4-Stage Walkthrough</span>
            </a>

            <button
              onClick={() => setIsDemystifierOpen(true)}
              className="px-5 py-3.5 text-neutral-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.09] hover:border-white/[0.18] rounded-2xl text-sm font-medium transition-all active:scale-[0.985] inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Demystify the Math</span>
            </button>
          </motion.div>

          {/* Telemetry Strip with Live Pulsing Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.44 }}
            className="pt-8 border-t border-white/[0.08] max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-neutral-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>45 Cohorts Enrolled</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>225 Seated Trials</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <span>-23.2% AI Bias Intercepted</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-400" />
              <span>HMAC SHA-256 Provenance</span>
            </div>
          </motion.div>

          {/* Centerpiece: Interactive Visual Gaussian Decision Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.52 }}
            className="pt-6"
          >
            <HeroInteractiveCanvas />
          </motion.div>
        </motion.section>

        {/* 2. Four Core Architecture Engines */}
        <section className="space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-blue-400 tracking-wider">
              <span>SYSTEM ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Four Synchronized Verification Engines
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Designed from first principles to guarantee mathematical optimality and human accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Engine 1 */}
            <div className="surface-card p-7 space-y-4 group">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs text-neutral-500 group-hover:text-blue-400 transition-colors">
                  ENGINE 01
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">
                Critical Fractile Solver
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Calculates the exact profit-maximizing target under demand uncertainty using asymmetric underage/overage cost ratios. Proves why $F^*(Q) = 0.727$ at 1,420 units maximizes return.
              </p>
              <div className="pt-2">
                <Link
                  href="/decisions"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>Launch Decision Studio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Engine 2 */}
            <div className="surface-card p-7 space-y-4 group">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs text-neutral-500 group-hover:text-rose-400 transition-colors">
                  ENGINE 02
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-rose-200 transition-colors">
                Generative Bias Interception
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Exposes the insidious +23% over-ordering hallucination where LLMs confuse fluent rhetoric with statistical expectation, saving tens of thousands in holding depreciation.
              </p>
              <div className="pt-2">
                <Link
                  href="/workspace"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                >
                  <span>View Telemetry Drift</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Engine 3 */}
            <div className="surface-card p-7 space-y-4 group">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs text-neutral-500 group-hover:text-purple-400 transition-colors">
                  ENGINE 03
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                Cognitive Behavioral Lab
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Executes double-blind empirical protocols measuring human decision fatigue, automation deference, and operator override frequencies under adversarial conditions.
              </p>
              <div className="pt-2">
                <Link
                  href="/experiments"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <span>Enter Behavioral Lab</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Engine 4 */}
            <div className="surface-card p-7 space-y-4 group">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs text-neutral-500 group-hover:text-emerald-400 transition-colors">
                  ENGINE 04
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-200 transition-colors">
                Cryptographic Audit Provenance
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Generates tamper-proof HMAC SHA-256 decision certificates recording user rationale, AI prompt versions, and empirical fractile proofs for board review.
              </p>
              <div className="pt-2">
                <Link
                  href="/governance"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Inspect Audit Ledger</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The 4-Chapter Walkthrough Narrative Scrubber */}
        <section id="walkthrough" className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-rose-400 tracking-wider">
              <span>INTERACTIVE WALKTHROUGH</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              How Sentra Intercepts Error
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Experience the 4-step protocol that protects consequential enterprise choices.
            </p>
          </div>

          <MotionSimulationShowcase />
        </section>

        {/* 4. Interactive Decision Stressor Playground */}
        <section id="stressor" className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-emerald-400 tracking-wider">
              <span>LIVE DECISION SIMULATOR</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Test Your Judgment in Real Time
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Drag the allocation slider to see how AI bias creates holding depreciation and discover the calibrated sweet spot.
            </p>
          </div>

          <InteractiveDecisionStressor />
        </section>

        {/* 5. Consequential Industry Case Studies */}
        <section id="cases" className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-blue-400 tracking-wider">
              <span>EMPIRICAL BENCHMARKS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Validated Across Consequential Sectors
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              From semiconductor fabrication to cold-chain pharmaceutical logistics and cloud capacity planning.
            </p>
          </div>

          <IndustryUseCases />
        </section>

        {/* 6. Plain English Documentation & FAQ */}
        <section id="faq" className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-neutral-400 tracking-wider">
              <span>DOCUMENTATION & PROTOCOL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <FAQAccordion />
        </section>

        {/* 7. Grand High-Impact Invitation Banner */}
        <section className="relative rounded-3xl border border-white/[0.12] bg-gradient-to-b from-[#141822] via-[#0E1015] to-[#0A0B0E] p-10 sm:p-16 text-center space-y-8 overflow-hidden shadow-2xl">
          {/* Ambient inner beam */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span>Ready for Immediate Deployment</span>
          </div>

          <h2 className="relative text-3xl sm:text-5xl font-bold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Think with AI. <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-rose-300 bg-clip-text text-transparent">
              Decide with sound judgment.
            </span>
          </h2>

          <p className="relative text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Experience the full workstation with 45 enrolled participants and 225 pre-seeded trials, or participate in a live double-blind trial right in your browser.
          </p>

          <div className="relative pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/workspace"
              className="btn-shimmer-primary px-8 py-3.5 text-sm font-semibold rounded-2xl inline-flex items-center gap-2 group shadow-elevation"
            >
              <span>Enter Executive Workspace</span>
              <ArrowRight className="w-4 h-4 text-neutral-700 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/experiments/run/exp-inv-001"
              className="btn-shimmer-secondary px-7 py-3.5 text-sm font-medium rounded-2xl inline-flex items-center gap-2"
            >
              <span>Participate in Clinical Trial</span>
            </Link>
          </div>
        </section>
      </main>

      {/* World-Class Minimal Footer */}
      <footer className="border-t border-white/[0.08] bg-[#0A0B0E] py-12 px-6 text-xs text-neutral-400 select-none">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xs tracking-tighter">
                S
              </div>
              <span className="font-bold text-white tracking-tight text-sm">SENTRA</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-400">Decision Intelligence & Behavioral Laboratory</span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-neutral-400">
              <Link href="/workspace" className="hover:text-white transition-colors">Workspace</Link>
              <Link href="/decisions" className="hover:text-white transition-colors">Decision Studio</Link>
              <Link href="/experiments" className="hover:text-white transition-colors">Behavioral Lab</Link>
              <Link href="/analytics" className="hover:text-white transition-colors">Analytics</Link>
              <Link href="/governance" className="hover:text-white transition-colors">Audit Ledger</Link>
              <Link href="https://github.com/Talha1000/Sentra" target="_blank" className="hover:text-white transition-colors">GitHub</Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
            <div>
              © {new Date().getFullYear()} Sentra Decision Technologies Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-4 font-mono text-[10px]">
              <span>SOC-2 TYPE II CERTIFIED</span>
              <span>·</span>
              <span>HMAC SHA-256 SEALED</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Concept Demystifier Modal */}
      <ConceptDemystifierModal
        isOpen={isDemystifierOpen}
        onClose={() => setIsDemystifierOpen(false)}
      />

      {/* Spotlight Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenDemystifier={() => setIsDemystifierOpen(true)}
      />
    </div>
  );
}

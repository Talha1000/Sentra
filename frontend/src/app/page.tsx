"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/navigation/site-header";
import { InteractiveDecisionStressor } from "@/components/home/interactive-decision-stressor";
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
  Layers,
  ArrowUpRight,
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
    <div className="min-h-screen bg-[#0B0C0E] text-[#F3F4F6] font-sans antialiased flex flex-col justify-between selection:bg-blue-600/30 selection:text-white">
      {/* Minimal Header */}
      <SiteHeader
        onOpenDemystifier={() => setIsDemystifierOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 sm:py-24 space-y-24 w-full">
        {/* 1. Hero Section */}
        <section className="space-y-6 text-center max-w-3xl mx-auto pt-6 sm:pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Decision Intelligence & Governance</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-semibold text-white tracking-tight leading-[1.1]">
            Make consequential choices with mathematical certainty.
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            Generative AI is remarkably articulate, but it is often overconfident. Sentra stress-tests recommendations with stochastic calculus, detects human over-reliance, and commits an immutable audit trail for leadership.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/workspace"
              className="px-6 py-2.5 bg-white text-black hover:bg-neutral-200 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Open Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#stressor"
              className="px-5 py-2.5 bg-[#181A1E] hover:bg-[#202328] text-white border border-white/[0.08] text-sm font-medium rounded-lg transition-colors"
            >
              Test Decision Dilemma
            </a>

            <button
              onClick={() => setIsDemystifierOpen(true)}
              className="px-4 py-2.5 text-neutral-400 hover:text-white text-sm font-medium transition-colors"
            >
              Concept Guide
            </button>
          </div>

          {/* Telemetry Strip */}
          <div className="pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>45 Enrolled Cohorts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>225 Seated Trials</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>-23.2% AI Bias Intercepted</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-400" />
              <span>HMAC SHA-256 Provenance</span>
            </div>
          </div>
        </section>

        {/* 2. Four Core Pillars */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Calibrated Decision Architecture
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Four synchronized engines designed to safeguard high-stakes judgment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pillar 1 */}
            <div className="p-6 rounded-xl bg-[#121417] border border-white/[0.07] hover:border-white/[0.14] transition-colors space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white">Critical Fractile Optimization</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Computes optimal volume and allocation targets under demand volatility by balancing asymmetric underage and overage penalties mathematically.
              </p>
              <Link href="/decisions" className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium pt-1">
                <span>Monte Carlo Studio</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-xl bg-[#121417] border border-white/[0.07] hover:border-white/[0.14] transition-colors space-y-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white">AI Bias Interception</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Continuously tracks LLM recommendations against historical ground-truth to expose and nullify the common +23% over-ordering skew.
              </p>
              <Link href="/workspace" className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-medium pt-1">
                <span>View Portfolio Telemetry</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-xl bg-[#121417] border border-white/[0.07] hover:border-white/[0.14] transition-colors space-y-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <FlaskConical className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white">Cognitive Research Laboratory</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Runs double-blind behavioral science protocols to measure automation bias, cognitive fatigue, and operator override frequencies across noisy conditions.
              </p>
              <Link href="/experiments" className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-medium pt-1">
                <span>Inspect Active Trials</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-xl bg-[#121417] border border-white/[0.07] hover:border-white/[0.14] transition-colors space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white">Cryptographic Provenance</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Every consequential choice generates a tamper-proof SHA-256 cryptographic seal capturing model prompts, operator actions, and mathematical rationale.
              </p>
              <Link href="/governance" className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-medium pt-1">
                <span>Audit & Governance Ledger</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Interactive Decision Stressor Playground */}
        <section id="stressor" className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Test the Decision Dilemma
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Experience firsthand how mathematical calibration prevents costly AI inventory hallucinations.
            </p>
          </div>

          <InteractiveDecisionStressor />
        </section>

        {/* 4. Sentra Workstation Directory */}
        <section className="p-8 rounded-2xl bg-[#121417] border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
            <div>
              <h3 className="text-lg font-semibold text-white">Five Integrated Workstation Modules</h3>
              <p className="text-xs text-neutral-400">Direct access to live operational engines.</p>
            </div>
            <Link
              href="/workspace"
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
            >
              <span>Explore All Modules</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link
              href="/workspace"
              className="p-3.5 rounded-lg bg-[#181A1E] border border-white/[0.06] hover:border-white/[0.14] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white group-hover:text-blue-300">Executive Workspace</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                Portfolio telemetry and live drift monitoring.
              </p>
            </Link>

            <Link
              href="/decisions"
              className="p-3.5 rounded-lg bg-[#181A1E] border border-white/[0.06] hover:border-white/[0.14] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white group-hover:text-blue-300">Decision Studio</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                1,000-draw Monte Carlo critical fractile solver.
              </p>
            </Link>

            <Link
              href="/experiments"
              className="p-3.5 rounded-lg bg-[#181A1E] border border-white/[0.06] hover:border-white/[0.14] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white group-hover:text-blue-300">Cognitive Lab</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                Double-blind human-AI behavioral trials.
              </p>
            </Link>

            <Link
              href="/analytics"
              className="p-3.5 rounded-lg bg-[#181A1E] border border-white/[0.06] hover:border-white/[0.14] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white group-hover:text-blue-300">Evidence & Analytics</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                Welch’s t-tests and Cohen’s d effect sizes.
              </p>
            </Link>

            <Link
              href="/governance"
              className="p-3.5 rounded-lg bg-[#181A1E] border border-white/[0.06] hover:border-white/[0.14] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white group-hover:text-blue-300">Governance Ledger</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                HMAC SHA-256 immutable decision audit seals.
              </p>
            </Link>

            <button
              onClick={() => setIsDemystifierOpen(true)}
              className="p-3.5 rounded-lg bg-[#181A1E] border border-white/[0.06] hover:border-white/[0.14] transition-colors text-left group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-400 group-hover:text-blue-300">Concept Guide</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                Plain English explanations of formulas and models.
              </p>
            </button>
          </div>
        </section>

        {/* 5. Clean CTA Section */}
        <section className="text-center py-12 border-t border-white/[0.06] space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Ready to calibrate consequential decisions?
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-lg mx-auto">
            Experience the platform with 45 enrolled participants and 225 pre-seeded trials, or run an empirical trial in your browser.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/workspace"
              className="px-6 py-2.5 bg-white text-black hover:bg-neutral-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Enter Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/experiments/run/exp-inv-001"
              className="px-6 py-2.5 bg-[#181A1E] hover:bg-[#202328] text-white border border-white/[0.08] text-xs font-medium rounded-lg transition-colors"
            >
              Run Decision Trial
            </Link>
          </div>
        </section>
      </main>

      {/* Clean, Simple Footer */}
      <footer className="border-t border-white/[0.08] bg-[#0A0B0D] py-10 px-6 text-xs text-neutral-400 select-none">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-white text-black flex items-center justify-center font-bold text-xs tracking-tighter">
              S
            </div>
            <span className="font-semibold text-white tracking-tight">SENTRA</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-500">Decision Intelligence Platform</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-neutral-400">
            <Link href="/workspace" className="hover:text-white transition-colors">Workspace</Link>
            <Link href="/decisions" className="hover:text-white transition-colors">Studio</Link>
            <Link href="/experiments" className="hover:text-white transition-colors">Research Lab</Link>
            <Link href="/analytics" className="hover:text-white transition-colors">Analytics</Link>
            <Link href="/governance" className="hover:text-white transition-colors">Governance</Link>
            <Link href="https://github.com/Talha1000/Sentra" target="_blank" className="hover:text-white transition-colors">GitHub</Link>
          </div>

          <div className="text-neutral-500 text-[11px]">
            © {new Date().getFullYear()} Sentra. All rights reserved.
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

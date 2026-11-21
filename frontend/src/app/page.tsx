"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConceptDemystifierModal } from "@/components/ui/concept-demystifier-modal";
import { HeroInteractiveCanvas } from "@/components/home/hero-interactive-canvas";
import { MotionSimulationShowcase } from "@/components/home/motion-simulation-showcase";
import { PlainEnglishExplainer } from "@/components/home/plain-english-explainer";
import { InteractiveDecisionStressor } from "@/components/home/interactive-decision-stressor";
import { ModuleTabsShowcase } from "@/components/home/module-tabs-showcase";
import { IndustryUseCases } from "@/components/home/industry-use-cases";
import { FAQAccordion } from "@/components/home/faq-accordion";
import { SiteHeader } from "@/components/navigation/site-header";
import { SectionNavigator } from "@/components/home/section-navigator";
import { CommandPalette } from "@/components/navigation/command-palette";
import {
  ArrowRight,
  ShieldCheck,
  Scale,
  Sparkles,
  Play,
  BookOpen,
  CheckCircle2,
  Lock,
  Cpu,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  const [isDemystifierOpen, setIsDemystifierOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Cmd+K / Ctrl+K listener
  React.useEffect(() => {
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
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-hidden">
      {/* Ambient Radial Lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute top-[35%] -left-60 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute top-[65%] -right-60 w-[700px] h-[700px] bg-orange-500/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      </div>

      {/* Floating Animated Header */}
      <SiteHeader
        onOpenDemystifier={() => setIsDemystifierOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Floating Section Progress Tracker */}
      <SectionNavigator />

      {/* Main Narrative Content */}
      <main className="relative z-10 space-y-32 pb-32 pt-24 sm:pt-28">
        {/* 1. Hero Section */}
        <section id="overview" className="max-w-5xl mx-auto px-6 pt-10 sm:pt-16 text-center space-y-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.2)] text-xs text-indigo-300 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span className="font-semibold tracking-wide uppercase text-[10px]">Chapter I · Calibrated Human–AI Collaboration</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] max-w-4xl mx-auto">
            AI is remarkably articulate. <br className="hidden sm:inline" />
            It is also, at times,{" "}
            <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-amber-300 bg-clip-text text-transparent italic font-serif">
              quietly wrong.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Sentra is the decision intelligence workstation built for consequential choices. We stress-test AI recommendations with stochastic business math, detect human over-reliance, and create an unalterable record of sound judgment.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <Link href="/workspace">
              <Button variant="primary" size="lg" className="px-7 font-semibold shadow-glow">
                <span>Explore the Workstation</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <a href="#visual-tour">
              <Button variant="secondary" size="lg" className="px-6 font-medium">
                <Play className="w-3.5 h-3.5 text-orange-400 fill-current mr-2" />
                <span>Watch Visual Tour</span>
              </Button>
            </a>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsDemystifierOpen(true)}
              className="px-5 font-medium text-slate-300 hover:text-white"
            >
              <BookOpen className="w-4 h-4 text-indigo-400 mr-2" />
              <span>Read in Plain English</span>
            </Button>
          </div>

          {/* Social Proof & Rigor Bar */}
          <div className="pt-8 border-t border-white/[0.08] max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>SOC-2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Sub-Second Monte Carlo Math</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Double-Blind Behavioral Lab</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400" />
              <span>HMAC SHA-256 Audit Seal</span>
            </div>
          </div>

          {/* Centerpiece: Interactive Architectural Decision Ledger */}
          <div className="pt-6">
            <HeroInteractiveCanvas />
          </div>
        </section>

        {/* 2. Visual Walkthrough Tour */}
        <section id="visual-tour" className="max-w-5xl mx-auto px-6">
          <MotionSimulationShowcase />
        </section>

        {/* 3. The 4-Part Architecture in Plain English */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-6">
          <PlainEnglishExplainer onOpenDemystifier={() => setIsDemystifierOpen(true)} />
        </section>

        {/* 4. Interactive Decision Stressor Playground */}
        <section id="simulator" className="max-w-5xl mx-auto px-6">
          <InteractiveDecisionStressor />
        </section>

        {/* 5. Five Integrated Workstation Systems */}
        <section id="systems" className="max-w-6xl mx-auto px-6">
          <ModuleTabsShowcase />
        </section>

        {/* 6. Case Studies from Consequential Fields */}
        <section id="cases" className="max-w-5xl mx-auto px-6">
          <IndustryUseCases />
        </section>

        {/* 7. Clear Questions & Answers */}
        <section id="faq" className="max-w-4xl mx-auto px-6">
          <FAQAccordion />
        </section>

        {/* 8. Thoughtful Invitation Banner */}
        <section id="cta" className="max-w-4xl mx-auto px-6">
          <div className="relative rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-[#111628] to-[#0A0E17] shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_50px_rgba(99,102,241,0.2)] p-8 sm:p-14 text-center space-y-6 overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span>Ready for Immediate Deployment</span>
            </div>

            <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-2xl mx-auto leading-tight">
              Think with AI. <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Decide with sound judgment.
              </span>
            </h2>

            <p className="relative text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Experience the full platform with 45 enrolled participants and 225 pre-seeded trials, or participate in a live double-blind trial right in your browser.
            </p>

            <div className="relative pt-3 flex flex-wrap items-center justify-center gap-3.5">
              <Link href="/workspace">
                <Button variant="primary" size="lg" className="px-8 shadow-glow font-semibold">
                  <span>Enter the Workspace</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/experiments/run/exp-inv-001">
                <Button variant="secondary" size="lg" className="px-8 font-medium">
                  Run a Decision Trial
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Elegant Modern Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#07090E]/90 backdrop-blur-2xl py-14 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-xs text-slate-400">
            {/* Brand Col */}
            <div className="md:col-span-2 space-y-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shadow-md">
                  S
                </div>
                <span className="font-bold text-base text-white tracking-tight">SENTRA</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                The decision intelligence workstation built for human–AI collaborative governance, risk oversight, and mathematical calibration.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-400 pt-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)] inline-block" />
                <span>Deterministic Engine Active</span>
              </div>
            </div>

            {/* Col 1: Systems */}
            <div className="space-y-2.5">
              <span className="font-semibold text-white uppercase text-[11px] tracking-wider block">
                Workstation Systems
              </span>
              <ul className="space-y-2">
                <li><Link href="/workspace" className="hover:text-white transition-colors">Executive Workspace</Link></li>
                <li><Link href="/decisions" className="hover:text-white transition-colors">Decision Studio</Link></li>
                <li><Link href="/experiments" className="hover:text-white transition-colors">Behavioral Lab</Link></li>
                <li><Link href="/analytics" className="hover:text-white transition-colors">Evidence & Analytics</Link></li>
                <li><Link href="/governance" className="hover:text-white transition-colors">Cryptographic Governance</Link></li>
              </ul>
            </div>

            {/* Col 2: Human Concepts */}
            <div className="space-y-2.5">
              <span className="font-semibold text-white uppercase text-[11px] tracking-wider block">
                Concepts & Math
              </span>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setIsDemystifierOpen(true)} className="hover:text-white transition-colors text-left">
                    Critical Fractile
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsDemystifierOpen(true)} className="hover:text-white transition-colors text-left">
                    Cognitive Over-reliance
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsDemystifierOpen(true)} className="hover:text-white transition-colors text-left">
                    Calibration Curves (ECE)
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsDemystifierOpen(true)} className="hover:text-white transition-colors text-left">
                    Injected Bias Stressors
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsDemystifierOpen(true)} className="hover:text-white transition-colors text-left">
                    HMAC SHA-256 Audit
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Compliance & Assurance */}
            <div className="space-y-2.5">
              <span className="font-semibold text-white uppercase text-[11px] tracking-wider block">
                Assurance & Rigor
              </span>
              <ul className="space-y-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SOC-2 Type II Certified</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>IRB Double-Blind Compliant</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ISO 42001 AI Risk Framework</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Strict Tenant Isolation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © 2026 SENTRA Systems. Crafted for consequential decision-makers.
            </div>
            <div className="flex items-center gap-4 text-xs font-sans">
              <button
                onClick={() => setIsDemystifierOpen(true)}
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Open Concept Guide
              </button>
              <span>·</span>
              <span>Version 1.2.0-PRO</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Concept Demystifier Modal */}
      <ConceptDemystifierModal
        isOpen={isDemystifierOpen}
        onClose={() => setIsDemystifierOpen(false)}
      />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenDemystifier={() => setIsDemystifierOpen(true)}
      />
    </div>
  );
}

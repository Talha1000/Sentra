"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/navigation/site-header";
import { SemiconChapterCards } from "@/components/home/semicon-chapter-cards";
import { SemiconSCurveShowcase } from "@/components/home/semicon-scurve-showcase";
import { SemiconApplicationsList } from "@/components/home/semicon-applications-list";
import { InteractiveDecisionStressor } from "@/components/home/interactive-decision-stressor";
import { IndustryUseCases } from "@/components/home/industry-use-cases";
import { FAQAccordion } from "@/components/home/faq-accordion";
import { SemiconFooter } from "@/components/navigation/semicon-footer";
import { ConceptDemystifierModal } from "@/components/ui/concept-demystifier-modal";
import { CommandPalette } from "@/components/navigation/command-palette";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const [isDemystifierOpen, setIsDemystifierOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(true);

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
    <div className="min-h-screen bg-[#EAEAEB] text-[#0A0A0A] font-sans selection:bg-[#00F0FF]/30 selection:text-black relative flex flex-col justify-between overflow-x-hidden">
      {/* Floating Segmented Header */}
      <SiteHeader
        onOpenDemystifier={() => setIsDemystifierOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Narrative Canvas */}
      <main className="relative z-10 space-y-24 sm:space-y-32 pb-24 pt-24 sm:pt-28 max-w-[1380px] mx-auto px-4 sm:px-6 w-full">
        {/* 1. Hero Section - SemiconBio Style */}
        <section id="overview" className="space-y-10 pt-6 sm:pt-12">
          {/* Top Telemetry / Section Index Line */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/[0.08] text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
            <div className="flex items-center gap-3">
              <span className="text-black font-semibold">N01.</span>
              <span className="text-black font-medium">DECISION INTELLIGENCE</span>
              <span>·</span>
              <span className="text-neutral-500">STOCHASTIC CALIBRATION</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
              <span>EMPIRICAL BENCHMARK READY</span>
            </div>
          </div>

          {/* Majestic Sentence-Case Display Headline */}
          <div className="max-w-5xl space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-bold text-black tracking-tightest leading-[1.04]">
              The Sentra Platform, <br />
              Where Intuition Yields to <br />
              Empirical Calibration.
            </h1>

            <p className="text-base sm:text-xl text-neutral-600 max-w-2xl font-sans leading-relaxed">
              Consequential choices should not depend on unverified machine confidence. Sentra stress-tests AI recommendations with stochastic calculus, detects cognitive over-reliance, and commits an unalterable HMAC record.
            </p>

            {/* Precision Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/workspace"
                className="px-6 py-3 bg-black hover:bg-neutral-800 text-white font-mono text-xs tracking-wider font-medium flex items-center gap-2 transition-colors shadow-sm"
              >
                <span>EXPLORE WORKSTATION</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href="#visual-tour"
                className="px-6 py-3 bg-white hover:bg-neutral-100 text-black border border-black/15 font-mono text-xs tracking-wider font-medium flex items-center gap-2 transition-colors"
              >
                <span>S-CURVE LAB</span>
                <span className="text-neutral-400 text-[10px]">[02]</span>
              </a>

              <button
                onClick={() => setIsDemystifierOpen(true)}
                className="px-5 py-3 text-neutral-600 hover:text-black font-mono text-xs tracking-wider flex items-center gap-1.5 transition-colors border border-transparent hover:border-black/10"
              >
                <span className="text-[#FF4400] font-bold">[ · i · ]</span>
                <span>PLAIN ENGLISH GUIDE</span>
              </button>
            </div>
          </div>

          {/* Chapter 01: Horizontal Card Carousel */}
          <div className="pt-8">
            <SemiconChapterCards />
          </div>
        </section>

        {/* 2. Chapter 02: S-Curve Inflection Showcase */}
        <section className="pt-6">
          <SemiconSCurveShowcase />
        </section>

        {/* 3. Chapter 03: Platform Systems / Applications Directory */}
        <section className="pt-6">
          <SemiconApplicationsList />
        </section>

        {/* 4. Chapter 04: Interactive Decision Stressor Playground */}
        <section id="simulator" className="pt-6">
          <InteractiveDecisionStressor />
        </section>

        {/* 5. Chapter 05: Consequential Industry Case Studies */}
        <section id="case-studies" className="pt-6 space-y-6">
          <div className="pb-3 border-b border-black/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="text-black font-semibold">CHAPTER 05</span>
              <span>·</span>
              <span>EMPIRICAL BENCHMARKS</span>
            </div>
            <span>N = 225 TRIALS</span>
          </div>
          <IndustryUseCases />
        </section>

        {/* 6. Chapter 06: Plain English Explainer & Questions */}
        <section id="faq" className="pt-6 space-y-6">
          <div className="pb-3 border-b border-black/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="text-black font-semibold">CHAPTER 06</span>
              <span>·</span>
              <span>DOCUMENTATION & FAQ</span>
            </div>
            <span>FREQUENTLY ASKED</span>
          </div>
          <FAQAccordion />
        </section>

        {/* 7. Pre-Footer Typographic Invitation - SemiconBio Style */}
        <section className="pt-12 pb-6 border-t border-black/[0.08] text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest">
            <span className="w-2 h-2 bg-[#00F0FF] inline-block" />
            <span>DEPLOY THE DECISION WORKSTATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tightest max-w-3xl mx-auto leading-tight">
            Ready to calibrate consequential decisions?
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
            Experience the full workstation with 45 enrolled participants and 225 pre-seeded trials, or participate in a live double-blind trial right in your browser.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/workspace"
              className="px-8 py-3.5 bg-black hover:bg-neutral-800 text-white font-mono text-xs tracking-wider flex items-center gap-2 transition-colors"
            >
              <span>ENTER WORKSTATION</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/experiments/run/exp-inv-001"
              className="px-8 py-3.5 bg-white hover:bg-neutral-100 text-black border border-black/20 font-mono text-xs tracking-wider flex items-center gap-2 transition-colors"
            >
              <span>RUN DECISION TRIAL</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </Link>
          </div>
        </section>
      </main>

      {/* Floating Monolithic Notice Banner - SemiconBio Style */}
      {showNotice && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-[#08090C] text-neutral-300 font-mono text-xs border-t border-neutral-800 px-6 py-3 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="text-[#00F0FF] font-bold">[ · i · ]</span>
            <span className="hidden sm:inline">
              Sentra operates deterministic stochastic safeguards and immutable cryptographic governance.
            </span>
            <span className="sm:hidden">Deterministic safeguards active.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setShowNotice(false)}
              className="text-[#FF4400] hover:underline font-bold"
            >
              DISMISS
            </button>
            <button
              onClick={() => setShowNotice(false)}
              className="text-white hover:underline font-bold"
            >
              ACKNOWLEDGE
            </button>
          </div>
        </div>
      )}

      {/* Monolithic Pitch-Black Footer */}
      <SemiconFooter />

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

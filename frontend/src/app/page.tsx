"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/navigation/site-header";
import { SemiconHero } from "@/components/home/semicon-hero";
import { SemiconTallCards } from "@/components/home/semicon-tall-cards";
import { SemiconSCurveExact } from "@/components/home/semicon-scurve-exact";
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
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-[#00F0FF]/30 selection:text-white relative flex flex-col justify-between overflow-x-hidden">
      {/* Floating Dark Segmented Header (Exact SemiconBio) */}
      <SiteHeader
        onOpenDemystifier={() => setIsDemystifierOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* 1. Hero: Dark Void with Pure White Breaking News Ribbon */}
      <SemiconHero />

      {/* 2. Chapter 01: Warm Architectural Alabaster (#EAEAEB) with the 3 Tall Cards */}
      <SemiconTallCards />

      {/* 3. Chapter 02: Full-Width Pitch-Black (#000000) S-Curve Graph */}
      <SemiconSCurveExact />

      {/* 4. Chapter 03: Applications Directory & Decision Engines (Warm Alabaster) */}
      <section className="w-full bg-[#EAEAEB] text-black py-20 sm:py-28 border-b border-neutral-300">
        <div className="max-w-[1380px] mx-auto px-6 space-y-16">
          <SemiconApplicationsList />
        </div>
      </section>

      {/* 5. Chapter 04: Interactive Decision Stressor Playground (Warm Alabaster) */}
      <section className="w-full bg-[#EAEAEB] text-black pb-20 sm:pb-28 border-b border-neutral-300">
        <div className="max-w-[1380px] mx-auto px-6 space-y-8">
          <InteractiveDecisionStressor />
        </div>
      </section>

      {/* 6. Chapter 05: Empirical Benchmarks & Case Studies */}
      <section id="case-studies" className="w-full bg-[#EAEAEB] text-black py-20 border-b border-neutral-300">
        <div className="max-w-[1380px] mx-auto px-6 space-y-8">
          <div className="pb-4 border-b border-black/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="text-black font-semibold">CHAPTER 05</span>
              <span>·</span>
              <span>EMPIRICAL BENCHMARKS</span>
            </div>
            <span>N = 225 RIGOROUS TRIALS</span>
          </div>
          <IndustryUseCases />
        </div>
      </section>

      {/* 7. Chapter 06: Plain English FAQ Accordion */}
      <section id="faq" className="w-full bg-[#EAEAEB] text-black py-20 border-b border-neutral-300">
        <div className="max-w-[1380px] mx-auto px-6 space-y-8">
          <div className="pb-4 border-b border-black/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="text-black font-semibold">CHAPTER 06</span>
              <span>·</span>
              <span>DOCUMENTATION & PROTOCOL</span>
            </div>
            <span>FREQUENTLY ASKED</span>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* 8. Pre-Footer Centered Typographic Statement (Pitch Black Void) */}
      <section className="w-full bg-[#000000] text-white py-24 sm:py-32 text-center border-b border-neutral-900">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F0FF] uppercase tracking-widest">
            <span className="w-2 h-2 bg-[#00F0FF] inline-block" />
            <span>DEPLOY THE DECISION WORKSTATION</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tightest leading-tight">
            Ready to calibrate consequential decisions?
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
            Experience the full platform with 45 enrolled participants and 225 pre-seeded trials, or run an empirical trial in your browser.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/workspace"
              className="px-8 py-3.5 bg-white text-black hover:bg-neutral-200 font-mono text-xs font-semibold tracking-wider flex items-center gap-2 transition-colors"
            >
              <span>ENTER WORKSTATION</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/experiments/run/exp-inv-001"
              className="px-8 py-3.5 bg-transparent text-white border border-neutral-700 hover:border-white font-mono text-xs font-medium tracking-wider flex items-center gap-2 transition-colors"
            >
              <span>RUN DECISION TRIAL</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Monolithic Pitch-Black Footer with Cyan Square Bullets (Exact step_33.png) */}
      <SemiconFooter />

      {/* Floating Monolithic Cookie/Safeguard Strip (Exact SemiconBio) */}
      {showNotice && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0A0A0A] text-neutral-300 font-mono text-xs border-t border-neutral-800 px-6 py-3 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold">[ · i · ]</span>
            <span className="text-neutral-400">
              Sentra website operates deterministic mathematical safeguards to prevent AI over-reliance.
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-bold">
            <button
              onClick={() => setShowNotice(false)}
              className="text-[#FF4400] hover:underline"
            >
              DECLINE
            </button>
            <button
              onClick={() => setShowNotice(false)}
              className="text-white hover:underline"
            >
              ACCEPT
            </button>
          </div>
        </div>
      )}

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

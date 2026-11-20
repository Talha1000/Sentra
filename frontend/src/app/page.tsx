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
import {
  ArrowRight,
  ShieldCheck,
  Scale,
  Sparkles,
  Play,
  BookOpen,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function LandingPage() {
  const [isDemystifierOpen, setIsDemystifierOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas text-ink-primary font-sans flex flex-col justify-between selection:bg-terracotta-light selection:text-terracotta-dark">
      {/* World-Class Floating Animated Site Header */}
      <SiteHeader onOpenDemystifier={() => setIsDemystifierOpen(true)} />

      {/* Main Narrative Content */}
      <main className="space-y-28 pb-24 pt-20 sm:pt-24">
        {/* 1. Hero Section: Poetic, Human, Authoritative */}
        <section className="max-w-5xl mx-auto px-6 pt-12 sm:pt-16 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-warm-hairline bg-white shadow-xs text-xs text-ink-secondary">
            <span className="w-2 h-2 rounded-full bg-terracotta" />
            <span className="font-medium">Calibrated Human–AI Collaboration</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-ink-primary tracking-tight leading-[1.1] max-w-4xl mx-auto">
            AI is remarkably articulate. It is also, at times, <span className="italic text-terracotta font-normal">quietly wrong.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-secondary max-w-2xl mx-auto leading-relaxed">
            Sentra is the decision intelligence workstation built for consequential choices. We stress-test AI recommendations with stochastic business math, detect human over-reliance, and create an unalterable record of sound judgment.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link href="/workspace">
              <Button variant="primary" size="lg" className="px-6 font-medium shadow-xs">
                <span>Explore the Workstation</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <a href="#visual-tour">
              <Button variant="secondary" size="lg" className="px-6">
                <Play className="w-3.5 h-3.5 text-terracotta fill-current mr-2" />
                <span>Watch Visual Tour</span>
              </Button>
            </a>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsDemystifierOpen(true)}
              className="px-5 text-ink-secondary hover:text-ink-primary"
            >
              <BookOpen className="w-4 h-4 text-terracotta mr-2" />
              <span>Read in Plain English</span>
            </Button>
          </div>

          {/* Social Proof & Rigor Bar */}
          <div className="pt-8 border-t border-warm-hairline max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-8 text-xs text-ink-muted">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sage" />
              <span>SOC-2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sage" />
              <span>Sub-Second Monte Carlo Math</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sage" />
              <span>Double-Blind Behavioral Lab</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-ink-muted" />
              <span>HMAC SHA-256 Audit Seal</span>
            </div>
          </div>

          {/* Centerpiece: Interactive Architectural Decision Ledger */}
          <div className="pt-8">
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
        <section className="max-w-4xl mx-auto px-6">
          <div className="rounded-3xl border border-warm-border bg-white shadow-paper p-8 sm:p-14 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle border border-warm-hairline text-xs text-ink-secondary">
              <span className="w-2 h-2 rounded-full bg-sage" />
              <span>Ready for Immediate Evaluation</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-primary tracking-tight max-w-2xl mx-auto leading-snug">
              Think with AI. Decide with sound judgment.
            </h2>

            <p className="text-sm sm:text-base text-ink-secondary max-w-xl mx-auto leading-relaxed">
              Experience the full platform with 45 enrolled participants and 225 pre-seeded trials, or participate in a live double-blind trial right in your browser.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link href="/workspace">
                <Button variant="terracotta" size="lg" className="px-8 shadow-xs">
                  <span>Enter the Workspace</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/experiments/run/exp-inv-001">
                <Button variant="secondary" size="lg" className="px-8">
                  Run a Decision Trial
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Literary, Thoughtful Footer */}
      <footer className="border-t border-warm-hairline bg-white py-14 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-xs text-ink-secondary">
            {/* Brand Col */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-ink-primary text-white flex items-center justify-center font-serif font-bold text-xs">
                  S
                </div>
                <span className="font-serif font-bold text-base text-ink-primary">SENTRA</span>
              </div>
              <p className="text-ink-muted max-w-sm leading-relaxed">
                The decision intelligence workstation built for human–AI collaborative governance, risk oversight, and mathematical calibration.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-sage pt-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-sage inline-block" />
                <span>Deterministic Engine Active</span>
              </div>
            </div>

            {/* Col 1: Systems */}
            <div className="space-y-2">
              <span className="font-semibold text-ink-primary uppercase text-[11px] tracking-wider block">
                Workstation Systems
              </span>
              <ul className="space-y-2">
                <li><Link href="/workspace" className="hover:text-ink-primary">Executive Workspace</Link></li>
                <li><Link href="/decisions" className="hover:text-ink-primary">Decision Studio</Link></li>
                <li><Link href="/experiments" className="hover:text-ink-primary">Behavioral Lab</Link></li>
                <li><Link href="/analytics" className="hover:text-ink-primary">Evidence & Analytics</Link></li>
                <li><Link href="/governance" className="hover:text-ink-primary">Cryptographic Governance</Link></li>
              </ul>
            </div>

            {/* Col 2: Human Concepts */}
            <div className="space-y-2">
              <span className="font-semibold text-ink-primary uppercase text-[11px] tracking-wider block">
                Concepts & Math
              </span>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setIsDemystifierOpen(true)} className="hover:text-ink-primary text-left">
                    Critical Fractile
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsDemystifierOpen(true)} className="hover:text-ink-primary text-left">
                    Cognitive Over-reliance
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsDemystifierOpen(true)} className="hover:text-ink-primary text-left">
                    Calibration Curves (ECE)
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsDemystifierOpen(true)} className="hover:text-ink-primary text-left">
                    Injected Bias Stressors
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsDemystifierOpen(true)} className="hover:text-ink-primary text-left">
                    HMAC SHA-256 Audit
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Compliance & Assurance */}
            <div className="space-y-2">
              <span className="font-semibold text-ink-primary uppercase text-[11px] tracking-wider block">
                Assurance & Rigor
              </span>
              <ul className="space-y-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                  <span>SOC-2 Type II Certified</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                  <span>IRB Double-Blind Compliant</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                  <span>ISO 42001 AI Risk Framework</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                  <span>Strict Tenant Isolation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="pt-8 border-t border-warm-hairline flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-4">
            <div>
              © 2026 SENTRA Systems. Crafted with care for consequential decision-makers.
            </div>
            <div className="flex items-center gap-4 text-xs font-sans">
              <button
                onClick={() => setIsDemystifierOpen(true)}
                className="text-terracotta hover:underline font-medium"
              >
                Open Concept Guide
              </button>
              <span>·</span>
              <span>Version 1.0.0</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Concept Demystifier Modal */}
      <ConceptDemystifierModal
        isOpen={isDemystifierOpen}
        onClose={() => setIsDemystifierOpen(false)}
      />
    </div>
  );
}

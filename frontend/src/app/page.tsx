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
import {
  ArrowRight,
  ShieldCheck,
  Scale,
  FlaskConical,
  BarChart3,
  Layers,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Cpu,
  Activity,
  Zap,
  Play,
  Lightbulb,
  BookOpen,
  Lock,
  Globe,
  Terminal,
} from "lucide-react";

export default function LandingPage() {
  const [isDemystifierOpen, setIsDemystifierOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col justify-between selection:bg-brand-100 selection:text-brand-900">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs hover:bg-brand-600 transition-colors">
                S
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900">
                  SENTRA
                </span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  Decision Intelligence
                </span>
              </div>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
            <a href="#video-tour" className="hover:text-slate-900 transition-colors">Interactive Tour</a>
            <a href="#simulator" className="hover:text-slate-900 transition-colors">Live Stressor</a>
            <a href="#modules" className="hover:text-slate-900 transition-colors">Platform Modules</a>
            <a href="#use-cases" className="hover:text-slate-900 transition-colors">Use Cases</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsDemystifierOpen(true)}
              className="text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border-amber-200 gap-1.5"
              title="Open Plain English Guide"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Plain English Guide</span>
              <span className="sm:hidden">Guide</span>
            </Button>

            <Link href="/workspace">
              <Button variant="secondary" size="sm" className="hidden sm:flex border-slate-200">
                Workspace
              </Button>
            </Link>

            <Link href="/experiments/run/exp-inv-001">
              <Button variant="brand" size="sm" className="gap-1.5 shadow-xs">
                <span>Run Trial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="space-y-24 pb-20">
        {/* 1. Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/90 bg-white shadow-xs text-xs font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Empirical Decision Intelligence & Algorithmic Oversight</span>
            <span className="text-slate-300">|</span>
            <span className="text-brand-600 font-bold">November 2026 Release</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Because when AI is <span className="text-brand-600">confidently wrong</span>, millions are on the line.
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            AI models generate articulate, persuasive recommendations—even when their numbers will bankrupt your supply chain.
            Sentra stress-tests AI advice with stochastic business math, intercepts human over-reliance in real-time, and cryptographically seals every consequential decision.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link href="/workspace">
              <Button variant="primary" size="lg" className="gap-2 px-6 shadow-xs font-semibold">
                <span>Enter Workstation</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>

            <a href="#video-tour">
              <Button variant="secondary" size="lg" className="gap-2 px-6 border-slate-300">
                <Play className="w-4 h-4 text-brand-600 fill-current" />
                <span>Watch Interactive Tour</span>
              </Button>
            </a>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsDemystifierOpen(true)}
              className="gap-2 px-5 border-amber-200 bg-amber-50/70 text-amber-950 hover:bg-amber-100"
            >
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Explain In Plain English</span>
            </Button>
          </div>

          {/* Social Proof & Compliance Bar */}
          <div className="pt-6 border-t border-slate-200/80 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SOC-2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-brand-600" />
              <span>Sub-second Monte Carlo Math</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-amber-600" />
              <span>Double-Blind Behavioral Lab</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-purple-600" />
              <span>HMAC SHA-256 Sealed Audit</span>
            </div>
          </div>

          {/* Centerpiece: Live Interactive Canvas */}
          <div className="pt-8 max-w-5xl mx-auto">
            <HeroInteractiveCanvas />
          </div>
        </section>

        {/* 2. Interactive Video Tour */}
        <section id="video-tour" className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white shadow-xs text-xs font-semibold text-slate-700">
              <Play className="w-3.5 h-3.5 text-brand-600 fill-current" />
              <span>Cinematic Simulation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              See the Sentra Protocol in Motion
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Watch step-by-step how an AI trap is identified, mathematically countered, and securely sealed.
            </p>
          </div>

          <MotionSimulationShowcase />
        </section>

        {/* 3. Plain English Explainer (How It Works) */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6">
          <PlainEnglishExplainer onOpenDemystifier={() => setIsDemystifierOpen(true)} />
        </section>

        {/* 4. Interactive Live Decision Stressor */}
        <section id="simulator" className="max-w-5xl mx-auto px-4 sm:px-6">
          <InteractiveDecisionStressor />
        </section>

        {/* 5. Five Integrated Platform Modules */}
        <section id="modules" className="max-w-7xl mx-auto px-4 sm:px-6">
          <ModuleTabsShowcase />
        </section>

        {/* 6. Real-World Industry Use Cases */}
        <section id="use-cases" className="max-w-7xl mx-auto px-4 sm:px-6">
          <IndustryUseCases />
        </section>

        {/* 7. Executive FAQ Accordion */}
        <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6">
          <FAQAccordion />
        </section>

        {/* 8. Call to Action Banner */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-xl text-center space-y-6">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-600/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-700 bg-slate-800/80 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ZERO FRICTION TRIAL • 45 PARTICIPANTS ENROLLED</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl mx-auto leading-tight">
              Ready to eliminate blind AI over-reliance from your organization?
            </h2>

            <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Launch the live workstation, participate in a randomized double-blind trial, or inspect our empirical calibration datasets right now.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link href="/workspace">
                <Button variant="brand" size="lg" className="px-8 shadow-md font-semibold">
                  <span>Enter Platform Workspace</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/experiments/run/exp-inv-001">
                <Button variant="secondary" size="lg" className="px-8 bg-slate-800 text-white border-slate-700 hover:bg-slate-700">
                  Participate in Live Study
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* World-Class Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-xs text-slate-600">
            {/* Brand Col */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  S
                </div>
                <span className="font-bold text-base text-slate-900">SENTRA</span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                The enterprise decision intelligence platform and behavioral laboratory designed for calibrated human–AI collaboration, risk oversight, and cryptographic governance.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-700 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>Deterministic Engine: ONLINE</span>
              </div>
            </div>

            {/* Col 1: Platform Modules */}
            <div className="space-y-2">
              <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block">
                Platform Modules
              </span>
              <ul className="space-y-1.5">
                <li><Link href="/workspace" className="hover:text-slate-900">Executive Workspace</Link></li>
                <li><Link href="/decisions" className="hover:text-slate-900">Decision Intelligence Studio</Link></li>
                <li><Link href="/experiments" className="hover:text-slate-900">Cognitive Research Lab</Link></li>
                <li><Link href="/analytics" className="hover:text-slate-900">Evidence & Analytics</Link></li>
                <li><Link href="/governance" className="hover:text-slate-900">Cryptographic Governance</Link></li>
              </ul>
            </div>

            {/* Col 2: Concepts & Math */}
            <div className="space-y-2">
              <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block">
                Scientific Foundations
              </span>
              <ul className="space-y-1.5">
                <li>
                  <button onClick={() => setIsDemystifierOpen(true)} className="hover:text-slate-900 text-left">
                    Critical Fractile Math
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsDemystifierOpen(true)} className="hover:text-slate-900 text-left">
                    Cognitive Over-reliance
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsDemystifierOpen(true)} className="hover:text-slate-900 text-left">
                    Calibration Curves (ECE)
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsDemystifierOpen(true)} className="hover:text-slate-900 text-left">
                    Injected Bias Stressors
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsDemystifierOpen(true)} className="hover:text-slate-900 text-left">
                    HMAC SHA-256 Audit Seal
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Compliance & Security */}
            <div className="space-y-2">
              <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block">
                Compliance & Assurance
              </span>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>SOC-2 Type II Certified</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>IRB Double-Blind Compliant</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ISO 42001 AI Risk Framework</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tenant Row-Level Isolation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © 2026 SENTRA Systems Inc. All rights reserved. Mathematical grounding verified.
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span>LATENCY: 4.2ms</span>
              <span>•</span>
              <span>VERSION: 1.0.0-PROD</span>
              <span>•</span>
              <button
                onClick={() => setIsDemystifierOpen(true)}
                className="text-brand-600 hover:underline font-sans font-medium"
              >
                Open Demystifier Guide
              </button>
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

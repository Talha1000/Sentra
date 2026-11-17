"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
  Terminal,
  Activity,
  Zap,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function LandingPage() {
  const [teaserOrder, setTeaserOrder] = useState<number>(1450);
  const aiSuggested = 1750; // Injected +20% bias
  const groundTruthOptimal = 1420;

  const currentDeviation = Math.abs(teaserOrder - groundTruthOptimal);
  const aiDeviation = Math.abs(aiSuggested - groundTruthOptimal);

  return (
    <div className="min-h-screen bg-obsidian-950 text-terminal-text font-sans flex flex-col justify-between selection:bg-phosphor-cyan/20 selection:text-phosphor-cyan">
      {/* Top Precision Terminal Bar */}
      <header className="border-b border-obsidian-700 bg-obsidian-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-phosphor-cyan text-obsidian-950 flex items-center justify-center font-mono font-black text-sm tracking-tighter shadow-cyanGlow">
              S
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono font-bold text-base tracking-widest uppercase text-terminal-text">
                SENTRA
              </span>
              <span className="font-mono text-[10px] text-phosphor-cyan">
                // PRECISION DECISION TERMINAL
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase text-terminal-muted">
            <a href="#philosophy" className="hover:text-terminal-text transition-colors">Philosophy</a>
            <a href="#matrix" className="hover:text-terminal-text transition-colors">Operational Matrix</a>
            <a href="#simulation" className="hover:text-terminal-text transition-colors">Interactive Stressor</a>
            <a href="#epistemic" className="hover:text-terminal-text transition-colors">Epistemic Rigor</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/workspace">
              <Button variant="secondary" size="sm" className="text-xs">WORKSPACE</Button>
            </Link>
            <Link href="/experiments/run/exp-inv-001">
              <Button variant="primary" size="sm" className="gap-1.5 text-xs">
                <span>START TRIAL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-obsidian-700 bg-obsidian-850 shadow-sm text-xs font-mono text-terminal-muted">
          <span className="w-2 h-2 rounded-full bg-phosphor-green animate-pulse" />
          <span className="text-terminal-text font-bold">DECISION INTELLIGENCE & BEHAVIORAL CALIBRATION PLATFORM</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-mono font-bold text-terminal-text tracking-tight max-w-5xl mx-auto leading-tight uppercase">
          Evaluate, calibrate, and govern decisions made by <span className="text-phosphor-cyan">humans and AI</span>.
        </h1>

        <p className="text-sm md:text-base text-terminal-muted max-w-3xl mx-auto leading-relaxed font-sans">
          SENTRA is an enterprise decision intelligence workstation combining stochastic business optimization,
          continuous empirical calibration, and transparent epistemic AI governance.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link href="/workspace">
            <Button size="lg" className="gap-2 px-6">
              <span>ENTER WORKSPACE TERMINAL</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/experiments/run/exp-inv-001">
            <Button variant="outline" size="lg" className="px-6">
              PARTICIPATE IN RESEARCH PROTOCOL
            </Button>
          </Link>
        </div>

        {/* Quality Badges */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-terminal-muted">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-phosphor-green" />
            <span>Deterministic Ground-Truth Evaluator</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-phosphor-green" />
            <span>Server-Clock Monotonic Reaction Latency</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-phosphor-green" />
            <span>Over-Reliance Bias Injection Stressor</span>
          </div>
        </div>
      </section>

      {/* Interactive Teaser Section */}
      <section id="simulation" className="max-w-5xl mx-auto px-6 py-10 w-full font-mono">
        <Card className="border-obsidian-700 bg-obsidian-850 shadow-terminal overflow-hidden">
          <CardHeader className="bg-obsidian-900 border-b border-obsidian-700 px-6 py-3.5 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xs font-bold text-terminal-text">
                OVER-RELIANCE STRESSOR SIMULATOR // LIVE TESTBED
              </CardTitle>
              <p className="text-[11px] text-terminal-muted font-sans mt-0.5">
                Observe how an injected algorithmic bias distorts economic payoff relative to mathematical ground truth.
              </p>
            </div>
            <Badge variant="cognition">LIVE SIMULATOR</Badge>
          </CardHeader>

          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            {/* Left: Decision Sliders */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-terminal-muted uppercase text-[11px]">Proposed Purchase Order</span>
                  <span className="font-mono font-bold text-sm text-phosphor-cyan">{teaserOrder} units</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="2000"
                  step="10"
                  value={teaserOrder}
                  onChange={(e) => setTeaserOrder(Number(e.target.value))}
                  className="w-full h-1.5 bg-obsidian-700 rounded appearance-none cursor-pointer accent-phosphor-cyan"
                />
                <div className="flex justify-between text-[10px] text-terminal-dim">
                  <span>Conservative (1,000)</span>
                  <span>Aggressive (2,000)</span>
                </div>
              </div>

              {/* AI Suggestion Callout */}
              <div className="p-3.5 rounded bg-obsidian-900 border border-phosphor-amber/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-phosphor-amber flex items-center gap-1.5 uppercase text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Recommendation
                  </span>
                  <span className="font-mono font-bold text-phosphor-amber">{aiSuggested} units</span>
                </div>
                <p className="text-[11px] text-terminal-muted leading-relaxed font-sans">
                  The model recommends ordering 1,750 units. Notice: in this controlled trial, the AI advice is intentionally biased (+23% above optimal) to measure participant compliance.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setTeaserOrder(aiSuggested)}
                  className="px-2.5 py-1.5 rounded text-[10px] font-mono font-semibold bg-obsidian-900 border border-obsidian-700 hover:border-phosphor-amber text-terminal-muted hover:text-terminal-text transition-colors"
                >
                  Adopt AI Suggestion (1,750)
                </button>
                <button
                  onClick={() => setTeaserOrder(groundTruthOptimal)}
                  className="px-2.5 py-1.5 rounded text-[10px] font-mono font-semibold bg-obsidian-900 border border-obsidian-700 hover:border-phosphor-green text-terminal-muted hover:text-terminal-text transition-colors"
                >
                  Set to Theoretical Optimal (1,420)
                </button>
              </div>
            </div>

            {/* Right: Live Ground Truth Comparison */}
            <div className="bg-obsidian-900 p-4 rounded border border-obsidian-700 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="font-bold uppercase tracking-wider text-terminal-text text-xs">
                  Ground-Truth Payoff Radar
                </span>

                <div className="space-y-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-terminal-muted">Theoretical Optimal Order:</span>
                    <span className="font-mono font-bold text-phosphor-green">{groundTruthOptimal} units</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-terminal-muted">Your Order Deviation:</span>
                    <span className={`font-mono font-bold ${currentDeviation < 30 ? "text-phosphor-green" : "text-phosphor-crimson"}`}>
                      {currentDeviation} units {currentDeviation < 30 ? "(Optimal Zone)" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-terminal-muted">Algorithmic Flaw Injected:</span>
                    <span className="font-mono font-bold text-phosphor-crimson">+{aiDeviation} units</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-obsidian-700 text-[11px] font-sans text-terminal-muted leading-relaxed">
                {currentDeviation === 0 ? (
                  <span className="text-phosphor-green font-semibold">
                    ✓ Optimal execution: You verified parameters, rejected algorithmic error bias, and captured maximum economic payoff.
                  </span>
                ) : Math.abs(teaserOrder - aiSuggested) < 20 ? (
                  <span className="text-phosphor-crimson font-semibold">
                    ⚠ Over-reliance detected: Adopting unverified algorithmic advice caused severe holding cost penalties.
                  </span>
                ) : (
                  <span>
                    Deterministic critical fractile scoring continuously active.
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Six Connected Core Modules */}
      <section id="matrix" className="max-w-7xl mx-auto px-6 py-14 space-y-6">
        <div className="text-center space-y-2 font-mono">
          <span className="text-xs uppercase text-phosphor-cyan tracking-wider font-bold">
            INTEGRATED SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-2xl font-bold text-terminal-text uppercase">Six Connected Operational Domains</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-obsidian-700 bg-obsidian-850 hover:border-obsidian-600 transition-colors">
            <CardHeader className="bg-obsidian-900 border-b border-obsidian-700 pb-2">
              <CardTitle className="text-xs flex items-center gap-2">
                <Layers className="w-4 h-4 text-phosphor-cyan" />
                <span>01 // Intelligence Workspace</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3.5 text-xs text-terminal-muted font-sans leading-relaxed">
              Portfolio oversight tracking agreement rates, latency distributions, and consequential decision ledgers.
            </CardContent>
          </Card>

          <Card className="border-obsidian-700 bg-obsidian-850 hover:border-obsidian-600 transition-colors">
            <CardHeader className="bg-obsidian-900 border-b border-obsidian-700 pb-2">
              <CardTitle className="text-xs flex items-center gap-2">
                <Cpu className="w-4 h-4 text-phosphor-green" />
                <span>02 // Decision Studio</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3.5 text-xs text-terminal-muted font-sans leading-relaxed">
              Formulate multi-attribute stochastic decisions with live 1,000-draw Monte Carlo expected profit simulations.
            </CardContent>
          </Card>

          <Card className="border-obsidian-700 bg-obsidian-850 hover:border-obsidian-600 transition-colors">
            <CardHeader className="bg-obsidian-900 border-b border-obsidian-700 pb-2">
              <CardTitle className="text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-phosphor-amber" />
                <span>03 // Human–AI Collaboration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3.5 text-xs text-terminal-muted font-sans leading-relaxed">
              Calibrated recommendation inspection with explicit uncertainty decomposition and human authorization sign-off.
            </CardContent>
          </Card>

          <Card className="border-obsidian-700 bg-obsidian-850 hover:border-obsidian-600 transition-colors">
            <CardHeader className="bg-obsidian-900 border-b border-obsidian-700 pb-2">
              <CardTitle className="text-xs flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-phosphor-cyan" />
                <span>04 // Research Laboratory</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3.5 text-xs text-terminal-muted font-sans leading-relaxed">
              Deploy double-blind randomized experimental protocols, controlled bias stressors, and millisecond timing clocks.
            </CardContent>
          </Card>

          <Card className="border-obsidian-700 bg-obsidian-850 hover:border-obsidian-600 transition-colors">
            <CardHeader className="bg-obsidian-900 border-b border-obsidian-700 pb-2">
              <CardTitle className="text-xs flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-phosphor-green" />
                <span>05 // Evidence & Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3.5 text-xs text-terminal-muted font-sans leading-relaxed">
              Real-time statistical inference (Welch t-tests, Cohen's d), Trust Calibration Curves, and CSV microdata downloads.
            </CardContent>
          </Card>

          <Card className="border-obsidian-700 bg-obsidian-850 hover:border-obsidian-600 transition-colors">
            <CardHeader className="bg-obsidian-900 border-b border-obsidian-700 pb-2">
              <CardTitle className="text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-phosphor-violet" />
                <span>06 // Governance & Audit</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3.5 text-xs text-terminal-muted font-sans leading-relaxed">
              Tamper-evident HMAC audit ledgers, model weight cards, and strict multi-tenant row-level authorization.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-obsidian-700 bg-obsidian-900 py-6 text-xs font-mono text-terminal-muted">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-phosphor-cyan text-obsidian-950 flex items-center justify-center font-bold text-[10px]">
              S
            </div>
            <span className="font-bold tracking-wider uppercase text-terminal-text">SENTRA PRECISION WORKSTATION</span>
          </div>
          <div className="flex items-center gap-6 text-terminal-dim">
            <span>DETERMINISTIC EVALUATION</span>
            <span>FASTAPI & NEXT.JS 15</span>
            <span>HIGH FIDELITY TERMINAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

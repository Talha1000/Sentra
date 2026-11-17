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
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function LandingPage() {
  // Teaser interactive order simulation
  const [teaserOrder, setTeaserOrder] = useState<number>(1450);
  const aiSuggested = 1750; // Injected +20% bias
  const groundTruthOptimal = 1420;

  const currentDeviation = Math.abs(teaserOrder - groundTruthOptimal);
  const aiDeviation = Math.abs(aiSuggested - groundTruthOptimal);

  return (
    <div className="min-h-screen bg-canvas text-ink-primary font-sans flex flex-col justify-between selection:bg-cognition-subtle selection:text-cognition">
      {/* Header Navigation */}
      <header className="border-b border-hairline bg-panel/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-ink-primary flex items-center justify-center text-white font-serif font-bold text-sm tracking-tighter">
              S
            </div>
            <span className="font-serif font-semibold text-base tracking-widest uppercase">
              SENTRA
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-ink-secondary">
            <a href="#philosophy" className="hover:text-ink-primary transition-colors">Philosophy</a>
            <a href="#modules" className="hover:text-ink-primary transition-colors">Platform Modules</a>
            <a href="#simulation" className="hover:text-ink-primary transition-colors">Interactive Teaser</a>
            <a href="#research" className="hover:text-ink-primary transition-colors">Research Integrity</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/workspace">
              <Button variant="secondary" size="sm">Workspace</Button>
            </Link>
            <Link href="/experiments/run/exp-inv-001">
              <Button variant="primary" size="sm" className="gap-1.5">
                <span>Start Experiment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hairline bg-panel shadow-subtle text-xs text-ink-secondary">
          <span className="w-2 h-2 rounded-full bg-spruce" />
          <span>Decision Intelligence & Cognitive Reliability Protocol</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-normal text-ink-primary tracking-tight max-w-4xl mx-auto leading-[1.15]">
          Understand, evaluate, and calibrate decisions made by <span className="italic font-serif">humans and AI</span>.
        </h1>

        <p className="text-sm md:text-base text-ink-secondary max-w-2xl mx-auto leading-relaxed">
          SENTRA is a research-grade decision intelligence platform combining stochastic business optimization,
          empirical behavioral science, and transparent AI governance.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link href="/workspace">
            <Button size="lg" className="gap-2 px-6">
              <span>Open Intelligence Workspace</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/experiments/run/exp-inv-001">
            <Button variant="outline" size="lg" className="px-6">
              Participate in Research Study
            </Button>
          </Link>
        </div>

        {/* Quality Badges */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-8 text-xs text-ink-tertiary">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-spruce" />
            <span>Deterministic Ground-Truth Scoring</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-spruce" />
            <span>Server-Clock Microsecond Latency</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-spruce" />
            <span>Zero Glowing AI Orbs or Saturated Gradients</span>
          </div>
        </div>
      </section>

      {/* Interactive Teaser Section */}
      <section id="simulation" className="max-w-5xl mx-auto px-6 py-12 w-full">
        <Card className="border-hairline shadow-elevated overflow-hidden">
          <CardHeader className="bg-canvas border-b border-hairline px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Interactive Teaser: Over-Reliance In Action</CardTitle>
                <p className="text-xs text-ink-secondary mt-0.5">
                  See how an injected AI bias affects decision quality relative to mathematical ground truth.
                </p>
              </div>
              <Badge variant="cognition">Over-Reliance Simulator</Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            {/* Left: Decision Sliders */}
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-ink-primary">Your Proposed Order Quantity</span>
                  <span className="font-mono font-bold text-sm">{teaserOrder} units</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="2000"
                  step="10"
                  value={teaserOrder}
                  onChange={(e) => setTeaserOrder(Number(e.target.value))}
                  className="w-full h-1.5 bg-subtle rounded-lg appearance-none cursor-pointer accent-ink-primary"
                />
                <div className="flex justify-between text-[11px] text-ink-tertiary">
                  <span>Conservative (1,000)</span>
                  <span>Aggressive (2,000)</span>
                </div>
              </div>

              {/* AI Suggestion Callout */}
              <div className="p-3.5 rounded bg-cognition-subtle/50 border border-cognition-border space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-cognition flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Recommendation
                  </span>
                  <span className="font-mono font-bold text-ink-primary">{aiSuggested} units</span>
                </div>
                <p className="text-[11px] text-ink-secondary leading-normal">
                  Model suggests ordering 1,750 units. Notice: in this controlled scenario, the recommendation is biased (+23% above optimal) to test compliance.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setTeaserOrder(aiSuggested)}
                  className="px-3 py-1.5 rounded text-[11px] font-medium bg-panel border border-hairline hover:bg-subtle text-ink-secondary transition-colors"
                >
                  Adopt AI Suggestion (1,750)
                </button>
                <button
                  onClick={() => setTeaserOrder(groundTruthOptimal)}
                  className="px-3 py-1.5 rounded text-[11px] font-medium bg-panel border border-hairline hover:bg-subtle text-ink-secondary transition-colors"
                >
                  Set to Theoretical Optimal (1,420)
                </button>
              </div>
            </div>

            {/* Right: Real-time Ground Truth Comparison */}
            <div className="bg-canvas p-4 rounded border border-hairline flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="font-semibold text-ink-primary">Live Performance Comparison</span>

                <div className="space-y-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-ink-secondary">Theoretical Optimal Order:</span>
                    <span className="font-mono font-semibold text-spruce">{groundTruthOptimal} units</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-ink-secondary">Your Deviation:</span>
                    <span className={`font-mono font-semibold ${currentDeviation < 30 ? "text-spruce" : "text-crimson"}`}>
                      {currentDeviation} units {currentDeviation < 30 ? "(Optimal Zone)" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-ink-secondary">AI Injected Error:</span>
                    <span className="font-mono font-semibold text-crimson">+{aiDeviation} units</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-hairline text-[11px] text-ink-secondary leading-normal">
                {currentDeviation === 0 ? (
                  <span className="text-spruce font-medium">
                    ✓ Perfect execution. You resisted AI recommendation bias and captured maximum economic payoff.
                  </span>
                ) : Math.abs(teaserOrder - aiSuggested) < 20 ? (
                  <span className="text-crimson font-medium">
                    ⚠ Over-reliance detected. Adopting the AI recommendation resulted in excess inventory holding penalties.
                  </span>
                ) : (
                  <span>
                    Continuous scoring updates based on newsvendor critical fractile profit functions.
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Six Connected Core Modules */}
      <section id="modules" className="max-w-7xl mx-auto px-6 py-16 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-serif font-medium text-ink-primary">Six Integrated System Areas</h2>
          <p className="text-xs text-ink-secondary max-w-xl mx-auto">
            One cohesive enterprise platform engineered for analytical rigor, human control, and empirical research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:border-border-medium transition-colors">
            <CardHeader>
              <div className="w-8 h-8 rounded bg-subtle flex items-center justify-center text-ink-primary mb-2">
                <Layers className="w-4 h-4" />
              </div>
              <CardTitle>A. Intelligence Workspace</CardTitle>
              <p className="text-xs text-ink-secondary">
                Executive portfolio tracking active decisions, agreement rates, risk indicators, and recent ledger entries.
              </p>
            </CardHeader>
          </Card>

          <Card className="hover:border-border-medium transition-colors">
            <CardHeader>
              <div className="w-8 h-8 rounded bg-subtle flex items-center justify-center text-ink-primary mb-2">
                <Scale className="w-4 h-4" />
              </div>
              <CardTitle>B. Decision Intelligence</CardTitle>
              <p className="text-xs text-ink-secondary">
                Formulate complex multi-attribute problems, model constraints, and run stochastic what-if simulations.
              </p>
            </CardHeader>
          </Card>

          <Card className="hover:border-border-medium transition-colors">
            <CardHeader>
              <div className="w-8 h-8 rounded bg-subtle flex items-center justify-center text-ink-primary mb-2">
                <Sparkles className="w-4 h-4 text-cognition" />
              </div>
              <CardTitle>C. Human–AI Collaboration</CardTitle>
              <p className="text-xs text-ink-secondary">
                Review, modify, or reject AI recommendations. Maintain clear separation between suggestions and human sign-off.
              </p>
            </CardHeader>
          </Card>

          <Card className="hover:border-border-medium transition-colors">
            <CardHeader>
              <div className="w-8 h-8 rounded bg-subtle flex items-center justify-center text-ink-primary mb-2">
                <FlaskConical className="w-4 h-4" />
              </div>
              <CardTitle>D. Research Laboratory</CardTitle>
              <p className="text-xs text-ink-secondary">
                Design controlled behavioral experiments, Latin-square randomized assignments, and microsecond reaction timing.
              </p>
            </CardHeader>
          </Card>

          <Card className="hover:border-border-medium transition-colors">
            <CardHeader>
              <div className="w-8 h-8 rounded bg-subtle flex items-center justify-center text-ink-primary mb-2">
                <BarChart3 className="w-4 h-4" />
              </div>
              <CardTitle>E. Evidence & Analytics</CardTitle>
              <p className="text-xs text-ink-secondary">
                Real-time statistical inference (Welch t-tests, Cohen's d), trust calibration curves, and raw CSV microdata exports.
              </p>
            </CardHeader>
          </Card>

          <Card className="hover:border-border-medium transition-colors">
            <CardHeader>
              <div className="w-8 h-8 rounded bg-subtle flex items-center justify-center text-ink-primary mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <CardTitle>F. Governance & Reliability</CardTitle>
              <p className="text-xs text-ink-secondary">
                Tamper-evident audit logs, model registry cards, tenant isolation, and strict reproducibility standards.
              </p>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-hairline bg-panel py-8 text-xs text-ink-secondary">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-ink-primary flex items-center justify-center text-white font-serif font-bold text-[10px]">
              S
            </div>
            <span className="font-serif font-semibold tracking-wider uppercase text-ink-primary">SENTRA</span>
            <span className="text-ink-tertiary">| Decision Intelligence Platform</span>
          </div>
          <div className="flex items-center gap-6 text-ink-tertiary">
            <span>WCAG 2.2 AA Compliant</span>
            <span>Deterministic Scoring</span>
            <span>Python & Next.js Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

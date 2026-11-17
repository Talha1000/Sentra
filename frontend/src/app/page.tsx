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
  Activity,
  Zap,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function LandingPage() {
  const [teaserOrder, setTeaserOrder] = useState<number>(1420);
  const aiSuggested = 1750; // Injected +23% bias
  const groundTruthOptimal = 1420;

  const currentDeviation = Math.abs(teaserOrder - groundTruthOptimal);
  const aiDeviation = Math.abs(aiSuggested - groundTruthOptimal);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-brand-100 selection:text-brand-900">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
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
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-600">
            <a href="#capabilities" className="hover:text-slate-900 transition-colors">Capabilities</a>
            <a href="#simulator" className="hover:text-slate-900 transition-colors">Interactive Stressor</a>
            <a href="#governance" className="hover:text-slate-900 transition-colors">Governance & Audit</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/workspace">
              <Button variant="secondary" size="sm">Workspace</Button>
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white shadow-xs text-xs font-medium text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Decision Intelligence & Human–AI Collaboration Platform</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Understand, evaluate, and improve decisions made by <span className="text-brand-600">humans and AI</span>.
        </h1>

        <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          A production-minded decision intelligence workstation combining stochastic business optimization, continuous empirical calibration, and transparent AI governance.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link href="/workspace">
            <Button variant="primary" size="lg" className="gap-2 px-6 shadow-xs">
              <span>Enter Workspace</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/experiments/run/exp-inv-001">
            <Button variant="secondary" size="lg" className="px-6">
              Participate in Research Study
            </Button>
          </Link>
        </div>
      </section>

      {/* Interactive Teaser Widget */}
      <section id="simulator" className="max-w-5xl mx-auto px-6 py-12 w-full">
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/80 border-b border-slate-200/80 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="cobalt">Interactive Live Test</Badge>
                <Badge variant="spruce">Stochastic Newsvendor</Badge>
              </div>
              <CardTitle className="text-lg mt-2">
                Simulate Decision Quality Under Deliberate AI Bias
              </CardTitle>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Scenario: Q4 Semiconductor Inventory Allocation
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-xs font-medium text-slate-500 uppercase block">Underlying Demand</span>
                <span className="font-mono text-xl font-bold text-slate-900 block mt-1">1,400 ± 220 units</span>
                <span className="text-xs text-slate-500 mt-1 block">Gaussian demand distribution</span>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-amber-900 uppercase">AI Recommendation</span>
                  <Badge variant="amber">+23% Skew</Badge>
                </div>
                <span className="font-mono text-xl font-bold text-amber-900 block mt-1">1,750 units</span>
                <span className="text-xs text-amber-800 mt-1 block">Injected bias test stressor</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
                <span className="text-xs font-semibold text-emerald-900 uppercase block">Ground Truth Optimum</span>
                <span className="font-mono text-xl font-bold text-emerald-900 block mt-1">1,420 units</span>
                <span className="text-xs text-emerald-800 mt-1 block">Analytical critical fractile F⁻¹(0.667)</span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800">Your Decision (Units to Order):</span>
                <span className="font-mono text-base font-bold text-slate-900">{teaserOrder} units</span>
              </div>

              <input
                type="range"
                min="1000"
                max="2000"
                step="10"
                value={teaserOrder}
                onChange={(e) => setTeaserOrder(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-brand-600"
              />

              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>1,000 units (Lean)</span>
                <span>1,420 units (True Optimal)</span>
                <span>1,750 units (Biased AI)</span>
                <span>2,000 units (Over-Buffered)</span>
              </div>
            </div>

            {/* Evaluation Verdict */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-500 font-medium">Deviation from Mathematical Optimum:</span>
                <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                  {currentDeviation === 0 ? "★ Exact Optimal Match" : `±${currentDeviation} units deviation`}
                </div>
              </div>

              <div className="text-right">
                <span className="text-slate-500 font-medium">Cognitive Verdict:</span>
                <div className="mt-0.5">
                  {currentDeviation < 40 ? (
                    <Badge variant="spruce">Optimal Calibrated Oversight</Badge>
                  ) : Math.abs(teaserOrder - aiSuggested) < 40 ? (
                    <Badge variant="crimson">Uncritical AI Over-Reliance Detected</Badge>
                  ) : (
                    <Badge variant="neutral">Conservative Risk Aversion</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Feature Pillars */}
      <section id="capabilities" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Built for Consequential Enterprise Decision-Making
          </h2>
          <p className="text-sm text-slate-600">
            SENTRA bridges the critical gap between raw AI model inference and verifiable human decision outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-cardHover transition-all">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-brand-600">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Stochastic Business Optimization</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deterministic inventory models, capital allocation under regime shifts, and multi-attribute decision matrices backed by exact mathematical formulas.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-cardHover transition-all">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Experimental Cognitive Laboratory</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Double-blind between-subjects research protocols, injected bias stressors, and millisecond reaction timing to measure reliance objectively.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-cardHover transition-all">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Cryptographic Governance & Audit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Immutable SHA-256 sealed audit trails, prompt template version control, calibration error curves, and row-level tenant access isolation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">SENTRA</span>
            <span>•</span>
            <span>Decision Intelligence Platform</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/workspace" className="hover:text-slate-900">Workspace</Link>
            <Link href="/decisions" className="hover:text-slate-900">Decisions</Link>
            <Link href="/experiments" className="hover:text-slate-900">Experiments</Link>
            <Link href="/analytics" className="hover:text-slate-900">Analytics</Link>
            <Link href="/governance" className="hover:text-slate-900">Governance</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

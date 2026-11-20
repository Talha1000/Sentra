"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  Brain,
  ShieldCheck,
  Scale,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Layers,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";

export function PlainEnglishExplainer({ onOpenDemystifier }: { onOpenDemystifier?: () => void }) {
  const [viewMode, setViewMode] = useState<"plain" | "scientific">("plain");

  const steps = [
    {
      step: "01",
      title: "The High-Stakes Decision",
      plainDesc: "Your company has to make a big decision—like ordering $2,000,000 worth of computer chips or allocating medical supplies. You don't know future demand for sure.",
      scientificDesc: "Consequential stochastic inventory and capital allocation problems characterized by high demand variance σ, asymmetric underage penalties Cu, and non-linear salvage values Cs.",
      icon: Scale,
      tag: "Business Reality",
    },
    {
      step: "02",
      title: "The Confident AI Trap",
      plainDesc: "You ask ChatGPT or Copilot for help. The AI writes a polite, fluent memo recommending a specific number. It sounds brilliant—so executives naturally believe it and sign off.",
      scientificDesc: "Large Language Models output uncalibrated point estimates lacking stochastic cost-function optimization, frequently exhibiting systematic optimism skew and hallucinated certitude.",
      icon: AlertCircle,
      tag: "The Vulnerability",
    },
    {
      step: "03",
      title: "Sentra's Mathematical Firewall",
      plainDesc: "Sentra intercepts the AI's answer. We run 1,000 virtual market simulations in milliseconds to test what happens if demand crashes or surges. We find the true profit-maximizing sweet spot.",
      scientificDesc: "Deterministic Monte Carlo simulation across N=1,000 draws from N(μ, σ) evaluated against the exact critical fractile F⁻¹((P-C+Penalty)/(P-S+Penalty)).",
      icon: Brain,
      tag: "Deterministic Math",
    },
    {
      step: "04",
      title: "Sealed Regulatory Immunity",
      plainDesc: "The human executive makes the final call with eyes wide open. Sentra cryptographically seals the decision rationale in an immutable vault, protecting your company in any audit.",
      scientificDesc: "Immutable HMAC SHA-256 tamper-evident chaining linking prompt provenance, stochastic distribution parameters, human override rationale, and timestamped audit logs.",
      icon: ShieldCheck,
      tag: "Governance & Audit",
    },
  ];

  return (
    <section className="space-y-12">
      {/* Section Header with Mode Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-200/80 bg-amber-50 text-amber-900 text-xs font-semibold">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>Sentra Explained in 60 Seconds</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight mt-3">
            Why Every Enterprise Needs a Decision Firewall
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
            AI is great at writing emails and code. But when it comes to million-dollar business decisions, trusting raw AI advice is like flying an airplane without instruments.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setViewMode("plain")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === "plain"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            👔 Plain English
          </button>
          <button
            onClick={() => setViewMode("scientific")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === "scientific"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🔬 Scientific Rigor
          </button>
        </div>
      </div>

      {/* 4 Step Horizontal Flow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.step}
              className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-card transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-400">
                    STEP {st.step}
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {st.tag}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                  <Icon className="w-5 h-5 text-brand-600" />
                </div>

                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {st.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {viewMode === "plain" ? st.plainDesc : st.scientificDesc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <span>Phase {st.step} Protocol</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Before / After Comparison Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Without Sentra */}
        <div className="p-6 rounded-2xl border border-rose-200 bg-rose-50/40 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-rose-950 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-rose-600" />
              Without Sentra: The Black-Box AI Trap
            </span>
            <Badge variant="crimson">Uncontrolled Risk</Badge>
          </div>

          <ul className="space-y-2.5 text-xs text-rose-900/90">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold shrink-0">•</span>
              <span><strong>Blind Over-reliance:</strong> Managers assume articulate AI is always mathematically accurate.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold shrink-0">•</span>
              <span><strong>Catastrophic Stockouts / Overstock:</strong> Millions lost to inventory depreciation or penalty fees.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold shrink-0">•</span>
              <span><strong>Zero Regulatory Defense:</strong> No audit trail of why the AI was trusted when questions are asked.</span>
            </li>
          </ul>
        </div>

        {/* With Sentra */}
        <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              With Sentra: Calibrated Decision Intelligence
            </span>
            <Badge variant="spruce">Empirical Oversight</Badge>
          </div>

          <ul className="space-y-2.5 text-xs text-emerald-900/90">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold shrink-0">•</span>
              <span><strong>Mathematical Validation:</strong> Every recommendation stress-tested against critical fractile math.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold shrink-0">•</span>
              <span><strong>Real-Time Bias Warning:</strong> Alerts executives immediately when AI recommendation deviates from optimal.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold shrink-0">•</span>
              <span><strong>Cryptographic Compliance:</strong> Immutable HMAC SHA-256 seal satisfies SOC-2, ISO 42001, and boards.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Demystifier CTA Pill */}
      {onOpenDemystifier && (
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">
                Still confused by terms like "Critical Fractile", "ECE", or "Monte Carlo"?
              </span>
              <span className="text-slate-500">
                Open our interactive dictionary with plain-English analogies for every concept.
              </span>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenDemystifier}
            className="shrink-0 gap-1.5 border-slate-300"
          >
            <span>Open Plain English Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}
    </section>
  );
}

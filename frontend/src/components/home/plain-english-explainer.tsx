"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Scale,
  Sparkles,
} from "lucide-react";

export function PlainEnglishExplainer({ onOpenDemystifier }: { onOpenDemystifier?: () => void }) {
  const [mode, setMode] = useState<"plain" | "technical">("plain");

  const pillars = [
    {
      num: "01",
      title: "The Consequential Choice",
      plain: "Your team faces an important business decision—like ordering $2M in inventory, committing cloud capacity, or issuing credit. The future demand is uncertain.",
      technical: "Stochastic resource allocation characterized by high demand variance, asymmetric underage penalties, and non-linear holding depreciation.",
      sub: "The Business Reality",
    },
    {
      num: "02",
      title: "The Eloquent AI Trap",
      plain: "You ask ChatGPT or Copilot for help. The model writes a polite, persuasive memo recommending a specific number. Because it sounds so smart, executives naturally trust it.",
      technical: "LLMs output uncalibrated point estimates lacking cost-function bounds, frequently exhibiting systematic optimism skew and hallucinated certainty.",
      sub: "The Silent Vulnerability",
    },
    {
      num: "03",
      title: "The Mathematical Safeguard",
      plain: "Sentra steps in. We run 1,000 simulated market storms in milliseconds to find the true profit-maximizing sweet spot and warn you if the AI is biased.",
      technical: "Deterministic Monte Carlo evaluation across N=1,000 draws evaluated against the analytical critical fractile F⁻¹(CF).",
      sub: "Stochastic Math",
    },
    {
      num: "04",
      title: "The Immutable Record",
      plain: "Your human executive makes the final call with open eyes. Sentra seals the reasoning in an unalterable digital vault, protecting your company in any audit.",
      technical: "Cryptographic HMAC SHA-256 tamper-evident chaining linking prompt version, distribution parameters, and timestamped rationale.",
      sub: "Defensible Governance",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-warm-border bg-canvas-elevated text-xs text-ink-secondary mb-3">
            <span className="w-2 h-2 rounded-full bg-terracotta shadow-[0_0_8px_rgba(224,122,95,0.6)]" />
            <span>How Sentra Works</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-primary tracking-tight leading-tight">
            Built for the decisions you can't afford to get wrong.
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary mt-3 max-w-2xl leading-relaxed">
            AI is extraordinary at drafting prose, summarizing articles, and writing code. But when millions of dollars in working capital are on the line, relying on an unverified language model is like flying through a storm without instruments.
          </p>
        </div>

        {/* Tactile Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-canvas-elevated border border-warm-border self-start md:self-auto shrink-0">
          <button
            onClick={() => setMode("plain")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === "plain"
                ? "bg-ink-primary text-canvas shadow-xs font-semibold"
                : "text-ink-secondary hover:text-ink-primary"
            }`}
          >
            In Plain English
          </button>
          <button
            onClick={() => setMode("technical")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === "technical"
                ? "bg-ink-primary text-canvas shadow-xs font-semibold"
                : "text-ink-secondary hover:text-ink-primary"
            }`}
          >
            Scientific Rigor
          </button>
        </div>
      </div>

      {/* Four Editorial Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p) => (
          <div
            key={p.num}
            className="p-6 rounded-2xl border border-warm-border bg-canvas-subtle shadow-paper hover:border-warm-borderStrong hover:bg-canvas-elevated transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl font-bold text-terracotta">
                  {p.num}
                </span>
                <span className="text-[10px] font-sans text-ink-muted uppercase tracking-wider">
                  {p.sub}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-ink-primary tracking-tight">
                {p.title}
              </h3>

              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {mode === "plain" ? p.plain : p.technical}
              </p>
            </div>

            <div className="pt-3 border-t border-warm-hairline text-[11px] text-ink-muted font-sans">
              Phase {p.num} Safeguard
            </div>
          </div>
        ))}
      </div>

      {/* Before / After Contrast Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Without Sentra */}
        <div className="p-8 rounded-2xl border border-warm-border bg-canvas-subtle/80 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-serif text-lg font-bold text-ink-primary flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] inline-block" />
              Without Sentra: The Black Box
            </span>
            <Badge variant="crimson">Unchecked Risk</Badge>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-ink-secondary leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-rose-400 font-bold shrink-0">·</span>
              <span><strong>Blind Over-Reliance:</strong> Managers defer to articulate AI advice without understanding asymmetric downside risks.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-rose-400 font-bold shrink-0">·</span>
              <span><strong>Hidden Balance Sheet Loss:</strong> Excess inventory write-downs or catastrophic stockouts eat into margins.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-rose-400 font-bold shrink-0">·</span>
              <span><strong>Audit Vulnerability:</strong> When questions arise later, there is zero verifiable proof of who decided what or why.</span>
            </li>
          </ul>
        </div>

        {/* With Sentra */}
        <div className="p-8 rounded-2xl border border-sage/30 bg-sage/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-serif text-lg font-bold text-sage flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sage shadow-[0_0_8px_rgba(52,211,153,0.6)] inline-block" />
              With Sentra: Calibrated Oversight
            </span>
            <Badge variant="spruce">Empirical Oversight</Badge>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-ink-secondary leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-sage font-bold shrink-0">·</span>
              <span><strong>Mathematical Truth:</strong> Recommendations are grounded in critical fractile and Monte Carlo optimization.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-sage font-bold shrink-0">·</span>
              <span><strong>Real-Time Disagreement Alerts:</strong> Detects and prevents human over-reliance before capital is authorized.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-sage font-bold shrink-0">·</span>
              <span><strong>Cryptographic Compliance:</strong> Immutable HMAC SHA-256 seal satisfies boards, auditors, and SOC-2 frameworks.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Guide CTA Strip */}
      {onOpenDemystifier && (
        <div className="p-6 rounded-2xl border border-warm-border bg-canvas-subtle shadow-paper flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-serif text-base font-semibold text-ink-primary block">
              Still have questions about terms like "Critical Fractile" or "ECE"?
            </span>
            <p className="text-xs text-ink-secondary">
              Read our human-written guide with simple analogies for every concept in the system.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenDemystifier}
            className="shrink-0 gap-2 border-warm-border bg-canvas-elevated hover:bg-canvas-subtle"
          >
            <BookOpen className="w-3.5 h-3.5 text-terracotta" />
            <span>Open Plain English Guide</span>
          </Button>
        </div>
      )}
    </div>
  );
}

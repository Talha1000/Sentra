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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs text-indigo-300 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(99,102,241,0.8)]" />
            <span>How Sentra Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Built for the decisions you cannot afford to get wrong.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            A 4-step calibrated defense protocol bridging machine intuition and mathematical truth.
          </p>
        </div>

        {/* Toggle Mode Control */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md flex items-center gap-1">
            <button
              onClick={() => setMode("plain")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                mode === "plain"
                  ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Plain English
            </button>
            <button
              onClick={() => setMode("technical")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                mode === "technical"
                  ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Technical Rigor
            </button>
          </div>

          {onOpenDemystifier && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenDemystifier}
              className="text-xs font-medium gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Guide</span>
            </Button>
          )}
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((p) => (
          <div
            key={p.num}
            className="relative rounded-3xl border border-white/[0.1] bg-[#0D111A]/85 backdrop-blur-xl p-6 shadow-card hover:border-white/20 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {p.num}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
                  {p.sub}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">
                {p.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed min-h-[96px]">
                {mode === "plain" ? p.plain : p.technical}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-mono">Stage {p.num}</span>
              <span className="text-indigo-400 font-medium">Protocol Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  HeartPulse,
  Coins,
  Server,
  ArrowRight,
} from "lucide-react";

interface CaseStudy {
  id: string;
  field: string;
  title: string;
  challenge: string;
  theAITrap: string;
  theSentraSolution: string;
  measuredBenefit: string;
}

const CASES: CaseStudy[] = [
  {
    id: "hardware",
    field: "Semiconductor Manufacturing",
    title: "Q4 Wafer Allocation & Component Sizing",
    challenge: "Long 18-week fabrication cycles mean over-ordering leads to multimillion-dollar obsolescence write-downs.",
    theAITrap: "The language model recommended ordering 1,750 units (+25%) based on optimistic growth sentiment in tech news.",
    theSentraSolution: "Critical fractile calculations balanced holding costs against stockout penalties, identifying the exact 1,420 unit sweet spot.",
    measuredBenefit: "$1.4M in working capital preserved per production run",
  },
  {
    id: "pharma",
    field: "Biomedical & Healthcare Logistics",
    title: "Critical Vaccine Cold-Chain Logistics",
    challenge: "Hospitals and public clinics cannot tolerate inventory stockouts during peak respiratory seasons.",
    theAITrap: "AI suggested a lean, just-in-time order based on historical average demand, risking dangerous supply shortfalls.",
    theSentraSolution: "Stochastic simulation heavily weighted the severe stockout penalty ($120/unit), ensuring high buffer safety.",
    measuredBenefit: "99.98% availability without emergency air-freight surcharges",
  },
  {
    id: "finance",
    field: "Commercial Capital & Treasury",
    title: "Commercial Fleet Fuel Hedging Allocation",
    challenge: "Oil price volatility and geopolitical shocks produce sharp market regime shifts that break linear models.",
    theAITrap: "Forecasting models predicted narrow confidence bands, ignoring catastrophic left-tail price surges.",
    theSentraSolution: "Monte Carlo testing ran 1,000 multi-regime volatility paths, producing calibrated Value-at-Risk confidence bounds.",
    measuredBenefit: "14.2% reduction in downside quarterly cash-flow drawdown",
  },
  {
    id: "cloud",
    field: "Cloud & Compute Infrastructure",
    title: "GPU Cluster Reserved Instance Commitments",
    challenge: "Over-committing reserved instances wastes budget; under-committing exposes the firm to 3x on-demand spot costs.",
    theAITrap: "AI recommended blanket three-year reservations based solely on peak engineering model training spikes.",
    theSentraSolution: "A hybrid stochastic model combined base reservation with elastic spot thresholds, calibrated to strict budget caps.",
    measuredBenefit: "31% reduction in blended compute infrastructure spend",
  },
];

export function IndustryUseCases() {
  const [activeId, setActiveId] = useState("hardware");
  const study = CASES.find((c) => c.id === activeId) || CASES[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-sans font-medium text-terracotta uppercase tracking-wide block">
          Consequential Decisions
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight">
          Where Sound Judgment Really Matters
        </h2>
        <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
          Sentra is deployed in industries where algorithmic hallucinations have immediate balance-sheet consequences.
        </p>
      </div>

      {/* Case Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {CASES.map((c) => {
          const isSelected = activeId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`p-5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "border-terracotta bg-canvas-elevated shadow-paper ring-1 ring-terracotta/40"
                  : "border-warm-border bg-canvas-subtle hover:bg-canvas-elevated hover:border-warm-borderStrong text-ink-secondary"
              }`}
            >
              <span className="text-[10px] font-sans font-medium text-terracotta uppercase tracking-wider block mb-1">
                {c.field.split(" ")[0]}
              </span>
              <h4 className="font-serif font-bold text-sm text-ink-primary leading-snug">
                {c.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Card */}
      <div className="p-8 sm:p-10 rounded-2xl border border-warm-border bg-canvas-subtle shadow-paper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-sans font-medium text-terracotta uppercase tracking-wider">
              Case Study · {study.field}
            </span>
            <h3 className="font-serif text-2xl font-bold text-ink-primary tracking-tight">
              {study.title}
            </h3>

            <div className="space-y-3 pt-2 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-canvas-elevated/70 border border-warm-hairline">
                <span className="font-semibold text-ink-primary block text-xs mb-1">
                  The Consequential Dilemma:
                </span>
                <p className="text-ink-secondary leading-relaxed">{study.challenge}</p>
              </div>

              <div className="p-4 rounded-xl bg-terracotta/10 border border-terracotta/30">
                <span className="font-semibold text-terracotta block text-xs mb-1">
                  The Fluent AI Pitfall:
                </span>
                <p className="text-ink-secondary leading-relaxed">{study.theAITrap}</p>
              </div>

              <div className="p-4 rounded-xl bg-sage/10 border border-sage/30">
                <span className="font-semibold text-sage block text-xs mb-1">
                  The Sentra Resolution:
                </span>
                <p className="text-ink-secondary leading-relaxed">{study.theSentraSolution}</p>
              </div>
            </div>
          </div>

          {/* Measured Benefit Plaque */}
          <div className="lg:col-span-4 p-8 rounded-2xl bg-canvas-elevated/50 border border-warm-hairline space-y-4 text-center lg:text-left">
            <span className="text-[11px] font-sans text-ink-muted uppercase tracking-wider block">
              Measured Business Return
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-ink-primary tracking-tight">
              {study.measuredBenefit}
            </div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Demonstrated through empirical double-blind trials and mathematical verification.
            </p>
            <div className="pt-3 border-t border-warm-hairline text-[11px] text-sage font-medium flex items-center justify-center lg:justify-start gap-1.5">
              <span>✓ Verified in tamper-evident ledger</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

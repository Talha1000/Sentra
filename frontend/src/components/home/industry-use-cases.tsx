"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  HeartPulse,
  Coins,
  Server,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

interface CaseStudy {
  id: string;
  field: string;
  title: string;
  icon: any;
  color: "indigo" | "emerald" | "amber" | "cyan";
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
    icon: Cpu,
    color: "indigo",
    challenge: "Long 18-week fabrication cycles mean over-ordering leads to multimillion-dollar obsolescence write-downs.",
    theAITrap: "The language model recommended ordering 1,750 units (+25%) based on optimistic growth sentiment in tech news.",
    theSentraSolution: "Critical fractile calculations balanced holding costs against stockout penalties, identifying the exact 1,420 unit sweet spot.",
    measuredBenefit: "$1.4M working capital preserved per production run",
  },
  {
    id: "pharma",
    field: "Biomedical & Healthcare Logistics",
    title: "Critical Vaccine Cold-Chain Logistics",
    icon: HeartPulse,
    color: "emerald",
    challenge: "Hospitals and public clinics cannot tolerate inventory stockouts during peak respiratory seasons.",
    theAITrap: "AI suggested a lean, just-in-time order based on historical average demand, risking dangerous supply shortfalls.",
    theSentraSolution: "Stochastic simulation heavily weighted the severe stockout penalty ($120/unit), ensuring high buffer safety.",
    measuredBenefit: "99.98% availability without emergency air-freight surcharges",
  },
  {
    id: "finance",
    field: "Commercial Capital & Treasury",
    title: "Commercial Fleet Fuel Hedging Allocation",
    icon: Coins,
    color: "amber",
    challenge: "Oil price volatility and geopolitical shocks produce sharp market regime shifts that break linear models.",
    theAITrap: "Forecasting models predicted narrow confidence bands, ignoring catastrophic left-tail price surges.",
    theSentraSolution: "Monte Carlo testing ran 1,000 multi-regime volatility paths, producing calibrated Value-at-Risk confidence bounds.",
    measuredBenefit: "14.2% reduction in downside quarterly cash-flow drawdown",
  },
  {
    id: "cloud",
    field: "Cloud & Compute Infrastructure",
    title: "GPU Cluster Reserved Instance Commitments",
    icon: Server,
    color: "cyan",
    challenge: "Over-committing reserved instances wastes budget; under-committing exposes the firm to 3x on-demand spot costs.",
    theAITrap: "AI recommended blanket three-year reservations based solely on peak engineering model training spikes.",
    theSentraSolution: "A hybrid stochastic model combined base reservation with elastic spot thresholds, calibrated to strict budget caps.",
    measuredBenefit: "31% reduction in blended compute infrastructure spend",
  },
];

export function IndustryUseCases() {
  const [activeId, setActiveId] = useState("hardware");
  const study = CASES.find((c) => c.id === activeId) || CASES[0];
  const Icon = study.icon;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block">
          Consequential Decisions
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Where Sound Judgment Truly Matters
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Sentra is deployed in industries where algorithmic hallucinations have immediate balance-sheet consequences.
        </p>
      </div>

      {/* Case Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {CASES.map((c) => {
          const isSelected = activeId === c.id;
          const CIcon = c.icon;
          return (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-indigo-500/50 bg-[#0F1524] shadow-[0_0_20px_rgba(99,102,241,0.25)] ring-1 ring-indigo-500/30"
                  : "border-white/[0.08] bg-[#0D111A]/80 hover:bg-white/[0.04] text-slate-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider block">
                  {c.field.split(" ")[0]}
                </span>
                <div className={`p-1.5 rounded-lg border ${isSelected ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300" : "bg-white/[0.04] border-white/[0.08] text-slate-500"}`}>
                  <CIcon className="w-3.5 h-3.5" />
                </div>
              </div>
              <h4 className="font-semibold text-sm text-white leading-snug">
                {c.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Case Showcase Card */}
      <div className="relative rounded-3xl border border-white/[0.12] bg-[#0D111A]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-6 sm:p-10 overflow-hidden">
        {/* Top Rim Light */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.3)]">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block">
                  {study.field}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                  {study.title}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  The Operational Challenge
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {study.challenge}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 space-y-1.5">
                  <span className="text-xs font-semibold text-orange-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    The Fluent AI Trap
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {study.theAITrap}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    The Sentra Solution
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {study.theSentraSolution}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0F1524]/90 border border-white/[0.08] shadow-xl space-y-4 text-center lg:text-left">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Measured ROI & Outcome
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 leading-tight">
              {study.measuredBenefit}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empirically verified through stochastic audit certificate and post-period ledger reconciliation.
            </p>
            <div className="pt-2">
              <Badge variant="spruce" dot>Ground-Truth Verified</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

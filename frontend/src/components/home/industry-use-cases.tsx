"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  HeartPulse,
  Coins,
  Server,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";

interface UseCase {
  id: string;
  industry: string;
  title: string;
  icon: any;
  problem: string;
  aiTrap: string;
  sentraSolution: string;
  financialImpact: string;
}

const USE_CASES: UseCase[] = [
  {
    id: "hardware",
    industry: "Hardware & Semiconductor",
    title: "Q4 Wafer Allocation & Component Sizing",
    icon: Cpu,
    problem: "Long 18-week lead times mean inventory miscalculations cost millions in obsolete write-downs.",
    aiTrap: "LLM optimistically recommends ordering +25% extra stock based on recent growth headlines.",
    sentraSolution: "Critical fractile calculates exact holding vs stockout asymmetry, identifying the optimal 1,420 unit point.",
    financialImpact: "$1.4M saved per quarterly production run",
  },
  {
    id: "healthcare",
    industry: "Biomedical & Pharmaceuticals",
    title: "Critical Vaccine Cold-Chain Logistics",
    icon: HeartPulse,
    problem: "Hospital networks cannot afford stockouts during seasonal respiratory virus outbreaks.",
    aiTrap: "AI recommends minimal lean buffer based on historical average demand, risking life-threatening shortages.",
    sentraSolution: "Stochastic simulation heavily weights stockout penalty ($120/unit), recommending a robust safety fractile.",
    financialImpact: "99.98% availability with zero emergency logistics surcharges",
  },
  {
    id: "finance",
    industry: "Capital & Asset Management",
    title: "Commercial Fleet Fuel Hedging Allocation",
    icon: Coins,
    problem: "Volatile oil prices create severe regime shifts that break classical linear regression.",
    aiTrap: "Predictive AI models hallucinate narrow confidence intervals, failing to model geopolitical tail risks.",
    sentraSolution: "Monte Carlo testing runs 1,000 multi-regime volatility paths, producing calibrated VaR confidence bands.",
    financialImpact: "14.2% reduction in downside portfolio drawdown",
  },
  {
    id: "cloud",
    industry: "Cloud & AI Infrastructure",
    title: "GPU Cluster Reserved Instance Commitments",
    icon: Server,
    problem: "Under-committing leads to exorbitant on-demand spot rates; over-committing wastes hundreds of thousands monthly.",
    aiTrap: "AI recommends blanket 3-year commitments based on peak engineering training runs.",
    sentraSolution: "Dynamic capacity model blends base reservation with elastic spot thresholds, calibrated to budget constraints.",
    financialImpact: "31% decrease in blended GPU compute expenditure",
  },
];

export function IndustryUseCases() {
  const [selectedCase, setSelectedCase] = useState<string>("hardware");

  const currentCase = USE_CASES.find((c) => c.id === selectedCase) || USE_CASES[0];
  const Icon = currentCase.icon;

  return (
    <section className="space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white shadow-xs text-xs font-semibold text-slate-700">
          <Badge variant="spruce">Mission-Critical Domains</Badge>
          <span>Consequential Enterprise Deployments</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">
          Where Millions Are Won or Lost in the Margins
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Sentra is deployed in industries where automated mistakes cannot be swept under the rug.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {USE_CASES.map((uc) => {
          const CaseIcon = uc.icon;
          const isSelected = selectedCase === uc.id;
          return (
            <button
              key={uc.id}
              onClick={() => setSelectedCase(uc.id)}
              className={`p-5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "border-slate-900 bg-slate-900 text-white shadow-md"
                  : "border-slate-200 bg-white hover:border-slate-300 text-slate-800"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-800"
                  }`}
                >
                  <CaseIcon className="w-5 h-5 text-brand-500" />
                </div>
                <span
                  className={`text-[10px] font-mono uppercase ${
                    isSelected ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {uc.industry.split(" ")[0]}
                </span>
              </div>
              <h4 className="font-bold text-sm leading-snug">{uc.title}</h4>
            </button>
          );
        })}
      </div>

      {/* Selected Case Deep Dive Card */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold uppercase text-brand-600">
                CASE STUDY • {currentCase.industry.toUpperCase()}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {currentCase.title}
            </h3>

            <div className="space-y-3 pt-2 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-700 block uppercase text-[10px] tracking-wide">
                  The Consequential Dilemma:
                </span>
                <p className="text-slate-600 mt-1">{currentCase.problem}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200/80">
                <span className="font-bold text-rose-900 block uppercase text-[10px] tracking-wide flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  The AI Trap Avoided:
                </span>
                <p className="text-rose-950 mt-1">{currentCase.aiTrap}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                <span className="font-bold text-emerald-900 block uppercase text-[10px] tracking-wide">
                  The Sentra Solution:
                </span>
                <p className="text-emerald-950 mt-1">{currentCase.sentraSolution}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 p-6 rounded-2xl bg-slate-900 text-white space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block">
              MEASURED ENTERPRISE ROI
            </span>
            <div className="font-bold text-2xl tracking-tight text-white">
              {currentCase.financialImpact}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Demonstrated through empirical research trials and real-time operational calibration.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Full Audit Trace Logged</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

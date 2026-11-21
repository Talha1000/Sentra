"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { api } from "@/lib/api";
import {
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Calculator,
  Compass,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Cpu,
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  field: string;
  meanDemand: number;
  stdDemand: number;
  unitCost: number;
  sellingPrice: number;
  salvageValue: number;
  stockoutPenalty: number;
  defaultOrder: number;
}

const SCENARIOS: Scenario[] = [
  {
    id: "semiconductor",
    name: "Semiconductor Allocation",
    field: "Hardware & Manufacturing",
    meanDemand: 1400,
    stdDemand: 220,
    unitCost: 45,
    sellingPrice: 85,
    salvageValue: 25,
    stockoutPenalty: 20,
    defaultOrder: 1420,
  },
  {
    id: "biomedical",
    name: "Vaccine Cold-Chain",
    field: "Healthcare Logistics",
    meanDemand: 2000,
    stdDemand: 350,
    unitCost: 60,
    sellingPrice: 150,
    salvageValue: 10,
    stockoutPenalty: 120,
    defaultOrder: 2360,
  },
  {
    id: "cloud-capacity",
    name: "GPU Reserved Capacity",
    field: "Cloud Infrastructure",
    meanDemand: 800,
    stdDemand: 150,
    unitCost: 120,
    sellingPrice: 220,
    salvageValue: 40,
    stockoutPenalty: 50,
    defaultOrder: 860,
  },
];

export function InteractiveDecisionStressor() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const [orderQuantity, setOrderQuantity] = useState<number>(1420);
  const [simResult, setSimResult] = useState<any>(null);
  const [showFormula, setShowFormula] = useState(false);

  useEffect(() => {
    let isMounted = true;
    api.fetch("/decisions/quick-simulate", {
      method: "POST",
      body: JSON.stringify({
        purchase_quantity: orderQuantity,
        mean_demand: activeScenario.meanDemand,
        std_demand: activeScenario.stdDemand,
        unit_cost: activeScenario.unitCost,
        selling_price: activeScenario.sellingPrice,
        salvage_value: activeScenario.salvageValue,
        stockout_penalty: activeScenario.stockoutPenalty,
      }),
    })
      .then((res) => {
        if (isMounted) setSimResult(res);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [orderQuantity, activeScenario]);

  const handleSelectScenario = (sc: Scenario) => {
    setActiveScenario(sc);
    setOrderQuantity(sc.defaultOrder);
  };

  const optimalQty = simResult?.optimal_order_quantity || 1420;
  const aiSuggested = simResult?.ai_suggested_quantity || 1750;
  const expectedProfit = simResult?.expected_user_profit || 56800;
  const maxProfit = simResult?.expected_max_profit || 56800;
  const financialRegret = Math.max(0, maxProfit - expectedProfit);

  return (
    <div className="relative rounded-3xl border border-white/[0.12] bg-[#0D111A]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden transition-all">
      {/* Top Rim Light */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="p-6 sm:p-8 border-b border-white/[0.08] bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(255,107,74,0.8)]" />
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
              Interactive Stressor Playground
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Experience the Decision Dilemma
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
            Drag the slider to adjust your purchase order. Observe how the AI’s optimistic suggestion leads to hidden holding costs, and discover where the true profit sweet spot lies.
          </p>
        </div>

        {/* Scenario Selector */}
        <div className="flex flex-wrap gap-2 shrink-0">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeScenario.id === sc.id
                  ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md font-semibold border border-indigo-400/40"
                  : "bg-white/[0.04] text-slate-400 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              {sc.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Three Reference Benchmarks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Market Demand
            </span>
            <div className="text-2xl font-bold text-white tabular-nums">
              {activeScenario.meanDemand.toLocaleString()} ± {activeScenario.stdDemand}
            </div>
            <span className="text-xs text-slate-400 block">
              Historical Gaussian sales distribution
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-orange-500/30 bg-orange-500/10 shadow-[0_0_20px_rgba(255,107,74,0.15)] space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                AI Suggestion
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                +23% Skew
              </span>
            </div>
            <div className="text-2xl font-bold text-orange-400 tabular-nums">
              {aiSuggested.toLocaleString()} units
            </div>
            <span className="text-xs text-slate-300 block">
              Optimistic forecast without holding penalties
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Mathematical Sweet Spot
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Optimal Q*
              </span>
            </div>
            <div className="text-2xl font-bold text-emerald-400 tabular-nums">
              {optimalQty.toLocaleString()} units
            </div>
            <span className="text-xs text-slate-300 block">
              Max expected profit across all market scenarios
            </span>
          </div>
        </div>

        {/* Tactile Slider Box */}
        <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-white uppercase tracking-wider block">
                Your Chosen Purchase Order
              </span>
              <span className="text-xs text-slate-400">
                Drag the slider to test different order volumes
              </span>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-white tabular-nums">
                {orderQuantity.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 ml-1.5 font-sans">units</span>
            </div>
          </div>

          {/* Range Slider */}
          <input
            type="range"
            min={Math.round(activeScenario.meanDemand * 0.65)}
            max={Math.round(activeScenario.meanDemand * 1.45)}
            step={10}
            value={orderQuantity}
            onChange={(e) => setOrderQuantity(Number(e.target.value))}
            className="w-full h-2.5 bg-white/[0.1] rounded-lg cursor-pointer accent-indigo-500 focus:outline-none"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>{Math.round(activeScenario.meanDemand * 0.65)} (Conservative)</span>
            <span className="font-semibold text-emerald-400">{optimalQty} (Optimal Sweet Spot)</span>
            <span className="font-semibold text-orange-400">{aiSuggested} (Biased AI)</span>
            <span>{Math.round(activeScenario.meanDemand * 1.45)} (Excessive Stock)</span>
          </div>
        </div>

        {/* Human Feedback Card */}
        <div className="p-6 rounded-2xl border border-white/[0.09] bg-[#0F1524]/90 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block">
                Human Judgment Diagnosis
              </span>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge
                  variant={
                    simResult?.cognitive_diagnosis === "OPTIMAL_CALIBRATED"
                      ? "spruce"
                      : simResult?.cognitive_diagnosis === "AI_OVER_RELIANCE"
                      ? "terracotta"
                      : "neutral"
                  }
                  dot
                >
                  {simResult?.verdict_badge || "Calibrated Oversight"}
                </Badge>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 uppercase tracking-wider block">
                Expected Financial Outcome
              </span>
              <div className="text-2xl font-bold text-white mt-0.5 tabular-nums">
                {formatCurrency(expectedProfit)}
                {financialRegret > 150 && (
                  <span className="text-xs text-rose-400 font-medium ml-2">
                    (-{formatCurrency(financialRegret)} regret)
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {simResult?.verdict_explanation ||
              "Adjust the slider above to see real-time cognitive feedback and financial return."}
          </p>

          {/* Toggle Formula */}
          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-white/[0.06]">
            <button
              onClick={() => setShowFormula(!showFormula)}
              className="hover:text-white font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-indigo-400" />
              <span>{showFormula ? "Hide Mathematical Grounding" : "Show Critical Fractile Math"}</span>
            </button>
            <span className="text-[11px] text-slate-500 font-mono">
              Simulated across N = 1,000 market iterations
            </span>
          </div>

          {showFormula && (
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] font-mono text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <div>
                <strong className="text-indigo-300">Critical Fractile Formula:</strong> CF = (Price - Cost + Penalty) / (Price - Salvage + Penalty)
              </div>
              <div>
                <strong>Calculated for this scenario:</strong> CF = ({activeScenario.sellingPrice} - {activeScenario.unitCost} + {activeScenario.stockoutPenalty}) / ({activeScenario.sellingPrice} - {activeScenario.salvageValue} + {activeScenario.stockoutPenalty}) = <strong className="text-emerald-400">{simResult?.critical_fractile || 0.6667}</strong>
              </div>
              <div>
                <strong className="text-white">Profit-Maximizing Target (Q*):</strong> {optimalQty} units
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

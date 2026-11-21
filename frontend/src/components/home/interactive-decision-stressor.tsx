"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { api } from "@/lib/api";
import { Calculator, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";

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
    <div className="w-full bg-[#121417] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
              Interactive Decision Stressor
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Stress-test an AI Recommendation
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
            See how articulate AI forecasts introduce subtle +23% over-allocation risks, and compare them against calibrated critical fractile math.
          </p>
        </div>

        {/* Scenario Switchers */}
        <div className="flex flex-wrap gap-1 p-1 bg-[#181A1E] border border-white/[0.08] rounded-xl shadow-inner">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`px-3.5 py-1.5 text-xs rounded-lg font-medium transition-all ${
                activeScenario.id === sc.id
                  ? "btn-realistic-primary font-semibold text-neutral-900"
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {sc.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Comparative Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Market Demand */}
        <div className="p-4 rounded-xl bg-[#181A1E] border border-white/[0.06] space-y-1">
          <span className="text-[11px] text-neutral-400 font-medium block">
            Stochastic Demand
          </span>
          <div className="text-xl font-semibold text-white tabular-nums">
            {activeScenario.meanDemand.toLocaleString()} ± {activeScenario.stdDemand}
          </div>
          <span className="text-[11px] text-neutral-500 block">
            Gaussian distribution
          </span>
        </div>

        {/* Biased AI */}
        <div className="p-4 rounded-xl bg-rose-500/[0.06] border border-rose-500/20 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-rose-400 font-medium">
              AI Recommendation
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
              +23% Bias
            </span>
          </div>
          <div className="text-xl font-semibold text-rose-300 tabular-nums">
            {aiSuggested.toLocaleString()} units
          </div>
          <span className="text-[11px] text-neutral-400 block">
            Overconfident demand projection
          </span>
        </div>

        {/* Mathematical Sweet Spot */}
        <div className="p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-emerald-400 font-medium">
              Optimal Equilibrium (Q*)
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Critical Fractile
            </span>
          </div>
          <div className="text-xl font-semibold text-emerald-300 tabular-nums">
            {optimalQty.toLocaleString()} units
          </div>
          <span className="text-[11px] text-neutral-400 block">
            Profit-maximizing sweet spot
          </span>
        </div>
      </div>

      {/* Slider Box */}
      <div className="p-5 rounded-xl bg-[#181A1E] border border-white/[0.06] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-white block">
              Adjust Allocation Quantity
            </span>
            <span className="text-[11px] text-neutral-400">
              Test how different purchase volumes perform
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-semibold text-white tabular-nums">
              {orderQuantity.toLocaleString()}
            </span>
            <span className="text-xs text-neutral-400 ml-1">units</span>
          </div>
        </div>

        {/* Slider */}
        <input
          type="range"
          min={Math.round(activeScenario.meanDemand * 0.65)}
          max={Math.round(activeScenario.meanDemand * 1.45)}
          step={10}
          value={orderQuantity}
          onChange={(e) => setOrderQuantity(Number(e.target.value))}
          className="w-full h-2 bg-[#252830] rounded-lg cursor-pointer accent-blue-500 focus:outline-none"
        />

        <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
          <span>{Math.round(activeScenario.meanDemand * 0.65)} (Conservative)</span>
          <span className="text-emerald-400">{optimalQty} (Optimal Q*)</span>
          <span className="text-rose-400">{aiSuggested} (Biased AI)</span>
          <span>{Math.round(activeScenario.meanDemand * 1.45)} (Excessive Stock)</span>
        </div>
      </div>

      {/* Outcome & Diagnosis */}
      <div className="p-5 rounded-xl bg-[#181A1E] border border-white/[0.06] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
          <div>
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">
              Human Judgment Diagnosis
            </span>
            <div className="mt-1 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-white border border-white/[0.1]">
                {simResult?.verdict_badge || "Calibrated Oversight"}
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">
              Expected Outcome
            </span>
            <div className="text-xl font-semibold text-white mt-0.5 tabular-nums">
              {formatCurrency(expectedProfit)}
              {financialRegret > 150 && (
                <span className="text-xs text-rose-400 font-normal ml-2">
                  (-{formatCurrency(financialRegret)} regret)
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          {simResult?.verdict_explanation ||
            "Adjust the slider above to see real-time cognitive feedback and expected profit."}
        </p>

        {/* Toggle Math Formula */}
        <div className="pt-2 flex items-center justify-between text-xs text-neutral-400 border-t border-white/[0.06]">
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="hover:text-white font-medium flex items-center gap-1.5 transition-colors"
          >
            <Calculator className="w-3.5 h-3.5 text-blue-400" />
            <span>{showFormula ? "Hide Formula" : "View Critical Fractile Math"}</span>
          </button>
          <span className="text-[11px] text-neutral-500 font-mono">
            Monte Carlo N = 1,000 draws
          </span>
        </div>

        {showFormula && (
          <div className="p-3 rounded-lg bg-[#0E1013] border border-white/[0.08] font-mono text-xs text-neutral-300 space-y-1">
            <div>
              <strong className="text-blue-300">Critical Fractile:</strong> CF = (Price - Cost + Penalty) / (Price - Salvage + Penalty)
            </div>
            <div>
              <strong>Calculated:</strong> CF = ({activeScenario.sellingPrice} - {activeScenario.unitCost} + {activeScenario.stockoutPenalty}) / ({activeScenario.sellingPrice} - {activeScenario.salvageValue} + {activeScenario.stockoutPenalty}) = <strong className="text-white">{simResult?.critical_fractile || 0.6667}</strong>
            </div>
            <div>
              <strong>Optimal Target (Q*):</strong> {optimalQty} units
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

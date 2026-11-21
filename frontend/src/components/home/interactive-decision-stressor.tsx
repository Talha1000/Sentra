"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { api } from "@/lib/api";
import { Calculator, ArrowUpRight } from "lucide-react";

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
    name: "Semiconductor Wafer Allocation",
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
    <div className="w-full bg-white border border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-6 sm:p-8 text-black">
      {/* Header */}
      <div className="pb-6 border-b border-black/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            <span className="text-black font-semibold">CHAPTER 04</span>
            <span>·</span>
            <span>DECISION STRESSOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight mt-1">
            Experience the Decision Dilemma
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
            Drag the allocation slider to test your judgment against AI overconfidence and the mathematical sweet spot.
          </p>
        </div>

        {/* Scenario Selector */}
        <div className="flex flex-wrap gap-1.5 shrink-0">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`px-3 py-1.5 text-xs font-mono transition-all border ${
                activeScenario.id === sc.id
                  ? "bg-black text-white border-black font-semibold"
                  : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
              }`}
            >
              {sc.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="py-6 space-y-6">
        {/* Three Reference Benchmarks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-black/[0.08] bg-neutral-50/70 space-y-1">
            <span className="text-[10px] font-mono font-semibold text-neutral-500 uppercase tracking-wider block">
              Market Demand
            </span>
            <div className="text-xl font-bold text-black font-mono tabular-nums">
              {activeScenario.meanDemand.toLocaleString()} ± {activeScenario.stdDemand}
            </div>
            <span className="text-[11px] text-neutral-500 block">
              Gaussian sales distribution
            </span>
          </div>

          <div className="p-4 border border-[#FF4400]/40 bg-orange-50/40 space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono font-semibold text-[#FF4400] uppercase tracking-wider">
                AI Suggestion
              </span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-orange-100 text-[#FF4400] border border-orange-200">
                +23% SKEW
              </span>
            </div>
            <div className="text-xl font-bold text-[#FF4400] font-mono tabular-nums">
              {aiSuggested.toLocaleString()} units
            </div>
            <span className="text-[11px] text-neutral-600 block">
              Overconfident recommendation
            </span>
          </div>

          <div className="p-4 border border-[#00F0FF]/60 bg-cyan-50/40 space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono font-semibold text-cyan-800 uppercase tracking-wider">
                Optimal Sweet Spot (Q*)
              </span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-cyan-100 text-cyan-800 border border-cyan-200">
                F*(Q) = 0.727
              </span>
            </div>
            <div className="text-xl font-bold text-black font-mono tabular-nums">
              {optimalQty.toLocaleString()} units
            </div>
            <span className="text-[11px] text-neutral-600 block">
              Max expected profit equilibrium
            </span>
          </div>
        </div>

        {/* Tactile Slider Box */}
        <div className="p-5 border border-black/[0.08] bg-neutral-50/50 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <span className="text-xs font-semibold text-black uppercase tracking-wider block font-mono">
                Your Chosen Allocation
              </span>
              <span className="text-[11px] text-neutral-500">
                Slide to calibrate volume
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-black font-mono tabular-nums">
                {orderQuantity.toLocaleString()}
              </span>
              <span className="text-xs text-neutral-500 ml-1 font-mono">units</span>
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
            className="w-full h-2 bg-neutral-200 rounded-none cursor-pointer accent-black focus:outline-none"
          />

          <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
            <span>{Math.round(activeScenario.meanDemand * 0.65)} (Conservative)</span>
            <span className="font-semibold text-cyan-800">{optimalQty} (Optimal Q*)</span>
            <span className="font-semibold text-[#FF4400]">{aiSuggested} (Biased AI)</span>
            <span>{Math.round(activeScenario.meanDemand * 1.45)} (Excessive Stock)</span>
          </div>
        </div>

        {/* Diagnosis Strip */}
        <div className="p-5 border border-black/[0.08] bg-white space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/[0.06] pb-3">
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                Human Judgment Verdict
              </span>
              <div className="mt-1 flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-mono font-semibold border border-black bg-black text-white">
                  {simResult?.verdict_badge || "Calibrated Oversight"}
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                Expected Profit
              </span>
              <div className="text-xl font-bold text-black font-mono tabular-nums">
                {formatCurrency(expectedProfit)}
                {financialRegret > 150 && (
                  <span className="text-xs text-[#FF4400] font-medium ml-2">
                    (-{formatCurrency(financialRegret)} regret)
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-xs text-neutral-600 font-sans leading-relaxed">
            {simResult?.verdict_explanation ||
              "Adjust the slider above to see real-time cognitive feedback and financial return."}
          </p>

          {/* Toggle Formula */}
          <div className="pt-2 flex items-center justify-between text-xs text-neutral-500 border-t border-black/[0.06]">
            <button
              onClick={() => setShowFormula(!showFormula)}
              className="hover:text-black font-mono text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-neutral-600" />
              <span>{showFormula ? "Hide Math" : "Show Critical Fractile Formula"}</span>
            </button>
            <span className="text-[10px] text-neutral-400 font-mono">
              Simulated across N = 1,000 market iterations
            </span>
          </div>

          {showFormula && (
            <div className="p-3 bg-neutral-50 border border-neutral-200 font-mono text-[11px] text-neutral-700 space-y-1">
              <div>
                <strong>Critical Fractile:</strong> CF = (Price - Cost + Penalty) / (Price - Salvage + Penalty)
              </div>
              <div>
                <strong>Calculated:</strong> CF = ({activeScenario.sellingPrice} - {activeScenario.unitCost} + {activeScenario.stockoutPenalty}) / ({activeScenario.sellingPrice} - {activeScenario.salvageValue} + {activeScenario.stockoutPenalty}) = <strong className="text-black">{simResult?.critical_fractile || 0.6667}</strong>
              </div>
              <div>
                <strong>Optimal Target (Q*):</strong> {optimalQty} units
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

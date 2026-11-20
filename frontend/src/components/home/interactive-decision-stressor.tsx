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
    <div className="rounded-2xl border border-warm-border bg-white shadow-paper overflow-hidden">
      {/* Header */}
      <div className="p-6 sm:p-8 border-b border-warm-hairline bg-canvas/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-terracotta" />
            <span className="text-xs font-sans font-medium text-terracotta uppercase tracking-wide">
              Hands-On Simulation
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-primary tracking-tight mt-1">
            Experience the Decision Dilemma Yourself
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1.5 max-w-2xl leading-relaxed">
            Drag the slider to adjust your purchase order. Observe how the AI’s optimistic suggestion leads to hidden holding costs, and discover where the true profit sweet spot lies.
          </p>
        </div>

        {/* Tactile Scenario Selector */}
        <div className="flex flex-wrap gap-2 shrink-0">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`px-3.5 py-2 rounded-xl text-xs transition-all ${
                activeScenario.id === sc.id
                  ? "bg-ink-primary text-white shadow-xs font-medium"
                  : "bg-white text-ink-secondary border border-warm-border hover:bg-canvas-subtle"
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
          <div className="p-4 rounded-xl border border-warm-hairline bg-canvas-subtle/50 space-y-1">
            <span className="text-[11px] font-sans text-ink-muted uppercase tracking-wider block">
              Market Demand
            </span>
            <div className="font-serif text-xl font-bold text-ink-primary">
              {activeScenario.meanDemand.toLocaleString()} ± {activeScenario.stdDemand} units
            </div>
            <span className="text-xs text-ink-secondary block">
              Gaussian distribution based on sales history
            </span>
          </div>

          <div className="p-4 rounded-xl border border-warm-border bg-terracotta-light space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-sans text-terracotta-dark font-medium uppercase tracking-wider">
                AI Suggestion
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white text-terracotta-dark border border-terracotta-border">
                +23% Skew
              </span>
            </div>
            <div className="font-serif text-xl font-bold text-terracotta-dark">
              {aiSuggested.toLocaleString()} units
            </div>
            <span className="text-xs text-ink-secondary block">
              Optimistic forecast without holding penalties
            </span>
          </div>

          <div className="p-4 rounded-xl border border-sage-border bg-sage-light space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-sans text-sage font-medium uppercase tracking-wider">
                Mathematical Sweet Spot
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white text-sage border border-sage-border">
                Optimal Q*
              </span>
            </div>
            <div className="font-serif text-xl font-bold text-sage">
              {optimalQty.toLocaleString()} units
            </div>
            <span className="text-xs text-ink-secondary block">
              Max expected profit across all market scenarios
            </span>
          </div>
        </div>

        {/* Tactile Slider Box */}
        <div className="p-6 rounded-2xl border border-warm-border bg-canvas-subtle/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-ink-primary uppercase tracking-wide block">
                Your Chosen Purchase Order
              </span>
              <span className="text-xs text-ink-secondary">
                Drag the slider to test different order volumes
              </span>
            </div>
            <div className="text-right">
              <span className="font-serif text-3xl font-bold text-ink-primary tabular-nums">
                {orderQuantity.toLocaleString()}
              </span>
              <span className="text-xs text-ink-muted ml-1.5 font-sans">units</span>
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
            className="w-full h-2 bg-warm-hairline rounded-lg cursor-pointer accent-terracotta focus:outline-none"
          />

          <div className="flex justify-between text-[11px] text-ink-muted font-sans">
            <span>{Math.round(activeScenario.meanDemand * 0.65)} (Conservative)</span>
            <span className="font-medium text-sage">{optimalQty} (Optimal Sweet Spot)</span>
            <span className="font-medium text-terracotta">{aiSuggested} (Biased AI)</span>
            <span>{Math.round(activeScenario.meanDemand * 1.45)} (Excessive Stock)</span>
          </div>
        </div>

        {/* Human Feedback Card */}
        <div className="p-6 rounded-2xl border border-warm-border bg-white shadow-paper space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-warm-hairline pb-4">
            <div>
              <span className="text-[11px] text-ink-muted uppercase tracking-wider block">
                Human Judgment Diagnosis
              </span>
              <div className="mt-1 flex items-center gap-2">
                <Badge
                  variant={
                    simResult?.cognitive_diagnosis === "OPTIMAL_CALIBRATED"
                      ? "spruce"
                      : simResult?.cognitive_diagnosis === "AI_OVER_RELIANCE"
                      ? "terracotta"
                      : "neutral"
                  }
                >
                  {simResult?.verdict_badge || "Calibrated Oversight"}
                </Badge>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] text-ink-muted uppercase tracking-wider block">
                Expected Financial Outcome
              </span>
              <div className="font-serif text-2xl font-bold text-ink-primary mt-0.5 tabular-nums">
                {formatCurrency(expectedProfit)}
                {financialRegret > 150 && (
                  <span className="text-xs text-rose-700 font-sans font-medium ml-2">
                    (-{formatCurrency(financialRegret)} regret vs optimal)
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            {simResult?.verdict_explanation ||
              "Adjust the slider above to see real-time cognitive feedback and financial return."}
          </p>

          {/* Toggle Formula */}
          <div className="pt-2 flex items-center justify-between text-xs text-ink-muted border-t border-warm-hairline">
            <button
              onClick={() => setShowFormula(!showFormula)}
              className="hover:text-ink-primary font-medium flex items-center gap-1.5 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-terracotta" />
              <span>{showFormula ? "Hide Mathematical Grounding" : "Show Critical Fractile Math"}</span>
            </button>
            <span className="text-[11px] text-ink-muted">
              Simulated across N = 1,000 market iterations
            </span>
          </div>

          {showFormula && (
            <div className="p-4 rounded-xl bg-canvas-subtle/80 border border-warm-hairline font-mono text-[11px] text-ink-secondary space-y-1.5 leading-relaxed">
              <div>
                <strong>Critical Fractile Formula:</strong> CF = (Price - Cost + Penalty) / (Price - Salvage + Penalty)
              </div>
              <div>
                <strong>Calculated for this scenario:</strong> CF = ({activeScenario.sellingPrice} - {activeScenario.unitCost} + {activeScenario.stockoutPenalty}) / ({activeScenario.sellingPrice} - {activeScenario.salvageValue} + {activeScenario.stockoutPenalty}) = <strong>{simResult?.critical_fractile || 0.6667}</strong>
              </div>
              <div>
                <strong>Profit-Maximizing Target (Q*):</strong> {optimalQty} units
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

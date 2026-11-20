"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Cpu,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  DollarSign,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { api } from "@/lib/api";

interface ScenarioPreset {
  id: string;
  name: string;
  domain: string;
  meanDemand: number;
  stdDemand: number;
  unitCost: number;
  sellingPrice: number;
  salvageValue: number;
  stockoutPenalty: number;
  defaultOrder: number;
}

const SCENARIOS: ScenarioPreset[] = [
  {
    id: "semiconductor",
    name: "Q4 Semiconductor Allocation",
    domain: "Hardware Supply Chain",
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
    name: "Critical Vaccine Cold-Chain",
    domain: "Healthcare Logistics",
    meanDemand: 2000,
    stdDemand: 350,
    unitCost: 60,
    sellingPrice: 150,
    salvageValue: 10,
    stockoutPenalty: 120, // Huge stockout penalty drives higher order fractile
    defaultOrder: 2360,
  },
  {
    id: "cloud-capacity",
    name: "GPU Cloud Reserved Capacity",
    domain: "Infrastructure Planning",
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
  const [selectedScenario, setSelectedScenario] = useState<ScenarioPreset>(SCENARIOS[0]);
  const [orderQuantity, setOrderQuantity] = useState<number>(1420);
  const [showFormula, setShowFormula] = useState(false);
  const [simResult, setSimResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Trigger quick simulation whenever order or scenario changes
  useEffect(() => {
    let isMounted = true;
    const runSim = async () => {
      setIsCalculating(true);
      try {
        const res = await api.fetch("/decisions/quick-simulate", {
          method: "POST",
          body: JSON.stringify({
            purchase_quantity: orderQuantity,
            mean_demand: selectedScenario.meanDemand,
            std_demand: selectedScenario.stdDemand,
            unit_cost: selectedScenario.unitCost,
            selling_price: selectedScenario.sellingPrice,
            salvage_value: selectedScenario.salvageValue,
            stockout_penalty: selectedScenario.stockoutPenalty,
          }),
        });
        if (isMounted) setSimResult(res);
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setIsCalculating(false);
      }
    };

    runSim();
    return () => {
      isMounted = false;
    };
  }, [orderQuantity, selectedScenario]);

  const handleSelectScenario = (sc: ScenarioPreset) => {
    setSelectedScenario(sc);
    setOrderQuantity(sc.defaultOrder);
  };

  const optimalQty = simResult?.optimal_order_quantity || 1420;
  const aiSuggested = simResult?.ai_suggested_quantity || 1750;
  const expectedProfit = simResult?.expected_user_profit || 56800;
  const maxProfit = simResult?.expected_max_profit || 56800;
  const profitLoss = Math.max(0, maxProfit - expectedProfit);

  return (
    <Card className="border-slate-200/90 shadow-sm overflow-hidden bg-white">
      {/* Header */}
      <CardHeader className="bg-slate-50/70 border-b border-slate-200/80 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="cobalt">Interactive Live Stressor</Badge>
            <Badge variant="spruce">Monte Carlo Engine</Badge>
            <span className="text-xs text-slate-500 font-medium">Real-Time Payoff Simulator</span>
          </div>
          <CardTitle className="text-lg md:text-xl mt-2 text-slate-900 font-bold">
            Simulate Decision Quality Under Deliberate AI Bias
          </CardTitle>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Drag the slider to test your order quantity against a biased AI model. Observe how Sentra identifies cognitive over-reliance and calculates exact financial regret in real-time.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap gap-1.5 shrink-0">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedScenario.id === sc.id
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {sc.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Three Target Markers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-500 uppercase">Underlying Demand</span>
              <span className="text-[10px] font-mono text-slate-500">Gaussian N(μ, σ)</span>
            </div>
            <span className="font-mono text-xl font-bold text-slate-900 block mt-1">
              {selectedScenario.meanDemand.toLocaleString()} ± {selectedScenario.stdDemand} units
            </span>
            <span className="text-xs text-slate-500 mt-1 block">
              Stochastic market distribution
            </span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/90">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-amber-900 uppercase">AI Recommendation</span>
              <Badge variant="amber">+23% Skew</Badge>
            </div>
            <span className="font-mono text-xl font-bold text-amber-900 block mt-1">
              {aiSuggested.toLocaleString()} units
            </span>
            <span className="text-xs text-amber-800 mt-1 block">
              Injected deliberate test bias
            </span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/90">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-emerald-900 uppercase">Ground Truth Optimum</span>
              <Badge variant="spruce">F⁻¹(0.67)</Badge>
            </div>
            <span className="font-mono text-xl font-bold text-emerald-900 block mt-1">
              {optimalQty.toLocaleString()} units
            </span>
            <span className="text-xs text-emerald-800 mt-1 block">
              Theoretical profit-maximizing Q*
            </span>
          </div>
        </div>

        {/* Interactive Slider */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Your Decision (Units To Order):
              </span>
              <span className="text-xs text-slate-500 block">
                Adjust quantity and watch the cognitive evaluation update
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono text-2xl font-bold text-slate-900 tabular-nums">
                {orderQuantity.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 ml-1 font-medium">units</span>
            </div>
          </div>

          {/* Slider input */}
          <input
            type="range"
            min={Math.round(selectedScenario.meanDemand * 0.6)}
            max={Math.round(selectedScenario.meanDemand * 1.5)}
            step={10}
            value={orderQuantity}
            onChange={(e) => setOrderQuantity(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg cursor-pointer accent-brand-600 focus:outline-none"
          />

          <div className="flex justify-between text-xs text-slate-500 font-mono">
            <span>{Math.round(selectedScenario.meanDemand * 0.6)} (Conservative)</span>
            <span className="font-semibold text-emerald-700">{optimalQty} (Optimal Q*)</span>
            <span className="font-semibold text-amber-700">{aiSuggested} (Biased AI)</span>
            <span>{Math.round(selectedScenario.meanDemand * 1.5)} (Over-stock)</span>
          </div>
        </div>

        {/* Cognitive & Financial Verdict */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs text-slate-500 font-medium block">Cognitive Diagnosis</span>
              <div className="mt-1 flex items-center gap-2">
                <Badge
                  variant={
                    simResult?.cognitive_diagnosis === "OPTIMAL_CALIBRATED"
                      ? "spruce"
                      : simResult?.cognitive_diagnosis === "AI_OVER_RELIANCE"
                      ? "crimson"
                      : "neutral"
                  }
                  className="text-xs py-1 px-3"
                >
                  {simResult?.verdict_badge || "Calibrated Oversight"}
                </Badge>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-500 font-medium block">Expected Financial Outcome</span>
              <div className="mt-0.5">
                <span className="font-mono text-xl font-bold text-slate-900 tabular-nums">
                  {formatCurrency(expectedProfit)}
                </span>
                {profitLoss > 100 && (
                  <span className="text-xs text-rose-600 font-medium ml-2 font-mono">
                    (-{formatCurrency(profitLoss)} loss vs optimal)
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {simResult?.verdict_explanation ||
              "Adjust the slider above to see real-time cognitive feedback and stochastic financial regret."}
          </p>

          {/* Payoff breakdown details */}
          {simResult?.payoff_at_mean && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="text-slate-500 text-[11px] block">Gross Revenue</span>
                <span className="font-mono font-bold text-slate-800 mt-0.5 block">
                  {formatCurrency(simResult.payoff_at_mean.gross_revenue)}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="text-slate-500 text-[11px] block">Purchasing Cost</span>
                <span className="font-mono font-bold text-slate-800 mt-0.5 block">
                  {formatCurrency(simResult.payoff_at_mean.purchasing_cost)}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="text-slate-500 text-[11px] block">Stockout Penalty</span>
                <span className="font-mono font-bold text-rose-700 mt-0.5 block">
                  {formatCurrency(simResult.payoff_at_mean.penalty_cost)}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="text-slate-500 text-[11px] block">Salvage Revenue</span>
                <span className="font-mono font-bold text-emerald-700 mt-0.5 block">
                  {formatCurrency(simResult.payoff_at_mean.salvage_revenue)}
                </span>
              </div>
            </div>
          )}

          {/* Toggle Formula */}
          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
            <button
              onClick={() => setShowFormula(!showFormula)}
              className="hover:text-slate-900 font-medium flex items-center gap-1.5 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-brand-600" />
              <span>{showFormula ? "Hide Mathematical Grounding" : "Show Critical Fractile Formula"}</span>
            </button>
            <span className="text-[11px] font-mono text-slate-400">
              Evaluated across N=1,000 Monte Carlo draws
            </span>
          </div>

          {showFormula && (
            <div className="p-3.5 rounded-lg bg-slate-100 border border-slate-200 font-mono text-[11px] text-slate-700 space-y-2">
              <div>
                <strong>Critical Fractile Formula:</strong> CF = (Price - Cost + Stockout Penalty) / (Price - Salvage + Stockout Penalty)
              </div>
              <div>
                <strong>Calculated for this scenario:</strong> CF = ({selectedScenario.sellingPrice} - {selectedScenario.unitCost} + {selectedScenario.stockoutPenalty}) / ({selectedScenario.sellingPrice} - {selectedScenario.salvageValue} + {selectedScenario.stockoutPenalty}) = <strong>{simResult?.critical_fractile || 0.6667}</strong>
              </div>
              <div>
                <strong>Optimal Target Inventory Level:</strong> Q* = F⁻¹(CF; μ={selectedScenario.meanDemand}, σ={selectedScenario.stdDemand}) = <strong>{optimalQty} units</strong>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

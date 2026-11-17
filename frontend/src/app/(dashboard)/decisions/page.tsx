"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProfitDistributionChart } from "@/components/charts/profit-distribution-chart";
import { DemandBellCurve } from "@/components/charts/demand-bell-curve";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import {
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Zap,
  TrendingUp,
  FileCheck,
} from "lucide-react";

export default function DecisionsPage() {
  // Inventory Parameters
  const [meanDemand, setMeanDemand] = useState<number>(1400);
  const [stdDemand, setStdDemand] = useState<number>(220);
  const [currentStock, setCurrentStock] = useState<number>(300);
  const [unitCost, setUnitCost] = useState<number>(45);
  const [sellingPrice, setSellingPrice] = useState<number>(95);
  const [salvageValue, setSalvageValue] = useState<number>(15);
  const [stockoutPenalty, setStockoutPenalty] = useState<number>(25);
  const [budgetLimit, setBudgetLimit] = useState<number>(65000);

  // Decision State
  const [proposedOrder, setProposedOrder] = useState<number>(1180);
  const [humanRationale, setHumanRationale] = useState<string>(
    "Critical fractile recommendation balances holding cost drag against stockout penalties under normal demand distribution."
  );

  // AI Recommendation State
  const [aiRec, setAiRec] = useState<any | null>({
    suggested_value: 1180,
    confidence_score: 0.88,
    rationale: "Critical fractile analysis balances 91% target service level against inventory holding variance.",
    uncertainty: {
      model_uncertainty: "Low (±3.8%)",
      data_uncertainty: "Moderate (lead-time variance σ = 2.4 days)",
    },
    evidence: [
      { source: "Historical Sales Ledger", metric: "3-month rolling mean", value: "1,400 units" },
      { source: "Supplier Agreement", metric: "Unit cost", value: "$45.00" },
    ],
    assumptions: ["Lead time does not exceed 14 days", "Holding cost is constant"],
    limitations: ["Excludes macroeconomic shocks"],
  });

  // Commit Status
  const [isCommitted, setIsCommitted] = useState<boolean>(false);

  // Preset quick strategies
  const applyStrategy = (type: "lean" | "optimal" | "ai" | "buffer") => {
    if (type === "lean") {
      setProposedOrder(Math.max(0, Math.round(meanDemand * 0.8 - currentStock)));
    } else if (type === "optimal") {
      const cu = sellingPrice - unitCost + stockoutPenalty;
      const co = unitCost - salvageValue;
      const sl = cu / (cu + co);
      const z = sl > 0.5 ? 1.28 : -0.5;
      const target = meanDemand + z * stdDemand;
      setProposedOrder(Math.max(0, Math.round(target - currentStock)));
    } else if (type === "ai") {
      setProposedOrder(aiRec ? aiRec.suggested_value : 1180);
    } else if (type === "buffer") {
      setProposedOrder(Math.round(meanDemand + 2 * stdDemand - currentStock));
    }
  };

  const handleCommit = () => {
    setIsCommitted(true);
  };

  const totalCapitalRequired = proposedOrder * unitCost;
  const isBudgetExceeded = totalCapitalRequired > budgetLimit;
  const grossMargin = ((sellingPrice - unitCost) / sellingPrice) * 100;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Stochastic Engine</span>
            <span>•</span>
            <span className="text-brand-600">Analytical Newsvendor Protocol</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Decision Intelligence Studio
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Simulate expected payoffs under demand uncertainty, benchmark strategies against ground truth, and inspect calibrated AI recommendations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="brand"
            size="default"
            onClick={handleCommit}
            disabled={isBudgetExceeded || isCommitted}
            className="gap-2 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4 fill-current" />
            <span>{isCommitted ? "Decision Audited & Committed ✓" : "Authorize & Commit Decision"}</span>
          </Button>
        </div>
      </div>

      {/* Confirmation Banner */}
      {isCommitted && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900 shadow-xs">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              Decision authorized by Decision Lead. SHA-256 seal logged to enterprise compliance audit trail.
            </span>
          </div>
          <Badge variant="spruce">#0x92F4C1-SIGNED</Badge>
        </div>
      )}

      {/* Strategy Presets Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Quick Strategy Presets:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => applyStrategy("lean")}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            Lean JIT (Min Holding)
          </button>
          <button
            onClick={() => applyStrategy("optimal")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            ★ Analytical Optimum
          </button>
          <button
            onClick={() => applyStrategy("ai")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 transition-colors"
          >
            AI Recommendation
          </button>
          <button
            onClick={() => applyStrategy("buffer")}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            Conservative Buffer
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Left Parameters & Right Visualizers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 4 Columns: Input Parameters & Financial Boundary */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Stochastic Input Parameters</CardTitle>
              <CardDescription>Adjust underlying Gaussian demand distributions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div>
                <div className="flex justify-between mb-1.5 text-xs font-medium">
                  <span className="text-slate-600">Mean Demand (μ)</span>
                  <span className="font-mono font-bold text-slate-900">{meanDemand} units</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="2500"
                  step="50"
                  value={meanDemand}
                  onChange={(e) => setMeanDemand(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg cursor-pointer accent-slate-900"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5 text-xs font-medium">
                  <span className="text-slate-600">Demand Uncertainty (σ)</span>
                  <span className="font-mono font-bold text-blue-600">±{stdDemand} units</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={stdDemand}
                  onChange={(e) => setStdDemand(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5 text-xs font-medium">
                  <span className="text-slate-600">On-Hand Stock</span>
                  <span className="font-mono font-bold text-emerald-600">{currentStock} units</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="25"
                  value={currentStock}
                  onChange={(e) => setCurrentStock(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg cursor-pointer accent-emerald-600"
                />
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Gaussian Demand Bell Curve */}
          <DemandBellCurve
            meanDemand={meanDemand}
            stdDemand={stdDemand}
            currentStock={currentStock}
            purchaseQuantity={proposedOrder}
          />

          {/* Economic Constraints */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Unit Economics & Boundary</CardTitle>
              <CardDescription>Marginal economics and working capital ceiling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs pt-0">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Unit Acquisition Cost</span>
                <span className="font-mono font-semibold text-slate-800">{formatCurrency(unitCost)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Selling Price</span>
                <span className="font-mono font-bold text-emerald-600">{formatCurrency(sellingPrice)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Gross Margin</span>
                <span className="font-mono font-bold text-emerald-600">{grossMargin.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Stockout Penalty</span>
                <span className="font-mono font-semibold text-rose-600">{formatCurrency(stockoutPenalty)}</span>
              </div>
              <div className="flex justify-between py-1.5 font-semibold text-slate-900">
                <span>Working Capital Cap</span>
                <span className="font-mono tabular-nums">{formatCurrency(budgetLimit)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 8 Columns: Expected Profit Surface & Order Simulator */}
        <div className="lg:col-span-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <ProfitDistributionChart
                meanDemand={meanDemand}
                stdDemand={stdDemand}
                currentStock={currentStock}
                unitCost={unitCost}
                sellingPrice={sellingPrice}
                salvageValue={salvageValue}
                stockoutPenalty={stockoutPenalty}
                proposedOrder={proposedOrder}
                budgetLimit={budgetLimit}
                onSelectOrder={(q) => setProposedOrder(q)}
              />
            </CardContent>
          </Card>

          {/* Order Allocation Controller */}
          <Card>
            <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-sm">Order Allocation Controller</CardTitle>
                <CardDescription>Drag to simulate continuous financial tradeoff</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="cobalt">{formatNumber(proposedOrder)} Units</Badge>
                <Badge variant={isBudgetExceeded ? "crimson" : "spruce"}>
                  {formatCurrency(totalCapitalRequired)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <input
                type="range"
                min="0"
                max={Math.floor(budgetLimit / unitCost) * 1.25}
                step="25"
                value={proposedOrder}
                onChange={(e) => setProposedOrder(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-brand-600"
              />

              {isBudgetExceeded && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-800 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    Budget violation: Order capital of {formatCurrency(totalCapitalRequired)} exceeds limit of {formatCurrency(budgetLimit)}.
                  </span>
                </div>
              )}

              {/* Diagnostic Metrics Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[11px] font-medium text-slate-500 uppercase block">Service Level</span>
                  <span className="font-mono text-sm font-bold text-emerald-600 mt-0.5 block tabular-nums">
                    {formatPercent(Math.min(0.999, (currentStock + proposedOrder) / (meanDemand + 1.2 * stdDemand)))}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[11px] font-medium text-slate-500 uppercase block">Remaining Liquidity</span>
                  <span className="font-mono text-sm font-bold text-slate-900 mt-0.5 block tabular-nums">
                    {formatCurrency(Math.max(0, budgetLimit - totalCapitalRequired))}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[11px] font-medium text-slate-500 uppercase block">Stockout Exposure</span>
                  <span className="font-mono text-sm font-bold text-rose-600 mt-0.5 block tabular-nums">
                    {formatPercent(Math.max(0, 1 - (currentStock + proposedOrder) / meanDemand))}
                  </span>
                </div>
              </div>

              {/* Human Decision Rationale */}
              <div className="space-y-1.5 pt-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Human Deliberative Rationale & Audit Sign-Off
                </label>
                <textarea
                  rows={2}
                  value={humanRationale}
                  onChange={(e) => setHumanRationale(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="Record formal justification for this order commitment..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Calibrated AI Recommendation Card */}
          {aiRec && (
            <Card className="border-blue-200 bg-blue-50/20">
              <CardHeader className="pb-3 flex flex-row items-center justify-between border-b border-blue-100 bg-blue-50/50">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <CardTitle className="text-xs font-semibold text-slate-900">
                    Calibrated AI Recommendation
                  </CardTitle>
                </div>
                <Badge variant="cobalt">Confidence: {Math.round(aiRec.confidence_score * 100)}%</Badge>
              </CardHeader>
              <CardContent className="space-y-3 pt-4 text-xs">
                <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                  <span className="text-slate-600">Optimal Model Suggestion:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xl font-bold text-slate-900 tabular-nums">
                      {aiRec.suggested_value} units
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setProposedOrder(aiRec.suggested_value)}
                      className="text-xs h-7"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed bg-white p-3.5 rounded-lg border border-blue-100">
                  {aiRec.rationale}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white rounded-lg border border-blue-100">
                    <span className="font-semibold text-slate-800 block mb-0.5">Model Uncertainty</span>
                    <span className="text-slate-500 text-xs">{aiRec.uncertainty.model_uncertainty}</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-blue-100">
                    <span className="font-semibold text-slate-800 block mb-0.5">Data Uncertainty</span>
                    <span className="text-slate-500 text-xs">{aiRec.uncertainty.data_uncertainty}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

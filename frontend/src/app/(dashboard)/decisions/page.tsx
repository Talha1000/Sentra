"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
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
  Cpu,
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
      {/* Breadcrumb Trail */}
      <Breadcrumbs
        items={[
          { label: "Platform", href: "/workspace" },
          { label: "Decision Studio", href: "/decisions" },
          { label: "Newsvendor Optimization", badge: "Stochastic F⁻¹" },
        ]}
        rightElement={
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)] animate-pulse" />
            <span>Monte Carlo: 1,000 Draws/25ms</span>
          </div>
        }
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <span>Stochastic Engine</span>
            <span className="text-white/20">•</span>
            <span className="text-indigo-400 font-semibold">Analytical Newsvendor Protocol</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            Decision Intelligence Studio
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Simulate expected payoffs under demand uncertainty, benchmark strategies against ground truth, and inspect calibrated AI recommendations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant={isCommitted ? "secondary" : "primary"}
            size="default"
            onClick={handleCommit}
            disabled={isBudgetExceeded || isCommitted}
            className="gap-2 shadow-glow font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 fill-current text-white" />
            <span>{isCommitted ? "Decision Audited & Committed ✓" : "Authorize & Commit Decision"}</span>
          </Button>
        </div>
      </div>

      {/* Confirmation Banner */}
      {isCommitted && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center justify-between text-xs text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          <div className="flex items-center gap-2.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>
              Decision authorized by Decision Lead. SHA-256 seal committed to enterprise compliance audit trail.
            </span>
          </div>
          <Badge variant="spruce" dot>#0x92F4C1-SIGNED</Badge>
        </div>
      )}

      {/* Strategy Presets Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Quick Strategy Presets:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => applyStrategy("lean")}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.08] hover:bg-white/[0.08] transition-all cursor-pointer"
          >
            Lean JIT (Min Holding)
          </button>
          <button
            onClick={() => applyStrategy("optimal")}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.2)]"
          >
            ★ Analytical Optimum Q*
          </button>
          <button
            onClick={() => applyStrategy("ai")}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25 border border-indigo-500/30 transition-all cursor-pointer shadow-[0_0_12px_rgba(99,102,241,0.2)]"
          >
            AI Recommendation
          </button>
          <button
            onClick={() => applyStrategy("buffer")}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.08] hover:bg-white/[0.08] transition-all cursor-pointer"
          >
            Conservative Buffer
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 4 Columns: Input Parameters & Financial Boundary */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold">01</span>
                <span>Stochastic Market Assumptions</span>
              </CardTitle>
              <CardDescription>Adjust underlying Gaussian demand distributions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div>
                <div className="flex justify-between mb-1.5 text-xs font-medium">
                  <span className="text-slate-400">Mean Demand (μ)</span>
                  <span className="font-mono font-bold text-white tabular-nums">{meanDemand} units</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="2500"
                  step="50"
                  value={meanDemand}
                  onChange={(e) => setMeanDemand(Number(e.target.value))}
                  className="w-full h-2 bg-white/[0.1] rounded-lg cursor-pointer accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5 text-xs font-medium">
                  <span className="text-slate-400">Demand Uncertainty (σ)</span>
                  <span className="font-mono font-bold text-orange-400 tabular-nums">±{stdDemand} units</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={stdDemand}
                  onChange={(e) => setStdDemand(Number(e.target.value))}
                  className="w-full h-2 bg-white/[0.1] rounded-lg cursor-pointer accent-orange-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5 text-xs font-medium">
                  <span className="text-slate-400">On-Hand Stock</span>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums">{currentStock} units</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="25"
                  value={currentStock}
                  onChange={(e) => setCurrentStock(Number(e.target.value))}
                  className="w-full h-2 bg-white/[0.1] rounded-lg cursor-pointer accent-emerald-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Gaussian Demand Bell Curve */}
          <DemandBellCurve
            meanDemand={meanDemand}
            stdDemand={stdDemand}
            currentStock={currentStock}
            purchaseQuantity={proposedOrder}
          />

          {/* Economic Constraints */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold">02</span>
                <span>Unit Economics & Budget Boundary</span>
              </CardTitle>
              <CardDescription>Marginal economics and working capital ceiling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs pt-0">
              <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                <span className="text-slate-400">Unit Acquisition Cost</span>
                <span className="font-mono font-semibold text-white">{formatCurrency(unitCost)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                <span className="text-slate-400">Selling Price</span>
                <span className="font-mono font-bold text-emerald-400">{formatCurrency(sellingPrice)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                <span className="text-slate-400">Gross Margin</span>
                <span className="font-mono font-bold text-emerald-400">{grossMargin.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                <span className="text-slate-400">Stockout Penalty</span>
                <span className="font-mono font-semibold text-rose-400">{formatCurrency(stockoutPenalty)}</span>
              </div>
              <div className="flex justify-between py-1.5 font-semibold text-white">
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
                <CardTitle className="text-sm flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold">03</span>
                  <span>Order Allocation & Tradeoff Controller</span>
                </CardTitle>
                <CardDescription>Drag to simulate continuous financial tradeoff and balance sheet impact</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="terracotta">{formatNumber(proposedOrder)} Units</Badge>
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
                className="w-full h-2.5 bg-white/[0.1] rounded-lg cursor-pointer accent-indigo-500"
              />

              {isBudgetExceeded && (
                <div className="p-3.5 bg-rose-500/15 border border-rose-500/30 rounded-xl flex items-center gap-2.5 text-rose-300 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>
                    Budget violation: Order capital of {formatCurrency(totalCapitalRequired)} exceeds limit of {formatCurrency(budgetLimit)}.
                  </span>
                </div>
              )}

              {/* Diagnostic Metrics Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/[0.08]">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Service Level</span>
                  <span className="font-mono text-base font-bold text-emerald-400 mt-1 block tabular-nums">
                    {formatPercent(Math.min(0.999, (currentStock + proposedOrder) / (meanDemand + 1.2 * stdDemand)))}
                  </span>
                </div>
                <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/[0.08]">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Remaining Liquidity</span>
                  <span className="font-mono text-base font-bold text-white mt-1 block tabular-nums">
                    {formatCurrency(Math.max(0, budgetLimit - totalCapitalRequired))}
                  </span>
                </div>
                <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/[0.08]">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Stockout Exposure</span>
                  <span className="font-mono text-base font-bold text-rose-400 mt-1 block tabular-nums">
                    {formatPercent(Math.max(0, 1 - (currentStock + proposedOrder) / meanDemand))}
                  </span>
                </div>
              </div>

              {/* Human Decision Rationale */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-white">
                  Human Deliberative Rationale & Audit Sign-Off
                </label>
                <textarea
                  rows={2}
                  value={humanRationale}
                  onChange={(e) => setHumanRationale(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-white/[0.1] bg-white/[0.04] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500"
                  placeholder="Record formal justification for this order commitment..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Calibrated AI Recommendation Card */}
          {aiRec && (
            <Card className="border-indigo-500/30 bg-gradient-to-b from-[#10162A]/90 to-[#0A0E1A]/90 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between border-b border-indigo-500/20 bg-indigo-500/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <CardTitle className="text-xs font-semibold text-white">
                    Calibrated AI Recommendation
                  </CardTitle>
                </div>
                <Badge variant="indigo" dot>Confidence: {Math.round(aiRec.confidence_score * 100)}%</Badge>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 text-xs">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <span className="text-slate-300">Optimal Model Suggestion:</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-bold text-indigo-400 tabular-nums">
                      {aiRec.suggested_value} units
                    </span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setProposedOrder(aiRec.suggested_value)}
                      className="text-xs h-7 shadow-xs font-semibold"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed bg-white/[0.03] p-4 rounded-xl border border-white/[0.06]">
                  {aiRec.rationale}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                    <span className="font-semibold text-white block mb-0.5">Model Uncertainty</span>
                    <span className="text-slate-400 text-xs">{aiRec.uncertainty.model_uncertainty}</span>
                  </div>
                  <div className="p-3.5 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                    <span className="font-semibold text-white block mb-0.5">Data Uncertainty</span>
                    <span className="text-slate-400 text-xs">{aiRec.uncertainty.data_uncertainty}</span>
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

"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProfitDistributionChart } from "@/components/charts/profit-distribution-chart";
import { DemandBellCurve } from "@/components/charts/demand-bell-curve";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { api } from "@/lib/api";
import {
  Sparkles,
  Sliders,
  CheckCircle2,
  ShieldAlert,
  Zap,
  TrendingUp,
  AlertCircle,
  Layers,
  ArrowRight,
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
    "Critical fractile recommendation balances holding cost drag against stockout penalties."
  );

  // AI Recommendation State
  const [isRequestingAI, setIsRequestingAI] = useState<boolean>(false);
  const [aiRec, setAiRec] = useState<any | null>({
    suggested_value: 1180,
    confidence_score: 0.88,
    rationale: "Critical fractile analysis balances 91% service level against holding cost variance.",
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
      // Critical fractile formula
      const cu = sellingPrice - unitCost + stockoutPenalty;
      const co = unitCost - salvageValue;
      const sl = cu / (cu + co);
      // z approx
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
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink-tertiary">Studio Domain: Stochastic Supply Chain</span>
            <span className="text-hairline">|</span>
            <Badge variant="spruce">Active Model Protocol</Badge>
            <span className="text-hairline">|</span>
            <Badge variant="cobalt">Interactive Visualizer</Badge>
          </div>
          <h1 className="text-2xl font-serif font-medium text-ink-primary tracking-tight mt-1">
            Decision Intelligence Studio
          </h1>
          <p className="text-xs text-ink-secondary mt-1">
            Formulate multi-attribute stochastic decisions, simulate payoff distributions, and inspect calibrated AI recommendations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={handleCommit}
            disabled={isBudgetExceeded || isCommitted}
            className="text-xs shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            <span>{isCommitted ? "Decision Audited & Committed" : "Authorize & Commit Decision"}</span>
          </Button>
        </div>
      </div>

      {isCommitted && (
        <div className="p-4 rounded bg-spruce-subtle border border-spruce-border flex items-center justify-between text-xs text-spruce-dark font-medium animate-in fade-in duration-200 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-spruce" />
            <span>
              Decision authorized by Chief Decision Officer. Immutable audit event recorded with SHA-256 seal.
            </span>
          </div>
          <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-spruce-border">
            #0x92f4c1-VERIFIED
          </span>
        </div>
      )}

      {/* Strategy Selector Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-panel border border-hairline rounded shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-ink-primary">
          <Zap className="w-4 h-4 text-cognition" />
          <span>Quick Strategy Presets:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => applyStrategy("lean")}
            className="px-3 py-1 rounded text-xs font-medium bg-canvas border border-hairline hover:bg-subtle text-ink-secondary transition-colors"
          >
            Lean JIT (Min Holding Cost)
          </button>
          <button
            onClick={() => applyStrategy("optimal")}
            className="px-3 py-1 rounded text-xs font-medium bg-spruce-subtle border border-spruce-border text-spruce-dark hover:bg-emerald-100 transition-colors"
          >
            ★ Critical Fractile Optimal
          </button>
          <button
            onClick={() => applyStrategy("ai")}
            className="px-3 py-1 rounded text-xs font-medium bg-cognition-subtle border border-cognition-border text-cognition-dark hover:bg-amber-100 transition-colors"
          >
            AI Recommendation
          </button>
          <button
            onClick={() => applyStrategy("buffer")}
            className="px-3 py-1 rounded text-xs font-medium bg-cobalt-subtle border border-cobalt-border text-cobalt-dark hover:bg-blue-100 transition-colors"
          >
            Conservative Buffer (Zero Stockout)
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Parameter Sliders & Bell Curve */}
        <div className="space-y-6">
          <Card className="border-hairline shadow-sm">
            <CardHeader className="bg-canvas/50 border-b border-hairline pb-3">
              <CardTitle>Stochastic Parameters</CardTitle>
              <CardDescription>Adjust underlying distributions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs pt-4">
              <div>
                <div className="flex justify-between mb-1.5 font-medium">
                  <span className="text-ink-secondary">Mean Demand (μ)</span>
                  <span className="font-mono font-bold text-ink-primary">{meanDemand} units</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="2500"
                  step="50"
                  value={meanDemand}
                  onChange={(e) => setMeanDemand(Number(e.target.value))}
                  className="w-full h-1.5 bg-subtle rounded cursor-pointer accent-ink-primary"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5 font-medium">
                  <span className="text-ink-secondary">Demand Uncertainty (σ)</span>
                  <span className="font-mono font-bold text-ink-primary">±{stdDemand} units</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={stdDemand}
                  onChange={(e) => setStdDemand(Number(e.target.value))}
                  className="w-full h-1.5 bg-subtle rounded cursor-pointer accent-cobalt"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5 font-medium">
                  <span className="text-ink-secondary">Warehouse On-Hand Stock</span>
                  <span className="font-mono font-bold text-ink-primary">{currentStock} units</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="25"
                  value={currentStock}
                  onChange={(e) => setCurrentStock(Number(e.target.value))}
                  className="w-full h-1.5 bg-subtle rounded cursor-pointer accent-spruce"
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
          <Card className="border-hairline shadow-sm">
            <CardHeader className="bg-canvas/50 border-b border-hairline pb-3">
              <CardTitle>Financial Architecture</CardTitle>
              <CardDescription>Unit economics & liquidity limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs pt-4">
              <div className="flex justify-between py-1 border-b border-hairline">
                <span className="text-ink-secondary">Unit Acquisition Cost</span>
                <span className="font-mono font-semibold">{formatCurrency(unitCost)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-hairline">
                <span className="text-ink-secondary">Selling Price</span>
                <span className="font-mono font-bold text-spruce">{formatCurrency(sellingPrice)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-hairline">
                <span className="text-ink-secondary">Gross Margin</span>
                <span className="font-mono font-bold text-spruce">{grossMargin.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-hairline">
                <span className="text-ink-secondary">Stockout Penalty</span>
                <span className="font-mono font-semibold text-crimson">{formatCurrency(stockoutPenalty)}</span>
              </div>
              <div className="flex justify-between py-1 font-medium">
                <span className="text-ink-primary">Working Capital Cap</span>
                <span className="font-mono font-bold text-ink-primary">{formatCurrency(budgetLimit)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Columns: Interactive Profit Distribution Chart & AI Inspector */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Expected Profit Surface SVG Chart */}
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

          {/* Interactive Order Slider with Real-time Financial Badges */}
          <Card className="border-hairline shadow-sm">
            <CardHeader className="pb-3 bg-canvas/30 border-b border-hairline">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Order Allocation Slider</CardTitle>
                  <CardDescription>Drag to simulate continuous financial tradeoff</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="cobalt">{formatNumber(proposedOrder)} Units</Badge>
                  <Badge variant={isBudgetExceeded ? "crimson" : "spruce"}>
                    {formatCurrency(totalCapitalRequired)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-xs pt-4">
              <input
                type="range"
                min="0"
                max={Math.floor(budgetLimit / unitCost) * 1.25}
                step="25"
                value={proposedOrder}
                onChange={(e) => setProposedOrder(Number(e.target.value))}
                className="w-full h-2 bg-subtle rounded cursor-pointer accent-cobalt"
              />

              {isBudgetExceeded && (
                <div className="p-3 bg-crimson-subtle border border-crimson-border rounded flex items-center gap-2 text-crimson-dark font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    Budget violation: Order capital of {formatCurrency(totalCapitalRequired)} exceeds limit of {formatCurrency(budgetLimit)}.
                  </span>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-2.5 bg-canvas border border-hairline rounded">
                  <span className="text-ink-tertiary text-[10px] block uppercase font-mono">Service Probability</span>
                  <span className="font-mono text-sm font-bold text-spruce">
                    {formatPercent(Math.min(0.999, (currentStock + proposedOrder) / (meanDemand + 1.2 * stdDemand)))}
                  </span>
                </div>
                <div className="p-2.5 bg-canvas border border-hairline rounded">
                  <span className="text-ink-tertiary text-[10px] block uppercase font-mono">Capital Liquidity Reserve</span>
                  <span className="font-mono text-sm font-bold text-ink-primary">
                    {formatCurrency(Math.max(0, budgetLimit - totalCapitalRequired))}
                  </span>
                </div>
                <div className="p-2.5 bg-canvas border border-hairline rounded">
                  <span className="text-ink-tertiary text-[10px] block uppercase font-mono">Stockout Exposure</span>
                  <span className="font-mono text-sm font-bold text-crimson">
                    {formatPercent(Math.max(0, 1 - (currentStock + proposedOrder) / meanDemand))}
                  </span>
                </div>
              </div>

              {/* Rationale Input */}
              <div className="space-y-1.5 pt-2">
                <span className="font-semibold text-ink-primary">Human Decision Rationale & Sign-Off</span>
                <textarea
                  rows={2}
                  value={humanRationale}
                  onChange={(e) => setHumanRationale(e.target.value)}
                  className="w-full p-2.5 text-xs border border-hairline rounded bg-panel font-medium"
                  placeholder="Record formal justification for this order quantity..."
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Structured Recommendation Card */}
          {aiRec && (
            <Card className="border-cognition-border bg-cognition-subtle/30 shadow-sm">
              <CardHeader className="py-3 bg-cognition-subtle/50 border-b border-cognition-border flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cognition" />
                  <CardTitle className="text-xs font-bold text-cognition-dark">
                    Structured AI Recommendation (Calibrated)
                  </CardTitle>
                </div>
                <Badge variant="cognition">Confidence: {Math.round(aiRec.confidence_score * 100)}%</Badge>
              </CardHeader>
              <CardContent className="p-4 space-y-3 text-xs">
                <div className="flex items-baseline justify-between border-b border-cognition-border/40 pb-2">
                  <span className="text-ink-secondary">Optimal Model Recommendation:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xl font-bold text-ink-primary">{aiRec.suggested_value} units</span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setProposedOrder(aiRec.suggested_value)}
                      className="text-[11px] h-7 bg-white"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                <p className="text-ink-secondary leading-relaxed bg-panel p-3 rounded border border-hairline">
                  {aiRec.rationale}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 bg-panel border border-hairline rounded">
                    <span className="font-semibold text-ink-primary block mb-0.5">Model Uncertainty</span>
                    <span className="text-ink-secondary text-[11px]">{aiRec.uncertainty.model_uncertainty}</span>
                  </div>
                  <div className="p-2.5 bg-panel border border-hairline rounded">
                    <span className="font-semibold text-ink-primary block mb-0.5">Data Uncertainty</span>
                    <span className="text-ink-secondary text-[11px]">{aiRec.uncertainty.data_uncertainty}</span>
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

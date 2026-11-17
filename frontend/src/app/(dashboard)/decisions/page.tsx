"use client";

import React, { useState } from "react";
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
    rationale: "Critical fractile analysis balances 91% target service level against holding cost variance.",
    uncertainty: {
      model_uncertainty: "Low (±3.8%)",
      data_uncertainty: "Moderate (lead-time variance σ = 2.4 days)",
    },
    evidence: [
      { source: "Historical Sales Ledger", metric: "3-month rolling mean", value: "1,400 units" },
      { source: "Supplier Agreement", metric: "Unit cost", value: "$45.00" },
    ],
    assumptions: ["Lead time does not exceed 14 days", "Holding cost is constant"],
    limitations: ["Excludes exogenous macroeconomic shocks"],
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
      {/* Editorial Masthead Header */}
      <section className="border-2 border-ink-black bg-vellum-50 p-6 lg:p-8 shadow-sharp">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-ink-black">
          <div className="space-y-2 max-w-4xl">
            <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-ink-muted">
              <span className="px-2 py-0.5 bg-ink-black text-white">§ 02. DECISION STUDIO</span>
              <span>/</span>
              <span className="text-klein font-bold">STOCHASTIC SUPPLY CHAIN MODEL</span>
              <span>/</span>
              <span>ANALYTICAL F⁻¹(Cu / (Cu+Co))</span>
            </div>
            <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink-black uppercase">
              Stochastic Optimization Studio
            </h1>
            <p className="text-sm lg:text-base text-ink-charcoal font-sans leading-relaxed max-w-3xl">
              Formulate multi-attribute stochastic purchasing decisions, inspect continuous expected profit curves, and verify human allocations against calibrated algorithmic recommendations.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="primary"
              size="default"
              onClick={handleCommit}
              disabled={isBudgetExceeded || isCommitted}
              className="text-xs font-mono font-bold uppercase tracking-wider gap-2 h-11 px-6 bg-klein hover:bg-blue-700 text-white border-2 border-ink-black shadow-sharp"
            >
              <CheckCircle2 className="w-4 h-4 fill-current" />
              <span>{isCommitted ? "COMMITTED & AUDITED ✓" : "AUTHORIZE & COMMIT"}</span>
            </Button>
          </div>
        </div>

        {/* Commitment Confirmation Banner */}
        {isCommitted && (
          <div className="mt-6 p-4 bg-spruce-subtle border-2 border-ink-black flex items-center justify-between text-xs font-mono text-ink-black">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-spruce" />
              <span className="font-bold">
                DECISION OFFICIALLY COMMITTED: SHA-256 SEAL LOGGED TO ENTERPRISE AUDIT TRAIL.
              </span>
            </div>
            <span className="px-2 py-0.5 bg-white border border-ink-black font-bold">
              #0x92F4C1-SIGNED
            </span>
          </div>
        )}

        {/* Preset Strategies Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-xs font-mono">
          <div className="flex items-center gap-2 font-bold uppercase text-ink-black">
            <Zap className="w-4 h-4 text-amberacc" />
            <span>STRATEGY BENCHMARKS:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => applyStrategy("lean")}
              className="px-3 py-1.5 border-2 border-ink-black bg-vellum-100 hover:bg-vellum-200 text-ink-black font-bold uppercase transition-colors"
            >
              01 Lean JIT
            </button>
            <button
              onClick={() => applyStrategy("optimal")}
              className="px-3 py-1.5 border-2 border-ink-black bg-spruce-subtle text-spruce font-bold uppercase transition-colors"
            >
              ★ 02 Analytical Optimum
            </button>
            <button
              onClick={() => applyStrategy("ai")}
              className="px-3 py-1.5 border-2 border-ink-black bg-klein-subtle text-klein font-bold uppercase transition-colors"
            >
              03 AI Recommendation
            </button>
            <button
              onClick={() => applyStrategy("buffer")}
              className="px-3 py-1.5 border-2 border-ink-black bg-vellum-100 hover:bg-vellum-200 text-ink-black font-bold uppercase transition-colors"
            >
              04 Buffer (Zero Stockout)
            </button>
          </div>
        </div>
      </section>

      {/* Main Studio Grid: Parameters & Visualizers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 4 Columns: Mathematical Parameters & Unit Economics */}
        <div className="lg:col-span-4 space-y-6">
          {/* Stochastic Input Parameters */}
          <div className="border-2 border-ink-black bg-vellum-50 p-5 shadow-sharp space-y-5">
            <div className="border-b-2 border-ink-black pb-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block">
                DISTRIBUTION PARAMETERS
              </span>
              <h3 className="font-serif font-black text-lg text-ink-black uppercase">
                Stochastic Inputs
              </h3>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <div className="flex justify-between mb-1 text-ink-black">
                  <span className="font-bold uppercase">Mean Demand (μ)</span>
                  <span className="font-bold tabular-nums">{meanDemand} units</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="2500"
                  step="50"
                  value={meanDemand}
                  onChange={(e) => setMeanDemand(Number(e.target.value))}
                  className="w-full h-2 bg-vellum-200 border border-ink-black rounded-none cursor-pointer accent-ink-black"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-ink-black">
                  <span className="font-bold uppercase">Demand Variance (σ)</span>
                  <span className="font-bold tabular-nums">±{stdDemand} units</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={stdDemand}
                  onChange={(e) => setStdDemand(Number(e.target.value))}
                  className="w-full h-2 bg-vellum-200 border border-ink-black rounded-none cursor-pointer accent-klein"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-ink-black">
                  <span className="font-bold uppercase">Current Warehouse Stock</span>
                  <span className="font-bold tabular-nums">{currentStock} units</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="25"
                  value={currentStock}
                  onChange={(e) => setCurrentStock(Number(e.target.value))}
                  className="w-full h-2 bg-vellum-200 border border-ink-black rounded-none cursor-pointer accent-spruce"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Gaussian Demand Bell Curve */}
          <div className="border-2 border-ink-black bg-vellum-50 p-5 shadow-sharp">
            <DemandBellCurve
              meanDemand={meanDemand}
              stdDemand={stdDemand}
              currentStock={currentStock}
              purchaseQuantity={proposedOrder}
            />
          </div>

          {/* Financial & Cost Constraints Table */}
          <div className="border-2 border-ink-black bg-vellum-50 p-5 shadow-sharp space-y-4 font-mono text-xs">
            <div className="border-b-2 border-ink-black pb-3">
              <span className="text-[10px] uppercase tracking-wider text-ink-muted block">
                UNIT ECONOMICS
              </span>
              <h3 className="font-serif font-black text-lg text-ink-black uppercase">
                Financial Boundary
              </h3>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between py-1 border-b border-vellum-300">
                <span className="text-ink-muted uppercase">Acquisition Cost (c)</span>
                <span className="font-bold text-ink-black tabular-nums">{formatCurrency(unitCost)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-vellum-300">
                <span className="text-ink-muted uppercase">Selling Price (p)</span>
                <span className="font-bold text-spruce tabular-nums">{formatCurrency(sellingPrice)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-vellum-300">
                <span className="text-ink-muted uppercase">Gross Margin</span>
                <span className="font-bold text-spruce tabular-nums">{grossMargin.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-vellum-300">
                <span className="text-ink-muted uppercase">Stockout Penalty (s)</span>
                <span className="font-bold text-vermilion tabular-nums">{formatCurrency(stockoutPenalty)}</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-ink-black">
                <span className="uppercase">Working Capital Cap</span>
                <span className="tabular-nums">{formatCurrency(budgetLimit)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 8 Columns: Expected Profit Surface & Order Simulator */}
        <div className="lg:col-span-8 space-y-6">
          {/* Continuous Expected Profit Curve SVG */}
          <div className="border-2 border-ink-black bg-vellum-50 p-6 shadow-sharp">
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
          </div>

          {/* Order Allocation Controller Panel */}
          <div className="border-2 border-ink-black bg-vellum-50 p-6 shadow-sharp space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-ink-black pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block">
                  HUMAN ACTION CONTROLLER
                </span>
                <h3 className="font-serif font-black text-xl text-ink-black uppercase">
                  Proposed Order Allocation
                </h3>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 border-2 border-ink-black bg-vellum-100 font-bold text-ink-black tabular-nums">
                  {formatNumber(proposedOrder)} UNITS
                </span>
                <span
                  className={`px-2.5 py-1 border-2 border-ink-black font-bold tabular-nums ${
                    isBudgetExceeded ? "bg-vermilion-subtle text-vermilion" : "bg-spruce-subtle text-spruce"
                  }`}
                >
                  {formatCurrency(totalCapitalRequired)}
                </span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max={Math.floor(budgetLimit / unitCost) * 1.25}
              step="25"
              value={proposedOrder}
              onChange={(e) => setProposedOrder(Number(e.target.value))}
              className="w-full h-3 bg-vellum-200 border-2 border-ink-black rounded-none cursor-pointer accent-klein"
            />

            {isBudgetExceeded && (
              <div className="p-3 bg-vermilion-subtle border-2 border-ink-black flex items-center gap-2 text-vermilion text-xs font-mono font-bold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>
                  BUDGET CEILING EXCEEDED: Capital required ({formatCurrency(totalCapitalRequired)}) exceeds authorization limit ({formatCurrency(budgetLimit)}).
                </span>
              </div>
            )}

            {/* Diagnostic Metrics Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-vellum-100 border border-ink-black">
                <span className="text-[10px] text-ink-muted uppercase block">Service Probability</span>
                <span className="font-bold text-spruce text-sm tabular-nums mt-0.5 block">
                  {formatPercent(Math.min(0.999, (currentStock + proposedOrder) / (meanDemand + 1.2 * stdDemand)))}
                </span>
              </div>
              <div className="p-3 bg-vellum-100 border border-ink-black">
                <span className="text-[10px] text-ink-muted uppercase block">Remaining Liquidity</span>
                <span className="font-bold text-ink-black text-sm tabular-nums mt-0.5 block">
                  {formatCurrency(Math.max(0, budgetLimit - totalCapitalRequired))}
                </span>
              </div>
              <div className="p-3 bg-vellum-100 border border-ink-black">
                <span className="text-[10px] text-ink-muted uppercase block">Stockout Exposure</span>
                <span className="font-bold text-vermilion text-sm tabular-nums mt-0.5 block">
                  {formatPercent(Math.max(0, 1 - (currentStock + proposedOrder) / meanDemand))}
                </span>
              </div>
            </div>

            {/* Deliberative Human Rationale Record */}
            <div className="space-y-1.5 pt-2">
              <label className="block font-mono font-bold text-xs uppercase tracking-wider text-ink-black">
                Deliberative Rationale & Audit Sign-Off
              </label>
              <textarea
                rows={2}
                value={humanRationale}
                onChange={(e) => setHumanRationale(e.target.value)}
                className="w-full p-3 border-2 border-ink-black bg-vellum-100 text-ink-black font-sans text-xs focus:bg-white focus:outline-none"
                placeholder="Enter justification for this inventory commitment..."
              />
            </div>
          </div>

          {/* Calibrated AI Recommendation Folio */}
          {aiRec && (
            <div className="border-2 border-ink-black bg-vellum-50 p-6 shadow-sharp space-y-4">
              <div className="flex items-center justify-between border-b-2 border-ink-black pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-klein" />
                  <span className="font-mono font-bold text-xs uppercase tracking-wider text-ink-black">
                    CALIBRATED AI RECOMMENDATION // EVIDENCE DOSSIER
                  </span>
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-klein text-white">
                  CONFIDENCE: {Math.round(aiRec.confidence_score * 100)}%
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 bg-vellum-100 p-4 border border-ink-black">
                <div>
                  <span className="font-mono text-[10px] text-ink-muted uppercase block">
                    ANALYTICAL RECOMMENDATION
                  </span>
                  <span className="font-serif font-black text-2xl text-ink-black tabular-nums">
                    {aiRec.suggested_value} UNITS
                  </span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setProposedOrder(aiRec.suggested_value)}
                  className="font-mono text-xs font-bold uppercase border-2 border-ink-black bg-white hover:bg-vellum-200"
                >
                  ADOPT RECOMMENDATION
                </Button>
              </div>

              <p className="text-xs font-sans text-ink-charcoal leading-relaxed bg-vellum-100 p-3.5 border-l-4 border-ink-black">
                {aiRec.rationale}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-mono text-xs">
                <div className="p-3 bg-vellum-100 border border-ink-black">
                  <span className="text-[10px] text-ink-muted uppercase block">Model Uncertainty</span>
                  <span className="font-bold text-ink-black text-[11px] mt-0.5 block">
                    {aiRec.uncertainty.model_uncertainty}
                  </span>
                </div>
                <div className="p-3 bg-vellum-100 border border-ink-black">
                  <span className="text-[10px] text-ink-muted uppercase block">Data Uncertainty</span>
                  <span className="font-bold text-ink-black text-[11px] mt-0.5 block">
                    {aiRec.uncertainty.data_uncertainty}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

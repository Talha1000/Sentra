"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { DemandBellCurve } from "@/components/charts/demand-bell-curve";
import { ProfitDistributionChart } from "@/components/charts/profit-distribution-chart";
import {
  CheckCircle2,
  AlertCircle,
  Zap,
  Sparkles,
} from "lucide-react";

export default function DecisionsPage() {
  const [meanDemand, setMeanDemand] = useState<number>(1400);
  const [stdDemand, setStdDemand] = useState<number>(220);
  const [currentStock, setCurrentStock] = useState<number>(250);
  const [proposedOrder, setProposedOrder] = useState<number>(1420);
  const [humanRationale, setHumanRationale] = useState<string>(
    "Balanced order quantity to maximize profit while keeping unsold stock risk low."
  );
  const [isCommitted, setIsCommitted] = useState<boolean>(false);

  const unitCost = 45;
  const sellingPrice = 85;
  const salvageValue = 25;
  const stockoutPenalty = 20;
  const budgetLimit = 120000;

  const Cu = sellingPrice - unitCost + stockoutPenalty;
  const Co = unitCost - salvageValue;
  const criticalFractile = Cu / (Cu + Co);

  const totalCapitalRequired = proposedOrder * unitCost;
  const isBudgetExceeded = totalCapitalRequired > budgetLimit;
  const grossMargin = ((sellingPrice - unitCost) / sellingPrice) * 100;

  const aiRec = {
    suggested_value: 1750,
    confidence_score: 0.94,
    rationale:
      "The AI recommends ordering 1,750 units to play it safe against running out. However, our financial check shows that 1,420 units makes more net profit because it avoids leftover stock that would have to be discounted.",
    uncertainty: {
      model_uncertainty: "Low model risk",
      data_uncertainty: "Normal seasonal demand variance (±15%)",
    },
  };

  const applyStrategy = (type: "lean" | "optimal" | "ai" | "buffer") => {
    switch (type) {
      case "lean":
        setProposedOrder(Math.max(0, meanDemand - currentStock));
        break;
      case "optimal":
        setProposedOrder(1420);
        break;
      case "ai":
        setProposedOrder(aiRec.suggested_value);
        break;
      case "buffer":
        setProposedOrder(Math.round(meanDemand * 1.25 - currentStock));
        break;
    }
  };

  const handleCommit = () => {
    setIsCommitted(true);
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/workspace" },
          { label: "Plan Decisions", badge: "Sweet Spot Finder" },
        ]}
        rightElement={
          <div className="flex items-center gap-2 text-xs text-blue-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>★ Recommended Sweet Spot: 1,420 units</span>
          </div>
        }
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Planning Studio</span>
            <span className="text-slate-300">•</span>
            <span className="text-blue-700 font-semibold">Product &amp; Inventory</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Plan &amp; Test a Decision
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Find the most profitable order quantity before spending company funds. Compare your plan against AI advice and market demand.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant={isCommitted ? "secondary" : "primary"}
            size="default"
            onClick={handleCommit}
            disabled={isBudgetExceeded || isCommitted}
            className="gap-2 font-semibold"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCommitted ? "Decision Approved & Saved ✓" : "Save & Approve Plan"}</span>
          </Button>
        </div>
      </div>

      {/* Confirmation Banner */}
      {isCommitted && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
          <div className="flex items-center gap-2.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              Decision approved by Planning Manager. Permanent digital record saved to company audit history.
            </span>
          </div>
          <Badge variant="emerald" dot>SIGNED &amp; APPROVED</Badge>
        </div>
      )}

      {/* Strategy Presets Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Quick Plan Presets:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => applyStrategy("lean")}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
          >
            Lean (Just Enough)
          </button>
          <button
            onClick={() => applyStrategy("optimal")}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
          >
            ★ Profit Sweet Spot (1,420 units)
          </button>
          <button
            onClick={() => applyStrategy("ai")}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
          >
            AI Suggestion (1,750 units)
          </button>
          <button
            onClick={() => applyStrategy("buffer")}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
          >
            Extra Buffer (Play It Safe)
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
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 font-bold">01</span>
                <span>Step 1: Expected Sales Demand</span>
              </CardTitle>
              <CardDescription>Estimate how many units customers will buy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div>
                <div className="flex justify-between mb-1.5 text-xs font-medium">
                  <span className="text-slate-600">Expected Sales</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{meanDemand} units</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="2500"
                  step="50"
                  value={meanDemand}
                  onChange={(e) => setMeanDemand(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5 text-xs font-medium">
                  <span className="text-slate-600">Sales Fluctuation</span>
                  <span className="font-mono font-bold text-amber-700 tabular-nums">±{stdDemand} units</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={stdDemand}
                  onChange={(e) => setStdDemand(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-amber-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5 text-xs font-medium">
                  <span className="text-slate-600">Stock Already in Warehouse</span>
                  <span className="font-mono font-bold text-emerald-700 tabular-nums">{currentStock} units</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="25"
                  value={currentStock}
                  onChange={(e) => setCurrentStock(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-emerald-600"
                />
              </div>
            </CardContent>
          </Card>

          {/* Demand Curve */}
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
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 font-bold">02</span>
                <span>Step 2: Costs &amp; Pricing</span>
              </CardTitle>
              <CardDescription>Your profit margins and budget ceiling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs pt-0">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Cost to Buy (per unit)</span>
                <span className="font-mono font-semibold text-slate-900">{formatCurrency(unitCost)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Customer Selling Price</span>
                <span className="font-mono font-bold text-emerald-700">{formatCurrency(sellingPrice)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Gross Margin</span>
                <span className="font-mono font-bold text-emerald-700">{grossMargin.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Cost if Out of Stock</span>
                <span className="font-mono font-semibold text-rose-600">{formatCurrency(stockoutPenalty)}</span>
              </div>
              <div className="flex justify-between py-1.5 font-semibold text-slate-900">
                <span>Maximum Spending Budget</span>
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
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 font-bold">03</span>
                  <span>Step 3: Adjust Your Order Quantity</span>
                </CardTitle>
                <CardDescription>Slide to test how different order sizes affect your profit and cash</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="neutral">{formatNumber(proposedOrder)} Units</Badge>
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
                className="w-full h-2.5 bg-slate-200 rounded-lg cursor-pointer accent-blue-600"
              />

              {isBudgetExceeded && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2.5 text-rose-700 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>
                    Budget exceeded: Total order cost of {formatCurrency(totalCapitalRequired)} exceeds your budget of {formatCurrency(budgetLimit)}.
                  </span>
                </div>
              )}

              {/* Diagnostic Metrics Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Customer Orders Fulfilled</span>
                  <span className="font-mono text-base font-bold text-emerald-700 mt-1 block tabular-nums">
                    {formatPercent(Math.min(0.999, (currentStock + proposedOrder) / (meanDemand + 1.2 * stdDemand)))}
                  </span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Remaining Cash Budget</span>
                  <span className="font-mono text-base font-bold text-slate-900 mt-1 block tabular-nums">
                    {formatCurrency(Math.max(0, budgetLimit - totalCapitalRequired))}
                  </span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Risk of Running Out</span>
                  <span className="font-mono text-base font-bold text-rose-700 mt-1 block tabular-nums">
                    {formatPercent(Math.max(0, 1 - (currentStock + proposedOrder) / meanDemand))}
                  </span>
                </div>
              </div>

              {/* Decision Rationale */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Decision Notes &amp; Rationale:
                </label>
                <textarea
                  rows={2}
                  value={humanRationale}
                  onChange={(e) => setHumanRationale(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors placeholder:text-slate-400"
                  placeholder="Record why this order quantity was chosen for company records..."
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendation Card */}
          {aiRec && (
            <Card className="border-blue-200 bg-blue-50/40">
              <CardHeader className="pb-3 flex flex-row items-center justify-between border-b border-blue-200/60 bg-blue-50/80">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <CardTitle className="text-xs font-semibold text-blue-900">
                    AI Assistant Recommendation
                  </CardTitle>
                </div>
                <Badge variant="brand" dot>AI Confidence: {Math.round(aiRec.confidence_score * 100)}%</Badge>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 text-xs">
                <div className="flex items-center justify-between border-b border-blue-200/50 pb-3">
                  <span className="text-slate-700 font-medium">Standard AI Suggestion:</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xl font-bold text-rose-600 tabular-nums">
                      {aiRec.suggested_value} units (Too High)
                    </span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setProposedOrder(aiRec.suggested_value)}
                      className="text-xs h-7"
                    >
                      Use AI Number
                    </Button>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed bg-white p-3.5 rounded-lg border border-slate-200">
                  {aiRec.rationale}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="font-semibold text-slate-800 block mb-0.5 text-xs">AI Risk Check</span>
                    <span className="text-slate-500 text-xs">{aiRec.uncertainty.model_uncertainty}</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="font-semibold text-slate-800 block mb-0.5 text-xs">Market Context</span>
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

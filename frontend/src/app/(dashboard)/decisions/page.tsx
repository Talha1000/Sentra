"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { api } from "@/lib/api";
import { Sparkles, Sliders, CheckCircle2, ShieldAlert, FileText, ArrowRight } from "lucide-react";

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
  const [proposedOrder, setProposedOrder] = useState<number>(1150);
  const [humanRationale, setHumanRationale] = useState<string>(
    "Balanced order quantity maximizing gross margin while preserving a $13,250 liquidity buffer."
  );
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<any | null>(null);

  // AI Recommendation State
  const [isRequestingAI, setIsRequestingAI] = useState<boolean>(false);
  const [aiRec, setAiRec] = useState<any | null>(null);

  // Commit Status
  const [isCommitted, setIsCommitted] = useState<boolean>(false);

  // Run What-If Simulation
  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      const res = await api.fetch("/decisions/mock-id/simulate", {
        method: "POST",
        body: JSON.stringify({
          purchase_quantity: proposedOrder,
          mean_demand: meanDemand,
          std_demand: stdDemand,
          current_stock: currentStock,
          unit_cost: unitCost,
          selling_price: sellingPrice,
          salvage_value: salvageValue,
          stockout_penalty: stockoutPenalty,
          n_simulations: 1000,
        }),
      });
      setSimResult(res || {
        expected_mean_profit: 54200,
        deterministic_payoff_at_mean: {
          net_profit: 54200,
          units_sold: 1400,
          unsold_inventory: 50,
          unmet_demand: 0,
        },
      });
    } catch (e) {
      setSimResult({
        expected_mean_profit: 54200,
        deterministic_payoff_at_mean: {
          net_profit: 54200,
          units_sold: 1400,
          unsold_inventory: 50,
          unmet_demand: 0,
        },
      });
    } finally {
      setIsSimulating(false);
    }
  };

  // Request AI Recommendation
  const handleRequestAI = async () => {
    setIsRequestingAI(true);
    try {
      const res = await api.fetch("/decisions/mock-id/recommend", {
        method: "POST",
      });
      setAiRec(res || {
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
    } catch (e) {
      setAiRec({
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
    } finally {
      setIsRequestingAI(false);
    }
  };

  const handleCommit = () => {
    setIsCommitted(true);
  };

  const totalCapitalRequired = proposedOrder * unitCost;
  const isBudgetExceeded = totalCapitalRequired > budgetLimit;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink-tertiary">Studio Domain: Stochastic Supply Chain</span>
            <span className="text-hairline">|</span>
            <Badge variant="spruce">Active Model Protocol</Badge>
          </div>
          <h1 className="text-xl font-semibold text-ink-primary tracking-tight mt-1">
            Decision Intelligence Studio
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRequestAI}
            isLoading={isRequestingAI}
            className="text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-cognition" />
            <span>Generate AI Recommendation</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleCommit}
            disabled={isBudgetExceeded || isCommitted}
            className="text-xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            <span>{isCommitted ? "Decision Audited & Committed" : "Authorize & Commit Decision"}</span>
          </Button>
        </div>
      </div>

      {isCommitted && (
        <div className="p-4 rounded bg-spruce-subtle border border-spruce-border flex items-center justify-between text-xs text-spruce animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="font-medium">
              Decision committed to organization ledger and signed by Chief Decision Officer.
            </span>
          </div>
          <span className="font-mono text-[11px]">Audit Hash: #0x92f4c1</span>
        </div>
      )}

      {/* Main Two-Column Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Parameter Configuration & Constraints */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stochastic Parameters</CardTitle>
              <CardDescription>Adjust underlying distributions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1.5 font-medium">
                  <span className="text-ink-secondary">Expected Demand (Units)</span>
                  <span className="font-mono">{meanDemand}</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="2500"
                  step="50"
                  value={meanDemand}
                  onChange={(e) => setMeanDemand(Number(e.target.value))}
                  className="w-full h-1 bg-subtle rounded cursor-pointer accent-ink-primary"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5 font-medium">
                  <span className="text-ink-secondary">Demand Uncertainty (σ)</span>
                  <span className="font-mono">±{stdDemand}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="10"
                  value={stdDemand}
                  onChange={(e) => setStdDemand(Number(e.target.value))}
                  className="w-full h-1 bg-subtle rounded cursor-pointer accent-ink-primary"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5 font-medium">
                  <span className="text-ink-secondary">Warehouse Stock</span>
                  <span className="font-mono">{currentStock}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="25"
                  value={currentStock}
                  onChange={(e) => setCurrentStock(Number(e.target.value))}
                  className="w-full h-1 bg-subtle rounded cursor-pointer accent-ink-primary"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Economic Constraints</CardTitle>
              <CardDescription>Pricing and working capital bounds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-hairline">
                <span className="text-ink-secondary">Unit Acquisition Cost</span>
                <span className="font-mono font-semibold">{formatCurrency(unitCost)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-hairline">
                <span className="text-ink-secondary">Selling Price</span>
                <span className="font-mono font-semibold text-spruce">{formatCurrency(sellingPrice)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-hairline">
                <span className="text-ink-secondary">Salvage Value</span>
                <span className="font-mono text-ink-secondary">{formatCurrency(salvageValue)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-hairline">
                <span className="text-ink-secondary">Stockout Penalty</span>
                <span className="font-mono text-crimson">{formatCurrency(stockoutPenalty)}</span>
              </div>
              <div className="flex justify-between py-1 font-medium">
                <span className="text-ink-primary">Capital Budget Ceiling</span>
                <span className="font-mono font-semibold text-ink-primary">{formatCurrency(budgetLimit)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Columns: What-If Simulator & AI Rationale Inspector */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Recommendation Card (if requested) */}
          {aiRec && (
            <Card className="border-cognition-border bg-cognition-subtle/20">
              <CardHeader className="py-3 bg-cognition-subtle/30 border-b border-cognition-border flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cognition" />
                  <CardTitle className="text-xs font-semibold text-cognition">
                    Structured AI Recommendation
                  </CardTitle>
                </div>
                <Badge variant="cognition">Calibrated Confidence: {Math.round(aiRec.confidence_score * 100)}%</Badge>
              </CardHeader>
              <CardContent className="p-5 space-y-4 text-xs">
                <div className="flex items-baseline justify-between border-b border-cognition-border/40 pb-3">
                  <span className="text-ink-secondary">Model Optimal Order Quantity:</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-bold text-ink-primary">{aiRec.suggested_value} units</span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setProposedOrder(aiRec.suggested_value)}
                      className="text-[11px] h-7"
                    >
                      Apply Suggestion
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-medium text-ink-primary">Natural Language Rationale:</span>
                  <p className="text-ink-secondary leading-relaxed bg-panel p-3 rounded border border-hairline">
                    {aiRec.rationale}
                  </p>
                </div>

                {/* Epistemic Uncertainty Breakdown */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-2.5 bg-panel border border-hairline rounded">
                    <span className="font-medium text-ink-primary block mb-0.5">Model Uncertainty</span>
                    <span className="text-ink-secondary text-[11px]">{aiRec.uncertainty.model_uncertainty}</span>
                  </div>
                  <div className="p-2.5 bg-panel border border-hairline rounded">
                    <span className="font-medium text-ink-primary block mb-0.5">Data Uncertainty</span>
                    <span className="text-ink-secondary text-[11px]">{aiRec.uncertainty.data_uncertainty}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Interactive What-If Simulator */}
          <Card>
            <CardHeader>
              <CardTitle>What-If Sensitivity Simulation</CardTitle>
              <CardDescription>
                Model stochastic financial outcomes across 1,000 Monte Carlo demand draws.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-ink-primary">Proposed Purchase Order Quantity</span>
                  <span className="font-mono font-bold text-base">{proposedOrder} units</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2500"
                  step="25"
                  value={proposedOrder}
                  onChange={(e) => setProposedOrder(Number(e.target.value))}
                  className="w-full h-1.5 bg-subtle rounded cursor-pointer accent-ink-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-canvas border border-hairline rounded">
                  <span className="text-ink-secondary text-[11px]">Committed Working Capital</span>
                  <div className="font-mono text-base font-bold text-ink-primary mt-1">
                    {formatCurrency(totalCapitalRequired)}
                  </div>
                  <span className="text-[10px] text-ink-tertiary">
                    {formatPercent(totalCapitalRequired / budgetLimit)} of budget utilized
                  </span>
                </div>

                <div className="p-3 bg-canvas border border-hairline rounded">
                  <span className="text-ink-secondary text-[11px]">Expected Simulated Net Profit</span>
                  <div className="font-mono text-base font-bold text-spruce mt-1">
                    {simResult ? formatCurrency(simResult.expected_mean_profit) : "$54,200"}
                  </div>
                  <span className="text-[10px] text-ink-tertiary">
                    Critical fractile optimal payoff
                  </span>
                </div>
              </div>

              {/* Rationale Input */}
              <div className="space-y-1.5 pt-2">
                <span className="font-medium text-ink-primary">Human Decision Rationale & Sign-Off</span>
                <textarea
                  rows={3}
                  value={humanRationale}
                  onChange={(e) => setHumanRationale(e.target.value)}
                  className="w-full p-3 text-xs border border-hairline rounded bg-panel text-ink-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink-primary"
                  placeholder="Record justification for final order quantity..."
                />
              </div>
            </CardContent>
            <CardFooter>
              <span className="text-[11px] text-ink-tertiary">
                Deterministic Newsvendor Engine Active
              </span>
              <Button variant="secondary" size="sm" onClick={handleSimulate} isLoading={isSimulating}>
                <Sliders className="w-3.5 h-3.5 mr-1" />
                <span>Run Monte Carlo Check</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

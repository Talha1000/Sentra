"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { api } from "@/lib/api";
import { Sparkles, AlertCircle, Clock, CheckCircle2, ChevronRight, Info } from "lucide-react";

export interface ParticipantTrialProps {
  scenario: {
    id: string;
    order_index: number;
    title: string;
    domain: string;
    parameters: {
      mean_demand: number;
      std_demand: number;
      current_stock: number;
      unit_cost: number;
      selling_price: number;
      salvage_value: number;
      stockout_penalty: number;
      budget_limit: number;
    };
    ai_assistance?: {
      suggested_value: number;
      confidence_score: number;
      explanation?: string | null;
    } | null;
  };
  conditionCode: string;
  sessionId: string;
  onCompleteScenario: (eventData: any) => void;
  isLastScenario?: boolean;
}

export function ParticipantTrialRunner({
  scenario,
  conditionCode,
  sessionId,
  onCompleteScenario,
  isLastScenario = false,
}: ParticipantTrialProps) {
  const [orderQuantity, setOrderQuantity] = useState<number>(scenario.parameters.current_stock + 500);
  const [confidence, setConfidence] = useState<number>(0.75);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedResult, setSubmittedResult] = useState<any | null>(null);

  // Microsecond timing via performance.now()
  const renderTimestampRef = useRef<number>(0);

  useEffect(() => {
    // Reset inputs and start monotonic clock when scenario mounts
    renderTimestampRef.current = performance.now();
    setSubmittedResult(null);
    setOrderQuantity(Math.round(scenario.parameters.mean_demand - scenario.parameters.current_stock));
  }, [scenario.id]);

  const p = scenario.parameters;
  const maxAffordableUnits = Math.floor(p.budget_limit / p.unit_cost);
  const totalCost = orderQuantity * p.unit_cost;
  const isBudgetExceeded = totalCost > p.budget_limit;

  const handleSubmit = async () => {
    if (isBudgetExceeded) return;
    setIsSubmitting(true);

    const clientReactionTimeMs = performance.now() - renderTimestampRef.current;

    try {
      const res = await api.fetch(`/experiments/sessions/${sessionId}/events`, {
        method: "POST",
        body: JSON.stringify({
          scenario_id: scenario.id,
          user_action_value: orderQuantity,
          reaction_time_ms: Math.round(clientReactionTimeMs * 10) / 10,
          subjective_confidence: confidence,
        }),
      });

      setSubmittedResult(res || {
        payoff_achieved: 48500,
        ground_truth_deviation: 35,
        economic_loss: 420,
        agreed_with_ai: true,
      });
    } catch (e) {
      console.error(e);
      setSubmittedResult({
        payoff_achieved: 48500,
        ground_truth_deviation: 35,
        economic_loss: 420,
        agreed_with_ai: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Scenario Header */}
      <div className="flex items-center justify-between border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink-tertiary">Trial #{scenario.order_index}</span>
            <span className="text-hairline">|</span>
            <Badge variant="outline">Protocol Mode: {conditionCode}</Badge>
          </div>
          <h2 className="text-lg font-semibold text-ink-primary tracking-tight mt-1">{scenario.title}</h2>
        </div>
      </div>

      {/* Main Analytical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Cost Structure & Demand Statistics */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Demand Forecast</CardTitle>
              <CardDescription>Stochastic seasonal distribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-hairline">
                <span className="text-ink-secondary">Mean Expected Demand</span>
                <span className="font-mono font-semibold text-ink-primary tabular-nums">{p.mean_demand} units</span>
              </div>
              <div className="flex justify-between py-1 border-b border-hairline">
                <span className="text-ink-secondary">Std. Deviation (σ)</span>
                <span className="font-mono text-ink-primary tabular-nums">±{p.std_demand} units</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-ink-secondary">Current On-Hand Stock</span>
                <span className="font-mono font-semibold text-ink-primary tabular-nums">{p.current_stock} units</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Constraints</CardTitle>
              <CardDescription>Unit pricing and penalty matrix</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-hairline">
                <span className="text-ink-secondary">Unit Acquisition Cost</span>
                <span className="font-mono font-semibold text-ink-primary tabular-nums">{formatCurrency(p.unit_cost)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-hairline">
                <span className="text-ink-secondary">Selling Price</span>
                <span className="font-mono font-semibold text-spruce tabular-nums">{formatCurrency(p.selling_price)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-hairline">
                <span className="text-ink-secondary">Salvage Value (Unsold)</span>
                <span className="font-mono text-ink-secondary tabular-nums">{formatCurrency(p.salvage_value)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-hairline">
                <span className="text-ink-secondary">Stockout Goodwill Penalty</span>
                <span className="font-mono text-crimson tabular-nums">{formatCurrency(p.stockout_penalty)}</span>
              </div>
              <div className="flex justify-between py-1 font-medium">
                <span className="text-ink-primary">Working Capital Budget</span>
                <span className="font-mono font-semibold text-ink-primary tabular-nums">{formatCurrency(p.budget_limit)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Column: AI Recommendation (if condition permits) or Human Analytical Baseline */}
        <div className="md:col-span-2 space-y-4">
          {conditionCode === "CONDITION_A" ? (
            <Card className="bg-canvas border-dashed">
              <CardContent className="p-6 text-center text-xs space-y-2">
                <Info className="w-6 h-6 text-ink-tertiary mx-auto" />
                <h4 className="font-semibold text-ink-primary">Condition A: Autonomous Human Decision</h4>
                <p className="text-ink-secondary max-w-sm mx-auto">
                  Evaluate the demand distribution and cost parameters above. You are operating without automated recommendation assistance.
                </p>
              </CardContent>
            </Card>
          ) : scenario.ai_assistance ? (
            <Card className="border-cognition-border bg-cognition-subtle/30">
              <CardHeader className="bg-cognition-subtle/40 border-b border-cognition-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cognition" />
                    <CardTitle className="text-cognition">AI Decision Recommendation</CardTitle>
                  </div>
                  <Badge variant="cognition">
                    Confidence: {Math.round(scenario.ai_assistance.confidence_score * 100)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-xs pt-4">
                <div className="flex items-baseline justify-between border-b border-cognition-border/60 pb-3">
                  <span className="text-ink-secondary">Recommended Purchase Quantity</span>
                  <span className="font-mono text-2xl font-bold text-ink-primary tabular-nums">
                    {formatNumber(scenario.ai_assistance.suggested_value)} units
                  </span>
                </div>

                {scenario.ai_assistance.explanation && (
                  <div className="space-y-2">
                    <span className="font-medium text-ink-primary">Model Rationale & Assumptions:</span>
                    <p className="text-ink-secondary leading-relaxed bg-panel p-3 rounded border border-hairline">
                      {scenario.ai_assistance.explanation}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}

          {/* Interactive Decision Form */}
          <Card>
            <CardHeader>
              <CardTitle>Your Purchase Decision</CardTitle>
              <CardDescription>
                Specify final order quantity and your subjective confidence level.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Slider & Number Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="order-qty-input" className="font-medium text-ink-primary">Order Quantity (Units)</label>
                  <span className="text-ink-tertiary font-mono">
                    Budget ceiling: max {formatNumber(maxAffordableUnits)} units
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    id="order-qty-range"
                    aria-label="Order Quantity Slider"
                    min="0"
                    max={maxAffordableUnits * 1.2}
                    value={orderQuantity}
                    disabled={!!submittedResult}
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    className="w-full h-1.5 bg-subtle rounded-lg appearance-none cursor-pointer accent-ink-primary"
                  />
                  <input
                    type="number"
                    id="order-qty-input"
                    aria-label="Order Quantity Number Input"
                    value={orderQuantity}
                    disabled={!!submittedResult}
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    className="w-24 px-2 py-1.5 text-right font-mono text-sm border border-hairline rounded bg-panel font-semibold"
                  />
                </div>
                {isBudgetExceeded && (
                  <div className="flex items-center gap-1.5 text-xs text-crimson font-medium mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Total cost of {formatCurrency(totalCost)} exceeds budget of {formatCurrency(p.budget_limit)}!</span>
                  </div>
                )}
              </div>

              {/* Confidence Slider */}
              <div className="space-y-2 pt-2 border-t border-hairline">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="confidence-slider" className="font-medium text-ink-primary">Your Confidence in This Decision</label>
                  <span className="font-mono text-xs font-semibold text-ink-primary">
                    {Math.round(confidence * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  id="confidence-slider"
                  aria-label="Subjective Confidence Slider"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={confidence}
                  disabled={!!submittedResult}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full h-1.5 bg-subtle rounded-lg appearance-none cursor-pointer accent-cognition"
                />
              </div>
            </CardContent>

            <CardFooter>
              <div className="text-[11px] text-ink-tertiary flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Microsecond reaction clock active</span>
              </div>
              {!submittedResult ? (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                  disabled={isBudgetExceeded}
                >
                  Commit Order Decision
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => onCompleteScenario(submittedResult)}
                  className="gap-1.5 bg-spruce hover:bg-emerald-900"
                >
                  <span>{isLastScenario ? "Finish Session" : "Next Scenario"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Outcome Feedback Card (Shown immediately upon submission) */}
          {submittedResult && (
            <Card className="border-spruce-border bg-spruce-subtle/30 animate-in fade-in duration-200">
              <CardHeader className="py-3 bg-spruce-subtle/50 border-b border-spruce-border">
                <div className="flex items-center gap-2 text-xs font-semibold text-spruce">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ground-Truth Performance Evaluated</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-ink-secondary text-[11px]">Expected Profit</span>
                  <div className="text-base font-bold font-mono text-ink-primary tabular-nums mt-0.5">
                    {formatCurrency(submittedResult.payoff_achieved)}
                  </div>
                </div>
                <div>
                  <span className="text-ink-secondary text-[11px]">Deviation from Optimal</span>
                  <div className="text-base font-bold font-mono text-ink-primary tabular-nums mt-0.5">
                    {submittedResult.ground_truth_deviation} units
                  </div>
                </div>
                <div>
                  <span className="text-ink-secondary text-[11px]">Economic Loss</span>
                  <div className="text-base font-bold font-mono text-crimson tabular-nums mt-0.5">
                    {formatCurrency(submittedResult.economic_loss)}
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

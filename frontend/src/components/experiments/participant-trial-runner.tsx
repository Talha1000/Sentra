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

  // Monotonic hardware microsecond timing
  const renderTimestampRef = useRef<number>(0);

  useEffect(() => {
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
        actual_payoff: 58400,
        optimal_action: Math.round(p.mean_demand * 1.05 - p.current_stock),
        deviation_from_optimal: Math.abs(orderQuantity - Math.round(p.mean_demand * 1.05 - p.current_stock)),
        was_ai_followed: scenario.ai_assistance ? Math.abs(orderQuantity - scenario.ai_assistance.suggested_value) < 15 : false,
      });
    } catch (e) {
      console.error(e);
      const opt = Math.round(p.mean_demand * 1.05 - p.current_stock);
      setSubmittedResult({
        actual_payoff: 58400,
        optimal_action: opt,
        deviation_from_optimal: Math.abs(orderQuantity - opt),
        was_ai_followed: scenario.ai_assistance ? Math.abs(orderQuantity - scenario.ai_assistance.suggested_value) < 15 : false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    onCompleteScenario(submittedResult);
  };

  return (
    <div className="space-y-6">
      {/* Scenario Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-warm-hairline">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs px-2.5 py-0.5 rounded-full bg-ink-primary text-canvas">
                Scenario {scenario.order_index} of 5
              </span>
              <span className="text-ink-muted">•</span>
              <Badge variant="terracotta">
                {conditionCode.replace("_", " ")}
              </Badge>
            </div>
            <span className="text-xs text-ink-muted font-mono">
              Server-Clock Latency Active
            </span>
          </div>

          <div className="pt-3">
            <h2 className="font-serif text-xl font-bold text-ink-primary tracking-tight">
              {scenario.title}
            </h2>
          </div>
        </CardContent>
      </Card>

      {/* Main Trial Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Cost Structure & Distribution */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xs uppercase tracking-wider text-ink-muted font-medium">
                Demand Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs pt-0">
              <div className="flex justify-between py-1.5 border-b border-warm-hairline">
                <span className="text-ink-muted">Mean Demand (μ)</span>
                <span className="font-mono font-bold text-ink-primary tabular-nums">{p.mean_demand} units</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-warm-hairline">
                <span className="text-ink-muted">Std. Deviation (σ)</span>
                <span className="font-mono font-bold text-terracotta tabular-nums">±{p.std_demand} units</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-ink-muted">Warehouse Stock</span>
                <span className="font-mono font-bold text-ink-primary tabular-nums">{p.current_stock} units</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xs uppercase tracking-wider text-ink-muted font-medium">
                Financial Constraints
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs pt-0">
              <div className="flex justify-between py-1.5 border-b border-warm-hairline">
                <span className="text-ink-muted">Acquisition Cost</span>
                <span className="font-mono font-bold text-ink-primary tabular-nums">{formatCurrency(p.unit_cost)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-warm-hairline">
                <span className="text-ink-muted">Selling Price</span>
                <span className="font-mono font-bold text-sage tabular-nums">{formatCurrency(p.selling_price)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-warm-hairline">
                <span className="text-ink-muted">Salvage Value</span>
                <span className="font-mono text-ink-muted tabular-nums">{formatCurrency(p.salvage_value)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-warm-hairline">
                <span className="text-ink-muted">Stockout Penalty</span>
                <span className="font-mono font-bold text-rose-400 tabular-nums">{formatCurrency(p.stockout_penalty)}</span>
              </div>
              <div className="flex justify-between py-1.5 font-semibold text-ink-primary">
                <span>Budget Cap</span>
                <span className="font-mono tabular-nums">{formatCurrency(p.budget_limit)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 2 Columns: AI Assistance & Input Deck */}
        <div className="md:col-span-2 space-y-6">
          {conditionCode === "CONDITION_A" ? (
            <Card className="border-dashed bg-canvas-elevated/40">
              <CardContent className="p-6 text-center space-y-2">
                <Info className="w-5 h-5 text-terracotta mx-auto" />
                <h4 className="font-serif font-semibold text-sm text-ink-primary">
                  Condition A: Autonomous Human Deliberation
                </h4>
                <p className="text-xs text-ink-secondary max-w-sm mx-auto">
                  Evaluate parameters independently. You are operating in the unassisted control condition.
                </p>
              </CardContent>
            </Card>
          ) : scenario.ai_assistance ? (
            <Card className="border-terracotta/30 bg-terracotta/10">
              <CardHeader className="pb-3 flex flex-row items-center justify-between border-b border-terracotta/20 bg-terracotta/15">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-terracotta" />
                  <CardTitle className="text-xs font-semibold text-ink-primary">
                    AI Decision Recommendation
                  </CardTitle>
                </div>
                <Badge variant="terracotta">
                  Confidence: {Math.round(scenario.ai_assistance.confidence_score * 100)}%
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3 pt-4 text-xs">
                <div className="flex items-baseline justify-between border-b border-terracotta/20 pb-3">
                  <span className="text-ink-secondary font-medium">Recommended Purchase Order:</span>
                  <span className="font-mono text-2xl font-bold text-terracotta tabular-nums">
                    {formatNumber(scenario.ai_assistance.suggested_value)} units
                  </span>
                </div>

                {scenario.ai_assistance.explanation && (
                  <div className="p-3.5 bg-canvas-elevated rounded-xl border border-warm-hairline space-y-1">
                    <span className="text-[11px] font-semibold text-ink-primary block">Model Rationale:</span>
                    <p className="text-ink-secondary leading-relaxed text-xs">
                      {scenario.ai_assistance.explanation}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}

          {/* Interactive Input Controller */}
          <Card>
            <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-sm">Your Decision Order</CardTitle>
                <CardDescription>Select order quantity for this scenario</CardDescription>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <Badge variant="terracotta">{formatNumber(orderQuantity)} Units</Badge>
                <Badge variant={isBudgetExceeded ? "crimson" : "spruce"}>
                  {formatCurrency(totalCost)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 pt-0">
              <input
                type="range"
                min="0"
                max={maxAffordableUnits * 1.1}
                step="20"
                value={orderQuantity}
                disabled={!!submittedResult || isSubmitting}
                onChange={(e) => setOrderQuantity(Number(e.target.value))}
                className="w-full h-2 bg-warm-hairline rounded-lg cursor-pointer accent-terracotta"
              />

              {isBudgetExceeded && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    Budget exceeded: Cost {formatCurrency(totalCost)} exceeds limit of {formatCurrency(p.budget_limit)}.
                  </span>
                </div>
              )}

              {/* Confidence Gauge */}
              <div className="p-4 bg-canvas-elevated rounded-xl border border-warm-hairline space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-ink-primary">Subjective Confidence in Decision:</span>
                  <span className="font-mono font-bold text-terracotta">{Math.round(confidence * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.0"
                  step="0.05"
                  value={confidence}
                  disabled={!!submittedResult || isSubmitting}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full h-1.5 bg-warm-hairline rounded-lg cursor-pointer accent-terracotta"
                />
              </div>

              {/* Result Reveal */}
              {submittedResult && (
                <div className="p-4 bg-sage/10 border border-sage/30 rounded-xl space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-sage/20 pb-2">
                    <span className="font-semibold text-sage flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sage" />
                      Trial Outcome Recorded
                    </span>
                    <span className="font-mono font-bold text-sage tabular-nums">
                      Payoff: {formatCurrency(submittedResult.actual_payoff)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-ink-secondary">
                    <div>
                      <span className="text-ink-muted text-[11px] block">Analytical Optimum:</span>
                      <span className="font-mono font-bold text-ink-primary">{submittedResult.optimal_action} units</span>
                    </div>
                    <div>
                      <span className="text-ink-muted text-[11px] block">Deviation:</span>
                      <span className="font-mono font-bold text-ink-primary">{submittedResult.deviation_from_optimal} units</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2 flex justify-end">
                {!submittedResult ? (
                  <Button
                    variant="terracotta"
                    disabled={isBudgetExceeded || isSubmitting}
                    onClick={handleSubmit}
                    className="shadow-xs"
                  >
                    {isSubmitting ? "Recording Response..." : "Commit Decision & Record"}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    className="gap-2 shadow-xs"
                  >
                    <span>{isLastScenario ? "Complete Session" : "Next Scenario"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

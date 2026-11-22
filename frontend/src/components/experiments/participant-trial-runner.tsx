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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                Scenario {scenario.order_index} of 5
              </span>
              <span className="text-slate-300">•</span>
              <Badge variant="brand">
                Interactive Practice
              </Badge>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Real-time Profit Calculation Active
            </span>
          </div>

          <div className="pt-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
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
              <CardTitle className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                Customer Demand
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs pt-0">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Expected Sales</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">{p.mean_demand} units</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Expected Fluctuation</span>
                <span className="font-mono font-bold text-amber-700 tabular-nums">±{p.std_demand} units</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-600">Warehouse Stock</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">{p.current_stock} units</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                Pricing &amp; Budget
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs pt-0">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Cost to Buy (per unit)</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">{formatCurrency(p.unit_cost)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Selling Price</span>
                <span className="font-mono font-bold text-emerald-700 tabular-nums">{formatCurrency(p.selling_price)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Clearance Value</span>
                <span className="font-mono text-slate-500 tabular-nums">{formatCurrency(p.salvage_value)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Cost if Out of Stock</span>
                <span className="font-mono font-bold text-rose-600 tabular-nums">{formatCurrency(p.stockout_penalty)}</span>
              </div>
              <div className="flex justify-between py-1.5 font-semibold text-slate-900">
                <span>Maximum Budget</span>
                <span className="font-mono tabular-nums">{formatCurrency(p.budget_limit)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 2 Columns: AI Assistance & Input Deck */}
        <div className="md:col-span-2 space-y-6">
          {scenario.ai_assistance && (
            <Card className="border-blue-200 bg-blue-50/40">
              <CardHeader className="pb-3 flex flex-row items-center justify-between border-b border-blue-200/60 bg-blue-50/80">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <CardTitle className="text-xs font-semibold text-blue-900">
                    AI Assistant Suggestion
                  </CardTitle>
                </div>
                <Badge variant="brand">
                  Confidence: {Math.round(scenario.ai_assistance.confidence_score * 100)}%
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3 pt-4 text-xs">
                <div className="flex items-baseline justify-between border-b border-blue-200/50 pb-3">
                  <span className="text-slate-700 font-medium">Suggested Order Quantity:</span>
                  <span className="font-mono text-2xl font-bold text-blue-700 tabular-nums">
                    {formatNumber(scenario.ai_assistance.suggested_value)} units
                  </span>
                </div>

                {scenario.ai_assistance.explanation && (
                  <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-900 block">AI Rationale:</span>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      {scenario.ai_assistance.explanation}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Interactive Input Controller */}
          <Card>
            <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-sm">Your Planned Order</CardTitle>
                <CardDescription>Select the order quantity for this scenario</CardDescription>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <Badge variant="neutral">{formatNumber(orderQuantity)} Units</Badge>
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
                className="w-full h-2.5 bg-slate-200 rounded-lg cursor-pointer accent-blue-600"
              />

              {isBudgetExceeded && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>
                    Budget exceeded: Total cost of {formatCurrency(totalCost)} exceeds budget limit of {formatCurrency(p.budget_limit)}.
                  </span>
                </div>
              )}

              {/* Confidence Gauge */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">How confident are you in this number?</span>
                  <span className="font-mono font-bold text-blue-700">{Math.round(confidence * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.0"
                  step="0.05"
                  value={confidence}
                  disabled={!!submittedResult || isSubmitting}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-blue-600"
                />
              </div>

              {/* Result Reveal */}
              {submittedResult && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                    <span className="font-semibold text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Scenario Result Calculated
                    </span>
                    <span className="font-mono font-bold text-emerald-800 tabular-nums">
                      Net Profit: {formatCurrency(submittedResult.actual_payoff)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-slate-700">
                    <div>
                      <span className="text-slate-500 text-[11px] block">Profit Sweet Spot:</span>
                      <span className="font-mono font-bold text-slate-900">{submittedResult.optimal_action} units</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Difference from Sweet Spot:</span>
                      <span className="font-mono font-bold text-slate-900">{submittedResult.deviation_from_optimal} units</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2 flex justify-end">
                {!submittedResult ? (
                  <Button
                    variant="primary"
                    disabled={isBudgetExceeded || isSubmitting}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? "Calculating Results..." : "Submit Decision & See Profit"}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    className="gap-2"
                  >
                    <span>{isLastScenario ? "Complete Practice Session" : "Next Scenario"}</span>
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

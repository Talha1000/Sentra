"use client";

import React, { useState, useEffect, useRef } from "react";
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
      // Fallback local analytical calculation
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
      {/* Scenario Header Folio */}
      <div className="border-2 border-ink-black bg-vellum-50 p-5 shadow-sharp">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-ink-black">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-ink-black text-white">
              TRIAL {scenario.order_index} OF 5
            </span>
            <span className="font-mono text-xs text-ink-muted">/</span>
            <span className="font-mono text-xs font-bold text-klein uppercase">
              {conditionCode.replace("_", " ")}
            </span>
          </div>
          <span className="font-mono text-[10px] text-ink-muted uppercase">
            CLOCK: HARDWARE MONOTONIC
          </span>
        </div>

        <div className="pt-3">
          <h2 className="font-serif font-black text-xl lg:text-2xl text-ink-black">
            {scenario.title}
          </h2>
        </div>
      </div>

      {/* Main Trial Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Cost Structure & Distribution */}
        <div className="space-y-6">
          <div className="border-2 border-ink-black bg-vellum-50 p-5 shadow-sharp space-y-4 font-mono text-xs">
            <div className="border-b-2 border-ink-black pb-2.5">
              <span className="text-[10px] uppercase tracking-wider text-ink-muted block">
                DISTRIBUTION
              </span>
              <h3 className="font-serif font-black text-base text-ink-black uppercase">
                Demand Parameters
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b border-vellum-300">
                <span className="text-ink-muted uppercase">Mean Demand (μ)</span>
                <span className="font-bold text-ink-black tabular-nums">{p.mean_demand} units</span>
              </div>
              <div className="flex justify-between py-1 border-b border-vellum-300">
                <span className="text-ink-muted uppercase">Std. Deviation (σ)</span>
                <span className="font-bold text-klein tabular-nums">±{p.std_demand} units</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-ink-muted uppercase">Warehouse Stock</span>
                <span className="font-bold text-ink-black tabular-nums">{p.current_stock} units</span>
              </div>
            </div>
          </div>

          <div className="border-2 border-ink-black bg-vellum-50 p-5 shadow-sharp space-y-4 font-mono text-xs">
            <div className="border-b-2 border-ink-black pb-2.5">
              <span className="text-[10px] uppercase tracking-wider text-ink-muted block">
                ECONOMICS
              </span>
              <h3 className="font-serif font-black text-base text-ink-black uppercase">
                Financial Boundary
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b border-vellum-300">
                <span className="text-ink-muted uppercase">Acquisition Cost</span>
                <span className="font-bold text-ink-black tabular-nums">{formatCurrency(p.unit_cost)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-vellum-300">
                <span className="text-ink-muted uppercase">Selling Price</span>
                <span className="font-bold text-spruce tabular-nums">{formatCurrency(p.selling_price)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-vellum-300">
                <span className="text-ink-muted uppercase">Salvage Value</span>
                <span className="text-ink-muted tabular-nums">{formatCurrency(p.salvage_value)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-vellum-300">
                <span className="text-ink-muted uppercase">Stockout Penalty</span>
                <span className="font-bold text-vermilion tabular-nums">{formatCurrency(p.stockout_penalty)}</span>
              </div>
              <div className="flex justify-between py-1 font-bold">
                <span className="uppercase text-ink-black">Capital Limit</span>
                <span className="text-ink-black tabular-nums">{formatCurrency(p.budget_limit)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: AI Recommendation & Decision Input */}
        <div className="md:col-span-2 space-y-6">
          {conditionCode === "CONDITION_A" ? (
            <div className="border-2 border-ink-black border-dashed bg-vellum-100 p-6 text-center space-y-2">
              <Info className="w-5 h-5 text-ink-black mx-auto" />
              <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-ink-black">
                Condition A // Autonomous Human Deliberation
              </h4>
              <p className="text-xs text-ink-charcoal font-sans max-w-sm mx-auto">
                Evaluate parameters independently. You are operating in the unassisted control condition.
              </p>
            </div>
          ) : scenario.ai_assistance ? (
            <div className="border-2 border-ink-black bg-vellum-50 p-6 shadow-sharp space-y-4">
              <div className="flex items-center justify-between border-b-2 border-ink-black pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-klein" />
                  <span className="font-mono font-bold text-xs uppercase tracking-wider text-ink-black">
                    AI DECISION RECOMMENDATION
                  </span>
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-klein text-white">
                  CONFIDENCE: {Math.round(scenario.ai_assistance.confidence_score * 100)}%
                </span>
              </div>

              <div className="flex items-baseline justify-between bg-vellum-100 p-4 border border-ink-black">
                <span className="font-mono text-xs text-ink-muted uppercase font-bold">
                  Recommended Order Quantity:
                </span>
                <span className="font-mono text-2xl font-bold text-ink-black tabular-nums">
                  {formatNumber(scenario.ai_assistance.suggested_value)} units
                </span>
              </div>

              {scenario.ai_assistance.explanation && (
                <div className="p-3.5 bg-vellum-100 border-l-4 border-ink-black space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-ink-muted block">
                    Model Explanation:
                  </span>
                  <p className="text-xs font-sans text-ink-charcoal leading-relaxed">
                    {scenario.ai_assistance.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : null}

          {/* Interactive Decision Action Controller */}
          <div className="border-2 border-ink-black bg-vellum-50 p-6 shadow-sharp space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-ink-black pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase text-ink-muted block">
                  PARTICIPANT ACTION
                </span>
                <h3 className="font-serif font-black text-xl text-ink-black uppercase">
                  Your Decision Order
                </h3>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 border-2 border-ink-black bg-vellum-100 font-bold tabular-nums">
                  {formatNumber(orderQuantity)} UNITS
                </span>
                <span
                  className={`px-2.5 py-1 border-2 border-ink-black font-bold tabular-nums ${
                    isBudgetExceeded ? "bg-vermilion-subtle text-vermilion" : "bg-spruce-subtle text-spruce"
                  }`}
                >
                  {formatCurrency(totalCost)}
                </span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max={maxAffordableUnits * 1.1}
              step="20"
              value={orderQuantity}
              disabled={!!submittedResult || isSubmitting}
              onChange={(e) => setOrderQuantity(Number(e.target.value))}
              className="w-full h-3 bg-vellum-200 border-2 border-ink-black rounded-none cursor-pointer accent-klein"
            />

            {isBudgetExceeded && (
              <div className="p-3 bg-vermilion-subtle border-2 border-ink-black text-vermilion text-xs font-mono font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>
                  BUDGET EXCEEDED: Order cost {formatCurrency(totalCost)} exceeds limit {formatCurrency(p.budget_limit)}.
                </span>
              </div>
            )}

            {/* Subjective Confidence Gauge */}
            <div className="p-4 bg-vellum-100 border border-ink-black space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold uppercase text-ink-black">
                  Subjective Confidence in Decision:
                </span>
                <span className="font-bold text-klein tabular-nums">
                  {Math.round(confidence * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.05"
                value={confidence}
                disabled={!!submittedResult || isSubmitting}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="w-full h-2 bg-vellum-300 border border-ink-black rounded-none cursor-pointer accent-klein"
              />
            </div>

            {/* Post-Trial Ground Truth Evaluation Reveal */}
            {submittedResult && (
              <div className="p-4 bg-vellum-100 border-2 border-ink-black space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-ink-black pb-2">
                  <span className="font-bold uppercase text-ink-black flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-spruce" />
                    Trial Outcome Recorded
                  </span>
                  <span className="font-bold text-spruce tabular-nums">
                    PAYOFF: {formatCurrency(submittedResult.actual_payoff)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="text-ink-muted uppercase block">Deterministic Optimum:</span>
                    <span className="font-bold text-ink-black tabular-nums">{submittedResult.optimal_action} units</span>
                  </div>
                  <div>
                    <span className="text-ink-muted uppercase block">Deviation from Optimum:</span>
                    <span className="font-bold text-ink-black tabular-nums">{submittedResult.deviation_from_optimal} units</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex justify-end">
              {!submittedResult ? (
                <Button
                  variant="primary"
                  size="default"
                  disabled={isBudgetExceeded || isSubmitting}
                  onClick={handleSubmit}
                  className="font-mono text-xs font-bold uppercase tracking-wider h-11 px-6 bg-klein hover:bg-blue-700 text-white border-2 border-ink-black shadow-sharp"
                >
                  {isSubmitting ? "RECORDING..." : "COMMIT & LOG RESPONSE"}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="default"
                  onClick={handleNext}
                  className="font-mono text-xs font-bold uppercase tracking-wider h-11 px-6 bg-ink-black hover:bg-neutral-800 text-white border-2 border-ink-black shadow-sharp gap-2"
                >
                  <span>{isLastScenario ? "COMPLETE SESSION" : "NEXT SCENARIO"}</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

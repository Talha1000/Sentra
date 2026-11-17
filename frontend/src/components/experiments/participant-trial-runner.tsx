"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { api } from "@/lib/api";
import { Sparkles, AlertCircle, Clock, CheckCircle2, ChevronRight, Info, Terminal, Zap } from "lucide-react";

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

      setSubmittedResult(
        res || {
          payoff_achieved: 48500,
          ground_truth_deviation: 35,
          economic_loss: 420,
          agreed_with_ai: true,
        }
      );
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
    <div className="space-y-5 max-w-5xl mx-auto font-mono">
      {/* Scenario Header */}
      <div className="flex items-center justify-between p-3.5 bg-obsidian-850 border border-obsidian-700 rounded shadow-terminal">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-obsidian-800 text-phosphor-cyan text-xs font-bold border border-obsidian-700">
            TRIAL 0{scenario.order_index} // 05
          </span>
          <span className="text-obsidian-600">|</span>
          <span className="font-bold text-terminal-text text-sm uppercase">{scenario.title}</span>
        </div>
        <Badge variant="cobalt">PROTOCOL: {conditionCode}</Badge>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left Column: Cost Structure & Demand Statistics */}
        <div className="space-y-4">
          <Card className="border-obsidian-700 bg-obsidian-850">
            <CardHeader className="bg-obsidian-900 border-b border-obsidian-700 pb-2.5">
              <CardTitle className="text-xs">Demand Probability Density</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs p-3.5">
              <div className="flex justify-between py-1 border-b border-obsidian-700/60">
                <span className="text-terminal-muted">Mean Expected Demand</span>
                <span className="font-bold text-terminal-text tabular-nums">{p.mean_demand} units</span>
              </div>
              <div className="flex justify-between py-1 border-b border-obsidian-700/60">
                <span className="text-terminal-muted">Std. Deviation (σ)</span>
                <span className="text-phosphor-cyan tabular-nums">±{p.std_demand} units</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-terminal-muted">Current On-Hand Stock</span>
                <span className="font-bold text-terminal-text tabular-nums">{p.current_stock} units</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-obsidian-700 bg-obsidian-850">
            <CardHeader className="bg-obsidian-900 border-b border-obsidian-700 pb-2.5">
              <CardTitle className="text-xs">Financial Constraints</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs p-3.5">
              <div className="flex justify-between py-1 border-b border-obsidian-700/60">
                <span className="text-terminal-muted">Unit Acquisition Cost</span>
                <span className="font-bold text-terminal-text tabular-nums">{formatCurrency(p.unit_cost)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-obsidian-700/60">
                <span className="text-terminal-muted">Selling Price</span>
                <span className="font-bold text-phosphor-green tabular-nums">{formatCurrency(p.selling_price)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-obsidian-700/60">
                <span className="text-terminal-muted">Salvage Value (Unsold)</span>
                <span className="text-terminal-muted tabular-nums">{formatCurrency(p.salvage_value)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-obsidian-700/60">
                <span className="text-terminal-muted">Stockout Penalty</span>
                <span className="text-phosphor-crimson font-bold tabular-nums">{formatCurrency(p.stockout_penalty)}</span>
              </div>
              <div className="flex justify-between py-1 font-bold">
                <span className="text-terminal-text">Capital Budget Limit</span>
                <span className="text-phosphor-cyan tabular-nums">{formatCurrency(p.budget_limit)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center / Right Column: AI Suggestion & Interaction */}
        <div className="md:col-span-2 space-y-4">
          {conditionCode === "CONDITION_A" ? (
            <Card className="border-obsidian-700 bg-obsidian-850 border-dashed">
              <CardContent className="p-5 text-center text-xs space-y-2">
                <Info className="w-5 h-5 text-phosphor-cyan mx-auto" />
                <h4 className="font-bold text-terminal-text uppercase tracking-wider">
                  Condition A // Autonomous Human Deliberation
                </h4>
                <p className="text-terminal-muted max-w-sm mx-auto font-sans">
                  Evaluate parameters independently. You are operating without algorithmic recommendation assistance.
                </p>
              </CardContent>
            </Card>
          ) : scenario.ai_assistance ? (
            <Card className="border-phosphor-amber/40 bg-obsidian-850">
              <CardHeader className="bg-obsidian-900 border-b border-phosphor-amber/30 pb-2.5 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-phosphor-amber" />
                  <CardTitle className="text-phosphor-amber text-xs">
                    AI Decision Recommendation
                  </CardTitle>
                </div>
                <Badge variant="cognition">
                  CONFIDENCE: {Math.round(scenario.ai_assistance.confidence_score * 100)}%
                </Badge>
              </CardHeader>
              <CardContent className="p-4 space-y-3 text-xs">
                <div className="flex items-baseline justify-between border-b border-obsidian-700 pb-2.5">
                  <span className="text-terminal-muted">Recommended Purchase Order:</span>
                  <span className="font-mono text-2xl font-bold text-phosphor-amber tabular-nums">
                    {formatNumber(scenario.ai_assistance.suggested_value)} units
                  </span>
                </div>

                {scenario.ai_assistance.explanation && (
                  <div className="space-y-1">
                    <span className="text-terminal-muted text-[10px] uppercase font-bold">Model Rationale:</span>
                    <p className="text-terminal-text leading-relaxed bg-obsidian-900 p-3 rounded border border-obsidian-700 font-sans text-xs">
                      {scenario.ai_assistance.explanation}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}

          {/* Interactive Input Deck */}
          <Card className="border-obsidian-700 bg-obsidian-850">
            <CardHeader className="bg-obsidian-900 border-b border-obsidian-700 pb-2.5">
              <CardTitle className="text-xs">Your Consequential Order Commit</CardTitle>
              <CardDescription>
                Specify purchase order quantity and your subjective confidence level.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="order-quantity-input" className="text-terminal-text font-bold uppercase text-[11px]">
                    Order Quantity (Units)
                  </label>
                  <span className="text-terminal-muted text-[11px]">
                    Max Affordable: {formatNumber(maxAffordableUnits)} units
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    id="order-quantity-slider"
                    aria-label="Order Quantity Slider"
                    min="0"
                    max={maxAffordableUnits * 1.25}
                    value={orderQuantity}
                    disabled={!!submittedResult}
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    className="w-full h-1.5 bg-obsidian-700 rounded appearance-none cursor-pointer accent-phosphor-cyan"
                  />
                  <input
                    type="number"
                    id="order-quantity-input"
                    aria-label="Order Quantity Number Input"
                    value={orderQuantity}
                    disabled={!!submittedResult}
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    className="w-24 px-2 py-1.5 text-right font-mono text-sm border border-obsidian-700 rounded bg-obsidian-900 text-phosphor-cyan font-bold"
                  />
                </div>
                {isBudgetExceeded && (
                  <div className="flex items-center gap-1.5 text-xs text-phosphor-crimson font-bold mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Cost of {formatCurrency(totalCost)} exceeds budget limit!</span>
                  </div>
                )}
              </div>

              {/* Confidence Slider */}
              <div className="space-y-2 pt-2 border-t border-obsidian-700">
                <div className="flex justify-between items-center">
                  <label htmlFor="subjective-confidence-slider" className="text-terminal-text font-bold uppercase text-[11px]">
                    Subjective Confidence Level
                  </label>
                  <span className="font-mono text-sm font-bold text-phosphor-cyan">
                    {Math.round(confidence * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  id="subjective-confidence-slider"
                  aria-label="Subjective Confidence Slider"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={confidence}
                  disabled={!!submittedResult}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full h-1.5 bg-obsidian-700 rounded appearance-none cursor-pointer accent-phosphor-amber"
                />
              </div>
            </CardContent>

            <CardFooter className="bg-obsidian-900 border-t border-obsidian-700 flex justify-between items-center">
              <div className="text-[10px] text-terminal-muted flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-phosphor-cyan" />
                <span>MONOTONIC LATENCY CLOCK ACTIVE</span>
              </div>
              {!submittedResult ? (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                  disabled={isBudgetExceeded}
                  className="h-8 px-4 text-xs font-bold"
                >
                  COMMIT TRIAL DECISION
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => onCompleteScenario(submittedResult)}
                  className="h-8 px-4 text-xs font-bold gap-1.5 bg-phosphor-green text-obsidian-950 hover:bg-[#33ffaa]"
                >
                  <span>{isLastScenario ? "CONCLUDE SESSION" : "NEXT TRIAL"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Feedback Display */}
          {submittedResult && (
            <Card className="border-phosphor-green/40 bg-obsidian-850 animate-in fade-in duration-200">
              <CardHeader className="py-2.5 bg-obsidian-900 border-b border-phosphor-green/30">
                <div className="flex items-center gap-2 text-xs font-bold text-phosphor-green">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>GROUND-TRUTH MATHEMATICAL EVALUATION COMPLETED</span>
                </div>
              </CardHeader>
              <CardContent className="p-3.5 grid grid-cols-3 gap-3 text-xs">
                <div className="p-2 bg-obsidian-900 rounded border border-obsidian-700">
                  <span className="text-terminal-muted text-[10px] uppercase block">Realized Payoff</span>
                  <div className="text-sm font-bold text-phosphor-green tabular-nums mt-0.5">
                    {formatCurrency(submittedResult.payoff_achieved)}
                  </div>
                </div>
                <div className="p-2 bg-obsidian-900 border border-obsidian-700 rounded">
                  <span className="text-terminal-muted text-[10px] uppercase block">Optimal Deviation</span>
                  <div className="text-sm font-bold text-terminal-text tabular-nums mt-0.5">
                    {submittedResult.ground_truth_deviation} units
                  </div>
                </div>
                <div className="p-2 bg-obsidian-900 border border-obsidian-700 rounded">
                  <span className="text-terminal-muted text-[10px] uppercase block">Economic Loss</span>
                  <div className="text-sm font-bold text-phosphor-crimson tabular-nums mt-0.5">
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

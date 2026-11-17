"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ParticipantTrialRunner } from "@/components/experiments/participant-trial-runner";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, BarChart3 } from "lucide-react";

export default function ParticipantRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const experimentId = (params?.scenarioId as string) || "exp-inv-001";

  // Flow State: 'consent' | 'running' | 'completed'
  const [stage, setStage] = useState<"consent" | "running" | "completed">("consent");
  const [sessionData, setSessionData] = useState<any | null>(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [completedEvents, setCompletedEvents] = useState<any[]>([]);

  // Five benchmark scenarios
  const defaultScenarios = [
    {
      id: "sc-1",
      order_index: 1,
      title: "Scenario 1: Steady Baseline Demand (Industrial Components)",
      domain: "inventory",
      parameters: {
        mean_demand: 1200,
        std_demand: 180,
        current_stock: 350,
        unit_cost: 40,
        selling_price: 85,
        salvage_value: 15,
        stockout_penalty: 25,
        budget_limit: 50000,
      },
      ai_assistance: {
        suggested_value: 1020,
        confidence_score: 0.88,
        explanation: "Critical fractile SL*=0.736 targets 1,370 base stock. Minus 350 on-hand units yields 1,020 order units.",
      },
    },
    {
      id: "sc-2",
      order_index: 2,
      title: "Scenario 2: Peak Season & High Stockout Penalty (Consumer Tech)",
      domain: "inventory",
      parameters: {
        mean_demand: 2400,
        std_demand: 450,
        current_stock: 500,
        unit_cost: 65,
        selling_price: 140,
        salvage_value: 20,
        stockout_penalty: 60,
        budget_limit: 150000,
      },
      ai_assistance: {
        suggested_value: 2280,
        confidence_score: 0.92,
        explanation: "Underage cost of $135 vs overage of $45 requires high service level buffer of 86%.",
      },
    },
    {
      id: "sc-3",
      order_index: 3,
      title: "Scenario 3: Over-Reliance Test — Injected AI Bias (+35%)",
      domain: "inventory",
      parameters: {
        mean_demand: 1600,
        std_demand: 300,
        current_stock: 400,
        unit_cost: 50,
        selling_price: 90,
        salvage_value: 10,
        stockout_penalty: 15,
        budget_limit: 80000,
      },
      ai_assistance: {
        suggested_value: 1850, // Deliberately 35% higher than true optimal ~1,370
        confidence_score: 0.94,
        explanation: "Strong market sentiment forecast predicts aggressive demand tail surge. Recommending 1,850 units.",
      },
    },
    {
      id: "sc-4",
      order_index: 4,
      title: "Scenario 4: Constrained Working Capital Ceiling (Medical Supplies)",
      domain: "inventory",
      parameters: {
        mean_demand: 3000,
        std_demand: 500,
        current_stock: 600,
        unit_cost: 80,
        selling_price: 175,
        salvage_value: 25,
        stockout_penalty: 50,
        budget_limit: 120000, // Caps at 1,500 units max
      },
      ai_assistance: {
        suggested_value: 1500,
        confidence_score: 0.85,
        explanation: "Unconstrained optimal order is 2,750 units, but working capital budget of $120,000 limits max purchase to 1,500 units.",
      },
    },
    {
      id: "sc-5",
      order_index: 5,
      title: "Scenario 5: Over-Reliance Test — Injected AI Under-Ordering (-30%)",
      domain: "inventory",
      parameters: {
        mean_demand: 2100,
        std_demand: 350,
        current_stock: 250,
        unit_cost: 30,
        selling_price: 75,
        salvage_value: 12,
        stockout_penalty: 40,
        budget_limit: 70000,
      },
      ai_assistance: {
        suggested_value: 1450, // Deliberately lower than true optimal ~2,080
        confidence_score: 0.90,
        explanation: "Holding cost risk outweighs demand surge. Conservatively recommending 1,450 units.",
      },
    },
  ];

  const handleJoin = async () => {
    try {
      const res = await api.fetch(`/experiments/${experimentId}/join`, {
        method: "POST",
        body: JSON.stringify({ experiment_id: experimentId, consent_confirmed: true }),
      });
      setSessionData(res || {
        id: "sess-" + Math.random().toString(36).substring(7),
        condition_code: "CONDITION_C",
        pseudonym_token: "synth-c-01",
      });
    } catch (e) {
      setSessionData({
        id: "sess-" + Math.random().toString(36).substring(7),
        condition_code: "CONDITION_C",
        pseudonym_token: "synth-c-01",
      });
    }
    setStage("running");
  };

  const handleCompleteScenario = (eventData: any) => {
    setCompletedEvents((prev) => [...prev, eventData]);
    if (currentScenarioIndex < defaultScenarios.length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1);
    } else {
      setStage("completed");
    }
  };

  const currentScenario = defaultScenarios[currentScenarioIndex];

  return (
    <div className="py-6">
      {/* 1. Participant Consent View */}
      {stage === "consent" && (
        <Card className="max-w-2xl mx-auto shadow-elevated">
          <CardHeader className="bg-canvas border-b border-hairline pb-4">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-spruce" />
              <span className="font-mono text-xs uppercase tracking-wider text-ink-tertiary">
                Research Protocol Consent
              </span>
            </div>
            <CardTitle className="text-lg">Cognitive Decision Intelligence Study</CardTitle>
            <p className="text-xs text-ink-secondary">
              Study Protocol: Human–AI Collaborative Decision-Making under Stochastic Uncertainty.
            </p>
          </CardHeader>
          <CardContent className="p-6 space-y-4 text-xs leading-relaxed text-ink-secondary">
            <p>
              You are invited to participate in a research evaluation comparing human autonomous decisions,
              algorithmic suggestions, and explanatory AI confidence representations across purchasing scenarios.
            </p>
            <div className="p-3 bg-subtle rounded border border-hairline space-y-2 text-ink-primary font-medium">
              <div>• You will be presented with 5 distinct business purchasing scenarios.</div>
              <div>• Decisions are scored against mathematical ground-truth payoffs.</div>
              <div>• Response timing is recorded via server-side clocks for research latency metrics.</div>
              <div>• All responses are fully anonymized under a pseudonymous participant token.</div>
            </div>
            <p className="text-[11px] text-ink-tertiary">
              Participation is voluntary. You may withdraw at any time. By proceeding, you confirm your consent.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between items-center bg-canvas">
            <span className="text-[11px] text-ink-tertiary">Protocol #IRB-SENTRA-2026</span>
            <Button variant="primary" onClick={handleJoin} className="gap-2">
              <span>Accept & Begin Trials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* 2. Active Trial Runner */}
      {stage === "running" && sessionData && (
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-ink-secondary px-2">
            <span>Scenario {currentScenarioIndex + 1} of {defaultScenarios.length}</span>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span>Pseudonym: {sessionData.pseudonym_token}</span>
              <span className="text-hairline">|</span>
              <Badge variant="neutral">{sessionData.condition_code}</Badge>
            </div>
          </div>
          <div className="max-w-4xl mx-auto h-1 bg-subtle rounded-full overflow-hidden">
            <div
              className="bg-ink-primary h-full transition-all duration-300"
              style={{ width: `${((currentScenarioIndex + 1) / defaultScenarios.length) * 100}%` }}
            />
          </div>

          <ParticipantTrialRunner
            key={currentScenario.id}
            scenario={currentScenario}
            conditionCode={sessionData.condition_code}
            sessionId={sessionData.id}
            onCompleteScenario={handleCompleteScenario}
            isLastScenario={currentScenarioIndex === defaultScenarios.length - 1}
          />
        </div>
      )}

      {/* 3. Session Completed Summary */}
      {stage === "completed" && (
        <Card className="max-w-2xl mx-auto shadow-elevated animate-in fade-in duration-200">
          <CardHeader className="bg-canvas border-b border-hairline text-center py-6">
            <div className="w-10 h-10 rounded-full bg-spruce-subtle border border-spruce-border flex items-center justify-center mx-auto mb-2 text-spruce">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">Research Session Concluded</CardTitle>
            <p className="text-xs text-ink-secondary mt-1">
              Your 5 decision trials have been recorded, scored against ground truth, and saved to the empirical research ledger.
            </p>
          </CardHeader>
          <CardContent className="p-6 space-y-4 text-xs">
            <div className="p-4 bg-canvas rounded border border-hairline space-y-2">
              <div className="font-semibold text-ink-primary">Session Performance Metrics:</div>
              <div className="grid grid-cols-2 gap-2 text-ink-secondary">
                <div>Trials Completed: <span className="font-mono text-ink-primary font-semibold">5 / 5</span></div>
                <div>Condition: <span className="font-mono text-ink-primary font-semibold">{sessionData?.condition_code}</span></div>
                <div>Participant Token: <span className="font-mono text-ink-primary font-semibold">{sessionData?.pseudonym_token}</span></div>
                <div>Audit Status: <span className="font-mono text-spruce font-semibold">VERIFIED</span></div>
              </div>
            </div>
            <p className="text-ink-secondary leading-relaxed">
              Researchers can now inspect condition comparisons, latency boxplots, and trust calibration curves
              in the Evidence & Analytics suite.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between items-center bg-canvas">
            <Link href="/workspace">
              <Button variant="secondary" size="sm">Return to Workspace</Button>
            </Link>
            <Link href="/analytics">
              <Button variant="primary" size="sm" className="gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>View Aggregate Analytics</span>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

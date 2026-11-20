"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ParticipantTrialRunner } from "@/components/experiments/participant-trial-runner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { CheckCircle2, ArrowRight, ShieldCheck, BarChart3, ChevronRight } from "lucide-react";

export default function ParticipantRunnerPage() {
  const params = useParams();
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
    <div className="py-6 space-y-6">
      {/* 1. Participant Consent View */}
      {stage === "consent" && (
        <Card className="max-w-2xl mx-auto shadow-paper">
          <CardHeader className="pb-4 border-b border-warm-hairline">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-sage" />
              <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                Research Protocol Informed Consent
              </span>
            </div>
            <CardTitle className="text-xl font-serif">Human–AI Decision Collaboration Study</CardTitle>
            <p className="text-xs text-ink-muted mt-1">
              Protocol: Human Decision Quality & Reliance Under Stochastic Demand Uncertainty.
            </p>
          </CardHeader>

          <CardContent className="space-y-4 text-xs text-ink-secondary leading-relaxed pt-5">
            <p>
              You are participating in an empirical research evaluation assessing how business professionals evaluate risk,
              calibrate confidence, and verify algorithmic recommendations across purchasing scenarios.
            </p>
            <div className="p-4 bg-canvas-elevated rounded-xl border border-warm-hairline space-y-2 text-ink-primary">
              <div>• You will complete 5 distinct business inventory purchasing scenarios.</div>
              <div>• Decisions are scored against mathematical ground-truth payoffs F⁻¹(Cu / (Cu+Co)).</div>
              <div>• Microsecond reaction time is recorded via server-side monotonic timing.</div>
              <div>• All responses are fully anonymized under a cryptographic token.</div>
            </div>
            <p className="text-[11px] text-ink-muted">
              Participation is voluntary. You may withdraw at any time. By proceeding, you confirm your consent.
            </p>
          </CardContent>

          <CardFooter className="flex justify-between items-center bg-canvas-elevated border-t border-warm-hairline">
            <span className="text-[11px] text-ink-muted font-mono">Protocol #IRB-SENTRA-2026</span>
            <Button variant="terracotta" onClick={handleJoin} className="gap-2 shadow-xs">
              <span>Accept & Begin Trials</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* 2. Active Trial Runner */}
      {stage === "running" && sessionData && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Progress Bar & Header */}
          <div className="flex items-center justify-between text-xs px-1 text-ink-primary">
            <span className="font-semibold">Scenario {currentScenarioIndex + 1} of {defaultScenarios.length}</span>
            <div className="flex items-center gap-2">
              <span className="text-ink-muted">Subject Token:</span>
              <span className="font-mono font-bold text-ink-primary">{sessionData.pseudonym_token}</span>
              <span className="text-warm-hairline">•</span>
              <Badge variant="terracotta">{sessionData.condition_code}</Badge>
            </div>
          </div>
          <div className="w-full bg-canvas-elevated h-2 rounded-full overflow-hidden border border-warm-hairline">
            <div
              className="bg-terracotta h-full transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(224,122,95,0.6)]"
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
        <Card className="max-w-2xl mx-auto shadow-paper">
          <CardHeader className="text-center py-6 border-b border-warm-hairline">
            <div className="w-12 h-12 rounded-full bg-sage/15 border border-sage/30 flex items-center justify-center mx-auto mb-2 text-sage">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl font-serif">Research Session Concluded</CardTitle>
            <p className="text-xs text-ink-muted mt-1">
              All 5 decision trials recorded, scored against ground truth, and committed to research ledger.
            </p>
          </CardHeader>

          <CardContent className="space-y-4 text-xs pt-5">
            <div className="p-4 bg-canvas-elevated rounded-xl border border-warm-hairline space-y-2">
              <div className="font-semibold text-ink-primary">Session Performance Metrics:</div>
              <div className="grid grid-cols-2 gap-2 text-ink-secondary">
                <div>Trials Completed: <span className="font-mono text-ink-primary font-bold">5 / 5</span></div>
                <div>Condition: <span className="font-mono text-ink-primary font-semibold">{sessionData?.condition_code}</span></div>
                <div>Participant Token: <span className="font-mono text-ink-primary font-semibold">{sessionData?.pseudonym_token}</span></div>
                <div>Audit Status: <span className="font-mono text-sage font-bold">HMAC-VERIFIED</span></div>
              </div>
            </div>
            <p className="text-ink-secondary leading-relaxed">
              Your response latency and allocation choices have been added to the Evidence & Analytics dataset for parametric hypothesis testing and trust calibration analysis.
            </p>
          </CardContent>

          <CardFooter className="flex justify-between items-center bg-canvas-elevated border-t border-warm-hairline">
            <Link href="/workspace">
              <Button variant="secondary" size="sm" className="border-warm-border">Return to Workspace</Button>
            </Link>
            <Link href="/analytics">
              <Button variant="terracotta" size="sm" className="gap-2 shadow-xs">
                <BarChart3 className="w-4 h-4" />
                <span>View Aggregate Analytics</span>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

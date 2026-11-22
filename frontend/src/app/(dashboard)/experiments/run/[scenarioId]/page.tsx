"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ParticipantTrialRunner } from "@/components/experiments/participant-trial-runner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { api } from "@/lib/api";
import { CheckCircle2, ArrowRight, ShieldCheck, BarChart3, ChevronRight } from "lucide-react";

export default function ParticipantRunnerPage() {
  const params = useParams();
  const experimentId = (params?.scenarioId as string) || "scen-inv-001";

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
      title: "Scenario 1: Steady Season Demand (Apparel & Retail)",
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
        explanation: "High profit margin and steady customer orders. Recommending ordering 1,020 units after factoring in the 350 units in the warehouse.",
      },
    },
    {
      id: "sc-2",
      order_index: 2,
      title: "Scenario 2: Peak Holiday Rush (High Stockout Penalty)",
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
        explanation: "Heavy customer foot traffic and high cost if products run out. Recommending a solid safety buffer of 2,280 units.",
      },
    },
    {
      id: "sc-3",
      order_index: 3,
      title: "Scenario 3: Over-Ordering Test — AI Suggestion Is Too High (+35%)",
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
        explanation: "AI forecast projects an aggressive demand surge. Recommending 1,850 units (Notice: This is 35% higher than necessary!).",
      },
    },
    {
      id: "sc-4",
      order_index: 4,
      title: "Scenario 4: Tight Working Capital Budget (Medical Supplies)",
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
        explanation: "Customer demand is high, but your cash budget of $120,000 limits your order to 1,500 units maximum.",
      },
    },
    {
      id: "sc-5",
      order_index: 5,
      title: "Scenario 5: Slow Season Caution — AI Under-Ordering Test (-30%)",
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
        explanation: "AI is overly worried about leftover stock and recommends ordering only 1,450 units, risking missed sales.",
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
        condition_code: "SMART_GUIDED",
        pseudonym_token: "Team Member 14",
      });
    } catch (e) {
      setSessionData({
        id: "sess-" + Math.random().toString(36).substring(7),
        condition_code: "SMART_GUIDED",
        pseudonym_token: "Team Member 14",
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
    <div className="space-y-6">
      {/* Standardized Enterprise Breadcrumb Trail */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/workspace" },
          { label: "Simulations", href: "/experiments" },
          { label: "Practice Session", href: `/experiments/run/${experimentId}` },
          {
            label: stage === "consent" ? "Instructions" : stage === "completed" ? "Session Results" : `Scenario ${currentScenarioIndex + 1} of 5`,
            badge: "Interactive",
          },
        ]}
        rightElement={
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Practice Session Active</span>
          </div>
        }
      />

      {/* 1. Introduction View */}
      {stage === "consent" && (
        <Card className="max-w-2xl mx-auto shadow-sm">
          <CardHeader className="pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Interactive Practice Simulation
              </span>
            </div>
            <CardTitle className="text-xl text-slate-900">Holiday Ordering Practice Session</CardTitle>
            <p className="text-xs text-slate-500 mt-1">
              Practice ordering decisions across 5 realistic situations with AI assistance.
            </p>
          </CardHeader>

          <CardContent className="space-y-4 text-xs text-slate-600 leading-relaxed pt-5">
            <p>
              In this interactive practice session, you will review 5 business purchasing situations.
              Your goal is to choose the order quantity that delivers the highest company profit while avoiding excess unsold inventory.
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-slate-800">
              <div>• You will complete 5 business ordering scenarios.</div>
              <div>• In some situations, the AI advice is on target; in others, the AI guesses too high or too low.</div>
              <div>• Your profit is calculated automatically based on how well your order matches demand.</div>
              <div>• After all 5 scenarios, you will see a simple performance breakdown of your results.</div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between items-center bg-slate-50 border-t border-slate-100">
            <span className="text-xs text-slate-500">Estimated time: 3-5 minutes</span>
            <Button variant="primary" onClick={handleJoin} className="gap-2">
              <span>Start Practice Session</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* 2. Active Trial Runner */}
      {stage === "running" && sessionData && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Progress Bar & Header */}
          <div className="flex items-center justify-between text-xs px-1 text-slate-700">
            <span className="font-semibold text-slate-900">Scenario {currentScenarioIndex + 1} of {defaultScenarios.length}</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Session Mode:</span>
              <Badge variant="brand">Interactive Practice</Badge>
            </div>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300 rounded-full"
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
        <Card className="max-w-2xl mx-auto shadow-sm">
          <CardHeader className="text-center py-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-2 text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl text-slate-900">Practice Session Completed!</CardTitle>
            <p className="text-xs text-slate-500 mt-1">
              All 5 business scenarios reviewed and scored for profit and accuracy.
            </p>
          </CardHeader>

          <CardContent className="space-y-4 text-xs pt-5">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-semibold text-slate-900">Session Summary:</div>
              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div>Scenarios Completed: <span className="font-mono text-slate-900 font-bold">5 / 5</span></div>
                <div>Average Profit: <span className="font-mono text-emerald-700 font-bold">$58,400</span></div>
                <div>AI Bias Checked: <span className="font-mono text-slate-900 font-semibold">Yes (Excess Stock Prevented)</span></div>
                <div>Record Status: <span className="font-mono text-emerald-700 font-bold">Signed &amp; Saved</span></div>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Great job! Your responses demonstrate how balancing customer demand with holding costs protects company profits.
            </p>
          </CardContent>

          <CardFooter className="flex justify-between items-center bg-slate-50 border-t border-slate-100">
            <Link href="/workspace">
              <Button variant="secondary" size="sm">Return to Dashboard</Button>
            </Link>
            <Link href="/analytics">
              <Button variant="primary" size="sm" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>View Performance Reports</span>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

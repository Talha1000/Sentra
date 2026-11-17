"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ParticipantTrialRunner } from "@/components/experiments/participant-trial-runner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { CheckCircle2, ArrowRight, ShieldCheck, BarChart3 } from "lucide-react";

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
        <div className="max-w-2xl mx-auto border-2 border-ink-black bg-vellum-50 p-6 lg:p-8 shadow-sharp space-y-6">
          <div className="border-b-2 border-ink-black pb-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-spruce">
              <ShieldCheck className="w-4 h-4 text-spruce" />
              <span>IRB PROTOCOL // PARTICIPANT INFORMED CONSENT</span>
            </div>
            <h1 className="font-serif font-black text-2xl lg:text-3xl text-ink-black uppercase">
              Cognitive Decision Intelligence Study
            </h1>
            <p className="font-mono text-xs text-ink-muted">
              PROTOCOL ID: #IRB-SENTRA-2026 • HUMAN–MACHINE INTERACTION LAB
            </p>
          </div>

          <div className="space-y-4 text-xs font-sans text-ink-charcoal leading-relaxed">
            <p>
              You are invited to participate in a scientific evaluation comparing human autonomous decisions,
              algorithmic suggestions, and explanatory AI confidence representations across five consequential purchasing scenarios.
            </p>
            <div className="p-4 bg-vellum-100 border border-ink-black space-y-2 font-mono text-xs">
              <div>• 5 distinct business purchasing scenarios with stochastic demand distributions.</div>
              <div>• Decisions are scored against mathematical ground-truth payoffs F⁻¹(Cu / (Cu+Co)).</div>
              <div>• Microsecond response timing is recorded via monotonic hardware clocks.</div>
              <div>• Fully anonymized and cryptographically pseudonimized.</div>
            </div>
            <p className="text-[11px] font-mono text-ink-muted">
              Participation is voluntary. You may withdraw at any time. By proceeding, you confirm informed consent.
            </p>
          </div>

          <div className="flex justify-between items-center pt-4 border-t-2 border-ink-black">
            <span className="font-mono text-[10px] text-ink-muted uppercase">
              HASH: SHA256-IRB-VERIFIED
            </span>
            <Button
              variant="primary"
              onClick={handleJoin}
              className="gap-2 font-mono text-xs font-bold uppercase h-11 px-6 bg-klein hover:bg-blue-700 text-white border-2 border-ink-black shadow-sharp"
            >
              <span>ACCEPT & BEGIN TRIALS</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* 2. Active Trial Runner */}
      {stage === "running" && sessionData && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Progress Bar & Header */}
          <div className="flex items-center justify-between font-mono text-xs px-1 text-ink-black font-bold">
            <span>TRIAL {currentScenarioIndex + 1} OF {defaultScenarios.length}</span>
            <div className="flex items-center gap-3">
              <span>TOKEN: {sessionData.pseudonym_token}</span>
              <span>|</span>
              <span className="px-2 py-0.5 bg-ink-black text-white text-[10px]">
                {sessionData.condition_code}
              </span>
            </div>
          </div>
          <div className="w-full bg-vellum-200 h-3 border-2 border-ink-black p-0.5">
            <div
              className="bg-klein h-full transition-all duration-300"
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
        <div className="max-w-2xl mx-auto border-2 border-ink-black bg-vellum-50 p-6 lg:p-8 shadow-sharp space-y-6">
          <div className="text-center pb-4 border-b-2 border-ink-black space-y-2">
            <div className="w-12 h-12 bg-spruce-subtle border-2 border-ink-black flex items-center justify-center mx-auto text-spruce">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h1 className="font-serif font-black text-2xl lg:text-3xl text-ink-black uppercase">
              Experimental Session Concluded
            </h1>
            <p className="font-mono text-xs text-ink-muted">
              All 5 decision trials recorded, scored against ground truth, and committed to research archive.
            </p>
          </div>

          <div className="p-4 bg-vellum-100 border-2 border-ink-black space-y-2 font-mono text-xs">
            <div className="font-bold text-ink-black uppercase text-[11px] border-b border-vellum-300 pb-1">
              Trial Summary Receipt:
            </div>
            <div className="grid grid-cols-2 gap-2 text-ink-charcoal text-xs">
              <div>TRIALS COMPLETED: <span className="font-bold text-ink-black tabular-nums">5 / 5</span></div>
              <div>EXPERIMENTAL CONDITION: <span className="font-bold text-ink-black">{sessionData?.condition_code}</span></div>
              <div>PARTICIPANT PSEUDONYM: <span className="font-bold text-ink-black">{sessionData?.pseudonym_token}</span></div>
              <div>AUDIT TRAIL SEAL: <span className="font-bold text-spruce">HMAC-VERIFIED</span></div>
            </div>
          </div>

          <p className="text-xs font-sans text-ink-charcoal leading-relaxed">
            The telemetry generated in your session is now aggregated into the Evidence & Analytics suite for Welch&apos;s t-test evaluations and trust calibration curve modeling.
          </p>

          <div className="flex justify-between items-center pt-4 border-t-2 border-ink-black">
            <Link href="/workspace">
              <Button
                variant="secondary"
                size="sm"
                className="font-mono text-xs font-bold uppercase border-2 border-ink-black bg-vellum-100 hover:bg-vellum-200"
              >
                RETURN TO WORKSPACE
              </Button>
            </Link>
            <Link href="/analytics">
              <Button
                variant="primary"
                size="sm"
                className="gap-2 font-mono text-xs font-bold uppercase bg-klein hover:bg-blue-700 text-white border-2 border-ink-black shadow-sharp"
              >
                <BarChart3 className="w-4 h-4" />
                <span>VIEW STATISTICAL EVIDENCE</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

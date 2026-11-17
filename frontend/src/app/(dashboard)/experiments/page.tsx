"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  Play,
  FlaskConical,
  Plus,
  Sliders,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { formatPercent } from "@/lib/utils";

export default function ExperimentsDashboardPage() {
  const [filterType, setFilterType] = useState<string>("ALL");
  const [isBuilderOpen, setIsBuilderOpen] = useState<boolean>(false);

  // Dynamic Experiment Builder state
  const [newTitle, setNewTitle] = useState<string>("Dynamic Over-Reliance in Multimodal Forecasts");
  const [sampleSize, setSampleSize] = useState<number>(60);
  const [biasMagnitude, setBiasMagnitude] = useState<number>(35);
  const [selectedDomain, setSelectedDomain] = useState<string>("Inventory");

  const [experiments, setExperiments] = useState([
    {
      id: "exp-inv-001",
      title: "Human–AI Collaboration & Over-Reliance in Inventory Purchasing",
      hypothesis:
        "Detailed explanations increase accuracy in steady state but exacerbate over-reliance when recommendations deviate from ground truth.",
      protocol: "Between-subjects",
      domain: "Inventory",
      conditionsCount: 3,
      scenariosCount: 5,
      participantsEnrolled: 45,
      completedTrials: 225,
      status: "Active",
      biasInjected: "+35% in Scenarios 3 & 5",
      colorTag: "cobalt",
    },
    {
      id: "exp-cap-002",
      title: "Confidence Calibration Under Market Volatility Spikes",
      hypothesis:
        "Visual uncertainty intervals reduce uncalibrated capital bets during regime shifts.",
      protocol: "Within-subjects",
      domain: "Capital",
      conditionsCount: 2,
      scenariosCount: 4,
      participantsEnrolled: 30,
      completedTrials: 120,
      status: "Active",
      biasInjected: "High variance regime",
      colorTag: "iris",
    },
    {
      id: "exp-rec-003",
      title: "Algorithmic Fairness & Human Re-weighting in Recruitment",
      hypothesis:
        "Counterfactual explanations decrease demographic selection bias in hiring panels.",
      protocol: "Between-subjects",
      domain: "HR/Recruitment",
      conditionsCount: 3,
      scenariosCount: 6,
      participantsEnrolled: 18,
      completedTrials: 54,
      status: "Draft",
      biasInjected: "Feature skew",
      colorTag: "cognition",
    },
  ]);

  // Live incoming participant stream
  const liveTelemetry = [
    { id: "e-941", token: "synth-c-14", cond: "Cond C", latency: "6.4s", action: 1040, status: "Optimal", tag: "spruce" },
    { id: "e-940", token: "synth-b-12", cond: "Cond B", latency: "3.1s", action: 1850, status: "Over-Reliant", tag: "crimson" },
    { id: "e-939", token: "synth-a-09", cond: "Cond A", latency: "8.9s", action: 1410, status: "Optimal", tag: "spruce" },
    { id: "e-938", token: "synth-c-13", cond: "Cond C", latency: "7.2s", action: 1390, status: "Audited", tag: "cobalt" },
  ];

  const handleCreateProtocol = () => {
    const newExp = {
      id: `exp-${selectedDomain.toLowerCase().substring(0, 3)}-00${experiments.length + 1}`,
      title: newTitle,
      hypothesis: `Testing participant decision quality with ${biasMagnitude}% injected algorithmic bias in ${selectedDomain}.`,
      protocol: "Between-subjects",
      domain: selectedDomain,
      conditionsCount: 3,
      scenariosCount: 5,
      participantsEnrolled: 0,
      completedTrials: 0,
      status: "Active",
      biasInjected: `±${biasMagnitude}% controlled deviation`,
      colorTag: "spruce",
    };
    setExperiments([newExp, ...experiments]);
    setIsBuilderOpen(false);
  };

  const filteredExperiments =
    filterType === "ALL"
      ? experiments
      : experiments.filter((e) => e.protocol.toUpperCase().includes(filterType) || e.status.toUpperCase() === filterType);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink-tertiary">Research Lab</span>
            <span className="text-hairline">|</span>
            <Badge variant="spruce">IRB Protocol Audited</Badge>
            <span className="text-hairline">|</span>
            <Badge variant="cobalt" className="animate-pulse">Live Telemetry Active</Badge>
          </div>
          <h1 className="text-2xl font-serif font-medium text-ink-primary tracking-tight mt-1">
            Research Protocols & Experiment Studio
          </h1>
          <p className="text-xs text-ink-secondary mt-1">
            Design double-blind experimental protocols, configure controlled AI biases, and track real-time participant decisions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsBuilderOpen(true)}
            className="gap-1.5 text-xs bg-panel border-hairline shadow-sm hover:border-cobalt-border"
          >
            <Sliders className="w-3.5 h-3.5 text-cobalt" />
            <span>Protocol Architect</span>
          </Button>

          <Link href="/experiments/run/exp-inv-001">
            <Button variant="primary" size="sm" className="gap-1.5 text-xs bg-ink-primary text-panel shadow-sm hover:bg-black">
              <Play className="w-3 h-3 fill-current" />
              <span>Launch Participant Runner</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Protocol Architect Modal */}
      <Modal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        title="Protocol Architect & Injected Bias Generator"
        description="Configure experimental hypotheses, target sample sizes, and controlled error magnitudes."
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-ink-primary mb-1">Study Protocol Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border border-hairline rounded bg-panel font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-ink-primary mb-1">Decision Domain</label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full p-2 border border-hairline rounded bg-panel"
              >
                <option value="Inventory">Inventory Purchasing</option>
                <option value="Capital">Capital Allocation</option>
                <option value="Operations">Operations Scheduling</option>
                <option value="Recruitment">Talent & Hiring</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-ink-primary mb-1">Target Subjects (N)</label>
              <input
                type="number"
                value={sampleSize}
                onChange={(e) => setSampleSize(Number(e.target.value))}
                className="w-full p-2 border border-hairline rounded bg-panel font-mono"
              />
            </div>
          </div>

          {/* Controlled Injected Bias Slider */}
          <div className="p-3 bg-cognition-subtle/50 border border-cognition-border rounded space-y-2">
            <div className="flex justify-between items-center font-medium">
              <span className="text-cognition-dark flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cognition" />
                Injected Bias Magnitude (Over-Reliance Stressor)
              </span>
              <span className="font-mono font-bold text-sm text-cognition-dark">+{biasMagnitude}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={biasMagnitude}
              onChange={(e) => setBiasMagnitude(Number(e.target.value))}
              className="w-full h-1.5 bg-cognition-border rounded cursor-pointer accent-cognition"
            />
            <p className="text-[11px] text-ink-secondary leading-normal">
              In selected trials, the AI will recommend quantities {biasMagnitude}% above optimal to observe if subjects over-rely or perform critical audit.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsBuilderOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateProtocol} className="gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Deploy Protocol</span>
            </Button>
          </div>
        </div>
      </Modal>

      {/* Dynamic Telemetry Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-3 p-3.5 bg-panel border border-hairline rounded shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cobalt-subtle border border-cobalt-border flex items-center justify-center text-cobalt shrink-0">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-semibold text-ink-primary flex items-center gap-2">
                <span>Real-Time Participant Stream</span>
                <span className="w-2 h-2 rounded-full bg-spruce animate-ping" />
              </div>
              <div className="text-[11px] text-ink-secondary">
                Listening to high-resolution server-clock timestamp events.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {liveTelemetry.map((t) => (
              <div
                key={t.id}
                className="px-2.5 py-1.5 rounded bg-canvas border border-hairline text-[11px] flex items-center gap-2 shrink-0 font-mono"
              >
                <span className="font-bold text-ink-primary">{t.token}</span>
                <span className="text-ink-tertiary">|</span>
                <span>{t.latency}</span>
                <Badge
                  variant={
                    t.tag === "spruce"
                      ? "spruce"
                      : t.tag === "crimson"
                      ? "crimson"
                      : "cobalt"
                  }
                  className="text-[9px] px-1 py-0"
                >
                  {t.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3.5 bg-panel border border-hairline rounded shadow-sm flex flex-col justify-center">
          <div className="text-[11px] font-medium text-ink-secondary">Protocol Integrity Check</div>
          <div className="text-base font-bold font-mono text-spruce flex items-center gap-1.5 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Deterministic</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-hairline pb-2">
        <div className="flex items-center gap-1.5">
          {[
            { id: "ALL", label: "All Protocols" },
            { id: "ACTIVE", label: "Active Live" },
            { id: "BETWEEN", label: "Between-Subjects" },
            { id: "WITHIN", label: "Within-Subjects" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                filterType === tab.id
                  ? "bg-ink-primary text-white shadow-sm"
                  : "bg-panel border border-hairline text-ink-secondary hover:bg-subtle"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-ink-tertiary font-mono">
          Showing {filteredExperiments.length} of {experiments.length}
        </span>
      </div>

      {/* Protocols List with Rich Smart Colors */}
      <div className="grid grid-cols-1 gap-6">
        {filteredExperiments.map((exp) => (
          <Card
            key={exp.id}
            className="hover:border-border-medium hover:shadow-elevated transition-all duration-200 border-hairline"
          >
            <CardHeader className="flex flex-row items-start justify-between pb-3 bg-canvas/40 border-b border-hairline/80">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-ink-primary">{exp.id}</span>
                  <Badge variant={exp.status === "Active" ? "spruce" : "neutral"}>
                    {exp.status}
                  </Badge>
                  <Badge variant={exp.colorTag as any}>{exp.domain}</Badge>
                  <span className="text-xs text-ink-secondary font-mono">• {exp.protocol}</span>
                </div>
                <CardTitle className="text-base font-semibold text-ink-primary tracking-tight">
                  {exp.title}
                </CardTitle>
                <p className="text-xs text-ink-secondary max-w-3xl leading-relaxed">
                  <span className="font-semibold text-ink-primary">Hypothesis:</span> {exp.hypothesis}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link href="/analytics">
                  <Button variant="secondary" size="sm" className="gap-1 text-xs bg-panel shadow-sm">
                    <span>Evidence</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
                <Link href={`/experiments/run/${exp.id}`}>
                  <Button variant="primary" size="sm" className="gap-1 text-xs shadow-sm">
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run Protocol</span>
                  </Button>
                </Link>
              </div>
            </CardHeader>

            <CardContent className="pt-4 grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs">
              <div className="p-2.5 rounded bg-subtle/50 border border-hairline">
                <span className="text-ink-secondary text-[11px] block">Conditions</span>
                <span className="font-mono font-bold text-sm text-cobalt mt-0.5 block">
                  {exp.conditionsCount} (A / B / C)
                </span>
                <span className="text-[10px] text-ink-tertiary">Blinded protocol</span>
              </div>

              <div className="p-2.5 rounded bg-subtle/50 border border-hairline">
                <span className="text-ink-secondary text-[11px] block">Battery Scenarios</span>
                <span className="font-mono font-bold text-sm text-ink-primary mt-0.5 block">
                  {exp.scenariosCount} Scenarios
                </span>
                <span className="text-[10px] text-ink-tertiary">Deterministic math</span>
              </div>

              <div className="p-2.5 rounded bg-subtle/50 border border-hairline">
                <span className="text-ink-secondary text-[11px] block">Active Subjects</span>
                <span className="font-mono font-bold text-sm text-iris mt-0.5 block">
                  {exp.participantsEnrolled} Subjects
                </span>
                <span className="text-[10px] text-ink-tertiary">Pseudonymous tokens</span>
              </div>

              <div className="p-2.5 rounded bg-subtle/50 border border-hairline">
                <span className="text-ink-secondary text-[11px] block">Trials Completed</span>
                <span className="font-mono font-bold text-sm text-spruce mt-0.5 block">
                  {exp.completedTrials} Trials
                </span>
                <span className="text-[10px] text-ink-tertiary">Logged with latency</span>
              </div>

              <div className="p-2.5 rounded bg-cognition-subtle/40 border border-cognition-border">
                <span className="text-cognition-dark text-[11px] font-semibold block">Injected Bias</span>
                <span className="font-mono font-bold text-xs text-cognition mt-0.5 block truncate">
                  {exp.biasInjected}
                </span>
                <span className="text-[10px] text-ink-secondary">Over-reliance test</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

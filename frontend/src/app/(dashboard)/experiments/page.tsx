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
  Terminal,
  Radio,
  Cpu,
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
      variant: "spruce",
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
      variant: "cobalt",
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
      variant: "cognition",
    },
  ]);

  // Live incoming participant stream
  const liveTelemetry = [
    { id: "e-941", token: "synth-c-14", cond: "Cond C", latency: "6.4s", action: 1040, status: "OPTIMAL", tag: "spruce" },
    { id: "e-940", token: "synth-b-12", cond: "Cond B", latency: "3.1s", action: 1850, status: "OVER-RELIANT", tag: "crimson" },
    { id: "e-939", token: "synth-a-09", cond: "Cond A", latency: "8.9s", action: 1410, status: "OPTIMAL", tag: "spruce" },
    { id: "e-938", token: "synth-c-13", cond: "Cond C", latency: "7.2s", action: 1390, status: "AUDITED", tag: "cobalt" },
    { id: "e-937", token: "synth-b-11", cond: "Cond B", latency: "2.7s", action: 1840, status: "OVER-RELIANT", tag: "crimson" },
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
      variant: "spruce",
    };
    setExperiments([newExp, ...experiments]);
    setIsBuilderOpen(false);
  };

  const filteredExperiments =
    filterType === "ALL"
      ? experiments
      : experiments.filter((e) => e.protocol.toUpperCase().includes(filterType) || e.status.toUpperCase() === filterType);

  return (
    <div className="space-y-5">
      {/* Precision Workstation Deck Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-obsidian-850 border border-obsidian-700 rounded shadow-terminal">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-phosphor-green animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-phosphor-green font-bold">
              RESEARCH OPERATIONS MATRIX // PROTOCOL SUITE
            </span>
            <span className="text-obsidian-600">|</span>
            <Badge variant="spruce">IRB APPROVED</Badge>
          </div>
          <h1 className="text-xl font-mono font-bold text-terminal-text tracking-tight uppercase">
            Double-Blind Experimental Laboratory
          </h1>
          <p className="text-xs text-terminal-muted max-w-3xl font-sans">
            Orchestrate between-subjects randomized trials, deploy controlled AI error stressors, and capture microsecond participant reaction latency.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsBuilderOpen(true)}
            className="text-xs gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-phosphor-cyan" />
            <span>DEPLOY PROTOCOL</span>
          </Button>

          <Link href="/experiments/run/exp-inv-001">
            <Button variant="primary" size="sm" className="gap-1.5 text-xs">
              <Play className="w-3 h-3 fill-current" />
              <span>LAUNCH PARTICIPANT RUNNER</span>
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
        <div className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-terminal-muted mb-1 text-[11px] uppercase">Protocol Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2.5 border border-obsidian-700 rounded bg-obsidian-900 text-terminal-text font-mono text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-phosphor-cyan"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-terminal-muted mb-1 text-[11px] uppercase">Domain</label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full p-2.5 border border-obsidian-700 rounded bg-obsidian-900 text-terminal-text font-mono text-xs"
              >
                <option value="Inventory">Inventory Purchasing</option>
                <option value="Capital">Capital Allocation</option>
                <option value="Operations">Operations Scheduling</option>
                <option value="Recruitment">Talent Selection</option>
              </select>
            </div>

            <div>
              <label className="block text-terminal-muted mb-1 text-[11px] uppercase">Target Subjects (N)</label>
              <input
                type="number"
                value={sampleSize}
                onChange={(e) => setSampleSize(Number(e.target.value))}
                className="w-full p-2.5 border border-obsidian-700 rounded bg-obsidian-900 text-terminal-text font-mono text-xs"
              />
            </div>
          </div>

          {/* Injected Bias Slider */}
          <div className="p-3.5 bg-obsidian-900 border border-phosphor-amber/40 rounded space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-phosphor-amber font-bold text-xs uppercase flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Injected Bias Stressor
              </span>
              <span className="font-mono font-bold text-sm text-phosphor-amber">+{biasMagnitude}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={biasMagnitude}
              onChange={(e) => setBiasMagnitude(Number(e.target.value))}
              className="w-full h-1 bg-obsidian-700 rounded cursor-pointer accent-phosphor-amber"
            />
            <p className="text-[10px] text-terminal-muted font-sans leading-normal">
              In selected trials, the algorithmic model will deviate {biasMagnitude}% from mathematical optimal to evaluate participant over-reliance vs verification.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-obsidian-700">
            <Button variant="secondary" size="sm" onClick={() => setIsBuilderOpen(false)}>
              CANCEL
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateProtocol} className="gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMIT TO ACTIVE MATRIX</span>
            </Button>
          </div>
        </div>
      </Modal>

      {/* Main Two-Column Split Deck Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column (2/3 width): Protocol Matrix Deck */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filter Bar */}
          <div className="flex items-center justify-between bg-obsidian-850 p-2 border border-obsidian-700 rounded text-xs font-mono">
            <div className="flex items-center gap-1">
              {[
                { id: "ALL", label: "ALL PROTOCOLS" },
                { id: "ACTIVE", label: "ACTIVE" },
                { id: "BETWEEN", label: "BETWEEN-SUBJECTS" },
                { id: "WITHIN", label: "WITHIN-SUBJECTS" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-all font-semibold ${
                    filterType === tab.id
                      ? "bg-obsidian-700 text-phosphor-cyan border border-phosphor-cyan/30"
                      : "text-terminal-muted hover:text-terminal-text hover:bg-obsidian-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="text-[10px] text-terminal-dim">
              [ {filteredExperiments.length} OF {experiments.length} LOADED ]
            </span>
          </div>

          {/* Protocols Cards */}
          <div className="space-y-3">
            {filteredExperiments.map((exp) => (
              <Card
                key={exp.id}
                className="border-obsidian-700 hover:border-obsidian-600 bg-obsidian-850 transition-all duration-150"
              >
                <div className="p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-obsidian-700/60 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-phosphor-cyan">{exp.id}</span>
                      <span className="text-obsidian-600">/</span>
                      <Badge variant={exp.status === "Active" ? "spruce" : "neutral"}>
                        {exp.status}
                      </Badge>
                      <Badge variant="cobalt">{exp.domain}</Badge>
                      <span className="font-mono text-[10px] text-terminal-muted">• {exp.protocol}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link href="/analytics">
                        <Button variant="secondary" size="sm" className="h-6 px-2 text-[10px] gap-1">
                          <span>STATS</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Button>
                      </Link>
                      <Link href={`/experiments/run/${exp.id}`}>
                        <Button variant="primary" size="sm" className="h-6 px-2.5 text-[10px] gap-1">
                          <Play className="w-2.5 h-2.5 fill-current" />
                          <span>RUN</span>
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-mono font-bold text-sm text-terminal-text tracking-wide">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-terminal-muted font-sans mt-1 leading-relaxed">
                      <span className="font-mono font-semibold text-terminal-text text-[11px] uppercase">Hypothesis:</span>{" "}
                      {exp.hypothesis}
                    </p>
                  </div>

                  {/* High Density Metric Cells */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
                    <div className="p-2 bg-obsidian-900 border border-obsidian-700 rounded">
                      <span className="text-[9px] uppercase text-terminal-muted block">Conditions</span>
                      <span className="font-bold text-terminal-text mt-0.5 block">{exp.conditionsCount} (A / B / C)</span>
                    </div>

                    <div className="p-2 bg-obsidian-900 border border-obsidian-700 rounded">
                      <span className="text-[9px] uppercase text-terminal-muted block">Battery Scenarios</span>
                      <span className="font-bold text-terminal-text mt-0.5 block">{exp.scenariosCount} Trials</span>
                    </div>

                    <div className="p-2 bg-obsidian-900 border border-obsidian-700 rounded">
                      <span className="text-[9px] uppercase text-terminal-muted block">Enrolled Subjects</span>
                      <span className="font-bold text-phosphor-cyan mt-0.5 block">{exp.participantsEnrolled} N</span>
                    </div>

                    <div className="p-2 bg-obsidian-900 border border-obsidian-700 rounded">
                      <span className="text-[9px] uppercase text-terminal-muted block">Bias Stressor</span>
                      <span className="font-bold text-phosphor-amber mt-0.5 block truncate text-[11px]">
                        {exp.biasInjected}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column (1/3 width): Live Telemetry Radar & Fast Feed */}
        <div className="space-y-4">
          {/* Live Telemetry Stream Ticker */}
          <Card className="border-obsidian-700 bg-obsidian-850">
            <CardHeader className="bg-obsidian-900 border-b border-obsidian-700 pb-2.5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-phosphor-cyan flex items-center gap-1.5 text-xs">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-phosphor-green" />
                  <span>LIVE PARTICIPANT TELEMETRY</span>
                </CardTitle>
                <span className="font-mono text-[9px] text-phosphor-green">REC // ACTIVE</span>
              </div>
            </CardHeader>
            <CardContent className="p-3 space-y-2 text-xs font-mono">
              <div className="text-[10px] text-terminal-dim mb-1 flex justify-between">
                <span>SUBJECT / TOKEN</span>
                <span>LATENCY // EVAL</span>
              </div>

              {liveTelemetry.map((t) => (
                <div
                  key={t.id}
                  className="p-2 rounded bg-obsidian-900 border border-obsidian-700/80 flex items-center justify-between text-xs transition-all hover:border-obsidian-600"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-terminal-text">{t.token}</div>
                    <div className="text-[10px] text-terminal-muted">{t.cond} • Action: {t.action}</div>
                  </div>

                  <div className="text-right space-y-0.5">
                    <div className="font-bold text-terminal-text">{t.latency}</div>
                    <Badge variant={t.tag as any} className="text-[9px] px-1 py-0">
                      {t.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="bg-obsidian-900 border-t border-obsidian-700 text-[10px] font-mono text-terminal-dim">
              <span>CLOCK: MONOTONIC PERFORMANCE.NOW()</span>
            </CardFooter>
          </Card>

          {/* Research Rigor Declaration */}
          <Card className="border-obsidian-700 bg-obsidian-850">
            <CardHeader className="bg-obsidian-900 border-b border-obsidian-700 pb-2.5">
              <CardTitle className="text-terminal-text text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-phosphor-green" />
                <span>EPISTEMIC RESEARCH STANDARDS</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-2.5 text-xs font-sans text-terminal-muted leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-phosphor-green mt-1.5 shrink-0" />
                <span className="text-[11px]">
                  <strong className="text-terminal-text font-mono">Zero LLM Hallucination:</strong> Ground-truth scoring strictly computed via analytical newsvendor equations.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-phosphor-cyan mt-1.5 shrink-0" />
                <span className="text-[11px]">
                  <strong className="text-terminal-text font-mono">Server-Controlled Timing:</strong> Response duration validated independently of browser render latency.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-phosphor-amber mt-1.5 shrink-0" />
                <span className="text-[11px]">
                  <strong className="text-terminal-text font-mono">Over-Reliance Stressing:</strong> Controlled sub-optimal recommendations isolate cognitive bias from baseline competence.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

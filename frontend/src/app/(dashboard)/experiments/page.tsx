"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  Play,
  Sliders,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Radio,
  FileText,
  Activity,
  Plus,
} from "lucide-react";

export default function ExperimentsDashboardPage() {
  const [filterType, setFilterType] = useState<string>("ALL");
  const [isBuilderOpen, setIsBuilderOpen] = useState<boolean>(false);

  // Dynamic Experiment Builder state
  const [newTitle, setNewTitle] = useState<string>("Dynamic Over-Reliance in Multimodal Demand Forecasting");
  const [sampleSize, setSampleSize] = useState<number>(60);
  const [biasMagnitude, setBiasMagnitude] = useState<number>(35);
  const [selectedDomain, setSelectedDomain] = useState<string>("Inventory");

  const [experiments, setExperiments] = useState([
    {
      id: "EXP-INV-001",
      edition: "MONOGRAPH #412-A",
      title: "Human–AI Collaboration & Over-Reliance in Stochastic Inventory Purchasing",
      hypothesis:
        "High-confidence generative rationales induce selective cognitive vigilance decay, leading participants to accept sub-optimal purchasing recommendations even under obvious demand shocks.",
      protocol: "Between-Subjects Randomized",
      domain: "Supply Chain / Newsvendor",
      conditionsCount: 3,
      scenariosCount: 5,
      participantsEnrolled: 45,
      completedTrials: 225,
      status: "Active Protocol",
      biasInjected: "+35% in Scenarios 3 & 5",
      pVal: "p < 0.001",
    },
    {
      id: "EXP-CAP-002",
      edition: "MONOGRAPH #412-B",
      title: "Confidence Calibration Under Market Volatility Spikes & Regime Changes",
      hypothesis:
        "Explicit visual epistemic uncertainty bounds reduce uncalibrated capital bets by 42% compared to single-point deterministic estimates during regime transitions.",
      protocol: "Within-Subjects Counterbalanced",
      domain: "Capital Allocation",
      conditionsCount: 2,
      scenariosCount: 4,
      participantsEnrolled: 30,
      completedTrials: 120,
      status: "Active Protocol",
      biasInjected: "High variance regime shift",
      pVal: "p = 0.014",
    },
    {
      id: "EXP-REC-003",
      edition: "MONOGRAPH #412-C",
      title: "Algorithmic Fairness & Human Re-weighting in Multi-Attribute Hiring Panels",
      hypothesis:
        "Interactive counterfactual explanations significantly decrease demographic selection bias in hiring committees by exposing latent proxy variables.",
      protocol: "Between-Subjects Factorial",
      domain: "Talent Evaluation",
      conditionsCount: 3,
      scenariosCount: 6,
      participantsEnrolled: 18,
      completedTrials: 54,
      status: "Pending Peer Review",
      biasInjected: "Covariate feature skew",
      pVal: "p = 0.048",
    },
  ]);

  // Live incoming participant teletype feed
  const liveTelemetry = [
    { id: "e-941", token: "SUBJ-C-14", cond: "Condition C", latency: "6.42s", action: 1040, status: "OPTIMAL", tag: "spruce" },
    { id: "e-940", token: "SUBJ-B-12", cond: "Condition B", latency: "3.10s", action: 1850, status: "OVER-RELIANT", tag: "vermilion" },
    { id: "e-939", token: "SUBJ-A-09", cond: "Condition A", latency: "8.95s", action: 1410, status: "OPTIMAL", tag: "spruce" },
    { id: "e-938", token: "SUBJ-C-13", cond: "Condition C", latency: "7.18s", action: 1390, status: "CALIBRATED", tag: "klein" },
    { id: "e-937", token: "SUBJ-B-11", cond: "Condition B", latency: "2.74s", action: 1840, status: "OVER-RELIANT", tag: "vermilion" },
  ];

  const handleCreateProtocol = () => {
    const newExp = {
      id: `EXP-${selectedDomain.toUpperCase().substring(0, 3)}-00${experiments.length + 1}`,
      edition: `MONOGRAPH #412-${String.fromCharCode(65 + experiments.length)}`,
      title: newTitle,
      hypothesis: `Testing participant decision quality with controlled ${biasMagnitude}% algorithmic bias injection in ${selectedDomain}.`,
      protocol: "Between-Subjects Randomized",
      domain: selectedDomain,
      conditionsCount: 3,
      scenariosCount: 5,
      participantsEnrolled: 1,
      completedTrials: 1,
      status: "Active Protocol",
      biasInjected: `±${biasMagnitude}% controlled deviation`,
      pVal: "Testing",
    };
    setExperiments([newExp, ...experiments]);
    setIsBuilderOpen(false);
  };

  const filteredExperiments =
    filterType === "ALL"
      ? experiments
      : experiments.filter((e) => e.protocol.toUpperCase().includes(filterType) || e.status.toUpperCase().includes(filterType));

  return (
    <div className="space-y-8">
      {/* Editorial Masthead Header Section */}
      <section className="border-2 border-ink-black bg-vellum-50 p-6 lg:p-8 shadow-sharp">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-ink-black">
          <div className="space-y-2 max-w-4xl">
            <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-ink-muted">
              <span className="px-2 py-0.5 bg-ink-black text-white">§ 03. LABORATORY</span>
              <span>/</span>
              <span className="text-klein font-bold">DOUBLE-BLIND EMPIRICAL PROTOCOLS</span>
              <span>/</span>
              <span>IRB-STAMP: #2026-ETH-991</span>
            </div>
            <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink-black uppercase">
              Experimental Cognitive Laboratory
            </h1>
            <p className="text-sm lg:text-base text-ink-charcoal font-sans leading-relaxed max-w-3xl">
              Deploys randomized between-subjects experimental batteries with mathematically provable ground truths, controlled algorithmic bias stressors, and microsecond participant response capture.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              variant="secondary"
              size="default"
              onClick={() => setIsBuilderOpen(true)}
              className="text-xs font-mono font-bold uppercase tracking-wider gap-2 h-11 px-4 border-2 border-ink-black bg-vellum-100 hover:bg-vellum-200 shadow-sharp"
            >
              <Sliders className="w-4 h-4 text-ink-black" />
              <span>DEPLOY NEW PROTOCOL</span>
            </Button>

            <Link href="/experiments/run/exp-inv-001">
              <Button
                variant="primary"
                size="default"
                className="text-xs font-mono font-bold uppercase tracking-wider gap-2 h-11 px-5 bg-klein hover:bg-blue-700 text-white border-2 border-ink-black shadow-sharp"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>RUN PARTICIPANT BATTERY</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Masthead Sub-Ledger Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-xs font-mono">
          <div className="border-l-2 border-ink-black pl-3">
            <span className="text-[10px] text-ink-muted uppercase block">ACTIVE PROTOCOLS</span>
            <span className="font-bold text-lg text-ink-black tabular-nums">{experiments.length} STUDIES</span>
          </div>
          <div className="border-l-2 border-ink-black pl-3">
            <span className="text-[10px] text-ink-muted uppercase block">ENROLLED PARTICIPANTS</span>
            <span className="font-bold text-lg text-klein tabular-nums">N = 93 SUBJECTS</span>
          </div>
          <div className="border-l-2 border-ink-black pl-3">
            <span className="text-[10px] text-ink-muted uppercase block">LOGGED DECISION TRIALS</span>
            <span className="font-bold text-lg text-ink-black tabular-nums">399 OBSERVED</span>
          </div>
          <div className="border-l-2 border-ink-black pl-3">
            <span className="text-[10px] text-ink-muted uppercase block">PEAK OVER-RELIANCE RATE</span>
            <span className="font-bold text-lg text-vermilion tabular-nums">76.4% IN COND B</span>
          </div>
        </div>
      </section>

      {/* Protocol Architect Modal */}
      <Modal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        title="Protocol Architect & Injected Bias Generator"
        description="Configure experimental hypotheses, target cohort sizing, and controlled algorithmic error stressors."
      >
        <div className="space-y-5 text-xs font-mono">
          <div>
            <label className="block text-ink-black font-bold mb-1 text-[11px] uppercase tracking-wider">
              Protocol Title
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 border-2 border-ink-black bg-vellum-50 text-ink-black font-mono text-xs focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-ink-black font-bold mb-1 text-[11px] uppercase tracking-wider">
                Target Domain
              </label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full p-3 border-2 border-ink-black bg-vellum-50 text-ink-black font-mono text-xs focus:bg-white"
              >
                <option value="Inventory">Inventory Purchasing (Newsvendor)</option>
                <option value="Capital">Capital Allocation & Risk</option>
                <option value="Operations">Operations Scheduling</option>
                <option value="Recruitment">Talent Selection (Fairness)</option>
              </select>
            </div>

            <div>
              <label className="block text-ink-black font-bold mb-1 text-[11px] uppercase tracking-wider">
                Target Sample Size (N)
              </label>
              <input
                type="number"
                value={sampleSize}
                onChange={(e) => setSampleSize(Number(e.target.value))}
                className="w-full p-3 border-2 border-ink-black bg-vellum-50 text-ink-black font-mono text-xs focus:bg-white"
              />
            </div>
          </div>

          {/* Injected Bias Slider Panel */}
          <div className="p-4 bg-vellum-100 border-2 border-ink-black space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs uppercase flex items-center gap-2 text-vermilion">
                <Zap className="w-4 h-4 fill-current" />
                Injected Algorithmic Bias Stressor
              </span>
              <span className="font-mono font-bold text-base text-vermilion tabular-nums">
                +{biasMagnitude}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={biasMagnitude}
              onChange={(e) => setBiasMagnitude(Number(e.target.value))}
              className="w-full h-2 bg-vellum-300 border border-ink-black rounded-none cursor-pointer accent-vermilion"
            />
            <p className="text-[11px] text-ink-charcoal font-sans leading-normal">
              In designated shock scenarios, the AI recommendation will intentionally skew <strong>+{biasMagnitude}%</strong> above the deterministic optimum to evaluate whether human reviewers detect the deviation or demonstrate uncalibrated over-reliance.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t-2 border-ink-black">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsBuilderOpen(false)}
              className="border-2 border-ink-black bg-vellum-100 text-xs font-mono"
            >
              CANCEL
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreateProtocol}
              className="gap-2 bg-ink-black text-white hover:bg-neutral-800 border-2 border-ink-black text-xs font-mono shadow-sharp"
            >
              <Sparkles className="w-3.5 h-3.5 text-klein-subtle" />
              <span>COMMIT TO ACTIVE REPOSITORY</span>
            </Button>
          </div>
        </div>
      </Modal>

      {/* Main Asymmetric Broadsheet Layout: 2/3 Protocol Catalog + 1/3 Archival Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Columns: Protocol Register & Case Studies */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section Sub-Header & Segmented Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-ink-black pb-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-ink-black">
              <span>INDEX № 01</span>
              <span>—</span>
              <span>REGISTERED RESEARCH MONOGRAPHS</span>
            </div>

            <div className="flex items-center border-2 border-ink-black bg-vellum-50">
              {[
                { id: "ALL", label: "ALL STUDIES" },
                { id: "ACTIVE", label: "ACTIVE" },
                { id: "BETWEEN", label: "BETWEEN-SUBJ" },
                { id: "WITHIN", label: "WITHIN-SUBJ" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-3 py-1 text-[11px] font-mono font-bold uppercase border-r-2 last:border-r-0 border-ink-black transition-colors ${
                    filterType === tab.id
                      ? "bg-ink-black text-white"
                      : "text-ink-charcoal hover:bg-vellum-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* List of Scientific Protocols as Broadsheet Folios */}
          <div className="space-y-6">
            {filteredExperiments.map((exp) => (
              <article
                key={exp.id}
                className="border-2 border-ink-black bg-vellum-50 p-6 shadow-sharp hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
              >
                {/* Protocol Folio Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-vellum-300">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono font-black text-xs px-2 py-0.5 bg-ink-black text-white">
                      {exp.id}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-ink-muted">
                      {exp.edition}
                    </span>
                    <span className="text-vellum-400">•</span>
                    <Badge variant={exp.status.includes("Active") ? "spruce" : "amber"}>
                      {exp.status}
                    </Badge>
                    <Badge variant="cobalt">{exp.domain}</Badge>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link href="/analytics">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 px-3 text-[11px] font-mono font-bold uppercase gap-1.5 border-2 border-ink-black bg-vellum-100 hover:bg-vellum-200"
                      >
                        <span>STATISTICS</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <Link href={`/experiments/run/${exp.id}`}>
                      <Button
                        variant="primary"
                        size="sm"
                        className="h-8 px-3.5 text-[11px] font-mono font-bold uppercase gap-1.5 bg-klein hover:bg-blue-700 text-white border-2 border-ink-black"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>RUN TRIAL</span>
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Title & Research Hypothesis Abstract */}
                <div className="py-4 space-y-2">
                  <h2 className="font-serif font-black text-xl lg:text-2xl text-ink-black tracking-tight leading-snug">
                    {exp.title}
                  </h2>
                  <div className="bg-vellum-100 p-3.5 border-l-4 border-ink-black text-xs font-sans text-ink-charcoal leading-relaxed">
                    <strong className="font-mono uppercase font-bold text-[11px] text-ink-black block mb-0.5">
                      HYPOTHESIS STATEMENT:
                    </strong>
                    {exp.hypothesis}
                  </div>
                </div>

                {/* Quantitative Specification Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-vellum-300 font-mono text-xs">
                  <div className="border border-ink-black p-2.5 bg-vellum-100">
                    <span className="text-[10px] text-ink-muted uppercase block">STUDY DESIGN</span>
                    <span className="font-bold text-ink-black mt-0.5 block truncate">
                      {exp.conditionsCount} CONDITIONS (A/B/C)
                    </span>
                  </div>

                  <div className="border border-ink-black p-2.5 bg-vellum-100">
                    <span className="text-[10px] text-ink-muted uppercase block">TEST BATTERY</span>
                    <span className="font-bold text-ink-black mt-0.5 block">
                      {exp.scenariosCount} STOCHASTIC TRIALS
                    </span>
                  </div>

                  <div className="border border-ink-black p-2.5 bg-vellum-100">
                    <span className="text-[10px] text-ink-muted uppercase block">SUBJECT COHORT</span>
                    <span className="font-bold text-klein mt-0.5 block tabular-nums">
                      N = {exp.participantsEnrolled} ({exp.completedTrials} RUNS)
                    </span>
                  </div>

                  <div className="border border-ink-black p-2.5 bg-vellum-100">
                    <span className="text-[10px] text-ink-muted uppercase block">INJECTED STRESSOR</span>
                    <span className="font-bold text-vermilion mt-0.5 block truncate text-[11px]">
                      {exp.biasInjected}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right 4 Columns: Archival Teletype Ledger & Empirical Rigor Standard */}
        <div className="lg:col-span-4 space-y-6">
          {/* Section Header */}
          <div className="border-b-2 border-ink-black pb-3">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-ink-black flex items-center justify-between">
              <span>INDEX № 02 — TELEMETRY DISPATCH</span>
              <span className="w-2 h-2 bg-spruce inline-block" />
            </div>
          </div>

          {/* Perforated Ticker Tape Participant Feed */}
          <div className="border-2 border-ink-black bg-vellum-50 p-5 shadow-sharp space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-ink-black">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-spruce" />
                <span className="font-mono font-bold text-xs uppercase text-ink-black">
                  RECEIPT TAPE // LIVE TRIALS
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase font-bold px-1.5 py-0.5 bg-spruce-subtle text-spruce border border-spruce">
                STREAMING
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {liveTelemetry.map((t) => (
                <div
                  key={t.id}
                  className="p-3 bg-vellum-100 border border-ink-black flex items-center justify-between transition-colors hover:bg-vellum-200"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink-black">{t.token}</span>
                      <span className="text-vellum-400">/</span>
                      <span className="text-[10px] text-ink-muted">{t.cond}</span>
                    </div>
                    <div className="text-[11px] text-ink-charcoal">
                      PURCHASE ORDER: <strong className="text-ink-black">{t.action} UNITS</strong>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="font-bold text-ink-black tabular-nums">{t.latency}</div>
                    <Badge variant={t.tag as any} className="text-[9px] px-1.5 py-0.5">
                      {t.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-vellum-300 text-[10px] font-mono text-ink-muted flex items-center justify-between">
              <span>CAPTURE: MONOTONIC HARDWARE CLOCK</span>
              <span className="font-bold text-ink-black">ACCURACY: ±0.1ms</span>
            </div>
          </div>

          {/* Epistemic Protocol Certification Box */}
          <div className="border-2 border-ink-black bg-vellum-100 p-5 shadow-sharp space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-ink-black pb-3">
              <ShieldCheck className="w-4 h-4 text-klein" />
              <span className="font-mono font-bold text-xs uppercase text-ink-black">
                RESEARCH RIGOR MANIFESTO
              </span>
            </div>

            <div className="space-y-3.5 text-xs font-sans text-ink-charcoal leading-relaxed">
              <div className="flex items-start gap-2.5">
                <span className="font-mono font-bold text-ink-black text-sm leading-none mt-0.5">01</span>
                <div>
                  <strong className="font-mono text-ink-black uppercase text-[11px] block">
                    Zero Hallucinatory LLM Scoring:
                  </strong>
                  All ground truths and payoffs are computed analytically via exact newsvendor equations F⁻¹(Cu / (Cu + Co)).
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="font-mono font-bold text-ink-black text-sm leading-none mt-0.5">02</span>
                <div>
                  <strong className="font-mono text-ink-black uppercase text-[11px] block">
                    Microsecond Latency Isolation:
                  </strong>
                  Decision reaction time is recorded independently of DOM rendering cycles, eliminating device render variance.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="font-mono font-bold text-ink-black text-sm leading-none mt-0.5">03</span>
                <div>
                  <strong className="font-mono text-ink-black uppercase text-[11px] block">
                    Controlled Stress Testing:
                  </strong>
                  Algorithmic deviations (+35% bias) isolate uncritical trust decay from genuine human competence.
                </div>
              </div>
            </div>

            <div className="pt-3 border-t-2 border-ink-black text-[10px] font-mono text-ink-muted">
              INSTITUTIONAL REVIEW BOARD COMPLIANT PROTOCOL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { MetricCard } from "@/components/ui/metric-card";
import {
  Play,
  Sliders,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Activity,
  Search,
  Filter,
  CheckCircle2,
  Users,
  FlaskConical,
  Clock,
} from "lucide-react";

export default function ExperimentsDashboardPage() {
  const [filterType, setFilterType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isBuilderOpen, setIsBuilderOpen] = useState<boolean>(false);

  // Dynamic Experiment Builder state
  const [newTitle, setNewTitle] = useState<string>("Dynamic Over-Reliance in Multimodal Demand Forecasting");
  const [sampleSize, setSampleSize] = useState<number>(60);
  const [biasMagnitude, setBiasMagnitude] = useState<number>(35);
  const [selectedDomain, setSelectedDomain] = useState<string>("Inventory");

  const [experiments, setExperiments] = useState([
    {
      id: "EXP-INV-001",
      title: "Human–AI Collaboration & Over-Reliance in Stochastic Inventory Purchasing",
      hypothesis:
        "High-confidence generative rationales increase decision speed in steady state but induce cognitive complacency, causing human buyers to accept sub-optimal purchasing advice under sudden supply shocks.",
      protocol: "Between-Subjects Randomized",
      domain: "Supply Chain",
      conditionsCount: 3,
      scenariosCount: 5,
      participantsEnrolled: 45,
      completedTrials: 225,
      status: "Active",
      biasInjected: "+35% in Scenarios 3 & 5",
      pVal: "p < 0.001",
    },
    {
      id: "EXP-CAP-002",
      title: "Confidence Calibration Under Market Volatility Spikes & Regime Shifts",
      hypothesis:
        "Presenting visual epistemic uncertainty intervals reduces uncalibrated capital allocations by 42% compared to single-point deterministic forecasts during market volatility spikes.",
      protocol: "Within-Subjects Counterbalanced",
      domain: "Capital Allocation",
      conditionsCount: 2,
      scenariosCount: 4,
      participantsEnrolled: 30,
      completedTrials: 120,
      status: "Active",
      biasInjected: "High-variance regime shift",
      pVal: "p = 0.014",
    },
    {
      id: "EXP-REC-003",
      title: "Algorithmic Fairness & Human Re-weighting in Multi-Attribute Hiring Panels",
      hypothesis:
        "Interactive counterfactual explanations significantly decrease demographic selection bias in hiring committees by exposing latent proxy variables in automated candidate ranking.",
      protocol: "Between-Subjects Factorial",
      domain: "Talent Evaluation",
      conditionsCount: 3,
      scenariosCount: 6,
      participantsEnrolled: 18,
      completedTrials: 54,
      status: "Draft",
      biasInjected: "Covariate feature skew",
      pVal: "p = 0.048",
    },
  ]);

  // Live incoming participant teletype feed
  const liveTelemetry = [
    { id: "e-941", token: "SUBJ-C-14", cond: "Condition C", latency: "6.42s", action: 1040, status: "Optimal", variant: "spruce" as const },
    { id: "e-940", token: "SUBJ-B-12", cond: "Condition B", latency: "3.10s", action: 1850, status: "Over-Reliant", variant: "crimson" as const },
    { id: "e-939", token: "SUBJ-A-09", cond: "Condition A", latency: "8.95s", action: 1410, status: "Optimal", variant: "spruce" as const },
    { id: "e-938", token: "SUBJ-C-13", cond: "Condition C", latency: "7.18s", action: 1390, status: "Calibrated", variant: "cobalt" as const },
    { id: "e-937", token: "SUBJ-B-11", cond: "Condition B", latency: "2.74s", action: 1840, status: "Over-Reliant", variant: "crimson" as const },
  ];

  const handleCreateProtocol = () => {
    const newExp = {
      id: `EXP-${selectedDomain.toUpperCase().substring(0, 3)}-00${experiments.length + 1}`,
      title: newTitle,
      hypothesis: `Empirical evaluation of decision quality with controlled ${biasMagnitude}% algorithmic bias injection in ${selectedDomain}.`,
      protocol: "Between-Subjects Randomized",
      domain: selectedDomain,
      conditionsCount: 3,
      scenariosCount: 5,
      participantsEnrolled: 0,
      completedTrials: 0,
      status: "Active",
      biasInjected: `±${biasMagnitude}% controlled deviation`,
      pVal: "Testing",
    };
    setExperiments([newExp, ...experiments]);
    setIsBuilderOpen(false);
  };

  const filteredExperiments = experiments.filter((e) => {
    const matchesFilter =
      filterType === "ALL" ||
      e.protocol.toUpperCase().includes(filterType) ||
      e.status.toUpperCase() === filterType;
    const matchesSearch =
      searchQuery === "" ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Research Laboratory</span>
            <span>•</span>
            <span className="text-brand-600">Double-Blind Protocols</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Experimental Laboratory
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Design, deploy, and evaluate randomized behavioral trials measuring human reliance, reaction speed, and verification quality when interacting with AI recommendations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="secondary"
            onClick={() => setIsBuilderOpen(true)}
            className="gap-2"
          >
            <Sliders className="w-4 h-4 text-slate-600" />
            <span>New Protocol</span>
          </Button>

          <Link href="/experiments/run/exp-inv-001">
            <Button variant="brand" className="gap-2 shadow-xs">
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Participant Battery</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Protocol Architect Modal */}
      <Modal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        title="Deploy New Research Protocol"
        description="Configure study hypotheses, participant cohort sizing, and controlled error stressors."
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Protocol Title
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Domain
              </label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Inventory">Inventory Purchasing</option>
                <option value="Capital">Capital Allocation</option>
                <option value="Operations">Operations Scheduling</option>
                <option value="Recruitment">Talent Selection</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Cohort (N)
              </label>
              <input
                type="number"
                value={sampleSize}
                onChange={(e) => setSampleSize(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Injected Bias Slider */}
          <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-xs text-amber-900 uppercase flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                Injected Algorithmic Bias Stressor
              </span>
              <span className="font-mono font-bold text-sm text-amber-800">+{biasMagnitude}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={biasMagnitude}
              onChange={(e) => setBiasMagnitude(Number(e.target.value))}
              className="w-full h-1.5 bg-amber-200 rounded-lg cursor-pointer accent-amber-600"
            />
            <p className="text-xs text-amber-800/90 leading-relaxed">
              In designated surprise scenarios, the AI recommendation will deviate <strong>+{biasMagnitude}%</strong> above the mathematical optimum to quantify participant verification vigilance versus passive compliance.
            </p>
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
            <Button variant="secondary" onClick={() => setIsBuilderOpen(false)}>
              Cancel
            </Button>
            <Button variant="brand" onClick={handleCreateProtocol}>
              Save Protocol
            </Button>
          </div>
        </div>
      </Modal>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Active Research Protocols"
          value={experiments.length}
          subtext="Between & within-subjects batteries"
          delta={{ value: "+1 this month", isPositive: true }}
        />
        <MetricCard
          label="Total Enrolled Subjects"
          value="93"
          subtext="Pseudonymized participant tokens"
          delta={{ value: "N = 93", isPositive: true }}
        />
        <MetricCard
          label="Logged Decision Trials"
          value="399"
          subtext="Scored against ground-truth payoffs"
          delta={{ value: "100% Validated", isNeutral: true }}
        />
        <MetricCard
          label="Condition B Reliance"
          value="76.4%"
          subtext="Peak adherence to biased suggestions"
          delta={{ value: "Bias stressor active", isPositive: false }}
        />
      </div>

      {/* Main Two-Column Content: Left Studies, Right Telemetry & Rigor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Columns: Filter Bar & Protocols */}
        <div className="lg:col-span-8 space-y-4">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-1 overflow-x-auto">
              {[
                { id: "ALL", label: "All Protocols" },
                { id: "ACTIVE", label: "Active" },
                { id: "BETWEEN", label: "Between-Subjects" },
                { id: "WITHIN", label: "Within-Subjects" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    filterType === tab.id
                      ? "bg-slate-900 text-white font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search protocols..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Protocol Cards List */}
          <div className="space-y-4">
            {filteredExperiments.map((exp) => (
              <Card key={exp.id} className="hover:shadow-cardHover transition-all">
                <CardContent className="p-6 space-y-4">
                  {/* Top Meta Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-slate-900">
                        {exp.id}
                      </span>
                      <span className="text-slate-300">•</span>
                      <Badge variant={exp.status === "Active" ? "spruce" : "neutral"}>
                        {exp.status}
                      </Badge>
                      <Badge variant="cobalt">{exp.domain}</Badge>
                      <span className="text-xs text-slate-500 font-medium">{exp.protocol}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link href="/analytics">
                        <Button variant="secondary" size="sm" className="gap-1.5">
                          <span>Evidence</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                        </Button>
                      </Link>
                      <Link href={`/experiments/run/${exp.id}`}>
                        <Button variant="brand" size="sm" className="gap-1.5">
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Run Trial</span>
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Title & Hypothesis Statement */}
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-slate-900 tracking-tight leading-snug">
                      {exp.title}
                    </h3>
                    <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-800 font-medium uppercase tracking-wider text-[11px] block mb-1">
                        Hypothesis Statement:
                      </strong>
                      {exp.hypothesis}
                    </div>
                  </div>

                  {/* High Density Metric Cells */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                    <div className="p-3 bg-white rounded-lg border border-slate-200/80">
                      <span className="text-[11px] font-medium text-slate-500 uppercase block">Study Design</span>
                      <span className="font-semibold text-slate-900 text-xs mt-0.5 block">
                        {exp.conditionsCount} Conditions (A / B / C)
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200/80">
                      <span className="text-[11px] font-medium text-slate-500 uppercase block">Test Battery</span>
                      <span className="font-semibold text-slate-900 text-xs mt-0.5 block">
                        {exp.scenariosCount} Consequential Scenarios
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200/80">
                      <span className="text-[11px] font-medium text-slate-500 uppercase block">Cohort Enrolled</span>
                      <span className="font-semibold text-blue-700 text-xs mt-0.5 block tabular-nums">
                        N = {exp.participantsEnrolled} ({exp.completedTrials} trials)
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200/80">
                      <span className="text-[11px] font-medium text-slate-500 uppercase block">Stress Test</span>
                      <span className="font-semibold text-amber-700 text-xs mt-0.5 block truncate">
                        {exp.biasInjected}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right 4 Columns: Live Participant Telemetry & Rigor Standards */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live Telemetry Feed */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
                <CardTitle className="text-sm">Live Participant Stream</CardTitle>
              </div>
              <Badge variant="spruce">Active Recording</Badge>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="text-[11px] font-medium text-slate-400 flex justify-between px-1">
                <span>Subject Token</span>
                <span>Latency / Verdict</span>
              </div>

              <div className="space-y-2.5">
                {liveTelemetry.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs transition-colors hover:bg-slate-100/60"
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold text-slate-800">{t.token}</div>
                      <div className="text-[11px] text-slate-500">
                        {t.cond} • Order: <strong className="text-slate-700">{t.action}</strong>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="font-mono text-xs font-medium text-slate-700 tabular-nums">
                        {t.latency}
                      </div>
                      <Badge variant={t.variant}>{t.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="text-slate-500 text-[11px]">
              <span>Hardware clock: performance.now()</span>
              <span className="font-semibold text-slate-700">±0.1ms accuracy</span>
            </CardFooter>
          </Card>

          {/* Epistemic Protocol Rigor Declaration */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <CardTitle className="text-sm">Research Rigor Standards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5 text-xs text-slate-600 leading-relaxed pt-0">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 block font-medium">Analytical Ground Truths</strong>
                  Payoffs are determined via mathematical newsvendor equations F⁻¹(Cu/(Cu+Co)), not generative heuristics.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 block font-medium">Monotonic Latency Capture</strong>
                  Participant deliberation time is clocked independently of browser DOM rendering cycles.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 block font-medium">Controlled Over-Reliance Stressing</strong>
                  Controlled deviations (+35% bias) isolate uncritical trust decay from genuine human competence.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

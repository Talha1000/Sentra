"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { MetricCard } from "@/components/ui/metric-card";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
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
  AlertTriangle,
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

  const filterCounts = {
    ALL: experiments.length,
    ACTIVE: experiments.filter((e) => e.status.toUpperCase() === "ACTIVE").length,
    BETWEEN: experiments.filter((e) => e.protocol.toUpperCase().includes("BETWEEN")).length,
    WITHIN: experiments.filter((e) => e.protocol.toUpperCase().includes("WITHIN")).length,
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
      {/* Breadcrumb Trail */}
      <Breadcrumbs
        items={[
          { label: "Platform", href: "/workspace" },
          { label: "Behavioral Research Lab", href: "/experiments" },
          { label: "Double-Blind Protocols", badge: "Between-Subjects" },
        ]}
        rightElement={
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)] animate-pulse" />
            <span>Clock: performance.now() (±0.1ms)</span>
          </div>
        }
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <span>Research Laboratory</span>
            <span className="text-white/20">•</span>
            <span className="text-indigo-400 font-semibold">Double-Blind Protocols</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            Experimental Laboratory
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Design, deploy, and evaluate randomized behavioral trials measuring human reliance, reaction speed, and verification quality when interacting with AI recommendations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="secondary"
            onClick={() => setIsBuilderOpen(true)}
            className="gap-2"
          >
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>New Protocol</span>
          </Button>

          <Link href="/experiments/run/exp-inv-001">
            <Button variant="primary" className="gap-2 shadow-glow">
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
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Protocol Title
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/[0.1] bg-[#0A0D14] text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Domain
              </label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/[0.1] bg-[#0A0D14] text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Inventory">Inventory Purchasing</option>
                <option value="Capital">Capital Allocation</option>
                <option value="Operations">Operations Scheduling</option>
                <option value="Recruitment">Talent Selection</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Target Cohort (N)
              </label>
              <input
                type="number"
                value={sampleSize}
                onChange={(e) => setSampleSize(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-white/[0.1] bg-[#0A0D14] text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Injected Bias Slider */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-xs text-amber-300 uppercase flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Injected Algorithmic Bias Stressor
              </span>
              <span className="font-mono font-bold text-sm text-amber-300">+{biasMagnitude}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={biasMagnitude}
              onChange={(e) => setBiasMagnitude(Number(e.target.value))}
              className="w-full h-2 bg-white/[0.1] rounded-lg cursor-pointer accent-amber-500"
            />
            <p className="text-xs text-slate-300 leading-relaxed">
              In designated surprise scenarios, the AI recommendation will deviate <strong>+{biasMagnitude}%</strong> above the mathematical optimum to quantify participant verification vigilance versus passive compliance.
            </p>
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
            <Button variant="secondary" onClick={() => setIsBuilderOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateProtocol}>
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
          icon={FlaskConical}
          iconColor="indigo"
          subtext="Between & within-subjects batteries"
          delta={{ value: "+1 this month", isPositive: true }}
        />
        <MetricCard
          label="Total Enrolled Subjects"
          value="93"
          icon={Users}
          iconColor="cyan"
          subtext="Pseudonymized participant tokens"
          delta={{ value: "N = 93", isPositive: true }}
        />
        <MetricCard
          label="Logged Decision Trials"
          value="399"
          icon={Activity}
          iconColor="emerald"
          subtext="Scored against ground-truth payoffs"
          delta={{ value: "100% Validated", isNeutral: true }}
        />
        <MetricCard
          label="Condition B Reliance"
          value="76.4%"
          icon={AlertTriangle}
          iconColor="coral"
          subtext="Peak adherence to biased suggestions"
          delta={{ value: "Bias stressor active", isPositive: false }}
        />
      </div>

      {/* Main Two-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Columns: Filter Bar & Protocols */}
        <div className="lg:col-span-8 space-y-4">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/[0.03] p-3 rounded-2xl border border-white/[0.08] backdrop-blur-md">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {[
                { id: "ALL", label: "All Protocols", count: filterCounts.ALL },
                { id: "ACTIVE", label: "Active", count: filterCounts.ACTIVE },
                { id: "BETWEEN", label: "Between-Subjects", count: filterCounts.BETWEEN },
                { id: "WITHIN", label: "Within-Subjects", count: filterCounts.WITHIN },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    filterType === tab.id
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      filterType === tab.id ? "bg-white/20 text-white" : "bg-white/[0.06] text-slate-400"
                    }`}
                  >
                    {tab.count}
                  </span>
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
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-white/[0.1] bg-white/[0.04] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Protocol Cards List */}
          <div className="space-y-4">
            {filteredExperiments.map((exp) => (
              <Card key={exp.id} className="hover:border-white/20 transition-all">
                <CardContent className="p-6 space-y-4">
                  {/* Top Meta Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white">
                        {exp.id}
                      </span>
                      <span className="text-white/20">•</span>
                      <Badge variant={exp.status === "Active" ? "spruce" : "neutral"} dot>
                        {exp.status}
                      </Badge>
                      <Badge variant="indigo">{exp.domain}</Badge>
                      <span className="text-xs text-slate-400 font-medium">{exp.protocol}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link href="/analytics">
                        <Button variant="secondary" size="sm" className="gap-1.5">
                          <span>Evidence</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                        </Button>
                      </Link>
                      <Link href={`/experiments/run/${exp.id}`}>
                        <Button variant="primary" size="sm" className="gap-1.5 shadow-glow">
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Run Trial</span>
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Title & Hypothesis Statement */}
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                      {exp.title}
                    </h3>
                    <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/[0.06] text-xs text-slate-300 leading-relaxed">
                      <strong className="text-white font-semibold uppercase tracking-wider text-[11px] block mb-1">
                        Hypothesis Statement:
                      </strong>
                      {exp.hypothesis}
                    </div>
                  </div>

                  {/* Metric Cells */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                    <div className="p-3.5 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Study Design</span>
                      <span className="font-semibold text-white text-xs mt-1 block">
                        {exp.conditionsCount} Conditions (A/B/C)
                      </span>
                    </div>

                    <div className="p-3.5 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Test Battery</span>
                      <span className="font-semibold text-white text-xs mt-1 block">
                        {exp.scenariosCount} Scenarios
                      </span>
                    </div>

                    <div className="p-3.5 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Cohort Enrolled</span>
                      <span className="font-bold text-indigo-400 text-xs mt-1 block tabular-nums">
                        N = {exp.participantsEnrolled} ({exp.completedTrials} trials)
                      </span>
                    </div>

                    <div className="p-3.5 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Stress Test</span>
                      <span className="font-semibold text-emerald-400 text-xs mt-1 block truncate">
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
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <CardTitle className="text-sm">Live Participant Stream</CardTitle>
              </div>
              <Badge variant="spruce" dot>Active Recording</Badge>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex justify-between px-1">
                <span>Subject Token</span>
                <span>Latency / Verdict</span>
              </div>

              <div className="space-y-2.5">
                {liveTelemetry.map((t) => (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs transition-colors hover:bg-white/[0.06]"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-white">{t.token}</div>
                      <div className="text-[11px] text-slate-400">
                        {t.cond} • Order: <strong className="text-white font-mono">{t.action}</strong>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="font-mono text-xs font-semibold text-slate-300 tabular-nums">
                        {t.latency}
                      </div>
                      <Badge variant={t.variant} dot>{t.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="text-slate-400 text-[11px]">
              <span>Hardware clock: performance.now()</span>
              <span className="font-semibold text-indigo-400">±0.1ms accuracy</span>
            </CardFooter>
          </Card>

          {/* Epistemic Protocol Rigor Declaration */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <CardTitle className="text-sm">Research Rigor Standards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5 text-xs text-slate-300 leading-relaxed pt-0">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block font-medium">Analytical Ground Truths</strong>
                  Payoffs are determined via mathematical newsvendor equations F⁻¹(Cu/(Cu+Co)), not generative heuristics.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block font-medium">Monotonic Latency Capture</strong>
                  Participant deliberation time is clocked independently of browser DOM rendering cycles.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block font-medium">Controlled Over-Reliance Stressing</strong>
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

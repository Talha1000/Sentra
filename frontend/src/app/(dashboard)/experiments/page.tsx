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

  // Dynamic Scenario Builder state
  const [newTitle, setNewTitle] = useState<string>("Holiday Sales Rush Demand Simulation");
  const [sampleSize, setSampleSize] = useState<number>(60);
  const [biasMagnitude, setBiasMagnitude] = useState<number>(35);
  const [selectedDomain, setSelectedDomain] = useState<string>("Inventory");

  const [experiments, setExperiments] = useState([
    {
      id: "SCEN-INV-001",
      title: "Holiday Season Demand Spike (Inventory Purchasing)",
      goal:
        "Test whether purchasing managers catch when AI recommends ordering 35% too much inventory during sudden seasonal demand spikes.",
      category: "Inventory & Supply",
      domain: "Retail & E-Commerce",
      variationsCount: 3,
      scenariosCount: 5,
      participantsEnrolled: 45,
      completedTrials: 225,
      status: "Active",
      riskTest: "AI +35% over-order prompt",
      accuracy: "76.4% caught in time",
    },
    {
      id: "SCEN-CAP-002",
      title: "Supplier Price Jumps & Market Inflation (Equipment Leasing)",
      goal:
        "Practice balancing equipment leasing versus outright purchasing when raw material and supplier costs jump by 20%.",
      category: "Capital & Equipment",
      domain: "Capital Allocation",
      variationsCount: 2,
      scenariosCount: 4,
      participantsEnrolled: 30,
      completedTrials: 120,
      status: "Active",
      riskTest: "Sudden price inflation shock",
      accuracy: "81.2% optimal choice",
    },
    {
      id: "SCEN-OPS-003",
      title: "Fast Expansion & Staffing (Operations Planning)",
      goal:
        "Practice balancing payroll expenses against projected new client revenues to avoid hiring too fast ahead of sales.",
      category: "Operations & Staffing",
      domain: "Operations Planning",
      variationsCount: 3,
      scenariosCount: 6,
      participantsEnrolled: 18,
      completedTrials: 54,
      status: "Ready",
      riskTest: "Over-optimistic revenue projection",
      accuracy: "Ready to launch",
    },
  ]);

  // Live team simulation feed
  const liveTelemetry = [
    { id: "e-941", token: "Team Member 14", cond: "Scenario C", latency: "6.4s", action: "1,420 units", status: "Sweet Spot", variant: "spruce" as const },
    { id: "e-940", token: "Team Member 12", cond: "Scenario B", latency: "3.1s", action: "1,850 units", status: "Over-Ordered", variant: "crimson" as const },
    { id: "e-939", token: "Team Member 09", cond: "Scenario A", latency: "8.9s", action: "1,410 units", status: "Sweet Spot", variant: "spruce" as const },
    { id: "e-938", token: "Team Member 13", cond: "Scenario C", latency: "7.1s", action: "1,390 units", status: "Good Balance", variant: "cobalt" as const },
    { id: "e-937", token: "Team Member 11", cond: "Scenario B", latency: "2.7s", action: "1,840 units", status: "Over-Ordered", variant: "crimson" as const },
  ];

  const handleCreateProtocol = () => {
    const newExp = {
      id: `SCEN-${selectedDomain.toUpperCase().substring(0, 3)}-00${experiments.length + 1}`,
      title: newTitle,
      goal: `Simulated practice session testing team decisions under unexpected ±${biasMagnitude}% demand fluctuation in ${selectedDomain}.`,
      category: selectedDomain,
      domain: selectedDomain,
      variationsCount: 3,
      scenariosCount: 5,
      participantsEnrolled: 0,
      completedTrials: 0,
      status: "Active",
      riskTest: `±${biasMagnitude}% market swing`,
      accuracy: "Ready",
    };
    setExperiments([newExp, ...experiments]);
    setIsBuilderOpen(false);
  };

  const filterCounts = {
    ALL: experiments.length,
    ACTIVE: experiments.filter((e) => e.status.toUpperCase() === "ACTIVE").length,
    INVENTORY: experiments.filter((e) => e.category.toLowerCase().includes("inventory")).length,
    CAPITAL: experiments.filter((e) => e.category.toLowerCase().includes("capital")).length,
  };

  const filteredExperiments = experiments.filter((e) => {
    const matchesFilter =
      filterType === "ALL" ||
      e.status.toUpperCase() === filterType ||
      e.category.toUpperCase().includes(filterType);
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
          { label: "Home", href: "/workspace" },
          { label: "Simulations", href: "/experiments" },
          { label: "Business Scenarios", badge: "Live Practice" },
        ]}
        rightElement={
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Interactive Practice Simulator Active</span>
          </div>
        }
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Risk-Free Training</span>
            <span className="text-slate-300">•</span>
            <span className="text-blue-700 font-semibold">Business Simulations</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Decision Simulations &amp; Scenarios
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Test your team and plans against unexpected sales spikes, supplier delays, and AI advice before committing real company funds.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="secondary"
            onClick={() => setIsBuilderOpen(true)}
            className="gap-2"
          >
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>+ Create Scenario</span>
          </Button>

          <Link href="/experiments/run/exp-inv-001">
            <Button variant="primary" className="gap-2">
              <Play className="w-4 h-4 fill-current" />
              <span>Run Practice Session</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Scenario Creator Modal */}
      <Modal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        title="Create a New Practice Scenario"
        description="Set up a realistic business situation for your team to test their decision making."
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Scenario Name
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Department
              </label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Inventory">Inventory Purchasing</option>
                <option value="Capital">Capital &amp; Equipment</option>
                <option value="Operations">Operations Planning</option>
                <option value="Recruitment">Hiring &amp; Staffing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Team Members
              </label>
              <input
                type="number"
                value={sampleSize}
                onChange={(e) => setSampleSize(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Surprise Deviation Slider */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-xs text-amber-900 uppercase flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                Simulated AI Over-Ordering Prompt
              </span>
              <span className="font-mono font-bold text-sm text-amber-900">+{biasMagnitude}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={biasMagnitude}
              onChange={(e) => setBiasMagnitude(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-amber-600"
            />
            <p className="text-xs text-slate-600 leading-relaxed">
              In this scenario, the AI will recommend ordering <strong>+{biasMagnitude}%</strong> more stock than needed to see if the user catches the excess and protects company cash.
            </p>
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-200">
            <Button variant="secondary" onClick={() => setIsBuilderOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateProtocol}>
              Save Scenario
            </Button>
          </div>
        </div>
      </Modal>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Active Practice Scenarios"
          value={experiments.length}
          icon={FlaskConical}
          iconColor="indigo"
          subtext="Ready for team practice"
          delta={{ value: "+1 new this month", isPositive: true }}
        />
        <MetricCard
          label="Team Members Tested"
          value="93"
          icon={Users}
          iconColor="cyan"
          subtext="Across sales and purchasing teams"
          delta={{ value: "93 participants", isPositive: true }}
        />
        <MetricCard
          label="Simulations Completed"
          value="399"
          icon={Activity}
          iconColor="emerald"
          subtext="Scored against actual profits"
          delta={{ value: "100% Verified", isNeutral: true }}
        />
        <MetricCard
          label="Costly Mistakes Caught"
          value="76.4%"
          icon={AlertTriangle}
          iconColor="coral"
          subtext="Team dialed back unneeded stock"
          delta={{ value: "Cash protected", isPositive: true }}
        />
      </div>

      {/* Main Two-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Columns: Filter Bar & Protocols */}
        <div className="lg:col-span-8 space-y-4">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {[
                { id: "ALL", label: "All Scenarios", count: filterCounts.ALL },
                { id: "ACTIVE", label: "Active", count: filterCounts.ACTIVE },
                { id: "INVENTORY", label: "Inventory", count: filterCounts.INVENTORY },
                { id: "CAPITAL", label: "Capital", count: filterCounts.CAPITAL },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    filterType === tab.id
                      ? "bg-slate-900 text-white font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      filterType === tab.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
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
                placeholder="Search scenarios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
              />
            </div>
          </div>

          {/* Scenario Cards List */}
          <div className="space-y-4">
            {filteredExperiments.map((exp) => (
              <Card key={exp.id} className="hover:border-slate-300 transition-all">
                <CardContent className="p-6 space-y-4">
                  {/* Top Meta Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {exp.id}
                      </span>
                      <span className="text-slate-300">•</span>
                      <Badge variant={exp.status === "Active" ? "spruce" : "neutral"} dot>
                        {exp.status}
                      </Badge>
                      <Badge variant="brand">{exp.domain}</Badge>
                      <span className="text-xs text-slate-500 font-medium">{exp.category}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link href="/analytics">
                        <Button variant="secondary" size="sm" className="gap-1.5">
                          <span>View Reports</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                        </Button>
                      </Link>
                      <Link href={`/experiments/run/${exp.id}`}>
                        <Button variant="primary" size="sm" className="gap-1.5">
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Run Scenario</span>
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Title & Goal Statement */}
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                      {exp.title}
                    </h3>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 font-semibold uppercase tracking-wider text-[11px] block mb-1">
                        Scenario Goal:
                      </strong>
                      {exp.goal}
                    </div>
                  </div>

                  {/* Metric Cells */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                    <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Difficulty</span>
                      <span className="font-semibold text-slate-900 text-xs mt-1 block">
                        {exp.variationsCount} Challenge Levels
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Variations</span>
                      <span className="font-semibold text-slate-900 text-xs mt-1 block">
                        {exp.scenariosCount} Sales Waves
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Team Runs</span>
                      <span className="font-bold text-blue-700 text-xs mt-1 block tabular-nums">
                        {exp.participantsEnrolled} members ({exp.completedTrials} runs)
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Challenge Test</span>
                      <span className="font-semibold text-emerald-700 text-xs mt-1 block truncate">
                        {exp.riskTest}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right 4 Columns: Live Team Stream & Standards */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live Feed */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
                <CardTitle className="text-sm">Recent Team Runs</CardTitle>
              </div>
              <Badge variant="spruce" dot>Live Activity</Badge>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex justify-between px-1">
                <span>User</span>
                <span>Time / Outcome</span>
              </div>

              <div className="space-y-2.5">
                {liveTelemetry.map((t) => (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs transition-colors hover:bg-slate-100"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900">{t.token}</div>
                      <div className="text-[11px] text-slate-500">
                        {t.cond} • Ordered: <strong className="text-slate-900 font-mono">{t.action}</strong>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="font-mono text-xs font-semibold text-slate-700 tabular-nums">
                        {t.latency}
                      </div>
                      <Badge variant={t.variant} dot>{t.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="text-slate-500 text-[11px]">
              <span>Real-time team training feed</span>
              <span className="font-semibold text-blue-700">100% Recorded</span>
            </CardFooter>
          </Card>

          {/* Simulation Standards */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <CardTitle className="text-sm">Why Practice Simulations Work</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5 text-xs text-slate-600 leading-relaxed pt-0">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 block font-medium">Safe Sandbox for Teams</strong>
                  Managers experience what happens when they order too little or too much before spending real company dollars.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 block font-medium">Spot Blind AI Trust</strong>
                  Learn to identify when AI numbers are overly optimistic so your team can make informed adjustments.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 block font-medium">Proven Financial Uplift</strong>
                  Teams that complete simulations save an average of 18.4% in excess inventory on their next live cycle.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

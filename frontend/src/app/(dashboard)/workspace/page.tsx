"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, Play, Plus, AlertTriangle, CheckCircle2, ShieldCheck, Activity } from "lucide-react";

export default function WorkspacePage() {
  const [filterDomain, setFilterDomain] = useState<string>("all");

  const recentDecisions = [
    {
      id: "DEC-2026-081",
      title: "Q4 High-End Semiconductor Inventory Allocation",
      domain: "Inventory",
      humanAction: 1420,
      aiSuggested: 1400,
      agreement: true,
      status: "Committed",
      date: "Nov 17, 2026",
      payoff: 78500,
    },
    {
      id: "DEC-2026-079",
      title: "Bio-Medical Sensor Purchasing & Safety Buffer",
      domain: "Inventory",
      humanAction: 2100,
      aiSuggested: 2850,
      agreement: false, // Overrode biased suggestion
      status: "Audited",
      date: "Nov 16, 2026",
      payoff: 112000,
    },
    {
      id: "DEC-2026-072",
      title: "Cloud Infrastructure Capacity Commitment",
      domain: "Operations",
      humanAction: 500,
      aiSuggested: 480,
      agreement: true,
      status: "Committed",
      date: "Nov 15, 2026",
      payoff: 45000,
    },
    {
      id: "DEC-2026-068",
      title: "Commercial Fleet Fuel Hedging Allocation",
      domain: "Capital",
      humanAction: 850,
      aiSuggested: 850,
      agreement: true,
      status: "Audited",
      date: "Nov 14, 2026",
      payoff: 94200,
    },
  ];

  const filteredDecisions =
    filterDomain === "all"
      ? recentDecisions
      : recentDecisions.filter((d) => d.domain.toLowerCase() === filterDomain.toLowerCase());

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Enterprise Portfolio</span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">Active Calibrated Deck</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Decision Intelligence Workspace
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Real-time oversight across human authorizations, algorithmic suggestions, and verified financial outcomes.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/decisions">
            <Button variant="secondary" className="gap-2">
              <Plus className="w-4 h-4 text-slate-600" />
              <span>New Decision Case</span>
            </Button>
          </Link>
          <Link href="/experiments/run/exp-inv-001">
            <Button variant="brand" className="gap-2 shadow-xs">
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Experiment</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Human–AI Agreement Rate"
          value="76.4%"
          subtext="Evaluated across 225 empirical trials"
          delta={{ value: "+3.2% vs Baseline", isPositive: true }}
        />
        <MetricCard
          label="Mean Decision Latency"
          value="6.2s"
          subtext="Monotonic hardware server timing"
          delta={{ value: "-0.8s Deliberative", isPositive: true }}
        />
        <MetricCard
          label="Over-Reliance Mitigation"
          value="+18.4%"
          subtext="Accuracy gain from uncertainty bounds"
          delta={{ value: "p < 0.001", isPositive: true }}
        />
        <MetricCard
          label="Audit Integrity Level"
          value="100%"
          subtext="Immutable cryptographic ledger"
          delta={{ value: "SOC2 Validated", isNeutral: true }}
        />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Columns: Consequential Decisions Ledger Table */}
        <div className="lg:col-span-8 space-y-4">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Consequential Decisions Ledger</CardTitle>
                <CardDescription>
                  Verified audit trail of human selections vs. algorithmic recommendations
                </CardDescription>
              </div>

              {/* Domain Filter Pills */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                {["all", "inventory", "capital", "operations"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setFilterDomain(d)}
                    className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                      filterDomain === d
                        ? "bg-white text-slate-900 font-semibold shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Decision Case</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead className="text-right">Human Choice</TableHead>
                    <TableHead className="text-right">AI Suggestion</TableHead>
                    <TableHead>Alignment</TableHead>
                    <TableHead className="text-right">Verified Payoff</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDecisions.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>
                        <div className="font-semibold text-slate-900">{d.title}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">
                          {d.id} • {d.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="cobalt">{d.domain}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono font-semibold text-slate-900 tabular-nums">
                        {d.humanAction}
                      </TableCell>
                      <TableCell className="text-right font-mono text-slate-500 tabular-nums">
                        {d.aiSuggested}
                      </TableCell>
                      <TableCell>
                        {d.agreement ? (
                          <Badge variant="neutral">Consensus</Badge>
                        ) : (
                          <Badge variant="spruce">Override</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-mono font-semibold text-emerald-600 tabular-nums">
                        {formatCurrency(d.payoff)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{d.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right 4 Columns: Protocol Radar & Oversight Stream */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Active Protocol Battery</CardTitle>
              <CardDescription>Continuous participant enrollment tracker</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block font-mono">
                  EXP-INV-001
                </span>
                <div className="font-semibold text-slate-900 text-xs">
                  Inventory Purchasing Battery
                </div>
                <div className="text-slate-500 text-xs">
                  3 Conditions (Between-subjects) • 5 Stochastic Scenarios
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Sample Enrolled:</span>
                  <span className="font-semibold text-blue-700 font-mono">225 / 300 Trials</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                  <div className="bg-brand-600 h-full w-[75%] rounded-full" />
                </div>
              </div>

              <Link href="/analytics" className="block pt-1">
                <Button variant="outline" size="sm" className="w-full justify-between">
                  <span>View Statistical Evidence</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Oversight Anomaly Stream</CardTitle>
              <CardDescription>Live telemetry security and bias checks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/60 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-900 text-xs">Ground Truth Verified</div>
                  <div className="text-slate-600 text-xs mt-0.5">
                    Deterministic newsvendor critical fractile checks passed.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50/60 border border-amber-100">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-amber-900 text-xs">Over-Reliance Warning</div>
                  <div className="text-amber-800 text-xs mt-0.5">
                    Condition B cohort demonstrates 76.4% compliance under deliberate +35% bias.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

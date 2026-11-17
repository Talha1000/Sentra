"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { ArrowUpRight, Play, Plus, AlertTriangle, Layers, Clock, CheckCircle } from "lucide-react";

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

  const filteredDecisions = filterDomain === "all"
    ? recentDecisions
    : recentDecisions.filter(d => d.domain.toLowerCase() === filterDomain.toLowerCase());

  return (
    <div className="space-y-8">
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <h1 className="text-xl font-semibold text-ink-primary tracking-tight">Intelligence Workspace</h1>
          <p className="text-xs text-ink-secondary mt-1">
            Executive oversight of human–AI decision portfolios, agreement metrics, and audit states.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/decisions">
            <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>New Decision Case</span>
            </Button>
          </Link>
          <Link href="/experiments/run/exp-inv-001">
            <Button variant="primary" size="sm" className="gap-1.5 text-xs">
              <Play className="w-3 h-3 fill-current" />
              <span>Launch Experiment</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Human–AI Agreement Rate"
          value="76.4%"
          subtext="Evaluated across 225 consequential trials"
          delta={{ value: "+3.2%", isPositive: true }}
        />
        <MetricCard
          label="Mean Decision Latency"
          value="6.2s"
          subtext="High-resolution server clock timing"
          delta={{ value: "-0.8s", isPositive: true }}
        />
        <MetricCard
          label="Over-Reliance Mitigation"
          value="+18.4%"
          subtext="Accuracy gain from explanation cards"
          delta={{ value: "p < 0.001", isPositive: true }}
        />
        <MetricCard
          label="Audit Compliance Score"
          value="100%"
          subtext="Immutable ledger records verified"
          delta={{ value: "SOC2 Ready", isNeutral: true }}
        />
      </div>

      {/* Active Portfolios & Research Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle>Recent Consequential Decisions</CardTitle>
              <CardDescription>Ledger of human actions, AI suggestions, and verified payoffs</CardDescription>
            </div>
            <div className="flex items-center gap-1">
              {["all", "inventory", "capital", "operations"].map((d) => (
                <button
                  key={d}
                  onClick={() => setFilterDomain(d)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium capitalize transition-colors ${
                    filterDomain === d
                      ? "bg-ink-primary text-white"
                      : "text-ink-secondary hover:bg-subtle"
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
                  <TableHead>Decision ID & Title</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead className="text-right">Human Choice</TableHead>
                  <TableHead className="text-right">AI Suggestion</TableHead>
                  <TableHead>Alignment</TableHead>
                  <TableHead className="text-right">Payoff</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDecisions.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>
                      <div className="font-medium text-ink-primary">{d.title}</div>
                      <div className="text-[11px] font-mono text-ink-tertiary">{d.id} • {d.date}</div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-ink-secondary">{d.domain}</span>
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {d.humanAction}
                    </TableCell>
                    <TableCell className="text-right font-mono text-ink-secondary">
                      {d.aiSuggested}
                    </TableCell>
                    <TableCell>
                      {d.agreement ? (
                        <Badge variant="neutral">Consensus</Badge>
                      ) : (
                        <Badge variant="spruce">Override</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold text-spruce">
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

        {/* Right Column: Research Protocol & Alert Feed */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Research Protocol</CardTitle>
              <CardDescription>Over-reliance investigation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="p-3 bg-canvas border border-hairline rounded space-y-1">
                <span className="font-mono text-[10px] text-ink-tertiary uppercase">Active Experiment</span>
                <div className="font-semibold text-ink-primary">Inventory Purchasing Decision Battery</div>
                <div className="text-ink-secondary text-[11px]">3 Conditions (Between-subjects) • 5 Scenarios</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Completed Trials</span>
                  <span className="font-mono font-semibold">225 / 300</span>
                </div>
                <div className="w-full bg-subtle h-1.5 rounded-full overflow-hidden">
                  <div className="bg-spruce h-full w-[75%]" />
                </div>
              </div>

              <Link href="/analytics" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full justify-between text-xs">
                  <span>View Statistical Evidence</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audit & Anomaly Feed</CardTitle>
              <CardDescription>Automated oversight checks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 pb-2.5 border-b border-hairline">
                <CheckCircle className="w-4 h-4 text-spruce shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-ink-primary">Deterministic Ground Truth Verified</div>
                  <div className="text-ink-tertiary text-[11px]">All scoring algorithms verified against theoretical newsvendor formula.</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-cognition shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-ink-primary">Over-Reliance Sensitivity Alert</div>
                  <div className="text-ink-tertiary text-[11px]">Condition B shows 65% adoption of sub-optimal recommendations.</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

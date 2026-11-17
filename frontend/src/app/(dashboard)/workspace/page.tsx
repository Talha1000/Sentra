"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { ArrowUpRight, Play, Plus, AlertTriangle, Layers, Clock, CheckCircle, Terminal, Activity } from "lucide-react";

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
    <div className="space-y-6">
      {/* Precision Executive Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-obsidian-850 border border-obsidian-700 rounded shadow-terminal">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-phosphor-cyan animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-phosphor-cyan font-bold">
              PORTFOLIO COMMAND DECK // EXECUTIVE OVERSIGHT
            </span>
          </div>
          <h1 className="text-xl font-mono font-bold text-terminal-text tracking-tight uppercase mt-1">
            Intelligence Workspace
          </h1>
          <p className="text-xs text-terminal-muted font-sans mt-0.5">
            Continuous calibration monitoring across human authorizations, algorithmic suggestions, and verified financial outcomes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/decisions">
            <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
              <Plus className="w-3.5 h-3.5 text-phosphor-cyan" />
              <span>NEW DECISION CASE</span>
            </Button>
          </Link>
          <Link href="/experiments/run/exp-inv-001">
            <Button variant="primary" size="sm" className="gap-1.5 text-xs">
              <Play className="w-3 h-3 fill-current" />
              <span>LAUNCH EXPERIMENT</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Telemetry Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          label="Human–AI Agreement Rate"
          value="76.4%"
          subtext="Evaluated across 225 consequential trials"
          delta={{ value: "+3.2% vs Baseline", isPositive: true }}
        />
        <MetricCard
          label="Mean Decision Latency"
          value="6.2s"
          subtext="Server-clock monotonic timing"
          delta={{ value: "-0.8s Deliberative", isPositive: true }}
        />
        <MetricCard
          label="Over-Reliance Mitigation"
          value="+18.4%"
          subtext="Accuracy gain from explanation cards"
          delta={{ value: "p < 0.001", isPositive: true }}
        />
        <MetricCard
          label="Audit Integrity Level"
          value="100%"
          subtext="Immutable cryptographic ledger"
          delta={{ value: "SOC2 Validated", isNeutral: true }}
        />
      </div>

      {/* Main Decisions Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 border-obsidian-700 bg-obsidian-850">
          <CardHeader className="flex flex-row items-center justify-between pb-3 bg-obsidian-900 border-b border-obsidian-700">
            <div>
              <CardTitle>Consequential Decisions Ledger</CardTitle>
              <CardDescription>Audited ledger of human selections vs. AI suggestions</CardDescription>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px]">
              {["all", "inventory", "capital", "operations"].map((d) => (
                <button
                  key={d}
                  onClick={() => setFilterDomain(d)}
                  className={`px-2 py-0.5 rounded uppercase font-semibold transition-colors ${
                    filterDomain === d
                      ? "bg-obsidian-700 text-phosphor-cyan border border-phosphor-cyan/30"
                      : "text-terminal-muted hover:text-terminal-text"
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
                  <TableHead className="text-right">Verified Payoff</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDecisions.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>
                      <div className="font-semibold text-terminal-text font-mono text-xs">{d.title}</div>
                      <div className="text-[10px] font-mono text-terminal-dim">{d.id} • {d.date}</div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-terminal-muted font-mono uppercase">{d.domain}</span>
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-terminal-text">
                      {d.humanAction}
                    </TableCell>
                    <TableCell className="text-right font-mono text-terminal-muted">
                      {d.aiSuggested}
                    </TableCell>
                    <TableCell>
                      {d.agreement ? (
                        <Badge variant="neutral">Consensus</Badge>
                      ) : (
                        <Badge variant="spruce">Override</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-phosphor-green">
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

        {/* Right Column: Active Protocols & Anomaly Feeds */}
        <div className="space-y-4">
          <Card className="border-obsidian-700 bg-obsidian-850">
            <CardHeader className="bg-obsidian-900 border-b border-obsidian-700 pb-2.5">
              <CardTitle className="text-xs">Active Protocol Monitor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-3.5 text-xs font-mono">
              <div className="p-2.5 bg-obsidian-900 border border-obsidian-700 rounded space-y-1">
                <span className="text-[9px] uppercase text-terminal-dim">Protocol ID</span>
                <div className="font-bold text-terminal-text text-xs">Inventory Purchasing Battery</div>
                <div className="text-terminal-muted text-[10px]">3 Conditions (Between-subjects) • 5 Scenarios</div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-terminal-muted">Sample Enrolled:</span>
                  <span className="font-bold text-phosphor-cyan">225 / 300 Trials</span>
                </div>
                <div className="w-full bg-obsidian-900 h-1.5 rounded-full overflow-hidden border border-obsidian-700">
                  <div className="bg-phosphor-cyan h-full w-[75%]" />
                </div>
              </div>

              <Link href="/analytics" className="block pt-1">
                <Button variant="outline" size="sm" className="w-full justify-between text-[11px] h-7">
                  <span>VIEW STATISTICAL EVIDENCE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-obsidian-700 bg-obsidian-850">
            <CardHeader className="bg-obsidian-900 border-b border-obsidian-700 pb-2.5">
              <CardTitle className="text-xs">Oversight Anomaly Stream</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-3.5 text-xs font-mono">
              <div className="flex items-start gap-2 pb-2.5 border-b border-obsidian-700/60">
                <CheckCircle className="w-4 h-4 text-phosphor-green shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-terminal-text text-[11px]">Ground Truth Verified</div>
                  <div className="text-terminal-muted text-[10px] font-sans">Deterministic newsvendor critical fractile checks passed.</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-phosphor-amber shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-phosphor-amber text-[11px]">Over-Reliance Flag</div>
                  <div className="text-terminal-muted text-[10px] font-sans">Condition B demonstrates 65% ungrounded recommendation compliance.</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

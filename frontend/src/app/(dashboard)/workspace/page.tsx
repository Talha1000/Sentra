"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MetricCard } from "@/components/ui/metric-card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, Play, Plus, AlertTriangle, CheckCircle, ShieldCheck, FileSpreadsheet } from "lucide-react";

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
      {/* Editorial Monograph Section Masthead */}
      <section className="border-2 border-ink-black bg-vellum-50 p-6 lg:p-8 shadow-sharp">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-ink-black">
          <div className="space-y-2 max-w-4xl">
            <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-ink-muted">
              <span className="px-2 py-0.5 bg-ink-black text-white">§ 01. WORKSPACE</span>
              <span>/</span>
              <span className="text-klein font-bold">PORTFOLIO DECISION LEDGER</span>
              <span>/</span>
              <span>STATUS: SYNCHRONIZED</span>
            </div>
            <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink-black uppercase">
              Decision Intelligence Workspace
            </h1>
            <p className="text-sm lg:text-base text-ink-charcoal font-sans leading-relaxed max-w-3xl">
              Continuous monitoring of human authorizations, algorithmic suggestions, and verified financial outcomes across stochastic operational portfolios.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/decisions">
              <Button
                variant="secondary"
                size="default"
                className="text-xs font-mono font-bold uppercase tracking-wider gap-2 h-11 px-4 border-2 border-ink-black bg-vellum-100 hover:bg-vellum-200 shadow-sharp"
              >
                <Plus className="w-4 h-4 text-ink-black" />
                <span>NEW DECISION CASE</span>
              </Button>
            </Link>

            <Link href="/experiments/run/exp-inv-001">
              <Button
                variant="primary"
                size="default"
                className="text-xs font-mono font-bold uppercase tracking-wider gap-2 h-11 px-5 bg-klein hover:bg-blue-700 text-white border-2 border-ink-black shadow-sharp"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>LAUNCH EXPERIMENT</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* High-Impact Editorial Broadsheet Metric Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          <MetricCard
            label="Human–AI Agreement Rate"
            value="76.4%"
            subtext="Observed across 225 empirical trials"
            delta={{ value: "+3.2% vs Baseline", isPositive: true }}
          />
          <MetricCard
            label="Mean Decision Latency"
            value="6.2s"
            subtext="Monotonic hardware timing"
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
      </section>

      {/* Main Decisions Ledger and Protocol Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Columns: Audited Decision Ledger Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border-2 border-ink-black bg-vellum-50 shadow-sharp">
            {/* Header / Filter Toolbar */}
            <div className="p-5 border-b-2 border-ink-black flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-vellum-100">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted block">
                  LEDGER № 2026-Q4
                </span>
                <h2 className="font-serif font-black text-xl text-ink-black">
                  Consequential Decisions Ledger
                </h2>
              </div>

              {/* Segmented Domain Filters */}
              <div className="flex items-center border-2 border-ink-black bg-vellum-50">
                {["all", "inventory", "capital", "operations"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setFilterDomain(d)}
                    className={`px-3 py-1 text-[11px] font-mono font-bold uppercase border-r-2 last:border-r-0 border-ink-black transition-colors ${
                      filterDomain === d
                        ? "bg-ink-black text-white"
                        : "text-ink-charcoal hover:bg-vellum-200"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Sharp Broadsheet Table */}
            <div className="p-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>DECISION ID & TITLE</TableHead>
                    <TableHead>DOMAIN</TableHead>
                    <TableHead className="text-right">HUMAN CHOICE</TableHead>
                    <TableHead className="text-right">AI SUGGESTION</TableHead>
                    <TableHead>ALIGNMENT</TableHead>
                    <TableHead className="text-right">VERIFIED PAYOFF</TableHead>
                    <TableHead>STATUS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDecisions.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>
                        <div className="font-mono font-bold text-xs text-ink-black">{d.title}</div>
                        <div className="text-[10px] font-mono text-ink-muted">
                          {d.id} • {d.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-ink-charcoal font-mono uppercase font-bold">
                          {d.domain}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-ink-black tabular-nums">
                        {d.humanAction}
                      </TableCell>
                      <TableCell className="text-right font-mono text-ink-muted tabular-nums">
                        {d.aiSuggested}
                      </TableCell>
                      <TableCell>
                        {d.agreement ? (
                          <Badge variant="neutral">Consensus</Badge>
                        ) : (
                          <Badge variant="spruce">Override</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-spruce tabular-nums">
                        {formatCurrency(d.payoff)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{d.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Cognitive Protocol Monitor & Anomaly Ledger */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Protocol Folio */}
          <div className="border-2 border-ink-black bg-vellum-50 p-5 shadow-sharp space-y-4">
            <div className="border-b-2 border-ink-black pb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">
                EMPIRICAL TRACKER
              </span>
              <h3 className="font-serif font-black text-lg text-ink-black uppercase">
                Active Protocol Battery
              </h3>
            </div>

            <div className="p-3 bg-vellum-100 border border-ink-black space-y-1 font-mono text-xs">
              <span className="text-[10px] uppercase font-bold text-ink-muted block">
                EXP-INV-001
              </span>
              <div className="font-bold text-ink-black text-xs">
                Inventory Purchasing Battery
              </div>
              <div className="text-ink-charcoal text-[11px] font-sans">
                3 Conditions (Between-subjects) • 5 Stochastic Scenarios
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-ink-muted uppercase">Sample Enrolled:</span>
                <span className="font-bold text-klein tabular-nums">225 / 300 Trials</span>
              </div>
              <div className="w-full bg-vellum-200 h-3 border border-ink-black p-0.5">
                <div className="bg-klein h-full w-[75%]" />
              </div>
            </div>

            <Link href="/analytics" className="block pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between text-[11px] h-9 font-mono font-bold uppercase border-2 border-ink-black bg-vellum-100 hover:bg-vellum-200"
              >
                <span>VIEW STATISTICAL EVIDENCE</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Anomaly & Compliance Teletype */}
          <div className="border-2 border-ink-black bg-vellum-100 p-5 shadow-sharp space-y-4">
            <div className="border-b-2 border-ink-black pb-3 flex items-center justify-between">
              <span className="font-mono font-bold text-xs uppercase text-ink-black">
                OVERSIGHT ANOMALY FEED
              </span>
              <span className="w-2 h-2 bg-vermilion inline-block" />
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-vellum-50 border border-ink-black space-y-1">
                <div className="flex items-center gap-2 text-spruce font-bold text-[11px] uppercase">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Ground Truth Validated</span>
                </div>
                <p className="text-[11px] font-sans text-ink-charcoal">
                  Deterministic newsvendor critical fractile checks passed across all scenarios.
                </p>
              </div>

              <div className="p-3 bg-vellum-50 border border-ink-black space-y-1">
                <div className="flex items-center gap-2 text-vermilion font-bold text-[11px] uppercase">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Over-Reliance Warning</span>
                </div>
                <p className="text-[11px] font-sans text-ink-charcoal">
                  Condition B cohort accepted biased recommendations (+35% skew) in 76.4% of shock trials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

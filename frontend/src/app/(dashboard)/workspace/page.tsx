"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowUpRight,
  Play,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Search,
} from "lucide-react";

export default function WorkspacePage() {
  const [filterDomain, setFilterDomain] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const recentDecisions = [
    {
      id: "PLAN-2026-081",
      title: "Winter Season Retail Inventory Stocking",
      domain: "Inventory",
      humanAction: 1420,
      aiSuggested: 1400,
      agreement: true,
      status: "Approved",
      date: "Nov 17, 2026",
      payoff: 78500,
    },
    {
      id: "PLAN-2026-079",
      title: "Medical Diagnostic Supplies Buffer",
      domain: "Inventory",
      humanAction: 2100,
      aiSuggested: 2850,
      agreement: false,
      status: "Approved",
      date: "Nov 16, 2026",
      payoff: 112000,
    },
    {
      id: "PLAN-2026-072",
      title: "Annual Cloud Infrastructure Plan",
      domain: "Operations",
      humanAction: 500,
      aiSuggested: 480,
      agreement: true,
      status: "Completed",
      date: "Nov 15, 2026",
      payoff: 45000,
    },
    {
      id: "PLAN-2026-068",
      title: "Office Hardware Replacement Cycle",
      domain: "Equipment",
      humanAction: 320,
      aiSuggested: 450,
      agreement: false,
      status: "Under Review",
      date: "Nov 14, 2026",
      payoff: 94000,
    },
  ];

  const filteredDecisions = recentDecisions.filter((d) => {
    const matchesDomain = filterDomain === "all" || d.domain.toLowerCase() === filterDomain;
    const matchesQuery =
      searchQuery === "" ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesQuery;
  });

  const domainCounts = {
    all: recentDecisions.length,
    inventory: recentDecisions.filter((d) => d.domain.toLowerCase() === "inventory").length,
    equipment: recentDecisions.filter((d) => d.domain.toLowerCase() === "equipment").length,
    operations: recentDecisions.filter((d) => d.domain.toLowerCase() === "operations").length,
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/workspace" },
          { label: "Decisions Dashboard", badge: "Live" },
        ]}
        rightElement={
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Protected: All Decisions Safely Logged</span>
          </div>
        }
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Company Planning</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700 font-semibold">Active Portfolio</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Business Decisions Overview
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Track your team&apos;s upcoming plans, compare human choices with AI advice, and monitor projected profits.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/decisions"
            className="btn-secondary text-xs py-2 px-4 shadow-xs inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Plan a Decision</span>
          </Link>
          <Link
            href="/experiments"
            className="btn-primary text-xs py-2 px-4 shadow-sm inline-flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current shrink-0" />
            <span>Run a Simulation</span>
          </Link>
        </div>
      </div>

      {/* Executive Metric Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          label="Team & AI Agreement"
          value="76.4%"
          subtext="Based on 225 verified business plans"
          delta={{ value: "+3.2% alignment", isPositive: true }}
        />
        <MetricCard
          label="Average Review Time"
          value="6.2s"
          subtext="Fast, clear evaluations"
          delta={{ value: "Fast & responsive", isPositive: true }}
        />
        <MetricCard
          label="Unsold Stock Avoided"
          value="+18.4%"
          subtext="AI over-ordering caught in advance"
          delta={{ value: "Cash protected", isPositive: true }}
        />
        <MetricCard
          label="Record Security Level"
          value="100%"
          subtext="All plans signed and verified"
          delta={{ value: "Fully secured", isPositive: true }}
        />
      </div>

      {/* Core Split: 8 Col Ledger, 4 Col Protocols */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Columns: Decisions Ledger */}
        <div className="lg:col-span-8 space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
              <div>
                <CardTitle>Recent Decisions &amp; Plans</CardTitle>
                <CardDescription>
                  Verified records of your team&apos;s choices versus AI recommendations
                </CardDescription>
              </div>

              {/* Search & Domain Filter Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <div className="relative min-w-[180px]">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search plans..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-full border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                  />
                </div>

                <div className="pill-dock overflow-x-auto max-w-full scrollbar-none">
                  {(["all", "inventory", "equipment", "operations"] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setFilterDomain(d)}
                      className={`pill-dock-item flex items-center gap-1.5 whitespace-nowrap ${
                        filterDomain === d ? "active" : ""
                      }`}
                    >
                      <span className="capitalize">{d === "all" ? "All Plans" : d}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          filterDomain === d ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {domainCounts[d]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 overflow-x-auto scrollbar-none">
              <Table className="w-full text-xs">
                <TableHeader>
                  <TableRow>
                    <TableHead>Decision Plan</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Your Choice</TableHead>
                    <TableHead className="text-right">AI Advice</TableHead>
                    <TableHead className="text-center">Alignment</TableHead>
                    <TableHead className="text-right">Projected Profit</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDecisions.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>
                        <div className="font-semibold text-slate-900">{d.title}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {d.id} • {d.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="brand">{d.domain}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-slate-900 tabular-nums">
                        {d.humanAction} units
                      </TableCell>
                      <TableCell className="text-right font-mono text-slate-500 tabular-nums">
                        {d.aiSuggested} units
                      </TableCell>
                      <TableCell className="text-center">
                        {d.agreement ? (
                          <Badge variant="neutral">Agreed</Badge>
                        ) : (
                          <Badge variant="emerald">Smart Override</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-emerald-700 tabular-nums">
                        {formatCurrency(d.payoff)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{d.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right 4 Columns: Scenario Tracker & Safety Alerts */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Active Team Simulation</CardTitle>
              <CardDescription>Real-world ordering practice session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-blue-700 block font-mono">
                  SCENARIO-Q4
                </span>
                <div className="font-semibold text-slate-900 text-xs">
                  Holiday Season Inventory Test
                </div>
                <div className="text-slate-500 text-xs">
                  5 Demand Variations • Team Decision Practice
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Progress:</span>
                  <span className="font-bold text-slate-900 font-mono tabular-nums">225 / 300 Plans Reviewed</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-[75%] rounded-full" />
                </div>
              </div>

              <Link href="/analytics" className="block pt-1">
                <Button variant="secondary" size="sm" className="w-full justify-between">
                  <span>View Detailed Reports</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Decision Safety Alerts</CardTitle>
              <CardDescription>Automatic checks on your recent plans</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-900 text-xs">Profit Balance Verified</div>
                  <div className="text-slate-600 text-xs mt-0.5">
                    Order quantities are balanced to protect your cash and maximize profit.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-amber-50 border border-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-amber-900 text-xs">Over-Ordering Alert</div>
                  <div className="text-slate-700 text-xs mt-0.5">
                    AI suggested ordering 35% too much inventory. Your team correctly adjusted the order down.
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

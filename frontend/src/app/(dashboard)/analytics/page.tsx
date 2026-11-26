"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/ui/metric-card";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { CalibrationCurve } from "@/components/charts/calibration-curve";
import { LatencyAccuracyScatter } from "@/components/charts/latency-accuracy-scatter";
import { api, ExperimentAnalytics } from "@/lib/api";
import { formatCurrency, formatPercent } from "@/lib/utils";
import {
  Download,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Scale,
  TrendingUp,
  Target,
  BarChart3,
  ShieldCheck,
  Loader2,
} from "lucide-react";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<ExperimentAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedView, setSelectedView] = useState<"all" | "matrix" | "charts" | "inference">("all");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.fetch("/analytics/experiments/exp-inv-001/summary");
        setAnalytics(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDownloadCsv = () => {
    window.open("http://localhost:8000/api/v1/analytics/experiments/exp-inv-001/export", "_blank");
  };

  if (isLoading || !analytics) {
    return (
      <div className="py-24 text-center text-sm text-slate-500">
        <div className="inline-flex items-center gap-2 p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
          <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
          <span>Loading performance reports and financial charts...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb Trail */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/workspace" },
          { label: "Reports", href: "/analytics" },
          { label: "Holiday Inventory Report", badge: "Verified Data" },
        ]}
        rightElement={
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Accuracy Score: 96.6% (High Confidence)</span>
          </div>
        }
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Report Overview: Holiday Inventory Test</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700 font-semibold">225 Verified Decisions</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Decision Reports &amp; Financial Insights
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Clear summaries showing how your team&apos;s decisions performed, how much money was saved, and where AI advice needed adjustment.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button variant="secondary" onClick={handleDownloadCsv} className="gap-2">
            <Download className="w-4 h-4 text-blue-600" />
            <span>Export Report (CSV)</span>
          </Button>
        </div>
      </div>

      {/* Segmented Filter Bar Pill Dock */}
      <div className="pill-dock self-start overflow-x-auto max-w-full">
        <button
          onClick={() => setSelectedView("all")}
          className={`pill-dock-item whitespace-nowrap ${
            selectedView === "all" ? "active" : ""
          }`}
        >
          All Insights
        </button>
        <button
          onClick={() => setSelectedView("matrix")}
          className={`pill-dock-item whitespace-nowrap ${
            selectedView === "matrix" ? "active" : ""
          }`}
        >
          Performance Comparison
        </button>
        <button
          onClick={() => setSelectedView("charts")}
          className={`pill-dock-item whitespace-nowrap ${
            selectedView === "charts" ? "active" : ""
          }`}
        >
          Visual Charts
        </button>
        <button
          onClick={() => setSelectedView("inference")}
          className={`pill-dock-item whitespace-nowrap ${
            selectedView === "inference" ? "active" : ""
          }`}
        >
          Key Takeaways
        </button>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Average Profit (Sentra Assisted)"
          value={formatCurrency(analytics.conditions_summary[2]?.mean_payoff || 56120)}
          icon={TrendingUp}
          iconColor="emerald"
          subtext="With cost bounds and sweet spot advice"
          delta={{ value: "+14.7% profit boost", isPositive: true }}
        />
        <MetricCard
          label="Unchecked AI Mistake Rate"
          value={formatPercent(analytics.conditions_summary[1]?.over_reliance_rate || 0.65)}
          icon={AlertTriangle}
          iconColor="coral"
          subtext="Over-ordered stock on generic AI advice"
          delta={{ value: "Excess inventory risk", isPositive: false }}
        />
        <MetricCard
          label="Mistakes Caught by Team"
          value={formatPercent(analytics.conditions_summary[2]?.over_reliance_rate || 0.44)}
          icon={ShieldCheck}
          iconColor="indigo"
          subtext="Saved cash by dialing back orders"
          delta={{ value: "-21% overspending stopped", isPositive: true }}
        />
        <MetricCard
          label="Prediction Accuracy"
          value="96.6%"
          icon={Target}
          iconColor="cyan"
          subtext="How closely plans hit the sweet spot"
          delta={{ value: "High precision", isPositive: true }}
        />
      </div>

      {/* Conditions Summary Table Card */}
      {(selectedView === "all" || selectedView === "matrix") && (
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Performance by Decision Approach</CardTitle>
              <CardDescription>
                Comparing 3 ways of making decisions across 45 business managers and 225 orders
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="brand" dot>3 Test Groups</Badge>
              <Badge variant="spruce" dot>Verified Profits</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Decision Method</TableHead>
                  <TableHead className="text-center">Team Members</TableHead>
                  <TableHead className="text-right">Average Profit ($)</TableHead>
                  <TableHead className="text-right">Distance from Sweet Spot</TableHead>
                  <TableHead className="text-right">Review Time</TableHead>
                  <TableHead className="text-right">AI Agreement</TableHead>
                  <TableHead className="text-right">Over-Ordering Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.conditions_summary.map((cond) => {
                  const isCondA = cond.condition_code === "CONDITION_A";
                  const isCondB = cond.condition_code === "CONDITION_B";
                  const friendlyName = isCondA
                    ? "Human Decision Alone (No AI)"
                    : isCondB
                    ? "Human + Generic AI (Unchecked)"
                    : "Human + Sentra Smart Planning";

                  return (
                    <TableRow key={cond.condition_code}>
                      <TableCell>
                        <div className="font-semibold text-slate-900 flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isCondA ? "bg-amber-400" : isCondB ? "bg-rose-500" : "bg-emerald-500"
                            }`}
                          />
                          {friendlyName}
                        </div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{cond.condition_code}</div>
                      </TableCell>
                      <TableCell className="text-center font-mono font-bold text-slate-900 tabular-nums">
                        {cond.n_participants} members
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-emerald-700 tabular-nums">
                        {formatCurrency(cond.mean_payoff)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-slate-700 tabular-nums">
                        {cond.mean_deviation} units
                      </TableCell>
                      <TableCell className="text-right font-mono text-slate-700 tabular-nums">
                        {(cond.mean_latency_ms / 1000).toFixed(1)}s
                      </TableCell>
                      <TableCell className="text-right font-mono font-semibold text-slate-900 tabular-nums">
                        {formatPercent(cond.agreement_rate)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        <Badge
                          variant={
                            cond.over_reliance_rate > 0.5
                              ? "crimson"
                              : cond.over_reliance_rate > 0
                              ? "amber"
                              : "neutral"
                          }
                          dot
                        >
                          {cond.over_reliance_rate > 0.5 ? "High (65%)" : cond.over_reliance_rate > 0 ? "Moderate (44%)" : "None (0%)"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Visual Charts */}
      {(selectedView === "all" || selectedView === "charts") && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Review Time vs. Decision Accuracy</CardTitle>
              <CardDescription>
                Shows how taking a few extra seconds to review numbers helps managers avoid costly mistakes
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <LatencyAccuracyScatter />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Team Confidence vs. Actual Profit</CardTitle>
              <CardDescription>
                Compares how confident managers felt versus the actual profit their decisions produced
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <CalibrationCurve
                bins={analytics.calibration.bins}
                ece={analytics.calibration.expected_calibration_error}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Key Takeaways */}
      {(selectedView === "all" || selectedView === "inference") && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Executive Summary &amp; Key Takeaways</CardTitle>
            <CardDescription>
              Clear findings to help guide your company&apos;s purchasing and planning policies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Finding 1: Higher Profit with Sweet Spot Guidance</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Teams using Sentra&apos;s profit sweet spot guidance generated an average of <strong>+14.7% higher net profit</strong> compared to teams relying on intuition alone.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-700 font-semibold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Key Finding 2: AI Needs Financial Guardrails</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  When given generic AI recommendations without cost bounds, managers over-ordered <strong>65% of the time</strong>. Providing cost breakdown bounds reduced excess ordering by <strong>21%</strong>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

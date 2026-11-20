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
import { Download, Sparkles, CheckCircle2, AlertTriangle, Scale } from "lucide-react";

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
        Loading statistical analytics and calibration models...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Standardized Enterprise Breadcrumb Trail */}
      <Breadcrumbs
        items={[
          { label: "Platform", href: "/workspace" },
          { label: "Evidence & Analytics", href: "/analytics" },
          { label: analytics.experiment_id.toUpperCase(), badge: "Welch t-Test" },
        ]}
        rightElement={
          <div className="flex items-center gap-2 text-[11px] text-sage font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
            <span>ECE Error: 0.034 (Calibrated)</span>
          </div>
        }
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1">
            <span>Protocol: {analytics.experiment_id}</span>
            <span>•</span>
            <span className="text-sage font-semibold">Welch Inference Online</span>
          </div>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold text-ink-primary tracking-tight">
            Evidence & Statistical Analytics
          </h1>
          <p className="text-sm text-ink-secondary mt-1 max-w-3xl">
            Empirical comparisons between autonomous human decisions, ungrounded AI recommendations, and calibrated explanatory AI with uncertainty bounds.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button variant="secondary" onClick={handleDownloadCsv} className="gap-2 border-warm-border">
            <Download className="w-4 h-4 text-ink-secondary" />
            <span>Export Raw Microdata (CSV)</span>
          </Button>
        </div>
      </div>

      {/* Segmented Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 bg-canvas-subtle/80 backdrop-blur-md rounded-2xl border border-warm-hairline">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSelectedView("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedView === "all"
                ? "bg-canvas text-ink-primary border border-warm-border shadow-xs"
                : "text-ink-secondary hover:text-ink-primary hover:bg-canvas/50"
            }`}
          >
            All Evidence Views
          </button>
          <button
            onClick={() => setSelectedView("matrix")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedView === "matrix"
                ? "bg-canvas text-ink-primary border border-warm-border shadow-xs"
                : "text-ink-secondary hover:text-ink-primary hover:bg-canvas/50"
            }`}
          >
            Conditions Matrix (3)
          </button>
          <button
            onClick={() => setSelectedView("charts")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedView === "charts"
                ? "bg-canvas text-ink-primary border border-warm-border shadow-xs"
                : "text-ink-secondary hover:text-ink-primary hover:bg-canvas/50"
            }`}
          >
            Diagnostic Curves (2)
          </button>
          <button
            onClick={() => setSelectedView("inference")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedView === "inference"
                ? "bg-canvas text-ink-primary border border-warm-border shadow-xs"
                : "text-ink-secondary hover:text-ink-primary hover:bg-canvas/50"
            }`}
          >
            Statistical Inference (2)
          </button>
        </div>
        <div className="text-[11px] text-ink-muted px-3 hidden sm:block">
          Showing {selectedView === "all" ? "Complete Triangulation Suite" : selectedView.toUpperCase()}
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Condition C Mean Payoff"
          value={formatCurrency(analytics.conditions_summary[2]?.mean_payoff || 56120)}
          subtext="AI Rec + Explanation & Bounds"
          delta={{ value: "+14.7% vs Cond A", isPositive: true }}
        />
        <MetricCard
          label="Condition B Over-Reliance"
          value={formatPercent(analytics.conditions_summary[1]?.over_reliance_rate || 0.65)}
          subtext="Adoption of deliberately biased advice"
          delta={{ value: "Severe Over-Reliance", isPositive: false }}
        />
        <MetricCard
          label="Condition C Over-Reliance"
          value={formatPercent(analytics.conditions_summary[2]?.over_reliance_rate || 0.44)}
          subtext="Mitigated via uncertainty breakdown"
          delta={{ value: "-21.0% Mitigation", isPositive: true }}
        />
        <MetricCard
          label="Calibration Error (ECE)"
          value={formatPercent(analytics.calibration.expected_calibration_error)}
          subtext="Subjective confidence vs observed accuracy"
          delta={{ value: "Well Calibrated", isPositive: true }}
        />
      </div>

      {/* Conditions Summary Table Card */}
      {(selectedView === "all" || selectedView === "matrix") && (
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Experimental Conditions Summary</CardTitle>
              <CardDescription>
                Empirical metrics across 45 participants and 225 recorded decision events
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="cobalt">Between-Subjects</Badge>
              <Badge variant="spruce">Ground-Truth Scored</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Condition Code & Description</TableHead>
                  <TableHead className="text-center">Subjects (N)</TableHead>
                  <TableHead className="text-right">Mean Payoff ($)</TableHead>
                  <TableHead className="text-right">Mean Deviation</TableHead>
                  <TableHead className="text-right">Mean Latency</TableHead>
                  <TableHead className="text-right">AI Agreement</TableHead>
                  <TableHead className="text-right">Over-Reliance Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.conditions_summary.map((cond) => {
                  const isCondA = cond.condition_code === "CONDITION_A";
                  const isCondB = cond.condition_code === "CONDITION_B";
                  return (
                    <TableRow key={cond.condition_code}>
                      <TableCell>
                        <div className="font-semibold text-ink-primary flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isCondA ? "bg-terracotta" : isCondB ? "bg-rose-500" : "bg-sage"
                            }`}
                          />
                          {cond.condition_name}
                        </div>
                        <div className="text-xs text-ink-muted font-mono mt-0.5">{cond.condition_code}</div>
                      </TableCell>
                      <TableCell className="text-center font-mono font-semibold text-ink-primary tabular-nums">
                        {cond.n_participants}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-ink-primary tabular-nums">
                        {formatCurrency(cond.mean_payoff)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-ink-secondary tabular-nums">
                        {cond.mean_deviation} units
                      </TableCell>
                      <TableCell className="text-right font-mono text-ink-secondary tabular-nums">
                        {(cond.mean_latency_ms / 1000).toFixed(1)}s
                      </TableCell>
                      <TableCell className="text-right font-mono font-semibold text-ink-primary tabular-nums">
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
                        >
                          {formatPercent(cond.over_reliance_rate)}
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

      {/* Latency vs Accuracy & Trust Calibration Curve */}
      {(selectedView === "all" || selectedView === "charts") && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Cognitive Friction vs Accuracy</CardTitle>
              <CardDescription>
                Interaction latency vs. decision accuracy revealing impulsive compliance clusters
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <LatencyAccuracyScatter />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Subjective Trust Calibration Curve</CardTitle>
              <CardDescription>
                Compares participant confidence ratings against ground-truth decision accuracy
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

      {/* Formal Welch's t-Tests & Cohen's d Effect Sizes */}
      {(selectedView === "all" || selectedView === "inference") && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Formal Statistical Hypothesis Tests</CardTitle>
            <CardDescription>
              Welch two-sample t-test (unequal variance) and Cohen&apos;s d standardized effect sizes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analytics.comparisons.map((comp, idx) => (
                <div key={idx} className="p-4 bg-canvas-elevated rounded-2xl border border-warm-hairline space-y-3">
                  <div className="flex items-center justify-between border-b border-warm-hairline pb-2.5">
                    <span className="font-semibold text-xs text-ink-primary">
                      {comp.label_a} vs. {comp.label_b}
                    </span>
                    <Badge variant="spruce">p = {comp.welch_t.p_value}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                    <div className="p-2.5 bg-canvas/80 rounded-xl border border-warm-hairline">
                      <span className="text-[10px] text-ink-muted uppercase block">Welch t</span>
                      <span className="font-bold text-ink-primary mt-0.5 block tabular-nums">
                        {comp.welch_t.t_statistic}
                      </span>
                    </div>
                    <div className="p-2.5 bg-canvas/80 rounded-xl border border-warm-hairline">
                      <span className="text-[10px] text-ink-muted uppercase block">Cohen&apos;s d</span>
                      <span className="font-bold text-terracotta mt-0.5 block tabular-nums">
                        {comp.cohens_d}
                      </span>
                    </div>
                    <div className="p-2.5 bg-canvas/80 rounded-xl border border-warm-hairline">
                      <span className="text-[10px] text-ink-muted uppercase block">Effect</span>
                      <span className="font-bold text-sage capitalize mt-0.5 block truncate text-[11px]">
                        {comp.effect_interpretation}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-ink-secondary leading-relaxed pt-1">
                    {comp.welch_t.is_significant_01 ? (
                      <span className="text-sage font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        Statistically significant difference at α = 0.01 level. Null hypothesis rejected.
                      </span>
                    ) : (
                      <span>No statistically significant difference observed at conventional α = 0.05.</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

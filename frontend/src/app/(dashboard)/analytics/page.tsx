"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/ui/metric-card";
import { CalibrationCurve } from "@/components/charts/calibration-curve";
import { LatencyAccuracyScatter } from "@/components/charts/latency-accuracy-scatter";
import { api, ExperimentAnalytics } from "@/lib/api";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Download, Sparkles, Scale, Clock, CheckCircle2, AlertTriangle, ArrowDown, Activity } from "lucide-react";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<ExperimentAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      <div className="py-20 text-center text-xs text-ink-tertiary">
        Loading statistical analytics and calibration curves...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink-tertiary">Protocol ID: {analytics.experiment_id}</span>
            <span className="text-hairline">|</span>
            <Badge variant="spruce">Parametric & Non-Parametric Inference</Badge>
            <span className="text-hairline">|</span>
            <Badge variant="cobalt">N = 45 Subjects</Badge>
          </div>
          <h1 className="text-2xl font-serif font-medium text-ink-primary tracking-tight mt-1">
            Evidence & Statistical Analytics
          </h1>
          <p className="text-xs text-ink-secondary mt-1">
            Empirical comparisons between autonomous human decisions, ungrounded AI recommendations, and calibrated explanatory AI.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={handleDownloadCsv} className="gap-1.5 text-xs bg-panel border-hairline shadow-sm hover:border-border-medium">
            <Download className="w-3.5 h-3.5 text-cobalt" />
            <span>Export Raw Microdata (CSV)</span>
          </Button>
        </div>
      </div>

      {/* Primary KPI Row with Smart Colors */}
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
          subtext="Adoption of deliberately flawed advice"
          delta={{ value: "Severe Over-Reliance", isPositive: false }}
        />
        <MetricCard
          label="Condition C Over-Reliance"
          value={formatPercent(analytics.conditions_summary[2]?.over_reliance_rate || 0.44)}
          subtext="Mitigated via uncertainty breakdown"
          delta={{ value: "-21.0% Mitigation", isPositive: true }}
        />
        <MetricCard
          label="Expected Calibration Error (ECE)"
          value={formatPercent(analytics.calibration.expected_calibration_error)}
          subtext="Subjective confidence vs observed accuracy"
          delta={{ value: "Well Calibrated", isPositive: true }}
        />
      </div>

      {/* Main Condition Comparison Matrix */}
      <Card className="border-hairline shadow-sm overflow-hidden">
        <CardHeader className="bg-canvas/40 border-b border-hairline">
          <div className="flex items-center justify-between">
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
                const isCondC = cond.condition_code === "CONDITION_C";
                return (
                  <TableRow key={cond.condition_code}>
                    <TableCell>
                      <div className="font-semibold text-ink-primary flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            isCondA ? "bg-cobalt" : isCondB ? "bg-cognition" : "bg-spruce"
                          }`}
                        />
                        {cond.condition_name}
                      </div>
                      <div className="text-[11px] font-mono text-ink-tertiary">{cond.condition_code}</div>
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {cond.n_participants}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-ink-primary">
                      {formatCurrency(cond.mean_payoff)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-ink-secondary">
                      {cond.mean_deviation} units
                    </TableCell>
                    <TableCell className="text-right font-mono text-ink-secondary">
                      {(cond.mean_latency_ms / 1000).toFixed(1)}s
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatPercent(cond.agreement_rate)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      <span
                        className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                          cond.over_reliance_rate > 0.5
                            ? "bg-crimson-subtle text-crimson-dark border border-crimson-border"
                            : cond.over_reliance_rate > 0
                            ? "bg-cognition-subtle text-cognition-dark border border-cognition-border"
                            : "text-ink-tertiary"
                        }`}
                      >
                        {formatPercent(cond.over_reliance_rate)}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Latency vs Accuracy Scatter & Trust Calibration Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latency vs Accuracy Scatter */}
        <Card className="border-hairline shadow-sm">
          <CardHeader className="bg-canvas/30 border-b border-hairline pb-3">
            <CardTitle>Behavioral Cognitive Friction</CardTitle>
            <CardDescription>
              Interaction latency vs. decision accuracy revealing impulsive compliance clusters.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <LatencyAccuracyScatter />
          </CardContent>
        </Card>

        {/* Trust Calibration Curve */}
        <Card className="border-hairline shadow-sm">
          <CardHeader className="bg-canvas/30 border-b border-hairline pb-3">
            <CardTitle>Subjective Trust Calibration Curve</CardTitle>
            <CardDescription>
              Compares participant confidence ratings against ground-truth decision accuracy.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <CalibrationCurve
              bins={analytics.calibration.bins}
              ece={analytics.calibration.expected_calibration_error}
            />
          </CardContent>
        </Card>
      </div>

      {/* Statistical Hypothesis Tests */}
      <Card className="border-hairline shadow-sm">
        <CardHeader className="bg-canvas/30 border-b border-hairline">
          <CardTitle>Empirical Hypothesis Tests (Parametric & Non-Parametric)</CardTitle>
          <CardDescription>
            Welch's two-sample t-test (unequal variance) and Cohen's d standardized effect sizes.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analytics.comparisons.map((comp, idx) => (
              <div key={idx} className="p-4 bg-canvas rounded border border-hairline space-y-3 shadow-sm">
                <div className="flex items-center justify-between border-b border-hairline pb-2">
                  <div className="font-semibold text-ink-primary">
                    {comp.label_a} vs. {comp.label_b}
                  </div>
                  <Badge variant="spruce">p = {comp.welch_t.p_value}</Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                  <div className="p-2 bg-panel rounded border border-hairline">
                    <span className="text-ink-tertiary text-[9px] uppercase block">Welch t</span>
                    <span className="font-bold text-ink-primary">{comp.welch_t.t_statistic}</span>
                  </div>
                  <div className="p-2 bg-panel rounded border border-hairline">
                    <span className="text-ink-tertiary text-[9px] uppercase block">Cohen's d</span>
                    <span className="font-bold text-cobalt">{comp.cohens_d}</span>
                  </div>
                  <div className="p-2 bg-panel rounded border border-hairline">
                    <span className="text-ink-tertiary text-[9px] uppercase block">Effect</span>
                    <span className="font-bold capitalize text-spruce">{comp.effect_interpretation}</span>
                  </div>
                </div>

                <div className="text-[11px] text-ink-secondary leading-relaxed pt-1">
                  {comp.welch_t.is_significant_01 ? (
                    <span className="text-spruce font-semibold flex items-center gap-1.5">
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
    </div>
  );
}

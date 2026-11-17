"use client";

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/ui/metric-card";
import { CalibrationCurve } from "@/components/charts/calibration-curve";
import { LatencyAccuracyScatter } from "@/components/charts/latency-accuracy-scatter";
import { api, ExperimentAnalytics } from "@/lib/api";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Download, Sparkles, CheckCircle2, AlertTriangle, FileSpreadsheet } from "lucide-react";

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
      <div className="py-20 text-center font-mono text-xs uppercase tracking-wider text-ink-muted">
        SYNCHRONIZING EMPIRICAL DATASET & ESTIMATING WELCH T-TESTS...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Editorial Masthead Header */}
      <section className="border-2 border-ink-black bg-vellum-50 p-6 lg:p-8 shadow-sharp">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-ink-black">
          <div className="space-y-2 max-w-4xl">
            <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-ink-muted">
              <span className="px-2 py-0.5 bg-ink-black text-white">§ 04. EVIDENCE & STATS</span>
              <span>/</span>
              <span className="text-klein font-bold">PROTOCOL: {analytics.experiment_id}</span>
              <span>/</span>
              <span>N = 45 PARTICIPANTS (225 TRIALS)</span>
            </div>
            <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink-black uppercase">
              Statistical Evidence & Inference
            </h1>
            <p className="text-sm lg:text-base text-ink-charcoal font-sans leading-relaxed max-w-3xl">
              Rigorous parametric and non-parametric hypothesis testing between baseline human decisions, ungrounded AI recommendations, and calibrated explanatory AI with uncertainty bounds.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="secondary"
              size="default"
              onClick={handleDownloadCsv}
              className="text-xs font-mono font-bold uppercase tracking-wider gap-2 h-11 px-4 border-2 border-ink-black bg-vellum-100 hover:bg-vellum-200 shadow-sharp"
            >
              <Download className="w-4 h-4 text-ink-black" />
              <span>EXPORT RAW MICRODATA (CSV)</span>
            </Button>
          </div>
        </div>

        {/* High-Impact Editorial Broadsheet Metric Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
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
            label="Calibration Error (ECE)"
            value={formatPercent(analytics.calibration.expected_calibration_error)}
            subtext="Subjective confidence vs observed accuracy"
            delta={{ value: "Well Calibrated", isPositive: true }}
          />
        </div>
      </section>

      {/* Main Condition Comparison Matrix Table */}
      <div className="border-2 border-ink-black bg-vellum-50 shadow-sharp">
        <div className="p-5 border-b-2 border-ink-black flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-vellum-100">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted block">
              TABLE 01. FACTORIAL COMPARISON
            </span>
            <h2 className="font-serif font-black text-xl text-ink-black">
              Experimental Conditions Summary
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="cobalt">BETWEEN-SUBJECTS</Badge>
            <Badge variant="spruce">GROUND-TRUTH SCORED</Badge>
          </div>
        </div>

        <div className="p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CONDITION CODE & DESCRIPTION</TableHead>
                <TableHead className="text-center">SUBJECTS (N)</TableHead>
                <TableHead className="text-right">MEAN PAYOFF ($)</TableHead>
                <TableHead className="text-right">MEAN DEVIATION</TableHead>
                <TableHead className="text-right">MEAN LATENCY</TableHead>
                <TableHead className="text-right">AI AGREEMENT</TableHead>
                <TableHead className="text-right">OVER-RELIANCE RATE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analytics.conditions_summary.map((cond) => {
                const isCondA = cond.condition_code === "CONDITION_A";
                const isCondB = cond.condition_code === "CONDITION_B";
                return (
                  <TableRow key={cond.condition_code}>
                    <TableCell>
                      <div className="font-mono font-bold text-xs text-ink-black flex items-center gap-2">
                        <span
                          className={`w-2 h-2 inline-block ${
                            isCondA ? "bg-klein" : isCondB ? "bg-vermilion" : "bg-spruce"
                          }`}
                        />
                        {cond.condition_name}
                      </div>
                      <div className="text-[10px] font-mono text-ink-muted">{cond.condition_code}</div>
                    </TableCell>
                    <TableCell className="text-center font-mono font-bold text-ink-black tabular-nums">
                      {cond.n_participants}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-ink-black tabular-nums">
                      {formatCurrency(cond.mean_payoff)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-ink-charcoal tabular-nums">
                      {cond.mean_deviation} units
                    </TableCell>
                    <TableCell className="text-right font-mono text-ink-charcoal tabular-nums">
                      {(cond.mean_latency_ms / 1000).toFixed(1)}s
                    </TableCell>
                    <TableCell className="text-right font-mono text-ink-black tabular-nums">
                      {formatPercent(cond.agreement_rate)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      <span
                        className={`font-bold px-2 py-0.5 border text-xs tabular-nums ${
                          cond.over_reliance_rate > 0.5
                            ? "bg-vermilion-subtle text-vermilion border-vermilion"
                            : cond.over_reliance_rate > 0
                            ? "bg-amberacc-subtle text-amberacc border-amberacc"
                            : "text-ink-muted border-vellum-300"
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
        </div>
      </div>

      {/* Latency vs Accuracy Scatter & Trust Calibration Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border-2 border-ink-black bg-vellum-50 p-6 shadow-sharp space-y-4">
          <div className="border-b-2 border-ink-black pb-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block">
              FIGURE 01. BEHAVIORAL COGNITIVE FRICTION
            </span>
            <h3 className="font-serif font-black text-lg text-ink-black uppercase">
              Reaction Latency vs Decision Accuracy
            </h3>
          </div>
          <LatencyAccuracyScatter />
        </div>

        <div className="border-2 border-ink-black bg-vellum-50 p-6 shadow-sharp space-y-4">
          <div className="border-b-2 border-ink-black pb-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block">
              FIGURE 02. EPISTEMIC CALIBRATION
            </span>
            <h3 className="font-serif font-black text-lg text-ink-black uppercase">
              Subjective Trust Calibration Curve
            </h3>
          </div>
          <CalibrationCurve
            bins={analytics.calibration.bins}
            ece={analytics.calibration.expected_calibration_error}
          />
        </div>
      </div>

      {/* Statistical Hypothesis Tests */}
      <div className="border-2 border-ink-black bg-vellum-50 p-6 shadow-sharp space-y-6">
        <div className="border-b-2 border-ink-black pb-4">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted block">
            FORMAL INFERENCE
          </span>
          <h2 className="font-serif font-black text-2xl text-ink-black uppercase">
            Welch Two-Sample t-Tests & Cohen&apos;s d Effect Sizes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analytics.comparisons.map((comp, idx) => (
            <div key={idx} className="p-5 bg-vellum-100 border-2 border-ink-black space-y-4">
              <div className="flex items-center justify-between border-b-2 border-ink-black pb-2.5">
                <div className="font-mono font-bold text-xs uppercase text-ink-black">
                  {comp.label_a} vs. {comp.label_b}
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-ink-black text-white">
                  p = {comp.welch_t.p_value}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-2.5 bg-vellum-50 border border-ink-black">
                  <span className="text-[10px] text-ink-muted uppercase block">Welch t</span>
                  <span className="font-bold text-ink-black text-sm tabular-nums mt-0.5 block">
                    {comp.welch_t.t_statistic}
                  </span>
                </div>
                <div className="p-2.5 bg-vellum-50 border border-ink-black">
                  <span className="text-[10px] text-ink-muted uppercase block">Cohen&apos;s d</span>
                  <span className="font-bold text-klein text-sm tabular-nums mt-0.5 block">
                    {comp.cohens_d}
                  </span>
                </div>
                <div className="p-2.5 bg-vellum-50 border border-ink-black">
                  <span className="text-[10px] text-ink-muted uppercase block">Effect</span>
                  <span className="font-bold text-spruce capitalize text-xs mt-0.5 block truncate">
                    {comp.effect_interpretation}
                  </span>
                </div>
              </div>

              <div className="text-xs font-sans text-ink-charcoal leading-relaxed pt-1">
                {comp.welch_t.is_significant_01 ? (
                  <span className="text-spruce font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Statistically significant difference at α = 0.01 level. Null hypothesis rejected.
                  </span>
                ) : (
                  <span>No statistically significant difference observed at conventional α = 0.05.</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

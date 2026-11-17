"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, FlaskConical, Plus, FileText, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function ExperimentsDashboardPage() {
  const experiments = [
    {
      id: "exp-inv-001",
      title: "Human–AI Collaboration & Over-Reliance in Inventory Purchasing",
      hypothesis: "Detailed explanations increase accuracy in steady state but exacerbate over-reliance when recommendations deviate from ground truth.",
      protocol: "Between-subjects",
      conditionsCount: 3,
      scenariosCount: 5,
      participantsEnrolled: 45,
      completedTrials: 225,
      status: "Active",
    },
    {
      id: "exp-cap-002",
      title: "Confidence Calibration Under Market Regime Shifts",
      hypothesis: "Visual uncertainty intervals reduce uncalibrated capital bets during volatility spikes.",
      protocol: "Within-subjects",
      conditionsCount: 2,
      scenariosCount: 4,
      participantsEnrolled: 30,
      completedTrials: 120,
      status: "Active",
    },
    {
      id: "exp-rec-003",
      title: "Algorithmic Fairness & Human Re-weighting in Recruitment",
      hypothesis: "Counterfactual explanations decrease demographic selection bias in hiring panels.",
      protocol: "Between-subjects",
      conditionsCount: 3,
      scenariosCount: 6,
      participantsEnrolled: 18,
      completedTrials: 54,
      status: "Draft",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink-tertiary">Research Lab</span>
            <span className="text-hairline">|</span>
            <Badge variant="spruce">IRB & Research Protocol Audited</Badge>
          </div>
          <h1 className="text-xl font-semibold text-ink-primary tracking-tight mt-1">
            Research Protocols & Experiment Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/experiments/run/exp-inv-001">
            <Button variant="primary" size="sm" className="gap-1.5 text-xs">
              <Play className="w-3 h-3 fill-current" />
              <span>Launch Participant Runner</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Protocols List */}
      <div className="grid grid-cols-1 gap-6">
        {experiments.map((exp) => (
          <Card key={exp.id} className="hover:border-border-medium transition-colors">
            <CardHeader className="flex flex-row items-start justify-between pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-ink-tertiary">{exp.id}</span>
                  <Badge variant={exp.status === "Active" ? "spruce" : "neutral"}>
                    {exp.status}
                  </Badge>
                  <span className="text-xs text-ink-secondary">• {exp.protocol}</span>
                </div>
                <CardTitle className="text-base font-semibold">{exp.title}</CardTitle>
                <CardDescription className="max-w-3xl pt-1">
                  <span className="font-medium text-ink-primary">Hypothesis:</span> {exp.hypothesis}
                </CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/analytics`}>
                  <Button variant="secondary" size="sm" className="gap-1 text-xs">
                    <span>Evidence</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
                <Link href={`/experiments/run/${exp.id}`}>
                  <Button variant="primary" size="sm" className="gap-1 text-xs">
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run Protocol</span>
                  </Button>
                </Link>
              </div>
            </CardHeader>

            <CardContent className="pt-2 border-t border-hairline grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-ink-secondary text-[11px]">Experimental Conditions</span>
                <div className="font-mono font-semibold text-sm text-ink-primary mt-0.5">
                  {exp.conditionsCount} Conditions (A / B / C)
                </div>
              </div>
              <div>
                <span className="text-ink-secondary text-[11px]">Benchmark Scenarios</span>
                <div className="font-mono font-semibold text-sm text-ink-primary mt-0.5">
                  {exp.scenariosCount} Scenarios
                </div>
              </div>
              <div>
                <span className="text-ink-secondary text-[11px]">Participants Enrolled</span>
                <div className="font-mono font-semibold text-sm text-ink-primary mt-0.5">
                  {exp.participantsEnrolled} Subjects
                </div>
              </div>
              <div>
                <span className="text-ink-secondary text-[11px]">Completed Decision Events</span>
                <div className="font-mono font-semibold text-sm text-spruce mt-0.5">
                  {exp.completedTrials} Trials Logged
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

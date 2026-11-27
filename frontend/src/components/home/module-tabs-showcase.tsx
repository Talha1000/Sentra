"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Cpu,
  FlaskConical,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface ModuleInfo {
  id: string;
  name: string;
  badge: string;
  badgeVariant: "terracotta" | "spruce" | "amber" | "neutral" | "indigo" | "cyan";
  route: string;
  tagline: string;
  overview: string;
  humanValue: string;
  features: string[];
  metrics: { label: string; value: string }[];
}

const MODULES: ModuleInfo[] = [
  {
    id: "workspace",
    name: "Executive Workspace",
    badge: "Portfolio Command",
    badgeVariant: "indigo",
    route: "/workspace",
    tagline: "Live telemetry across every human–AI decision stream",
    overview:
      "A calm, consolidated operational view tracking organizational AI agreement rates, operational latency, audit compliance, and recent decision ledgers across enterprise divisions.",
    humanValue: "Know at a glance whether your teams are exercising healthy skepticism or blindly following algorithms.",
    features: [
      "Real-time agreement and over-reliance rates",
      "Domain-filtered decision ledgers (Inventory, Operations, Capital)",
      "Continuous activity stream with anomaly flags",
      "One-click zero-friction demo data seeding",
    ],
    metrics: [
      { label: "AI Agreement Rate", value: "76.4%" },
      { label: "Active Cohort", value: "N = 45 Subjects" },
      { label: "Audit Health", value: "100% Sealed" },
    ],
  },
  {
    id: "decisions",
    name: "Decision Planning",
    badge: "Stochastic Engine",
    badgeVariant: "spruce",
    route: "/decisions",
    tagline: "Stochastic optimization and Monte Carlo simulation",
    overview:
      "Formulate purchasing, capacity, and resource allocation problems with interactive constraint sliders, simulate 1,000 future demand draws, and receive structured AI advice with explicit confidence intervals.",
    humanValue: "Never make a multi-million dollar commitment without testing how it performs in worst-case scenarios.",
    features: [
      "Exact critical fractile newsvendor mathematics",
      "Interactive Monte Carlo what-if parameter sliders",
      "Structured AI advice with explicit uncertainty decomposition",
      "Human rationale documentation and irreversible commitment",
    ],
    metrics: [
      { label: "Simulation Speed", value: "< 25ms" },
      { label: "Optimal Fractile", value: "F⁻¹(0.667)" },
      { label: "Target Q*", value: "1,420 units" },
    ],
  },
  {
    id: "experiments",
    name: "Research Lab",
    badge: "Empirical Trials",
    badgeVariant: "amber",
    route: "/experiments",
    tagline: "Controlled double-blind behavioral trials",
    overview:
      "Run rigorous behavioral research protocols with server-side block randomization across Condition A (Human only), Condition B (AI advice), and Condition C (AI advice + explanations).",
    humanValue: "Prove whether AI assistance actually helps your human workforce or just creates false confidence.",
    features: [
      "Server-side block randomization across 3 conditions",
      "Microsecond reaction timing via performance.now()",
      "Controlled injected bias stressors (+35% and -30%)",
      "IRB-compliant participant consent & tokenization",
    ],
    metrics: [
      { label: "Protocol", value: "Double-Blind" },
      { label: "Timing Precision", value: "± 0.1ms" },
      { label: "Bias Tests", value: "2 of 5 Scenarios" },
    ],
  },
  {
    id: "analytics",
    name: "Evidence & Analytics",
    badge: "Scientific Inference",
    badgeVariant: "cyan",
    route: "/analytics",
    tagline: "Hypothesis testing and trust calibration curves",
    overview:
      "Empirically prove the efficacy of AI collaboration using Welch's t-tests, Mann-Whitney U, Cohen's d effect sizes, and Expected Calibration Error curves.",
    humanValue: "Get hard, board-ready evidence on the exact financial and cognitive return of AI tools.",
    features: [
      "Welch's t-test and p-value statistical significance",
      "Cohen's d standardized real-world effect sizing",
      "Expected Calibration Error (ECE) reliability curve",
      "Instant CSV and JSON microdata research export",
    ],
    metrics: [
      { label: "Welch's t-test", value: "p < 0.001" },
      { label: "Cohen's d", value: "d = -1.22 (Large)" },
      { label: "ECE Score", value: "0.034 (Calibrated)" },
    ],
  },
  {
    id: "governance",
    name: "Governance & Audit",
    badge: "Defensible Record",
    badgeVariant: "spruce",
    route: "/governance",
    tagline: "Cryptographic HMAC SHA-256 sealed ledger",
    overview:
      "Every human rationale, AI prompt version, and simulated distribution is chained into an immutable SHA-256 cryptographic audit trail for regulatory and compliance review.",
    humanValue: "Total immunity from retrospective scrutiny: an unalterable certificate proving diligent oversight.",
    features: [
      "HMAC SHA-256 chained chronological event ledger",
      "Model cards, prompt versioning, and provenance tracking",
      "Strict row-level organization tenant isolation",
      "SOC-2 Type II and ISO 42001 exportable compliance packs",
    ],
    metrics: [
      { label: "Ledger State", value: "Immutable" },
      { label: "Hash Type", value: "HMAC SHA-256" },
      { label: "Compliance", value: "SOC-2 / ISO 42001" },
    ],
  },
];

export function ModuleTabsShowcase() {
  const [activeTab, setActiveTab] = useState<string>("workspace");
  const mod = MODULES.find((m) => m.id === activeTab) || MODULES[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block">
          Platform Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Five Integrated Systems, One Unified Platform
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          From live executive oversight to behavioral experiments and cryptographic sealing.
        </p>
      </div>

      {/* Modern Segmented Tab Selector */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 gap-2">
        <div className="p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md flex items-center gap-1.5">
          {MODULES.map((m) => {
            const isActive = activeTab === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-[0_2px_12px_rgba(99,102,241,0.4)] font-semibold border border-indigo-400/30"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Module Card */}
      <div className="relative rounded-3xl border border-white/[0.12] bg-[#0D111A]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-6 sm:p-10 overflow-hidden">
        {/* Top Rim Light */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={mod.badgeVariant} dot>{mod.badge}</Badge>
                <span className="text-xs text-white/20">·</span>
                <span className="text-xs text-slate-400">{mod.tagline}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {mod.name}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {mod.overview}
            </p>

            {/* Human Benefit Quote */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs space-y-1">
              <span className="font-semibold text-white block">
                The Executive Benefit:
              </span>
              <p className="text-slate-300 italic leading-relaxed">
                “{mod.humanValue}”
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-2.5 pt-1">
              <span className="text-xs font-semibold text-white block">
                Key Capabilities:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {mod.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Link href={mod.route}>
                <Button variant="primary" size="sm" className="gap-2 shadow-glow font-semibold">
                  <span>Enter {mod.name.split(" ")[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Metrics Folio */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0F1524]/80 border border-white/[0.08] shadow-xl space-y-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              System Telemetry & Benchmarks
            </span>

            <div className="space-y-2.5">
              {mod.metrics.map((m, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between"
                >
                  <span className="text-xs text-slate-400">{m.label}</span>
                  <span className="text-sm font-bold text-white tabular-nums">{m.value}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] text-slate-400 space-y-1">
              <div className="text-emerald-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Deterministic engine verified: Sub-second runtime</span>
              </div>
              <div className="text-slate-500 font-mono">Provenance hash sealed on local SQLite database</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

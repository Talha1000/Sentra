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
  ExternalLink,
} from "lucide-react";

interface ModuleInfo {
  id: string;
  name: string;
  badge: string;
  badgeVariant: "terracotta" | "spruce" | "amber" | "neutral";
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
    badgeVariant: "terracotta",
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
    name: "Decision Studio",
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
    badgeVariant: "terracotta",
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
        <span className="text-xs font-sans font-medium text-terracotta uppercase tracking-wide block">
          Platform Architecture
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight">
          Five Thoughtful Systems, One Workstation
        </h2>
        <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
          From live executive oversight to behavioral experiments and cryptographic sealing.
        </p>
      </div>

      {/* Tactile Tab Selector */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 gap-2">
        {MODULES.map((m) => {
          const isActive = activeTab === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveTab(m.id)}
              className={`px-4 py-2 rounded-xl text-xs transition-all duration-150 whitespace-nowrap ${
                isActive
                  ? "bg-ink-primary text-white shadow-xs font-medium"
                  : "bg-white text-ink-secondary border border-warm-border hover:bg-canvas-subtle"
              }`}
            >
              {m.name}
            </button>
          );
        })}
      </div>

      {/* Module Card */}
      <div className="rounded-2xl border border-warm-border bg-white shadow-paper p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant={mod.badgeVariant}>{mod.badge}</Badge>
                <span className="text-xs text-ink-muted">·</span>
                <span className="text-xs text-ink-muted">{mod.tagline}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-primary tracking-tight">
                {mod.name}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {mod.overview}
            </p>

            {/* Human Benefit Quote */}
            <div className="p-4 rounded-xl bg-canvas-subtle/80 border border-warm-hairline text-xs space-y-1">
              <span className="font-semibold text-ink-primary block">
                The Human Benefit:
              </span>
              <p className="text-ink-secondary italic leading-relaxed">
                “{mod.humanValue}”
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-semibold text-ink-primary block">
                Key Capabilities:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {mod.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-ink-secondary">
                    <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Link href={mod.route}>
                <Button variant="terracotta" size="sm" className="gap-2 shadow-xs">
                  <span>Enter {mod.name.split(" ")[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Metrics Folio */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-canvas-subtle/70 border border-warm-hairline space-y-4">
            <span className="text-[11px] font-sans text-ink-muted uppercase tracking-wider block">
              System Benchmarks
            </span>

            <div className="space-y-2.5">
              {mod.metrics.map((m, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-white border border-warm-hairline shadow-paper flex items-center justify-between"
                >
                  <span className="text-xs text-ink-secondary">{m.label}</span>
                  <span className="font-serif text-sm font-bold text-ink-primary">{m.value}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-white border border-warm-hairline text-[11px] text-ink-muted space-y-1">
              <div className="text-sage font-medium">✓ Engine verified: Deterministic execution</div>
              <div>Provenance hash sealed on local SQLite database</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

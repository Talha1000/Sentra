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
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface PlatformModule {
  id: string;
  tabLabel: string;
  title: string;
  badge: string;
  badgeVariant: "amber" | "cobalt" | "crimson" | "spruce";
  icon: any;
  route: string;
  tagline: string;
  description: string;
  plainEnglishBenefit: string;
  keyFeatures: string[];
  metrics: { label: string; value: string }[];
  previewGraphic: "workspace" | "decision" | "experiment" | "analytics" | "governance";
}

const MODULES: PlatformModule[] = [
  {
    id: "workspace",
    tabLabel: "1. Workspace",
    title: "Executive Intelligence Workspace",
    badge: "Portfolio Command",
    badgeVariant: "cobalt",
    icon: LayoutDashboard,
    route: "/workspace",
    tagline: "Live telemetry across all human-AI decision streams",
    description:
      "A consolidated operational flight deck tracking real-time AI agreement rates, operational latency, audit compliance, and recent decision ledgers across enterprise divisions.",
    plainEnglishBenefit:
      "See how much your organization trusts AI right now, where agreements are happening, and which teams need closer review.",
    keyFeatures: [
      "Real-time agreement and over-reliance telemetry",
      "Filterable decision ledger by business domain",
      "Live activity stream and anomaly alert feed",
      "One-click demo seed with 45 participants & 225 trials",
    ],
    metrics: [
      { label: "AI Agreement Rate", value: "76.4%" },
      { label: "Active Cohort", value: "N = 45" },
      { label: "Audit Health", value: "100% Sealed" },
    ],
    previewGraphic: "workspace",
  },
  {
    id: "decisions",
    tabLabel: "2. Decision Studio",
    title: "Decision Intelligence Studio",
    badge: "Stochastic Engine",
    badgeVariant: "spruce",
    icon: Cpu,
    route: "/decisions",
    tagline: "Stochastic optimization and Monte Carlo simulation",
    description:
      "Formulate complex purchasing, capital, and operations problems with interactive constraint sliders, simulate 1,000 future demand draws, and receive structured AI advice.",
    plainEnglishBenefit:
      "Test your decision against 1,000 market storms before spending a single dollar, so you never get caught off-guard.",
    keyFeatures: [
      "Deterministic Newsvendor critical fractile math",
      "Interactive Monte Carlo what-if parameter sliders",
      "Structured AI output with explicit uncertainty bounds",
      "Immutable human rationale authorization and commit",
    ],
    metrics: [
      { label: "Simulation Speed", value: "< 25ms" },
      { label: "Critical Fractile", value: "F⁻¹(0.667)" },
      { label: "Optimal Quantity", value: "1,420 units" },
    ],
    previewGraphic: "decision",
  },
  {
    id: "experiments",
    tabLabel: "3. Research Lab",
    title: "Human–AI Cognitive Laboratory",
    badge: "Empirical Protocol",
    badgeVariant: "amber",
    icon: FlaskConical,
    route: "/experiments",
    tagline: "Controlled double-blind behavioral trials",
    description:
      "Run scientific research protocols with server-side block randomization across Condition A (Human-only), Condition B (AI recommendation), and Condition C (AI + Explanation).",
    plainEnglishBenefit:
      "Run unannounced fire drills with deliberate AI errors to see if your managers catch mistakes or blindly rubber-stamp them.",
    keyFeatures: [
      "Server-side block randomization across 3 conditions",
      "Microsecond reaction timing via performance.now()",
      "Injected deliberate bias stressors (+35% and -30%)",
      "IRB-compliant participant consent & tokenization",
    ],
    metrics: [
      { label: "Randomization", value: "Double-Blind" },
      { label: "Timing Precision", value: "± 0.1ms" },
      { label: "Bias Scenarios", value: "2 of 5 Injected" },
    ],
    previewGraphic: "experiment",
  },
  {
    id: "analytics",
    tabLabel: "4. Evidence & Analytics",
    title: "Evidence & Statistical Analytics",
    badge: "Scientific Inference",
    badgeVariant: "cobalt",
    icon: BarChart3,
    route: "/analytics",
    tagline: "Hypothesis testing and trust calibration curves",
    description:
      "Empirically prove whether AI assistance actually helps your human workforce using Welch's t-test, Cohen's d effect sizes, and Expected Calibration Error curves.",
    plainEnglishBenefit:
      "Get hard mathematical proof of whether the AI is actually saving your company money or just making employees overconfident.",
    keyFeatures: [
      "Welch's t-test and p-value hypothesis validation",
      "Cohen's d standardized real-world effect sizing",
      "Expected Calibration Error (ECE) reliability curve",
      "One-click CSV / JSON microdata research export",
    ],
    metrics: [
      { label: "Welch's t-test", value: "p < 0.001" },
      { label: "Cohen's d", value: "d = -1.22 (Large)" },
      { label: "ECE Score", value: "0.034 (Calibrated)" },
    ],
    previewGraphic: "analytics",
  },
  {
    id: "governance",
    tabLabel: "5. Governance & Audit",
    title: "Cryptographic Governance & Audit",
    badge: "Zero Liability",
    badgeVariant: "spruce",
    icon: ShieldCheck,
    route: "/governance",
    tagline: "Immutable HMAC SHA-256 sealed ledger",
    description:
      "Every human rationale, AI prompt version, and simulated distribution is chained into an immutable SHA-256 cryptographic audit trail for regulatory and compliance review.",
    plainEnglishBenefit:
      "Have ironclad, tamper-evident proof for auditors and regulators that every AI-assisted decision followed strict human-oversight protocols.",
    keyFeatures: [
      "HMAC SHA-256 chained chronological event ledger",
      "AI model provenance cards and prompt version control",
      "Strict row-level organization tenant isolation",
      "SOC-2 Type II and ISO 42001 exportable compliance packs",
    ],
    metrics: [
      { label: "Ledger State", value: "Immutable" },
      { label: "Hash Type", value: "HMAC SHA-256" },
      { label: "Compliance", value: "SOC-2 / ISO 42001" },
    ],
    previewGraphic: "governance",
  },
];

export function ModuleTabsShowcase() {
  const [activeTab, setActiveTab] = useState<string>("workspace");

  const currentModule = MODULES.find((m) => m.id === activeTab) || MODULES[0];
  const Icon = currentModule.icon;

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white shadow-xs text-xs font-semibold text-slate-700">
          <Layers className="w-3.5 h-3.5 text-brand-600" />
          <span>Complete Platform Architecture</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">
          Five Integrated Systems for Total Decision Control
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          From executive KPI monitoring to controlled behavioral research and cryptographic audit sealing—Sentra covers every stage of human-AI collaboration.
        </p>
      </div>

      {/* Tab Selector Bar */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 gap-2">
        {MODULES.map((m) => {
          const isActive = activeTab === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveTab(m.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-2 ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{m.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Content Details (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                <Icon className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {currentModule.title}
                  </h3>
                  <Badge variant={currentModule.badgeVariant}>{currentModule.badge}</Badge>
                </div>
                <span className="text-xs text-slate-500 font-medium">{currentModule.tagline}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {currentModule.description}
            </p>

            {/* Plain English Highlight */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-950 text-xs space-y-1">
              <span className="font-bold text-[11px] uppercase tracking-wider text-amber-800 block">
                Plain-English Business Value:
              </span>
              <p className="text-amber-900 font-medium leading-relaxed">
                "{currentModule.plainEnglishBenefit}"
              </p>
            </div>

            {/* Key Features Bullet List */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Enterprise Capabilities:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentModule.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-3 flex items-center gap-3">
              <Link href={currentModule.route}>
                <Button variant="brand" size="sm" className="gap-2 shadow-xs">
                  <span>Open {currentModule.title.split(" ")[0]} Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
              <Link href={currentModule.route}>
                <Button variant="secondary" size="sm" className="gap-1.5 border-slate-300">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>Interactive Preview</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Interactive Telemetry Preview Box (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between text-xs border-b border-slate-200 pb-3">
              <span className="font-mono font-semibold text-slate-700">LIVE SYSTEM TELEMETRY</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Three Big Metric Cards */}
            <div className="grid grid-cols-1 gap-2.5">
              {currentModule.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between"
                >
                  <span className="text-xs font-medium text-slate-500">{m.label}</span>
                  <span className="font-mono text-sm font-bold text-slate-900">{m.value}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-[11px] space-y-1">
              <div className="text-slate-400">&gt; MODULE_ACTIVE: {currentModule.id.toUpperCase()}</div>
              <div className="text-emerald-400">&gt; ENGINE_READY: LATENCY &lt; 15MS</div>
              <div className="text-slate-300">&gt; AUDIT_SEAL: OK</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

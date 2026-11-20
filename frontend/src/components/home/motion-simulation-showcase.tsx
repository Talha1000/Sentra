"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Cpu,
  Layers,
  Brain,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Activity,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface SimulationChapter {
  id: number;
  title: string;
  subtitle: string;
  durationSec: number;
  badge: string;
  badgeVariant: "amber" | "cobalt" | "crimson" | "spruce";
  headline: string;
  description: string;
  technicalMetrics: { label: string; value: string; color: string }[];
  visualType: "ai-prompt" | "monte-carlo" | "cognitive-flag" | "audit-seal";
}

const CHAPTERS: SimulationChapter[] = [
  {
    id: 1,
    title: "The Silent AI Trap",
    subtitle: "Flawed AI Recommendation",
    durationSec: 6,
    badge: "Stage 01",
    badgeVariant: "amber",
    headline: "AI model proposes +23% inventory order with high confidence",
    description:
      "A leading LLM receives the Q4 semiconductor parameters. It generates a fluent, highly articulate justification recommending 1,750 units with 94.2% subjective confidence. But the model failed to account for asymmetric holding penalties.",
    technicalMetrics: [
      { label: "AI Recommendation", value: "1,750 units", color: "text-amber-600" },
      { label: "Reported Confidence", value: "94.2%", color: "text-amber-600" },
      { label: "Injected Bias Skew", value: "+23.2%", color: "text-rose-600" },
    ],
    visualType: "ai-prompt",
  },
  {
    id: 2,
    title: "Stochastic Stress Test",
    subtitle: "Monte Carlo Engine",
    durationSec: 6,
    badge: "Stage 02",
    badgeVariant: "cobalt",
    headline: "Sentra runs 1,000 demand draws across non-linear cost curves",
    description:
      "Before the human executive commits, Sentra's deterministic engine simulates 1,000 stochastic demand draws from N(1400, 220). The analytical critical fractile calculates the true profit-maximizing order: exactly 1,420 units.",
    technicalMetrics: [
      { label: "True Analytical Optimum", value: "1,420 units", color: "text-emerald-600" },
      { label: "Expected Max Profit", value: "$56,800", color: "text-emerald-600" },
      { label: "AI Profit Penalty", value: "-$6,105", color: "text-rose-600" },
    ],
    visualType: "monte-carlo",
  },
  {
    id: 3,
    title: "Cognitive Disagreement",
    subtitle: "Over-reliance Guardrail",
    durationSec: 6,
    badge: "Stage 03",
    badgeVariant: "crimson",
    headline: "Sentra detects human cognitive anchoring in real-time",
    description:
      "If the human manager attempts to rubber-stamp the AI's 1,750 units without reviewing the downside risk, Sentra triggers a cognitive alert: 'Warning: Uncritical AI Over-reliance Detected'. The user calibrates their choice back to 1,420.",
    technicalMetrics: [
      { label: "Human Calibrated Action", value: "1,420 units", color: "text-slate-900" },
      { label: "Cognitive Status", value: "Calibrated Oversight", color: "text-emerald-600" },
      { label: "Capital Protected", value: "$6,105", color: "text-blue-600" },
    ],
    visualType: "cognitive-flag",
  },
  {
    id: 4,
    title: "Cryptographic Seal",
    subtitle: "Immutable Compliance",
    durationSec: 6,
    badge: "Stage 04",
    badgeVariant: "spruce",
    headline: "HMAC SHA-256 seal guarantees zero revisionist history",
    description:
      "The final human rationale, the mathematical proof, the AI prompt version, and the simulated payoff are chained into an immutable SHA-256 cryptographic seal. Ready for SOC-2, ISO 42001, and regulatory audits.",
    technicalMetrics: [
      { label: "Audit Hash", value: "0x9e4b...331b", color: "text-purple-600 font-mono" },
      { label: "Timestamp", value: "2026-11-20T17:00Z", color: "text-slate-600" },
      { label: "Compliance State", value: "SEALED_VERIFIED", color: "text-emerald-600" },
    ],
    visualType: "audit-seal",
  },
];

export function MotionSimulationShowcase() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const currentChapter = CHAPTERS[currentChapterIndex];

  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = 50;
    const totalMs = currentChapter.durationSec * 1000;
    const step = (intervalMs / totalMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next chapter
          setCurrentChapterIndex((prevIdx) => (prevIdx + 1) % CHAPTERS.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, currentChapterIndex, currentChapter.durationSec]);

  const selectChapter = (index: number) => {
    setCurrentChapterIndex(index);
    setProgress(0);
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-slate-900 text-white shadow-xl overflow-hidden">
      {/* Video Player Header Bar */}
      <div className="px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs font-mono tracking-widest uppercase text-slate-400">
            SENTRA INTERACTIVE MOTION TOUR • SIMULATED WORKFLOW
          </span>
          <Badge variant="cobalt">Interactive Video Experience</Badge>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            title={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
          <button
            onClick={() => {
              setProgress(0);
              setCurrentChapterIndex(0);
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Restart Tour"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setCurrentChapterIndex((prev) => (prev + 1) % CHAPTERS.length);
              setProgress(0);
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Next Chapter"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Screen Layout (2 Columns: Screen Display & Storyboard Info) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
        {/* Left Column: Visual Screen Display (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950/40 relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

          {/* Chapter Top Tag */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              CHAPTER {currentChapter.id} OF {CHAPTERS.length}
            </span>
            <span className="text-slate-500">
              FRAME {(Math.floor(progress * 12)).toString().padStart(4, "0")} / 1200
            </span>
          </div>

          {/* Chapter Specific Dynamic Graphic Display */}
          <div className="my-auto py-4">
            {currentChapter.visualType === "ai-prompt" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-amber-300 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-amber-400 animate-spin" />
                      LLM Recommendation Generation
                    </span>
                    <Badge variant="amber">94.2% Confident</Badge>
                  </div>
                  <p className="text-xs text-amber-100 font-mono bg-slate-900/80 p-3 rounded-lg border border-amber-500/20 leading-relaxed">
                    &gt; AI PROPOSAL: Based on Q3 momentum, allocate <span className="text-amber-400 font-bold">1,750 units</span>.
                    <br />
                    &gt; RISK SKEW: +23.2% above true optimal demand fractile.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Hazard: Confidently wrong advice without stochastic bounds.</span>
                </div>
              </div>
            )}

            {currentChapter.visualType === "monte-carlo" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-950/20 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-blue-300 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
                      Monte Carlo Stress Simulation (N = 1,000)
                    </span>
                    <Badge variant="cobalt">Deterministic Ground Truth</Badge>
                  </div>
                  {/* Visual Bar graph simulation */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">AI Order (1,750):</span>
                      <span className="text-rose-400">$50,695 Expected Profit</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full w-[78%] transition-all duration-500" />
                    </div>

                    <div className="flex justify-between text-xs font-mono pt-2">
                      <span className="text-slate-400">Ground Truth Optimum (1,420):</span>
                      <span className="text-emerald-400 font-bold">$56,800 Expected Max Profit</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[96%] transition-all duration-500" />
                    </div>
                  </div>
                </div>
                <div className="text-xs text-emerald-400 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Mathematical Proof: +$6,105 saved by adhering to critical fractile.</span>
                </div>
              </div>
            )}

            {currentChapter.visualType === "cognitive-flag" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/20 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-rose-300 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-rose-400" />
                      Cognitive Guardrail Active
                    </span>
                    <Badge variant="crimson">Over-Reliance Intercepted</Badge>
                  </div>
                  <p className="text-xs text-rose-100 font-mono bg-slate-900/80 p-3 rounded-lg border border-rose-500/20 leading-relaxed">
                    &gt; INTERCEPT: User attempted to blindly commit AI proposal (1,750 units).
                    <br />
                    &gt; INTERVENTION: Real-time sensitivity curve presented.
                    <br />
                    &gt; RESULT: Executive calibrated order to 1,420 units.
                  </p>
                </div>
                <div className="text-xs text-blue-400 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Human-in-the-Loop validated with zero friction.</span>
                </div>
              </div>
            )}

            {currentChapter.visualType === "audit-seal" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Cryptographic HMAC SHA-256 Ledger
                    </span>
                    <Badge variant="spruce">Immutably Sealed</Badge>
                  </div>
                  <div className="bg-slate-900/90 p-3 rounded-lg border border-emerald-500/20 font-mono text-[11px] text-slate-300 space-y-1">
                    <div>HASH: 0x9e4b7c10d3f82a45e9981240cdae331b</div>
                    <div>PAYLOAD: &#123; humanAction: 1420, aiSuggested: 1750, profit: 56800 &#125;</div>
                    <div className="text-emerald-400">STATUS: PROVENANCE VERIFIED BY SOC-2 VAULT</div>
                  </div>
                </div>
                <div className="text-xs text-purple-400 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Irrefutable regulatory protection against liability.</span>
                </div>
              </div>
            )}
          </div>

          {/* Scrubber Progress Bar */}
          <div className="mt-6 space-y-2">
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-brand-500 h-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>{Math.round((progress / 100) * currentChapter.durationSec)}s</span>
              <span>{currentChapter.durationSec}s</span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Storyboard (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-slate-900/80">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={currentChapter.badgeVariant}>{currentChapter.badge}</Badge>
              <span className="text-xs font-mono text-slate-400 uppercase">
                {currentChapter.subtitle}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
              {currentChapter.headline}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentChapter.description}
            </p>

            {/* Technical Metric Pills */}
            <div className="grid grid-cols-1 gap-2 pt-2">
              {currentChapter.technicalMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <span className="text-slate-400">{m.label}</span>
                  <span className={`font-semibold ${m.color}`}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chapter Selector Tabs */}
          <div className="pt-6 border-t border-slate-800 mt-6 grid grid-cols-4 gap-2">
            {CHAPTERS.map((chap, idx) => (
              <button
                key={chap.id}
                onClick={() => selectChapter(idx)}
                className={`p-2 rounded-lg text-left transition-all ${
                  currentChapterIndex === idx
                    ? "bg-slate-800 border border-slate-700 text-white shadow-xs"
                    : "hover:bg-slate-800/40 text-slate-500 hover:text-slate-300"
                }`}
              >
                <div className="text-[10px] font-mono font-semibold">0{chap.id}</div>
                <div className="text-[11px] font-medium truncate mt-0.5">{chap.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

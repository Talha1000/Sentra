"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Cpu,
  Sparkles,
} from "lucide-react";

interface StoryChapter {
  id: number;
  stage: string;
  title: string;
  subtitle: string;
  durationSec: number;
  narrative: string;
  humanTakeaway: string;
  illustrationType: "recommendation" | "simulation" | "override" | "certificate";
  dataPoints: { label: string; value: string; note: string }[];
}

const CHAPTERS: StoryChapter[] = [
  {
    id: 1,
    stage: "01 / The Prompt",
    title: "The Fluent AI Recommendation",
    subtitle: "Articulate, confident, and quietly skewed",
    durationSec: 6,
    narrative:
      "A leading language model is presented with the fourth-quarter semiconductor allocation problem. Within two seconds, it returns a beautifully articulated justification recommending 1,750 units with 94% subjective confidence. But the model overlooked the severe financial penalties of surplus inventory.",
    humanTakeaway: "Language models sound equally convincing when they are right and when they are dangerously wrong.",
    illustrationType: "recommendation",
    dataPoints: [
      { label: "AI Suggestion", value: "1,750 units", note: "Optimistic skew" },
      { label: "Self-Reported Confidence", value: "94.2%", note: "Uncalibrated" },
      { label: "Injected Bias", value: "+23.2%", note: "Above true sweet spot" },
    ],
  },
  {
    id: 2,
    stage: "02 / The Stress Test",
    title: "The Stochastic Simulation",
    subtitle: "Testing 1,000 randomized market futures",
    durationSec: 6,
    narrative:
      "Before any capital is authorized, Sentra's mathematical engine evaluates the decision across 1,000 randomized demand draws. By evaluating holding depreciation against stockout penalties, Sentra proves the profit-maximizing order is exactly 1,420 units.",
    humanTakeaway: "True risk management doesn't guess the future—it simulates 1,000 possible futures.",
    illustrationType: "simulation",
    dataPoints: [
      { label: "True Optimum (Q*)", value: "1,420 units", note: "Critical fractile" },
      { label: "Expected Maximum Profit", value: "$56,800", note: "Calculated peak" },
      { label: "Downside Regret of AI Advice", value: "-$6,105", note: "Avoided loss" },
    ],
  },
  {
    id: 3,
    stage: "03 / The Human Oversight",
    title: "The Guardrail Intercept",
    subtitle: "Detecting blind agreement before it's too late",
    durationSec: 6,
    narrative:
      "If an executive attempts to rubber-stamp the AI's 1,750-unit number without reviewing the downside risks, Sentra gently alerts the operator: 'Cognitive Over-reliance Detected'. The executive inspects the sensitivity curve and calibrates the order back to 1,420.",
    humanTakeaway: "Human-in-the-loop only works if the human is actually empowered to catch mistakes.",
    illustrationType: "override",
    dataPoints: [
      { label: "Human Calibrated Action", value: "1,420 units", note: "Adjusted to optimal" },
      { label: "Cognitive Alignment", value: "Calibrated Oversight", note: "Zero blind reliance" },
      { label: "Working Capital Protected", value: "$6,105", note: "Realized benefit" },
    ],
  },
  {
    id: 4,
    stage: "04 / The Record",
    title: "The Immutable Audit Certificate",
    subtitle: "Cryptographic proof that shields your team",
    durationSec: 6,
    narrative:
      "The final human rationale, the underlying mathematical proof, the AI prompt version, and the simulated payoff are chained into an immutable SHA-256 digital certificate. If a regulator or board asks questions later, you have undeniable proof of sound judgment.",
    humanTakeaway: "Zero blame games. Complete transparency for compliance, regulators, and boards.",
    illustrationType: "certificate",
    dataPoints: [
      { label: "Audit Hash", value: "0x9e4b...331b", note: "Cryptographically sealed" },
      { label: "Recorded Rationale", value: "Human Verified", note: "Signed by executive" },
      { label: "Compliance Posture", value: "SOC-2 / ISO 42001", note: "Audit-ready" },
    ],
  },
];

export function MotionSimulationShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const currentChapter = CHAPTERS[activeIdx];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      const stepMs = 50;
      const totalSteps = (currentChapter.durationSec * 1000) / stepMs;
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setActiveIdx((cur) => (cur + 1) % CHAPTERS.length);
            return 0;
          }
          return prev + 100 / totalSteps;
        });
      }, stepMs);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeIdx, currentChapter.durationSec]);

  const handleSelectChapter = (idx: number) => {
    setActiveIdx(idx);
    setProgress(0);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setActiveIdx((cur) => (cur + 1) % CHAPTERS.length);
    setProgress(0);
  };

  const handleReset = () => {
    setActiveIdx(0);
    setProgress(0);
  };

  return (
    <div className="relative rounded-3xl border border-white/[0.12] bg-[#0D111A]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden transition-all">
      {/* Top Rim Light */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent pointer-events-none" />

      {/* Header Bar */}
      <div className="p-6 sm:p-8 border-b border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Visual Tour
            </span>
            <span className="text-xs text-white/20">·</span>
            <span className="text-xs text-slate-400">Chapter II</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            How Sentra Rescues Consequential Choices
          </h2>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleTogglePlay}
            className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] text-white transition-colors"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current text-indigo-400" />}
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] text-white transition-colors"
            title="Next Step"
          >
            <SkipForward className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] text-white transition-colors"
            title="Replay from Beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
        {/* Left Column: Stage Visual (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-black/20">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
              <span className="font-mono text-indigo-400 font-medium">{currentChapter.stage}</span>
              <Badge variant="indigo" dot>
                {currentChapter.subtitle}
              </Badge>
            </div>

            {/* Dynamic Interactive Stage Visual */}
            <div className="min-h-[260px] flex flex-col justify-center">
              {currentChapter.illustrationType === "recommendation" && (
                <div className="p-6 rounded-2xl border border-white/[0.1] bg-[#0F1524]/90 backdrop-blur-xl shadow-xl space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-orange-400" />
                      LLM Generation Output
                    </span>
                    <Badge variant="terracotta">Self-Reported 94.2% Confident</Badge>
                  </div>

                  <p className="text-xs text-slate-300 italic leading-relaxed bg-white/[0.03] p-4 rounded-xl border border-white/[0.06]">
                    “Based on the historical Q4 semiconductor growth trend, I strongly advise ordering 1,750 units. This maximizes availability for key tier-1 accounts with minimal risk of stockout.”
                  </p>

                  <div className="flex items-center gap-2 text-xs text-orange-400 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Silent Flaw: Ignores the $30/unit inventory depreciation holding penalty.</span>
                  </div>
                </div>
              )}

              {currentChapter.illustrationType === "simulation" && (
                <div className="p-6 rounded-2xl border border-white/[0.1] bg-[#0F1524]/90 backdrop-blur-xl shadow-xl space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Sentra Stochastic Simulation
                    </span>
                    <Badge variant="spruce">N = 1,000 Draws</Badge>
                  </div>

                  <div className="space-y-3.5 pt-1">
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">AI Recommendation (1,750 units)</span>
                        <span className="font-semibold text-rose-400 tabular-nums">$50,695 expected profit</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full bg-rose-500 w-[78%] rounded-full shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs pt-1">
                      <div className="flex justify-between">
                        <span className="text-white font-medium">Mathematical Sweet Spot (1,420 units)</span>
                        <span className="font-bold text-emerald-400 tabular-nums">$56,800 expected profit</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[96%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-emerald-400 font-medium flex items-center gap-2 pt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Real-world Benefit: $6,105 saved by adhering to critical fractile math.</span>
                  </p>
                </div>
              )}

              {currentChapter.illustrationType === "override" && (
                <div className="p-6 rounded-2xl border border-white/[0.1] bg-[#0F1524]/90 backdrop-blur-xl shadow-xl space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                      Cognitive Guardrail Active
                    </span>
                    <Badge variant="indigo">Oversight Engaged</Badge>
                  </div>

                  <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/25 text-xs text-white space-y-2">
                    <div className="font-semibold text-orange-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>Over-Reliance Warning Intercept</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Executive paused before submitting the AI's 1,750 units, verified the downside holding risks, and calibrated the purchase order to 1,420 units.
                    </p>
                  </div>
                </div>
              )}

              {currentChapter.illustrationType === "certificate" && (
                <div className="p-6 rounded-2xl border border-white/[0.1] bg-[#0F1524]/90 backdrop-blur-xl shadow-xl space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Tamper-Evident Digital Seal
                    </span>
                    <Badge variant="spruce">Cryptographically Sealed</Badge>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] font-mono text-xs text-slate-300 space-y-2">
                    <div className="text-indigo-300">CERTIFICATE: 0x9e4b7c10d3f82a45e9981240cdae331b</div>
                    <div className="text-slate-400">TIMESTAMP: November 2026 · 17:00:24 UTC</div>
                    <div className="text-emerald-400 font-sans font-medium flex items-center gap-2 pt-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Irrefutable proof of diligent human oversight
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scrubber Progress Bar */}
          <div className="mt-8 space-y-2">
            <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 h-full transition-all duration-75 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>0{activeIdx + 1} / 04</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-white/[0.01]">
          <div className="space-y-5">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block">
                {currentChapter.subtitle}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-1.5">
                {currentChapter.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentChapter.narrative}
            </p>

            {/* Human Takeaway Card */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs">
              <span className="font-semibold text-white block mb-1">
                Why this matters:
              </span>
              <span className="text-slate-300 italic leading-relaxed">
                “{currentChapter.humanTakeaway}”
              </span>
            </div>

            {/* Data Strip */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              {currentChapter.dataPoints.map((dp, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="text-slate-400 block text-[11px]">{dp.label}</span>
                    <span className="font-semibold text-white text-sm mt-0.5 tabular-nums">{dp.value}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{dp.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chapter Selector Tabs */}
          <div className="pt-6 border-t border-white/[0.08] mt-6 grid grid-cols-4 gap-2">
            {CHAPTERS.map((chap, idx) => (
              <button
                key={chap.id}
                onClick={() => handleSelectChapter(idx)}
                className={`p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  activeIdx === idx
                    ? "bg-indigo-500/20 border border-indigo-500/35 text-white font-medium shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                    : "hover:bg-white/[0.04] text-slate-400"
                }`}
              >
                <div className="text-[10px] font-mono text-indigo-400">0{chap.id}</div>
                <div className="text-[11px] truncate mt-0.5">{chap.title.split(" ")[1] || chap.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

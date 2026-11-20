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
    if (!isPlaying) return;

    const intervalMs = 60;
    const totalMs = currentChapter.durationSec * 1000;
    const step = (intervalMs / totalMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIdx((i) => (i + 1) % CHAPTERS.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, activeIdx, currentChapter.durationSec]);

  const handleSelectChapter = (idx: number) => {
    setActiveIdx(idx);
    setProgress(0);
  };

  return (
    <div className="rounded-2xl border border-warm-border bg-canvas-subtle shadow-paper overflow-hidden">
      {/* Top Media Bar */}
      <div className="px-6 py-4 border-b border-warm-hairline bg-canvas/40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-serif text-sm font-semibold text-ink-primary">
            Visual Walkthrough: The Sentra Decision Cycle
          </span>
          <Badge variant="terracotta">Interactive Tour</Badge>
        </div>

        {/* Tactile Play Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg border border-warm-border bg-canvas hover:bg-canvas-muted text-ink-primary transition-colors"
            title={isPlaying ? "Pause Tour" : "Play Tour"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current text-terracotta" />}
          </button>
          <button
            onClick={() => {
              setProgress(0);
              setActiveIdx(0);
            }}
            className="p-1.5 rounded-lg border border-warm-border bg-canvas hover:bg-canvas-muted text-ink-secondary transition-colors"
            title="Restart from Beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              setActiveIdx((i) => (i + 1) % CHAPTERS.length);
              setProgress(0);
            }}
            className="p-1.5 rounded-lg border border-warm-border bg-canvas hover:bg-canvas-muted text-ink-secondary transition-colors"
            title="Next Chapter"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Editorial Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
        {/* Left Column: Visual Exhibition (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-warm-hairline bg-canvas/30">
          <div>
            <div className="flex items-center justify-between text-xs text-ink-muted mb-6">
              <span className="font-sans font-medium text-terracotta tracking-wide uppercase text-[11px]">
                {currentChapter.stage}
              </span>
              <span className="font-mono text-[11px]">
                Chapter {currentChapter.id} of {CHAPTERS.length}
              </span>
            </div>

            {/* Illustration Display for each chapter */}
            <div className="my-auto py-4">
              {currentChapter.illustrationType === "recommendation" && (
                <div className="p-6 rounded-2xl border border-warm-border bg-canvas-subtle shadow-paper space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif text-sm font-semibold text-ink-primary">
                      AI Generated Memo
                    </span>
                    <Badge variant="amber">94% Confidence</Badge>
                  </div>
                  <div className="p-4 rounded-xl bg-canvas border border-warm-hairline text-xs text-ink-secondary leading-relaxed font-sans space-y-2">
                    <p className="italic text-ink-primary">
                      “Based on historical Q3 velocity, we recommend committing <strong className="text-terracotta">1,750 units</strong> to maximize revenue capture.”
                    </p>
                    <p className="text-[11px] text-ink-muted">
                      Notice: The model fails to penalize inventory depreciation and unsold holding costs.
                    </p>
                  </div>
                </div>
              )}

              {currentChapter.illustrationType === "simulation" && (
                <div className="p-6 rounded-2xl border border-warm-border bg-canvas-subtle shadow-paper space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif text-sm font-semibold text-ink-primary">
                      Sentra Stochastic Math
                    </span>
                    <Badge variant="spruce">N = 1,000 Draws</Badge>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-ink-secondary">AI Recommendation (1,750 units)</span>
                        <span className="font-medium text-rose-400">$50,695 expected profit</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-canvas overflow-hidden">
                        <div className="h-full bg-rose-500 w-[78%]" />
                      </div>
                    </div>

                    <div className="space-y-1 text-xs pt-1">
                      <div className="flex justify-between">
                        <span className="text-ink-primary font-medium">Mathematical Sweet Spot (1,420 units)</span>
                        <span className="font-semibold text-sage">$56,800 expected profit</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-canvas overflow-hidden">
                        <div className="h-full bg-sage w-[96%]" />
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-sage font-medium flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0" />
                    <span>Difference: $6,105 saved by adhering to critical fractile math.</span>
                  </p>
                </div>
              )}

              {currentChapter.illustrationType === "override" && (
                <div className="p-6 rounded-2xl border border-warm-border bg-canvas-subtle shadow-paper space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif text-sm font-semibold text-ink-primary">
                      Cognitive Guardrail Active
                    </span>
                    <Badge variant="terracotta">Oversight Engaged</Badge>
                  </div>

                  <div className="p-4 rounded-xl bg-terracotta-light border border-terracotta-border text-xs text-ink-primary space-y-2">
                    <div className="font-medium text-terracotta flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-terracotta shrink-0" />
                      <span>Over-reliance Warning Intercept</span>
                    </div>
                    <p className="text-xs text-ink-secondary leading-relaxed">
                      Executive paused before submitting the AI's 1,750 units, verified the downside holding risks, and corrected the purchase order to 1,420 units.
                    </p>
                  </div>
                </div>
              )}

              {currentChapter.illustrationType === "certificate" && (
                <div className="p-6 rounded-2xl border border-warm-border bg-canvas-subtle shadow-paper space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif text-sm font-semibold text-ink-primary">
                      Tamper-Evident Digital Seal
                    </span>
                    <Badge variant="spruce">Cryptographically Sealed</Badge>
                  </div>

                  <div className="p-4 rounded-xl bg-canvas border border-warm-hairline font-mono text-[11px] text-ink-secondary space-y-1.5">
                    <div>CERTIFICATE: 0x9e4b7c10d3f82a45e9981240cdae331b</div>
                    <div>TIMESTAMP: November 2026 · 17:00:24 UTC</div>
                    <div className="text-sage font-sans font-medium">✓ Irrefutable proof of diligent human oversight</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scrubber Progress Bar */}
          <div className="mt-6 space-y-1.5">
            <div className="w-full bg-canvas h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-terracotta h-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-ink-muted">
              <span>0{activeIdx + 1}</span>
              <span>04</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Narrative (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-canvas-subtle">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-sans font-medium text-terracotta uppercase tracking-wider block">
                {currentChapter.subtitle}
              </span>
              <h3 className="font-serif text-2xl font-bold text-ink-primary tracking-tight mt-1">
                {currentChapter.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {currentChapter.narrative}
            </p>

            {/* Human Takeaway Card */}
            <div className="p-4 rounded-xl bg-canvas border border-warm-hairline text-xs text-ink-primary">
              <span className="font-semibold text-ink-primary block mb-1">
                Why this matters:
              </span>
              <span className="text-ink-secondary italic leading-relaxed">
                “{currentChapter.humanTakeaway}”
              </span>
            </div>

            {/* Clean Data Strip */}
            <div className="grid grid-cols-1 gap-2 pt-2">
              {currentChapter.dataPoints.map((dp, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-warm-hairline bg-canvas/60 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="text-ink-muted block text-[11px]">{dp.label}</span>
                    <span className="font-medium text-ink-primary text-sm mt-0.5">{dp.value}</span>
                  </div>
                  <span className="text-[11px] text-ink-muted font-sans">{dp.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chapter Selector Tabs */}
          <div className="pt-6 border-t border-warm-hairline mt-6 grid grid-cols-4 gap-2">
            {CHAPTERS.map((chap, idx) => (
              <button
                key={chap.id}
                onClick={() => handleSelectChapter(idx)}
                className={`p-2.5 rounded-xl text-left transition-all ${
                  activeIdx === idx
                    ? "bg-canvas border border-warm-border text-ink-primary font-medium"
                    : "hover:bg-canvas/50 text-ink-muted"
                }`}
              >
                <div className="text-[10px] font-mono">0{chap.id}</div>
                <div className="text-[11px] truncate mt-0.5">{chap.title.split(" ")[1] || chap.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

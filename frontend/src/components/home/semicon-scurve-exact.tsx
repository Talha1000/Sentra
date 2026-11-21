"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface TimelineStage {
  id: string;
  label: string;
  cardTitle: string;
  cardDesc: string;
  cyanCurveOffset: number;
  orangeCurveOffset: number;
}

const TIMELINE_STAGES: TimelineStage[] = [
  {
    id: "legacy",
    label: "UNCALIBRATED AI HEURISTICS",
    cardTitle: "Uncalibrated AI Drift",
    cardDesc: "Operators blindly follow articulate LLM advice, falling victim to a +23% systemic over-ordering skew that burns working capital.",
    cyanCurveOffset: 120,
    orangeCurveOffset: 40,
  },
  {
    id: "today",
    label: "TODAY: FRACTILE CALIBRATION",
    cardTitle: "Electronic, All-On-Chip Stochastic Math",
    cardDesc: "Sentra balances the asymmetric penalty under demand volatility, calculating the exact fractile ratio F*(Q) = 0.727 at 1,420 units.",
    cyanCurveOffset: 70,
    orangeCurveOffset: 130,
  },
  {
    id: "future",
    label: "THE FUTURE",
    cardTitle: "Autonomous Risk Equilibrium",
    cardDesc: "Self-calibrating enterprise models that execute trades and allocations with continuous empirical Bayesian updates.",
    cyanCurveOffset: 40,
    orangeCurveOffset: 155,
  },
  {
    id: "platform",
    label: "CRYPTOGRAPHIC LEDGER",
    cardTitle: "Tamper-Proof Audit Seals",
    cardDesc: "Every consequential decision commits an immutable HMAC SHA-256 cryptographic seal for board, auditor, and regulatory review.",
    cyanCurveOffset: 25,
    orangeCurveOffset: 165,
  },
];

export function SemiconSCurveExact() {
  const [activeStageId, setActiveStageId] = useState<string>("today");
  const currentStage = TIMELINE_STAGES.find((s) => s.id === activeStageId) || TIMELINE_STAGES[1];

  return (
    <section id="scurve" className="relative w-full bg-[#000000] text-white py-20 sm:py-28 overflow-hidden border-b border-neutral-900">
      <div className="max-w-[1380px] mx-auto px-6 space-y-8">
        {/* Top Header Tag */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-neutral-800 gap-4">
          <div>
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="text-[#00F0FF] font-bold">CHAPTER 02</span>
              <span>·</span>
              <span>REALIZING THE PROMISE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tightest leading-tight">
              Realizing the Promise
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-md">
            The S-curve marks the irreversible transition from ungrounded heuristic guesswork to scalable stochastic calibration.
          </p>
        </div>

        {/* The Exact SemiconBio Coordinate Grid & S-Curve Canvas */}
        <div className="relative w-full h-[540px] sm:h-[600px] bg-[#000000] border border-neutral-800/80 p-6 sm:p-10 flex flex-col justify-between overflow-hidden">
          {/* Dotted Architectural Grid (SemiconBio step_27.png) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />

          {/* Top Telemetry line */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <div className="flex items-center gap-3">
              <span className="text-neutral-300">SYSTEM TRAJECTORY: S-CURVE</span>
              <span>|</span>
              <span className="text-[#00F0FF]">F*(Q) OPTIMIZATION</span>
            </div>
            <div className="hidden sm:block text-neutral-500">
              [ · i · ] MARKETS PRIMED FOR MAJOR DISRUPTION AND EXPONENTIAL GAIN
            </div>
          </div>

          {/* The Visual SVG Graph with Crossing Curves */}
          <div className="relative w-full h-[360px] my-auto flex items-center justify-center">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1000 360"
              preserveAspectRatio="none"
            >
              {/* Grid Horizontal Guidelines */}
              <line x1="40" y1="60" x2="960" y2="60" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1="40" y1="140" x2="960" y2="140" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1="40" y1="220" x2="960" y2="220" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1="40" y1="300" x2="960" y2="300" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

              {/* Curve 1: Falling Orange Curve (Legacy Heuristics / Optical Detection) */}
              <path
                d="M 60 180 C 260 180, 360 210, 480 270 C 600 310, 800 310, 940 310"
                fill="none"
                stroke="#FF4400"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="transition-all duration-700"
              />
              <text x="70" y="165" fill="#FF4400" fontSize="12" fontFamily="monospace" fontWeight="bold">
                Uncalibrated AI Bias (+23% Skew)
              </text>

              {/* Curve 2: Rising Cyan S-Curve (Sentra Stochastic Calibration / Electronic On-Chip) */}
              <path
                d="M 60 310 C 260 310, 420 280, 520 180 C 620 70, 780 70, 940 70"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="4"
                strokeLinecap="round"
                className="transition-all duration-700"
              />
              <text x="820" y="55" fill="#00F0FF" fontSize="12" fontFamily="monospace" fontWeight="bold">
                Sentra Calibrated S-Curve
              </text>

              {/* Inflection Point Indicator */}
              <circle cx="500" cy="225" r="5" fill="#FFFFFF" />
              <circle cx="500" cy="225" r="12" fill="none" stroke="#00F0FF" strokeWidth="1.5" className="animate-ping" />
            </svg>

            {/* Floating Dark Elevated Glass Card (Exact SemiconBio step_27.png) */}
            <div className="absolute right-6 sm:right-28 top-8 sm:top-12 z-20 w-80 sm:w-96 p-6 sm:p-7 bg-[#1A1A1A]/95 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                  INFLECTION POINT
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tightest leading-tight">
                {currentStage.cardTitle}
              </h4>

              <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                {currentStage.cardDesc}
              </p>

              <div className="pt-2 border-t border-neutral-700/60 flex items-center justify-between text-xs font-mono">
                <span className="text-[#00F0FF] font-semibold">$56,800 PEAK YIELD</span>
                <Link
                  href="/decisions"
                  className="text-white hover:text-[#00F0FF] transition-colors flex items-center gap-1"
                >
                  <span>RUN STUDIO</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Segmented Timeline Pill Bar (Exact SemiconBio step_27.png) */}
          <div className="relative z-10 pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {TIMELINE_STAGES.map((stage) => {
                const isActive = stage.id === activeStageId;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStageId(stage.id)}
                    className={`px-3 sm:px-4 py-2 font-mono text-[10px] sm:text-[11px] tracking-wider uppercase transition-all border ${
                      isActive
                        ? "bg-white text-black border-white font-bold shadow-md"
                        : "bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-600"
                    }`}
                  >
                    {stage.label}
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] text-neutral-500">
              <span>AXIS: PARAMETER DENSITY (0 → 1,420 QTY)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

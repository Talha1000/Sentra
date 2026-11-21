"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";

interface Phase {
  id: number;
  name: string;
  subtitle: string;
  lossMetric: string;
  marginMetric: string;
  curveColor: string;
  badge: string;
  badgeColor: string;
  description: string;
}

const PHASES: Phase[] = [
  {
    id: 1,
    name: "Uncalibrated AI Drift",
    subtitle: "Raw LLM Advice",
    lossMetric: "-$14,200",
    marginMetric: "61.4%",
    curveColor: "#EF4444",
    badge: "HIGH OVERAGE RISK",
    badgeColor: "text-red-600 border-red-300 bg-red-50",
    description: "Generative models consistently hallucinate demand upward (+23% skew), confusing optimism with statistical expectation and burning capital on unsold surplus.",
  },
  {
    id: 2,
    name: "Critical Fractile Inflection",
    subtitle: "Monte Carlo 1,000 Draws",
    lossMetric: "-$3,100",
    marginMetric: "78.2%",
    curveColor: "#FF4400",
    badge: "STOCHASTIC CONVERGENCE",
    badgeColor: "text-orange-600 border-orange-300 bg-orange-50",
    description: "Sentra balances the asymmetric penalty: when underage costs $40 and overage costs $15, the critical fractile ratio F*(Q) = 0.727 mathematically mandates 1,420 units.",
  },
  {
    id: 3,
    name: "Calibrated Equilibrium",
    subtitle: "Optimal Empirical Frontier",
    lossMetric: "$0",
    marginMetric: "92.8%",
    curveColor: "#00F0FF",
    badge: "MATHEMATICAL MAXIMUM",
    badgeColor: "text-cyan-700 border-cyan-300 bg-cyan-50",
    description: "Peak enterprise margin unlocked ($56,800 yield). The decision is cryptographically sealed with HMAC SHA-256 for board and compliance governance.",
  },
];

export function SemiconSCurveShowcase() {
  const [currentPhase, setCurrentPhase] = useState<number>(2);
  const activePhase = PHASES.find((p) => p.id === currentPhase) || PHASES[1];

  return (
    <section id="visual-tour" className="w-full">
      {/* Chapter 02 Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-6 border-b border-black/[0.08]">
        <div>
          <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2 mb-2">
            <span className="text-black font-semibold">CHAPTER 02</span>
            <span>·</span>
            <span>MATHEMATICAL FRONTIER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight leading-tight">
            Replacing Intuition with <br className="hidden sm:inline" />
            Mathematical Inflection
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-md mt-3 sm:mt-0 leading-relaxed">
          The S-curve represents the shift from raw heuristic guesswork to calibrated stochastic decision intelligence.
        </p>
      </div>

      {/* Main Coordinate Grid & Visualization Card */}
      <div className="bg-white border border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-6 sm:p-8">
        {/* Phase Selector Ticker Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-6 border-b border-black/[0.06]">
          {PHASES.map((phase) => {
            const isSelected = phase.id === currentPhase;
            return (
              <button
                key={phase.id}
                onClick={() => setCurrentPhase(phase.id)}
                className={`text-left p-4 border transition-all duration-200 relative ${
                  isSelected
                    ? "bg-[#0A0A0A] text-white border-black shadow-md"
                    : "bg-neutral-50 hover:bg-neutral-100/80 text-neutral-700 border-neutral-200"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className={isSelected ? "text-[#00F0FF]" : "text-neutral-400"}>
                    STAGE 0{phase.id}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                  )}
                </div>
                <div className="font-semibold text-sm tracking-tight">{phase.name}</div>
                <div className={`text-[11px] font-sans mt-0.5 ${isSelected ? "text-neutral-300" : "text-neutral-500"}`}>
                  {phase.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Visual Coordinate Canvas */}
        <div className="py-8">
          <div className="relative w-full h-[260px] sm:h-[300px] bg-[#0A0E17] border border-neutral-800 p-6 flex flex-col justify-between overflow-hidden">
            {/* Architectural Grid Lines */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

            {/* Top Telemetry Overlay */}
            <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-3">
                <span className="text-white font-semibold">COORDINATE MAPPING: F*(Q)</span>
                <span className="text-neutral-600">|</span>
                <span className="text-[#00F0FF]">1,000 RUN MONTE CARLO</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">STATUS:</span>
                <span className="text-emerald-400 font-bold">CONVERGED</span>
              </div>
            </div>

            {/* SVG S-Curve & Trajectory */}
            <div className="relative w-full h-[180px] flex items-center justify-center my-auto">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200" preserveAspectRatio="none">
                {/* Axes */}
                <line x1="50" y1="180" x2="780" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="50" y1="20" x2="50" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

                {/* Grid guidelines */}
                <line x1="50" y1="60" x2="780" y2="60" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="50" y1="120" x2="780" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="400" y1="20" x2="400" y2="180" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

                {/* S-Curve Path */}
                <path
                  d="M 50 170 C 250 170, 320 140, 420 80 C 500 30, 650 35, 780 35"
                  fill="none"
                  stroke={activePhase.curveColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Glow Filter Line */}
                <path
                  d="M 50 170 C 250 170, 320 140, 420 80 C 500 30, 650 35, 780 35"
                  fill="none"
                  stroke={activePhase.curveColor}
                  strokeWidth="10"
                  strokeOpacity="0.25"
                  strokeLinecap="round"
                />

                {/* Inflection Point Markers based on Phase */}
                {currentPhase === 1 && (
                  <g transform="translate(680, 35)">
                    <circle r="7" fill="#EF4444" />
                    <circle r="14" fill="#EF4444" fillOpacity="0.3" className="animate-ping" />
                    <text x="14" y="5" fill="#EF4444" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      RAW AI SKEW: 1,750 (+23%)
                    </text>
                  </g>
                )}

                {currentPhase === 2 && (
                  <g transform="translate(420, 80)">
                    <circle r="7" fill="#FF4400" />
                    <circle r="14" fill="#FF4400" fillOpacity="0.3" className="animate-ping" />
                    <text x="14" y="-8" fill="#FF4400" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      CRITICAL FRACTILE: 0.727
                    </text>
                  </g>
                )}

                {currentPhase === 3 && (
                  <g transform="translate(420, 80)">
                    <circle r="7" fill="#00F0FF" />
                    <circle r="14" fill="#00F0FF" fillOpacity="0.3" className="animate-ping" />
                    <text x="14" y="-8" fill="#00F0FF" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      CALIBRATED SWEET SPOT: 1,420 QTY
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Bottom Coordinate Axis Labels */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-2 border-t border-neutral-800">
              <span>X: 1,000 BASELINE</span>
              <span>X: 1,420 OPTIMAL FRACTILE</span>
              <span>X: 1,750 AI OVERCONFIDENT SKEW</span>
              <span>X: 2,000 LIMIT</span>
            </div>
          </div>
        </div>

        {/* Phase Details & Metrics Strip */}
        <div className="pt-4 border-t border-black/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 text-[10px] font-mono uppercase font-semibold border ${activePhase.badgeColor}`}>
                {activePhase.badge}
              </span>
              <span className="text-xs font-semibold text-black">{activePhase.name}</span>
            </div>
            <p className="text-xs text-neutral-600 font-sans leading-relaxed">
              {activePhase.description}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="border-l border-neutral-200 pl-4">
              <div className="text-[10px] font-mono text-neutral-500 uppercase">EXPECTED DRAG</div>
              <div className="font-mono text-lg font-bold text-black tabular-nums">
                {activePhase.lossMetric}
              </div>
            </div>
            <div className="border-l border-neutral-200 pl-4">
              <div className="text-[10px] font-mono text-neutral-500 uppercase">DECISION YIELD</div>
              <div className="font-mono text-lg font-bold text-[#00A876] tabular-nums">
                {activePhase.marginMetric}
              </div>
            </div>
            <a
              href="/decisions"
              className="px-4 py-2 bg-black hover:bg-neutral-800 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>RUN STUDIO</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

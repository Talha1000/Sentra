"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface ChapterCard {
  id: string;
  index: string;
  category: string;
  dotColor: string;
  title: string;
  description: string;
  href: string;
  metric: string;
  metricLabel: string;
}

const CHAPTER_CARDS: ChapterCard[] = [
  {
    id: "fractile",
    index: "01/04",
    category: "STOCHASTIC OPTIMIZATION",
    dotColor: "#00F0FF",
    title: "Critical Fractile Calibration",
    description: "Calculates the exact profit-maximizing inventory and allocation targets under demand uncertainty, balancing underage and overage risks mathematically.",
    href: "/decisions",
    metric: "$56,800",
    metricLabel: "Calibrated Peak Yield",
  },
  {
    id: "bias",
    index: "02/04",
    category: "AI BIAS INTERCEPTION",
    dotColor: "#FF4400",
    title: "Detecting Hallucinated Confidence",
    description: "Continuously monitors LLM recommendations against historical ground-truth, exposing the insidious +23% over-ordering skew that costs enterprises millions.",
    href: "/workspace",
    metric: "-23.2%",
    metricLabel: "Bias Intercepted",
  },
  {
    id: "lab",
    index: "03/04",
    category: "BEHAVIORAL RESEARCH",
    dotColor: "#A855F7",
    title: "Double-Blind Cognitive Trials",
    description: "Runs controlled behavioral science protocols to measure human decision fatigue, automation bias, and operator adherence across adverse conditions.",
    href: "/experiments",
    metric: "p < 0.001",
    metricLabel: "Statistical Significance",
  },
  {
    id: "audit",
    index: "04/04",
    category: "CRYPTOGRAPHIC PROVENANCE",
    dotColor: "#10B981",
    title: "Immutable HMAC Ledger",
    description: "Every decision run produces a tamper-proof SHA-256 cryptographic seal recording parameters, AI advice, operator actions, and mathematical rationale.",
    href: "/governance",
    metric: "SHA-256",
    metricLabel: "Cryptographic Seal",
  },
];

export function SemiconChapterCards() {
  const [activeCard, setActiveCard] = useState<string>("fractile");

  return (
    <div className="w-full">
      {/* Chapter Index Telemetry Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/[0.08] text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-black font-semibold">CHAPTER 01</span>
          <span>·</span>
          <span>SYSTEM CAPABILITIES</span>
        </div>
        <div className="flex items-center gap-2">
          <span>SELECT MODULE TO INSPECT</span>
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
        </div>
      </div>

      {/* Grid of 4 Architectural Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CHAPTER_CARDS.map((card) => {
          const isActive = activeCard === card.id;

          return (
            <div
              key={card.id}
              onClick={() => setActiveCard(card.id)}
              className={`group cursor-pointer p-5 transition-all duration-300 relative flex flex-col justify-between h-[300px] border ${
                isActive
                  ? "bg-white border-black/30 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.1)] ring-1 ring-black/10"
                  : "bg-white/70 hover:bg-white border-black/[0.08] hover:border-black/20"
              }`}
            >
              {/* Top Accent Dot & Index Line */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block transition-transform group-hover:scale-125"
                      style={{ backgroundColor: card.dotColor }}
                    />
                    <span className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase">
                      {card.category}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-neutral-400 group-hover:text-black">
                    {card.index}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-lg font-semibold text-black tracking-tight mt-4 leading-snug group-hover:text-neutral-900">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs text-neutral-600 font-sans mt-2 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Bottom Telemetry & Navigation link */}
              <div className="pt-4 border-t border-black/[0.06] flex items-end justify-between">
                <div>
                  <div className="font-mono text-sm font-semibold text-black tabular-nums">
                    {card.metric}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 uppercase">
                    {card.metricLabel}
                  </div>
                </div>

                <a
                  href={card.href}
                  className={`p-1.5 rounded-none border transition-colors flex items-center justify-center ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "bg-transparent text-neutral-500 border-neutral-300 group-hover:text-black group-hover:border-black"
                  }`}
                  title={`Open ${card.title}`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

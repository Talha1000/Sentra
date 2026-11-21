"use client";

import React, { useState } from "react";
import { formatPercent } from "@/lib/utils";

export interface ScatterPoint {
  id: string;
  condition: "CONDITION_A" | "CONDITION_B" | "CONDITION_C";
  latencySec: number;
  accuracy: number;
  isOverReliance: boolean;
}

export function LatencyAccuracyScatter() {
  const [activeCondition, setActiveCondition] = useState<string>("ALL");
  const [hoveredPoint, setHoveredPoint] = useState<ScatterPoint | null>(null);

  // 45 simulated participant sample trials
  const points: ScatterPoint[] = [
    // Condition A: Human Only (Latency 6-12s, Accuracy 65-88%)
    { id: "a1", condition: "CONDITION_A", latencySec: 7.8, accuracy: 0.78, isOverReliance: false },
    { id: "a2", condition: "CONDITION_A", latencySec: 9.2, accuracy: 0.82, isOverReliance: false },
    { id: "a3", condition: "CONDITION_A", latencySec: 11.5, accuracy: 0.86, isOverReliance: false },
    { id: "a4", condition: "CONDITION_A", latencySec: 6.9, accuracy: 0.71, isOverReliance: false },
    { id: "a5", condition: "CONDITION_A", latencySec: 8.4, accuracy: 0.80, isOverReliance: false },
    { id: "a6", condition: "CONDITION_A", latencySec: 10.1, accuracy: 0.84, isOverReliance: false },
    { id: "a7", condition: "CONDITION_A", latencySec: 7.3, accuracy: 0.74, isOverReliance: false },
    { id: "a8", condition: "CONDITION_A", latencySec: 8.9, accuracy: 0.79, isOverReliance: false },

    // Condition B: AI Rec Only (Faster 2.5-6s, Bimodal accuracy: high on true AI, low on biased AI ~40-60%)
    { id: "b1", condition: "CONDITION_B", latencySec: 3.2, accuracy: 0.94, isOverReliance: false },
    { id: "b2", condition: "CONDITION_B", latencySec: 2.8, accuracy: 0.48, isOverReliance: true },
    { id: "b3", condition: "CONDITION_B", latencySec: 4.1, accuracy: 0.52, isOverReliance: true },
    { id: "b4", condition: "CONDITION_B", latencySec: 3.6, accuracy: 0.92, isOverReliance: false },
    { id: "b5", condition: "CONDITION_B", latencySec: 4.8, accuracy: 0.55, isOverReliance: true },
    { id: "b6", condition: "CONDITION_B", latencySec: 2.9, accuracy: 0.96, isOverReliance: false },
    { id: "b7", condition: "CONDITION_B", latencySec: 3.8, accuracy: 0.44, isOverReliance: true },
    { id: "b8", condition: "CONDITION_B", latencySec: 5.2, accuracy: 0.88, isOverReliance: false },

    // Condition C: AI + Explanation (5-9s, high accuracy 85-98%, lower over-reliance)
    { id: "c1", condition: "CONDITION_C", latencySec: 6.4, accuracy: 0.96, isOverReliance: false },
    { id: "c2", condition: "CONDITION_C", latencySec: 7.1, accuracy: 0.94, isOverReliance: false },
    { id: "c3", condition: "CONDITION_C", latencySec: 8.0, accuracy: 0.76, isOverReliance: true },
    { id: "c4", condition: "CONDITION_C", latencySec: 6.8, accuracy: 0.98, isOverReliance: false },
    { id: "c5", condition: "CONDITION_C", latencySec: 7.9, accuracy: 0.91, isOverReliance: false },
    { id: "c6", condition: "CONDITION_C", latencySec: 5.9, accuracy: 0.93, isOverReliance: false },
    { id: "c7", condition: "CONDITION_C", latencySec: 8.5, accuracy: 0.97, isOverReliance: false },
    { id: "c8", condition: "CONDITION_C", latencySec: 6.2, accuracy: 0.89, isOverReliance: false },
  ];

  const filteredPoints = activeCondition === "ALL"
    ? points
    : points.filter((p) => p.condition === activeCondition);

  const width = 480;
  const height = 240;
  const padL = 45;
  const padR = 20;
  const padT = 20;
  const padB = 40;

  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const minX = 0;
  const maxX = 14;
  const minY = 0.3;
  const maxY = 1.0;

  const scaleX = (x: number) => padL + ((x - minX) / (maxX - minX)) * chartW;
  const scaleY = (y: number) => padT + chartH - ((y - minY) / (maxY - minY)) * chartH;

  const getColor = (p: ScatterPoint) => {
    if (p.isOverReliance) return "#BE123C"; // Crimson alert for over-reliance
    if (p.condition === "CONDITION_A") return "#1D4ED8"; // Cobalt
    if (p.condition === "CONDITION_B") return "#B45309"; // Amber
    return "#0F766E"; // Spruce
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between text-xs gap-2">
        <span className="font-semibold text-ink-primary">Latency vs. Accuracy Distribution</span>
        <div className="flex items-center gap-1">
          {[
            { id: "ALL", label: "All" },
            { id: "CONDITION_A", label: "Cond A (Human)" },
            { id: "CONDITION_B", label: "Cond B (AI Rec)" },
            { id: "CONDITION_C", label: "Cond C (AI + Expl)" },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCondition(c.id)}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-medium transition-colors ${
                activeCondition === c.id
                  ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold shadow-sm"
                  : "bg-white/[0.04] text-slate-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#0D111A]/85 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 overflow-x-auto relative shadow-card">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none font-mono text-[9px]">
          {/* Y-axis grid */}
          {[0.4, 0.6, 0.8, 1.0].map((acc) => {
            const y = scaleY(acc);
            return (
              <g key={acc}>
                <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="3,3" />
                <text x={padL - 6} y={y + 3} textAnchor="end" fill="#94A3B8">
                  {Math.round(acc * 100)}%
                </text>
              </g>
            );
          })}

          {/* X-axis ticks */}
          {[2, 4, 6, 8, 10, 12].map((s) => {
            const x = scaleX(s);
            return (
              <g key={s}>
                <line x1={x} y1={padT} x2={x} y2={height - padB} stroke="rgba(255,255,255,0.08)" strokeDasharray="3,3" />
                <text x={x} y={height - padB + 14} textAnchor="middle" fill="#94A3B8">
                  {s}s
                </text>
              </g>
            );
          })}

          {/* Over-reliance clustering zone annotation */}
          <rect
            x={scaleX(2)}
            y={scaleY(0.6)}
            width={scaleX(5.5) - scaleX(2)}
            height={scaleY(0.35) - scaleY(0.6)}
            fill="rgba(244,63,94,0.12)"
            stroke="rgba(244,63,94,0.3)"
            rx="6"
          />
          <text
            x={scaleX(3.75)}
            y={scaleY(0.37)}
            textAnchor="middle"
            fill="#F43F5E"
            className="font-sans font-semibold text-[8px]"
          >
            FAST OVER-RELIANCE CLUSTER
          </text>

          {/* Scatter Points */}
          {filteredPoints.map((pt) => {
            const isHovered = hoveredPoint?.id === pt.id;
            return (
              <g
                key={pt.id}
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={scaleX(pt.latencySec)}
                  cy={scaleY(pt.accuracy)}
                  r={isHovered ? 7 : 4.5}
                  fill={getColor(pt)}
                  stroke="#0A0D12"
                  strokeWidth={1.5}
                  className="transition-all duration-150"
                />
              </g>
            );
          })}

          {/* Axis labels */}
          <text x={width / 2} y={height - 8} textAnchor="middle" fill="#94A3B8" className="font-sans text-[10px]">
            Decision Latency (Seconds)
          </text>
          <text
            x={-(height / 2)}
            y={12}
            transform="rotate(-90)"
            textAnchor="middle"
            fill="#434B56"
            className="font-sans text-[10px]"
          >
            Normalized Decision Accuracy
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-ink-tertiary px-1">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-cobalt font-medium">
            <span className="w-2 h-2 rounded-full bg-cobalt inline-block" /> Cond A (Human)
          </span>
          <span className="flex items-center gap-1 text-cognition font-medium">
            <span className="w-2 h-2 rounded-full bg-cognition inline-block" /> Cond B (AI Rec)
          </span>
          <span className="flex items-center gap-1 text-spruce font-medium">
            <span className="w-2 h-2 rounded-full bg-spruce inline-block" /> Cond C (AI + Expl)
          </span>
          <span className="flex items-center gap-1 text-crimson font-medium">
            <span className="w-2 h-2 rounded-full bg-crimson inline-block" /> Over-Reliance Fail
          </span>
        </div>
        {hoveredPoint && (
          <span className="font-mono text-ink-primary font-bold">
            {hoveredPoint.latencySec}s • {formatPercent(hoveredPoint.accuracy)}
          </span>
        )}
      </div>
    </div>
  );
}

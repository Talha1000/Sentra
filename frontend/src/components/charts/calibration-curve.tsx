"use client";

import React from "react";
import { CalibrationBin } from "@/lib/api";
import { formatPercent } from "@/lib/utils";

export interface CalibrationCurveProps {
  bins: CalibrationBin[];
  ece: number;
}

export function CalibrationCurve({ bins, ece }: CalibrationCurveProps) {
  const width = 360;
  const height = 260;
  const padding = 40;

  const chartW = width - padding * 2;
  const chartH = height - padding * 2;

  // Scale coordinates: (0,0) at bottom-left
  const getX = (val: number) => padding + val * chartW;
  const getY = (val: number) => height - padding - val * chartH;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-ink-primary">Trust Calibration Curve</span>
        <span className="font-mono text-ink-secondary text-[11px]">
          ECE: <span className="font-semibold text-cognition">{formatPercent(ece)}</span>
        </span>
      </div>

      <div className="border border-warm-hairline rounded-2xl bg-canvas-elevated/60 p-3 flex items-center justify-center shadow-paper">
        <svg width={width} height={height} className="overflow-visible select-none text-[10px] font-mono">
          {/* Grid lines */}
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((v) => (
            <g key={v}>
              {/* Horizontal line */}
              <line
                x1={padding}
                y1={getY(v)}
                x2={width - padding}
                y2={getY(v)}
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="2,2"
              />
              <text x={padding - 6} y={getY(v) + 3} textAnchor="end" fill="#94A3B8">
                {Math.round(v * 100)}%
              </text>
              {/* Vertical line */}
              <line
                x1={getX(v)}
                y1={padding}
                x2={getX(v)}
                y2={height - padding}
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="2,2"
              />
              <text x={getX(v)} y={height - padding + 14} textAnchor="middle" fill="#94A3B8">
                {Math.round(v * 100)}%
              </text>
            </g>
          ))}

          {/* Axes */}
          <line
            x1={padding}
            y1={getY(0)}
            x2={width - padding}
            y2={getY(0)}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
          />

          {/* Perfect calibration reference diagonal (y = x) */}
          <line
            x1={getX(0)}
            y1={getY(0)}
            x2={getX(1)}
            y2={getY(1)}
            stroke="#94A3B8"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />

          {/* Empirical calibration points & curve */}
          {bins.length > 0 && (
            <>
              {/* Line connecting points */}
              <polyline
                fill="none"
                stroke="#E07A5F"
                strokeWidth="2"
                points={bins.map((b) => `${getX(b.mean_confidence)},${getY(b.observed_accuracy)}`).join(" ")}
              />
              {/* Data points */}
              {bins.map((b, idx) => (
                <g key={idx}>
                  <circle
                    cx={getX(b.mean_confidence)}
                    cy={getY(b.observed_accuracy)}
                    r="4"
                    fill="#E07A5F"
                    stroke="#0A0D12"
                    strokeWidth="1.5"
                  />
                  {/* Calibration gap indicator */}
                  <line
                    x1={getX(b.mean_confidence)}
                    y1={getY(b.mean_confidence)}
                    x2={getX(b.mean_confidence)}
                    y2={getY(b.observed_accuracy)}
                    stroke="#F43F5E"
                    strokeWidth="1"
                    strokeOpacity="0.6"
                  />
                </g>
              ))}
            </>
          )}

          {/* Axis Labels */}
          <text
            x={width / 2}
            y={height - 6}
            textAnchor="middle"
            fill="#94A3B8"
            className="font-sans text-[11px] font-medium"
          >
            Subjective Reported Confidence
          </text>
          <text
            x={-(height / 2)}
            y={12}
            transform="rotate(-90)"
            textAnchor="middle"
            fill="#94A3B8"
            className="font-sans text-[11px] font-medium"
          >
            Observed Accuracy
          </text>
        </svg>
      </div>

      <div className="flex items-center justify-between text-[11px] text-ink-tertiary px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-ink-tertiary border-b border-dashed inline-block" />
          <span>Optimal Calibration Line (y = x)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cognition inline-block" />
          <span>Observed Behavior</span>
        </div>
      </div>
    </div>
  );
}

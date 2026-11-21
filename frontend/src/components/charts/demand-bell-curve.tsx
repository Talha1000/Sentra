"use client";

import React from "react";
import { formatNumber, formatPercent } from "@/lib/utils";

export interface DemandBellCurveProps {
  meanDemand: number;
  stdDemand: number;
  currentStock: number;
  purchaseQuantity: number;
}

export function DemandBellCurve({
  meanDemand,
  stdDemand,
  currentStock,
  purchaseQuantity,
}: DemandBellCurveProps) {
  const width = 380;
  const height = 170;
  const padL = 30;
  const padR = 20;
  const padT = 20;
  const padB = 30;

  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const totalInventory = currentStock + purchaseQuantity;

  // Domain of demand: [mean - 3.2 * std, mean + 3.2 * std]
  const minD = Math.max(0, meanDemand - 3.2 * stdDemand);
  const maxD = meanDemand + 3.2 * stdDemand;

  // Normal PDF formula
  const pdf = (x: number) => {
    const exponent = -0.5 * Math.pow((x - meanDemand) / stdDemand, 2);
    return (1 / (stdDemand * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
  };

  const peak = pdf(meanDemand);

  const scaleX = (x: number) => padL + ((x - minD) / (maxD - minD)) * chartW;
  const scaleY = (y: number) => padT + chartH - (y / peak) * chartH;

  // Generate curve path
  const step = (maxD - minD) / 60;
  const curvePoints: Array<{ x: number; y: number }> = [];
  const shadedPoints: Array<{ x: number; y: number }> = [];

  for (let x = minD; x <= maxD; x += step) {
    const y = pdf(x);
    curvePoints.push({ x: scaleX(x), y: scaleY(y) });
    if (x <= totalInventory) {
      shadedPoints.push({ x: scaleX(x), y: scaleY(y) });
    }
  }

  // Calculate cumulative service level (approx erf)
  const z = (totalInventory - meanDemand) / (stdDemand * Math.sqrt(2));
  const t = 1.0 / (1.0 + 0.3275911 * Math.abs(z));
  const poly =
    1.0 -
    (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t) *
      Math.exp(-z * z);
  const erfVal = z >= 0 ? poly : -poly;
  const serviceLevel = Math.max(0.01, Math.min(0.999, 0.5 * (1 + erfVal)));

  const curveD = curvePoints.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`).join(" ");
  
  const shadedD = shadedPoints.length > 0
    ? `${shadedPoints.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`).join(" ")} L ${scaleX(Math.min(maxD, totalInventory))} ${padT + chartH} L ${scaleX(minD)} ${padT + chartH} Z`
    : "";

  return (
    <div className="space-y-3 bg-[#0D111A]/85 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 shadow-card">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-white">Demand Probability & Fill Rate</span>
        <span className="font-mono text-[11px] font-bold text-emerald-300 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
          Service Level: {formatPercent(serviceLevel)}
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none font-mono text-[9px] overflow-visible">
        <defs>
          <linearGradient id="emeraldBellGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Shaded satisfied demand */}
        {shadedD && <path d={shadedD} fill="url(#emeraldBellGrad)" />}

        {/* Normal Bell Curve */}
        <path d={curveD} fill="none" stroke="#10B981" strokeWidth="2.5" />

        {/* Total Stock Cutoff Line */}
        <line
          x1={scaleX(totalInventory)}
          y1={padT}
          x2={scaleX(totalInventory)}
          y2={padT + chartH}
          stroke="#818CF8"
          strokeWidth="2"
          strokeDasharray="4,4"
        />
        <circle cx={scaleX(totalInventory)} cy={padT} r="4" fill="#6366F1" stroke="#FFFFFF" strokeWidth="1.5" />

        {/* X axis */}
        <line x1={padL} y1={padT + chartH} x2={width - padR} y2={padT + chartH} stroke="rgba(255,255,255,0.12)" />

        <text x={scaleX(minD)} y={height - 8} textAnchor="start" fill="#94A3B8">
          {Math.round(minD)}
        </text>
        <text x={scaleX(meanDemand)} y={height - 8} textAnchor="middle" fill="#FFFFFF" className="font-bold">
          μ = {meanDemand}
        </text>
        <text x={scaleX(maxD)} y={height - 8} textAnchor="end" fill="#94A3B8">
          {Math.round(maxD)}
        </text>

        {/* Label for total inventory */}
        <g transform={`translate(${scaleX(totalInventory)}, ${padT - 6})`}>
          <text
            x={totalInventory > meanDemand ? -6 : 6}
            y="0"
            textAnchor={totalInventory > meanDemand ? "end" : "start"}
            fill="#818CF8"
            className="font-sans font-bold text-[10px]"
          >
            Inventory ({totalInventory})
          </text>
        </g>
      </svg>

      <div className="flex justify-between text-[11px] pt-1 border-t border-white/[0.06]">
        <span className="text-emerald-400 font-medium">■ Satisfied Demand</span>
        <span className="text-rose-400 font-medium">Stockout Exposure: {formatPercent(1 - serviceLevel)}</span>
      </div>
    </div>
  );
}

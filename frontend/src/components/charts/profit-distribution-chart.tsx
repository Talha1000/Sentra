"use client";

import React, { useState } from "react";
import { formatCurrency, formatNumber } from "@/lib/utils";

export interface ProfitChartProps {
  meanDemand: number;
  stdDemand: number;
  currentStock: number;
  unitCost: number;
  sellingPrice: number;
  salvageValue: number;
  stockoutPenalty: number;
  proposedOrder: number;
  budgetLimit: number;
  onSelectOrder?: (order: number) => void;
}

export function ProfitDistributionChart({
  meanDemand,
  stdDemand,
  currentStock,
  unitCost,
  sellingPrice,
  salvageValue,
  stockoutPenalty,
  proposedOrder,
  budgetLimit,
  onSelectOrder,
}: ProfitChartProps) {
  const [hoverX, setHoverX] = useState<number | null>(null);

  const width = 640;
  const height = 240;
  const padL = 60;
  const padR = 25;
  const padT = 20;
  const padB = 40;

  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  // Generate order range from 0 to 1.8 * mean demand
  const minOrder = 0;
  const maxOrder = Math.max(2000, Math.round(meanDemand * 1.8));
  const step = 20;

  // Compute expected profit curve
  const points: Array<{ order: number; profit: number }> = [];
  let maxProfit = -Infinity;
  let minProfit = Infinity;
  let optimalOrder = 0;

  for (let q = minOrder; q <= maxOrder; q += step) {
    // 3-point Gauss-Hermite quadrature approximation of expected profit
    const dMinus = Math.max(0, meanDemand - 1.5 * stdDemand);
    const dMid = meanDemand;
    const dPlus = meanDemand + 1.5 * stdDemand;

    const calcAtD = (d: number) => {
      const tot = currentStock + q;
      const sold = Math.min(tot, d);
      const unsold = Math.max(0, tot - d);
      const unmet = Math.max(0, d - tot);
      return sold * sellingPrice + unsold * salvageValue - q * unitCost - unmet * stockoutPenalty;
    };

    const expProfit = calcAtD(dMinus) * 0.2 + calcAtD(dMid) * 0.6 + calcAtD(dPlus) * 0.2;
    points.push({ order: q, profit: expProfit });

    if (expProfit > maxProfit) {
      maxProfit = expProfit;
      optimalOrder = q;
    }
    if (expProfit < minProfit) {
      minProfit = expProfit;
    }
  }

  // Visual scaling
  const effectiveMinY = Math.min(0, minProfit * 1.1);
  const effectiveMaxY = maxProfit * 1.15;

  const scaleX = (q: number) => padL + ((q - minOrder) / (maxOrder - minOrder)) * chartW;
  const scaleY = (p: number) => padT + chartH - ((p - effectiveMinY) / (effectiveMaxY - effectiveMinY)) * chartH;

  const pathD = points
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${scaleX(pt.order).toFixed(1)} ${scaleY(pt.profit).toFixed(1)}`)
    .join(" ");

  const areaD = `${pathD} L ${scaleX(maxOrder)} ${scaleY(effectiveMinY)} L ${scaleX(minOrder)} ${scaleY(effectiveMinY)} Z`;

  const cursorX = hoverX !== null ? hoverX : proposedOrder;
  const cursorClamped = Math.max(minOrder, Math.min(maxOrder, cursorX));
  const currentPt = points.find((p) => Math.abs(p.order - cursorClamped) < step) || {
    order: cursorClamped,
    profit: maxProfit * 0.9,
  };

  const budgetMaxQty = Math.floor(budgetLimit / unitCost);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-ink-primary">Expected Profit Curve</span>
          <span className="font-mono text-xs text-sage font-semibold px-2.5 py-0.5 rounded-full bg-sage/15 border border-sage/30">
            Optimal Q*: {optimalOrder} units ({formatCurrency(maxProfit)})
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-terracotta font-medium">
            <span className="w-2 h-2 rounded-full bg-terracotta inline-block shadow-[0_0_8px_rgba(224,122,95,0.6)]" />
            Selected: {formatNumber(cursorClamped)} units
          </span>
          <span className="flex items-center gap-1.5 text-rose-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
            Cap: {formatNumber(budgetMaxQty)}
          </span>
        </div>
      </div>

      <div className="w-full bg-canvas-elevated/60 border border-warm-hairline rounded-2xl p-3 overflow-x-auto relative shadow-paper">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none overflow-visible font-mono text-[10px]"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = ((e.clientX - rect.left) / rect.width) * width;
            if (relX >= padL && relX <= width - padR) {
              const qVal = minOrder + ((relX - padL) / chartW) * (maxOrder - minOrder);
              setHoverX(Math.round(qVal / 25) * 25);
            }
          }}
          onMouseLeave={() => setHoverX(null)}
          onClick={() => {
            if (hoverX !== null && onSelectOrder) {
              onSelectOrder(hoverX);
            }
          }}
        >
          <defs>
            <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#E07A5F" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
            const profitVal = effectiveMinY + frac * (effectiveMaxY - effectiveMinY);
            const y = scaleY(profitVal);
            return (
              <g key={frac}>
                <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="3,3" />
                <text x={padL - 6} y={y + 3} textAnchor="end" fill="#94A3B8">
                  {formatCurrency(profitVal)}
                </text>
              </g>
            );
          })}

          {/* Budget Limit Vertical Line */}
          {budgetMaxQty <= maxOrder && (
            <g>
              <line
                x1={scaleX(budgetMaxQty)}
                y1={padT}
                x2={scaleX(budgetMaxQty)}
                y2={padT + chartH}
                stroke="#F43F5E"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
              <text
                x={scaleX(budgetMaxQty) + 4}
                y={padT + 12}
                fill="#F43F5E"
                className="font-sans font-bold text-[9px]"
              >
                BUDGET CEILING
              </text>
            </g>
          )}

          {/* Optimal Zone Highlight */}
          <line
            x1={scaleX(optimalOrder)}
            y1={padT}
            x2={scaleX(optimalOrder)}
            y2={padT + chartH}
            stroke="#34D399"
            strokeWidth="1.5"
            strokeDasharray="2,2"
          />
          <text
            x={scaleX(optimalOrder)}
            y={padT - 6}
            textAnchor="middle"
            fill="#34D399"
            className="font-bold text-[10px]"
          >
            ★ MAX PROFIT
          </text>

          {/* Profit Curve Area & Stroke */}
          <path d={areaD} fill="url(#profitGrad)" />
          <path d={pathD} fill="none" stroke="#34D399" strokeWidth="2.5" />

          {/* Dynamic Interactive Cursor Line */}
          <line
            x1={scaleX(cursorClamped)}
            y1={padT}
            x2={scaleX(cursorClamped)}
            y2={padT + chartH}
            stroke="#F8FAFC"
            strokeWidth="1.5"
          />
          <circle
            cx={scaleX(cursorClamped)}
            cy={scaleY(currentPt.profit)}
            r="5"
            fill="#E07A5F"
            stroke="#0A0D12"
            strokeWidth="2"
            className="shadow-sm"
          />

          {/* Cursor readout badge */}
          <g transform={`translate(${scaleX(cursorClamped)}, ${Math.max(padT + 20, scaleY(currentPt.profit) - 24)})`}>
            <rect
              x="-48"
              y="-14"
              width="96"
              height="20"
              rx="6"
              fill="#0A0D12"
              stroke="rgba(255,255,255,0.2)"
              opacity="0.95"
            />
            <text x="0" y="0" textAnchor="middle" fill="#F8FAFC" className="font-mono text-[9px] font-bold">
              {formatCurrency(currentPt.profit)}
            </text>
          </g>

          {/* X Axis ticks */}
          {[minOrder, 500, 1000, 1500, 2000, maxOrder].map((q) => (
            <g key={q} transform={`translate(${scaleX(q)}, ${height - padB})`}>
              <line y1="0" y2="4" stroke="rgba(255,255,255,0.2)" />
              <text y="14" textAnchor="middle" fill="#94A3B8">
                {q}
              </text>
            </g>
          ))}
          <text x={width / 2} y={height - 8} textAnchor="middle" fill="#94A3B8" className="font-sans text-[11px] font-medium">
            Purchase Quantity (Units) — Click or hover to simulate
          </text>
        </svg>
      </div>
    </div>
  );
}

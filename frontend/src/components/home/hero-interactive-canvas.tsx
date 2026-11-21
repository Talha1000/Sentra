"use client";

import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Info, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";

export function HeroInteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoverQty, setHoverQty] = useState<number>(1420);
  const [hoverProfit, setHoverProfit] = useState<number>(56800);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [cursorX, setCursorX] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 720);
    let height = (canvas.height = 340);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 340;
    };
    window.addEventListener("resize", handleResize);

    let t = 0;

    const render = () => {
      t += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Deep midnight velvet background
      ctx.fillStyle = "#0A0E17";
      ctx.fillRect(0, 0, width, height);

      // Delicate architectural grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
      ctx.lineWidth = 1;

      // Vertical grid
      const gridSpacingX = 48;
      for (let x = 0; x < width; x += gridSpacingX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal grid
      const gridSpacingY = 40;
      for (let y = 0; y < height; y += gridSpacingY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const baselineY = height - 50;
      const optimalX = width * 0.44; // 1,420 units
      const aiX = width * 0.70;      // 1,750 units (+23% bias)
      const stdWidth = width * 0.15;

      // 1. Draw True Demand Gaussian Bell Curve (Luminous Emerald)
      ctx.beginPath();
      ctx.moveTo(0, baselineY);

      for (let x = 0; x <= width; x += 3) {
        const exponent = -Math.pow(x - optimalX, 2) / (2 * Math.pow(stdWidth, 2));
        const bellY = baselineY - Math.exp(exponent) * (height * 0.58);
        ctx.lineTo(x, bellY);
      }
      ctx.lineTo(width, baselineY);
      ctx.closePath();

      // Glowing emerald gradient fill
      const emeraldGrad = ctx.createLinearGradient(0, 0, 0, baselineY);
      emeraldGrad.addColorStop(0, "rgba(16, 185, 129, 0.22)");
      emeraldGrad.addColorStop(1, "rgba(16, 185, 129, 0.01)");
      ctx.fillStyle = emeraldGrad;
      ctx.fill();

      // Emerald curve line with ambient glow
      ctx.shadowColor = "rgba(16, 185, 129, 0.6)";
      ctx.shadowBlur = 12;
      ctx.strokeStyle = "#10B981";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 2. Draw Biased AI Distribution (Luminous Sunset Coral Dashed Curve)
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      for (let x = 0; x <= width; x += 3) {
        const exponent = -Math.pow(x - aiX, 2) / (2 * Math.pow(stdWidth * 1.15, 2));
        const bellY = baselineY - Math.exp(exponent) * (height * 0.46);
        if (x === 0) ctx.moveTo(x, bellY);
        else ctx.lineTo(x, bellY);
      }
      ctx.strokeStyle = "rgba(255, 107, 74, 0.85)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(255, 107, 74, 0.5)";
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.setLineDash([]);

      // Baseline ground line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, baselineY);
      ctx.lineTo(width, baselineY);
      ctx.stroke();

      // 3. Mathematical Optimum Point (Emerald halo)
      const optPeakY = baselineY - height * 0.58;
      const breathingRadius = 5 + Math.sin(t * 2) * 1.5;

      ctx.beginPath();
      ctx.arc(optimalX, optPeakY, breathingRadius + 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(16, 185, 129, 0.25)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(optimalX, optPeakY, breathingRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#10B981";
      ctx.fill();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;
      ctx.stroke();

      // 4. Biased AI Anchor Point (Sunset coral pin)
      const aiPeakY = baselineY - height * 0.46;
      ctx.beginPath();
      ctx.arc(aiX, aiPeakY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#FF6B4A";
      ctx.fill();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Typography annotations on canvas
      ctx.font = "600 11px Inter, sans-serif";

      // Optimum label
      ctx.fillStyle = "#34D399";
      ctx.fillText("True Sweet Spot: 1,420 units (Q*)", optimalX - 75, optPeakY - 16);

      // AI label
      ctx.fillStyle = "#FF8E72";
      ctx.fillText("AI Suggestion: 1,750 units (+23% Bias)", aiX - 90, aiPeakY - 16);

      // Axis ticks and labels
      ctx.font = "500 10px Inter, sans-serif";
      ctx.fillStyle = "#94A3B8";
      ctx.fillText("1,000", width * 0.15, baselineY + 20);
      ctx.fillText("1,420 (Q*)", optimalX - 22, baselineY + 20);
      ctx.fillText("1,750 (AI)", aiX - 22, baselineY + 20);
      ctx.fillText("2,000", width * 0.88, baselineY + 20);

      // Hover vertical hairline guide
      if (cursorX !== null) {
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.moveTo(cursorX, 20);
        ctx.lineTo(cursorX, baselineY);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(cursorX, baselineY, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorX]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setCursorX(x);
    setIsHovering(true);

    const ratio = Math.max(0, Math.min(1, x / canvas.width));
    const calculatedQty = Math.round(1000 + ratio * 1000);
    setHoverQty(calculatedQty);

    const dev = Math.abs(calculatedQty - 1420);
    const expected = Math.max(12000, Math.round(56800 - dev * 18.5));
    setHoverProfit(expected);
  };

  const handleMouseLeave = () => {
    setCursorX(null);
    setIsHovering(false);
    setHoverQty(1420);
    setHoverProfit(56800);
  };

  return (
    <div className="relative rounded-3xl border border-white/[0.12] bg-[#0D111A]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden transition-all group">
      {/* Top Rim Light */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent pointer-events-none" />

      {/* Header Strip */}
      <div className="px-6 py-4 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
          <span className="text-sm font-semibold text-white tracking-tight">
            Interactive Decision Ledger
          </span>
          <span className="text-xs text-white/20">·</span>
          <span className="text-xs text-slate-400">Q4 Semiconductor Allocation</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)] inline-block" />
            <span>Optimal Demand (1,420)</span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_6px_rgba(255,107,74,0.8)] inline-block" />
            <span>Biased AI Skew (1,750)</span>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full h-[340px] cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full block"
        />

        {/* Floating Tooltip */}
        {isHovering && cursorX !== null && (
          <div
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-12 bg-white text-slate-950 px-4 py-2 rounded-xl text-xs font-sans shadow-2xl flex items-center gap-2.5 z-20 border border-slate-200"
            style={{ left: cursorX, top: 40 }}
          >
            <span className="font-bold tabular-nums">{hoverQty.toLocaleString()} units</span>
            <span className="text-slate-300">•</span>
            <span className={Math.abs(hoverQty - 1420) <= 35 ? "text-emerald-600 font-bold tabular-nums" : "text-amber-600 font-bold tabular-nums"}>
              ${hoverProfit.toLocaleString()} expected return
            </span>
          </div>
        )}
      </div>

      {/* Footer Ribbon */}
      <div className="px-6 py-3.5 border-t border-white/[0.08] bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>
            Hover across the ledger to observe how deviating from the critical fractile sweet spot (1,420 units) degrades financial returns.
          </span>
        </div>

        <div className="text-slate-500 text-[11px] font-mono">
          Analytical Ground Truth: F⁻¹(0.667)
        </div>
      </div>
    </div>
  );
}

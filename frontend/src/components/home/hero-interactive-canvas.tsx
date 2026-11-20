"use client";

import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

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

      // Deep obsidian background fill
      ctx.fillStyle = "#0A0D12";
      ctx.fillRect(0, 0, width, height);

      // Soft architectural drafting grid (fine glass lines)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
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

      // 1. Draw True Demand Gaussian Bell Curve (Luminous Emerald Sage)
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
      const sageGrad = ctx.createLinearGradient(0, 0, 0, baselineY);
      sageGrad.addColorStop(0, "rgba(52, 211, 153, 0.18)");
      sageGrad.addColorStop(1, "rgba(52, 211, 153, 0.01)");
      ctx.fillStyle = sageGrad;
      ctx.fill();

      // Sage curve line with subtle ambient glow
      ctx.shadowColor = "rgba(52, 211, 153, 0.4)";
      ctx.shadowBlur = 8;
      ctx.strokeStyle = "#34D399";
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow

      // 2. Draw Biased AI Distribution (Glowing Terracotta Dashed Curve)
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      for (let x = 0; x <= width; x += 3) {
        const exponent = -Math.pow(x - aiX, 2) / (2 * Math.pow(stdWidth * 1.15, 2));
        const bellY = baselineY - Math.exp(exponent) * (height * 0.46);
        if (x === 0) ctx.moveTo(x, bellY);
        else ctx.lineTo(x, bellY);
      }
      ctx.strokeStyle = "rgba(224, 122, 95, 0.85)";
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      // Baseline ground line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, baselineY);
      ctx.lineTo(width, baselineY);
      ctx.stroke();

      // 3. Mathematical Optimum Point (Spruce pin with breathing halo)
      const optPeakY = baselineY - height * 0.58;
      const breathingRadius = 4.5 + Math.sin(t * 2) * 1.2;

      ctx.beginPath();
      ctx.arc(optimalX, optPeakY, breathingRadius + 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(52, 211, 153, 0.25)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(optimalX, optPeakY, breathingRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#34D399";
      ctx.fill();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // 4. Biased AI Anchor Point (Terracotta pin)
      const aiPeakY = baselineY - height * 0.46;
      ctx.beginPath();
      ctx.arc(aiX, aiPeakY, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#E07A5F";
      ctx.fill();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Typography annotations on canvas
      ctx.font = "500 11px Inter, sans-serif";

      // Optimum label
      ctx.fillStyle = "#34D399";
      ctx.fillText("True Sweet Spot: 1,420 units", optimalX - 65, optPeakY - 14);

      // AI label
      ctx.fillStyle = "#E07A5F";
      ctx.fillText("AI Suggestion: 1,750 units (+23%)", aiX - 85, aiPeakY - 14);

      // Axis ticks and labels
      ctx.font = "400 10px Inter, sans-serif";
      ctx.fillStyle = "#64748B";
      ctx.fillText("1,000", width * 0.15, baselineY + 18);
      ctx.fillText("1,420 (Q*)", optimalX - 18, baselineY + 18);
      ctx.fillText("1,750 (AI)", aiX - 18, baselineY + 18);
      ctx.fillText("2,000", width * 0.88, baselineY + 18);

      // Hover vertical hairline guide
      if (cursorX !== null) {
        ctx.beginPath();
        ctx.setLineDash([2, 3]);
        ctx.moveTo(cursorX, 20);
        ctx.lineTo(cursorX, baselineY);
        ctx.strokeStyle = "rgba(248, 250, 252, 0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(cursorX, baselineY, 3.5, 0, Math.PI * 2);
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
    <div className="rounded-2xl border border-warm-border bg-canvas-subtle shadow-paper overflow-hidden transition-all">
      {/* Editorial Header Strip */}
      <div className="px-6 py-4 border-b border-warm-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-canvas/40">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-terracotta" />
          <span className="font-serif text-sm font-semibold text-ink-primary tracking-tight">
            An Interactive Decision Ledger
          </span>
          <span className="text-xs text-ink-muted">·</span>
          <span className="text-xs text-ink-muted">Q4 Semiconductor Allocation</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-ink-secondary">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sage inline-block" />
            <span>Optimal Demand (1,420)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-terracotta inline-block" />
            <span>AI Skew (1,750)</span>
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

        {/* Floating human-centric tooltip */}
        {isHovering && cursorX !== null && (
          <div
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-12 bg-white text-slate-950 px-3.5 py-1.5 rounded-xl text-xs font-sans shadow-lg flex items-center gap-2 z-10"
            style={{ left: cursorX, top: 40 }}
          >
            <span className="font-semibold">{hoverQty.toLocaleString()} units</span>
            <span className="text-slate-400">·</span>
            <span className={Math.abs(hoverQty - 1420) <= 35 ? "text-emerald-700 font-bold" : "text-amber-700 font-bold"}>
              ${hoverProfit.toLocaleString()} expected return
            </span>
          </div>
        )}
      </div>

      {/* Descriptive Handcrafted Footer Ribbon */}
      <div className="px-6 py-3.5 border-t border-warm-hairline bg-canvas/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-ink-secondary">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-terracotta shrink-0" />
          <span>
            Hover across the ledger to observe how moving away from the mathematical sweet spot (1,420 units) degrades financial returns.
          </span>
        </div>

        <div className="text-ink-muted text-[11px] font-sans">
          Ground truth: F⁻¹(0.667)
        </div>
      </div>
    </div>
  );
}

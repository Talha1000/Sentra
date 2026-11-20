"use client";

import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Activity, ShieldCheck, Cpu } from "lucide-react";

export function HeroInteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [hoverQty, setHoverQty] = useState<number>(1420);
  const [activeMode, setActiveMode] = useState<"all" | "particles" | "curves">("all");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };
    window.addEventListener("resize", handleResize);

    // Stochastic Monte Carlo particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }> = [];

    const numParticles = 48;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.2,
        alpha: Math.random() * 0.6 + 0.2,
        color: i % 3 === 0 ? "#B45309" : i % 3 === 1 ? "#1E6B4A" : "#2563EB",
      });
    }

    let t = 0;

    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Subtle editorial background grid
      ctx.strokeStyle = "rgba(226, 232, 240, 0.45)";
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 1. Draw Ground Truth Probability Density Curve (Bell curve)
      if (activeMode === "all" || activeMode === "curves") {
        const meanX = width * 0.48; // Optimal around 1420
        const stdX = width * 0.14;
        const baselineY = height - 50;

        ctx.beginPath();
        ctx.moveTo(0, baselineY);

        for (let x = 0; x <= width; x += 4) {
          const exponent = -Math.pow(x - meanX, 2) / (2 * Math.pow(stdX, 2));
          const bellHeight = Math.exp(exponent) * (height * 0.55);
          const y = baselineY - bellHeight;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, baselineY);
        ctx.closePath();

        // Subtle emerald gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, baselineY);
        gradient.addColorStop(0, "rgba(30, 107, 74, 0.18)");
        gradient.addColorStop(1, "rgba(30, 107, 74, 0.01)");
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = "rgba(30, 107, 74, 0.75)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // 2. Injected AI Skew Curve (Orange dashed curve skewed to the right)
        ctx.beginPath();
        ctx.setLineDash([5, 4]);
        const aiMeanX = width * 0.68; // AI at 1750 (+23% skew)
        for (let x = 0; x <= width; x += 4) {
          const exponent = -Math.pow(x - aiMeanX, 2) / (2 * Math.pow(stdX * 1.1, 2));
          const bellHeight = Math.exp(exponent) * (height * 0.42);
          const y = baselineY - bellHeight;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(180, 83, 9, 0.8)";
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash

        // Pin 1: Mathematical Ground Truth (1,420 units)
        const truthX = meanX;
        const truthY = baselineY - height * 0.55;

        ctx.beginPath();
        ctx.arc(truthX, truthY, 5 + Math.sin(t * 3) * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#1E6B4A";
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Pin 2: Biased AI Anchor (1,750 units)
        const aiX = aiMeanX;
        const aiY = baselineY - height * 0.42;

        ctx.beginPath();
        ctx.arc(aiX, aiY, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#B45309";
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Pulsing radar ring around AI pin
        const pulseRadius = 8 + (Math.sin(t * 4) + 1) * 6;
        ctx.beginPath();
        ctx.arc(aiX, aiY, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(180, 83, 9, 0.35)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Annotations
        ctx.font = "10px Inter, sans-serif";
        ctx.fillStyle = "#1E6B4A";
        ctx.fillText("Ground Truth: 1,420", truthX - 45, truthY - 14);

        ctx.fillStyle = "#B45309";
        ctx.fillText("Biased AI Rec: 1,750 (+23%)", aiX - 60, aiY - 18);
      }

      // 3. Monte Carlo Particles
      if (activeMode === "all" || activeMode === "particles") {
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        });
      }

      // 4. Hover vertical scanner
      if (hoverPos) {
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.moveTo(hoverPos.x, 0);
        ctx.lineTo(hoverPos.x, height);
        ctx.strokeStyle = "rgba(15, 23, 42, 0.5)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(hoverPos.x, hoverPos.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#0F172A";
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeMode, hoverPos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverPos({ x, y });

    // Approximate units between 1000 and 2000
    const ratio = Math.max(0, Math.min(1, x / canvas.width));
    const simulatedUnits = Math.round(1000 + ratio * 1000);
    setHoverQty(simulatedUnits);
  };

  const handleMouseLeave = () => {
    setHoverPos(null);
    setHoverQty(1420);
  };

  return (
    <div className="relative rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm overflow-hidden backdrop-blur-sm">
      {/* Top Telemetry Header */}
      <div className="px-5 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Live Stochastic Decision Field
          </span>
          <Badge variant="spruce">Active Simulation</Badge>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveMode("all")}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
              activeMode === "all" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"
            }`}
          >
            Composite View
          </button>
          <button
            onClick={() => setActiveMode("curves")}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
              activeMode === "curves" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"
            }`}
          >
            Distributions
          </button>
          <button
            onClick={() => setActiveMode("particles")}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
              activeMode === "particles" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"
            }`}
          >
            Monte Carlo
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative w-full h-[360px] cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full block"
        />

        {/* Hover telemetry badge overlay */}
        {hoverPos && (
          <div
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-12 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[11px] shadow-lg font-mono flex items-center gap-2 z-10"
            style={{ left: hoverPos.x, top: hoverPos.y }}
          >
            <span>Q = {hoverQty} units</span>
            <span className="text-slate-400">|</span>
            <span className={Math.abs(hoverQty - 1420) < 30 ? "text-emerald-400" : "text-amber-400"}>
              {Math.abs(hoverQty - 1420) < 30 ? "★ Optimal Match" : `Δ ${Math.abs(hoverQty - 1420)} units`}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Live Explanatory Ribbon */}
      <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
            <span>Green: Ground Truth Optimum ($F^{'{'}-1{'}'}(0.67)$)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" />
            <span>Amber: Injected AI Over-confidence (+23%)</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
            <span>Blue: 1,000 Monte Carlo Demand Draws</span>
          </div>
        </div>

        <span className="text-[11px] text-slate-400 font-mono">
          Hover across field to inspect real-time sensitivity
        </span>
      </div>
    </div>
  );
}

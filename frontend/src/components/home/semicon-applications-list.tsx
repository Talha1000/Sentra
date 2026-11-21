"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Cpu, FlaskConical, BarChart3, LayoutDashboard } from "lucide-react";

interface AppItem {
  code: string;
  category: string;
  title: string;
  desc: string;
  href: string;
  dotColor: string;
}

const APPLICATIONS: AppItem[] = [
  {
    code: "N01.",
    category: "TELEMETRY",
    title: "Executive Workstation",
    desc: "Real-time portfolio agreement rates, live anomaly alerts, and human-in-the-loop decision triage.",
    href: "/workspace",
    dotColor: "#00F0FF",
  },
  {
    code: "N02.",
    category: "OPTIMIZATION",
    title: "Monte Carlo Decision Studio",
    desc: "1,000-draw stochastic simulations calculating critical fractiles under asymmetric supply and demand risks.",
    href: "/decisions",
    dotColor: "#FF4400",
  },
  {
    code: "N03.",
    category: "RESEARCH LAB",
    title: "Cognitive Experiment Lab",
    desc: "Double-blind behavioral protocols measuring automation bias, decision fatigue, and operator override frequencies.",
    href: "/experiments",
    dotColor: "#A855F7",
  },
  {
    code: "N04.",
    category: "STATISTICAL EVIDENCE",
    title: "Evidence & Analytics",
    desc: "Rigorous empirical reporting with Welch’s t-tests, Cohen’s d effect sizes, and calibration error curves.",
    href: "/analytics",
    dotColor: "#10B981",
  },
  {
    code: "N05.",
    category: "COMPLIANCE & AUDIT",
    title: "Cryptographic Governance Ledger",
    desc: "Immutable HMAC SHA-256 decision provenance records ensuring auditability for regulators and board review.",
    href: "/governance",
    dotColor: "#00F0FF",
  },
];

export function SemiconApplicationsList() {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  return (
    <section id="applications" className="w-full">
      {/* Chapter 03 Header */}
      <div className="pb-4 mb-6 border-b border-black/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2 mb-2">
            <span className="text-black font-semibold">CHAPTER 03</span>
            <span>·</span>
            <span>SYSTEM ENGINES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight leading-tight">
            The Sentra Workstation Architecture
          </h2>
        </div>
        <div className="font-mono text-xs text-neutral-500 max-w-sm">
          <span>N03. BROAD ENTERPRISE DEPLOYMENT</span>
          <p className="font-sans text-xs text-neutral-600 mt-1">
            Five synchronized modules providing continuous mathematical calibration across operations.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Industrial Visualizer + Right Indexed Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Industrial Hardware / System Box */}
        <div className="lg:col-span-5 bg-[#0A0E17] border border-neutral-800 p-6 text-white relative overflow-hidden h-[460px] flex flex-col justify-between">
          <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

          {/* Top telemetry */}
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-neutral-800 text-[10px] font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="text-white font-semibold">ENGINE RUNTIME: ONLINE</span>
            </div>
            <span>PORT: 3000 // VER: 2.4.0</span>
          </div>

          {/* Center Visual Mockup of Decision Verification */}
          <div className="relative z-10 my-auto p-4 bg-neutral-900/80 border border-neutral-700 space-y-3 font-mono">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-neutral-800">
              <span className="text-[#00F0FF] font-semibold">HASH: a8f9...31c2</span>
              <span className="text-neutral-400 text-[10px]">SHA-256 COMMITTED</span>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between text-neutral-400">
                <span>DEMAND DIST:</span>
                <span className="text-white">Normal(μ=1,200, σ=300)</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>CRITICAL FRACTILE:</span>
                <span className="text-[#FF4400] font-bold">F*(Q) = 0.727</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>CALIBRATED TARGET:</span>
                <span className="text-[#00F0FF] font-bold">1,420 UNITS</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>AI SKEW REJECTED:</span>
                <span className="text-red-400 font-bold">+23.2% OVERESTIMATE</span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-[10px] text-neutral-400">
              <span>AGREEMENT STATUS:</span>
              <span className="text-emerald-400 font-bold">AUDIT CERTIFICATE READY</span>
            </div>
          </div>

          {/* Bottom link */}
          <div className="relative z-10 pt-4 border-t border-neutral-800 flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-400">
              CRYPTO LEDGER TAMPER-PROOF
            </span>
            <Link
              href="/governance"
              className="text-xs font-mono text-[#00F0FF] hover:underline flex items-center gap-1"
            >
              <span>VIEW AUDIT LEDGER</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: Indexed Application Rows with Hairline Separators */}
        <div className="lg:col-span-7 space-y-3">
          {APPLICATIONS.map((app) => (
            <Link
              key={app.code}
              href={app.href}
              onMouseEnter={() => setHoveredApp(app.code)}
              onMouseLeave={() => setHoveredApp(null)}
              className="block p-5 bg-white border border-black/[0.08] hover:border-black/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-200 group relative"
            >
              {/* Top Hairline Indicator */}
              <div className="flex items-center justify-between pb-2 border-b border-black/[0.05]">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: app.dotColor }}
                  />
                  <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                    {app.code} {app.category}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              {/* Title & Description */}
              <div className="mt-3">
                <h3 className="text-base font-bold text-black tracking-tight group-hover:text-neutral-900">
                  {app.title}
                </h3>
                <p className="text-xs text-neutral-600 font-sans mt-1 leading-relaxed">
                  {app.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

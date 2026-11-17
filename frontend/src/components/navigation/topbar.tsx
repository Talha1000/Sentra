"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import {
  Layers,
  FlaskConical,
  BarChart3,
  ShieldCheck,
  Play,
  Sparkles,
  Cpu,
  Activity,
  ArrowUpRight,
} from "lucide-react";

export function Topbar() {
  const pathname = usePathname();
  const [isSeeding, setIsSeeding] = useState(false);
  const [seededMsg, setSeededMsg] = useState<string | null>(null);

  const navItems = [
    { name: "Workspace", href: "/workspace", code: "§ 01", subtitle: "Ledger & Briefing" },
    { name: "Decision Studio", href: "/decisions", code: "§ 02", subtitle: "Stochastic Engine" },
    { name: "Experiment Lab", href: "/experiments", code: "§ 03", subtitle: "Cognitive Protocols" },
    { name: "Evidence & Stats", href: "/analytics", code: "§ 04", subtitle: "Welch t-Test & ECE" },
    { name: "Governance & Audit", href: "/governance", code: "§ 05", subtitle: "Chain of Custody" },
  ];

  const handleSeedDemo = async () => {
    setIsSeeding(true);
    try {
      const res = await api.fetch("/auth/demo-seed", { method: "POST" });
      if (res?.access_token) {
        api.setToken(res.access_token);
        setSeededMsg("SEEDED ✓");
        setTimeout(() => setSeededMsg(null), 3000);
      }
    } catch (e) {
      console.error(e);
      setSeededMsg("ERR");
      setTimeout(() => setSeededMsg(null), 3000);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <header className="border-b-2 border-ink-black bg-vellum-50 select-none sticky top-0 z-50">
      {/* Editorial Masthead Top Ticker */}
      <div className="border-b border-vellum-300 px-4 lg:px-8 py-1 flex items-center justify-between text-[10px] font-mono tracking-wider uppercase text-ink-muted bg-vellum-100">
        <div className="flex items-center gap-3">
          <span className="font-bold text-ink-black">SENTRA INSTITUTION</span>
          <span className="text-vellum-400">|</span>
          <span>HUMAN–MACHINE DECISION INTELLIGENCE & RESEARCH LABORATORY</span>
        </div>
        <div className="flex items-center gap-4 text-ink-charcoal">
          <span>VOL. IV — PROTOCOL ARCHIVE</span>
          <span className="text-vellum-400">|</span>
          <div className="flex items-center gap-1.5 font-bold text-spruce">
            <span className="w-1.5 h-1.5 bg-spruce inline-block" />
            <span>SYS.STATUS: SYNCHRONIZED</span>
          </div>
        </div>
      </div>

      {/* Primary Broadsheet Masthead */}
      <div className="px-4 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Masthead Title / Emblem */}
        <div className="flex items-center gap-4">
          <Link href="/workspace" className="flex items-baseline gap-2 group">
            <span className="font-serif font-black text-2xl lg:text-3xl tracking-tight text-ink-black uppercase group-hover:text-klein transition-colors">
              SENTRA
            </span>
            <span className="font-mono text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 bg-ink-black text-white">
              DISPATCH № 412
            </span>
          </Link>
          <div className="hidden xl:block pl-4 border-l-2 border-ink-black text-[10px] font-mono leading-tight text-ink-muted">
            <div className="font-bold text-ink-black uppercase">RESEARCH-GRADE INTELLIGENCE</div>
            <div>STOCHASTIC OPTIMIZATION & BIAS AUDIT</div>
          </div>
        </div>

        {/* Central Broadsheet Tab Navigation */}
        <nav className="flex items-stretch border-2 border-ink-black bg-vellum-100">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-2 text-left border-r-2 last:border-r-0 border-ink-black transition-colors relative flex flex-col justify-center",
                  isActive
                    ? "bg-ink-black text-white"
                    : "text-ink-charcoal hover:bg-vellum-200"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "text-[9px] font-mono font-bold tracking-wider",
                      isActive ? "text-klein-border" : "text-ink-muted"
                    )}
                  >
                    {item.code}
                  </span>
                  <span className="text-xs font-mono font-bold tracking-tight uppercase">
                    {item.name}
                  </span>
                </div>
                <div
                  className={cn(
                    "hidden 2xl:block text-[9px] font-mono leading-none mt-0.5",
                    isActive ? "text-vellum-300" : "text-ink-faint"
                  )}
                >
                  {item.subtitle}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Editorial Action Stamps */}
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSeedDemo}
            isLoading={isSeeding}
            className="text-[11px] h-9 px-3 gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amberacc" />
            <span>{seededMsg || "SEED COGNITIVE TEST SET"}</span>
          </Button>

          <Link href="/experiments/run/exp-inv-001">
            <Button
              variant="primary"
              size="sm"
              className="h-9 px-4 text-[11px] gap-2 bg-klein hover:bg-blue-700 text-white border-2 border-ink-black shadow-sharp"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>RUN PARTICIPANT TRIAL</span>
            </Button>
          </Link>

          <div className="h-9 px-2.5 border-2 border-ink-black bg-vellum-200 flex items-center justify-center font-mono font-bold text-xs text-ink-black">
            EXP-V2
          </div>
        </div>
      </div>

      {/* Sub-Masthead Telemetry Teletype */}
      <div className="border-t border-ink-black px-4 lg:px-8 py-1.5 bg-vellum-100 flex items-center justify-between text-[11px] font-mono text-ink-charcoal overflow-x-auto gap-4">
        <div className="flex items-center gap-5 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-ink-black uppercase">GROUND TRUTH MODEL:</span>
            <span className="text-spruce font-bold">DETERMINISTIC NEWVENDOR (F⁻¹(0.667))</span>
          </div>
          <span className="text-vellum-300">|</span>
          <div>
            ENROLLED COHORT: <span className="font-bold text-ink-black">N=45 (225 TRIALS LOGGED)</span>
          </div>
          <span className="text-vellum-300">|</span>
          <div>
            COGNITIVE ALIGNMENT: <span className="font-bold text-klein">76.4% OVER-RELIANCE RATE</span>
          </div>
          <span className="text-vellum-300">|</span>
          <div>
            CALIBRATION ERROR (ECE): <span className="font-bold text-vermilion">0.034 (HIGH SKEW)</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-ink-muted">
          <span>LATENCY: 6.2s SERVER BENCHMARK</span>
          <span className="text-vellum-300">|</span>
          <span className="text-ink-black font-bold uppercase">BROADSHEET VIEW 2.0</span>
        </div>
      </div>
    </header>
  );
}

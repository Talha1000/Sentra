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
  Terminal as TerminalIcon,
} from "lucide-react";

export function Topbar() {
  const pathname = usePathname();
  const [isSeeding, setIsSeeding] = useState(false);
  const [seededMsg, setSeededMsg] = useState<string | null>(null);

  const navItems = [
    { name: "Workspace", href: "/workspace", code: "01", icon: Layers },
    { name: "Decision Studio", href: "/decisions", code: "02", icon: Cpu },
    { name: "Experiment Lab", href: "/experiments", code: "03", icon: FlaskConical },
    { name: "Evidence & Stats", href: "/analytics", code: "04", icon: BarChart3 },
    { name: "Governance & Audit", href: "/governance", code: "05", icon: ShieldCheck },
  ];

  const handleSeedDemo = async () => {
    setIsSeeding(true);
    try {
      const res = await api.fetch("/auth/demo-seed", { method: "POST" });
      if (res?.access_token) {
        api.setToken(res.access_token);
        setSeededMsg("DATA SEEDED");
        setTimeout(() => setSeededMsg(null), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <header className="border-b border-obsidian-700 bg-obsidian-900 sticky top-0 z-50 select-none">
      {/* Primary Command Deck */}
      <div className="h-12 px-4 flex items-center justify-between gap-4">
        {/* Brand Terminal Identification */}
        <div className="flex items-center gap-3">
          <Link href="/workspace" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded bg-phosphor-cyan text-obsidian-950 flex items-center justify-center font-mono font-black text-xs tracking-tighter shadow-cyanGlow">
              S
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono font-bold text-sm tracking-widest text-terminal-text uppercase">
                SENTRA
              </span>
              <span className="font-mono text-[9px] text-phosphor-cyan tracking-wider">
                v1.0.0
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-obsidian-700 text-[10px] font-mono text-terminal-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-phosphor-green animate-pulse" />
            <span>NODE: ALPHA-7</span>
            <span className="text-obsidian-600">/</span>
            <span className="text-terminal-text">SOC2 AUDITED</span>
          </div>
        </div>

        {/* Central Segmented Terminal Navigation Switcher */}
        <nav className="flex items-center bg-obsidian-850 p-1 rounded border border-obsidian-700/80 gap-1 overflow-x-auto max-w-2xl">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1.5 transition-all shrink-0 uppercase tracking-wider font-medium",
                  isActive
                    ? "bg-obsidian-700 text-phosphor-cyan border border-phosphor-cyan/40 shadow-sm"
                    : "text-terminal-muted hover:text-terminal-text hover:bg-obsidian-800"
                )}
              >
                <span className={cn("text-[9px] font-bold", isActive ? "text-phosphor-cyan" : "text-terminal-dim")}>
                  {item.code}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Seed Demo & Launch Participant Runner */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSeedDemo}
            isLoading={isSeeding}
            className="text-[10px] h-7 px-2.5 gap-1 border-obsidian-700 bg-obsidian-800"
          >
            <Sparkles className="w-3 h-3 text-phosphor-amber" />
            <span>{seededMsg || "SEED DATA"}</span>
          </Button>

          <Link href="/experiments/run/exp-inv-001">
            <Button variant="primary" size="sm" className="h-7 px-3 text-[10px] gap-1.5">
              <Play className="w-3 h-3 fill-current" />
              <span>RUN TRIAL</span>
            </Button>
          </Link>

          <div className="w-7 h-7 rounded border border-obsidian-700 bg-obsidian-800 flex items-center justify-center text-[10px] font-mono font-bold text-terminal-text">
            EV
          </div>
        </div>
      </div>

      {/* Sub-Header Live Telemetry Strip */}
      <div className="h-7 px-4 bg-obsidian-950 border-t border-obsidian-700/60 flex items-center justify-between text-[10px] font-mono text-terminal-muted overflow-x-auto">
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 text-phosphor-green">
            <span className="w-1.5 h-1.5 rounded-full bg-phosphor-green animate-pulse" />
            <span>CORE ENGINE: DETERMINISTIC</span>
          </div>
          <span className="text-obsidian-600">|</span>
          <div>
            N=45 SUBJECTS <span className="text-terminal-text">(225 TRIALS LOGGED)</span>
          </div>
          <span className="text-obsidian-600">|</span>
          <div>
            AI AGREEMENT: <span className="text-phosphor-cyan font-bold">76.4%</span>
          </div>
          <span className="text-obsidian-600">|</span>
          <div>
            ECE: <span className="text-phosphor-amber font-bold">0.034</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-terminal-dim">
          <span>LATENCY: 6.2s SERVER CLOCK</span>
          <span className="text-obsidian-600">|</span>
          <span className="text-phosphor-cyan">LIVE OPERATIONAL MATRIX</span>
        </div>
      </div>
    </header>
  );
}

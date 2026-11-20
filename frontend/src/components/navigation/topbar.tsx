"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConceptDemystifierModal } from "@/components/ui/concept-demystifier-modal";
import { api } from "@/lib/api";
import {
  LayoutDashboard,
  FlaskConical,
  BarChart3,
  ShieldCheck,
  Play,
  Sparkles,
  Cpu,
  Layers,
  ChevronRight,
  BookOpen,
  Lightbulb,
} from "lucide-react";

export function Topbar() {
  const pathname = usePathname();
  const [isSeeding, setIsSeeding] = useState(false);
  const [seededMsg, setSeededMsg] = useState<string | null>(null);
  const [isDemystifierOpen, setIsDemystifierOpen] = useState(false);
  const [telemetry, setTelemetry] = useState<any>({
    engine_status: "ONLINE_DETERMINISTIC",
    active_cohort_count: 45,
    total_trials_conducted: 225,
    ai_agreement_rate_pct: 76.4,
    calibration_error_ece: 0.034,
    benchmark_latency_sec: 6.2,
  });

  useEffect(() => {
    let isMounted = true;
    api.fetch("/analytics/telemetry-overview")
      .then((data) => {
        if (isMounted && data?.active_cohort_count) {
          setTelemetry(data);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const navItems = [
    { name: "Workspace", href: "/workspace", icon: LayoutDashboard },
    { name: "Decision Studio", href: "/decisions", icon: Cpu },
    { name: "Experiments", href: "/experiments", icon: FlaskConical },
    { name: "Analytics & Evidence", href: "/analytics", icon: BarChart3 },
    { name: "Governance & Audit", href: "/governance", icon: ShieldCheck },
  ];

  const handleSeedDemo = async () => {
    setIsSeeding(true);
    try {
      const res = await api.fetch("/auth/demo-seed", { method: "POST" });
      if (res?.access_token) {
        api.setToken(res.access_token);
        setSeededMsg("Data Ready");
        setTimeout(() => setSeededMsg(null), 3000);
      }
    } catch (e) {
      console.error(e);
      setSeededMsg("Error");
      setTimeout(() => setSeededMsg(null), 3000);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-40 select-none shadow-xs">
      {/* Primary Navigation Bar */}
      <div className="h-16 px-4 sm:px-6 lg:px-8 max-w-[1520px] mx-auto flex items-center justify-between gap-4">
        {/* Brand & Organization */}
        <div className="flex items-center gap-3">
          <Link href="/workspace" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs group-hover:bg-brand-600 transition-colors">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900">
                  SENTRA
                </span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/80">
                  Platform
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Central Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-xl border border-slate-200/60">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all duration-150",
                  isActive
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-brand-600" : "text-slate-400")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsDemystifierOpen(true)}
            className="text-xs font-medium text-slate-700 bg-amber-50 hover:bg-amber-100 border-amber-200 gap-1.5"
            title="Open Plain English Guide & Concept Demystifier"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Plain English Guide</span>
            <span className="sm:hidden">Guide</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleSeedDemo}
            isLoading={isSeeding}
            className="text-xs font-medium text-slate-600 border-slate-200"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1.5" />
            <span>{seededMsg || "Seed Test Data"}</span>
          </Button>

          <Link href="/experiments/run/exp-inv-001">
            <Button
              variant="brand"
              size="sm"
              className="text-xs font-medium gap-1.5 shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Trial</span>
            </Button>
          </Link>

          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700 border border-slate-300">
            JD
          </div>
        </div>
      </div>

      {/* Sub-Header Live Status Strip */}
      <div className="h-8 px-4 sm:px-6 lg:px-8 max-w-[1520px] mx-auto border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 overflow-x-auto gap-4">
        <div className="flex items-center gap-4 shrink-0 text-[11px]">
          <div className="flex items-center gap-1.5 font-medium text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>Engine: {telemetry.engine_status}</span>
          </div>
          <span className="text-slate-300">|</span>
          <div>
            Enrolled Cohort: <strong className="text-slate-700 font-semibold">N = {telemetry.active_cohort_count} Subjects ({telemetry.total_trials_conducted} Trials)</strong>
          </div>
          <span className="text-slate-300">|</span>
          <div>
            AI Agreement: <strong className="text-blue-700 font-semibold">{telemetry.ai_agreement_rate_pct}%</strong>
          </div>
          <span className="text-slate-300">|</span>
          <div>
            Calibration Error (ECE): <strong className="text-emerald-700 font-semibold">{telemetry.calibration_error_ece}</strong>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 shrink-0 text-[11px] text-slate-400">
          <span>Latency: {telemetry.benchmark_latency_sec}s Benchmark</span>
          <span>•</span>
          <span>SOC2 Audited</span>
        </div>
      </div>

      {/* Omnipresent Concept Demystifier Modal */}
      <ConceptDemystifierModal
        isOpen={isDemystifierOpen}
        onClose={() => setIsDemystifierOpen(false)}
      />
    </header>
  );
}

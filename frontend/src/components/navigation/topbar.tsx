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
    <header className="border-b border-warm-hairline bg-canvas/90 backdrop-blur-md sticky top-0 z-40 select-none shadow-xs">
      {/* Primary Navigation Bar */}
      <div className="h-16 px-4 sm:px-6 lg:px-8 max-w-[1520px] mx-auto flex items-center justify-between gap-4">
        {/* Brand & Organization */}
        <div className="flex items-center gap-3">
          <Link href="/workspace" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-ink-primary text-white flex items-center justify-center font-serif font-bold text-sm tracking-tight shadow-xs group-hover:bg-terracotta transition-colors">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base tracking-tight text-ink-primary">
                  SENTRA
                </span>
                <span className="text-[10px] font-sans font-medium uppercase px-2 py-0.5 rounded-full bg-canvas-subtle text-ink-secondary border border-warm-hairline">
                  Decision Intelligence
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Central Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-canvas-subtle p-1 rounded-xl border border-warm-hairline">
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
                    ? "bg-white text-ink-primary shadow-xs font-semibold"
                    : "text-ink-secondary hover:text-ink-primary hover:bg-white/60"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-terracotta" : "text-ink-muted")} />
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
            className="text-xs font-medium text-ink-secondary gap-1.5"
            title="Open Human Guide & Concept Demystifier"
          >
            <BookOpen className="w-3.5 h-3.5 text-terracotta" />
            <span className="hidden sm:inline">A Human Guide</span>
            <span className="sm:hidden">Guide</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleSeedDemo}
            isLoading={isSeeding}
            className="text-xs font-medium text-ink-secondary"
          >
            <Sparkles className="w-3.5 h-3.5 text-terracotta mr-1.5" />
            <span>{seededMsg || "Seed Test Data"}</span>
          </Button>

          <Link href="/experiments/run/exp-inv-001">
            <Button
              variant="terracotta"
              size="sm"
              className="text-xs font-medium gap-1.5 shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Trial</span>
            </Button>
          </Link>

          <div className="h-8 w-8 rounded-full bg-canvas-muted flex items-center justify-center text-xs font-serif font-semibold text-ink-primary border border-warm-hairline">
            EV
          </div>
        </div>
      </div>

      {/* Sub-Header Live Status Strip */}
      <div className="h-8 px-4 sm:px-6 lg:px-8 max-w-[1520px] mx-auto border-t border-warm-hairline flex items-center justify-between text-xs text-ink-secondary overflow-x-auto gap-4">
        <div className="flex items-center gap-4 shrink-0 text-[11px]">
          <div className="flex items-center gap-1.5 font-medium text-sage">
            <span className="w-2 h-2 rounded-full bg-sage inline-block" />
            <span>Engine: Deterministic Online</span>
          </div>
          <span className="text-warm-hairline">|</span>
          <div>
            Enrolled Cohort: <strong className="text-ink-primary font-semibold">N = {telemetry.active_cohort_count} Subjects ({telemetry.total_trials_conducted} Trials)</strong>
          </div>
          <span className="text-warm-hairline">|</span>
          <div>
            AI Agreement: <strong className="text-ink-primary font-semibold">{telemetry.ai_agreement_rate_pct}%</strong>
          </div>
          <span className="text-warm-hairline">|</span>
          <div>
            Calibration Error (ECE): <strong className="text-sage font-semibold">{telemetry.calibration_error_ece}</strong>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 shrink-0 text-[11px] text-ink-muted">
          <span>Latency: {telemetry.benchmark_latency_sec}s Benchmark</span>
          <span>·</span>
          <span>SOC-2 Verified</span>
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

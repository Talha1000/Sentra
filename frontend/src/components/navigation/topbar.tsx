"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConceptDemystifierModal } from "@/components/ui/concept-demystifier-modal";
import { CommandPalette } from "./command-palette";
import { api } from "@/lib/api";
import {
  LayoutDashboard,
  FlaskConical,
  BarChart3,
  ShieldCheck,
  Play,
  Sparkles,
  Cpu,
  BookOpen,
  Menu,
  X,
  Search,
  Activity,
  Layers,
} from "lucide-react";

export function Topbar() {
  const pathname = usePathname();
  const [isSeeding, setIsSeeding] = useState(false);
  const [seededMsg, setSeededMsg] = useState<string | null>(null);
  const [isDemystifierOpen, setIsDemystifierOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [telemetry, setTelemetry] = useState<any>({
    engine_status: "ONLINE_DETERMINISTIC",
    active_cohort_count: 45,
    total_trials_conducted: 225,
    ai_agreement_rate_pct: 76.4,
    calibration_error_ece: 0.034,
    benchmark_latency_sec: 6.2,
  });

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    <header className="border-b border-white/[0.08] bg-[#07090E]/85 backdrop-blur-2xl sticky top-0 z-40 select-none shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      {/* Primary Navigation Bar */}
      <div className="h-16 px-4 sm:px-6 lg:px-8 max-w-[1520px] mx-auto flex items-center justify-between gap-4">
        {/* Brand & Organization */}
        <div className="flex items-center gap-3">
          <Link href="/workspace" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-70 blur-sm group-hover:opacity-100 transition duration-300" />
              <div className="relative w-8 h-8 rounded-xl bg-[#0F1523] border border-white/20 flex items-center justify-center font-bold text-sm text-white shadow-md">
                S
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                  SENTRA
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/25">
                  PRO STUDIO
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Central Clean Nav Links with Framer Motion Active Gliding Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-2xl border border-white/[0.08] backdrop-blur-md relative">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all duration-200 relative z-10",
                  isActive
                    ? "text-white font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5 transition-colors", isActive ? "text-indigo-400" : "text-slate-500")} />
                <span>{item.name}</span>

                {isActive && (
                  <motion.div
                    layoutId="topbar-active-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/25 to-purple-500/25 border border-indigo-400/40 shadow-[0_0_15px_rgba(99,102,241,0.25)] -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Command Palette Trigger */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.18] text-xs text-slate-400 hover:text-white transition-all cursor-pointer shadow-xs"
            title="Search or jump to (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden xl:inline">Search studio...</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.1] text-slate-300">⌘K</kbd>
          </button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsDemystifierOpen(true)}
            className="text-xs font-medium gap-1.5"
            title="Open Human Guide to Sentra Concepts"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Concept Guide</span>
            <span className="sm:hidden">Guide</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleSeedDemo}
            isLoading={isSeeding}
            className="text-xs font-medium gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{seededMsg || "Seed Demo Data"}</span>
          </Button>

          <Link href="/experiments/run/exp-inv-001">
            <Button
              variant="terracotta"
              size="sm"
              className="text-xs font-semibold gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Trial</span>
            </Button>
          </Link>

          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]">
            ST
          </div>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-white/[0.1] text-white hover:bg-white/[0.08] transition-colors ml-1"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-orange-400" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Sub-Header Live Telemetry Bar */}
      <div className="h-9 px-4 sm:px-6 lg:px-8 max-w-[1520px] mx-auto border-t border-white/[0.06] bg-black/20 flex items-center justify-between text-xs text-slate-400 overflow-x-auto gap-4">
        <div className="flex items-center gap-4 shrink-0 text-[11px]">
          <div className="flex items-center gap-2 font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Deterministic Engine: ACTIVE</span>
          </div>
          <span className="text-white/10">|</span>
          <div>
            Enrolled Cohort: <strong className="text-white font-semibold tabular-nums">N = {telemetry.active_cohort_count} ({telemetry.total_trials_conducted} Trials)</strong>
          </div>
          <span className="text-white/10">|</span>
          <div>
            AI Agreement: <strong className="text-white font-semibold tabular-nums">{telemetry.ai_agreement_rate_pct}%</strong>
          </div>
          <span className="text-white/10">|</span>
          <div>
            Calibration Error (ECE): <strong className="text-emerald-400 font-semibold tabular-nums">{telemetry.calibration_error_ece}</strong>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 shrink-0 text-[11px] text-slate-400">
          <span>Latency: <strong className="text-slate-300 font-medium tabular-nums">{telemetry.benchmark_latency_sec}s</strong></span>
          <span className="text-white/20">·</span>
          <span className="text-indigo-400 font-medium">SOC-2 Type II Active</span>
        </div>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/[0.1] bg-[#0D111A] p-4 space-y-2 shadow-2xl"
          >
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl text-xs font-medium transition-all",
                    isActive
                      ? "bg-indigo-500/20 text-white font-semibold border border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-indigo-400" : "text-slate-500")} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Omnipresent Concept Demystifier Modal */}
      <ConceptDemystifierModal
        isOpen={isDemystifierOpen}
        onClose={() => setIsDemystifierOpen(false)}
      />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenDemystifier={() => setIsDemystifierOpen(true)}
        onSeedDemo={handleSeedDemo}
      />
    </header>
  );
}

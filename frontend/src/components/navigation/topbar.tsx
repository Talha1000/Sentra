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
  Layers,
  ChevronRight,
  BookOpen,
  Menu,
  X,
  CheckCircle2,
  Search,
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
    <header className="border-b border-warm-hairline bg-canvas/90 backdrop-blur-md sticky top-0 z-40 select-none shadow-xs">
      {/* Primary Navigation Bar */}
      <div className="h-16 px-4 sm:px-6 lg:px-8 max-w-[1520px] mx-auto flex items-center justify-between gap-4">
        {/* Brand & Organization */}
        <div className="flex items-center gap-3">
          <Link href="/workspace" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-xl bg-ink-primary text-canvas flex items-center justify-center font-serif font-bold text-sm tracking-tight shadow-xs group-hover:bg-terracotta transition-colors"
            >
              S
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base tracking-tight text-ink-primary">
                  SENTRA
                </span>
                <span className="hidden sm:inline-block text-[10px] font-sans font-medium uppercase px-2 py-0.5 rounded-full bg-canvas-subtle text-ink-secondary border border-warm-hairline">
                  Platform
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Central Clean Nav Links with Framer Motion Active Gliding Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-canvas-subtle p-1 rounded-xl border border-warm-hairline relative">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors relative z-10",
                  isActive
                    ? "text-ink-primary font-semibold"
                    : "text-ink-secondary hover:text-ink-primary"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-terracotta" : "text-ink-muted")} />
                <span>{item.name}</span>

                {isActive && (
                  <motion.div
                    layoutId="topbar-active-pill"
                    className="absolute inset-0 rounded-lg bg-canvas-elevated shadow-xs border border-warm-borderStrong -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Command Palette Trigger */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCommandPaletteOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-warm-border bg-canvas-elevated hover:bg-canvas-subtle text-xs text-ink-muted hover:text-ink-primary transition-colors"
            title="Search or jump to (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-terracotta" />
            <span className="hidden xl:inline">Search...</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-canvas border border-warm-hairline">⌘K</kbd>
          </motion.button>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsDemystifierOpen(true)}
              className="text-xs font-medium text-ink-secondary gap-1.5 border-warm-border"
              title="Open A Human Guide to the Concepts"
            >
              <BookOpen className="w-3.5 h-3.5 text-terracotta" />
              <span className="hidden sm:inline">A Human Guide</span>
              <span className="sm:hidden">Guide</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSeedDemo}
              isLoading={isSeeding}
              className="text-xs font-medium text-ink-secondary border-warm-border"
            >
              <Sparkles className="w-3.5 h-3.5 text-terracotta mr-1.5" />
              <span>{seededMsg || "Seed Test Data"}</span>
            </Button>
          </motion.div>

          <Link href="/experiments/run/exp-inv-001">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="terracotta"
                size="sm"
                className="text-xs font-medium gap-1.5 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Trial</span>
              </Button>
            </motion.div>
          </Link>

          <div className="h-8 w-8 rounded-full bg-canvas-muted flex items-center justify-center text-xs font-serif font-semibold text-ink-primary border border-warm-hairline">
            EV
          </div>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg border border-warm-hairline text-ink-primary hover:bg-canvas-subtle transition-colors ml-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-terracotta" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sub-Header Live Status Strip */}
      <div className="h-8 px-4 sm:px-6 lg:px-8 max-w-[1520px] mx-auto border-t border-warm-hairline flex items-center justify-between text-xs text-ink-secondary overflow-x-auto gap-4">
        <div className="flex items-center gap-4 shrink-0 text-[11px]">
          <div className="flex items-center gap-1.5 font-medium text-sage">
            <span className="w-2 h-2 rounded-full bg-sage inline-block animate-pulse" />
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

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-warm-border bg-canvas-subtle p-4 space-y-2 shadow-paper-lg"
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
                    "flex items-center gap-3 p-2.5 rounded-xl text-xs font-medium transition-colors",
                    isActive
                      ? "bg-canvas-subtle text-ink-primary font-semibold border border-warm-border"
                      : "text-ink-secondary hover:text-ink-primary"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-terracotta" : "text-ink-muted")} />
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

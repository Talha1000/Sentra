"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LayoutDashboard,
  Cpu,
  FlaskConical,
  BarChart3,
  ShieldCheck,
  Play,
  BookOpen,
  Sparkles,
  ArrowRight,
  Calculator,
  Compass,
  Zap,
  CornerDownLeft,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface CommandItem {
  id: string;
  category: "Navigation" | "Scenarios" | "Protocols" | "Concepts" | "Actions";
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  action: () => void;
  keywords: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDemystifier?: () => void;
  onSeedDemo?: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenDemystifier,
  onSeedDemo,
}: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: CommandItem[] = [
    // Navigation
    {
      id: "nav-workspace",
      category: "Navigation",
      title: "Executive Workspace",
      subtitle: "Live telemetry across organizational human–AI decision streams",
      icon: LayoutDashboard,
      badge: "Command",
      action: () => {
        router.push("/workspace");
        onClose();
      },
      keywords: ["workspace", "dashboard", "overview", "portfolio", "telemetry"],
    },
    {
      id: "nav-decisions",
      category: "Navigation",
      title: "Decision Studio",
      subtitle: "Stochastic optimization, newsvendor math & Monte Carlo simulation",
      icon: Cpu,
      badge: "Stochastic",
      action: () => {
        router.push("/decisions");
        onClose();
      },
      keywords: ["decisions", "studio", "stochastic", "monte carlo", "newsvendor", "fractile"],
    },
    {
      id: "nav-experiments",
      category: "Navigation",
      title: "Behavioral Research Lab",
      subtitle: "Double-blind randomized trials with injected bias stressors",
      icon: FlaskConical,
      badge: "Research",
      action: () => {
        router.push("/experiments");
        onClose();
      },
      keywords: ["experiments", "lab", "trials", "behavioral", "over-reliance", "double blind"],
    },
    {
      id: "nav-analytics",
      category: "Navigation",
      title: "Evidence & Analytics",
      subtitle: "Welch t-tests, Cohen's d effect sizes & trust calibration curves",
      icon: BarChart3,
      badge: "Inference",
      action: () => {
        router.push("/analytics");
        onClose();
      },
      keywords: ["analytics", "statistics", "welch", "t-test", "cohen", "ece", "calibration"],
    },
    {
      id: "nav-governance",
      category: "Navigation",
      title: "Model Provenance & Audit Registry",
      subtitle: "Cryptographic HMAC SHA-256 tamper-evident chronological ledger",
      icon: ShieldCheck,
      badge: "Governance",
      action: () => {
        router.push("/governance");
        onClose();
      },
      keywords: ["governance", "audit", "sha256", "hmac", "compliance", "soc2", "model cards"],
    },

    // Actions
    {
      id: "act-run-trial",
      category: "Actions",
      title: "Run Participant Battery (EXP-INV-001)",
      subtitle: "Experience a live 5-scenario double-blind behavioral trial in browser",
      icon: Play,
      badge: "Interactive",
      action: () => {
        router.push("/experiments/run/exp-inv-001");
        onClose();
      },
      keywords: ["run", "trial", "test", "participate", "inventory battery"],
    },
    {
      id: "act-demystifier",
      category: "Actions",
      title: "Open Plain-English Guide to Concepts",
      subtitle: "Clear real-world analogies for fractiles, ECE, and cognitive bias",
      icon: BookOpen,
      badge: "Guide",
      action: () => {
        onClose();
        if (onOpenDemystifier) onOpenDemystifier();
      },
      keywords: ["guide", "help", "demystifier", "explain", "concepts", "plain english"],
    },
    {
      id: "act-seed-data",
      category: "Actions",
      title: "Seed 45-Participant Demo Cohort",
      subtitle: "Populate SQLite database with 225 empirical trials & telemetry",
      icon: Sparkles,
      badge: "Seeder",
      action: () => {
        onClose();
        if (onSeedDemo) onSeedDemo();
      },
      keywords: ["seed", "demo", "sample", "data", "participants", "reset"],
    },

    // Scenarios
    {
      id: "sc-semiconductor",
      category: "Scenarios",
      title: "Semiconductor Wafer Allocation",
      subtitle: "18-week lead time with high obsolescence holding cost",
      icon: Cpu,
      badge: "Hardware",
      action: () => {
        router.push("/decisions");
        onClose();
      },
      keywords: ["semiconductor", "wafer", "hardware", "manufacturing", "allocation"],
    },
    {
      id: "sc-coldchain",
      category: "Scenarios",
      title: "Vaccine Cold-Chain Logistics",
      subtitle: "Zero stockout tolerance ($120 penalty) with asymmetric demand",
      icon: Compass,
      badge: "Pharma",
      action: () => {
        router.push("/decisions");
        onClose();
      },
      keywords: ["vaccine", "cold chain", "pharma", "healthcare", "logistics", "stockout"],
    },
    {
      id: "sc-cloud",
      category: "Scenarios",
      title: "GPU Reserved Capacity Commitment",
      subtitle: "Elastic spot thresholds versus 3-year reservation commitments",
      icon: Zap,
      badge: "Cloud",
      action: () => {
        router.push("/decisions");
        onClose();
      },
      keywords: ["gpu", "compute", "cloud", "instance", "capacity", "reservation"],
    },

    // Concepts
    {
      id: "c-fractile",
      category: "Concepts",
      title: "Critical Fractile: F⁻¹(Cu / (Cu + Co))",
      subtitle: "Optimal inventory target balancing underage penalty vs overage holding loss",
      icon: Calculator,
      badge: "Math",
      action: () => {
        onClose();
        if (onOpenDemystifier) onOpenDemystifier();
      },
      keywords: ["critical fractile", "newsvendor", "formula", "cu", "co", "underage", "overage"],
    },
    {
      id: "c-overreliance",
      category: "Concepts",
      title: "Cognitive Over-Reliance",
      subtitle: "Human tendency to defer uncritically to articulate generative advice",
      icon: Compass,
      badge: "Behavioral",
      action: () => {
        onClose();
        if (onOpenDemystifier) onOpenDemystifier();
      },
      keywords: ["cognitive", "over-reliance", "psychology", "bias", "complacency", "trust"],
    },
    {
      id: "c-ece",
      category: "Concepts",
      title: "Expected Calibration Error (ECE)",
      subtitle: "Empirical reliability metric measuring gap between AI confidence and ground truth",
      icon: BarChart3,
      badge: "Metrics",
      action: () => {
        onClose();
        if (onOpenDemystifier) onOpenDemystifier();
      },
      keywords: ["ece", "expected calibration error", "reliability", "confidence", "calibration"],
    },
  ];

  const filtered = items.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Global Keyboard shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette on Ctrl+K or Cmd+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent, or if we trigger
        }
      }

      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  // Group filtered items by category
  const categories = Array.from(new Set(filtered.map((i) => i.category)));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-[#0D111A]/95 backdrop-blur-2xl border border-white/[0.12] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 flex flex-col max-h-[75vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.08] bg-white/[0.02]">
              <Search className="w-4 h-4 text-indigo-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search modules, decision cases, protocols, or math concepts..."
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none font-sans"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-slate-400 uppercase px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.1]">
                <span>esc</span>
              </div>
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400 space-y-1">
                  <p>No results found for "{query}".</p>
                  <p className="text-[11px] text-slate-500">Try searching for "fractile", "workspace", "trial", or "audit".</p>
                </div>
              ) : (
                categories.map((category) => {
                  const catItems = filtered.filter((i) => i.category === category);
                  return (
                    <div key={category} className="space-y-1.5">
                      <span className="px-3 text-[10px] font-semibold text-indigo-400 uppercase tracking-wider block">
                        {category}
                      </span>
                      <div className="space-y-1">
                        {catItems.map((item) => {
                          const itemGlobalIndex = filtered.findIndex((i) => i.id === item.id);
                          const isSelected = itemGlobalIndex === selectedIndex;
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={item.action}
                              onMouseEnter={() => setSelectedIndex(itemGlobalIndex)}
                              className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-indigo-500/20 text-white shadow-sm border border-indigo-500/35"
                                  : "text-slate-300 hover:bg-white/[0.04] hover:text-white border border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div
                                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? "bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-sm"
                                      : "bg-white/[0.05] text-slate-400 border border-white/[0.08]"
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="truncate">
                                  <div className="text-xs font-semibold text-white truncate">
                                    {item.title}
                                  </div>
                                  <div className="text-[11px] text-slate-400 truncate font-sans">
                                    {item.subtitle}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 ml-3">
                                {item.badge && (
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                                    {item.badge}
                                  </span>
                                )}
                                {isSelected && (
                                  <CornerDownLeft className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Keyboard Navigation Shortcuts Bar */}
            <div className="px-5 py-3 bg-[#090D15] border-t border-white/[0.08] flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.1] font-mono text-[9px] text-slate-300">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.1] font-mono text-[9px] text-slate-300">↓</kbd>
                  <span>navigate</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.1] font-mono text-[9px] text-slate-300">↵</kbd>
                  <span>select</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.1] font-mono text-[9px] text-slate-300">esc</kbd>
                  <span>dismiss</span>
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)] inline-block" />
                <span>Deterministic Workstation</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

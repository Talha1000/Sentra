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
      title: "Decisions Dashboard",
      subtitle: "Overview of your team's business plans, forecasts, and outcomes",
      icon: LayoutDashboard,
      badge: "Dashboard",
      action: () => {
        router.push("/workspace");
        onClose();
      },
      keywords: ["workspace", "dashboard", "overview", "portfolio", "plans"],
    },
    {
      id: "nav-decisions",
      category: "Navigation",
      title: "Plan & Test a Decision",
      subtitle: "Find the most profitable order quantity before spending budget",
      icon: Cpu,
      badge: "Planning",
      action: () => {
        router.push("/decisions");
        onClose();
      },
      keywords: ["decisions", "plan", "forecast", "profit", "order quantity"],
    },
    {
      id: "nav-experiments",
      category: "Navigation",
      title: "Decision Simulations",
      subtitle: "Test how your team and plans respond to unexpected sales spikes or drops",
      icon: FlaskConical,
      badge: "Simulations",
      action: () => {
        router.push("/experiments");
        onClose();
      },
      keywords: ["simulations", "scenarios", "practice", "trials", "stress test"],
    },
    {
      id: "nav-analytics",
      category: "Navigation",
      title: "Reports & Insights",
      subtitle: "Visual charts showing money saved, profit earned, and team accuracy",
      icon: BarChart3,
      badge: "Reports",
      action: () => {
        router.push("/analytics");
        onClose();
      },
      keywords: ["analytics", "reports", "insights", "profit", "savings", "accuracy"],
    },
    {
      id: "nav-governance",
      category: "Navigation",
      title: "Decision History & Approvals",
      subtitle: "Tamper-proof record of every approved business decision and sign-off",
      icon: ShieldCheck,
      badge: "Approvals",
      action: () => {
        router.push("/governance");
        onClose();
      },
      keywords: ["governance", "history", "approvals", "audit", "compliance", "sign-off"],
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
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[75vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-200 bg-slate-50/50">
              <Search className="w-4 h-4 text-blue-600 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search modules, decision cases, protocols, or concepts..."
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-sans"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400 uppercase px-2 py-0.5 rounded-md bg-white border border-slate-200">
                <span>esc</span>
              </div>
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500 space-y-1">
                  <p>No results found for "{query}".</p>
                  <p className="text-[11px] text-slate-400">Try searching for "fractile", "workspace", "trial", or "audit".</p>
                </div>
              ) : (
                categories.map((category) => {
                  const catItems = filtered.filter((i) => i.category === category);
                  return (
                    <div key={category} className="space-y-1">
                      <span className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                        {category}
                      </span>
                      <div className="space-y-0.5">
                        {catItems.map((item) => {
                          const itemGlobalIndex = filtered.findIndex((i) => i.id === item.id);
                          const isSelected = itemGlobalIndex === selectedIndex;
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={item.action}
                              onMouseEnter={() => setSelectedIndex(itemGlobalIndex)}
                              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                                isSelected
                                  ? "bg-blue-50 text-blue-900 border border-blue-200 shadow-xs"
                                  : "text-slate-700 hover:bg-slate-50 border border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? "bg-blue-600 text-white"
                                      : "bg-slate-100 text-slate-500 border border-slate-200"
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="truncate">
                                  <div className="text-xs font-semibold text-slate-900 truncate">
                                    {item.title}
                                  </div>
                                  <div className="text-[11px] text-slate-500 truncate font-sans">
                                    {item.subtitle}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 ml-3">
                                {item.badge && (
                                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                    {item.badge}
                                  </span>
                                )}
                                {isSelected && (
                                  <CornerDownLeft className="w-3.5 h-3.5 text-blue-600" />
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
            <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-600">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-600">↓</kbd>
                  <span>navigate</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-600">↵</kbd>
                  <span>select</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-600">esc</kbd>
                  <span>dismiss</span>
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-emerald-700 font-medium text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                <span>Deterministic Workstation</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

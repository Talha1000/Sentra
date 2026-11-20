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
            className="relative w-full max-w-2xl bg-canvas border border-warm-borderStrong rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[75vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-warm-hairline bg-canvas-elevated/80">
              <Search className="w-4 h-4 text-ink-muted shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search modules, decision cases, protocols, or math concepts..."
                className="w-full bg-transparent text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none font-sans"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded text-ink-muted hover:text-ink-primary"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-ink-muted uppercase px-2 py-0.5 rounded bg-canvas border border-warm-hairline">
                <span>esc</span>
              </div>
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-4">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-xs text-ink-muted space-y-1">
                  <p>No results found for "{query}".</p>
                  <p className="text-[11px]">Try searching for "fractile", "workspace", "trial", or "audit".</p>
                </div>
              ) : (
                categories.map((category) => {
                  const catItems = filtered.filter((i) => i.category === category);
                  return (
                    <div key={category} className="space-y-1">
                      <span className="px-3 text-[10px] font-sans font-semibold text-ink-muted uppercase tracking-wider block">
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
                              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                                isSelected
                                  ? "bg-canvas-elevated text-ink-primary shadow-xs border border-warm-border"
                                  : "text-ink-secondary hover:bg-canvas-subtle hover:text-ink-primary border border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? "bg-terracotta text-white"
                                      : "bg-canvas-subtle text-ink-muted border border-warm-hairline"
                                  }`}
                                >
                                  <Icon className="w-3.5 h-3.5" />
                                </div>
                                <div className="truncate">
                                  <div className="text-xs font-semibold font-serif text-ink-primary truncate">
                                    {item.title}
                                  </div>
                                  <div className="text-[11px] text-ink-muted truncate font-sans">
                                    {item.subtitle}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 ml-3">
                                {item.badge && (
                                  <span className="text-[10px] font-sans px-2 py-0.5 rounded-md bg-canvas-subtle text-ink-muted border border-warm-hairline">
                                    {item.badge}
                                  </span>
                                )}
                                {isSelected && (
                                  <CornerDownLeft className="w-3.5 h-3.5 text-terracotta animate-pulse" />
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
            <div className="px-4 py-2.5 bg-canvas-elevated/90 border-t border-warm-hairline flex items-center justify-between text-[11px] text-ink-muted">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-canvas border border-warm-hairline font-mono text-[9px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-canvas border border-warm-hairline font-mono text-[9px]">↓</kbd>
                  <span>navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-canvas border border-warm-hairline font-mono text-[9px]">↵</kbd>
                  <span>select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-canvas border border-warm-hairline font-mono text-[9px]">esc</kbd>
                  <span>dismiss</span>
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-sage font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />
                <span>Deterministic Workstation</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ConceptDemystifierModal } from "@/components/ui/concept-demystifier-modal";
import { CommandPalette } from "./command-palette";
import { api } from "@/lib/api";
import {
  LayoutDashboard,
  FlaskConical,
  BarChart3,
  ShieldCheck,
  Cpu,
  BookOpen,
  Search,
  Plus,
} from "lucide-react";

export function Topbar() {
  const pathname = usePathname();
  const [isDemystifierOpen, setIsDemystifierOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [telemetry, setTelemetry] = useState<any>({
    engine_status: "ONLINE_DETERMINISTIC",
    active_cohort_count: 45,
    total_trials_conducted: 225,
  });

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
    { name: "Dashboard", href: "/workspace", icon: LayoutDashboard },
    { name: "Plan Decisions", href: "/decisions", icon: Cpu },
    { name: "Simulations", href: "/experiments", icon: FlaskConical },
    { name: "Reports", href: "/analytics", icon: BarChart3 },
    { name: "Approvals", href: "/governance", icon: ShieldCheck },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 select-none shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          
          {/* Brand & Organization */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-xs">
                S
              </div>
              <div>
                <span className="font-bold text-base text-slate-900 tracking-tight">
                  Sentra
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs text-slate-500 font-medium">
                  Smart Decision Planning
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors flex items-center gap-2",
                      isActive
                        ? "bg-slate-900 text-white font-semibold shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-slate-400")} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 text-xs text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search...</span>
              <kbd className="font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded-full text-slate-400">⌘K</kbd>
            </button>

            <button
              onClick={() => setIsDemystifierOpen(true)}
              className="btn-secondary text-xs py-2 px-3 hidden sm:inline-flex"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-500 mr-1.5" />
              <span>Plain English Guide</span>
            </button>

            <Link
              href="/decisions"
              className="btn-primary text-xs py-2 px-3.5"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>Plan a Decision</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Demystifier Modal */}
      <ConceptDemystifierModal
        isOpen={isDemystifierOpen}
        onClose={() => setIsDemystifierOpen(false)}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenDemystifier={() => {
          setIsCommandPaletteOpen(false);
          setIsDemystifierOpen(true);
        }}
      />
    </header>
  );
}

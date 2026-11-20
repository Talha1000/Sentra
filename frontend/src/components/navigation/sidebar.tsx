"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ConceptDemystifierModal } from "@/components/ui/concept-demystifier-modal";
import {
  LayoutDashboard,
  Cpu,
  FlaskConical,
  BarChart3,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Settings,
  HelpCircle,
  BookOpen,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDemystifierOpen, setIsDemystifierOpen] = useState(false);

  const navigation = [
    { name: "Workspace", href: "/workspace", icon: LayoutDashboard },
    { name: "Decision Studio", href: "/decisions", icon: Layers },
    { name: "Research Lab", href: "/experiments", icon: FlaskConical },
    { name: "Evidence & Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Governance & Audit", href: "/governance", icon: ShieldCheck },
  ];

  return (
    <aside
      className={cn(
        "h-screen bg-canvas border-r border-warm-hairline flex flex-col justify-between transition-all duration-200 select-none sticky top-0 z-40",
        isCollapsed ? "w-16" : "w-60"
      )}
    >
      <div>
        {/* Brand Header */}
        <div className="h-16 border-b border-warm-hairline flex items-center justify-between px-4">
          <Link href="/workspace" className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded-xl bg-ink-primary flex items-center justify-center text-white font-serif font-bold text-xs shrink-0">
              S
            </div>
            {!isCollapsed && (
              <span className="font-serif font-semibold text-sm tracking-wider text-ink-primary">
                SENTRA
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 text-ink-muted hover:text-ink-primary hover:bg-canvas-subtle rounded-lg transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Section: Platform Navigation */}
        <div className="p-3">
          {!isCollapsed && (
            <div className="px-3 py-1.5 text-[10px] font-sans font-medium uppercase tracking-wider text-ink-muted">
              Core Modules
            </div>
          )}
          <nav className="space-y-1 mt-1">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors",
                    isActive
                      ? "bg-canvas-subtle text-ink-primary border border-warm-border shadow-xs font-semibold"
                      : "text-ink-secondary hover:text-ink-primary hover:bg-canvas-subtle"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-terracotta" : "text-ink-muted")} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info & Protocol Badge */}
      <div className="p-3 border-t border-warm-hairline space-y-2">
        <button
          onClick={() => setIsDemystifierOpen(true)}
          className={cn(
            "w-full py-2 px-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors bg-white text-ink-secondary border border-warm-hairline hover:bg-canvas-subtle hover:text-ink-primary shadow-xs",
            isCollapsed && "justify-center px-1"
          )}
          title="Open Human Guide"
        >
          <BookOpen className="w-3.5 h-3.5 text-terracotta shrink-0" />
          {!isCollapsed && <span>A Human Guide</span>}
        </button>

        {!isCollapsed && (
          <div className="px-3 py-2 rounded-xl bg-canvas-subtle border border-warm-hairline">
            <div className="text-[10px] font-sans text-ink-muted uppercase flex items-center justify-between">
              <span>Environment</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            </div>
            <div className="text-xs font-medium text-ink-primary mt-0.5 truncate">
              Deterministic Ready
            </div>
          </div>
        )}
        <div className="flex items-center justify-between px-2 pt-1 text-xs text-ink-muted">
          {!isCollapsed && <span className="text-[11px] font-sans">v1.0.0</span>}
          <button
            onClick={() => setIsDemystifierOpen(true)}
            className="hover:text-ink-primary"
            title="Help & Concept Guide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ConceptDemystifierModal
        isOpen={isDemystifierOpen}
        onClose={() => setIsDemystifierOpen(false)}
      />
    </aside>
  );
}

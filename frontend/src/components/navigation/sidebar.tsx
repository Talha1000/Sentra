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
  Layers,
  HelpCircle,
  BookOpen,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDemystifierOpen, setIsDemystifierOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/workspace", icon: LayoutDashboard },
    { name: "Plan Decisions", href: "/decisions", icon: Layers },
    { name: "Simulations", href: "/experiments", icon: FlaskConical },
    { name: "Reports", href: "/analytics", icon: BarChart3 },
    { name: "Approvals", href: "/governance", icon: ShieldCheck },
  ];

  return (
    <aside
      className={cn(
        "h-screen bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-200 select-none sticky top-0 z-40 shadow-xs",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div>
        {/* Brand Header */}
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-4">
          <Link href="/workspace" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs">
              S
            </div>
            {!isCollapsed && (
              <span className="font-bold text-sm tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Sentra
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Section: Platform Navigation */}
        <div className="p-3">
          {!isCollapsed && (
            <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Navigation
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
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-slate-100 text-blue-700 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-blue-600" : "text-slate-400")} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info & Guide */}
      <div className="p-3 border-t border-slate-200 space-y-2">
        <button
          onClick={() => setIsDemystifierOpen(true)}
          className={cn(
            "w-full py-2 px-3 rounded-lg text-xs font-medium flex items-center gap-2 transition-all bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 cursor-pointer",
            isCollapsed && "justify-center px-1"
          )}
          title="Open Business Guide"
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          {!isCollapsed && <span>Plain-English Guide</span>}
        </button>

        {!isCollapsed && (
          <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center justify-between font-semibold">
              <span>Status</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <div className="text-xs font-medium text-slate-700 mt-0.5 truncate">
              All Systems Operational
            </div>
          </div>
        )}
        <div className="flex items-center justify-between px-2 pt-1 text-xs text-slate-400">
          {!isCollapsed && <span className="text-[11px] font-mono">v1.2.0</span>}
          <button
            onClick={() => setIsDemystifierOpen(true)}
            className="hover:text-slate-700 transition-colors cursor-pointer"
            title="Help & Business Guide"
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

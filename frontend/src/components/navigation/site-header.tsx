"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Search } from "lucide-react";

interface SiteHeaderProps {
  onOpenDemystifier: () => void;
  onOpenCommandPalette?: () => void;
}

const NAV_LINKS = [
  { name: "Overview", href: "/workspace" },
  { name: "Plan Decisions", href: "/decisions" },
  { name: "Simulations", href: "/experiments" },
  { name: "Reports", href: "/analytics" },
  { name: "Approvals", href: "/governance" },
];

export function SiteHeader({ onOpenDemystifier, onOpenCommandPalette }: SiteHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 select-none shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-xs">
                S
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-900 tracking-tight">
                  Sentra
                </span>
                <span className="hidden sm:inline-block text-xs font-medium text-slate-500">
                  Smart Decision Planning
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-3">
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Search</span>
                <kbd className="font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400">⌘K</kbd>
              </button>
            )}

            <button
              onClick={onOpenDemystifier}
              className="btn-secondary text-xs py-2 px-3.5 hidden sm:inline-flex"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
              <span>Plain English Guide</span>
            </button>

            <Link
              href="/workspace"
              className="btn-primary text-xs py-2 px-4"
            >
              <span>Start Planning</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}

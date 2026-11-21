"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, BookOpen, Search } from "lucide-react";

interface SiteHeaderProps {
  onOpenDemystifier: () => void;
  onOpenCommandPalette?: () => void;
}

const NAV_LINKS = [
  { name: "Workspace", href: "/workspace" },
  { name: "Decision Studio", href: "/decisions" },
  { name: "Research Lab", href: "/experiments" },
  { name: "Analytics", href: "/analytics" },
  { name: "Governance", href: "/governance" },
];

export function SiteHeader({ onOpenDemystifier, onOpenCommandPalette }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0C0E]/90 backdrop-blur-md border-b border-white/[0.08] select-none">
      <div className="max-w-6xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md bg-white text-black flex items-center justify-center font-bold text-xs tracking-tighter shadow-sm">
              S
            </div>
            <span className="font-semibold text-sm tracking-tight text-white group-hover:text-neutral-300 transition-colors">
              SENTRA
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-neutral-400">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.09] rounded-xl transition-all shadow-sm"
              title="Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5" />
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-neutral-300">⌘K</kbd>
            </button>
          )}

          <button
            onClick={onOpenDemystifier}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-neutral-200 hover:text-white bg-gradient-to-b from-[#242831] via-[#1B1E26] to-[#14161C] border border-white/[0.1] border-b-black/40 shadow-[0_1px_2px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.14)] hover:from-[#2A2F3A] hover:to-[#1E212A] rounded-xl transition-all active:scale-[0.985]"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Guide</span>
          </button>

          <Link
            href="/workspace"
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-b from-[#FFFFFF] via-[#FAFBFD] to-[#EFF1F5] text-neutral-900 border border-black/[0.08] border-b-black/[0.2] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_3px_8px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.04)] hover:from-[#FFFFFF] hover:to-[#F4F6F9] hover:shadow-[0_3px_12px_rgba(0,0,0,0.09),inset_0_1px_0_rgba(255,255,255,1)] active:translate-y-[0.5px] active:scale-[0.985] text-xs font-semibold rounded-xl transition-all"
          >
            <span>Launch Workspace</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0F1115] px-6 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-neutral-300 hover:text-white py-1"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemystifier();
              }}
              className="text-xs text-blue-400 flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Open Concept Guide</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

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
        <div className="flex items-center gap-3">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="hidden lg:flex items-center gap-2 px-2.5 py-1 text-xs text-neutral-400 hover:text-white border border-white/[0.08] hover:border-white/[0.16] rounded-md transition-colors"
              title="Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="font-mono text-[10px]">⌘K</span>
            </button>
          )}

          <button
            onClick={onOpenDemystifier}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-300 hover:text-white border border-white/[0.08] hover:border-white/[0.16] rounded-md transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Guide</span>
          </button>

          <Link
            href="/workspace"
            className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-black hover:bg-neutral-200 text-xs font-medium rounded-md transition-colors shadow-sm"
          >
            <span>Launch Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
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

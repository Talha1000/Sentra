"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ListFilter, ChevronDown, Compass } from "lucide-react";

export interface SectionIndexItem {
  id: string;
  number: string;
  label: string;
  title: string;
}

export const HOMEPAGE_SECTIONS: SectionIndexItem[] = [
  { id: "overview", number: "I", label: "The Premise", title: "Overview & Stochastic Ledger" },
  { id: "visual-tour", number: "II", label: "Simulation", title: "Motion Simulation Tour" },
  { id: "how-it-works", number: "III", label: "Architecture", title: "4-Part Safeguard in Plain English" },
  { id: "simulator", number: "IV", label: "Stressor", title: "Hands-On Decision Dilemma" },
  { id: "systems", number: "V", label: "Systems", title: "Five Thoughtful Workstation Systems" },
  { id: "cases", number: "VI", label: "Case Studies", title: "Consequential Industry Applications" },
  { id: "faq", number: "VII", label: "Knowledge", title: "Questions & Epistemic FAQ" },
  { id: "cta", number: "VIII", label: "Evaluation", title: "Immediate Institutional Trial" },
];

export function SectionNavigator() {
  const [activeId, setActiveId] = useState<string>("overview");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    HOMEPAGE_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsExpanded(false);
    }
  };

  const activeIndex = HOMEPAGE_SECTIONS.findIndex((s) => s.id === activeId);
  const activeItem = HOMEPAGE_SECTIONS[activeIndex] || HOMEPAGE_SECTIONS[0];

  return (
    <>
      {/* Desktop Floating Right-Side Spine Navigation */}
      <aside
        aria-label="Table of Contents"
        className="hidden xl:block fixed right-6 top-1/2 -translate-y-1/2 z-30 select-none"
      >
        <div className="p-3 rounded-2xl bg-canvas-elevated/70 backdrop-blur-md border border-warm-hairline shadow-paper space-y-2 max-w-[200px]">
          <div className="flex items-center gap-1.5 px-2 pb-2 border-b border-warm-hairline text-[10px] font-sans font-semibold uppercase tracking-wider text-ink-muted">
            <Compass className="w-3 h-3 text-terracotta" />
            <span>Table of Contents</span>
          </div>

          <nav className="space-y-0.5">
            {HOMEPAGE_SECTIONS.map((sec) => {
              const isActive = sec.id === activeId;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-sans transition-all flex items-center justify-between gap-2 group ${
                    isActive
                      ? "bg-canvas-subtle text-ink-primary font-semibold border border-warm-border"
                      : "text-ink-muted hover:text-ink-primary hover:bg-canvas-subtle/50"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className={`font-mono text-[10px] ${
                        isActive ? "text-terracotta font-bold" : "text-ink-muted"
                      }`}
                    >
                      {sec.number}
                    </span>
                    <span className="truncate">{sec.label}</span>
                  </div>

                  {isActive && (
                    <motion.span
                      layoutId="toc-active-dot"
                      className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0 shadow-[0_0_6px_rgba(224,122,95,0.8)]"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Floating Bottom Chapter Pill */}
      <div className="xl:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none">
        <div className="relative">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-canvas-elevated/90 backdrop-blur-md border border-warm-borderStrong shadow-paper-lg text-xs font-medium text-ink-primary"
          >
            <span className="font-mono text-[10px] text-terracotta font-bold">
              Chapter {activeItem.number}
            </span>
            <span>{activeItem.label}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-ink-muted transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {isExpanded && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-2 rounded-2xl bg-canvas-elevated/95 backdrop-blur-md border border-warm-borderStrong shadow-2xl space-y-1">
              <span className="text-[10px] uppercase font-semibold text-ink-muted px-2 py-1 block border-b border-warm-hairline">
                Jump to Chapter
              </span>
              <div className="max-h-60 overflow-y-auto space-y-0.5">
                {HOMEPAGE_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollTo(sec.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                      sec.id === activeId
                        ? "bg-canvas-subtle text-ink-primary font-semibold border border-warm-border"
                        : "text-ink-secondary hover:bg-canvas-subtle/50"
                    }`}
                  >
                    <span className="font-mono text-[10px] text-ink-muted mr-2">{sec.number}</span>
                    <span className="truncate flex-1">{sec.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

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
        <div className="p-3.5 rounded-2xl bg-[#0D111A]/85 backdrop-blur-xl border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-2.5 max-w-[210px]">
          <div className="flex items-center gap-1.5 px-2 pb-2 border-b border-white/[0.06] text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Table of Contents</span>
          </div>

          <nav className="space-y-1">
            {HOMEPAGE_SECTIONS.map((sec) => {
              const isActive = sec.id === activeId;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-sans transition-all flex items-center justify-between gap-2 group cursor-pointer ${
                    isActive
                      ? "bg-indigo-500/20 text-white font-semibold border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                  title={sec.title}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className={`text-[10px] font-mono w-4 text-center ${
                        isActive ? "text-indigo-400 font-bold" : "text-slate-600 group-hover:text-slate-400"
                      }`}
                    >
                      {sec.number}
                    </span>
                    <span className="truncate">{sec.label}</span>
                  </div>

                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(99,102,241,0.8)] shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-white/[0.06] px-1 flex items-center justify-between text-[10px] text-slate-500">
            <span>Chapter {activeItem.number} of VIII</span>
            <span className="text-indigo-400 font-medium">Active</span>
          </div>
        </div>
      </aside>

      {/* Mobile Floating Bottom Bar with Expandable Pill */}
      <div className="xl:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 select-none">
        <div className="relative">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0D111A]/95 backdrop-blur-xl border border-white/[0.15] text-xs font-sans font-medium text-white shadow-2xl hover:border-indigo-500/40 transition-all cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>
              {activeItem.number}. {activeItem.label}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-3 rounded-2xl bg-[#0D111A]/95 backdrop-blur-2xl border border-white/[0.12] shadow-2xl space-y-1"
            >
              <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-white/[0.06] mb-1">
                Jump to Chapter
              </div>
              {HOMEPAGE_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    sec.id === activeId
                      ? "bg-indigo-500/20 text-white font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>
                    {sec.number}. {sec.label}
                  </span>
                  {sec.id === activeId && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

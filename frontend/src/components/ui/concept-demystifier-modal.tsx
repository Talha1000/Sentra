"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, BookOpen } from "lucide-react";

export interface ConceptItem {
  id: string;
  term: string;
  category: "Core Concept" | "Cognitive Psychology" | "Mathematics" | "Governance";
  simpleExplanation: string;
  analogy: string;
  whyItMatters: string;
  technicalDeepDive: string;
}

export const SENTRA_CONCEPTS: ConceptItem[] = [
  {
    id: "decision-intelligence",
    term: "Decision Intelligence",
    category: "Core Concept",
    simpleExplanation:
      "The engineering discipline of testing and calibrating business allocations using closed-form mathematics and behavioral verification, rather than blindly trusting unvalidated generative AI outputs.",
    analogy:
      "Modern avionics: the flight computer provides automated flight-level suggestions, but redundant systems and human pilots must cross-check calculations before committing descent.",
    whyItMatters:
      "Organizations lose millions when teams accept fluent AI recommendations that overlook asymmetric inventory or capacity holding penalties.",
    technicalDeepDive:
      "Synthesizes stochastic calculus, uncertainty quantification, behavioral economics, and deterministic cryptographic auditability.",
  },
  {
    id: "cognitive-over-reliance",
    term: "Cognitive Over-reliance",
    category: "Cognitive Psychology",
    simpleExplanation:
      "The documented cognitive bias where human decision-makers accept an algorithmic recommendation despite obvious errors, driven by articulate and fluent prose.",
    analogy:
      "Following GPS into a clearly flooded street because the turn-by-turn voice sounded calm and authoritative.",
    whyItMatters:
      "In high-consequence corporate decisions, passive compliance leads to massive stranded capital and inventory obsolescence.",
    technicalDeepDive:
      "Quantified as P(Human adopts recommendation | Recommendation is suboptimal). Measured through double-blind controlled randomized trials.",
  },
  {
    id: "critical-fractile",
    term: "Critical Fractile (Newsvendor Theorem)",
    category: "Mathematics",
    simpleExplanation:
      "The mathematically optimal order quantity when facing stochastic demand and unequal financial consequences for underage versus overage.",
    analogy:
      "An outdoor event vendor: running out of ponchos during a storm forfeits high revenue, but leftover stock incurs holding loss. The critical fractile calculates the precise balance point.",
    whyItMatters:
      "Committing inventory at the critical fractile guarantees maximum expected net profit over any arbitrary heuristic.",
    technicalDeepDive:
      "F*(Q) = Cu / (Cu + Co), where Cu is underage penalty (lost margin + stockout penalty) and Co is overage penalty (acquisition cost - salvage value).",
  },
  {
    id: "cryptographic-provenance",
    term: "Cryptographic Provenance",
    category: "Governance",
    simpleExplanation:
      "A mathematically tamper-evident certificate that proves who authorized a decision, what parameters were evaluated, and what model recommendations were presented.",
    analogy:
      "A digitally sealed diplomatic pouch: any modification to the contents immediately invalidates the tamper seal.",
    whyItMatters:
      "Essential for regulatory oversight, SOC-2 compliance, and board-level fiduciary verification.",
    technicalDeepDive:
      "Every trial state is hashed using HMAC SHA-256 with an institutional key, ensuring an immutable sequence chain.",
  },
];

interface ConceptDemystifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultConceptId?: string;
}

export function ConceptDemystifierModal({
  isOpen,
  onClose,
  defaultConceptId,
}: ConceptDemystifierModalProps) {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(defaultConceptId || "decision-intelligence");

  const categories = ["All", "Core Concept", "Cognitive Psychology", "Mathematics", "Governance"];

  const filtered = SENTRA_CONCEPTS.filter((item) => {
    const matchesCat = selectedCat === "All" || item.category === selectedCat;
    const matchesSearch =
      search === "" ||
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.simpleExplanation.toLowerCase().includes(search.toLowerCase()) ||
      item.analogy.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Decision Intelligence Methodology Guide"
      description="Reference manual explaining decision mathematics, behavioral risks, and audit standards."
      className="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search methodology..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                selectedCat === cat
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Concept Accordion List */}
        <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">
                      {item.term}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 space-y-3 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50">
                    <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">
                        Overview
                      </span>
                      <p className="text-slate-800 leading-relaxed">
                        {item.simpleExplanation}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800 block">
                        Practical Analogy
                      </span>
                      <p className="text-slate-700 italic leading-relaxed">
                        “{item.analogy}”
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800 block">
                        Financial Impact
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {item.whyItMatters}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 font-mono text-[11px] text-slate-600 space-y-1">
                      <span className="font-sans text-[10px] uppercase font-semibold text-slate-500 block">
                        Mathematical Definition
                      </span>
                      <p className="leading-relaxed">{item.technicalDeepDive}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs text-slate-500">
          <span>{filtered.length} concepts documented</span>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Guide
          </Button>
        </div>
      </div>
    </Modal>
  );
}

"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, BookOpen } from "lucide-react";

export interface ConceptItem {
  id: string;
  term: string;
  category: "How It Works" | "Avoiding Mistakes" | "Business Math" | "Audit & Safety";
  simpleExplanation: string;
  analogy: string;
  whyItMatters: string;
  technicalDeepDive: string;
}

export const SENTRA_CONCEPTS: ConceptItem[] = [
  {
    id: "smart-planning",
    term: "Decision Planning (The Big Picture)",
    category: "How It Works",
    simpleExplanation:
      "Testing your business plans and orders using simulations and real data before spending budget, rather than relying on guesswork or generic AI advice.",
    analogy:
      "Flight simulators for pilots: letting you test stormy weather and rough landings safely on a computer before flying a real plane with real passengers.",
    whyItMatters:
      "Prevents companies from spending hundreds of thousands of dollars on excess inventory or equipment that ends up sitting idle.",
    technicalDeepDive:
      "Compares expected revenue vs cost under 1,000+ realistic market demand outcomes to identify the safest, highest-profit choice.",
  },
  {
    id: "ai-over-reliance",
    term: "Why AI Often Guesses Too High",
    category: "Avoiding Mistakes",
    simpleExplanation:
      "General AI tools are trained to be helpful and avoid saying 'sorry we ran out'. In business, this causes them to recommend ordering too much stock, forgetting that unsold goods eat your cash.",
    analogy:
      "A caterer who orders 3 times too much food for a party just in case. No one leaves hungry, but you get stuck paying a huge bill for leftovers you throw away.",
    whyItMatters:
      "Sentra catches this bias and dials back orders to what will actually make you money.",
    technicalDeepDive:
      "AI models prioritize stockout avoidance over holding costs. Sentra balances holding penalties against stockout penalties.",
  },
  {
    id: "sweet-spot",
    term: "The Profit Sweet Spot",
    category: "Business Math",
    simpleExplanation:
      "The exact order quantity where your expected profit is highest. It balances the risk of running out of stock against the risk of having unsold items left over.",
    analogy:
      "A baker making artisan pastries: baking too few loses eager morning customers; baking too many means throwing stale bread away at night. The sweet spot maximizes the day's cash take-home.",
    whyItMatters:
      "Ordering at the sweet spot delivers the highest possible profit for your business.",
    technicalDeepDive:
      "Calculates the exact balance between stockout loss (lost profit) and overage loss (clearance discount).",
  },
  {
    id: "tamper-proof-audit",
    term: "Tamper-Proof Sign-Offs",
    category: "Audit & Safety",
    simpleExplanation:
      "A digital security seal that permanently logs who approved a decision, the numbers they saw, and the projected outcome.",
    analogy:
      "A sealed and notarized contract: once signed and stamped, no one can change the numbers behind your back.",
    whyItMatters:
      "Gives your executives, board of directors, and auditors complete peace of mind that decisions follow company guidelines.",
    technicalDeepDive:
      "Binds all decision numbers into a permanent digital seal for corporate governance and accounting compliance.",
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
  const [expandedId, setExpandedId] = useState<string | null>(defaultConceptId || "smart-planning");

  const categories = ["All", "How It Works", "Avoiding Mistakes", "Business Math", "Audit & Safety"];

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
      title="Plain-English Business Guide"
      description="Simple explanations of how Sentra helps you make profitable decisions, avoid costly mistakes, and verify plans."
      className="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search guide in plain English..."
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
                        Behind The Scenes
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

"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  BookOpen,
  ChevronDown,
  Sparkles,
} from "lucide-react";

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
      "The practice of making better business choices by combining human wisdom, mathematical models, and AI advice—rather than guessing or blindly rubber-stamping an algorithm.",
    analogy:
      "Like modern commercial aviation: the airplane has autopilot, but two certified human pilots and redundant flight computers cross-check every maneuver before touching the flaps.",
    whyItMatters:
      "Companies lose millions when executives trust raw AI answers without verifying whether the math actually works under real market volatility.",
    technicalDeepDive:
      "Integrates decision theory, behavioral economics, Monte Carlo uncertainty quantification, and human-in-the-loop audit controls.",
  },
  {
    id: "cognitive-over-reliance",
    term: "Cognitive Over-reliance",
    category: "Cognitive Psychology",
    simpleExplanation:
      "When a human manager accepts an AI's advice even when the AI is completely wrong or biased, simply because the AI sounds confident, polished, and articulate.",
    analogy:
      "Following your car's GPS directly into a flooded lake because the voice sounded authoritative, ignoring the bright orange 'Road Closed' barricade right in front of your windshield.",
    whyItMatters:
      "In high-stakes domains (purchasing, medical dosage, credit limits), blind agreement creates catastrophic corporate liability and massive inventory write-downs.",
    technicalDeepDive:
      "Quantified as P(Human adopts advice | Advice is suboptimal or biased). Sentra benchmarks baseline vs aided behavior to alert managers in real-time.",
  },
  {
    id: "critical-fractile",
    term: "Critical Fractile (Newsvendor Theory)",
    category: "Mathematics",
    simpleExplanation:
      "The exact mathematical sweet spot for how much inventory or capacity to order when you do not know future demand with certainty.",
    analogy:
      "An umbrella seller before an outdoor concert: running out of umbrellas when it pours loses huge profit, but buying too many means leftover junk. The fractile finds the exact balance that maximizes profit.",
    whyItMatters:
      "Ordering at the exact critical fractile guarantees maximum expected financial profit across thousands of possible demand outcomes.",
    technicalDeepDive:
      "Calculated as Underage Cost / (Underage Cost + Overage Cost) = (P - C + Penalty) / (P - S + Penalty). Looked up on the cumulative normal distribution F⁻¹(CF).",
  },
  {
    id: "monte-carlo",
    term: "Monte Carlo Simulation",
    category: "Mathematics",
    simpleExplanation:
      "Testing a business decision across 1,000 randomized future scenarios on a computer to see what happens before risking real company capital.",
    analogy:
      "Like a Formula 1 team testing a virtual car in 1,000 simulated weather storms (rain, sleet, heatwave) before taking it onto the physical track.",
    whyItMatters:
      "Instead of assuming demand will always be 'average', it shows you the worst 5% risk scenarios so you are never caught unprepared.",
    technicalDeepDive:
      "Draws stochastic samples D_i ~ N(μ, σ) and calculates financial payoffs across asymmetric non-linear penalty curves.",
  },
  {
    id: "expected-calibration-error",
    term: "Expected Calibration Error (ECE)",
    category: "Cognitive Psychology",
    simpleExplanation:
      "A score measuring how honest an AI is about its confidence. If an AI claims 90% confidence, it should be right exactly 9 times out of 10.",
    analogy:
      "A weather forecaster who predicts a '90% chance of rain' on 100 days. If it only rains on 50 of those days, their calibration is terrible—they are dangerously over-confident.",
    whyItMatters:
      "Uncalibrated AI models give false confidence to human teams, causing managers to lower their guard on high-risk choices.",
    technicalDeepDive:
      "ECE = Σ ( |B_m| / N ) * | accuracy(B_m) - confidence(B_m) | partitioned across confidence bins. Perfect calibration is 0.000.",
  },
  {
    id: "bias-injection",
    term: "Injected Bias Stressor",
    category: "Cognitive Psychology",
    simpleExplanation:
      "A controlled research test where Sentra intentionally introduces a deliberate error into the AI's advice to see if the human catches it or blindly obeys.",
    analogy:
      "A fire drill in a corporate skyscraper: you sound the alarm unannounced to train staff and verify whether the evacuation protocol actually works.",
    whyItMatters:
      "You cannot legally or ethically claim your organization has 'human oversight' unless you periodically prove your human operators can catch erroneous AI advice.",
    technicalDeepDive:
      "Applies deterministic skew (e.g. +35% or -30%) in randomized scenario blocks to record reaction latency and cognitive override probability.",
  },
  {
    id: "immutable-audit-hash",
    term: "Immutable Cryptographic Audit Seal",
    category: "Governance",
    simpleExplanation:
      "A tamper-evident digital seal that records what the AI recommended, what the human decided, and why—so nobody can alter history later.",
    analogy:
      "A hot wax seal with a unique royal signet pressed into a legal parchment. If anyone changes a single comma, the seal breaks visibly.",
    whyItMatters:
      "Provides undeniable proof for regulators, auditors, and board members that decisions complied with governance standards, eliminating blame games.",
    technicalDeepDive:
      "HMAC SHA-256 hash chaining over (decision_id, timestamp, human_rationale, ai_recommendation_hash, parameters).",
  },
  {
    id: "cohens-d",
    term: "Cohen's d Effect Size",
    category: "Mathematics",
    simpleExplanation:
      "A standardized number that tells you how big of a real-world difference an AI assistant actually makes for human performance.",
    analogy:
      "A medicine might have a statistically noticeable effect, but Cohen's d tells you if it cures your headache in 10 minutes (huge effect) or 9.9 hours (tiny effect).",
    whyItMatters:
      "Just because an AI is 'statistically significant' doesn't mean it's worth buying. Cohen's d tells you whether the ROI is substantial (d > 0.8) or negligible (d < 0.2).",
    technicalDeepDive:
      "d = (μ₁ - μ₂) / s_pooled. Standardized metric independent of unit measurement.",
  },
];

interface ConceptDemystifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialConceptId?: string;
}

export function ConceptDemystifierModal({
  isOpen,
  onClose,
  initialConceptId,
}: ConceptDemystifierModalProps) {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(initialConceptId || "decision-intelligence");

  const categories = ["All", "Core Concept", "Cognitive Psychology", "Mathematics", "Governance"];

  const filtered = SENTRA_CONCEPTS.filter((c) => {
    const matchesCat = selectedCat === "All" || c.category === selectedCat;
    const matchesSearch =
      c.term.toLowerCase().includes(search.toLowerCase()) ||
      c.simpleExplanation.toLowerCase().includes(search.toLowerCase()) ||
      c.analogy.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sentra · A Human Guide to the Concepts"
      className="max-w-3xl max-h-[90vh] overflow-y-auto bg-canvas p-0"
    >
      <div className="p-6 sm:p-8 space-y-6">
        {/* Intro */}
        <div className="p-5 rounded-2xl bg-terracotta/10 border border-terracotta/30 space-y-1.5">
          <span className="font-serif text-base font-bold text-ink-primary block">
            Complex Ideas, Explained in Clear Words
          </span>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            Sentra uses advanced stochastic optimization, cognitive psychology, and cryptography.
            You do not need a mathematics degree to understand how it protects your organization. Every concept is broken down with simple real-world analogies below.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search concepts or analogies (e.g., 'fractile', 'over-reliance', 'audit')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-border bg-canvas-elevated text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                  selectedCat === cat
                    ? "bg-ink-primary text-canvas font-semibold"
                    : "bg-canvas-elevated text-ink-secondary border border-warm-border hover:bg-canvas-subtle hover:text-ink-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Concept Cards */}
        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all ${
                  isExpanded
                    ? "border-warm-borderStrong bg-canvas-subtle shadow-paper"
                    : "border-warm-hairline bg-canvas-subtle/50 hover:bg-canvas-subtle hover:border-warm-border"
                }`}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base font-bold text-ink-primary">
                        {item.term}
                      </span>
                      <span className="text-[10px] font-sans text-ink-muted uppercase">
                        · {item.category}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-ink-muted transition-transform shrink-0 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 space-y-3.5 text-xs text-ink-secondary border-t border-warm-hairline">
                    <div className="p-3.5 rounded-xl bg-canvas-elevated/70 border border-warm-hairline space-y-1">
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-ink-muted block">
                        In Plain English
                      </span>
                      <p className="text-ink-primary leading-relaxed font-sans text-xs sm:text-sm">
                        {item.simpleExplanation}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-terracotta/10 border border-terracotta/30 space-y-1">
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-terracotta block">
                        Real-World Analogy
                      </span>
                      <p className="text-ink-primary italic leading-relaxed text-xs">
                        “{item.analogy}”
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-sage/10 border border-sage/30 space-y-1">
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-sage block">
                        Why It Matters To Your Bottom Line
                      </span>
                      <p className="text-ink-primary leading-relaxed text-xs">
                        {item.whyItMatters}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-canvas/90 border border-warm-hairline font-mono text-[11px] text-ink-muted space-y-1">
                      <span className="font-sans text-[10px] uppercase font-semibold text-ink-muted block">
                        Formal Definition
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
        <div className="flex items-center justify-between pt-2 border-t border-warm-hairline text-xs text-ink-muted">
          <span>{filtered.length} concepts documented</span>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Guide
          </Button>
        </div>
      </div>
    </Modal>
  );
}

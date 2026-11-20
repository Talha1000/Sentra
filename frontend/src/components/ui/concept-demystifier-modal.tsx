"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  Search,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Scale,
  Brain,
  Cpu,
  Calculator,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export interface ConceptItem {
  id: string;
  term: string;
  category: "Core Platform" | "Cognitive Science" | "Mathematical Engine" | "Governance & Compliance";
  simpleExplanation: string;
  analogy: string;
  whyItMatters: string;
  technicalDeepDive: string;
  tag?: string;
}

export const SENTRA_CONCEPTS: ConceptItem[] = [
  {
    id: "decision-intelligence",
    term: "Decision Intelligence",
    category: "Core Platform",
    simpleExplanation:
      "The science of making better business choices by combining human judgment, mathematical models, and AI advice—instead of blindly guessing or rubber-stamping AI output.",
    analogy:
      "Like modern commercial aviation: the airplane has autopilot, but two certified pilots and redundant flight computers cross-check every altitude change before touching the flaps.",
    whyItMatters:
      "Companies lose millions when managers trust raw AI answers without verifying whether the math actually works under real market volatility.",
    technicalDeepDive:
      "Integrates decision theory, behavioral economics, Monte Carlo uncertainty quantification, and human-in-the-loop audit controls.",
    tag: "Fundamental",
  },
  {
    id: "cognitive-over-reliance",
    term: "Cognitive Over-reliance",
    category: "Cognitive Science",
    simpleExplanation:
      "When a human manager accepts an AI's advice even when the AI is completely wrong or biased, simply because the AI sounds confident, polished, and polite.",
    analogy:
      "Following your car's GPS into a flooded lake because the voice sounded authoritative, ignoring the bright orange 'Road Closed' barricade right in front of your windshield.",
    whyItMatters:
      "In high-stakes domains (purchasing, medical dosage, credit limits), blind agreement creates catastrophic corporate liability and massive inventory write-downs.",
    technicalDeepDive:
      "Quantified as P(Human adopts advice | Advice is suboptimal or biased). Sentra benchmarks baseline vs aided behavior to alert managers in real-time.",
    tag: "Risk Prevention",
  },
  {
    id: "critical-fractile",
    term: "Critical Fractile (Newsvendor Theory)",
    category: "Mathematical Engine",
    simpleExplanation:
      "The exact mathematical sweet spot for how much inventory or capacity to order when you do not know future demand with certainty.",
    analogy:
      "An umbrella seller before an outdoor concert: running out of umbrellas when it pours loses huge profit, but buying too many means leftover junk. The fractile finds the exact balance that maximizes profit.",
    whyItMatters:
      "Ordering at the exact critical fractile guarantees maximum expected financial profit across thousands of possible demand outcomes.",
    technicalDeepDive:
      "Calculated as Underage Cost / (Underage Cost + Overage Cost) = (P - C + Penalty) / (P - S + Penalty). Looked up on the cumulative normal distribution F⁻¹(CF).",
    tag: "Core Math",
  },
  {
    id: "monte-carlo",
    term: "Monte Carlo Simulation",
    category: "Mathematical Engine",
    simpleExplanation:
      "Testing a business decision across 1,000 randomized future scenarios on a computer to see what happens before risking real company capital.",
    analogy:
      "Like a Formula 1 team testing a virtual car in 1,000 simulated weather storms (rain, sleet, heatwave) before taking it onto the physical track.",
    whyItMatters:
      "Instead of assuming demand will always be 'average', it shows you the worst 5% risk scenarios so you are never caught unprepared.",
    technicalDeepDive:
      "Draws stochastic samples D_i ~ N(μ, σ) and calculates financial payoffs across asymmetric non-linear penalty curves.",
    tag: "Stochastic",
  },
  {
    id: "expected-calibration-error",
    term: "Expected Calibration Error (ECE)",
    category: "Cognitive Science",
    simpleExplanation:
      "A score measuring how honest an AI is about its confidence. If an AI claims 90% confidence, it should be right exactly 9 times out of 10.",
    analogy:
      "A weather forecaster who predicts a '90% chance of rain' on 100 days. If it only rains on 50 of those days, their calibration is terrible—they are dangerously over-confident.",
    whyItMatters:
      "Uncalibrated AI models give false confidence to human teams, causing managers to lower their guard on high-risk choices.",
    technicalDeepDive:
      "ECE = Σ ( |B_m| / N ) * | accuracy(B_m) - confidence(B_m) | partitioned across confidence bins. Perfect calibration is 0.000.",
    tag: "Quality Metric",
  },
  {
    id: "bias-injection",
    term: "Injected Bias Stressor",
    category: "Cognitive Science",
    simpleExplanation:
      "A controlled research test where Sentra intentionally introduces a deliberate error into the AI's advice to see if the human catches it or blindly obeys.",
    analogy:
      "A fire drill in a corporate skyscraper: you sound the alarm unannounced to train staff and verify whether the evacuation protocol actually works.",
    whyItMatters:
      "You cannot legally or ethically claim your organization has 'human oversight' unless you periodically prove your human operators can catch erroneous AI advice.",
    technicalDeepDive:
      "Applies deterministic skew (e.g. +35% or -30%) in randomized scenario blocks to record reaction latency and cognitive override probability.",
    tag: "Research Lab",
  },
  {
    id: "immutable-audit-hash",
    term: "Immutable Cryptographic Audit Seal",
    category: "Governance & Compliance",
    simpleExplanation:
      "A tamper-evident digital seal that records what the AI recommended, what the human decided, and why—so nobody can alter history later.",
    analogy:
      "A hot wax seal with a unique royal signet pressed into a legal parchment. If anyone changes a single comma, the seal breaks visibly.",
    whyItMatters:
      "Provides undeniable proof for regulators, auditors, and board members that decisions complied with governance standards, eliminating blame games.",
    technicalDeepDive:
      "HMAC SHA-256 hash chaining over (decision_id, timestamp, human_rationale, ai_recommendation_hash, parameters).",
    tag: "Audit Defense",
  },
  {
    id: "cohens-d",
    term: "Cohen's d Effect Size",
    category: "Mathematical Engine",
    simpleExplanation:
      "A standardized number that tells you how big of a real-world difference an AI assistant actually makes for human performance.",
    analogy:
      "A medicine might have a statistically noticeable effect, but Cohen's d tells you if it cures your headache in 10 minutes (huge effect) or 9.9 hours (tiny effect).",
    whyItMatters:
      "Just because an AI is 'statistically significant' doesn't mean it's worth buying. Cohen's d tells you whether the ROI is substantial (d > 0.8) or negligible (d < 0.2).",
    technicalDeepDive:
      "d = (μ₁ - μ₂) / s_pooled. Standardized metric independent of unit measurement.",
    tag: "Statistics",
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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(initialConceptId || "decision-intelligence");

  const categories = ["All", "Core Platform", "Cognitive Science", "Mathematical Engine", "Governance & Compliance"];

  const filtered = SENTRA_CONCEPTS.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.simpleExplanation.toLowerCase().includes(search.toLowerCase()) ||
      item.analogy.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="SENTRA Concept Demystifier & Plain English Guide"
      className="max-w-3xl max-h-[90vh] overflow-y-auto"
    >
      <div className="space-y-6">
        {/* Intro Banner */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-950 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-200/60 shrink-0 text-amber-900">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="font-bold text-sm text-amber-900 flex items-center gap-2">
              <span>Why this exists: Complex Math, Explained Simply</span>
              <Badge variant="amber">Zero Jargon Guarantee</Badge>
            </div>
            <p className="text-amber-800 leading-relaxed">
              Sentra uses advanced stochastic optimization, cognitive psychology, and cryptography.
              You do not need a PhD to understand how it protects your organization. Every concept is broken down into simple terms and real-world analogies below.
            </p>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search concepts, analogies, or terms (e.g., 'fractile', 'over-reliance', 'audit')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Concept Cards Accordion */}
        <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-500">
              No matching concepts found. Try clearing your search.
            </div>
          ) : (
            filtered.map((concept) => {
              const isExpanded = expandedId === concept.id;
              return (
                <div
                  key={concept.id}
                  className={`rounded-xl border transition-all ${
                    isExpanded
                      ? "border-slate-300 bg-white shadow-sm"
                      : "border-slate-200 bg-slate-50/60 hover:bg-white"
                  }`}
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : concept.id)}
                    className="w-full text-left p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {concept.category === "Mathematical Engine" && <Calculator className="w-4 h-4 text-emerald-600" />}
                        {concept.category === "Cognitive Science" && <Brain className="w-4 h-4 text-amber-600" />}
                        {concept.category === "Governance & Compliance" && <ShieldCheck className="w-4 h-4 text-purple-600" />}
                        {concept.category === "Core Platform" && <Sparkles className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-slate-900">{concept.term}</span>
                          {concept.tag && (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                              {concept.tag}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500">{concept.category}</span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 space-y-3 text-xs border-t border-slate-100">
                      {/* Simple Explanation */}
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                          In Plain English
                        </span>
                        <p className="text-slate-800 leading-relaxed font-medium">
                          {concept.simpleExplanation}
                        </p>
                      </div>

                      {/* Analogy */}
                      <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-200/60 space-y-1 text-amber-950">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                          <span>💡 Real-World Analogy</span>
                        </span>
                        <p className="text-amber-900 leading-relaxed italic">
                          "{concept.analogy}"
                        </p>
                      </div>

                      {/* Why it Matters */}
                      <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200/60 space-y-1 text-emerald-950">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                          <span>🎯 Why It Matters To Your Bottom Line</span>
                        </span>
                        <p className="text-emerald-900 leading-relaxed">
                          {concept.whyItMatters}
                        </p>
                      </div>

                      {/* Technical Deep Dive */}
                      <div className="p-3 rounded-lg bg-slate-100/70 border border-slate-200 space-y-1 font-mono text-[11px] text-slate-700">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block font-sans">
                          🔬 Mathematical / System Detail
                        </span>
                        <p className="text-slate-600 leading-relaxed">
                          {concept.technicalDeepDive}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-500">
          <span>Found {filtered.length} concept guides</span>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Guide
          </Button>
        </div>
      </div>
    </Modal>
  );
}

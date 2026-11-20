"use client";

import React, { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

interface FAQ {
  q: string;
  category: string;
  a: string;
  humanNote: string;
}

const FAQS: FAQ[] = [
  {
    q: "What does Sentra actually do in simple words?",
    category: "Overview",
    a: "Sentra acts as a mathematical firewall and flight recorder for critical business decisions. When an AI suggests an action—such as ordering inventory, setting credit limits, or allocating server capacity—Sentra stress-tests that advice across 1,000 simulated market scenarios, warns your human managers if the AI is biased, and creates an unalterable digital seal of the final decision for regulators.",
    humanNote: "We make sure AI recommendations don't cause multi-million dollar mistakes.",
  },
  {
    q: "Why can't our company just use ChatGPT, Claude, or Microsoft Copilot directly?",
    category: "Comparison",
    a: "Language models are linguistic reasoning engines, not economic optimization engines. They produce fluent, persuasive prose, but they do not calculate non-linear holding costs, stockout penalties, or asymmetric financial risk. Furthermore, LLMs suffer from overconfidence: they sound 100% sure even when their numbers will bankrupt your supply chain. Sentra provides the missing mathematical and behavioral layer.",
    humanNote: "Language models provide words; Sentra provides mathematical proof and risk control.",
  },
  {
    q: "Do our executives or analysts need a mathematics or statistics degree to use this?",
    category: "Usability",
    a: "No. Sentra is intentionally designed with dual interfaces: 'Plain English' and 'Scientific Rigor'. Managers get clear visual sliders, intuitive risk warnings, and conversational explanations. The heavy stochastic calculations (Monte Carlo simulations, critical fractiles, Welch's t-tests) run quietly in the background.",
    humanNote: "Designed for busy managers who need instant clarity without a math headache.",
  },
  {
    q: "What is 'Cognitive Over-reliance', and why does everyone talk about it?",
    category: "Cognitive Science",
    a: "Cognitive over-reliance is the proven human tendency to blindly accept AI output without double-checking it, simply because the AI writes politely and authoritatively. In consequential medical, financial, and inventory decisions, this leads to catastrophic liability. Sentra runs controlled research tests with injected bias to train your staff and catch blind deference before damage occurs.",
    humanNote: "We test and train your team so they stay in command, not the machine.",
  },
  {
    q: "How does the cryptographic HMAC SHA-256 seal protect our company?",
    category: "Compliance",
    a: "When a regulator, auditor, or board of directors asks, 'Why did you make this decision?' or 'Did an AI cause this error?', Sentra provides an immutable, mathematically verifiable audit certificate. It records the exact AI prompt, the mathematical bounds, the human reasoning, and the exact timestamp. Because the ledger is HMAC sealed, no one can alter or backdate records.",
    humanNote: "Zero liability and instant proof of compliant human-in-the-loop oversight.",
  },
  {
    q: "Can our team test this right now without setting up servers?",
    category: "Getting Started",
    a: "Yes. Sentra includes a Zero-Friction Demo Seeder. Click 'Seed Test Data' anywhere in the topbar, or head to the Research Lab to participate in a live double-blind trial right in your browser. All 45 participants and 225 trials are simulated with instant statistical analytics.",
    humanNote: "You can evaluate the full system live in under 30 seconds.",
  },
];

export function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-sans font-medium text-terracotta uppercase tracking-wide block">
          Questions & Answers
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight">
          Clear Answers for Clear Minds
        </h2>
        <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
          Everything you need to know about decision intelligence, AI risk, and mathematical calibration.
        </p>
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? "border-warm-borderStrong bg-canvas-subtle shadow-paper"
                  : "border-warm-hairline bg-canvas-subtle/50 hover:bg-canvas-subtle hover:border-warm-border"
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <span className="font-serif text-sm font-semibold text-terracotta">
                    0{idx + 1}
                  </span>
                  <span className="font-serif text-base font-bold text-ink-primary">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-ink-muted transition-transform shrink-0 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 space-y-3.5 text-xs sm:text-sm text-ink-secondary border-t border-warm-hairline">
                  <p className="leading-relaxed text-ink-secondary">{faq.a}</p>

                  <div className="p-3.5 rounded-xl bg-canvas-elevated border border-warm-hairline text-xs font-sans text-ink-primary flex items-start gap-2">
                    <span className="text-terracotta font-bold shrink-0">·</span>
                    <span>
                      <strong className="text-ink-primary">The Key Takeaway:</strong> {faq.humanNote}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

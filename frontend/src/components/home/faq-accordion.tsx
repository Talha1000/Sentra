"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FAQItem {
  question: string;
  category: string;
  answer: string;
  takeaway: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What exactly does Sentra do in simple terms?",
    category: "Overview",
    answer:
      "Sentra acts as a mathematical firewall and flight recorder for important business decisions. When an AI (like ChatGPT or Copilot) suggests an action—such as ordering inventory, adjusting prices, or approving credit—Sentra stress-tests that advice across 1,000 simulated market scenarios, warns your human managers if the AI is biased, and creates an unalterable digital seal of the final decision for regulators.",
    takeaway: "We make sure AI recommendations don't cause multi-million dollar mistakes.",
  },
  {
    question: "Why can't we just use ChatGPT, Claude, or Microsoft Copilot directly?",
    category: "Comparison",
    answer:
      "General AI models are language engines, not financial optimization engines. They produce fluent, persuasive prose, but they do not calculate non-linear holding costs, stockout penalties, or asymmetric risk curves. Furthermore, LLMs suffer from 'overconfidence bias'—they sound 100% sure even when their numbers will bankrupt your supply chain. Sentra provides the missing mathematical and behavioral layer.",
    takeaway: "LLMs provide words; Sentra provides mathematical proof and risk control.",
  },
  {
    question: "Do our executives or analysts need a math or statistics degree?",
    category: "Usability",
    answer:
      "No! Sentra is engineered with dual-mode interfaces: 'Executive Plain English' and 'Scientific Rigor'. You get simple visual sliders, traffic-light risk indicators, and clear plain-text recommendations. The heavy mathematical heavy lifting (Monte Carlo, critical fractiles, Welch's t-tests) runs silently in the background.",
    takeaway: "Designed for busy managers who need instant clarity without the math headache.",
  },
  {
    question: "What is 'Cognitive Over-reliance', and why does everyone talk about it?",
    category: "Cognitive Science",
    answer:
      "Cognitive over-reliance is the proven human tendency to blindly accept AI output without double-checking it, simply because the AI writes politely and authoritatively. In medical, financial, and inventory decisions, this leads to catastrophic liability. Sentra runs controlled research tests with injected bias to train your staff and catch blind deference before damage occurs.",
    takeaway: "We test and train your team so they stay in command, not the machine.",
  },
  {
    question: "How does the cryptographic HMAC SHA-256 seal protect our company?",
    category: "Compliance",
    answer:
      "When a regulator (or board of directors) asks, 'Why did you make this decision?' or 'Did an AI cause this error?', Sentra provides an immutable, mathematically verifiable audit certificate. It records the exact AI prompt, the mathematical bounds, the human reasoning, and the exact timestamp. Because the ledger is HMAC sealed, no one can alter or backdate records.",
    takeaway: "Zero liability and instant proof of compliant human-in-the-loop oversight.",
  },
  {
    question: "Can our team test this right now without setting up servers?",
    category: "Getting Started",
    answer:
      "Yes! Sentra includes a Zero-Friction Demo Seeder. Click 'Seed Test Data' anywhere in the topbar, or head to the Research Lab to participate in a live double-blind trial right in your browser. All 45 participants and 225 trials are simulated with instant statistical analytics.",
    takeaway: "You can evaluate the full system live in under 30 seconds.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white shadow-xs text-xs font-semibold text-slate-700">
          <HelpCircle className="w-3.5 h-3.5 text-brand-600" />
          <span>Executive Q&A</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Everything you need to know about decision intelligence, AI risk, and mathematical calibration.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? "border-slate-300 bg-white shadow-sm"
                  : "border-slate-200 bg-white/70 hover:bg-white"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    0{idx + 1}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-slate-900">
                    {faq.question}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-block text-[10px] font-medium uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {faq.category}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 space-y-3 text-xs sm:text-sm text-slate-600 border-t border-slate-100">
                  <p className="leading-relaxed text-slate-700">{faq.answer}</p>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2 text-xs font-medium text-slate-800">
                    <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>
                      <strong>The Bottom Line:</strong> {faq.takeaway}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

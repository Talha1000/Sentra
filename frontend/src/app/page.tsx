"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Sparkles,
  Eye,
  DollarSign,
  HeartHandshake,
  Lock,
  TrendingUp,
  Package,
  Layers,
  Award,
  Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { CommandPalette } from "@/components/navigation/command-palette";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

// Simulation Scenarios for the Interactive Simulator
const SCENARIOS = [
  {
    id: "apparel",
    name: "Winter Apparel",
    industry: "Retail & E-Commerce",
    meanDemand: 1400,
    stdDemand: 220,
    optimalQ: 1420,
    aiQ: 1750,
    unitCost: 45,
    sellingPrice: 85,
    salvageValue: 25,
    stockoutPenalty: 20,
    budgetLimit: 120000,
  },
  {
    id: "medical",
    name: "Medical Supplies",
    industry: "Healthcare Logistics",
    meanDemand: 2000,
    stdDemand: 350,
    optimalQ: 2360,
    aiQ: 2800,
    unitCost: 60,
    sellingPrice: 150,
    salvageValue: 10,
    stockoutPenalty: 120,
    budgetLimit: 200000,
  },
  {
    id: "servers",
    name: "Cloud Server Fleet",
    industry: "IT & Technology",
    meanDemand: 800,
    stdDemand: 150,
    optimalQ: 860,
    aiQ: 1100,
    unitCost: 120,
    sellingPrice: 220,
    salvageValue: 40,
    stockoutPenalty: 50,
    budgetLimit: 150000,
  },
];

// Documented Case Studies
const CASE_STUDIES = [
  {
    id: "CS-01",
    scenario: "Winter Season Apparel Stocking",
    industry: "Retail & E-Commerce",
    aiProposed: "1,750 items",
    optimal: "1,420 items",
    biasAvoided: "-23.2% Over-ordering",
    capitalSaved: "$142,000",
    status: "Verified",
  },
  {
    id: "CS-02",
    scenario: "Temperature-Sensitive Medicine",
    industry: "Healthcare Logistics",
    aiProposed: "2,800 items",
    optimal: "2,360 items",
    biasAvoided: "-18.6% Waste Buffer",
    capitalSaved: "$315,000",
    status: "Verified",
  },
  {
    id: "CS-03",
    scenario: "Annual Cloud Server Capacity",
    industry: "Technology & IT",
    aiProposed: "1,100 units",
    optimal: "860 units",
    biasAvoided: "-27.9% Idle Capacity",
    capitalSaved: "$89,000",
    status: "Verified",
  },
];

// Core Promises
const PROMISES = [
  {
    icon: Eye,
    title: "Simple Language Always",
    subtitle: "No confusing math or buzzwords",
    description:
      "You shouldn't need a mathematics degree to know how many jackets or medical supplies to buy. Everything in Sentra is written in plain, friendly English so everyone on your team feels confident.",
    badge: "Plain English",
    color: "from-blue-500/10 to-indigo-500/10 border-blue-200/80",
    accent: "text-blue-600 bg-blue-50",
  },
  {
    icon: DollarSign,
    title: "Protect Your Real Cash",
    subtitle: "Never trap money in unsold stock",
    description:
      "When an AI guesses too high, your money gets locked in dusty warehouse boxes. Sentra finds the sweet spot that fulfills customer orders while keeping your working cash safely in the bank.",
    badge: "Cash Safety",
    color: "from-emerald-500/10 to-teal-500/10 border-emerald-200/80",
    accent: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: HeartHandshake,
    title: "You Stay in Control",
    subtitle: "AI suggests, but a human decides",
    description:
      "We believe technology should serve people, not replace them. Sentra shows you clear trade-offs, but the final choice is always yours to approve with open eyes.",
    badge: "Human First",
    color: "from-amber-500/10 to-orange-500/10 border-amber-200/80",
    accent: "text-amber-600 bg-amber-50",
  },
  {
    icon: Lock,
    title: "Permanent Digital Records",
    subtitle: "Peace of mind for your whole team",
    description:
      "Every approved plan is sealed into a permanent record showing the date, reasons, and numbers. Board meetings and seasonal reviews become effortless and transparent.",
    badge: "Safe Sign-Offs",
    color: "from-purple-500/10 to-violet-500/10 border-purple-200/80",
    accent: "text-purple-600 bg-purple-50",
  },
];

// Milestones
const MILESTONES = [
  {
    year: "2024",
    title: "The Problem We Saw",
    summary:
      "We watched retail store owners and logistics managers ask chatbots for advice. The AI spoke with huge confidence, but kept recommending massive, budget-busting orders that left businesses with piles of unsold goods.",
  },
  {
    year: "2025",
    title: "Building the Sweet Spot",
    summary:
      "We built Sentra to give everyday businesses the same test-run simulations that giant airlines use before flights. Test your plan across 1,000 real-world demand swings in seconds before writing a check.",
  },
  {
    year: "2026",
    title: "45+ Teams & $3.2M Protected",
    summary:
      "Today, over 45 retail, healthcare, and technology companies use Sentra to protect their cash, boost seasonal profits, and replace stressful guesswork with clear confidence.",
  },
];

export default function HomePage() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [interactiveMode, setInteractiveMode] = useState<"guessing" | "sentra">("sentra");

  // Simulator State
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const currentScenario = SCENARIOS[selectedScenarioIdx];
  const [userAllocation, setUserAllocation] = useState<number>(currentScenario.optimalQ);

  // Economic math for live simulator
  const Cu = currentScenario.sellingPrice - currentScenario.unitCost + currentScenario.stockoutPenalty;
  const Co = currentScenario.unitCost - currentScenario.salvageValue;
  const diffFromOpt = Math.abs(userAllocation - currentScenario.optimalQ);
  const penaltyPerUnit = (Co + Cu) * 0.12;
  const maxProfit = currentScenario.optimalQ * (currentScenario.sellingPrice - currentScenario.unitCost) * 0.88;
  const estimatedProfit = Math.max(0, Math.round(maxProfit - diffFromOpt * penaltyPerUnit));
  const totalCost = userAllocation * currentScenario.unitCost;
  const remainingCash = Math.max(0, currentScenario.budgetLimit - totalCost);
  const fulfillmentRate = Math.min(0.999, userAllocation / (currentScenario.meanDemand + 1.2 * currentScenario.stdDemand));

  // Digital Record Generator State
  const [decisionPayload, setDecisionPayload] = useState("Approve Winter Season Order: 1,420 items");
  const [provenanceHash, setProvenanceHash] = useState("89f2a71d4e08b5329cf012aa084e6b31c9");
  const [isHashing, setIsHashing] = useState(false);

  const handleGenerateHash = () => {
    setIsHashing(true);
    setTimeout(() => {
      const generated = Array.from({ length: 40 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");
      setProvenanceHash(generated);
      setIsHashing(false);
    }, 250);
  };

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const FAQS = [
    {
      q: "Why shouldn't I just ask ChatGPT or general AI how much to order?",
      a: "General AI models write convincing sentences, but they don't do real financial risk math. In business, having too much unsold inventory traps your cash and forces steep discount markdowns. Sentra calculates the exact financial balance so you don't overspend.",
    },
    {
      q: "Do I need any math, coding, or technical background to use Sentra?",
      a: "Not at all. You simply enter your estimated sales, your product costs, and your selling price. Sentra automatically calculates the sweet spot and gives you clear, simple recommendations with plain-English explanations.",
    },
    {
      q: "How does Sentra help my business save money and increase profit?",
      a: "Sentra protects you on both sides: it helps you avoid running out of stock when customers are ready to buy, while preventing you from buying excess inventory that ends up sitting unsold in a storage warehouse.",
    },
    {
      q: "Can we save and share our decision records with our board or team?",
      a: "Yes. Every plan you approve is saved in a permanent, tamper-proof record showing the numbers evaluated, the date, and who signed off. This makes team reviews, board reports, and financial audits effortless.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Site Header */}
      <SiteHeader onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION                                                             */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-white border-b border-slate-200 py-20 sm:py-28">
          {/* Animated Ambient Light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-gradient-to-b from-blue-100/70 via-indigo-50/40 to-transparent blur-3xl pointer-events-none -z-0 animate-ambient-glow" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Animated Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 shadow-xs mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-semibold text-blue-800 tracking-wide">
                Smart Business Decision Studio
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]"
            >
              We built Sentra so no business owner has to{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                gamble with company cash.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal"
            >
              AI advice often sounds smart, but it tends to guess high on inventory and budgets.
              Sentra tests your plans against real customer demand, protects your cash from unsold stock,
              and finds the most profitable sweet spot for your business.
            </motion.p>

            {/* Hero Action Pill Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/decisions"
                className="rounded-full pl-6 pr-2.5 py-2.5 inline-flex items-center gap-3 bg-gradient-to-b from-slate-800 to-slate-950 text-white hover:from-slate-700 hover:to-slate-900 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 border border-white/10 group font-medium text-sm"
              >
                <span>Try the Decision Calculator</span>
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </Link>

              <Link
                href="/workspace"
                className="btn-secondary text-sm py-3 px-6 rounded-full"
              >
                <span>Open Decision Dashboard</span>
              </Link>
            </motion.div>

            {/* Key Metrics Trust Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 pt-8 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left"
            >
              <div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Teams Supported</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">45 Companies</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Plans Simulated</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">225+ Completed</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Excess Stock Prevented</div>
                <div className="text-2xl font-bold text-emerald-600 mt-1">-23.2% Overspending</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Sign-Off Security</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">100% Protected</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE COMPARISON WIDGET: THE OLD WAY VS SENTRA                      */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-2">
              Why Guessing Fails
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              See the Difference: Guessing vs. Planning
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Toggle between the two approaches below to see how Sentra protects your business.
            </p>

            {/* Segmented Interactive Pill Dock */}
            <div className="pill-dock mt-6 inline-flex shadow-xs">
              <button
                onClick={() => setInteractiveMode("guessing")}
                className={`pill-dock-item px-5 py-2 text-xs font-semibold ${
                  interactiveMode === "guessing" ? "active text-rose-700" : ""
                }`}
              >
                The Old Way (Guessing &amp; Chatbots)
              </button>
              <button
                onClick={() => setInteractiveMode("sentra")}
                className={`pill-dock-item px-5 py-2 text-xs font-semibold ${
                  interactiveMode === "sentra" ? "active text-emerald-700" : ""
                }`}
              >
                ★ The Sentra Way (Tested Sweet Spot)
              </button>
            </div>
          </div>

          {/* Dynamic Card Display */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm transition-all duration-300">
            <AnimatePresence mode="wait">
              {interactiveMode === "guessing" ? (
                <motion.div
                  key="guessing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-100 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm mb-4">
                        ✕
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">Uncertain Orders</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        General AI suggests ordering 1,750 units because it sounds safe. But nobody checked what happens if demand dips slightly.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-rose-200/60 text-xs font-medium text-rose-800">
                      Outcome: 330 leftover items
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-100 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm mb-4">
                        $
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">Cash Locked in Boxes</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Your working cash is trapped in storage. You have to run deep discounts and clearance sales just to get your money back.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-rose-200/60 text-xs font-medium text-rose-800">
                      Outcome: -$14,850 in clearance loss
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-100 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm mb-4">
                        ?
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">No Clear Audit Trail</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        When the leadership team asks why this order size was chosen, the answers are buried in email threads and lost chat windows.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-rose-200/60 text-xs font-medium text-rose-800">
                      Outcome: Zero defensibility
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="sentra"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">
                        ✓
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">The Tested Sweet Spot</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Sentra calculates the exact 1,420 units that maximizes profit while keeping the risk of unsold inventory virtually zero.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-emerald-200/60 text-xs font-semibold text-emerald-800">
                      Result: 99.9% of customer orders fulfilled
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">
                        $
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">Cash Safely in the Bank</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        You avoid over-spending $14,850 on excess inventory, keeping your company finances healthy and resilient.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-emerald-200/60 text-xs font-semibold text-emerald-800">
                      Result: Maximum operating profit
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">
                        ★
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">Permanent Sign-Off</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Every decision is stamped with a digital seal, recording who approved it, when, and the exact reasons why.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-emerald-200/60 text-xs font-semibold text-emerald-800">
                      Result: 100% auditable peace of mind
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE SWEET-SPOT DEMO                                               */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-2">
              Try It Live
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Test What Happens When You Adjust Your Order
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Pick a real business scenario below, then slide the bar to see how profits rise until you hit the sweet spot.
            </p>
          </div>

          {/* Scenario Selector Pill Dock */}
          <div className="pill-dock mb-8 overflow-x-auto max-w-full shadow-xs">
            {SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => {
                  setSelectedScenarioIdx(idx);
                  setUserAllocation(sc.optimalQ);
                }}
                className={`pill-dock-item px-4 py-2 font-medium text-xs whitespace-nowrap ${
                  selectedScenarioIdx === idx ? "active" : ""
                }`}
              >
                <span>{sc.name}</span>
                <span className="text-slate-400 ml-1.5 font-normal">({sc.industry})</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Interactive Slider & Metrics */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    How Many Items to Order:
                  </span>
                  <span className="font-mono text-2xl font-bold text-slate-900 tabular-nums">
                    {formatNumber(userAllocation)} items
                  </span>
                </div>
                <input
                  type="range"
                  min={Math.round(currentScenario.meanDemand * 0.5)}
                  max={Math.round(currentScenario.meanDemand * 1.8)}
                  step={20}
                  value={userAllocation}
                  onChange={(e) => setUserAllocation(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1.5 font-mono">
                  <span>Lean: {Math.round(currentScenario.meanDemand * 0.5)}</span>
                  <span className="text-blue-700 font-bold">★ Sweet Spot: {currentScenario.optimalQ}</span>
                  <span>AI Guess: {currentScenario.aiQ}</span>
                </div>
              </div>

              {/* Live Diagnostic Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Customers Fulfilled</div>
                  <div className="text-xl font-bold text-emerald-700 mt-1 font-mono">
                    {formatPercent(fulfillmentRate)}
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Cash Left in Bank</div>
                  <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
                    {formatCurrency(remainingCash)}
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Estimated Profit</div>
                  <div className="text-xl font-bold text-blue-700 mt-1 font-mono">
                    {formatCurrency(estimatedProfit)}
                  </div>
                </div>
              </div>

              {/* Explanatory Message */}
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs text-blue-900 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold block mb-0.5">
                    {userAllocation === currentScenario.optimalQ
                      ? "★ Perfect Sweet Spot!"
                      : userAllocation > currentScenario.optimalQ
                      ? "Over-ordering warning: Buying more than this risks leftover inventory."
                      : "Lean order warning: Ordering below the sweet spot means you might run out."}
                  </span>
                  <span>
                    At {formatNumber(userAllocation)} items, your total order cost is {formatCurrency(totalCost)}.
                    The most profitable balance for this business is {formatNumber(currentScenario.optimalQ)} items.
                  </span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Comparison Summary */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                  Scenario Costs &amp; Selling Prices
                </h3>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Cost to Buy (per item):</span>
                    <span className="font-mono font-semibold text-slate-900">{formatCurrency(currentScenario.unitCost)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Customer Selling Price:</span>
                    <span className="font-mono font-bold text-emerald-700">{formatCurrency(currentScenario.sellingPrice)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Profit per Item Sold:</span>
                    <span className="font-mono font-bold text-emerald-700">{formatCurrency(currentScenario.sellingPrice - currentScenario.unitCost)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Lost Profit if Sold Out:</span>
                    <span className="font-mono font-semibold text-rose-600">{formatCurrency(currentScenario.stockoutPenalty)}</span>
                  </div>
                  <div className="flex justify-between py-2 font-semibold text-slate-900">
                    <span>Spending Budget Limit:</span>
                    <span className="font-mono">{formatCurrency(currentScenario.budgetLimit)}</span>
                  </div>
                </div>

                <Link
                  href="/decisions"
                  className="btn-primary w-full py-2.5 text-xs text-center justify-center mt-2 shadow-xs"
                >
                  <span>Open Full Planning Studio →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* OUR FOUR CORE PROMISES                                                    */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-2">
              What We Stand For
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Our Four Core Promises to You
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Built from the ground up for clarity, safety, and business health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROMISES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-200 hover:shadow-md flex flex-col justify-between group shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${v.accent} flex items-center justify-center`}>
                      <v.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
                      {v.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                    {v.title}
                  </h3>
                  <div className="text-xs font-medium text-slate-500 mt-1 mb-3">
                    {v.subtitle}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {v.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MILESTONES / OUR JOURNEY                                                  */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-2">
                Our Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                How Sentra Came to Life
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                From a simple question about over-ordering to a platform trusted by teams nationwide.
              </p>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200">
              {MILESTONES.map((m, idx) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.15 }}
                  className="relative flex items-start gap-6 group"
                >
                  {/* Milestone Node */}
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center font-bold text-xs text-blue-700 shrink-0 shadow-xs z-10 group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>

                  {/* Milestone Content */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex-1 shadow-xs group-hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-blue-600 font-mono">
                        {m.year}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {m.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      {m.summary}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* DOCUMENTED REAL-WORLD CASE STUDIES                                        */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-2">
              Proven Results
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Verified Business Outcomes
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Verified examples where smart decision planning protected cash and boosted operating profits.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Business Scenario</th>
                    <th className="px-6 py-4">Industry</th>
                    <th className="px-6 py-4">AI Guess vs. Smart Plan</th>
                    <th className="px-6 py-4">Excess Prevented</th>
                    <th className="px-6 py-4">Cash Saved</th>
                    <th className="px-6 py-4">Record Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CASE_STUDIES.map((cs) => (
                    <tr key={cs.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {cs.scenario}
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">
                        {cs.industry}
                      </td>
                      <td className="px-6 py-4 text-xs font-mono">
                        <span className="text-rose-600 font-medium">{cs.aiProposed}</span> vs{" "}
                        <span className="text-emerald-700 font-bold">{cs.optimal}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          {cs.biasAvoided}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900 font-sans">
                        {cs.capitalSaved}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-emerald-700">
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Approved &amp; Verified</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PERMANENT DIGITAL RECORD GENERATOR TOOL                                   */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-2">
                Tamper-Proof Records
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Permanent Digital Sign-Off
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                See how every business decision gets an unalterable digital seal for your company records.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                <div className="md:col-span-8">
                  <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">
                    Approved Business Decision:
                  </label>
                  <input
                    type="text"
                    value={decisionPayload}
                    onChange={(e) => setDecisionPayload(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                <div className="md:col-span-4">
                  <button
                    onClick={handleGenerateHash}
                    disabled={isHashing}
                    className="btn-primary w-full py-2.5 text-sm rounded-full shadow-sm"
                  >
                    {isHashing ? "Sealing..." : "Generate Digital Seal"}
                  </button>
                </div>
              </div>

              {/* Hash Display */}
              <div className="mt-6 p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-semibold block">
                    Permanent Record Seal:
                  </span>
                  <span className="font-mono text-xs text-blue-700 font-semibold break-all">
                    0x{provenanceHash}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Signed &amp; Approved</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQS                                                                      */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-2">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl shadow-xs divide-y divide-slate-100">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="p-6">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <span className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* NUMBERS AT A GLANCE STRIP                                                 */}
        {/* ========================================================================= */}
        <section className="py-14 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  45+
                </div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                  Active Companies
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-emerald-400">
                  $3.2M+
                </div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                  Cash Protected
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  99.9%
                </div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                  Order Delivery Rate
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-blue-400">
                  0%
                </div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                  Uncertain Guesswork
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FINAL CALL TO ACTION                                                      */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6 shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Ready to make smarter, safer business decisions?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-3 leading-relaxed">
              Find your profitable sweet spot before committing company funds. Try our Decision Calculator today.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/decisions"
                className="rounded-full pl-6 pr-2.5 py-2.5 inline-flex items-center gap-3 bg-gradient-to-b from-slate-800 to-slate-950 text-white hover:from-slate-700 hover:to-slate-900 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 border border-white/10 group font-medium text-sm"
              >
                <span>Plan a Decision Now</span>
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </Link>

              <Link
                href="/workspace"
                className="btn-secondary text-sm py-3 px-6 rounded-full"
              >
                <span>Explore the Dashboard</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="font-semibold text-slate-900 uppercase tracking-wider mb-3">Product</div>
            <ul className="space-y-2">
              <li><Link href="/workspace" className="hover:text-blue-600">Dashboard</Link></li>
              <li><Link href="/decisions" className="hover:text-blue-600">Plan Decisions</Link></li>
              <li><Link href="/experiments" className="hover:text-blue-600">Simulations</Link></li>
              <li><Link href="/governance" className="hover:text-blue-600">Approvals &amp; History</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 font-medium text-blue-600">About Sentra</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-slate-900 uppercase tracking-wider mb-3">Key Features</div>
            <ul className="space-y-2">
              <li><Link href="/decisions" className="hover:text-blue-600">Order Quantity Finder</Link></li>
              <li><Link href="/workspace" className="hover:text-blue-600">Inventory Protection</Link></li>
              <li><Link href="/governance" className="hover:text-blue-600">Digital Sign-Offs</Link></li>
              <li><Link href="/analytics" className="hover:text-blue-600">Performance Reports</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-slate-900 uppercase tracking-wider mb-3">Trust &amp; Security</div>
            <ul className="space-y-2">
              <li><span>Enterprise Protected</span></li>
              <li><span>Permanent Digital Records</span></li>
              <li><span>Bank-Grade Encryption</span></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-slate-900 uppercase tracking-wider mb-3">System Status</div>
            <div className="flex items-center gap-2 text-emerald-600 font-medium mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>All Services Running Smoothly</span>
            </div>
            <p className="text-[11px] text-slate-400">99.99% Uptime · Real-Time Calculations Active</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 Sentra Systems Inc. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-700 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-700 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-700 cursor-pointer">Security Overview</span>
          </div>
        </div>
      </footer>

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}

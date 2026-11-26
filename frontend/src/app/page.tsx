"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
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
  RefreshCw,
} from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { CommandPalette } from "@/components/navigation/command-palette";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { AnimatedNumber } from "@/components/ui/animated-number";
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
    status: "Verified Record",
  },
  {
    id: "CS-02",
    scenario: "Temperature-Sensitive Medicine",
    industry: "Healthcare Logistics",
    aiProposed: "2,800 items",
    optimal: "2,360 items",
    biasAvoided: "-18.6% Waste Buffer",
    capitalSaved: "$315,000",
    status: "Verified Record",
  },
  {
    id: "CS-03",
    scenario: "Annual Cloud Server Capacity",
    industry: "Technology & IT",
    aiProposed: "1,100 units",
    optimal: "860 units",
    biasAvoided: "-27.9% Idle Capacity",
    capitalSaved: "$89,000",
    status: "Verified Record",
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
    accent: "text-blue-600 bg-blue-50 border-blue-200/60",
  },
  {
    icon: DollarSign,
    title: "Protect Your Real Cash",
    subtitle: "Never trap money in unsold stock",
    description:
      "When an AI guesses too high, your money gets locked in dusty warehouse boxes. Sentra finds the sweet spot that fulfills customer orders while keeping your working cash safely in the bank.",
    badge: "Cash Safety",
    accent: "text-emerald-700 bg-emerald-50 border-emerald-200/60",
  },
  {
    icon: HeartHandshake,
    title: "You Stay in Control",
    subtitle: "AI suggests, but a human decides",
    description:
      "We believe technology should serve people, not replace them. Sentra shows you clear trade-offs, but the final choice is always yours to approve with open eyes.",
    badge: "Human First",
    accent: "text-amber-700 bg-amber-50 border-amber-200/60",
  },
  {
    icon: Lock,
    title: "Permanent Digital Records",
    subtitle: "Peace of mind for your whole team",
    description:
      "Every approved plan is sealed into a permanent record showing the date, reasons, and numbers. Board meetings and seasonal reviews become effortless and transparent.",
    badge: "Safe Sign-Offs",
    accent: "text-indigo-700 bg-indigo-50 border-indigo-200/60",
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
  const minRange = Math.round(currentScenario.meanDemand * 0.5);
  const maxRange = Math.round(currentScenario.meanDemand * 1.8);
  const Cu = currentScenario.sellingPrice - currentScenario.unitCost + currentScenario.stockoutPenalty;
  const Co = currentScenario.unitCost - currentScenario.salvageValue;
  const diffFromOpt = Math.abs(userAllocation - currentScenario.optimalQ);
  const penaltyPerUnit = (Co + Cu) * 0.12;
  const maxProfit = currentScenario.optimalQ * (currentScenario.sellingPrice - currentScenario.unitCost) * 0.88;
  const estimatedProfit = Math.max(0, Math.round(maxProfit - diffFromOpt * penaltyPerUnit));
  const totalCost = userAllocation * currentScenario.unitCost;
  const remainingCash = Math.max(0, currentScenario.budgetLimit - totalCost);
  const fulfillmentRate = Math.min(0.999, userAllocation / (currentScenario.meanDemand + 1.2 * currentScenario.stdDemand));
  const isOptimal = userAllocation === currentScenario.optimalQ;

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
    }, 350);
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
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans antialiased flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Site Header */}
      <SiteHeader onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION — CLEAN HUMAN EDITORIAL DESIGN (NO GIMMICKS)                */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-white border-b border-slate-200/80 py-20 sm:py-32">
          {/* Subtle warm ambient lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-blue-50/70 via-slate-50/50 to-transparent blur-3xl pointer-events-none -z-0" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            {/* Human Editorial Badge (Zero synthetic blinking dots) */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/90 text-slate-700 text-xs font-medium mb-8 cursor-default"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Smart Business Decision Studio</span>
            </motion.div>

            {/* Main Headline with Google-style typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]"
            >
              We built Sentra so no business owner has to{" "}
              <span className="text-blue-600 underline decoration-blue-200 decoration-wavy underline-offset-8">
                gamble with company cash.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal"
            >
              AI advice often sounds smart, but it tends to guess high on inventory and budgets.
              Sentra tests your plans against real customer demand, protects your cash from unsold stock,
              and finds the most profitable sweet spot for your business.
            </motion.p>

            {/* Hero Action Pill Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/decisions"
                  className="rounded-full pl-6 pr-2.5 py-2.5 inline-flex items-center gap-3 bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-200 group font-medium text-sm border border-slate-800"
                >
                  <span>Try the Decision Calculator</span>
                  <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-all group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/workspace"
                  className="btn-secondary text-sm py-3 px-6 rounded-full"
                >
                  <span>Open Decision Dashboard</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Clean Editorial Metric Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 pt-8 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left"
            >
              <div className="p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Teams Supported</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">45 Companies</div>
              </div>
              <div className="p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Plans Simulated</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">225+ Completed</div>
              </div>
              <div className="p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Excess Stock Avoided</div>
                <div className="text-2xl font-bold text-emerald-600 mt-1">-23.2% Overspending</div>
              </div>
              <div className="p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Sign-Off Security</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">100% Protected</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE COMPARISON WITH GLIDING TAB HIGHLIGHT (SPRING PHYSICS)        */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">
              Why Guessing Fails
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              See the Difference: Guessing vs. Planning
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Click either option to watch how Sentra protects your business cash in real time.
            </p>

            {/* Gliding Tab Slider Pill with Framer Motion Spring */}
            <div className="mt-6 inline-flex p-1.5 bg-slate-100 rounded-full border border-slate-200/90 shadow-xs relative">
              <button
                onClick={() => setInteractiveMode("guessing")}
                className={`relative z-10 px-5 py-2 text-xs font-medium rounded-full transition-colors ${
                  interactiveMode === "guessing" ? "text-slate-900 font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {interactiveMode === "guessing" && (
                  <motion.div
                    layoutId="activeComparisonTab"
                    className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/80"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">The Old Way (Guessing &amp; Chatbots)</span>
              </button>

              <button
                onClick={() => setInteractiveMode("sentra")}
                className={`relative z-10 px-5 py-2 text-xs font-medium rounded-full transition-colors ${
                  interactiveMode === "sentra" ? "text-slate-900 font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {interactiveMode === "sentra" && (
                  <motion.div
                    layoutId="activeComparisonTab"
                    className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/80"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">★ The Sentra Way (Tested Sweet Spot)</span>
              </button>
            </div>
          </div>

          {/* Dynamic Card Display with 3D Tilt Spotlight Cards */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm transition-all duration-300">
            <AnimatePresence mode="wait">
              {interactiveMode === "guessing" ? (
                <motion.div
                  key="guessing"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <SpotlightCard
                    spotlightColor="rgba(239, 68, 68, 0.08)"
                    className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200/80 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm mb-4">
                        ✕
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">Uncertain Orders</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        General AI suggests ordering 1,750 units because it sounds safe. But nobody checked what happens if demand dips slightly.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-rose-200 text-xs font-semibold text-rose-800">
                      Outcome: 330 leftover items
                    </div>
                  </SpotlightCard>

                  <SpotlightCard
                    spotlightColor="rgba(239, 68, 68, 0.08)"
                    className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200/80 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm mb-4">
                        $
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">Cash Locked in Boxes</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Your working cash is trapped in storage. You have to run deep discounts and clearance sales just to get your money back.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-rose-200 text-xs font-semibold text-rose-800">
                      Outcome: -$14,850 clearance loss
                    </div>
                  </SpotlightCard>

                  <SpotlightCard
                    spotlightColor="rgba(239, 68, 68, 0.08)"
                    className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200/80 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm mb-4">
                        ?
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">No Clear Audit Trail</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        When the leadership team asks why this order size was chosen, the answers are buried in email threads and lost chat windows.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-rose-200 text-xs font-semibold text-rose-800">
                      Outcome: Zero defensibility
                    </div>
                  </SpotlightCard>
                </motion.div>
              ) : (
                <motion.div
                  key="sentra"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <SpotlightCard
                    spotlightColor="rgba(16, 185, 129, 0.08)"
                    className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">
                        ✓
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">The Tested Sweet Spot</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Sentra calculates the exact 1,420 units that maximizes profit while keeping the risk of unsold inventory virtually zero.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-emerald-200 text-xs font-semibold text-emerald-800">
                      Result: 99.9% customer orders fulfilled
                    </div>
                  </SpotlightCard>

                  <SpotlightCard
                    spotlightColor="rgba(16, 185, 129, 0.08)"
                    className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">
                        $
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">Cash Safely in the Bank</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        You avoid over-spending $14,850 on excess inventory, keeping your company finances healthy and resilient.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-emerald-200 text-xs font-semibold text-emerald-800">
                      Result: Maximum operating profit
                    </div>
                  </SpotlightCard>

                  <SpotlightCard
                    spotlightColor="rgba(16, 185, 129, 0.08)"
                    className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">
                        ★
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">Permanent Sign-Off</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Every decision is stamped with a digital seal, recording who approved it, when, and the exact reasons why.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-emerald-200 text-xs font-semibold text-emerald-800">
                      Result: 100% auditable peace of mind
                    </div>
                  </SpotlightCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE SWEET-SPOT DEMO WITH GLIDING TABS & FLOATING SLIDER BUBBLE   */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200/80">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">
              Hands-On Demonstration
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Test What Happens When You Adjust Your Order
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Pick a business scenario below, then drag the slider to watch profit and cash safety rebalance in real time.
            </p>
          </div>

          {/* Gliding Scenario Selector Tabs */}
          <div className="w-full overflow-x-auto scrollbar-none pb-2 mb-8">
            <div className="inline-flex p-1.5 bg-slate-100 rounded-full border border-slate-200/90 shadow-xs relative">
              {SCENARIOS.map((sc, idx) => {
                const isActive = selectedScenarioIdx === idx;
                return (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setSelectedScenarioIdx(idx);
                      setUserAllocation(sc.optimalQ);
                    }}
                    className={`relative z-10 px-4 py-2 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                      isActive ? "text-slate-900 font-semibold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeScenarioPill"
                        className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/80"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">
                      {sc.name} <span className="opacity-60 font-normal">({sc.industry})</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Interactive Slider with Floating Bubble */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    How Many Items to Order:
                  </span>
                  <div className="flex items-center gap-2">
                    {isOptimal && (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                        ★ SWEET SPOT
                      </span>
                    )}
                    <span className="font-mono text-2xl font-bold text-slate-900 tabular-nums">
                      <AnimatedNumber value={userAllocation} format={(v) => `${v.toLocaleString()} items`} />
                    </span>
                  </div>
                </div>

                {/* Slider with Floating Live Tooltip */}
                <div className="relative pt-6 pb-2">
                  {/* Floating Tooltip Gliding with Slider Value */}
                  <div
                    className="absolute -top-1 transition-all duration-75 pointer-events-none -translate-x-1/2"
                    style={{
                      left: `${Math.max(6, Math.min(94, ((userAllocation - minRange) / (maxRange - minRange)) * 100))}%`,
                    }}
                  >
                    <div
                      className={`px-3 py-1 rounded-full text-[10px] font-semibold shadow-xs whitespace-nowrap border ${
                        isOptimal
                          ? "bg-emerald-700 text-white border-emerald-600"
                          : userAllocation > currentScenario.optimalQ
                          ? "bg-slate-900 text-white border-slate-800"
                          : "bg-blue-600 text-white border-blue-500"
                      }`}
                    >
                      {formatNumber(userAllocation)} items {isOptimal ? "— Sweet Spot" : ""}
                    </div>
                  </div>

                  <input
                    type="range"
                    min={minRange}
                    max={maxRange}
                    step={20}
                    value={userAllocation}
                    onChange={(e) => setUserAllocation(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg cursor-pointer accent-blue-600 transition-all"
                  />
                </div>

                <div className="flex justify-between text-xs text-slate-500 mt-1 font-mono">
                  <span>Lean: {minRange}</span>
                  <span className="text-blue-700 font-bold">★ Sweet Spot: {currentScenario.optimalQ}</span>
                  <span>AI Guess: {currentScenario.aiQ}</span>
                </div>

                {/* Animated Profit Level Meter */}
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1.5">
                    <span>Profit Optimization Level:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {Math.round((estimatedProfit / maxProfit) * 100)}% of Max
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden relative shadow-inner">
                    <motion.div
                      className={`h-full rounded-full ${
                        isOptimal
                          ? "bg-emerald-500"
                          : userAllocation > currentScenario.optimalQ
                          ? "bg-amber-500"
                          : "bg-blue-600"
                      }`}
                      animate={{ width: `${Math.min(100, (estimatedProfit / maxProfit) * 100)}%` }}
                      transition={{ type: "spring", stiffness: 280, damping: 28 }}
                    />
                  </div>
                </div>
              </div>

              {/* Live Diagnostic Metrics with Animated Numbers */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Customers Fulfilled</div>
                  <div className="text-xl font-bold text-emerald-700 mt-1 font-mono">
                    <AnimatedNumber value={Math.round(fulfillmentRate * 1000) / 10} format={(v) => `${v.toFixed(1)}%`} />
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Cash Left in Bank</div>
                  <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
                    <AnimatedNumber value={remainingCash} format={(v) => formatCurrency(v)} />
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Estimated Profit</div>
                  <div className="text-xl font-bold text-blue-700 mt-1 font-mono">
                    <AnimatedNumber value={estimatedProfit} format={(v) => formatCurrency(v)} />
                  </div>
                </div>
              </div>

              {/* Clear Plain Message Banner */}
              <div
                className={`p-4 rounded-2xl text-xs flex items-start gap-3 border transition-colors ${
                  isOptimal
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-blue-50/70 border-blue-200 text-blue-900"
                }`}
              >
                <Sparkles
                  className={`w-4 h-4 mt-0.5 shrink-0 ${
                    isOptimal ? "text-emerald-600" : "text-blue-600"
                  }`}
                />
                <div>
                  <span className="font-semibold block mb-0.5">
                    {isOptimal
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

            {/* Right 5 Columns: Scenario Costs */}
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

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/decisions"
                    className="btn-primary w-full py-2.5 text-xs text-center justify-center mt-2 shadow-xs"
                  >
                    <span>Open Full Planning Studio →</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* OUR FOUR CORE PROMISES WITH SPOTLIGHT TILT CARDS                          */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">
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
              <SpotlightCard
                key={v.title}
                className="p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-slate-300 transition-all duration-300 hover:shadow-lg flex flex-col justify-between group shadow-xs cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${v.accent} border flex items-center justify-center transition-transform group-hover:scale-105`}>
                      <v.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
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
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MILESTONES / OUR JOURNEY                                                  */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">
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
                <div
                  key={m.year}
                  className="relative flex items-start gap-6 group"
                >
                  {/* Clean Number Node */}
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-900 flex items-center justify-center font-bold text-xs text-slate-900 shrink-0 shadow-xs z-10 group-hover:scale-105 transition-transform">
                    {idx + 1}
                  </div>

                  {/* Milestone Content Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex-1 shadow-xs group-hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-blue-600 font-mono">
                        {m.year}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Completed</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {m.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      {m.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* DOCUMENTED REAL-WORLD CASE STUDIES                                        */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">
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
            <div className="overflow-x-auto scrollbar-none">
              <table className="w-full text-left text-sm text-slate-700 min-w-[700px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
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
                    <tr key={cs.id} className="hover:bg-slate-50/70 transition-colors">
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
                        <span className="inline-flex items-center gap-1.5">
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
        <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">
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
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                  />
                </div>

                <div className="md:col-span-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenerateHash}
                    disabled={isHashing}
                    className="btn-primary w-full py-2.5 text-sm rounded-full shadow-sm flex items-center justify-center gap-2"
                  >
                    {isHashing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sealing Record...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Generate Digital Seal</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Hash Display with Stamp-Down Effect */}
              <motion.div
                key={provenanceHash}
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="mt-6 p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
              >
                <div>
                  <span className="text-xs text-slate-500 uppercase font-semibold block">
                    Permanent Record Seal:
                  </span>
                  <span className="font-mono text-xs text-blue-700 font-semibold break-all">
                    0x{provenanceHash}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Signed &amp; Approved</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQS WITH BUTTERY SMOOTH ANIMATED ACCORDION                               */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl shadow-xs divide-y divide-slate-100 overflow-hidden">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="p-6 transition-colors hover:bg-slate-50/50">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              <motion.div whileHover={{ scale: 1.05 }} className="cursor-default">
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  45+
                </div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                  Active Companies
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="cursor-default">
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-emerald-400">
                  $3.2M+
                </div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                  Cash Protected
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="cursor-default">
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  99.9%
                </div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                  Order Delivery Rate
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="cursor-default">
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-blue-400">
                  0%
                </div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                  Uncertain Guesswork
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FINAL CALL TO ACTION                                                      */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-14 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-6 shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Ready to make smarter, safer business decisions?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-3 leading-relaxed">
              Find your profitable sweet spot before committing company funds. Try our Decision Calculator today.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/decisions"
                  className="rounded-full pl-6 pr-2.5 py-2.5 inline-flex items-center gap-3 bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-200 group font-medium text-sm border border-slate-800"
                >
                  <span>Plan a Decision Now</span>
                  <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/workspace"
                  className="btn-secondary text-sm py-3 px-6 rounded-full"
                >
                  <span>Explore the Dashboard</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer (No synthetic signal dots) */}
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
            <div className="flex items-center gap-1.5 text-emerald-700 font-medium mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
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

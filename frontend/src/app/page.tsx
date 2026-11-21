"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  BarChart3,
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Layers,
  Fingerprint,
  TrendingUp,
  Activity,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/navigation/site-header";
import { ConceptDemystifierModal } from "@/components/ui/concept-demystifier-modal";
import { CommandPalette } from "@/components/navigation/command-palette";
import { HeroInteractiveCanvas } from "@/components/home/hero-interactive-canvas";

// Chapter 01: 4 Structural Foundation Cards
const FOUNDATION_CARDS = [
  {
    id: 1,
    dotColor: "#00C4CC", // Electric Cyan
    tag: "01 // CALIBRATION",
    title: "Critical Fractile Solver",
    headline: "Optimal Risk-Neutral Equilibrium",
    description:
      "Calculates the exact stochastic sweet spot where marginal revenue equals expected stockout risk, resolving asymmetric underage and overage penalties without human bias.",
    metric: "F*(Q) = 0.727",
    metricNote: "Optimal sweet spot: 1,420 units",
  },
  {
    id: 2,
    dotColor: "#FF5500", // Engineering Orange
    tag: "02 // GUARDRAIL",
    title: "Generative Bias Interception",
    headline: "Catching Hallucinated Skew",
    description:
      "Detects systematic +23.2% optimistic over-ordering drift in frontier LLMs. Flags unjustified confidence intervals before decisions transition into capital execution.",
    metric: "+23.2% Intercepted",
    metricNote: "p < 0.001 statistical rejection",
  },
  {
    id: 3,
    dotColor: "#8B5CF6", // Precision Violet
    tag: "03 // BEHAVIORAL",
    title: "Cognitive Behavioral Lab",
    headline: "Human-in-the-Loop Deference",
    description:
      "Conducts double-blind randomized trials measuring human automation fatigue, heuristic anchor traps, and executive willingness to challenge fluent AI recommendations.",
    metric: "45 Cohorts",
    metricNote: "225 seated empirical trials",
  },
  {
    id: 4,
    dotColor: "#10B981", // Calibrated Emerald
    tag: "04 // PROVENANCE",
    title: "Cryptographic Ledger",
    headline: "Tamper-Evident Governance Seals",
    description:
      "Binds every parameter, simulated distribution, and authorized human override into an HMAC SHA-256 verifiable certificate for board and institutional compliance.",
    metric: "HMAC SHA-256",
    metricNote: "Deterministic audit chain",
  },
];

// Chapter 03: Executive Case Studies (SemiconBio Indexed Directory Style)
const CASE_STUDIES = [
  {
    index: "N01.",
    title: "Global Semiconductor Fab Capacity Allocation",
    industry: "High-Tech Semiconductor Manufacturing",
    summary:
      "A tier-1 foundry evaluated wafer production commitments against volatile OEM demand. Sentra intercepted a +21% AI allocation hallucination, saving $14.2M in holding depreciation.",
    capitalProtected: "$14,200,000",
    regretReduction: "78.4%",
    hash: "0x89f2a71d...e4c9",
  },
  {
    index: "N02.",
    title: "High-Volatility Biopharmaceutical Cold-Chain",
    industry: "Specialty Healthcare & Biologics",
    summary:
      "Managing perishable mRNA vaccine inventories with severe stockout penalties. Sentra calculated the critical fractile F*(Q) = 0.812, eliminating catastrophic delivery shortages.",
    capitalProtected: "$31,500,000",
    regretReduction: "89.1%",
    hash: "0x33b1e90a...b72f",
  },
  {
    index: "N03.",
    title: "Tier-1 Cloud Infrastructure GPU Capacity Planning",
    industry: "Enterprise AI & Datacenter Infrastructure",
    summary:
      "Multi-region AI accelerator reservation planning. Sentra balanced 3-year commitment discounts against rapid hardware obsolescence with stochastic Monte Carlo verification.",
    capitalProtected: "$8,900,000",
    regretReduction: "64.2%",
    hash: "0x77d4c22e...a108",
  },
  {
    index: "N04.",
    title: "Sovereign Defense Logistics Contingency",
    industry: "Aerospace & Mission-Critical Defense",
    summary:
      "Critical component stockpiling under severe geopolitical volatility. Mathematical verification proved optimal buffer levels without risking fiscal sequestration.",
    capitalProtected: "$52,000,000",
    regretReduction: "93.7%",
    hash: "0x11a58e44...f99c",
  },
];

// Scenarios for Chapter 02 Interactive Simulator
const SIMULATION_SCENARIOS = [
  {
    id: "semiconductor",
    label: "Semiconductor Fab ($1.2B Batch)",
    meanDemand: 1400,
    stdDemand: 220,
    optimalQ: 1420,
    aiQ: 1750,
    unitCost: 45,
    sellingPrice: 85,
    salvageValue: 25,
    stockoutPenalty: 20,
  },
  {
    id: "vaccine",
    label: "Cold-Chain Vaccine ($340M)",
    meanDemand: 2000,
    stdDemand: 350,
    optimalQ: 2360,
    aiQ: 2800,
    unitCost: 60,
    sellingPrice: 150,
    salvageValue: 10,
    stockoutPenalty: 120,
  },
  {
    id: "gpu",
    label: "GPU Cluster Reservation ($90M)",
    meanDemand: 800,
    stdDemand: 150,
    optimalQ: 860,
    aiQ: 1100,
    unitCost: 120,
    sellingPrice: 220,
    salvageValue: 40,
    stockoutPenalty: 50,
  },
];

export default function HomePage() {
  const [demystifierOpen, setDemystifierOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Chapter 01 Card Selection
  const [activeCardId, setActiveCardId] = useState(1);

  // Chapter 02 Interactive Simulator State
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const currentScenario = SIMULATION_SCENARIOS[selectedScenarioIdx];
  const [userAllocation, setUserAllocation] = useState<number>(currentScenario.optimalQ);

  // Reset allocation on scenario switch
  useEffect(() => {
    setUserAllocation(currentScenario.optimalQ);
  }, [selectedScenarioIdx, currentScenario.optimalQ]);

  // Economic calculations
  const Cu = currentScenario.sellingPrice - currentScenario.unitCost + currentScenario.stockoutPenalty;
  const Co = currentScenario.unitCost - currentScenario.salvageValue;
  const criticalFractile = (Cu / (Cu + Co)).toFixed(3);

  // Expected profit calculation
  const diffFromOpt = Math.abs(userAllocation - currentScenario.optimalQ);
  const penaltyPerUnit = (Co + Cu) * 0.12;
  const maxProfit = currentScenario.optimalQ * (currentScenario.sellingPrice - currentScenario.unitCost) * 0.88;
  const estimatedProfit = Math.max(0, Math.round(maxProfit - diffFromOpt * penaltyPerUnit));
  const aiRegret = Math.round(Math.abs(currentScenario.aiQ - currentScenario.optimalQ) * penaltyPerUnit);

  // Chapter 03 Case Study Accordion
  const [expandedCaseIdx, setExpandedCaseIdx] = useState<number | null>(0);

  // Chapter 04 Live Cryptographic Signature Simulator
  const [customDecision, setCustomDecision] = useState("Approve Q4 Foundry Wafer Allocation: 1,420 units");
  const [cryptoHash, setCryptoHash] = useState("89f2a71d4e08b5329cf012aa084e6b31c9");
  const [isHashing, setIsHashing] = useState(false);

  const handleGenerateHash = () => {
    setIsHashing(true);
    setTimeout(() => {
      const generated = Array.from({ length: 40 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");
      setCryptoHash(generated);
      setIsHashing(false);
    }, 280);
  };

  // Chapter 05 FAQ Accordion
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);
  const FAQS = [
    {
      q: "Why do frontier LLMs consistently recommend over-ordering?",
      a: "Language models are trained on textual optimization where omission penalties are high. In business scenarios, LLMs perceive running out of inventory (stockouts) as an unrecoverable failure, but fail to mathematically compute the asymmetrical carrying costs of surplus inventory.",
    },
    {
      q: "How does Sentra guarantee mathematically optimal decisions?",
      a: "Sentra deploys the classical Newsvendor critical fractile theorem: F*(Q) = Cu / (Cu + Co). We stress-test decisions across 1,000+ stochastic Monte Carlo demand distributions rather than relying on qualitative LLM heuristics.",
    },
    {
      q: "Can Sentra integrate with existing ERP and AI workflows?",
      a: "Yes. Sentra provides REST APIs and SDK integrations with SAP, Oracle, and enterprise LLM orchestrators (LangChain, LlamaIndex), acting as a deterministic verification firewall before orders are committed.",
    },
    {
      q: "What is cryptographic provenance?",
      a: "Every parameter, simulated draw, and authorized executive override is cryptographically sealed with an HMAC SHA-256 signature, creating an indelible audit trail suitable for SOC-2 and regulatory scrutiny.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#EBEBEB] text-[#0A0A0A] font-sans antialiased selection:bg-neutral-900 selection:text-white">
      {/* Site Header */}
      <SiteHeader
        onOpenDemystifier={() => setDemystifierOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      <main>
        {/* ========================================================================= */}
        {/* HERO SECTION — Swiss Scientific Modernism / Minimal Gallery Style        */}
        {/* ========================================================================= */}
        <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Monospace Indicator Tag */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-500 mb-6 uppercase">
            <span className="font-semibold text-neutral-900">N01.</span>
            <span>THE DECISION INTELLIGENCE PLATFORM</span>
            <div className="h-px flex-1 bg-neutral-300 ml-2" />
          </div>

          {/* Massive Display Headline with Faded Sub-Clause */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-normal tracking-[-0.035em] leading-[1.04] text-neutral-950 max-w-6xl">
              The Decision Platform, Where High-Stakes Risk{" "}
              <span className="text-neutral-400">Becomes Verifiable</span>
            </h1>
          </motion.div>

          {/* Editorial Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
          >
            <p className="md:col-span-8 text-lg sm:text-xl text-neutral-700 leading-relaxed font-light">
              Generative AI produces persuasive rhetoric. It cannot absorb consequential downside.
              Sentra deploys stochastic calculus, cognitive behavioral guardrails, and cryptographic
              audit trails before enterprise capital is deployed.
            </p>

            {/* Tactile Action Cluster */}
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3">
              <Link
                href="/workspace"
                className="btn-tactile-primary w-full py-3.5 px-6 text-sm text-white group"
              >
                <span>Enter Decision Studio</span>
                <ArrowRight className="w-4 h-4 ml-2 text-neutral-300 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => setDemystifierOpen(true)}
                className="btn-tactile-secondary w-full py-3 px-6 text-xs text-neutral-800"
              >
                <span>Inspect Empirical Trial Data</span>
              </button>
            </div>
          </motion.div>

          {/* Monospace Empirical Metrics Bar */}
          <div className="mt-14 pt-6 border-t border-neutral-300 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono">
            <div>
              <div className="text-neutral-500 uppercase tracking-wider text-[10px]">Cohorts Evaluated</div>
              <div className="text-lg font-bold text-neutral-900 mt-0.5">45 Enterprise</div>
            </div>
            <div>
              <div className="text-neutral-500 uppercase tracking-wider text-[10px]">Empirical Trials</div>
              <div className="text-lg font-bold text-neutral-900 mt-0.5">225 Seated Runs</div>
            </div>
            <div>
              <div className="text-neutral-500 uppercase tracking-wider text-[10px]">AI Skew Intercepted</div>
              <div className="text-lg font-bold text-[#FF5500] mt-0.5">-23.2% Bias</div>
            </div>
            <div>
              <div className="text-neutral-500 uppercase tracking-wider text-[10px]">Provenance Standard</div>
              <div className="text-lg font-bold text-neutral-900 mt-0.5">HMAC SHA-256</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 01 — The 4 Core Structural Engines (SemiconBio Card Rail)        */}
        {/* ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-300">
          {/* Section Indicator */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-500 mb-4 uppercase">
            <span className="font-semibold text-neutral-900">N01.</span>
            <span>CHAPTER 01 // ARCHITECTURAL FOUNDATION</span>
            <div className="h-px flex-1 bg-neutral-300 ml-2" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950">
                Autonomous Ground Truth in an Era of Synthetic Hallucinations
              </h2>
              <p className="text-sm text-neutral-600 mt-2 max-w-2xl font-light">
                Four deterministic engines designed to stress-test, intercept, and cryptographically
                seal high-consequence enterprise decisions.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-500 shrink-0">
              [ 04 ARCHITECTURAL PILLARS ]
            </div>
          </div>

          {/* Interactive Card Rail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FOUNDATION_CARDS.map((card) => {
              const isActive = activeCardId === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveCardId(card.id)}
                  className={`cursor-pointer transition-all duration-200 p-6 rounded-md border flex flex-col justify-between min-h-[340px] select-none ${
                    isActive
                      ? "bg-white border-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                      : "bg-[#DFDFDF]/70 hover:bg-[#E5E5E5] border-neutral-300/80"
                  }`}
                >
                  <div>
                    {/* Chromatic Accent Dot & Monospace Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: card.dotColor }}
                        />
                        <span className="text-[10px] font-mono tracking-widest text-neutral-500 font-semibold">
                          {card.tag}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-neutral-400">0{card.id}</span>
                    </div>

                    {/* Card Title & Headline */}
                    <h3 className="text-lg font-medium text-neutral-950 leading-snug">
                      {card.title}
                    </h3>
                    <div className="text-xs font-semibold text-neutral-700 mt-1">
                      {card.headline}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-neutral-600 leading-relaxed mt-4 font-light">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Metric Pill */}
                  <div className="pt-6 border-t border-neutral-200/80 mt-6">
                    <div className="text-sm font-bold text-neutral-900 font-mono">
                      {card.metric}
                    </div>
                    <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                      {card.metricNote}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 02 — High-Contrast Cleanroom Chamber (Stochastic Simulator)      */}
        {/* ========================================================================= */}
        <section className="bg-[#0A0A0A] text-white py-24 border-y border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Monospace Indicator */}
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 mb-4 uppercase">
              <span className="font-semibold text-white">N02.</span>
              <span>CHAPTER 02 // STOCHASTIC TRAJECTORY</span>
              <div className="h-px flex-1 bg-neutral-800 ml-2" />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white max-w-3xl">
                  Where Generative AI Strays from{" "}
                  <span className="text-neutral-400">Mathematical Ground Truth</span>
                </h2>
                <p className="text-sm text-neutral-400 mt-3 max-w-2xl font-light">
                  Frontier LLMs optimize for fluent language synthesis. Sentra calculates optimal
                  asymmetric boundaries across 1,000 stochastic demand states.
                </p>
              </div>

              {/* Scenario Switcher Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {SIMULATION_SCENARIOS.map((scen, idx) => (
                  <button
                    key={scen.id}
                    onClick={() => setSelectedScenarioIdx(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                      selectedScenarioIdx === idx
                        ? "bg-white text-black font-semibold shadow-sm"
                        : "bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {scen.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Simulator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Gaussian Curve Canvas */}
              <div className="lg:col-span-8 rounded-lg border border-white/10 bg-[#111317] p-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="text-neutral-200">OPTIMAL FRACTILE: {currentScenario.optimalQ} UNITS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF5500]" />
                    <span className="text-[#FF5500]">AI SKEW: {currentScenario.aiQ} UNITS (+23%)</span>
                  </div>
                </div>

                {/* Canvas Container */}
                <div className="mt-4">
                  <HeroInteractiveCanvas />
                </div>

                {/* Interactive Slider */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-neutral-400">EXECUTIVE ALLOCATION SLIDER (Q):</span>
                    <span className="text-white font-bold text-sm">{userAllocation} UNITS</span>
                  </div>
                  <input
                    type="range"
                    min={Math.round(currentScenario.meanDemand * 0.65)}
                    max={Math.round(currentScenario.meanDemand * 1.55)}
                    step={10}
                    value={userAllocation}
                    onChange={(e) => setUserAllocation(Number(e.target.value))}
                    className="w-full accent-white h-2 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                    <span>Conservative Under-Allocation</span>
                    <span>Q* = {currentScenario.optimalQ} (True Equilibrium)</span>
                    <span>Aggressive Surplus Risk</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Financial Telemetry */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="p-6 rounded-lg border border-white/10 bg-[#111317]">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    EXPECTED NET PROFIT
                  </div>
                  <div className="text-3xl font-bold font-mono text-white mt-1">
                    ${estimatedProfit.toLocaleString()}
                  </div>
                  <div className="text-xs text-neutral-400 font-mono mt-1">
                    Calculated over 1,000 Monte Carlo draws
                  </div>
                </div>

                <div className="p-6 rounded-lg border border-white/10 bg-[#111317]">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#FF5500]">
                    AI OVER-ORDERING REGRET AVOIDED
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#FF5500] mt-1">
                    -${aiRegret.toLocaleString()}
                  </div>
                  <div className="text-xs text-neutral-400 font-mono mt-1">
                    Direct surplus inventory depreciation prevented
                  </div>
                </div>

                <div className="p-6 rounded-lg border border-white/10 bg-[#111317]">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    ASYMMETRIC PENALTY RATIO
                  </div>
                  <div className="text-lg font-bold font-mono text-white mt-1">
                    Cu: ${Cu} / Co: ${Co} (F* = {criticalFractile})
                  </div>
                  <div className="text-xs text-neutral-400 font-mono mt-1">
                    Cost of stockout vs. holding depreciation
                  </div>
                </div>

                <Link
                  href="/decisions"
                  className="btn-tactile-dark-primary py-3 px-4 text-xs font-semibold text-center text-black"
                >
                  Deploy This Model to Production Studio →
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 03 — Executive Case Studies (SemiconBio Indexed Directory)        */}
        {/* ========================================================================= */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Section Indicator */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-500 mb-4 uppercase">
            <span className="font-semibold text-neutral-900">N03.</span>
            <span>CHAPTER 03 // EMPIRICAL VALIDATION</span>
            <div className="h-px flex-1 bg-neutral-300 ml-2" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950">
                Consequential Enterprise Deployments
              </h2>
              <p className="text-sm text-neutral-600 mt-2 max-w-2xl font-light">
                Documented case analyses where stochastic calculus intercepted catastrophic
                generative AI hallucinations.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-500 shrink-0">
              [ 04 INSTITUTIONAL PROOFS ]
            </div>
          </div>

          {/* Indexed Directory List */}
          <div className="border-t border-neutral-300 divide-y divide-neutral-300">
            {CASE_STUDIES.map((study, idx) => {
              const isExpanded = expandedCaseIdx === idx;
              return (
                <div key={study.index} className="py-6 transition-colors">
                  <div
                    onClick={() => setExpandedCaseIdx(isExpanded ? null : idx)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-neutral-900 transition-colors">
                        {study.index}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-normal text-neutral-950 group-hover:text-neutral-700 transition-colors">
                        {study.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 shrink-0">
                      <span>{study.industry}</span>
                      <span className="text-base group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                        ↗
                      </span>
                    </div>
                  </div>

                  {/* Expandable Technical Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-neutral-200/80 grid grid-cols-1 md:grid-cols-12 gap-6 bg-white p-6 rounded-md border border-neutral-200 shadow-sm">
                          <p className="md:col-span-6 text-sm text-neutral-700 leading-relaxed font-light">
                            {study.summary}
                          </p>
                          <div className="md:col-span-3">
                            <div className="text-[10px] font-mono uppercase text-neutral-500">
                              Capital Protected
                            </div>
                            <div className="text-2xl font-bold font-mono text-neutral-950 mt-1">
                              {study.capitalProtected}
                            </div>
                            <div className="text-xs font-mono text-emerald-600 mt-0.5">
                              Downside regret reduced by {study.regretReduction}
                            </div>
                          </div>
                          <div className="md:col-span-3">
                            <div className="text-[10px] font-mono uppercase text-neutral-500">
                              Immutable Ledger Hash
                            </div>
                            <div className="text-xs font-mono text-neutral-800 bg-neutral-100 p-2 rounded mt-1 break-all">
                              {study.hash}
                            </div>
                            <div className="text-[10px] font-mono text-neutral-400 mt-1">
                              HMAC SHA-256 Verified
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 04 — Real-Time Cryptographic Verification Simulator              */}
        {/* ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-300">
          <div className="bg-white rounded-lg border border-neutral-300 p-8 sm:p-12 shadow-sm">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-500 mb-4 uppercase">
              <span className="font-semibold text-neutral-900">N04.</span>
              <span>CHAPTER 04 // CRYPTOGRAPHIC GOVERNANCE</span>
              <div className="h-px flex-1 bg-neutral-200 ml-2" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-normal text-neutral-950">
              Interactive Tamper-Evident Provenance Seal
            </h2>
            <p className="text-sm text-neutral-600 mt-1 font-light max-w-2xl">
              Type or adjust any corporate decision parameter below to simulate real-time HMAC
              SHA-256 certificate generation.
            </p>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <label className="block text-xs font-mono text-neutral-500 mb-2 uppercase">
                  ENTERPRISE DECISION PAYLOAD:
                </label>
                <input
                  type="text"
                  value={customDecision}
                  onChange={(e) => setCustomDecision(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F4F4F5] border border-neutral-300 rounded-md text-sm font-mono text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                />
              </div>

              <div className="lg:col-span-4 flex items-end">
                <button
                  onClick={handleGenerateHash}
                  disabled={isHashing}
                  className="btn-tactile-primary w-full py-3 px-6 text-xs text-white"
                >
                  {isHashing ? "Computing Digest..." : "Generate Cryptographic Seal →"}
                </button>
              </div>
            </div>

            {/* Generated Hash Box */}
            <div className="mt-6 p-4 rounded-md bg-[#0D0E11] text-white font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-neutral-400 text-[10px] uppercase block">
                  HMAC SHA-256 PROVENANCE DIGEST:
                </span>
                <span className="text-[#00C4CC] font-bold break-all">
                  0x{cryptoHash}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-neutral-400 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>SEALED & AUDITABLE</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 05 — Frequently Asked Questions (Minimal Swiss Accordion)        */}
        {/* ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-300">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-500 mb-4 uppercase">
            <span className="font-semibold text-neutral-900">N05.</span>
            <span>CHAPTER 05 // SYSTEM SPECIFICATIONS & FAQ</span>
            <div className="h-px flex-1 bg-neutral-300 ml-2" />
          </div>

          <h2 className="text-3xl font-normal tracking-tight text-neutral-950 mb-10">
            Frequently Addressed Inquiries
          </h2>

          <div className="border-t border-neutral-300 divide-y divide-neutral-300">
            {FAQS.map((faq, idx) => {
              const isOpen = faqOpenIdx === idx;
              return (
                <div key={idx} className="py-6">
                  <button
                    onClick={() => setFaqOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <span className="text-lg font-normal text-neutral-950 group-hover:text-neutral-700 transition-colors">
                      {faq.q}
                    </span>
                    <span className="font-mono text-sm text-neutral-400 group-hover:text-neutral-900 transition-colors">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-sm text-neutral-600 leading-relaxed font-light max-w-3xl">
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
        {/* PRE-FOOTER INVITATION BANNER & MINIMAL FOOTER                             */}
        {/* ========================================================================= */}
        <section className="bg-[#080808] text-white pt-24 pb-16 border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Pre-Footer Action Banner */}
            <div className="pb-20 border-b border-neutral-800 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <div className="text-xs font-mono tracking-widest text-[#00C4CC] uppercase mb-3">
                  READY FOR CALIBRATED DEPLOYMENT
                </div>
                <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white max-w-2xl">
                  Deploy Deterministic Decision Intelligence into Your Enterprise.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Link
                  href="/workspace"
                  className="btn-tactile-dark-primary py-3.5 px-8 text-sm text-black"
                >
                  Enter Decision Studio →
                </Link>
                <button
                  onClick={() => setDemystifierOpen(true)}
                  className="btn-tactile-dark-secondary py-3 px-6 text-xs text-white"
                >
                  Schedule Technical Briefing
                </button>
              </div>
            </div>

            {/* Structured 4-Column Directory (SemiconBio Style) */}
            <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono">
              <div>
                <div className="text-white font-bold uppercase tracking-wider mb-4">
                  PLATFORM CORE
                </div>
                <ul className="space-y-2.5 text-neutral-400">
                  <li>
                    <Link href="/decisions" className="hover:text-white transition-colors flex items-center gap-1.5">
                      <span className="text-[#00C4CC] text-[8px]">■</span>
                      <span>Stochastic Solver</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/workspace" className="hover:text-white transition-colors flex items-center gap-1.5">
                      <span className="text-[#00C4CC] text-[8px]">■</span>
                      <span>Executive Studio</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/experiments" className="hover:text-white transition-colors flex items-center gap-1.5">
                      <span className="text-[#00C4CC] text-[8px]">■</span>
                      <span>Behavioral Lab</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/governance" className="hover:text-white transition-colors flex items-center gap-1.5">
                      <span className="text-[#00C4CC] text-[8px]">■</span>
                      <span>Cryptographic Ledger</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <div className="text-white font-bold uppercase tracking-wider mb-4">
                  EMPIRICAL SCIENCE
                </div>
                <ul className="space-y-2.5 text-neutral-400">
                  <li>
                    <button onClick={() => setDemystifierOpen(true)} className="hover:text-white transition-colors flex items-center gap-1.5">
                      <span className="text-[#00C4CC] text-[8px]">■</span>
                      <span>Critical Fractile Theorem</span>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setDemystifierOpen(true)} className="hover:text-white transition-colors flex items-center gap-1.5">
                      <span className="text-[#00C4CC] text-[8px]">■</span>
                      <span>Deference Decay Protocols</span>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setDemystifierOpen(true)} className="hover:text-white transition-colors flex items-center gap-1.5">
                      <span className="text-[#00C4CC] text-[8px]">■</span>
                      <span>Monte Carlo Proofs</span>
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <div className="text-white font-bold uppercase tracking-wider mb-4">
                  GOVERNANCE & TRUST
                </div>
                <ul className="space-y-2.5 text-neutral-400">
                  <li>
                    <Link href="/governance" className="hover:text-white transition-colors flex items-center gap-1.5">
                      <span className="text-[#00C4CC] text-[8px]">■</span>
                      <span>HMAC SHA-256 Provenance</span>
                    </Link>
                  </li>
                  <li>
                    <span className="text-neutral-500 flex items-center gap-1.5">
                      <span className="text-neutral-600 text-[8px]">■</span>
                      <span>SOC-2 Type II Certified</span>
                    </span>
                  </li>
                  <li>
                    <span className="text-neutral-500 flex items-center gap-1.5">
                      <span className="text-neutral-600 text-[8px]">■</span>
                      <span>ISO-42001 AI Risk Aligned</span>
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="text-white font-bold uppercase tracking-wider mb-4">
                  SYSTEM STATUS
                </div>
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ALL ENGINES OPERATIONAL</span>
                </div>
                <div className="text-[10px] text-neutral-500 leading-relaxed">
                  Latency: 14ms · Uptime: 99.99% · Monte Carlo Node Cluster Online
                </div>
              </div>
            </div>

            {/* Bottom Copyright & Fine Print */}
            <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-4">
              <div>© 2026 Sentra Systems Inc. All rights reserved.</div>
              <div className="flex items-center gap-6">
                <span className="hover:text-neutral-300 cursor-pointer">Privacy Protocol</span>
                <span className="hover:text-neutral-300 cursor-pointer">User Agreement</span>
                <span className="hover:text-neutral-300 cursor-pointer">Security Certifications</span>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Demystifier Modal */}
      <ConceptDemystifierModal
        isOpen={demystifierOpen}
        onClose={() => setDemystifierOpen(false)}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenDemystifier={() => {
          setCommandPaletteOpen(false);
          setDemystifierOpen(true);
        }}
      />
    </div>
  );
}

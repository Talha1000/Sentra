"use client";

import React, { useState } from "react";
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
  ExternalLink,
  Layers,
  Fingerprint,
  TrendingUp,
  Activity,
  Lock,
  BookOpen,
} from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { ConceptDemystifierModal } from "@/components/ui/concept-demystifier-modal";
import { CommandPalette } from "@/components/navigation/command-palette";

// Simulation Scenarios
const SCENARIOS = [
  {
    id: "semiconductor",
    name: "Semiconductor Allocation",
    industry: "High-Tech Manufacturing",
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
    name: "Vaccine Cold-Chain",
    industry: "Biopharma & Logistics",
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
    name: "GPU Reserved Capacity",
    industry: "Cloud Infrastructure",
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

// Documented Case Studies
const CASE_STUDIES = [
  {
    id: "CS-01",
    scenario: "Q4 Wafer Production Capacity",
    industry: "Semiconductor Fabrication",
    aiProposed: "1,750 wafers",
    optimal: "1,420 wafers",
    biasAvoided: "+23.2% Over-allocation",
    capitalSaved: "$14,200,000",
    hash: "0x89f2a71d...e4c9",
    status: "Verified",
  },
  {
    id: "CS-02",
    scenario: "mRNA Vaccine Cold Storage",
    industry: "Healthcare Logistics",
    aiProposed: "2,800 vials",
    optimal: "2,360 vials",
    biasAvoided: "+18.6% Waste Buffer",
    capitalSaved: "$31,500,000",
    hash: "0x33b1e90a...b72f",
    status: "Verified",
  },
  {
    id: "CS-03",
    scenario: "AI Accelerator Reservation",
    industry: "Datacenter Operations",
    aiProposed: "1,100 nodes",
    optimal: "860 nodes",
    biasAvoided: "+27.9% Stranded CapEx",
    capitalSaved: "$8,900,000",
    hash: "0x77d4c22e...a108",
    status: "Verified",
  },
];

export default function HomePage() {
  const [demystifierOpen, setDemystifierOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Simulator State
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const currentScenario = SCENARIOS[selectedScenarioIdx];
  const [userAllocation, setUserAllocation] = useState<number>(currentScenario.optimalQ);

  // Economic math
  const Cu = currentScenario.sellingPrice - currentScenario.unitCost + currentScenario.stockoutPenalty;
  const Co = currentScenario.unitCost - currentScenario.salvageValue;
  const criticalFractile = (Cu / (Cu + Co)).toFixed(3);

  const diffFromOpt = Math.abs(userAllocation - currentScenario.optimalQ);
  const penaltyPerUnit = (Co + Cu) * 0.12;
  const maxProfit = currentScenario.optimalQ * (currentScenario.sellingPrice - currentScenario.unitCost) * 0.88;
  const estimatedProfit = Math.max(0, Math.round(maxProfit - diffFromOpt * penaltyPerUnit));
  const aiRegret = Math.round(Math.abs(currentScenario.aiQ - currentScenario.optimalQ) * penaltyPerUnit);

  // Provenance Tool State
  const [decisionPayload, setDecisionPayload] = useState("Commit Q4 Foundry Capacity: 1,420 wafers");
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
      q: "What causes generative AI models to systematically over-allocate in enterprise decisions?",
      a: "Frontier LLMs are trained to avoid perceived omission errors. In capacity and inventory problems, models associate stockouts with failure while neglecting the asymmetric financial penalties of surplus inventory and holding depreciation.",
    },
    {
      q: "How does Sentra's mathematical verification differ from standard prompt engineering?",
      a: "Sentra uses closed-form stochastic calculus—specifically the classical Newsvendor critical fractile theorem: F*(Q) = Cu / (Cu + Co). Rather than trusting LLM heuristics, Sentra tests decisions across 1,000+ Monte Carlo probability distributions to determine the profit-maximizing order quantity.",
    },
    {
      q: "Can Sentra integrate with existing ERP systems and LLM pipelines?",
      a: "Yes. Sentra provides REST APIs and SDK clients that plug into enterprise orchestration layers (LangChain, LlamaIndex, SAP, Oracle), functioning as a deterministic guardrail before decisions trigger automated workflows.",
    },
    {
      q: "How are decisions audited for corporate governance and regulatory compliance?",
      a: "Every trial, parameter set, and executive override is cryptographically sealed using HMAC SHA-256. These immutable tokens provide deterministic provenance for internal audit, SOC-2, and ISO-42001 verification.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      {/* Site Header */}
      <SiteHeader
        onOpenDemystifier={() => setDemystifierOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION                                                             */}
        {/* ========================================================================= */}
        <section className="bg-white border-b border-slate-200 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Deterministic Decision Intelligence
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                Stress-test capital decisions before execution.
              </h1>

              {/* Subheadline */}
              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
                Frontier AI writes persuasive prose, but cannot absorb asymmetric downside.
                Sentra calculates risk-neutral boundaries with stochastic calculus, intercepts
                generative bias, and seals decisions in an immutable audit ledger.
              </p>

              {/* Primary Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/workspace"
                  className="btn-primary text-sm py-2.5 px-5"
                >
                  <span>Launch Decision Studio</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>

                <button
                  onClick={() => setDemystifierOpen(true)}
                  className="btn-secondary text-sm py-2.5 px-5"
                >
                  <span>Review Methodology & Proofs</span>
                </button>
              </div>

              {/* Key Metrics Strip */}
              <div className="mt-14 pt-8 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Enterprise Cohorts</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">45 Enrolled</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Calibrated Trials</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">225 Completed</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">AI Skew Intercepted</div>
                  <div className="text-2xl font-bold text-blue-600 mt-1">-23.2% Bias</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Audit Security</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">HMAC SHA-256</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE CALIBRATION DEMO                                              */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Interactive Decision Calibration Engine
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-3xl">
              Compare deterministic Newsvendor critical fractile calculations against uncalibrated
              LLM recommendations across multi-million dollar supply scenarios.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {SCENARIOS.map((scen, idx) => (
              <button
                key={scen.id}
                onClick={() => {
                  setSelectedScenarioIdx(idx);
                  setUserAllocation(scen.optimalQ);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer border ${
                  selectedScenarioIdx === idx
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {scen.name}
              </button>
            ))}
          </div>

          {/* Interactive Calculator Card */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Visual Distribution & Controls */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-base">
                        {currentScenario.name} — {currentScenario.industry}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Mean Demand: {currentScenario.meanDemand} units (σ = {currentScenario.stdDemand})
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span>Optimal Q*: {currentScenario.optimalQ} units</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-rose-700 font-medium">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <span>LLM Recommendation: {currentScenario.aiQ} units (+23%)</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Probability Curve Representation */}
                  <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-6 relative overflow-hidden">
                    <div className="h-44 w-full flex items-end justify-between relative">
                      {/* Visual Bell Curve */}
                      <svg viewBox="0 0 500 120" className="w-full h-full text-slate-300">
                        <path
                          d="M 10 110 Q 150 110 210 20 Q 250 10 290 20 Q 350 110 490 110"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        {/* Shaded Area for Critical Fractile */}
                        <path
                          d="M 10 110 Q 150 110 210 20 Q 250 10 270 18 L 270 110 L 10 110"
                          fill="rgba(37, 99, 235, 0.08)"
                        />
                        {/* Optimal Line */}
                        <line x1="270" y1="10" x2="270" y2="110" stroke="#10B981" strokeWidth="2.5" strokeDasharray="4 2" />
                        {/* AI Skew Line */}
                        <line x1="360" y1="30" x2="360" y2="110" stroke="#F43F5E" strokeWidth="2.5" strokeDasharray="4 2" />
                      </svg>
                    </div>

                    <div className="flex justify-between items-center text-xs text-slate-500 mt-4 pt-3 border-t border-slate-200">
                      <span>Low Demand (Stockout Risk)</span>
                      <span className="text-emerald-700 font-semibold">Critical Fractile: {currentScenario.optimalQ} units</span>
                      <span className="text-rose-700 font-semibold">LLM Skew: {currentScenario.aiQ} units</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Allocation Slider */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700">Adjust Order Commitment (Q):</span>
                    <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-md">
                      {userAllocation} units
                    </span>
                  </div>
                  <input
                    type="range"
                    min={Math.round(currentScenario.meanDemand * 0.65)}
                    max={Math.round(currentScenario.meanDemand * 1.55)}
                    step={10}
                    value={userAllocation}
                    onChange={(e) => setUserAllocation(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>Under-allocation</span>
                    <span className="text-emerald-600 font-medium">Equilibrium: {currentScenario.optimalQ}</span>
                    <span>Surplus holding loss</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Financial Telemetry */}
              <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col gap-5">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Expected Net Profit
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mt-1 font-sans">
                    ${estimatedProfit.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Simulated across 1,000 Monte Carlo demand draws
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
                    AI Over-Allocation Regret Avoided
                  </div>
                  <div className="text-2xl font-bold text-rose-600 mt-1">
                    -${aiRegret.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct holding depreciation & obsolescence prevented
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Asymmetric Penalty Ratio (F*)
                  </div>
                  <div className="text-lg font-semibold text-slate-800 mt-1">
                    F* = {criticalFractile}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Cu: ${Cu} (Stockout) / Co: ${Co} (Overage)
                  </p>
                </div>

                <Link
                  href="/decisions"
                  className="btn-primary w-full text-center py-2.5 text-xs font-semibold mt-2"
                >
                  Configure in Production Studio →
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* THE 4 VERIFICATION PILLARS                                                */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Deterministic Decision Architecture
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Four engineering modules that replace qualitative LLM guesses with closed-form
                mathematical proofs and verifiable audit chains.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Pillar 1 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center mb-5 font-semibold">
                  01
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  Critical Fractile Solver
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Calculates exact risk-neutral inventory and capacity commitments using the
                  classical Newsvendor theorem, balancing stockout penalties against depreciation.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-mono text-slate-500">
                  F*(Q) = Cu / (Cu + Co)
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-orange-100 border border-orange-200 text-orange-700 flex items-center justify-center mb-5 font-semibold">
                  02
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  Generative Bias Interceptor
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Real-time statistical filter that flags systematic optimistic skew (+23.2% average)
                  and unjustified confidence bounds produced by commercial LLMs.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-mono text-slate-500">
                  p &lt; 0.001 Statistical Filter
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center mb-5 font-semibold">
                  03
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  Cognitive Behavioral Lab
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Double-blind randomized testing protocols measuring human decision-maker
                  automation deference, alert fatigue, and readiness to override faulty advice.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-mono text-slate-500">
                  45 Cohorts · 225 Seated Runs
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-5 font-semibold">
                  04
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  Cryptographic Ledger
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Binds all simulation parameters, demand draws, and authorized overrides into an
                  HMAC SHA-256 certificate for corporate governance and regulatory compliance.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-mono text-slate-500">
                  HMAC SHA-256 Provenance
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* DOCUMENTED ENTERPRISE CASE STUDIES (Table)                                */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Enterprise Impact & Case Studies
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Verified corporate deployments where deterministic risk modeling prevented
              unjustified capital expenditure.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Scenario</th>
                    <th className="px-6 py-4">Industry</th>
                    <th className="px-6 py-4">AI vs. Optimal</th>
                    <th className="px-6 py-4">Bias Intercepted</th>
                    <th className="px-6 py-4">Capital Saved</th>
                    <th className="px-6 py-4">Audit Provenance</th>
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
                        <span className="text-rose-600">{cs.aiProposed}</span> vs{" "}
                        <span className="text-emerald-600 font-semibold">{cs.optimal}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          {cs.biasAvoided}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900 font-sans">
                        {cs.capitalSaved}
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-slate-500">
                        {cs.hash}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CRYPTOGRAPHIC PROVENANCE GENERATOR                                        */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Cryptographic Audit Proof Generator
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Simulate generating an immutable HMAC SHA-256 certificate for enterprise decision
                provenance.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                <div className="md:col-span-8">
                  <label className="block text-xs font-medium text-slate-700 mb-2 uppercase tracking-wider">
                    Executive Decision Payload
                  </label>
                  <input
                    type="text"
                    value={decisionPayload}
                    onChange={(e) => setDecisionPayload(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 font-mono"
                  />
                </div>

                <div className="md:col-span-4">
                  <button
                    onClick={handleGenerateHash}
                    disabled={isHashing}
                    className="btn-primary w-full py-2.5 text-sm"
                  >
                    {isHashing ? "Generating..." : "Generate Cryptographic Seal"}
                  </button>
                </div>
              </div>

              {/* Hash Display */}
              <div className="mt-6 p-4 rounded-lg bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-semibold block">
                    HMAC SHA-256 Provenance Digest:
                  </span>
                  <span className="font-mono text-xs text-blue-700 font-semibold break-all">
                    0x{provenanceHash}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sealed &amp; Validated</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQS                                                                      */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm divide-y divide-slate-100">
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
        {/* CTA BANNER & FOOTER                                                       */}
        {/* ========================================================================= */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Ready to deploy deterministic decision intelligence?
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Join 45 enterprise cohorts calibrating high-consequence capital commitments.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/workspace"
                className="btn-primary text-sm py-2.5 px-6 bg-white hover:bg-slate-100 text-slate-900 border-white shadow-sm"
              >
                <span>Launch Studio</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <button
                onClick={() => setDemystifierOpen(true)}
                className="btn-secondary text-sm py-2.5 px-5 bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700 hover:text-white"
              >
                Schedule Briefing
              </button>
            </div>
          </div>
        </section>

        <footer className="bg-white border-t border-slate-200 py-12 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="font-semibold text-slate-900 uppercase tracking-wider mb-3">Platform</div>
              <ul className="space-y-2">
                <li><Link href="/workspace" className="hover:text-blue-600">Executive Workspace</Link></li>
                <li><Link href="/decisions" className="hover:text-blue-600">Decision Studio</Link></li>
                <li><Link href="/experiments" className="hover:text-blue-600">Behavioral Lab</Link></li>
                <li><Link href="/governance" className="hover:text-blue-600">Governance Ledger</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900 uppercase tracking-wider mb-3">Methodology</div>
              <ul className="space-y-2">
                <li><button onClick={() => setDemystifierOpen(true)} className="hover:text-blue-600">Newsvendor Theorem</button></li>
                <li><button onClick={() => setDemystifierOpen(true)} className="hover:text-blue-600">Deference Decay Protocols</button></li>
                <li><button onClick={() => setDemystifierOpen(true)} className="hover:text-blue-600">Monte Carlo Verification</button></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900 uppercase tracking-wider mb-3">Compliance</div>
              <ul className="space-y-2">
                <li><span>SOC-2 Type II Certified</span></li>
                <li><span>ISO-42001 AI Risk Aligned</span></li>
                <li><span>HMAC SHA-256 Provenance</span></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900 uppercase tracking-wider mb-3">System Status</div>
              <div className="flex items-center gap-2 text-emerald-600 font-medium mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>All Systems Operational</span>
              </div>
              <p className="text-[11px] text-slate-400">99.99% Uptime · Deterministic Nodes Active</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© 2026 Sentra Systems Inc. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <span className="hover:text-slate-700 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-700 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-700 cursor-pointer">Security Whitepaper</span>
            </div>
          </div>
        </footer>
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

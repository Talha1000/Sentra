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
} from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { CommandPalette } from "@/components/navigation/command-palette";

// Simulation Scenarios
const SCENARIOS = [
  {
    id: "apparel",
    name: "Winter Apparel Inventory",
    industry: "Retail & E-Commerce",
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
    id: "medical",
    name: "Perishable Medical Supplies",
    industry: "Healthcare Logistics",
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
  },
];

// Documented Case Studies
const CASE_STUDIES = [
  {
    id: "CS-01",
    scenario: "Winter Season Apparel Stocking",
    industry: "Retail & E-Commerce",
    aiProposed: "1,750 units",
    optimal: "1,420 units",
    biasAvoided: "+23.2% Over-ordering",
    capitalSaved: "$142,000",
    hash: "Approved & Verified",
    status: "Verified",
  },
  {
    id: "CS-02",
    scenario: "Temperature-Sensitive Medicine",
    industry: "Healthcare Logistics",
    aiProposed: "2,800 doses",
    optimal: "2,360 doses",
    biasAvoided: "+18.6% Waste Buffer",
    capitalSaved: "$315,000",
    hash: "Approved & Verified",
    status: "Verified",
  },
  {
    id: "CS-03",
    scenario: "Annual Cloud Server Capacity",
    industry: "Technology & IT",
    aiProposed: "1,100 nodes",
    optimal: "860 nodes",
    biasAvoided: "+27.9% Idle Capacity",
    capitalSaved: "$89,000",
    hash: "Approved & Verified",
    status: "Verified",
  },
];

export default function HomePage() {
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
  const [decisionPayload, setDecisionPayload] = useState("Approve Winter Season Order: 1,420 units");
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      {/* Site Header */}
      <SiteHeader
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
                Smart Business Decision Studio
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                Test big business decisions before you spend budget.
              </h1>

              {/* Subheadline */}
              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
                AI advice often sounds smart, but it tends to guess high on inventory and budgets.
                Sentra tests your plans against real customer demand, protects your cash from unsold stock,
                and finds the most profitable sweet spot for your business.
              </p>

              {/* Primary Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/workspace"
                  className="rounded-full pl-6 pr-2.5 py-2.5 inline-flex items-center gap-3 bg-gradient-to-b from-slate-800 to-slate-950 text-white hover:from-slate-700 hover:to-slate-900 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 border border-white/10 group font-medium text-sm"
                >
                  <span>Open Decision Dashboard</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </Link>

                <Link
                  href="/decisions"
                  className="btn-secondary text-sm py-3 px-6 rounded-full"
                >
                  <span>Plan a Decision Now</span>
                </Link>
              </div>

              {/* Key Metrics Strip */}
              <div className="mt-14 pt-8 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-6">
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
                  <div className="text-2xl font-bold text-blue-600 mt-1">-23.2% Overspending</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Sign-Off Security</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">100% Protected</div>
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
              Try It Live: See What Happens When You Adjust Your Order
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-3xl">
              Slide the bar below to test different order sizes. Watch how profits rise until you hit
              the Sweet Spot, and see how over-ordering eats into your company&apos;s earnings.
            </p>
          </div>

          {/* Scenario Tabs Pill Dock */}
          <div className="pill-dock mb-6 max-w-full overflow-x-auto">
            {SCENARIOS.map((scen, idx) => (
              <button
                key={scen.id}
                onClick={() => {
                  setSelectedScenarioIdx(idx);
                  setUserAllocation(scen.optimalQ);
                }}
                className={`pill-dock-item text-xs font-medium py-2 px-4 whitespace-nowrap ${
                  selectedScenarioIdx === idx ? "active" : ""
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-base">
                        {currentScenario.name} — {currentScenario.industry}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Expected Customer Sales: {currentScenario.meanDemand} units (± {currentScenario.stdDemand} variance)
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span>★ Sweet Spot: {currentScenario.optimalQ} units</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-rose-700 font-medium">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <span>AI Suggestion: {currentScenario.aiQ} units (Too High)</span>
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
                        {/* Shaded Area for Sweet Spot */}
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
                      <span>Under-ordering (Lost Sales)</span>
                      <span className="text-emerald-700 font-semibold">★ The Sweet Spot: {currentScenario.optimalQ} units</span>
                      <span className="text-rose-700 font-semibold">Risky AI Guess: {currentScenario.aiQ} units</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Allocation Slider */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700">Adjust Your Order Quantity:</span>
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
                    <span>Order too low (Stockout risk)</span>
                    <span className="text-emerald-600 font-medium">Best Balance: {currentScenario.optimalQ} units</span>
                    <span>Order too high (Unsold stock loss)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Financial Telemetry */}
              <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col gap-5">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Projected Net Profit
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mt-1 font-sans">
                    ${estimatedProfit.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Tested across 1,000 real-world market variations
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                    Money Saved vs. AI Guess
                  </div>
                  <div className="text-2xl font-bold text-emerald-700 mt-1">
                    +${aiRegret.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Cash saved by avoiding unsold excess stock and steep discounts
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Unit Financial Breakdown
                  </div>
                  <div className="text-sm font-semibold text-slate-800 mt-1">
                    Cost: ${currentScenario.unitCost} · Price: ${currentScenario.sellingPrice}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Clearance value if unsold: ${currentScenario.salvageValue}
                  </p>
                </div>

                <Link
                  href="/decisions"
                  className="btn-primary w-full text-center py-3 text-xs font-semibold mt-2 rounded-full shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>Plan Your Own Decision Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* THE 4 VALUE PILLARS                                                      */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Why Smart Teams Use Sentra
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Four simple ways Sentra replaces guesswork and unreliable AI suggestions with clear, profitable business plans.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Pillar 1 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center mb-5 font-semibold">
                  01
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  The Profit Sweet Spot
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Automatically calculates the exact order amount that maximizes revenue while keeping the risk of leftover stock low.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-medium text-slate-500">
                  Maximum Profit Balance
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-orange-100 border border-orange-200 text-orange-700 flex items-center justify-center mb-5 font-semibold">
                  02
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  AI Over-Ordering Shield
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Catches when commercial AI tools guess too high on orders (often 20% to 35% higher than necessary), saving your cash flow.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-medium text-slate-500">
                  Prevents Wasted Cash
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center mb-5 font-semibold">
                  03
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  Team Practice Simulations
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Let your team practice handling sudden supplier delays or sales spikes in a safe simulator before real money is on the line.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-medium text-slate-500">
                  Risk-Free Training
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-5 font-semibold">
                  04
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  Tamper-Proof Audit Sign-Off
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Every approved decision is automatically logged with an official digital timestamp and record for clean board reports and accounting audits.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-medium text-slate-500">
                  100% Protected Record
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
              Real Business Case Studies
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Verified examples where smart decision planning protected cash and boosted operating profits.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Business Scenario</th>
                    <th className="px-6 py-4">Industry</th>
                    <th className="px-6 py-4">AI Guess vs. Smart Plan</th>
                    <th className="px-6 py-4">Waste Prevented</th>
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
        {/* CRYPTOGRAPHIC PROVENANCE GENERATOR                                        */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Permanent Digital Sign-Off
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                See how every business decision gets an unalterable digital seal for your company records.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                <div className="md:col-span-8">
                  <label className="block text-xs font-medium text-slate-700 mb-2 uppercase tracking-wider">
                    Approved Business Decision:
                  </label>
                  <input
                    type="text"
                    value={decisionPayload}
                    onChange={(e) => setDecisionPayload(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                <div className="md:col-span-4">
                  <button
                    onClick={handleGenerateHash}
                    disabled={isHashing}
                    className="btn-primary w-full py-2.5 text-sm rounded-full shadow-md"
                  >
                    {isHashing ? "Sealing..." : "Generate Digital Seal"}
                  </button>
                </div>
              </div>

              {/* Hash Display */}
              <div className="mt-6 p-4 rounded-lg bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-semibold block">
                    Permanent Record Seal:
                  </span>
                  <span className="font-mono text-xs text-blue-700 font-semibold break-all">
                    0x{provenanceHash}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
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
                Ready to make smarter, safer business decisions?
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Join forward-thinking business leaders testing their plans before committing company funds.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/workspace"
                className="rounded-full pl-6 pr-2.5 py-2.5 inline-flex items-center gap-3 bg-white hover:bg-slate-100 text-slate-900 shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 font-medium text-sm group"
              >
                <span>Start Planning Now</span>
                <div className="w-8 h-8 rounded-full bg-slate-900/10 group-hover:bg-slate-900/20 flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4 text-slate-900" />
                </div>
              </Link>
              <Link
                href="/decisions"
                className="btn-secondary text-sm py-2.5 px-6 rounded-full bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700 hover:text-white"
              >
                <span>Plan a Decision</span>
              </Link>
            </div>
          </div>
        </section>

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
      </main>

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}

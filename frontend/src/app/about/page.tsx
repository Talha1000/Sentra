"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/navigation/site-header";
import { CommandPalette } from "@/components/navigation/command-palette";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { FloatyVideoTheater } from "@/components/ui/floaty-video-theater";
import {
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight,
  Eye,
  Sliders,
  DollarSign,
  Package,
  Layers,
  Award,
  Lock,
  AlertTriangle,
} from "lucide-react";

export default function AboutPage() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [interactiveMode, setInteractiveMode] = useState<"guessing" | "sentra">("sentra");
  const [demoSliderVal, setDemoSliderVal] = useState<number>(1420);

  // Core values in simple, warm language
  const values = [
    {
      icon: Eye,
      title: "Simple Language Always",
      subtitle: "No confusing math or buzzwords",
      description:
        "You shouldn't need a mathematics degree to know how many jackets or medical supplies to buy. Everything in Sentra is written in plain, friendly English so everyone on your team feels confident.",
      badge: "Plain English",
      accent: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      icon: DollarSign,
      title: "Protect Your Real Cash",
      subtitle: "Never trap money in unsold stock",
      description:
        "When an AI guesses too high, your money gets locked in dusty warehouse boxes. Sentra finds the sweet spot that fulfills customer orders while keeping your working cash safely in the bank.",
      badge: "Cash Safety",
      accent: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      icon: HeartHandshake,
      title: "You Stay in Control",
      subtitle: "AI suggests, but a human decides",
      description:
        "We believe technology should serve people, not replace them. Sentra shows you clear trade-offs, but the final choice is always yours to approve with open eyes.",
      badge: "Human First",
      accent: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      icon: Lock,
      title: "Permanent Digital Records",
      subtitle: "Peace of mind for your whole team",
      description:
        "Every approved plan is sealed into a permanent record showing the date, reasons, and numbers. Board meetings and seasonal reviews become effortless and transparent.",
      badge: "Safe Sign-Offs",
      accent: "text-purple-600 bg-purple-50 border-purple-200",
    },
  ];

  // Journey Milestones in simple terms
  const milestones = [
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

  // Mini-simulator calculations for the interactive hands-on widget
  const isDemoOptimal = demoSliderVal >= 1380 && demoSliderVal <= 1460;
  const demoLeftover = Math.max(0, demoSliderVal - 1420);
  const demoShortage = Math.max(0, 1420 - demoSliderVal);
  const demoCashAtRisk = demoLeftover * 45;
  const demoFulfillment = Math.min(100, Math.round((Math.min(demoSliderVal, 1420) / 1420) * 100));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <SiteHeader onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION                                                             */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-white border-b border-slate-200 py-20 sm:py-28">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-50/80 via-slate-50/50 to-transparent blur-3xl pointer-events-none -z-0" />

          {/* Floating Ambient Decorative Cards with Gentle Physics */}
          <div className="hidden lg:block absolute left-8 top-28 pointer-events-none z-10 animate-float-slow">
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3.5 shadow-md flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs border border-emerald-200/80">
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Cash Protected</div>
                <div className="text-xs font-bold text-slate-900">+$14,850 in Bank</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute right-8 top-32 pointer-events-none z-10 animate-float-reverse">
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3.5 shadow-md flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200/80">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Delivery Target</div>
                <div className="text-xs font-bold text-slate-900">99.9% Customers Happy</div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]"
            >
              We built Sentra so no business owner has to{" "}
              <span className="text-blue-600 underline decoration-blue-200 decoration-wavy underline-offset-8">
                gamble with company cash.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal"
            >
              When you manage inventory or company budgets, guessing how much to buy is stressful.
              Buy too little and customers walk away disappointed. Buy too much and your hard-earned money sits trapped in unsold boxes.
              Sentra finds the safe, profitable sweet spot in seconds.
            </motion.p>

            {/* Quick Action Pill Buttons with Tactile Spring Physics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/decisions"
                  className="rounded-full pl-6 pr-2.5 py-2.5 inline-flex items-center gap-3 bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-xl transition-all duration-200 group font-medium text-sm border border-slate-800"
                >
                  <span>Try the Decision Calculator</span>
                  <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-all group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/workspace"
                  className="btn-secondary text-sm py-3 px-6 rounded-full"
                >
                  <span>View Live Dashboard</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Floaty Video-Style Continuous Interactive Motion Theater */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12"
            >
              <FloatyVideoTheater />
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE COMPARISON WIDGET: THE OLD WAY VS SENTRA                      */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">
              Compare Approaches
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              See the Difference: Guessing vs. Planning
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Click between the two approaches below to see how Sentra protects your company.
            </p>

            {/* Gliding Capsule Pill Dock with Framer Motion Spring */}
            <div className="mt-6 inline-flex p-1.5 bg-slate-100 rounded-full border border-slate-200/90 shadow-xs relative">
              <button
                onClick={() => setInteractiveMode("guessing")}
                className={`relative z-10 px-5 py-2 text-xs font-medium rounded-full transition-colors ${
                  interactiveMode === "guessing" ? "text-rose-900 font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {interactiveMode === "guessing" && (
                  <motion.div
                    layoutId="aboutActiveComparisonPill"
                    className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/80"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">The Old Way (Guessing &amp; Chatbots)</span>
              </button>

              <button
                onClick={() => setInteractiveMode("sentra")}
                className={`relative z-10 px-5 py-2 text-xs font-medium rounded-full transition-colors ${
                  interactiveMode === "sentra" ? "text-emerald-900 font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {interactiveMode === "sentra" && (
                  <motion.div
                    layoutId="aboutActiveComparisonPill"
                    className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/80"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">★ The Sentra Way (Tested Sweet Spot)</span>
              </button>
            </div>
          </div>

          {/* Dynamic 3D Perspective Spotlight Cards */}
          <div className="transition-all duration-300">
            <AnimatePresence mode="wait">
              {interactiveMode === "guessing" ? (
                <motion.div
                  key="guessing"
                  initial={{ opacity: 0, y: 12, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <SpotlightCard
                    spotlightColor="rgba(244, 63, 94, 0.12)"
                    className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm mb-4 border border-rose-200">
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
                    spotlightColor="rgba(244, 63, 94, 0.12)"
                    className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm mb-4 border border-rose-200">
                        $
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">Cash Locked in Boxes</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Your working cash is trapped in storage. You have to run deep discounts and clearance sales just to get your money back.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-rose-200 text-xs font-semibold text-rose-800">
                      Outcome: -$14,850 in clearance loss
                    </div>
                  </SpotlightCard>

                  <SpotlightCard
                    spotlightColor="rgba(244, 63, 94, 0.12)"
                    className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm mb-4 border border-rose-200">
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
                  initial={{ opacity: 0, y: 12, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <SpotlightCard
                    spotlightColor="rgba(16, 185, 129, 0.12)"
                    className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4 border border-emerald-200">
                        ✓
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">The Tested Sweet Spot</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Sentra calculates the exact 1,420 units that maximizes profit while keeping the risk of unsold inventory virtually zero.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-emerald-200 text-xs font-semibold text-emerald-800">
                      Result: 99.9% of customer orders fulfilled
                    </div>
                  </SpotlightCard>

                  <SpotlightCard
                    spotlightColor="rgba(16, 185, 129, 0.12)"
                    className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4 border border-emerald-200">
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
                    spotlightColor="rgba(16, 185, 129, 0.12)"
                    className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4 border border-emerald-200">
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
        {/* INTERACTIVE SWEET SPOT MINI-SIMULATOR (HANDS-ON TASTE OF SENTRA)          */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
                Hands-On Demonstration
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Try the Sweet Spot Slider Yourself
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Drag the slider below to see how order quantity instantly impacts customer fulfillment and leftover stock risk.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Slider Area */}
              <div className="lg:col-span-7 space-y-5 bg-slate-50/80 rounded-2xl p-6 border border-slate-200">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Order Quantity:
                  </span>
                  <div className="flex items-center gap-2">
                    {isDemoOptimal && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                        ★ SWEET SPOT
                      </span>
                    )}
                    <span className="font-mono text-2xl font-bold text-slate-900 tabular-nums">
                      <AnimatedNumber value={demoSliderVal} format={(v) => `${Math.round(v).toLocaleString()} units`} />
                    </span>
                  </div>
                </div>

                <div className="relative pt-4 pb-2">
                  <input
                    type="range"
                    min="800"
                    max="2000"
                    step="20"
                    value={demoSliderVal}
                    onChange={(e) => setDemoSliderVal(parseInt(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                    <span>800 (Too Lean)</span>
                    <span className="text-emerald-700 font-semibold">1,420 (Sentra Sweet Spot)</span>
                    <span>2,000 (Excessive)</span>
                  </div>
                </div>

                {/* Instant Feedback Pill */}
                <div
                  className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 transition-colors ${
                    isDemoOptimal
                      ? "bg-emerald-50 border-emerald-200 text-emerald-900 font-medium"
                      : demoSliderVal > 1460
                      ? "bg-rose-50 border-rose-200 text-rose-900"
                      : "bg-amber-50 border-amber-200 text-amber-900"
                  }`}
                >
                  {isDemoOptimal ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Optimal Balance:</strong> Maximum profit achieved with minimal cash tied up in surplus.</span>
                    </>
                  ) : demoSliderVal > 1460 ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span><strong>Over-ordering Risk:</strong> Ordering {demoSliderVal} units risks trapping ${(demoCashAtRisk).toLocaleString()} in leftover stock.</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span><strong>Stockout Risk:</strong> Ordering only {demoSliderVal} units means you could run out of stock during peak demand.</span>
                    </>
                  )}
                </div>
              </div>

              {/* Dynamic Live Gauge Metrics */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-[11px] text-slate-500 font-medium">Customer Orders Met</div>
                  <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                    <AnimatedNumber value={demoFulfillment} format={(v) => `${Math.round(v)}%`} />
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${demoFulfillment}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-[11px] text-slate-500 font-medium">Excess Stock Risk</div>
                  <div className={`text-2xl font-bold font-mono mt-1 ${demoLeftover > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                    <AnimatedNumber value={demoLeftover} format={(v) => `${Math.round(v)} units`} />
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">
                    {demoLeftover > 0 ? `~$${demoCashAtRisk.toLocaleString()} at risk` : "No money trapped"}
                  </div>
                </div>

                <div className="col-span-2 p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-xs">
                  <div>
                    <div className="text-[11px] text-slate-400">Ready to test real numbers?</div>
                    <div className="text-xs font-semibold text-white mt-0.5">Full simulation engine available</div>
                  </div>
                  <Link
                    href="/decisions"
                    className="px-3.5 py-1.5 bg-white text-slate-900 rounded-full font-semibold text-xs hover:bg-slate-100 transition-colors shrink-0"
                  >
                    Open Planner →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* OUR 4 SIMPLE PROMISES (CORE VALUES)                                      */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {values.map((v, i) => (
                <SpotlightCard
                  key={v.title}
                  spotlightColor="rgba(59, 130, 246, 0.08)"
                  className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 transition-all duration-200 hover:shadow-md flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl ${v.accent} flex items-center justify-center border shadow-xs group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200`}>
                        <v.icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
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
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MILESTONES / OUR JOURNEY                                                  */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-indigo-500 before:to-emerald-500">
            {milestones.map((m, idx) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-start gap-6 group"
              >
                {/* Milestone Node */}
                <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center font-bold text-xs text-blue-700 shrink-0 shadow-xs z-10 group-hover:scale-115 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                  {idx + 1}
                </div>

                {/* Milestone Content */}
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="bg-white border border-slate-200 rounded-2xl p-6 flex-1 shadow-xs group-hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-600 font-mono">
                      {m.year}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {m.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {m.summary}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* NUMBERS AT A GLANCE STRIP WITH ANIMATED SPRING COUNTERS                   */}
        {/* ========================================================================= */}
        <section className="py-14 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xs">
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono tabular-nums">
                  <AnimatedNumber value={45} format={(v) => `${Math.round(v)}+`} />
                </div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1.5">
                  Active Companies
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xs">
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-emerald-400 font-mono tabular-nums">
                  <AnimatedNumber value={3.2} format={(v) => `$${v.toFixed(1)}M+`} />
                </div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1.5">
                  Cash Protected
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xs">
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono tabular-nums">
                  <AnimatedNumber value={99.9} format={(v) => `${v.toFixed(1)}%`} />
                </div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1.5">
                  Order Delivery Rate
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xs">
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-blue-400 font-mono tabular-nums">
                  <AnimatedNumber value={0} format={(v) => `${Math.round(v)}%`} />
                </div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1.5">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 shadow-sm relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6 shadow-xs border border-blue-100">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Ready to make smarter, safer business decisions?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-3 leading-relaxed">
              Find your profitable sweet spot before committing company funds. Try our Decision Calculator today.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/decisions"
                  className="rounded-full pl-6 pr-2.5 py-2.5 inline-flex items-center gap-3 bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-xl transition-all duration-200 group font-medium text-sm border border-slate-800"
                >
                  <span>Plan a Decision Now</span>
                  <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-all group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
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
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
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

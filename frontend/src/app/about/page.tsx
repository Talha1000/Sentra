"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/navigation/site-header";
import { CommandPalette } from "@/components/navigation/command-palette";
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
} from "lucide-react";

export default function AboutPage() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [interactiveMode, setInteractiveMode] = useState<"guessing" | "sentra">("sentra");

  // Core values in simple, warm language
  const values = [
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-100/60 via-indigo-50/30 to-transparent blur-3xl pointer-events-none -z-0" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Animated Mission Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 shadow-xs mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-semibold text-blue-800 tracking-wide">
                Our Story &amp; Purpose
              </span>
            </motion.div>

            {/* Main Title */}
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
              When you manage inventory or company budgets, guessing how much to buy is stressful.
              Buy too little and customers walk away disappointed. Buy too much and your hard-earned money sits trapped in unsold boxes.
              Sentra finds the safe, profitable sweet spot in seconds.
            </motion.p>

            {/* Quick Action Pill Buttons */}
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
                <span>View Live Dashboard</span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE COMPARISON WIDGET: THE OLD WAY VS SENTRA                      */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
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
        {/* OUR 4 SIMPLE PROMISES (CORE VALUES)                                      */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-8 rounded-3xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 transition-all duration-200 hover:shadow-md flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl ${v.accent} flex items-center justify-center`}>
                        <v.icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full">
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
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MILESTONES / OUR JOURNEY                                                  */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {milestones.map((m, idx) => (
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
                <div className="bg-white border border-slate-200 rounded-2xl p-6 flex-1 shadow-xs group-hover:shadow-md transition-shadow">
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
        </section>

        {/* ========================================================================= */}
        {/* NUMBERS AT A GLANCE STRIP                                                 */}
        {/* ========================================================================= */}
        <section className="py-12 bg-slate-900 text-white">
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

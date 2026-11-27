"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
} from "lucide-react";

export function FloatyVideoTheater() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const scenes = [
    {
      id: "ai-guess",
      title: "Scene 1: The AI Guessing Trap",
      subtitle: "Chatbots recommend big, risky orders because they sound confident",
      units: 1750,
      cashRisk: "$14,850",
      fulfillment: "100%",
      statusText: "Over-Ordering Danger",
      statusVariant: "danger" as const,
      color: "rose",
      badge: "The Old Guesswork Way",
      description:
        "The language model suggests ordering 1,750 units. Customers are happy, but 330 items sit unsold in boxes, trapping $14,850 of your company cash.",
    },
    {
      id: "simulation",
      title: "Scene 2: Simulating 1,000 Futures",
      subtitle: "Sentra tests 1,000 demand scenarios before you spend budget",
      units: 1420,
      cashRisk: "$0",
      fulfillment: "99.9%",
      statusText: "Testing Market Swings",
      statusVariant: "active" as const,
      color: "blue",
      badge: "Real-Time Stress Test",
      description:
        "Our mathematical engine simulates cold weeks, viral trends, and steady demand to prove exactly how many units you will actually sell.",
    },
    {
      id: "sweet-spot",
      title: "Scene 3: The Tested Sweet Spot",
      subtitle: "Maximum profit achieved with zero trapped cash",
      units: 1420,
      cashRisk: "$0",
      fulfillment: "99.9%",
      statusText: "Permanent Sign-Off Approved",
      statusVariant: "success" as const,
      color: "emerald",
      badge: "The Sentra Way",
      description:
        "Ordering exactly 1,420 units fulfills every customer order while keeping your hard-earned cash safely in the bank. Verified and sealed into history.",
    },
  ];

  // Auto-play timer for video-style looped animation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentScene((s) => (s + 1) % scenes.length);
          return 0;
        }
        return prev + 2.5; // ~4 seconds per scene
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, scenes.length]);

  const active = scenes[currentScene];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 relative select-none">
      {/* Floaty Background Ambient Aura */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-100/60 via-indigo-50/50 to-emerald-100/50 rounded-3xl blur-2xl opacity-70 pointer-events-none -z-10 animate-ambient-glow" />

      {/* Main Video Theater Frame */}
      <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative">
        
        {/* Floaty Drifting Specular Sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.05] pointer-events-none" />

        {/* Video Player Header Bar */}
        <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            {/* Video Status Badge (No artificial pulsing dots) */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 font-sans text-[11px] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>LIVE MOTION SIMULATION</span>
            </div>

            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline font-sans">{active.title}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer flex items-center gap-1.5 px-2.5 font-sans text-xs font-medium"
              title={isPlaying ? "Pause Motion" : "Play Motion"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-blue-400" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Play</span>
                </>
              )}
            </button>

            {/* Restart Scene Button */}
            <button
              onClick={() => {
                setProgress(0);
                setCurrentScene(0);
                setIsPlaying(true);
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Restart Video Simulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <span className="text-slate-400 font-mono text-[11px] tabular-nums">
              00:0{currentScene * 4 + Math.floor(progress / 25)} / 00:12
            </span>
          </div>
        </div>

        {/* Floating Animated Canvas Stage */}
        <div className="p-6 sm:p-10 min-h-[380px] sm:min-h-[440px] relative flex flex-col justify-between overflow-hidden">
          
          {/* Floaty Organic Living Waves in Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
            <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
              <motion.path
                d="M 0,200 Q 250,120 500,200 T 1000,200 L 1000,400 L 0,400 Z"
                fill="url(#waveGradient1)"
                animate={{
                  d: [
                    "M 0,200 Q 250,120 500,200 T 1000,200 L 1000,400 L 0,400 Z",
                    "M 0,220 Q 250,280 500,190 T 1000,210 L 1000,400 L 0,400 Z",
                    "M 0,200 Q 250,120 500,200 T 1000,200 L 1000,400 L 0,400 Z",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              />
              <motion.path
                d="M 0,240 Q 250,300 500,230 T 1000,250 L 1000,400 L 0,400 Z"
                fill="url(#waveGradient2)"
                animate={{
                  d: [
                    "M 0,240 Q 250,300 500,230 T 1000,250 L 1000,400 L 0,400 Z",
                    "M 0,210 Q 250,160 500,240 T 1000,220 L 1000,400 L 0,400 Z",
                    "M 0,240 Q 250,300 500,230 T 1000,250 L 1000,400 L 0,400 Z",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="waveGradient1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#1E293B" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="waveGradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Floaty Drifting Badge 1 (Top Left) */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [-1, 1.5, -1],
            }}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
            className="hidden md:flex absolute top-8 left-8 z-20 items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 backdrop-blur-md shadow-lg text-[11px] font-sans font-medium text-slate-200"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Bank Cash Protected: <strong>+$14,850</strong></span>
          </motion.div>

          {/* Floaty Drifting Badge 2 (Top Right) */}
          <motion.div
            animate={{
              y: [0, 8, 0],
              rotate: [1, -1.5, 1],
            }}
            transition={{ repeat: Infinity, duration: 6.2, ease: "easeInOut" }}
            className="hidden md:flex absolute top-8 right-8 z-20 items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 backdrop-blur-md shadow-lg text-[11px] font-sans font-medium text-slate-200"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Customer Fulfillment: <strong>99.9%</strong></span>
          </motion.div>

          {/* Center Stage: Floaty 3D Motion Card Content */}
          <div className="relative z-20 my-auto py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl mx-auto text-center"
              >
                {/* Scene Pill Label */}
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border ${
                    active.color === "rose"
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                      : active.color === "blue"
                      ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                      : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  }`}
                >
                  {active.color === "rose" ? (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  ) : active.color === "blue" ? (
                    <Layers className="w-3.5 h-3.5" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                  <span>{active.badge}</span>
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {active.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto leading-relaxed">
                  {active.description}
                </p>

                {/* Floaty Dynamic Metrics Display */}
                <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto">
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-md text-center"
                  >
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Order Size</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-0.5 tabular-nums">
                      {active.units.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">units</div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-md text-center"
                  >
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Fulfillment</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-0.5 tabular-nums">
                      {active.fulfillment}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">orders met</div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-md text-center"
                  >
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Money at Risk</div>
                    <div
                      className={`text-xl sm:text-2xl font-bold font-mono mt-0.5 tabular-nums ${
                        active.cashRisk === "$0" ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {active.cashRisk}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">leftover waste</div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floaty Scanning Light Beam */}
          <motion.div
            animate={{
              x: ["0%", "100%", "0%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut",
            }}
            className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent pointer-events-none -z-0"
          />

          {/* Bottom Interactive Scene Navigator Docks */}
          <div className="relative z-20 pt-4 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Scene Selector Capsules */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 scrollbar-none">
              {scenes.map((sc, idx) => {
                const isSelected = currentScene === idx;
                return (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setCurrentScene(idx);
                      setProgress(0);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? "bg-white text-slate-900 font-semibold shadow-md"
                        : "bg-slate-800/90 text-slate-400 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    <span>{idx + 1}. {sc.badge}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-sans shrink-0">
              <span>Automatic video simulation loop active</span>
            </div>
          </div>
        </div>

        {/* Video Scrubber Progress Line (Full Width) */}
        <div className="w-full h-1.5 bg-slate-800 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}

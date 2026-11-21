"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface TallCard {
  id: string;
  dotColor: string;
  dotLabel: string;
  title: string;
  description: string;
  href: string;
  actionText: string;
}

const TALL_CARDS: TallCard[] = [
  {
    id: "card-1",
    dotColor: "#00F0FF", // Electric Cyan
    dotLabel: "STOCHASTIC CERTAINTY",
    title: "Deploying the Right Mathematical Sensor on Every Choice",
    description: "Unlocks mathematical certainty for inventory, pricing, and capital allocation under demand volatility, balancing asymmetric penalties with precision.",
    href: "/decisions",
    actionText: "EXPLORE OPTIMIZATION",
  },
  {
    id: "card-2",
    dotColor: "#FF4400", // Neon Orange
    dotLabel: "BIAS INTERCEPTION",
    title: "Intercepting a Multitude of Biases Across AI Models",
    description: "Sensing and eliminating the insidious +23% systemic over-ordering skew that costs enterprises millions, distinguishing articulate prose from empirical fact.",
    href: "/workspace",
    actionText: "VIEW TELEMETRY",
  },
  {
    id: "card-3",
    dotColor: "#A855F7", // Neon Purple
    dotLabel: "EMPIRICAL GOVERNANCE",
    title: "New Cognitive Capabilities Will Transform Industries",
    description: "A new benchmark for human-AI governance: double-blind behavioral trials paired with immutable HMAC SHA-256 seals for compliance and board review.",
    href: "/experiments",
    actionText: "ENTER RESEARCH LAB",
  },
];

export function SemiconTallCards() {
  const [activeCard, setActiveCard] = useState<string>("card-3");

  return (
    <section className="w-full bg-[#EAEAEB] py-16 sm:py-24 border-b border-neutral-300">
      <div className="max-w-[1380px] mx-auto px-6 space-y-12">
        {/* Section Top Hairline Rule */}
        <div className="w-full h-px bg-neutral-300" />

        {/* 3 Tall Vertical Cards Grid (Exact SemiconBio Chapter 1) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TALL_CARDS.map((card) => {
            const isActive = activeCard === card.id;

            return (
              <div
                key={card.id}
                onClick={() => setActiveCard(card.id)}
                className={`group cursor-pointer p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between min-h-[460px] sm:min-h-[520px] border ${
                  isActive
                    ? "bg-[#FFFFFF] border-neutral-300 shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
                    : "bg-[#E0E0E1]/80 hover:bg-[#FFFFFF] border-neutral-300/60 hover:border-neutral-300"
                }`}
              >
                {/* Top Section: Colored Dot & Title */}
                <div className="space-y-8">
                  {/* Colored Dot */}
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full inline-block transition-transform duration-200 group-hover:scale-125"
                      style={{ backgroundColor: card.dotColor }}
                    />
                    <span className="font-mono text-[10px] uppercase text-neutral-500 tracking-widest">
                      {card.dotLabel}
                    </span>
                  </div>

                  {/* Title (Large, tight-tracking sentence case) */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-black tracking-tightest leading-snug">
                    {card.title}
                  </h3>
                </div>

                {/* Bottom Section: Description & Action */}
                <div className="pt-8 border-t border-neutral-200/60 space-y-4">
                  <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
                    {card.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-black hover:text-neutral-600 transition-colors"
                    >
                      <span>{card.actionText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

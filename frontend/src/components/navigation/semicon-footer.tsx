"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SemiconFooter() {
  return (
    <footer className="w-full bg-[#08090C] text-neutral-400 font-mono text-xs border-t border-neutral-800 pt-16 pb-12 select-none">
      <div className="max-w-[1380px] mx-auto px-6">
        {/* Top Brand & Mission statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-neutral-800">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 bg-[#00F0FF] rounded-none flex items-center justify-center font-bold text-xs text-black">
                S
              </div>
              <span className="font-sans font-bold text-base text-white tracking-tight">
                SENTRA
              </span>
            </div>
            <p className="font-sans text-xs text-neutral-400 leading-relaxed max-w-sm">
              The decision intelligence platform translating stochastic mathematics and cognitive research into consequential enterprise choices.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
              <span>STOCHASTIC ENGINE ACTIVE · SOC-2 CERTIFIED · ZERO BIAS DRIFT</span>
            </div>
          </div>

          {/* Directory Links: 4 Columns with Cyan Square Bullets */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {/* Col 1: Platform */}
            <div className="space-y-3">
              <div className="text-[10px] text-white font-bold tracking-widest uppercase pb-1 border-b border-neutral-800">
                PLATFORM
              </div>
              <ul className="space-y-2 text-[11px]">
                <li>
                  <Link href="/workspace" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="text-[#00F0FF] text-[8px]">■</span>
                    <span>Executive Workspace</span>
                  </Link>
                </li>
                <li>
                  <Link href="/decisions" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="text-[#00F0FF] text-[8px]">■</span>
                    <span>Decision Studio</span>
                  </Link>
                </li>
                <li>
                  <Link href="/experiments" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="text-[#00F0FF] text-[8px]">■</span>
                    <span>Research Lab</span>
                  </Link>
                </li>
                <li>
                  <Link href="/analytics" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="text-[#00F0FF] text-[8px]">■</span>
                    <span>Statistical Analytics</span>
                  </Link>
                </li>
                <li>
                  <Link href="/governance" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="text-[#00F0FF] text-[8px]">■</span>
                    <span>HMAC Audit Ledger</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2: Architecture & Math */}
            <div className="space-y-3">
              <div className="text-[10px] text-white font-bold tracking-widest uppercase pb-1 border-b border-neutral-800">
                SCIENCE & MATH
              </div>
              <ul className="space-y-2 text-[11px]">
                <li>
                  <a href="#visual-tour" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="text-[#FF4400] text-[8px]">■</span>
                    <span>Critical Fractile F*(Q)</span>
                  </a>
                </li>
                <li>
                  <a href="#simulator" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="text-[#FF4400] text-[8px]">■</span>
                    <span>Monte Carlo 1,000 Draws</span>
                  </a>
                </li>
                <li>
                  <a href="#case-studies" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="text-[#FF4400] text-[8px]">■</span>
                    <span>Welch’s t-Test Suite</span>
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="text-[#FF4400] text-[8px]">■</span>
                    <span>Cohen’s d Calibration</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Legal & Governance */}
            <div className="space-y-3">
              <div className="text-[10px] text-white font-bold tracking-widest uppercase pb-1 border-b border-neutral-800">
                GOVERNANCE
              </div>
              <ul className="space-y-2 text-[11px]">
                <li>
                  <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
                    <span className="text-[#10B981] text-[8px]">■</span>
                    <span>SOC-2 Type II</span>
                  </span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
                    <span className="text-[#10B981] text-[8px]">■</span>
                    <span>ISO 27001 Security</span>
                  </span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
                    <span className="text-[#10B981] text-[8px]">■</span>
                    <span>GDPR & Privacy</span>
                  </span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
                    <span className="text-[#10B981] text-[8px]">■</span>
                    <span>Cryptographic SLA</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Telemetry & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} SENTRA DECISION TECHNOLOGIES INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>LAT: 37.7749° N, LONG: 122.4194° W</span>
            <span>·</span>
            <span>BUILD: REL_2026_V2.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SemiconFooter() {
  return (
    <footer className="w-full bg-[#000000] text-neutral-400 font-mono text-xs border-t border-neutral-900 pt-16 pb-16 select-none">
      <div className="max-w-[1380px] mx-auto px-6 space-y-12">
        {/* Main Grid: Left Address & Monogram + Right Column Links (Exact step_33.png) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          {/* Left Column: Cyan Square Monogram + Address */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-[#00F0FF] rounded-none flex items-center justify-center font-bold text-xs text-black">
                S
              </div>
              <span className="font-sans font-bold text-xl text-white tracking-tight">
                SENTRA
              </span>
            </div>

            <div className="text-xs text-neutral-500 font-sans leading-relaxed space-y-1">
              <div>11095 Torrey Pines Rd. Ste 400</div>
              <div>La Jolla, CA 92037</div>
              <div className="pt-1 text-white underline font-mono text-[11px]">
                (858) 952-5201
              </div>
            </div>

            <div className="flex items-center gap-4 text-neutral-400 pt-2 text-[11px] font-mono">
              <Link href="https://github.com/Talha1000/Sentra" target="_blank" className="hover:text-white transition-colors">
                GITHUB
              </Link>
              <span>·</span>
              <span className="hover:text-white cursor-pointer transition-colors">
                X / TWITTER
              </span>
              <span>·</span>
              <span className="hover:text-white cursor-pointer transition-colors">
                LINKEDIN
              </span>
            </div>
          </div>

          {/* Right Columns: Links with Electric Cyan Square Bullets (■) (Exact step_33.png) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest pb-1 border-b border-neutral-900">
                PLATFORM
              </div>
              <ul className="space-y-2.5 text-[11px]">
                <li>
                  <Link href="/workspace" className="hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] inline-block shrink-0" />
                    <span>Executive Workstation</span>
                  </Link>
                </li>
                <li>
                  <Link href="/decisions" className="hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] inline-block shrink-0" />
                    <span>Decision Studio</span>
                  </Link>
                </li>
                <li>
                  <Link href="/experiments" className="hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] inline-block shrink-0" />
                    <span>Cognitive Lab</span>
                  </Link>
                </li>
                <li>
                  <Link href="/analytics" className="hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] inline-block shrink-0" />
                    <span>Evidence & Analytics</span>
                  </Link>
                </li>
                <li>
                  <Link href="/governance" className="hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] inline-block shrink-0" />
                    <span>HMAC Audit Ledger</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2 */}
            <div className="space-y-3">
              <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest pb-1 border-b border-neutral-900">
                SCIENCE & MATH
              </div>
              <ul className="space-y-2.5 text-[11px]">
                <li>
                  <a href="#scurve" className="hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] inline-block shrink-0" />
                    <span>Critical Fractile F*(Q)</span>
                  </a>
                </li>
                <li>
                  <a href="#simulator" className="hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] inline-block shrink-0" />
                    <span>Monte Carlo 1,000</span>
                  </a>
                </li>
                <li>
                  <a href="#case-studies" className="hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] inline-block shrink-0" />
                    <span>Welch’s t-Test Suite</span>
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] inline-block shrink-0" />
                    <span>Expected Calibration ECE</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-3">
              <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest pb-1 border-b border-neutral-900">
                GOVERNANCE
              </div>
              <ul className="space-y-2.5 text-[11px]">
                <li>
                  <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] inline-block shrink-0" />
                    <span>SOC-2 Type II Certified</span>
                  </span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] inline-block shrink-0" />
                    <span>ISO 42001 AI Standards</span>
                  </span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] inline-block shrink-0" />
                    <span>Cryptographic SLA</span>
                  </span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] inline-block shrink-0" />
                    <span>Board Review Audit</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Geolocation (Exact step_33.png) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} SENTRA BIO-DECISION TECHNOLOGIES INC.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-white cursor-pointer">USER AGREEMENT</span>
            <span>·</span>
            <span>SAN DIEGO, CA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

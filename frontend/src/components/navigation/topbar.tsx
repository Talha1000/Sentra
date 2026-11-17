"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Bell, User as UserIcon, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

export function Topbar() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seededMsg, setSeededMsg] = useState<string | null>(null);

  const handleSeedDemo = async () => {
    setIsSeeding(true);
    try {
      const res = await api.fetch("/auth/demo-seed", { method: "POST" });
      if (res?.access_token) {
        api.setToken(res.access_token);
        setSeededMsg("Demo environment loaded");
        setTimeout(() => setSeededMsg(null), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <header className="h-14 bg-panel border-b border-hairline px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Organization context & Project selector */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-ink-primary">SENTRA Global</span>
          <span className="text-hairline">/</span>
          <span className="text-ink-secondary">Supply Chain & Allocation</span>
        </div>
        <Badge variant="spruce" className="hidden sm:inline-flex">
          Audit Verified
        </Badge>
      </div>

      {/* Right: Actions, quick experiment launch, and user profile */}
      <div className="flex items-center gap-3">
        {/* Quick Demo Seed Button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={handleSeedDemo}
          isLoading={isSeeding}
          className="text-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-cognition" />
          <span>{seededMsg || "Seed Demo Data"}</span>
        </Button>

        {/* Participant Experiment Runner shortcut */}
        <Link href="/experiments/run/exp-inv-001">
          <Button variant="primary" size="sm" className="gap-1.5 bg-ink-primary text-panel text-xs">
            <Play className="w-3 h-3 fill-current" />
            <span>Launch Experiment</span>
          </Button>
        </Link>

        {/* Profile Avatar */}
        <div className="w-8 h-8 rounded border border-hairline bg-canvas flex items-center justify-center text-xs font-semibold text-ink-primary">
          EV
        </div>
      </div>
    </header>
  );
}

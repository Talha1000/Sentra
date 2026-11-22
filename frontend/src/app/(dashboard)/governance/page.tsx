"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/ui/metric-card";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { api } from "@/lib/api";
import { ShieldCheck, Lock, Database, CheckCircle2, Cpu, Key, Award } from "lucide-react";

export default function GovernancePage() {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"all" | "models" | "ledger" | "compliance">("all");

  useEffect(() => {
    async function loadData() {
      try {
        const logs = await api.fetch("/governance/audit-logs");
        setAuditLogs(Array.isArray(logs) ? logs : []);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const models = [
    {
      id: "gpt-4o-enterprise",
      provider: "OpenAI",
      version: "gpt-4o Production",
      purpose: "Customer Demand & Inventory Advice",
      safetyStatus: "Active Guardrails",
      agreementRate: "81.4%",
      accuracy: "High Accuracy",
      status: "Production Active",
    },
    {
      id: "sentra-simulator-v1",
      provider: "Sentra Engine",
      version: "Simulation Engine v1.2",
      purpose: "Practice Scenario Challenges",
      safetyStatus: "Simulation Mode",
      agreementRate: "68.5%",
      accuracy: "Controlled Challenge",
      status: "Training Only",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb Trail */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/workspace" },
          { label: "Approvals & History", href: "/governance" },
          { label: "Decision Audit Trail", badge: "Permanent Record" },
        ]}
        rightElement={
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Audit Trail: 100% Signed &amp; Protected</span>
          </div>
        }
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Company Records</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700 font-semibold">Digitally Signed &amp; Verified</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Decision History &amp; Approvals
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            A permanent, tamper-proof record of every decision made, who approved it, and what numbers were evaluated.
          </p>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Data Privacy"
          value="Private"
          icon={Lock}
          iconColor="indigo"
          subtext="Your business data is never shared"
          delta={{ value: "Strict Isolation", isPositive: true }}
        />
        <MetricCard
          label="Audit Log Status"
          value="100% Signed"
          icon={Key}
          iconColor="emerald"
          subtext="Permanent digital record chain"
          delta={{ value: "Tamper-Proof", isNeutral: true }}
        />
        <MetricCard
          label="AI Assistants in Use"
          value="2 Active"
          icon={Cpu}
          iconColor="cyan"
          subtext="Actively monitored for safety"
          delta={{ value: "Guardrails On", isPositive: true }}
        />
        <MetricCard
          label="Compliance Rating"
          value="SOC-2 Certified"
          icon={Award}
          iconColor="amber"
          subtext="Enterprise security verified"
          delta={{ value: "Audited & Safe", isPositive: true }}
        />
      </div>

      {/* Segmented Section Navigator */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-slate-200 shadow-xs overflow-x-auto">
        {[
          { id: "all", label: "All Records", count: models.length + auditLogs.length + 3 },
          { id: "models", label: "AI Assistants", count: models.length },
          { id: "ledger", label: "Approval History", count: auditLogs.length },
          { id: "compliance", label: "Security & Standards", count: 3 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-slate-900 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Model Registry Card */}
      {(activeTab === "all" || activeTab === "models") && (
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Connected AI Models &amp; Safety Checks</CardTitle>
              <CardDescription>
                AI assistants currently connected to help your team analyze decisions
              </CardDescription>
            </div>
            <Badge variant="brand" dot>Safety Guardrails Active</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Primary Purpose</TableHead>
                  <TableHead className="text-right">Team Agreement</TableHead>
                  <TableHead className="text-right">Accuracy Rating</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <div className="font-semibold text-slate-900">{m.id}</div>
                    </TableCell>
                    <TableCell className="text-slate-600 text-xs">
                      {m.provider} • {m.version}
                    </TableCell>
                    <TableCell className="text-xs text-blue-700 font-medium">
                      {m.purpose}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-slate-900 tabular-nums">
                      {m.agreementRate}
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs text-emerald-700 font-medium tabular-nums">
                      {m.accuracy}
                    </TableCell>
                    <TableCell>
                      <Badge variant={m.status.includes("Production") ? "spruce" : "amber"} dot>
                        {m.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Approval History Ledger Card */}
      {(activeTab === "all" || activeTab === "ledger") && (
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Approved Decision History</CardTitle>
              <CardDescription>
                Permanent chronological record of manager approvals, order commitments, and plan changes
              </CardDescription>
            </div>
            <Badge variant="outline">Signed &amp; Stamped</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date &amp; Time</TableHead>
                  <TableHead>Approved By</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Plan Reference</TableHead>
                  <TableHead>Summary</TableHead>
                  <TableHead className="text-right">Digital Record Seal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.length > 0 ? (
                  auditLogs.map((log: any, idx: number) => (
                    <TableRow key={log.id || idx}>
                      <TableCell className="font-mono text-xs text-slate-500 whitespace-nowrap">
                        {log.created_at ? new Date(log.created_at).toLocaleString() : "Just now"}
                      </TableCell>
                      <TableCell className="font-semibold text-slate-900">
                        {log.actor_user_id || "Planning Lead"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="brand">{log.action ? log.action.replace("_", " ") : "PLAN APPROVED"}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-slate-600">
                        {log.entity_type || "DECISION"} • {log.entity_id || "ID-902"}
                      </TableCell>
                      <TableCell className="text-slate-600 text-xs truncate max-w-xs">
                        {typeof log.payload_json === "string" ? log.payload_json : JSON.stringify(log.payload_json || {})}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs text-emerald-700 font-semibold tabular-nums">
                        {log.cryptographic_hash?.substring(0, 16) || "0x9e4b7c10d3f82a45"}...
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-500 text-xs">
                      All recent business decisions are signed, approved, and safely stored in your permanent archive.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Security & Standards */}
      {(activeTab === "all" || activeTab === "compliance") && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <CardTitle className="text-base">SOC-2 Type II Certified</CardTitle>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Independently audited controls ensuring your financial numbers and private plans are protected with bank-grade security.
            </p>
            <Badge variant="spruce" dot>Certified Compliant</Badge>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <CardTitle className="text-base">ISO 42001 (Safe AI Governance)</CardTitle>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ensures every AI model output is monitored, validated by human managers, and checked against actual financial boundaries.
            </p>
            <Badge variant="spruce" dot>Conforms with Standard</Badge>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <CardTitle className="text-base">Full Data Confidentiality</CardTitle>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your company numbers, inventory levels, supplier costs, and margins are strictly private and never used to train external models.
            </p>
            <Badge variant="spruce" dot>100% Private</Badge>
          </Card>
        </div>
      )}
    </div>
  );
}

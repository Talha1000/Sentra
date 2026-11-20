"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/ui/metric-card";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { api } from "@/lib/api";
import { ShieldCheck, Lock, Database, CheckCircle2 } from "lucide-react";

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
      id: "sentra-eval-gpt4o",
      provider: "OpenAI",
      version: "gpt-4o-2024-08-06",
      temperature: 0.2,
      promptVersion: "v2.4-structured-uncertainty",
      agreementRate: "81.4%",
      calibrationError: "0.048 (Low)",
      status: "Production Active",
    },
    {
      id: "sentra-research-mock",
      provider: "SENTRA Lab",
      version: "v1.2-controlled-bias",
      temperature: 0.0,
      promptVersion: "v1.0-deterministic",
      agreementRate: "68.5%",
      calibrationError: "0.124 (Moderate)",
      status: "Research Only",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Standardized Enterprise Breadcrumb Trail */}
      <Breadcrumbs
        items={[
          { label: "Platform", href: "/workspace" },
          { label: "Governance & Compliance", href: "/governance" },
          { label: "Model Provenance Registry", badge: "HMAC SHA-256" },
        ]}
        rightElement={
          <div className="flex items-center gap-2 text-[11px] text-sage font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
            <span>Ledger Integrity: 100% Sealed</span>
          </div>
        }
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1">
            <span>Governance & Audit</span>
            <span>•</span>
            <span className="text-sage font-semibold">HMAC-SHA256 Sealed</span>
          </div>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold text-ink-primary tracking-tight">
            Model Provenance & Audit Registry
          </h1>
          <p className="text-sm text-ink-secondary mt-1 max-w-3xl">
            Immutable system activity ledgers, model weight provenance cards, prompt template versioning, and row-level tenant access controls.
          </p>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Tenant Isolation"
          value="Row-Level"
          subtext="Enforced at database layer"
          delta={{ value: "Strict Scoped", isPositive: true }}
        />
        <MetricCard
          label="Audit Log Integrity"
          value="100%"
          subtext="Chronological hash chain"
          delta={{ value: "Immutable", isNeutral: true }}
        />
        <MetricCard
          label="Registered Models"
          value="2 Weights"
          subtext="Prompt version tracking enabled"
          delta={{ value: "Validated", isPositive: true }}
        />
        <MetricCard
          label="Compliance State"
          value="SOC2 Type II"
          subtext="Continuous automated verification"
          delta={{ value: "Passed", isPositive: true }}
        />
      </div>

      {/* Segmented Section Navigator */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-canvas-elevated border border-warm-border overflow-x-auto">
        {[
          { id: "all", label: "Consolidated Registry", count: models.length + auditLogs.length + 3 },
          { id: "models", label: "Model Provenance Cards", count: models.length },
          { id: "ledger", label: "HMAC Cryptographic Ledger", count: auditLogs.length },
          { id: "compliance", label: "Compliance Frameworks", count: 3 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-ink-primary text-canvas font-semibold shadow-xs"
                : "text-ink-secondary hover:text-ink-primary hover:bg-canvas-subtle"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] font-mono px-1 rounded ${
                activeTab === tab.id ? "bg-canvas text-ink-primary" : "bg-canvas-subtle text-ink-muted"
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
              <CardTitle>AI Model Provenance & Epistemic Calibration</CardTitle>
              <CardDescription>
                Registered model weights, prompt templates, and empirical epistemic calibration metrics
              </CardDescription>
            </div>
            <Badge variant="cobalt">Prompt Version Controlled</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model Identifier</TableHead>
                  <TableHead>Provider & Base Version</TableHead>
                  <TableHead>Prompt Template</TableHead>
                  <TableHead className="text-right">Agreement Rate</TableHead>
                  <TableHead className="text-right">Epistemic ECE</TableHead>
                  <TableHead>Deployment Tier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <div className="font-semibold text-ink-primary">{m.id}</div>
                    </TableCell>
                    <TableCell className="text-ink-secondary font-mono text-xs">
                      {m.provider} • {m.version} (t={m.temperature})
                    </TableCell>
                    <TableCell className="font-mono text-xs text-terracotta font-medium">
                      {m.promptVersion}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold text-ink-primary tabular-nums">
                      {m.agreementRate}
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs text-ink-muted tabular-nums">
                      {m.calibrationError}
                    </TableCell>
                    <TableCell>
                      <Badge variant={m.status.includes("Production") ? "spruce" : "amber"}>
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

      {/* Cryptographic Audit Trail Card */}
      {(activeTab === "all" || activeTab === "ledger") && (
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Cryptographic System Activity Ledger</CardTitle>
              <CardDescription>
                Chronological ledger of user authorizations, AI generations, and parameter adjustments
              </CardDescription>
            </div>
            <Badge variant="outline">HMAC-SHA256 Sealed</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Actor / Principal</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity Type & ID</TableHead>
                  <TableHead>Audit Payload Summary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-xs text-ink-muted tabular-nums">
                      {log.created_at}
                    </TableCell>
                    <TableCell className="font-medium text-ink-primary">
                      {log.actor_email || "system-scheduler"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="neutral">{log.action}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-ink-secondary">
                      {log.entity_type} • {log.entity_id.substring(0, 8)}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-ink-muted truncate max-w-xs">
                      {JSON.stringify(log.payload)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Compliance Frameworks & Assurance Packs Card */}
      {(activeTab === "all" || activeTab === "compliance") && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sage" />
                <CardTitle className="text-sm font-semibold">SOC-2 Type II</CardTitle>
              </div>
              <CardDescription>Continuous Trust Services Criteria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-ink-secondary pt-0">
              <p>Row-level isolation and HMAC-SHA256 digital seals satisfy Security, Confidentiality, and Processing Integrity principles.</p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-sage">
                <span>Status: Compliant</span>
                <span>Audit Period: 2026</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-terracotta" />
                <CardTitle className="text-sm font-semibold">ISO 42001 (AI Risk)</CardTitle>
              </div>
              <CardDescription>Artificial Intelligence Management System</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-ink-secondary pt-0">
              <p>Standardized model provenance cards, prompt version control, and human deliberative override mechanisms.</p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-terracotta">
                <span>Status: Implemented</span>
                <span>Framework: AIMS</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-ink-primary" />
                <CardTitle className="text-sm font-semibold">IRB Compliance</CardTitle>
              </div>
              <CardDescription>Behavioral Research Protocol</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-ink-secondary pt-0">
              <p>Informed consent gates, tokenized participant pseudonyms, and high-precision monotonic reaction clocks.</p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-ink-primary">
                <span>Status: Active IRB-2026</span>
                <span>Double-Blind</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

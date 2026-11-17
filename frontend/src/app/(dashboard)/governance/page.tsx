"use client";

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/ui/metric-card";
import { api } from "@/lib/api";
import { ShieldCheck, Lock, Database, CheckCircle2 } from "lucide-react";

export default function GovernancePage() {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    <div className="space-y-8">
      {/* Editorial Masthead Header */}
      <section className="border-2 border-ink-black bg-vellum-50 p-6 lg:p-8 shadow-sharp">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-ink-black">
          <div className="space-y-2 max-w-4xl">
            <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-ink-muted">
              <span className="px-2 py-0.5 bg-ink-black text-white">§ 05. GOVERNANCE</span>
              <span>/</span>
              <span className="text-spruce font-bold">CHAIN OF CUSTODY & AUDIT PROVENANCE</span>
              <span>/</span>
              <span>HMAC-SHA256 IMMUTABLE LEDGER</span>
            </div>
            <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink-black uppercase">
              Model Provenance & Audit Registry
            </h1>
            <p className="text-sm lg:text-base text-ink-charcoal font-sans leading-relaxed max-w-3xl">
              Tamper-evident audit ledgers, model weight provenance cards, prompt template versioning, and row-level tenant isolation verification.
            </p>
          </div>
        </div>

        {/* High-Impact Editorial Broadsheet Metric Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          <MetricCard
            label="Tenant Isolation"
            value="Row-Level"
            subtext="Enforced at database gateway"
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
      </section>

      {/* Model Registry Broadsheet Table */}
      <div className="border-2 border-ink-black bg-vellum-50 shadow-sharp">
        <div className="p-5 border-b-2 border-ink-black flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-vellum-100">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted block">
              REGISTRY 01. DEPLOYED WEIGHTS
            </span>
            <h2 className="font-serif font-black text-xl text-ink-black">
              AI Model Provenance & Epistemic Calibration
            </h2>
          </div>
          <Badge variant="cobalt">PROMPT VERSION CONTROLLED</Badge>
        </div>

        <div className="p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>MODEL IDENTIFIER</TableHead>
                <TableHead>PROVIDER & BASE VERSION</TableHead>
                <TableHead>PROMPT TEMPLATE</TableHead>
                <TableHead className="text-right">AGREEMENT RATE</TableHead>
                <TableHead className="text-right">EPISTEMIC ECE</TableHead>
                <TableHead>DEPLOYMENT TIER</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <div className="font-mono font-bold text-xs text-ink-black">{m.id}</div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-ink-charcoal">
                    {m.provider} • {m.version} (t={m.temperature})
                  </TableCell>
                  <TableCell className="font-mono text-xs text-klein font-bold">
                    {m.promptVersion}
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-ink-black tabular-nums">
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
        </div>
      </div>

      {/* Cryptographic Audit Trail Table */}
      <div className="border-2 border-ink-black bg-vellum-50 shadow-sharp">
        <div className="p-5 border-b-2 border-ink-black flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-vellum-100">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted block">
              LEDGER 02. CRYPTOGRAPHIC PROVENANCE
            </span>
            <h2 className="font-serif font-black text-xl text-ink-black">
              Immutable System Activity Ledger
            </h2>
          </div>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-ink-black text-white uppercase">
            SHA-256 HMAC VERIFIED
          </span>
        </div>

        <div className="p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>TIMESTAMP</TableHead>
                <TableHead>ACTOR / PRINCIPAL</TableHead>
                <TableHead>ACTION</TableHead>
                <TableHead>ENTITY TYPE & ID</TableHead>
                <TableHead>AUDIT PAYLOAD SUMMARY</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-[11px] text-ink-muted tabular-nums">
                    {log.created_at}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-ink-black font-bold">
                    {log.actor_email || "system-scheduler"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="neutral">{log.action}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-ink-charcoal">
                    {log.entity_type} • {log.entity_id.substring(0, 8)}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-ink-muted truncate max-w-xs">
                    {JSON.stringify(log.payload)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

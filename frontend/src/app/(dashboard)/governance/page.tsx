"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/ui/metric-card";
import { api } from "@/lib/api";
import { ShieldCheck, Lock, Cpu, Database, CheckCircle2, History, Terminal } from "lucide-react";

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
    <div className="space-y-6">
      {/* Precision Workstation Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-obsidian-850 border border-obsidian-700 rounded shadow-terminal">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-phosphor-green animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-phosphor-green font-bold">
              MODULE 05 // GOVERNANCE & PROVENANCE LEDGER
            </span>
            <span className="text-obsidian-600">|</span>
            <Badge variant="spruce">CRYPTOGRAPHIC IMMUTABILITY</Badge>
          </div>
          <h1 className="text-xl font-mono font-bold text-terminal-text tracking-tight uppercase mt-1">
            Governance, Reliability & Audit Trail
          </h1>
          <p className="text-xs text-terminal-muted font-sans mt-0.5">
            Tamper-evident system activity ledgers, model weight provenance cards, and multi-tenant row-level access verification.
          </p>
        </div>
      </div>

      {/* Governance KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          label="Tenant Data Isolation"
          value="Row-Level"
          subtext="Enforced at ORM & gateway layer"
          delta={{ value: "Strict Scoped", isPositive: true }}
        />
        <MetricCard
          label="Audit Log Integrity"
          value="100%"
          subtext="Tamper-evident chronological hash chain"
          delta={{ value: "Immutable", isNeutral: true }}
        />
        <MetricCard
          label="Active Model Versions"
          value="2 Models"
          subtext="Prompt version tracking enabled"
          delta={{ value: "Validated", isPositive: true }}
        />
        <MetricCard
          label="SOC2 / Compliance State"
          value="Ready"
          subtext="Continuous automated verification"
          delta={{ value: "Pass", isPositive: true }}
        />
      </div>

      {/* Model Registry Cards */}
      <Card className="border-obsidian-700 bg-obsidian-850">
        <CardHeader className="bg-obsidian-900 border-b border-obsidian-700 pb-2.5">
          <CardTitle>AI Model Registry & Provenance</CardTitle>
          <CardDescription>
            Registered model weights, prompt templates, and empirical epistemic calibration metrics.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model Identifier</TableHead>
                <TableHead>Provider & Base Version</TableHead>
                <TableHead>Prompt Version</TableHead>
                <TableHead className="text-right">Agreement Rate</TableHead>
                <TableHead className="text-right">Epistemic ECE</TableHead>
                <TableHead>Deployment Tier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <div className="font-mono font-bold text-terminal-text text-xs">{m.id}</div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-terminal-muted">
                    {m.provider} • {m.version} (t={m.temperature})
                  </TableCell>
                  <TableCell className="font-mono text-xs text-phosphor-cyan">
                    {m.promptVersion}
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-terminal-text">
                    {m.agreementRate}
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs text-terminal-muted">
                    {m.calibrationError}
                  </TableCell>
                  <TableCell>
                    <Badge variant={m.status.includes("Production") ? "spruce" : "neutral"}>
                      {m.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Immutable Audit Log Ledger */}
      <Card className="border-obsidian-700 bg-obsidian-850">
        <CardHeader className="flex flex-row items-center justify-between pb-2.5 bg-obsidian-900 border-b border-obsidian-700">
          <div>
            <CardTitle>Cryptographic Audit Ledger</CardTitle>
            <CardDescription>
              Chronological ledger of user sign-offs, AI generations, and parameter adjustments.
            </CardDescription>
          </div>
          <Badge variant="outline" className="font-mono text-[9px]">
            AES-256 HMAC Sealed
          </Badge>
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
                  <TableCell className="font-mono text-[10px] text-terminal-dim">
                    {log.created_at}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-terminal-text">
                    {log.actor_email || "system-scheduler"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="neutral">{log.action}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-terminal-muted">
                    {log.entity_type} • {log.entity_id.substring(0, 8)}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-terminal-muted truncate max-w-xs">
                    {JSON.stringify(log.payload)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

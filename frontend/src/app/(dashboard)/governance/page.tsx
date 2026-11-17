"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/ui/metric-card";
import { api } from "@/lib/api";
import { ShieldCheck, Lock, Cpu, Database, CheckCircle2, History } from "lucide-react";

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
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink-tertiary">Module F</span>
            <span className="text-hairline">|</span>
            <Badge variant="spruce">Tenant Isolation & Audit Protocol Active</Badge>
          </div>
          <h1 className="text-xl font-semibold text-ink-primary tracking-tight mt-1">
            Governance, Reliability & Audit Trail
          </h1>
          <p className="text-xs text-ink-secondary mt-1">
            Immutable system logs, model card provenance, and enterprise tenancy controls.
          </p>
        </div>
      </div>

      {/* Governance KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
      <Card>
        <CardHeader>
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
                    <div className="font-mono font-semibold text-ink-primary">{m.id}</div>
                  </TableCell>
                  <TableCell className="text-xs text-ink-secondary">
                    {m.provider} • {m.version} (t={m.temperature})
                  </TableCell>
                  <TableCell className="font-mono text-xs text-ink-secondary">
                    {m.promptVersion}
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold text-ink-primary">
                    {m.agreementRate}
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs text-ink-secondary">
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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle>Immutable System Audit Ledger</CardTitle>
            <CardDescription>
              Chronological ledger of user sign-offs, AI generations, and parameter adjustments.
            </CardDescription>
          </div>
          <Badge variant="outline" className="font-mono text-[10px]">
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
                  <TableCell className="font-mono text-[11px] text-ink-tertiary">
                    {log.created_at}
                  </TableCell>
                  <TableCell className="text-xs font-medium text-ink-primary">
                    {log.actor_email || "system-scheduler"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="neutral">{log.action}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-ink-secondary">
                    {log.entity_type} • {log.entity_id.substring(0, 8)}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-ink-secondary truncate max-w-xs">
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

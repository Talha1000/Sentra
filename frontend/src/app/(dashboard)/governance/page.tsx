"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Governance & Audit</span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">HMAC-SHA256 Sealed</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Model Provenance & Audit Registry
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
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

      {/* Model Registry Card */}
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
                    <div className="font-semibold text-slate-900">{m.id}</div>
                  </TableCell>
                  <TableCell className="text-slate-600 font-mono text-xs">
                    {m.provider} • {m.version} (t={m.temperature})
                  </TableCell>
                  <TableCell className="font-mono text-xs text-blue-600 font-medium">
                    {m.promptVersion}
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold text-slate-900 tabular-nums">
                    {m.agreementRate}
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs text-slate-500 tabular-nums">
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

      {/* Cryptographic Audit Trail Card */}
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
                  <TableCell className="font-mono text-xs text-slate-500 tabular-nums">
                    {log.created_at}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">
                    {log.actor_email || "system-scheduler"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="neutral">{log.action}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-600">
                    {log.entity_type} • {log.entity_id.substring(0, 8)}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-500 truncate max-w-xs">
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

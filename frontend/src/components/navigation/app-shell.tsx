"use client";

import React from "react";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-obsidian-900 text-terminal-text font-sans antialiased">
      <Topbar />
      <main className="flex-1 p-4 lg:p-6 max-w-[1600px] mx-auto w-full">{children}</main>
    </div>
  );
}

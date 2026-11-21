import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SENTRA — The Decision Intelligence & Verification Platform",
  description: "Stress-test consequential enterprise decisions with stochastic calculus, behavioral research, and cryptographic auditability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#EBEBEB] text-[#0A0A0A] min-h-screen selection:bg-neutral-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}

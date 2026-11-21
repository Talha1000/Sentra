import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SENTRA — Decision Intelligence & Verification Platform",
  description: "Stress-test consequential enterprise decisions with stochastic calculus, behavioral research, and cryptographic auditability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B0C0E] text-[#F3F4F6] min-h-screen selection:bg-blue-600/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

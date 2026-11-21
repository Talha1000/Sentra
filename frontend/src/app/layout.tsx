import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SENTRA — The Consequential Decision Platform",
  description: "Mathematically verifiable decision intelligence. Stress-test capital commitments against stochastic reality, generative AI bias, and cognitive deference.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050608] text-[#F3F4F6] min-h-screen antialiased selection:bg-[#00F0FF]/20 selection:text-[#00F0FF]">
        {children}
      </body>
    </html>
  );
}

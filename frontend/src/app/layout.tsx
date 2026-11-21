import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sentra — Enterprise Decision Intelligence & Verification",
  description: "Mathematically verifiable decision intelligence. Stress-test enterprise capital commitments against stochastic reality, generative AI bias, and cognitive deference.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sentra — Business Decision Planning & Verification",
  description: "Test big business decisions before you spend budget. Sentra helps business leaders simulate plans, compare options, and avoid costly mistakes with simple, reliable forecasts.",
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

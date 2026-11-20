import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SENTRA — Decision Intelligence Platform & Research Laboratory",
  description: "Enterprise decision intelligence, human-AI collaborative governance, and cognitive research platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-canvas text-ink-primary min-h-screen selection:bg-terracotta/20 selection:text-terracotta">
        {children}
      </body>
    </html>
  );
}

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
    <html lang="en">
      <body className="bg-canvas text-ink-primary min-h-screen selection:bg-cognition-subtle selection:text-cognition">
        {children}
      </body>
    </html>
  );
}

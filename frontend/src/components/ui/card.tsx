import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "indigo" | "coral" | "emerald" | "none";
  interactive?: boolean;
}

export function Card({ className, children, glow = "none", interactive = false, ...props }: CardProps) {
  const glowClasses = {
    indigo: "hover:shadow-glow hover:border-indigo-500/40",
    coral: "hover:shadow-glow-coral hover:border-orange-500/40",
    emerald: "hover:shadow-glow-emerald hover:border-emerald-500/40",
    none: "",
  };

  return (
    <div
      className={cn(
        "relative bg-[#0D111A]/80 backdrop-blur-xl border border-white/[0.09] rounded-2xl shadow-card transition-all duration-300 overflow-hidden",
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:pointer-events-none",
        interactive && "hover:-translate-y-0.5 hover:border-white/20 cursor-pointer",
        glowClasses[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 border-b border-white/[0.06] flex flex-col justify-between", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-semibold text-white tracking-tight leading-snug", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs text-ink-secondary mt-1.5 leading-relaxed font-sans", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 py-4 bg-white/[0.02] border-t border-white/[0.06] rounded-b-2xl flex items-center justify-between", className)} {...props}>
      {children}
    </div>
  );
}

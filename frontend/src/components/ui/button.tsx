import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "brand" | "terracotta" | "white" | "glass";
  size?: "sm" | "md" | "lg" | "default" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090E] disabled:opacity-50 disabled:pointer-events-none rounded-xl select-none cursor-pointer";

    const variants = {
      // Radiant Electric Indigo Button with glowing aura
      primary:
        "bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white shadow-[0_4px_20px_-2px_rgba(99,102,241,0.45)] hover:shadow-[0_6px_25px_-2px_rgba(99,102,241,0.65)] hover:from-indigo-400 hover:to-indigo-600 active:scale-[0.98] border border-indigo-400/30 font-semibold",
      // Pure luminous white button for bold contrast
      white:
        "bg-white text-slate-950 hover:bg-slate-100 shadow-[0_4px_16px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_22px_rgba(255,255,255,0.4)] active:scale-[0.98] font-semibold border border-white/80",
      // Sunset Coral / Amber Button with warmth and energy
      terracotta:
        "bg-gradient-to-r from-orange-500 via-[#FF6B4A] to-amber-500 text-white shadow-[0_4px_20px_-2px_rgba(255,107,74,0.45)] hover:shadow-[0_6px_25px_-2px_rgba(255,107,74,0.65)] hover:brightness-110 active:scale-[0.98] border border-orange-400/30 font-semibold",
      brand:
        "bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white shadow-[0_4px_20px_-2px_rgba(99,102,241,0.45)] hover:shadow-[0_6px_25px_-2px_rgba(99,102,241,0.65)] hover:from-indigo-400 hover:to-indigo-600 active:scale-[0.98] border border-indigo-400/30 font-semibold",
      // Modern Frosted Glass Button
      secondary:
        "bg-white/[0.05] text-ink-primary border border-white/[0.1] hover:bg-white/[0.09] hover:border-white/[0.2] shadow-sm backdrop-blur-md active:scale-[0.98]",
      glass:
        "bg-white/[0.04] text-white border border-white/[0.12] hover:bg-white/[0.08] hover:border-white/[0.22] backdrop-blur-xl shadow-glass active:scale-[0.98]",
      outline:
        "border border-white/[0.15] bg-transparent text-ink-primary hover:bg-white/[0.05] hover:border-indigo-400/40 active:scale-[0.98]",
      ghost:
        "text-ink-secondary hover:text-white hover:bg-white/[0.06] active:scale-[0.98]",
      destructive:
        "bg-gradient-to-r from-rose-600 to-rose-700 text-white hover:from-rose-500 hover:to-rose-600 shadow-[0_4px_16px_rgba(225,29,72,0.35)] active:scale-[0.98] border border-rose-400/30",
    };

    const sizes = {
      sm: "h-8 px-3.5 text-xs gap-1.5 rounded-lg",
      md: "h-9 px-4 text-xs gap-2 rounded-xl",
      lg: "h-11 px-6 text-sm gap-2.5 rounded-xl",
      default: "h-9 px-4 text-xs gap-2 rounded-xl",
      icon: "h-9 w-9 p-0 rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5 text-current" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

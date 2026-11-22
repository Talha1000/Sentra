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
      "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer tracking-tight rounded-full";

    const variants = {
      // Modern Obsidian Pill
      primary:
        "bg-gradient-to-b from-slate-800 to-slate-950 hover:from-slate-700 hover:to-slate-900 active:from-slate-950 active:to-black text-white border border-white/10 shadow-[0_2px_8px_-1px_rgba(15,23,42,0.2),0_1px_3px_0_rgba(15,23,42,0.1),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:shadow-[0_6px_16px_-2px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.975]",
      brand:
        "bg-gradient-to-b from-slate-800 to-slate-950 hover:from-slate-700 hover:to-slate-900 active:from-slate-950 active:to-black text-white border border-white/10 shadow-[0_2px_8px_-1px_rgba(15,23,42,0.2),0_1px_3px_0_rgba(15,23,42,0.1),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:shadow-[0_6px_16px_-2px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.975]",
      // Floating Alabaster Pill
      secondary:
        "bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/90 hover:border-slate-300 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_10px_-2px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.975]",
      white:
        "bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/90 hover:border-slate-300 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_10px_-2px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.975]",
      glass:
        "bg-slate-100/80 hover:bg-slate-200/80 active:bg-slate-200 text-slate-700 border border-slate-200/60 shadow-xs hover:-translate-y-0.5 active:scale-[0.975]",
      terracotta:
        "bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:bg-orange-800 text-white shadow-xs hover:-translate-y-0.5 active:scale-[0.975]",
      outline:
        "bg-transparent hover:bg-slate-100 active:bg-slate-200 text-slate-700 border border-slate-300 active:scale-[0.975]",
      ghost:
        "text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 active:scale-[0.975]",
      destructive:
        "bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white border border-rose-700 shadow-xs active:scale-[0.975]",
    };

    const sizes = {
      sm: "h-8 px-3.5 text-xs gap-1.5 rounded-full",
      md: "h-9.5 px-4.5 text-sm gap-2 rounded-full",
      default: "h-9.5 px-4.5 text-sm gap-2 rounded-full",
      lg: "h-11 px-6 text-sm gap-2.5 rounded-full",
      icon: "h-9.5 w-9.5 p-0 rounded-full",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-1.5 text-current" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

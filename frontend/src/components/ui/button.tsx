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
      "inline-flex items-center justify-center font-medium transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer tracking-tight";

    const variants = {
      // Elegant Obsidian Carbon
      primary:
        "bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white border border-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.16)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.12)] active:scale-[0.985]",
      brand:
        "bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white border border-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.16)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.12)] active:scale-[0.985]",
      // Crisp Alabaster White
      secondary:
        "bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06)] active:scale-[0.985]",
      white:
        "bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06)] active:scale-[0.985]",
      glass:
        "bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-700 border border-slate-200 shadow-xs active:scale-[0.985]",
      terracotta:
        "bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white shadow-xs active:scale-[0.985]",
      outline:
        "bg-transparent hover:bg-slate-100 active:bg-slate-200 text-slate-700 border border-slate-300 active:scale-[0.985]",
      ghost:
        "text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 active:scale-[0.985]",
      destructive:
        "bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white border border-rose-700 shadow-xs active:scale-[0.985]",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
      md: "h-9 px-4 text-sm gap-2 rounded-lg",
      default: "h-9 px-4 text-sm gap-2 rounded-lg",
      lg: "h-11 px-5 text-sm gap-2 rounded-lg",
      icon: "h-9 w-9 p-0 rounded-lg",
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

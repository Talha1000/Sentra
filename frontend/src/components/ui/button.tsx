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
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";

    const variants = {
      primary:
        "bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 shadow-sm active:bg-blue-800",
      brand:
        "bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 shadow-sm active:bg-blue-800",
      secondary:
        "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm active:bg-slate-100",
      white:
        "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm active:bg-slate-100",
      glass:
        "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm active:bg-slate-200",
      terracotta:
        "bg-orange-600 hover:bg-orange-700 text-white shadow-sm active:bg-orange-800",
      outline:
        "bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-300 active:bg-slate-200",
      ghost:
        "text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200",
      destructive:
        "bg-rose-600 hover:bg-rose-700 text-white border border-rose-700 shadow-sm active:bg-rose-800",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
      md: "h-9 px-4 text-sm gap-2 rounded-lg",
      default: "h-9 px-4 text-sm gap-2 rounded-lg",
      lg: "h-11 px-6 text-base gap-2.5 rounded-lg",
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

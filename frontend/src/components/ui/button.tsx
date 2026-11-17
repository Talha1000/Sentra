import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "brand";
  size?: "sm" | "md" | "lg" | "default";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg select-none";

    const variants = {
      primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-xs active:scale-[0.99]",
      brand: "bg-brand-600 text-white hover:bg-brand-700 shadow-xs active:scale-[0.99]",
      secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 shadow-xs active:scale-[0.99]",
      outline: "border border-slate-200 bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900",
      ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
      destructive: "bg-rose-600 text-white hover:bg-rose-700 shadow-xs active:scale-[0.99]",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-9 px-3.5 text-xs gap-2",
      lg: "h-11 px-5 text-sm gap-2.5",
      default: "h-9 px-3.5 text-xs gap-2",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin mr-1 text-current" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

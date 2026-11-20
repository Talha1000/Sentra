import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "brand" | "terracotta";
  size?: "sm" | "md" | "lg" | "default";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl select-none";

    const variants = {
      // Crisp white button for primary actions on obsidian background
      primary: "bg-white text-slate-950 hover:bg-slate-200 shadow-xs active:scale-[0.99] font-semibold",
      // Luminous warm terracotta button
      terracotta: "bg-terracotta text-white hover:bg-terracotta-hover shadow-xs active:scale-[0.99] font-semibold",
      brand: "bg-terracotta text-white hover:bg-terracotta-hover shadow-xs active:scale-[0.99] font-semibold",
      // Dark elevated surface secondary button
      secondary: "bg-canvas-subtle text-ink-primary border border-warm-hairline hover:bg-canvas-muted hover:border-warm-border shadow-xs active:scale-[0.99]",
      outline: "border border-warm-border bg-transparent text-ink-primary hover:bg-canvas-subtle",
      ghost: "text-ink-secondary hover:text-ink-primary hover:bg-canvas-subtle",
      destructive: "bg-rose-600 text-white hover:bg-rose-700 shadow-xs active:scale-[0.99]",
    };

    const sizes = {
      sm: "h-8 px-3.5 text-xs gap-1.5",
      md: "h-9 px-4 text-xs gap-2",
      lg: "h-11 px-6 text-sm gap-2.5",
      default: "h-9 px-4 text-xs gap-2",
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

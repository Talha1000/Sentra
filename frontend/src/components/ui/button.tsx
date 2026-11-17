import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "default";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-mono font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-klein disabled:opacity-40 disabled:pointer-events-none rounded-none select-none uppercase tracking-wider border-2 border-ink-black";

    const variants = {
      primary: "bg-ink-black text-white hover:bg-klein hover:border-klein hover:shadow-sharpKlein active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
      secondary: "bg-vellum-100 text-ink-black hover:bg-white shadow-sharp active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
      outline: "border-2 border-ink-black bg-transparent hover:bg-vellum-200 text-ink-black",
      ghost: "border-0 hover:bg-vellum-200 text-ink-black",
      destructive: "bg-vermilion text-white border-vermilion hover:bg-red-700 shadow-sharp active:shadow-none",
    };

    const sizes = {
      sm: "h-7 px-3 text-[10px] gap-1.5",
      md: "h-9 px-4 text-xs gap-2",
      lg: "h-11 px-5 text-sm gap-2.5",
      default: "h-9 px-4 text-xs gap-2",
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

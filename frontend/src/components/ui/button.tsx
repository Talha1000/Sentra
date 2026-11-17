import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded select-none";

    const variants = {
      primary: "bg-ink-primary text-panel hover:bg-black active:bg-ink-secondary",
      secondary: "bg-subtle text-ink-primary hover:bg-surface-hover active:bg-surface-active border border-hairline",
      outline: "border border-hairline bg-transparent hover:bg-subtle text-ink-primary",
      ghost: "hover:bg-subtle text-ink-primary",
      destructive: "bg-crimson text-white hover:bg-red-800",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-9 px-4 text-xs gap-2",
      lg: "h-11 px-5 text-sm gap-2.5",
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

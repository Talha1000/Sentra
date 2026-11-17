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
      "inline-flex items-center justify-center font-mono font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-phosphor-cyan disabled:opacity-40 disabled:pointer-events-none rounded select-none uppercase tracking-wider";

    const variants = {
      primary: "bg-phosphor-cyan text-obsidian-950 font-bold hover:bg-[#33ddff] shadow-[0_0_15px_-2px_rgba(0,212,255,0.4)] active:scale-[0.98]",
      secondary: "bg-obsidian-750 text-terminal-text hover:bg-obsidian-700 hover:text-white border border-obsidian-700 active:bg-obsidian-800",
      outline: "border border-obsidian-700 bg-transparent hover:bg-obsidian-800 hover:border-terminal-muted text-terminal-text",
      ghost: "hover:bg-obsidian-750 text-terminal-muted hover:text-terminal-text",
      destructive: "bg-phosphor-crimson text-obsidian-950 font-bold hover:bg-red-400 shadow-[0_0_15px_-2px_rgba(255,77,77,0.4)]",
    };

    const sizes = {
      sm: "h-7 px-2.5 text-[11px] gap-1.5",
      md: "h-8 px-3.5 text-xs gap-2",
      lg: "h-10 px-4 text-xs gap-2.5",
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

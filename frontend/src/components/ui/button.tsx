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
      "relative inline-flex items-center justify-center font-medium transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0C0E] disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";

    const variants = {
      // Realistic Satin Porcelain Button with layered depth and top light rim
      primary:
        "bg-gradient-to-b from-[#FFFFFF] via-[#FBFBFC] to-[#EFF1F5] text-neutral-900 border border-black/[0.08] border-b-black/[0.2] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_3px_8px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.04)] hover:from-[#FFFFFF] hover:to-[#F4F6F9] hover:shadow-[0_3px_12px_rgba(0,0,0,0.09),0_1px_3px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)] active:translate-y-[0.5px] active:scale-[0.985] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.12),0_1px_1px_rgba(0,0,0,0.05)]",
      white:
        "bg-gradient-to-b from-[#FFFFFF] via-[#FBFBFC] to-[#EFF1F5] text-neutral-900 border border-black/[0.08] border-b-black/[0.2] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_3px_8px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.04)] hover:from-[#FFFFFF] hover:to-[#F4F6F9] hover:shadow-[0_3px_12px_rgba(0,0,0,0.09),0_1px_3px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)] active:translate-y-[0.5px] active:scale-[0.985] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.12),0_1px_1px_rgba(0,0,0,0.05)]",
      // Realistic Tactile Dark Graphite Glass with top edge reflection
      secondary:
        "bg-gradient-to-b from-[#22262E] via-[#1A1C23] to-[#14161B] text-neutral-200 border border-white/[0.1] border-b-black/40 shadow-[0_1px_2px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.13),inset_0_-1px_0_rgba(0,0,0,0.25)] hover:from-[#282C36] hover:to-[#1C1E26] hover:text-white hover:border-white/[0.18] hover:shadow-[0_3px_10px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.18)] active:translate-y-[0.5px] active:scale-[0.985] active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]",
      glass:
        "bg-gradient-to-b from-[#22262E]/90 to-[#14161B]/90 text-neutral-200 border border-white/[0.1] shadow-[0_1px_2px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] hover:from-[#282C36] hover:to-[#1C1E26] hover:text-white backdrop-blur-md active:scale-[0.985]",
      // Precision Cobalt Button with physical bevel and glow
      brand:
        "bg-gradient-to-b from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] text-white border border-blue-400/35 border-b-blue-900/50 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_3px_10px_rgba(37,99,235,0.32),inset_0_1px_0_rgba(255,255,255,0.26)] hover:from-[#60A5FA] hover:to-[#2563EB] hover:shadow-[0_4px_16px_rgba(37,99,235,0.42),inset_0_1px_0_rgba(255,255,255,0.32)] active:translate-y-[0.5px] active:scale-[0.985] active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]",
      terracotta:
        "bg-gradient-to-b from-[#F43F5E] via-[#E11D48] to-[#BE123C] text-white border border-rose-400/35 border-b-rose-950/50 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_3px_10px_rgba(225,29,72,0.32),inset_0_1px_0_rgba(255,255,255,0.26)] hover:brightness-105 active:scale-[0.985]",
      outline:
        "border border-white/[0.12] bg-white/[0.02] text-neutral-300 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.22] shadow-[0_1px_2px_rgba(0,0,0,0.2)] active:scale-[0.985]",
      ghost:
        "text-neutral-400 hover:text-white hover:bg-white/[0.06] active:bg-white/[0.09] active:scale-[0.985]",
      destructive:
        "bg-gradient-to-b from-rose-600 to-rose-700 text-white border border-rose-500/30 shadow-[0_2px_8px_rgba(225,29,72,0.3)] hover:brightness-105 active:scale-[0.985]",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
      md: "h-9 px-4 text-xs gap-2 rounded-xl",
      lg: "h-11 px-5 text-sm gap-2.5 rounded-xl",
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

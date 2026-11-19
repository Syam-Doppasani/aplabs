import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isTechnical?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "right",
      isTechnical = true,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none group";

    const variantStyles = {
      primary:
        "bg-[#A3E635] text-[#050505] hover:bg-[#84CC16] hover:shadow-[0_0_24px_rgba(163,230,53,0.35)] active:scale-[0.98]",
      secondary:
        "bg-[#111411] text-[#F5F5F5] border border-white/10 hover:border-[#A3E635]/40 hover:bg-[#171A17] hover:text-white active:scale-[0.98]",
      outline:
        "bg-transparent text-[#F5F5F5] border border-[#A3E635]/50 hover:bg-[#A3E635]/10 hover:border-[#A3E635] hover:text-[#A3E635] active:scale-[0.98]",
      ghost:
        "bg-transparent text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-white/5",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5 font-mono",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-7 py-3.5 gap-2.5 font-semibold",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          isTechnical && "tracking-wide",
          className
        )}
        {...props}
      >
        {/* Subtle engineering corner marks for technical button variant */}
        {isTechnical && variant === "primary" && (
          <>
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#050505]/40" />
            <span className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-[#050505]/40" />
          </>
        )}

        {icon && iconPosition === "left" && (
          <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
            {icon}
          </span>
        )}

        <span>{children}</span>

        {icon && iconPosition === "right" && (
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

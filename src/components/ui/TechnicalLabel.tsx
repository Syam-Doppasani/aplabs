import React from "react";
import { cn } from "@/lib/utils";

interface TechnicalLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "lime" | "gray" | "outline" | "solid";
  size?: "sm" | "md";
  dot?: boolean;
}

export const TechnicalLabel: React.FC<TechnicalLabelProps> = ({
  className,
  variant = "lime",
  size = "sm",
  dot = true,
  children,
  ...props
}) => {
  const variantStyles = {
    lime: "bg-[#A3E635]/10 text-[#A3E635] border border-[#A3E635]/25",
    gray: "bg-white/5 text-[#A1A1AA] border border-white/10",
    outline: "bg-transparent text-[#F5F5F5] border border-white/15",
    solid: "bg-[#171A17] text-[#F5F5F5] border border-white/10",
  };

  const sizeStyles = {
    sm: "text-[10px] tracking-wider py-0.5 px-2 font-mono uppercase",
    md: "text-xs tracking-wider py-1 px-3 font-mono uppercase",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 select-none rounded-[2px]",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full inline-block animate-pulse",
            variant === "lime" ? "bg-[#A3E635]" : "bg-[#A1A1AA]"
          )}
        />
      )}
      <span>{children}</span>
    </div>
  );
};

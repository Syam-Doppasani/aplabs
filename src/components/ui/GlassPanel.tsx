import React from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "accent" | "bordered";
  crosshairs?: boolean;
  coordBadge?: string;
  glow?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  className,
  variant = "default",
  crosshairs = false,
  coordBadge,
  glow = false,
  children,
  ...props
}) => {
  const variantStyles = {
    default: "bg-[#111411]/70 backdrop-blur-md border border-white/10",
    subtle: "bg-white/[0.025] backdrop-blur-sm border border-white/[0.06]",
    accent: "bg-[#111411]/85 backdrop-blur-lg border border-[#A3E635]/30 shadow-[0_0_24px_rgba(163,230,53,0.06)]",
    bordered: "bg-[#0B0D0B]/80 backdrop-blur-md border border-white/10 hover:border-[#A3E635]/30 transition-colors duration-300",
  };

  return (
    <div
      className={cn(
        "relative",
        variantStyles[variant],
        crosshairs && "crosshair-corner",
        glow && "shadow-[0_0_30px_rgba(163,230,53,0.12)]",
        className
      )}
      {...props}
    >
      {coordBadge && (
        <div className="absolute top-2 right-3 font-mono text-[9px] text-[#A1A1AA]/60 tracking-widest pointer-events-none select-none uppercase">
          {coordBadge}
        </div>
      )}
      {children}
    </div>
  );
};

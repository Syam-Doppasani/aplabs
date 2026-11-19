import React from "react";
import { cn } from "@/lib/utils";
import { TechnicalLabel } from "./TechnicalLabel";

interface SectionHeadingProps {
  label: string;
  tagline?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  tagline,
  title,
  description,
  align = "left",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col mb-12 lg:mb-16",
        align === "center" ? "items-center text-center max-w-3xl mx-auto" : "max-w-3xl",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <TechnicalLabel variant="lime" size="sm">
          {label}
        </TechnicalLabel>
        {tagline && (
          <span className="font-mono text-[11px] text-[#A1A1AA] uppercase tracking-wider">
            // {tagline}
          </span>
        )}
      </div>

      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] uppercase leading-[1.08] mb-4">
        {title}
      </h2>

      {description && (
        <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed font-sans font-light">
          {description}
        </p>
      )}

      {/* Decorative technical ruler line */}
      <div
        className={cn(
          "h-[1px] w-24 bg-gradient-to-r from-[#A3E635]/60 to-transparent mt-6",
          align === "center" && "mx-auto from-transparent via-[#A3E635]/60 to-transparent w-48"
        )}
      />
    </div>
  );
};

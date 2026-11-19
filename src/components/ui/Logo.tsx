import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  size = "sm",
  withLink = true,
}) => {
  const heightClasses = {
    sm: "h-9 w-auto",
    md: "h-12 w-auto",
    lg: "h-16 w-auto",
  };

  const content = (
    <div className={cn("inline-flex items-center group cursor-pointer", className)}>
      {/* Official AP Labs Logo with dark-mode seamless blend */}
      <img
        src="/images/ap-labs-logo.jpeg"
        alt="AP Labs — Mechanical Engineering & Product Design"
        className={cn(
          "object-contain mix-blend-lighten select-none transition-transform duration-300 group-hover:scale-[1.02]",
          heightClasses[size]
        )}
      />
    </div>
  );

  if (withLink) {
    return (
      <Link href="#hero" aria-label="AP Labs Homepage">
        {content}
      </Link>
    );
  }

  return content;
};

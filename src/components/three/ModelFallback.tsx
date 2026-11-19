import React from "react";
import { cn } from "@/lib/utils";

interface ModelFallbackProps {
  type: "gear" | "mould" | "chassis" | "handheld" | "flow" | "bracket" | "joint";
  title?: string;
  className?: string;
}

export const ModelFallback: React.FC<ModelFallbackProps> = ({
  type,
  title,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative w-full h-full min-h-[320px] bg-[#0B0D0B] border border-white/10 flex flex-col items-center justify-center p-6 overflow-hidden select-none",
        className
      )}
    >
      {/* Background CAD grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-40 pointer-events-none" />

      {/* Blueprint Corner Registration Marks */}
      <div className="absolute top-3 left-3 font-mono text-[9px] text-[#A3E635] tracking-widest uppercase">
        + CAD_SCHEMATIC // {type.toUpperCase()}
      </div>
      <div className="absolute top-3 right-3 font-mono text-[9px] text-[#A1A1AA]/60 tracking-widest uppercase">
        SCALE 1:1 // ISO 5456-2
      </div>
      <div className="absolute bottom-3 left-3 font-mono text-[9px] text-[#A1A1AA]/60 tracking-widest uppercase">
        TOL: ±0.005mm
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[#A3E635] tracking-widest uppercase">
        VECTOR ENGINE OK
      </div>

      {/* Center Technical Blueprint Vector Graphic */}
      <div className="relative z-10 w-full max-w-[280px] h-[220px] flex items-center justify-center">
        {type === "gear" && (
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#A3E635] stroke-current fill-none">
            {/* Outer Ring */}
            <circle cx="100" cy="100" r="88" strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx="100" cy="100" r="80" strokeWidth="2" />
            {/* Centerlines */}
            <line x1="100" y1="5" x2="100" y2="195" strokeWidth="0.75" stroke="#A1A1AA" strokeDasharray="6 3 1 3" />
            <line x1="5" y1="100" x2="195" y2="100" strokeWidth="0.75" stroke="#A1A1AA" strokeDasharray="6 3 1 3" />
            {/* Sun Gear */}
            <circle cx="100" cy="100" r="24" strokeWidth="2" />
            <circle cx="100" cy="100" r="10" strokeWidth="1.5" stroke="#F5F5F5" />
            {/* 3 Planets */}
            <circle cx="100" cy="55" r="20" strokeWidth="1.75" stroke="#A3E635" />
            <circle cx="100" cy="55" r="6" strokeWidth="1" stroke="#F5F5F5" />
            <circle cx="61" cy="122" r="20" strokeWidth="1.75" stroke="#A3E635" />
            <circle cx="61" cy="122" r="6" strokeWidth="1" stroke="#F5F5F5" />
            <circle cx="139" cy="122" r="20" strokeWidth="1.75" stroke="#A3E635" />
            <circle cx="139" cy="122" r="6" strokeWidth="1" stroke="#F5F5F5" />
            {/* Pitch Circle */}
            <circle cx="100" cy="100" r="52" strokeWidth="0.75" stroke="#A1A1AA" strokeDasharray="3 3" />
          </svg>
        )}

        {type === "mould" && (
          <svg viewBox="0 0 220 180" className="w-full h-full stroke-current fill-none">
            {/* A-Plate */}
            <rect x="25" y="20" width="170" height="45" stroke="#A1A1AA" strokeWidth="1.5" />
            {/* Parting Line Accent */}
            <line x1="15" y1="65" x2="205" y2="65" stroke="#A3E635" strokeWidth="2.5" />
            {/* B-Plate */}
            <rect x="25" y="65" width="170" height="50" stroke="#A1A1AA" strokeWidth="1.5" />
            {/* Ejector Pins */}
            <line x1="60" y1="85" x2="60" y2="155" stroke="#A3E635" strokeWidth="1.5" />
            <line x1="160" y1="85" x2="160" y2="155" stroke="#A3E635" strokeWidth="1.5" />
            {/* Ejector Plate */}
            <rect x="40" y="145" width="140" height="15" stroke="#F5F5F5" strokeWidth="1.5" />
            {/* Cooling Circuits */}
            <circle cx="45" cy="42" r="6" stroke="#38BDF8" strokeWidth="1.5" />
            <circle cx="175" cy="42" r="6" stroke="#38BDF8" strokeWidth="1.5" />
          </svg>
        )}

        {type === "chassis" && (
          <svg viewBox="0 0 220 160" className="w-full h-full stroke-current fill-none">
            {/* Folded Enclosure Isometric Wireframe */}
            <polygon points="40,60 110,25 180,60 110,95" stroke="#A3E635" strokeWidth="1.5" />
            <polygon points="40,60 110,95 110,140 40,105" stroke="#A1A1AA" strokeWidth="1.5" />
            <polygon points="180,60 110,95 110,140 180,105" stroke="#F5F5F5" strokeWidth="1.5" />
            {/* Ventilation perforations */}
            <line x1="60" y1="88" x2="90" y2="103" stroke="#A3E635" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="60" y1="94" x2="90" y2="109" stroke="#A3E635" strokeWidth="1" strokeDasharray="3 2" />
          </svg>
        )}

        {type === "handheld" && (
          <svg viewBox="0 0 160 220" className="w-full h-full stroke-current fill-none">
            {/* Ergonomic Contour Outer Profile */}
            <path
              d="M 45 30 C 45 15, 115 15, 115 30 L 125 140 C 125 190, 35 190, 35 140 Z"
              stroke="#A3E635"
              strokeWidth="2"
            />
            {/* Display Bezel */}
            <rect x="52" y="45" width="56" height="50" rx="3" stroke="#F5F5F5" strokeWidth="1.5" />
            {/* Thumb Controls */}
            <circle cx="80" cy="130" r="14" stroke="#A1A1AA" strokeWidth="1.5" />
            <circle cx="80" cy="130" r="6" stroke="#A3E635" strokeWidth="1.5" />
          </svg>
        )}

        {type === "flow" && (
          <svg viewBox="0 0 220 160" className="w-full h-full stroke-current fill-none">
            {/* Rectangular Mould Cavity */}
            <rect x="30" y="30" width="160" height="100" rx="4" stroke="#A1A1AA" strokeWidth="1.5" />
            {/* Gate injection mark */}
            <polygon points="18,80 30,73 30,87" fill="#A3E635" stroke="#A3E635" />
            {/* Isochrone Melt Front Curves */}
            <path d="M 50 30 Q 80 80 50 130" stroke="#38BDF8" strokeWidth="1.5" />
            <path d="M 85 30 Q 120 80 85 130" stroke="#4ADE80" strokeWidth="1.5" />
            <path d="M 125 30 Q 160 80 125 130" stroke="#FACC15" strokeWidth="1.5" />
            <path d="M 165 30 Q 195 80 165 130" stroke="#F87171" strokeWidth="1.5" />
          </svg>
        )}

        {(type === "bracket" || type === "joint") && (
          <svg viewBox="0 0 200 200" className="w-full h-full stroke-current fill-none">
            {/* Structural Pivot Bore */}
            <circle cx="100" cy="50" r="28" stroke="#A3E635" strokeWidth="2" />
            <circle cx="100" cy="50" r="14" stroke="#F5F5F5" strokeWidth="1.5" />
            {/* Topology Struts */}
            <path d="M 74 58 L 45 150 L 70 150 L 90 76 Z" stroke="#A1A1AA" strokeWidth="1.5" />
            <path d="M 126 58 L 155 150 L 130 150 L 110 76 Z" stroke="#A1A1AA" strokeWidth="1.5" />
            {/* Base Plate */}
            <rect x="30" y="150" width="140" height="24" stroke="#A3E635" strokeWidth="2" />
            <circle cx="50" cy="162" r="5" stroke="#F5F5F5" strokeWidth="1.5" />
            <circle cx="150" cy="162" r="5" stroke="#F5F5F5" strokeWidth="1.5" />
          </svg>
        )}
      </div>

      {title && (
        <span className="relative z-10 font-heading text-xs font-semibold uppercase tracking-wider text-[#F5F5F5] mt-2">
          {title}
        </span>
      )}
      <span className="relative z-10 font-mono text-[10px] text-[#A1A1AA] uppercase tracking-wider mt-0.5">
        ORTHOGONAL ENGINEERING PROJECTION
      </span>
    </div>
  );
};

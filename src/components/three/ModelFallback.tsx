import React from "react";
import { cn } from "@/lib/utils";

interface ModelFallbackProps {
  type: string;
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
        {/* 01. GUN: Tactical Handgun Slide Blueprint */}
        {(type === "gun" || type === "handheld") && (
          <svg viewBox="0 0 240 120" className="w-full h-full stroke-current fill-none">
            {/* Slide Body Outline */}
            <rect x="25" y="35" width="180" height="48" rx="3" stroke="#A1A1AA" strokeWidth="1.5" />
            {/* Top Plate */}
            <rect x="28" y="27" width="174" height="8" stroke="#A3E635" strokeWidth="1.5" />
            {/* Rear Sight */}
            <rect x="35" y="19" width="16" height="8" stroke="#F5F5F5" strokeWidth="1.5" />
            {/* Front Sight */}
            <rect x="188" y="21" width="8" height="6" stroke="#A3E635" strokeWidth="1.5" />
            {/* Front Muzzle Ring */}
            <circle cx="205" cy="59" r="14" stroke="#A3E635" strokeWidth="1.5" />
            <circle cx="205" cy="59" r="8" stroke="#F5F5F5" strokeWidth="1" />
            {/* 8 Compensator Ports (4x2 grid) */}
            <g stroke="#A3E635" strokeWidth="1.2">
              <ellipse cx="145" cy="48" rx="5" ry="3" />
              <ellipse cx="160" cy="48" rx="5" ry="3" />
              <ellipse cx="175" cy="48" rx="5" ry="3" />
              <ellipse cx="190" cy="48" rx="5" ry="3" />
              <ellipse cx="145" cy="62" rx="5" ry="3" />
              <ellipse cx="160" cy="62" rx="5" ry="3" />
              <ellipse cx="175" cy="62" rx="5" ry="3" />
              <ellipse cx="190" cy="62" rx="5" ry="3" />
            </g>
            {/* Angled Rear Racking Serrations */}
            <g stroke="#F5F5F5" strokeWidth="1.2" strokeLinecap="round">
              <line x1="42" y1="42" x2="48" y2="76" />
              <line x1="49" y1="42" x2="55" y2="76" />
              <line x1="56" y1="42" x2="62" y2="76" />
              <line x1="63" y1="42" x2="69" y2="76" />
              <line x1="70" y1="42" x2="76" y2="76" />
              <line x1="77" y1="42" x2="83" y2="76" />
            </g>
            {/* Centerline */}
            <line x1="15" y1="59" x2="225" y2="59" stroke="#A1A1AA" strokeWidth="0.75" strokeDasharray="6 3 1 3" />
          </svg>
        )}

        {/* 02. DAM: Hydroelectric Sluice & Spillway Blueprint */}
        {(type === "dam" || type === "flow") && (
          <svg viewBox="0 0 240 160" className="w-full h-full stroke-current fill-none">
            {/* Concrete Base Foundation */}
            <rect x="20" y="100" width="200" height="40" stroke="#A1A1AA" strokeWidth="1.5" />
            {/* High Crest Wall */}
            <rect x="20" y="45" width="200" height="25" stroke="#A1A1AA" strokeWidth="1.5" />
            {/* 8 Sluice Gate Piers */}
            <g stroke="#A3E635" strokeWidth="1.5">
              <rect x="25" y="20" width="8" height="35" />
              <rect x="48" y="20" width="8" height="35" />
              <rect x="71" y="20" width="8" height="35" />
              <rect x="94" y="20" width="8" height="35" />
              <rect x="117" y="20" width="8" height="35" />
              <rect x="140" y="20" width="8" height="35" />
              <rect x="163" y="20" width="8" height="35" />
              <rect x="186" y="20" width="8" height="35" />
              <rect x="207" y="20" width="8" height="35" />
            </g>
            {/* Ogee Spillway Slope Chute */}
            <path
              d="M 25 70 C 60 70, 80 95, 215 95"
              stroke="#38BDF8"
              strokeWidth="2"
            />
            {/* Penstock Duct at bottom */}
            <circle cx="65" cy="120" r="14" stroke="#F5F5F5" strokeWidth="1.5" />
            <circle cx="65" cy="120" r="8" stroke="#A3E635" strokeWidth="1" strokeDasharray="3 2" />
          </svg>
        )}

        {/* 03. BLADE: Batman Batarang Aerodynamic Blade Blueprint */}
        {(type === "blade" || type === "chassis") && (
          <svg viewBox="0 0 240 140" className="w-full h-full stroke-current fill-none">
            {/* Batarang Wing Silhouette */}
            <path
              d="M 120 40 
                 L 112 18 L 105 28 
                 C 80 18, 35 15, 12 35 
                 L 14 45 
                 C 45 75, 80 95, 102 105 
                 L 110 88 
                 L 120 120 
                 L 130 88 
                 L 138 105 
                 C 160 95, 195 75, 226 45 
                 L 228 35 
                 C 205 15, 160 18, 135 28 
                 L 128 18 Z"
              stroke="#A3E635"
              strokeWidth="1.75"
            />
            {/* Center Eye Holes */}
            <polygon points="113,38 108,46 116,46" stroke="#F5F5F5" strokeWidth="1.2" />
            <polygon points="127,38 132,46 124,46" stroke="#F5F5F5" strokeWidth="1.2" />
            {/* Center Pivot Axis */}
            <circle cx="120" cy="65" r="5" stroke="#A3E635" strokeWidth="1.2" />
            {/* Aerodynamic Chamfer Guidelines */}
            <path d="M 30 38 C 70 30, 110 32, 120 45" stroke="#A1A1AA" strokeWidth="0.8" strokeDasharray="3 3" />
            <path d="M 210 38 C 170 30, 130 32, 120 45" stroke="#A1A1AA" strokeWidth="0.8" strokeDasharray="3 3" />
          </svg>
        )}

        {/* 04. WATCH: Luxury Mechanical Watch Blueprint */}
        {(type === "watch" || type === "gear" || type === "product") && (
          <svg viewBox="0 0 200 200" className="w-full h-full stroke-current fill-none">
            {/* 4 Lugs */}
            <polygon points="50,45 65,30 75,55 58,68" stroke="#A1A1AA" strokeWidth="1.5" />
            <polygon points="150,45 135,30 125,55 142,68" stroke="#A1A1AA" strokeWidth="1.5" />
            <polygon points="50,155 65,170 75,145 58,132" stroke="#A1A1AA" strokeWidth="1.5" />
            <polygon points="150,155 135,170 125,145 142,132" stroke="#A1A1AA" strokeWidth="1.5" />
            {/* Outer Case Ring */}
            <circle cx="100" cy="100" r="74" stroke="#F5F5F5" strokeWidth="1.75" />
            {/* 60-Flute Bezel Ring */}
            <circle cx="100" cy="100" r="66" stroke="#A3E635" strokeWidth="2.5" strokeDasharray="2 3.5" />
            {/* Inner Dial Ring */}
            <circle cx="100" cy="100" r="54" stroke="#38BDF8" strokeWidth="1.5" />
            {/* 12 Hour Indices */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1={100 + 44 * Math.cos((deg * Math.PI) / 180)}
                y1={100 + 44 * Math.sin((deg * Math.PI) / 180)}
                x2={100 + 52 * Math.cos((deg * Math.PI) / 180)}
                y2={100 + 52 * Math.sin((deg * Math.PI) / 180)}
                stroke="#A3E635"
                strokeWidth="2"
              />
            ))}
            {/* Watch Hands pointing to 10:10 */}
            <line x1="100" y1="100" x2="78" y2="76" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="100" y1="100" x2="128" y2="72" stroke="#A3E635" strokeWidth="2" strokeLinecap="round" />
            <circle cx="100" cy="100" r="4" stroke="#F5F5F5" fill="#A3E635" strokeWidth="1.5" />
            {/* Crown at 3 o'clock */}
            <rect x="175" y="93" width="12" height="14" rx="2" stroke="#A3E635" strokeWidth="1.5" />
          </svg>
        )}
      </div>

      {/* Blueprint Subtitle */}
      <div className="relative z-10 mt-3 font-mono text-[10px] text-[#A1A1AA] tracking-wider uppercase text-center">
        {title ? title : `// CAD BLUEPRINT: ${type.toUpperCase()}`}
      </div>
    </div>
  );
};

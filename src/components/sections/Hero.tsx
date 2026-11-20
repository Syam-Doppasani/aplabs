import React from "react";
import { siteConfig } from "@/config/site";
import { HeroScene } from "@/components/three/HeroScene";
import { Button } from "@/components/ui/Button";
import { EnquiryAction } from "@/components/ui/EnquiryAction";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ArrowDown, ArrowUpRight, Cpu, Compass, Layers, ShieldCheck } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 flex flex-col justify-between bg-[#050505] overflow-hidden"
    >
      {/* Background CAD grid and subtle green radial glow */}
      <div className="absolute inset-0 bg-cad-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A3E635]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2.5">
              <TechnicalLabel variant="lime" size="md">
                PRECISION ENGINEERING STUDIO
              </TechnicalLabel>
              <span className="font-mono text-xs text-[#A1A1AA] uppercase">
                // ISO / GD&amp;T COMPLIANT
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight uppercase text-[#F5F5F5] leading-[1.04]">
              ENGINEERING IDEAS. <br />
              <span className="text-[#A3E635] text-glow-accent">
                DESIGNED WITH PRECISION.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-xl font-sans font-light">
              From mechanical components and 3D printer designs to complex assemblies, AP Labs
              brings engineering concepts into precise digital designs.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a href="#projects">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowDown className="w-4 h-4" />}
                >
                  Explore Our Work
                </Button>
              </a>

              <EnquiryAction
                variant="secondary"
                size="lg"
                label="Discuss a Project"
              />
            </div>

            {/* Engineering Capability Badges */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 font-mono text-[10px] text-[#A1A1AA]">
              <div className="flex flex-col">
                <span className="text-white/40 uppercase">TOLERANCING</span>
                <span className="text-[#F5F5F5] font-semibold">ASME Y14.5 GD&amp;T</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/40 uppercase">3D CAD FORMATS</span>
                <span className="text-[#F5F5F5] font-semibold">STEP / IGES / STL</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/40 uppercase">CLIENT REACH</span>
                <span className="text-[#F5F5F5] font-semibold">OEM &amp; Inventors</span>
              </div>
            </div>
          </div>

          {/* Right 3D Interactive Model Visual (6 cols) */}
          <div className="lg:col-span-6 relative">
            {/* 3D Scene Viewport */}
            <div className="relative border border-white/10 bg-[#0B0D0B]/60 backdrop-blur-sm crosshair-corner">
              <HeroScene />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Technical Ticker */}
      <div className="relative z-10 border-t border-white/5 bg-[#0B0D0B]/40 py-3 mt-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#A1A1AA]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />
            <span className="text-white font-medium uppercase">CONFIRMED CAPABILITIES:</span>
            <span>7 SPECIALIZED MECHANICAL SERVICES</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[10px] uppercase text-[#A1A1AA]/80">
            <span>PART DESIGN</span>
            <span>•</span>
            <span>3D CAD MODELLING</span>
            <span>•</span>
            <span>3D PRINTER DESIGNS</span>
            <span>•</span>
            <span>SHEET METAL</span>
            <span>•</span>
            <span>ASSEMBLY BOM</span>
            <span>•</span>
            <span>DESIGN OPTIMIZATION</span>
          </div>
        </div>
      </div>
    </section>
  );
};

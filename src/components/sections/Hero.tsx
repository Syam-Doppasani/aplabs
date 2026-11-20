import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { HeroScene } from "@/components/three/HeroScene";
import { Button } from "@/components/ui/Button";
import { EnquiryAction } from "@/components/ui/EnquiryAction";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ArrowDown, ArrowUpRight, Cpu, Compass, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-12 flex flex-col justify-between bg-[#050505] overflow-hidden"
    >
      {/* Background CAD grid and subtle green radial glow */}
      <div className="absolute inset-0 bg-cad-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#A3E635]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 lg:pt-10">
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

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight uppercase text-[#F5F5F5] leading-[1.03]">
              ENGINEERING IDEAS. <br />
              <span className="text-[#A3E635] text-glow-accent">
                DESIGNED WITH PRECISION.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-xl font-sans font-light">
              From mechanical components and 3D printer designs to complex assemblies, AP Labs
              translates product concepts into production-ready digital CAD models.
            </p>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link href="/projects">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowDown className="w-4 h-4" />}
                >
                  Explore Verified Projects
                </Button>
              </Link>

              <EnquiryAction
                variant="secondary"
                size="lg"
                label="Discuss Your Project"
              />
            </div>

            {/* Engineering Capability Badges */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 font-mono text-[10px] text-[#A1A1AA]">
              <div className="flex flex-col">
                <span className="text-white/40 uppercase">TOLERANCING</span>
                <span className="text-[#F5F5F5] font-semibold text-xs mt-0.5">ASME Y14.5 GD&amp;T</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/40 uppercase">3D CAD SUITE</span>
                <span className="text-[#F5F5F5] font-semibold text-xs mt-0.5">Creo &amp; SolidWorks</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/40 uppercase">DELIVERABLES</span>
                <span className="text-[#F5F5F5] font-semibold text-xs mt-0.5">STEP / STL / Native</span>
              </div>
            </div>
          </div>

          {/* Right 3D Interactive Model Visual (6 cols) */}
          <div className="lg:col-span-6 relative">
            {/* 3D Scene Viewport with Real CAD Image Toggle */}
            <div className="relative border border-white/10 bg-[#0B0D0B]/60 backdrop-blur-sm crosshair-corner shadow-[0_20px_70px_rgba(0,0,0,0.85)]">
              <HeroScene />
            </div>
          </div>
        </div>
      </div>

      {/* Verified Real CAD Workproof Strip */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 pt-6 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#A3E635] font-bold">
              // VERIFIED STUDIO CAD ASSETS
            </span>
            <span className="font-mono text-[10px] text-[#A1A1AA]/60 uppercase hidden md:inline">
              (Direct from AP Labs design repository)
            </span>
          </div>

          <Link
            href="/projects"
            className="text-xs font-mono text-[#A1A1AA] hover:text-[#A3E635] transition-colors flex items-center gap-1"
          >
            <span>View All Engineering Files</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Horizontal Mini-Card Showcase of Real CAD Assets */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            {
              name: "Gun Slide",
              tag: "5-Axis CNC",
              src: "/media/gun-slide.png",
              href: "/projects#tactical-firearm-assembly",
            },
            {
              name: "Luxury Watch",
              tag: "Creo 12",
              src: "/media/watch-detail.png",
              href: "/projects#luxury-mechanical-watch",
            },
            {
              name: "Batman Blade",
              tag: "SolidWorks",
              src: "/media/batman-blade-cad.jpg",
              href: "/projects#batman-tactical-blade",
            },
            {
              name: "Spillway Dam",
              tag: "Hydraulics",
              src: "/media/dam-structure.png",
              href: "/projects#hydraulic-dam-structure",
            },
            {
              name: "Plummer Block",
              tag: "Cast Iron",
              src: "/media/plummer-block.png",
              href: "/projects#plummer-block-bearing",
            },
            {
              name: "Engine Piston",
              tag: "Motorsport",
              src: "/media/engine-piston.png",
              href: "/projects#high-performance-piston",
            },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group relative bg-[#0B0D0B] border border-white/10 hover:border-[#A3E635]/60 p-2.5 flex flex-col justify-between transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-20 w-full bg-[#050505] flex items-center justify-center p-1 overflow-hidden border border-white/5">
                <img
                  src={item.src}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="pt-2 flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#F5F5F5] font-semibold truncate group-hover:text-[#A3E635] transition-colors">
                  {item.name}
                </span>
                <span className="text-white/40 text-[9px] uppercase">{item.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Technical Ticker */}
      <div className="relative z-10 border-t border-white/5 bg-[#0B0D0B]/40 py-3 mt-8 overflow-hidden">
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

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { EnquiryAction } from "@/components/ui/EnquiryAction";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ArrowRight, Box, Compass, Cpu, Layers, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col justify-between selection:bg-[#A3E635] selection:text-[#050505]">
      {/* Header Navigation with direct page links */}
      <Navbar />

      <main className="flex-grow">
        {/* 01. Cinematic 3D Hero */}
        <Hero />

        {/* 02. Spacious Quick-Access Highlights (Good Spacing & Breathing Room) */}
        <section className="relative py-28 sm:py-36 bg-[#050505] border-t border-white/5 overflow-hidden">
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {/* Header intro */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
              <div className="max-w-2xl space-y-3">
                <TechnicalLabel variant="lime" size="sm">
                  STUDIO ARCHITECTURE
                </TechnicalLabel>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-[#F5F5F5] leading-tight">
                  PRECISION DISCIPLINES &amp; 3D INSPECTION.
                </h2>
                <p className="text-sm sm:text-base text-[#A1A1AA] font-sans font-light leading-relaxed">
                  Specialized mechanical engineering design shaped around geometric discipline, tooling compatibility, and production reliability.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Link href="/services">
                  <Button variant="outline" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                    View All 8 Services
                  </Button>
                </Link>
              </div>
            </div>

            {/* 3 Core Highlight Portals with Generous Spacing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Portal 1: Services */}
              <Link
                href="/services"
                className="group relative bg-[#0B0D0B] border border-white/10 hover:border-[#A3E635]/60 p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_35px_rgba(163,230,53,0.08)] crosshair-corner"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-none bg-[#111411] border border-white/15 group-hover:border-[#A3E635] flex items-center justify-center text-[#A3E635] transition-colors">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] text-[#A3E635] uppercase font-bold tracking-widest block">
                    // 01. CAPABILITIES
                  </span>
                  <h3 className="font-heading text-xl font-bold uppercase text-white group-hover:text-[#A3E635] transition-colors">
                    8 Confirmed Services
                  </h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed font-sans font-light">
                    From precision mechanical part design and injection mould tooling to sheet metal and structural topology optimization.
                  </p>
                </div>
                <div className="pt-6 mt-8 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#A1A1AA] group-hover:text-white">
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-4 h-4 text-[#A3E635] transition-transform group-hover:translate-x-1" />
                </div>
              </Link>

              {/* Portal 2: Projects & 3D CAD */}
              <Link
                href="/projects"
                className="group relative bg-[#0B0D0B] border border-white/10 hover:border-[#A3E635]/60 p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_35px_rgba(163,230,53,0.08)] crosshair-corner"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-none bg-[#111411] border border-white/15 group-hover:border-[#A3E635] flex items-center justify-center text-[#A3E635] transition-colors">
                    <Box className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] text-[#A3E635] uppercase font-bold tracking-widest block">
                    // 02. PORTFOLIO
                  </span>
                  <h3 className="font-heading text-xl font-bold uppercase text-white group-hover:text-[#A3E635] transition-colors">
                    Interactive 3D Projects
                  </h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed font-sans font-light">
                    Examine planetary gearboxes, multi-cavity mould assemblies, and chassis models in real-time WebGL with cross-section cutaways.
                  </p>
                </div>
                <div className="pt-6 mt-8 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#A1A1AA] group-hover:text-white">
                  <span>Inspect Models</span>
                  <ArrowRight className="w-4 h-4 text-[#A3E635] transition-transform group-hover:translate-x-1" />
                </div>
              </Link>

              {/* Portal 3: Technical Showcase */}
              <Link
                href="/showcase"
                className="group relative bg-[#0B0D0B] border border-white/10 hover:border-[#A3E635]/60 p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_35px_rgba(163,230,53,0.08)] crosshair-corner"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-none bg-[#111411] border border-white/15 group-hover:border-[#A3E635] flex items-center justify-center text-[#A3E635] transition-colors">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] text-[#A3E635] uppercase font-bold tracking-widest block">
                    // 03. EXHIBITION
                  </span>
                  <h3 className="font-heading text-xl font-bold uppercase text-white group-hover:text-[#A3E635] transition-colors">
                    Technical Showcase
                  </h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed font-sans font-light">
                    Virtual laboratory simulating CAD wireframe transitions, exploded sequences, mould flow rheology, and FEA stress optimization.
                  </p>
                </div>
                <div className="pt-6 mt-8 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#A1A1AA] group-hover:text-white">
                  <span>Enter CAD Lab</span>
                  <ArrowRight className="w-4 h-4 text-[#A3E635] transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>

            {/* Bottom Direct Enquiry Banner with Generous Spacing */}
            <div className="p-8 sm:p-12 bg-[#0B0D0B] border border-[#A3E635]/30 flex flex-col lg:flex-row items-center justify-between gap-8 crosshair-corner shadow-[0_0_50px_rgba(163,230,53,0.05)]">
              <div className="max-w-xl space-y-2 text-center lg:text-left">
                <span className="font-mono text-xs text-[#A3E635] uppercase font-bold tracking-wider">
                  // Have an Engineering Project in Mind?
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-white leading-snug">
                  Tell us about your product or component requirements.
                </h3>
                <p className="text-xs text-[#A1A1AA] font-sans font-light">
                  Submit functional criteria, reference drawings, or CAD briefs directly via our Google Form portal.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                <EnquiryAction
                  variant="primary"
                  size="lg"
                  className="px-8 py-3.5"
                  label="Start a Project Enquiry"
                />
                <Link href="/about">
                  <Button variant="secondary" size="lg" className="px-6 py-3.5">
                    About Studio
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

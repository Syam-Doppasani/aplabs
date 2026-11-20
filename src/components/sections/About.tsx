import React from "react";
import { siteConfig, isConfigPlaceholder } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { EnquiryAction } from "@/components/ui/EnquiryAction";
import { CheckCircle2, ShieldCheck, Target, Layers } from "lucide-react";

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-20 bg-[#050505] overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="05 // STUDIO ETHOS"
          tagline="ABOUT AP LABS"
          title="ENGINEERING THINKING. DESIGN-LED EXECUTION."
          description="Independent mechanical engineering studio translating physical product concepts into production-ready digital designs."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Statement (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 bg-[#0B0D0B] border border-white/10 space-y-4 crosshair-corner">
              <span className="font-mono text-xs text-[#A3E635] uppercase tracking-wider block font-bold">
                // Studio Philosophy
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase text-[#F5F5F5] leading-snug">
                Every component has a purpose. <br />
                <span className="text-[#A3E635]">Every tolerance matters.</span>
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed font-sans font-light">
                AP Labs specializes in precision mechanical part design, 3D printer
                designs, 3D CAD modelling, and structural optimization. We
                bridge industrial design aesthetics with rigorous GD&amp;T
                engineering discipline.
              </p>

              {/* Target Client Badges */}
              <div className="pt-2">
                <span className="font-mono text-[10px] text-white/40 uppercase block mb-2">
                  Serving:
                </span>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.targetAudience.map((audience, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-white/[0.03] border border-white/10 font-mono text-[10px] text-[#F5F5F5]"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3 Pillars & Verification (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-[#0B0D0B] border border-white/10 space-y-3 font-mono text-xs">
              <span className="text-[#A3E635] uppercase font-bold tracking-wider block">
                // Core Principles
              </span>
              <div className="space-y-2.5">
                <div className="p-3 bg-[#111411] border-l-2 border-[#A3E635]">
                  <span className="text-white font-bold block">01. Geometric Precision</span>
                  <span className="text-[#A1A1AA] text-[11px] block mt-0.5">
                    Strict adherence to ASME Y14.5 and ISO 1101 standards.
                  </span>
                </div>
                <div className="p-3 bg-[#111411] border-l-2 border-[#A3E635]">
                  <span className="text-white font-bold block">02. Manufacturing-Ready CAD</span>
                  <span className="text-[#A1A1AA] text-[11px] block mt-0.5">
                    Engineering for CNC machining, 3D printing, and sheet-metal forming.
                  </span>
                </div>
                <div className="p-3 bg-[#111411] border-l-2 border-[#A3E635]">
                  <span className="text-white font-bold block">03. Parametric Integrity</span>
                  <span className="text-[#A1A1AA] text-[11px] block mt-0.5">
                    Fully constrained solids ready for CAM toolpaths &amp; CMM.
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <EnquiryAction
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  label="Discuss an Engineering Project"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { siteConfig, isConfigPlaceholder } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { EnquiryAction } from "@/components/ui/EnquiryAction";
import { CheckCircle2, Cpu, FileCheck, Layers, Target, Users } from "lucide-react";

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="05 // STUDIO ETHOS"
          tagline="ABOUT AP LABS"
          title="ENGINEERING THINKING. DESIGN-LED EXECUTION."
          description="AP Labs is an independent mechanical engineering design and product development studio. We transform functional concepts into precise, manufacturable digital designs."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 bg-[#0B0D0B] border border-white/10 space-y-4">
              <span className="font-mono text-xs text-[#A3E635] uppercase tracking-wider block font-semibold">
                // What We Do
              </span>
              <p className="text-base text-[#F5F5F5] leading-relaxed font-sans font-light">
                AP Labs specializes in the intersection of rigorous mechanical
                analysis and refined physical product design. We focus on
                mechanical component design, injection mould architectures, 3D
                CAD modelling, sheet metal engineering, assembly kinematics,
                mould flow analysis, and structural optimization.
              </p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed font-sans font-light">
                Every mechanical component possesses a definitive purpose. Our
                engineering philosophy treats dimensional tolerances, draft
                angles, parting surfaces, and fastener stack-ups as fundamental
                design elements rather than afterthoughts.
              </p>
            </div>

            {/* Target Clients / Who We Work With */}
            <div className="p-6 sm:p-8 bg-[#0B0D0B] border border-white/10 space-y-4">
              <span className="font-mono text-xs text-[#A3E635] uppercase tracking-wider block font-semibold">
                // Who We Work With
              </span>
              <p className="text-sm text-[#A1A1AA] leading-relaxed font-sans font-light">
                We partner with organizations across every phase of physical
                product development:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {siteConfig.targetAudience.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white/[0.02] border border-white/5 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#A3E635] shrink-0 mt-0.5" />
                    <span className="font-mono text-xs text-[#F5F5F5] leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Studio Configurable Parameters & Core Pillars (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Engineering Pillars */}
            <div className="p-6 bg-[#0B0D0B] border border-white/10 space-y-4">
              <span className="font-mono text-xs text-[#A3E635] uppercase tracking-wider block font-semibold">
                // Engineering Pillars
              </span>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 bg-[#111411] border-l-2 border-[#A3E635]">
                  <span className="text-[#F5F5F5] font-bold block uppercase mb-1">
                    01. Geometric Discipline
                  </span>
                  <span className="text-[#A1A1AA] leading-relaxed block">
                    Zero-compromise approach to GD&amp;T, draft angles, and
                    clearance allowances according to international manufacturing
                    standards.
                  </span>
                </div>

                <div className="p-3.5 bg-[#111411] border-l-2 border-[#A3E635]">
                  <span className="text-[#F5F5F5] font-bold block uppercase mb-1">
                    02. Tooling-First Thinking
                  </span>
                  <span className="text-[#A1A1AA] leading-relaxed block">
                    Whether designing for injection moulding, CNC milling, or
                    press-brake forming, all CAD assets anticipate physical
                    tooling constraints.
                  </span>
                </div>

                <div className="p-3.5 bg-[#111411] border-l-2 border-[#A3E635]">
                  <span className="text-[#F5F5F5] font-bold block uppercase mb-1">
                    03. Parametric Integrity
                  </span>
                  <span className="text-[#A1A1AA] leading-relaxed block">
                    Robust, fully-constrained parametric solid models engineered
                    to facilitate rapid downstream revision without model failure.
                  </span>
                </div>
              </div>
            </div>

            {/* Configurable Business Information Card */}
            <div className="p-6 bg-[#111411] border border-white/10 space-y-3 font-mono text-xs text-[#A1A1AA]">
              <span className="text-[#A3E635] uppercase tracking-wider block font-semibold">
                // Studio Verification Log
              </span>

              <div className="divide-y divide-white/5 text-[11px]">
                <div className="py-2 flex justify-between">
                  <span className="text-white/40">STUDIO NAME:</span>
                  <span className="text-[#F5F5F5] font-semibold">{siteConfig.name}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-white/40">LOCATION:</span>
                  <span className="text-[#F5F5F5]">{siteConfig.location}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-white/40">DIRECT ENQUIRY:</span>
                  <span className="text-[#A3E635]">EXTERNAL GOOGLE FORM</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-white/40">CAD ENVIRONMENT:</span>
                  <span>
                    {!isConfigPlaceholder(siteConfig.cadSoftware[0])
                      ? siteConfig.cadSoftware.join(", ")
                      : siteConfig.cadSoftware[0]}
                  </span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-white/40">FOUNDER / LEAD:</span>
                  <span>{siteConfig.founderInfo}</span>
                </div>
              </div>

              <div className="pt-2">
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

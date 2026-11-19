import React from "react";
import { siteConfig } from "@/config/site";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { EnquiryAction } from "@/components/ui/EnquiryAction";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export const Enquiry: React.FC = () => {
  return (
    <section id="contact" className="relative py-20 bg-[#050505] overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />

      {/* Subtle Green Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#A3E635]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#0B0D0B] border border-[#A3E635]/40 p-8 sm:p-12 text-center shadow-[0_0_50px_rgba(163,230,53,0.06)] crosshair-corner">
          <div className="inline-flex items-center gap-2 mb-3">
            <TechnicalLabel variant="lime" size="sm">
              PROJECT INTAKE
            </TechnicalLabel>
            <span className="font-mono text-xs text-[#A1A1AA] uppercase">
              // GOOGLE FORM PORTAL
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-[#F5F5F5] leading-tight mb-3">
            HAVE AN ENGINEERING PROJECT?
          </h2>

          <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-xl mx-auto mb-8 font-sans font-light">
            Share your product, component, or mould design specifications directly with AP Labs.
          </p>

          {/* Prominent CTA */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <EnquiryAction
              variant="primary"
              size="lg"
              className="px-10 py-4 text-base"
              label="START A PROJECT ENQUIRY"
            />
            <span className="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A3E635]" />
              Secure external submission via Google Forms
            </span>
          </div>

          {/* Minimal 4-point Checklist */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px] text-[#A1A1AA]">
            <div className="flex items-center justify-center gap-1.5 p-2 bg-white/[0.02] border border-white/5">
              <CheckCircle2 className="w-3 h-3 text-[#A3E635]" />
              <span>Project Scope</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 bg-white/[0.02] border border-white/5">
              <CheckCircle2 className="w-3 h-3 text-[#A3E635]" />
              <span>Dimensions</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 bg-white/[0.02] border border-white/5">
              <CheckCircle2 className="w-3 h-3 text-[#A3E635]" />
              <span>Target Material</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 bg-white/[0.02] border border-white/5">
              <CheckCircle2 className="w-3 h-3 text-[#A3E635]" />
              <span>Sketches/CAD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { siteConfig, isConfigPlaceholder } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { EnquiryAction } from "@/components/ui/EnquiryAction";
import {
  FileText,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Send,
  HelpCircle,
} from "lucide-react";

export const Enquiry: React.FC = () => {
  return (
    <section id="contact" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-30 pointer-events-none" />

      {/* Subtle Electric Green Radial Aura */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#A3E635]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#0B0D0B] border border-[#A3E635]/30 p-8 sm:p-12 lg:p-16 shadow-[0_0_60px_rgba(163,230,53,0.06)] crosshair-corner">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <TechnicalLabel variant="lime" size="md">
                DIRECT INTAKE PORTAL
              </TechnicalLabel>
              <span className="font-mono text-xs text-[#A1A1AA] uppercase">
                // EXTERNAL GOOGLE FORM
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-[#F5F5F5] leading-tight mb-4">
              HAVE AN ENGINEERING PROJECT IN MIND?
            </h2>

            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed font-sans font-light">
              Tell us about your product, component, or mould design
              requirements. Share your project details with AP Labs.
            </p>
          </div>

          {/* Central Call to Action */}
          <div className="flex flex-col items-center justify-center gap-4 mb-12">
            <EnquiryAction
              variant="primary"
              size="lg"
              className="px-10 py-4 text-base"
              label="START A PROJECT ENQUIRY"
            />
            <span className="font-mono text-[11px] text-[#A1A1AA] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A3E635]" />
              Secured external submission via Google Forms
            </span>
          </div>

          {/* Recommended Enquiry Information Blueprint Grid */}
          <div className="border-t border-white/10 pt-10">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-[#A3E635] uppercase tracking-wider font-semibold">
                // Recommended Information to Prepare for Your Enquiry
              </span>
              <span className="font-mono text-[10px] text-[#A1A1AA] uppercase">
                FORM CHECKLIST
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs text-[#A1A1AA]">
              <div className="p-3 bg-[#111411] border border-white/5 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E635] shrink-0 mt-0.5" />
                <span>Contact Name &amp; Company or Individual Developer</span>
              </div>

              <div className="p-3 bg-[#111411] border border-white/5 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E635] shrink-0 mt-0.5" />
                <span>Primary Service Required (Part, Mould, Sheet Metal, etc.)</span>
              </div>

              <div className="p-3 bg-[#111411] border border-white/5 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E635] shrink-0 mt-0.5" />
                <span>Design Description &amp; Dimensional Constraints</span>
              </div>

              <div className="p-3 bg-[#111411] border border-white/5 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E635] shrink-0 mt-0.5" />
                <span>Target Materials &amp; Structural Operating Loads</span>
              </div>

              <div className="p-3 bg-[#111411] border border-white/5 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E635] shrink-0 mt-0.5" />
                <span>Reference Drawings, Sketches, or CAD Attachments</span>
              </div>

              <div className="p-3 bg-[#111411] border border-white/5 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E635] shrink-0 mt-0.5" />
                <span>Target Project Timelines (Optional)</span>
              </div>
            </div>

            {/* Note on Google Form configuration */}
            <div className="mt-6 p-3 bg-white/[0.02] border border-white/5 flex items-center justify-between font-mono text-[11px] text-[#A1A1AA]">
              <span>Form Link Configuration Status:</span>
              <span className="text-[#A3E635]">
                {siteConfig.googleFormUrl}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

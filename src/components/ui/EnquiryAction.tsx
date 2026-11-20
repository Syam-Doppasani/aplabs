"use client";

import React, { useState } from "react";
import { siteConfig, isConfigPlaceholder } from "@/config/site";
import { Button } from "./Button";
import { ArrowUpRight, ExternalLink, X, FileText, CheckCircle2 } from "lucide-react";
import { TechnicalLabel } from "./TechnicalLabel";

interface EnquiryActionProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
  serviceContext?: string;
}

export const EnquiryAction: React.FC<EnquiryActionProps> = ({
  variant = "primary",
  size = "md",
  className,
  label = "Discuss Your Project",
  serviceContext,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isUrlConfigured = !isConfigPlaceholder(siteConfig.googleFormUrl);

  const handleClick = (e: React.MouseEvent) => {
    if (isUrlConfigured) {
      window.open(siteConfig.googleFormUrl, "_blank", "noopener,noreferrer");
    } else {
      e.preventDefault();
      setModalOpen(true);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={handleClick}
        icon={<ArrowUpRight className="w-4 h-4" />}
      >
        {label}
      </Button>

      {/* Fallback configuration modal when GOOGLE_FORM_URL is unconfigured */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-[#0B0D0B] border border-[#A3E635]/30 rounded-none p-6 sm:p-8 shadow-[0_0_50px_rgba(163,230,53,0.15)] crosshair-corner">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#A1A1AA] hover:text-white transition-colors p-1"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <TechnicalLabel variant="lime" size="sm">
                Project Enquiry
              </TechnicalLabel>
              <span className="text-xs font-mono text-[#A1A1AA]">
                // GOOGLE FORM LINK
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase text-[#F5F5F5] mb-2">
              Ready to Discuss Your Project?
            </h3>

            {serviceContext && (
              <p className="text-xs font-mono text-[#A3E635] mb-4">
                Service Focus: {serviceContext}
              </p>
            )}

            <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6 font-sans">
              AP Labs collects all project enquiries through our dedicated external Google Form. Currently, the form URL is set to the configuration placeholder:
            </p>

            <div className="p-3 bg-[#111411] border border-white/10 font-mono text-xs text-[#A3E635] mb-6 flex items-center justify-between">
              <span>config.googleFormUrl: &quot;{siteConfig.googleFormUrl}&quot;</span>
              <FileText className="w-4 h-4 text-[#A1A1AA]" />
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-xs font-mono uppercase tracking-wider text-[#F5F5F5]">
                Recommended Enquiry Details:
              </p>
              <ul className="text-xs text-[#A1A1AA] space-y-1.5 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>Your Name &amp; Company or Individual Developer</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>Required Service (Part Design, 3D Printing, CAD, Sheet Metal, etc.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>Target Materials, Operating Loads, or Space Constraints</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>Reference Sketches or 3D/2D CAD Files (STEP, IGES, DXF)</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {!isConfigPlaceholder(siteConfig.email) ? (
                <a
                  href={`mailto:${siteConfig.email}?subject=AP Labs Engineering Project Enquiry`}
                  className="flex-1"
                >
                  <Button variant="primary" className="w-full" size="md">
                    Email Directly ({siteConfig.email})
                  </Button>
                </a>
              ) : (
                <div className="flex-1 text-center py-2 px-3 border border-dashed border-white/20 text-xs font-mono text-[#A1A1AA]">
                  Email Placeholder: {siteConfig.email}
                </div>
              )}
              <Button
                variant="secondary"
                size="md"
                onClick={() => setModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

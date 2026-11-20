"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    id: "services-scope",
    question: "What mechanical design services does AP Labs offer?",
    answer:
      "AP Labs provides seven confirmed services: Mechanical Part Design, 3D CAD Modelling, 3D Printer Designs, Sheet Metal Design, Product Design, Assembly Design, and Design Optimization.",
  },
  {
    id: "additive-3d-printing",
    question: "Does AP Labs design for 3D printing and additive manufacturing?",
    answer:
      "Yes. We engineer components with optimized build orientation, minimal support overhangs, controlled wall thicknesses, snap-fit tolerances, and lattice structures for functional 3D printing.",
  },
  {
    id: "cad-formats",
    question: "Can AP Labs provide native and neutral CAD files?",
    answer:
      "Yes. Deliverables include production-ready STEP AP242, IGES, Parasolid, DXF flat patterns, and 2D GD&T manufacturing drawings.",
  },
  {
    id: "target-clients",
    question: "Does AP Labs work with individual inventors and startups?",
    answer:
      "Yes. We collaborate with industrial manufacturers, hardware startups, entrepreneurs, and independent product developers.",
  },
  {
    id: "enquiry-details",
    question: "How do I submit an engineering project enquiry?",
    answer:
      "Submit your project scope, dimensional constraints, and reference files directly through the AP Labs Google Form portal.",
  },
];

export const FAQ: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>([faqList[0].id]);

  const toggleItem = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <section id="faq" className="relative py-20 bg-[#050505] overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="07 // FAQ"
          tagline="ESSENTIAL INFORMATION"
          title="FREQUENTLY ASKED QUESTIONS."
          description="Direct answers regarding our mechanical design scope, CAD deliverables, and client collaboration."
        />

        <div className="space-y-3">
          {faqList.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={cn(
                  "bg-[#0B0D0B] border transition-all duration-200 overflow-hidden",
                  isOpen
                    ? "border-[#A3E635]/50 bg-[#0e110e]"
                    : "border-white/10 hover:border-white/20"
                )}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#A3E635] shrink-0">
                      0{index + 1}
                    </span>
                    <h3 className="font-heading text-sm sm:text-base font-bold uppercase text-[#F5F5F5]">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="w-6 h-6 rounded-none border border-white/10 flex items-center justify-center text-[#A1A1AA] shrink-0">
                    {isOpen ? (
                      <Minus className="w-3 h-3 text-[#A3E635]" />
                    ) : (
                      <Plus className="w-3 h-3" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 pt-0 border-t border-white/5 animate-in fade-in duration-150">
                    <p className="text-xs text-[#A1A1AA] leading-relaxed font-sans font-light pl-6">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

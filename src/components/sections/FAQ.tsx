"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  technicalCategory: string;
}

const faqList: FAQItem[] = [
  {
    id: "services-scope",
    question: "What mechanical design services does AP Labs offer?",
    answer:
      "AP Labs offers eight confirmed mechanical engineering design services: Mechanical Part Design, Injection Mould Design, 3D CAD Modelling, Sheet Metal Design, Product Design, Assembly Design, Mould Flow Analysis, and Design Optimization.",
    technicalCategory: "Service Scope",
  },
  {
    id: "injection-mould",
    question: "Does AP Labs provide injection mould design?",
    answer:
      "Yes. AP Labs provides complete injection mould tooling design including core and cavity splitting, parting line resolution, runner and gating systems, conformal cooling channel circuits, and guided ejection mechanism design.",
    technicalCategory: "Tooling Design",
  },
  {
    id: "cad-formats",
    question: "Can AP Labs create 3D CAD models for manufacturing?",
    answer:
      "Yes. AP Labs engineers fully constrained parametric solid and surface models suitable for downstream CNC machining, injection moulding, sheet metal fabrication, 3D printing prototyping, and CMM inspection. Neutral CAD formats such as STEP AP242, IGES, Parasolid, and DXF are standard deliverables.",
    technicalCategory: "CAD Modelling",
  },
  {
    id: "target-clients",
    question: "Does AP Labs work with individual product developers and entrepreneurs?",
    answer:
      "Yes. AP Labs partners with manufacturing companies, industrial engineering firms, product development startups, entrepreneurs, and individual product inventors requiring specialized mechanical engineering design support.",
    technicalCategory: "Client Engagements",
  },
  {
    id: "assembly-design",
    question: "Can businesses enquire about complex assembly design?",
    answer:
      "Yes. AP Labs provides full assembly design services encompassing multi-body kinematic constraints, tolerance stack-up analysis, clash/interference checking, fastener selection, and structured Bill of Materials (BOM) creation.",
    technicalCategory: "Assembly Kinematics",
  },
  {
    id: "enquiry-details",
    question: "What information should I provide for a design enquiry?",
    answer:
      "To enable an accurate evaluation of your design requirements, please provide: your product or component concept, functional design goals, known operating loads or environmental conditions, material preferences, dimensional boundary constraints, and any available reference sketches or existing 2D/3D CAD files.",
    technicalCategory: "Project Onboarding",
  },
  {
    id: "contact-mechanism",
    question: "How can I discuss a mechanical engineering project with AP Labs?",
    answer:
      "All project discussions and design requirements are submitted directly through the AP Labs Google Form enquiry portal linked on this website.",
    technicalCategory: "Communication",
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
    <section id="faq" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="07 // KNOWLEDGE BASE"
          tagline="ENGINEERING FAQ"
          title="FREQUENTLY ASKED QUESTIONS."
          description="Clear, direct answers regarding AP Labs mechanical design capabilities, tooling engineering, CAD deliverables, and client collaboration."
        />

        <div className="space-y-4">
          {faqList.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={cn(
                  "bg-[#0B0D0B] border transition-all duration-200 overflow-hidden",
                  isOpen
                    ? "border-[#A3E635]/40 bg-[#0e110e]"
                    : "border-white/10 hover:border-white/25"
                )}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-[#A3E635] mt-1 shrink-0">
                      0{index + 1}
                    </span>
                    <div>
                      <span className="font-mono text-[9px] text-[#A1A1AA] uppercase tracking-wider block mb-1">
                        // {faq.technicalCategory}
                      </span>
                      <h3 className="font-heading text-base sm:text-lg font-bold uppercase text-[#F5F5F5] leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-none border border-white/10 flex items-center justify-center text-[#A1A1AA] shrink-0 mt-0.5">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 text-[#A3E635]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 border-t border-white/5 animate-in fade-in duration-200">
                    <p className="text-sm text-[#A1A1AA] leading-relaxed font-sans font-light pl-8">
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

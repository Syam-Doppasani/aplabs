"use client";

import React, { useState } from "react";
import { confirmedServices, ServiceItem } from "@/config/services";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { EnquiryAction } from "@/components/ui/EnquiryAction";
import { ModelFallback } from "@/components/three/ModelFallback";
import { ArrowUpRight, Check, Compass, Cpu, Layers, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const ServicePresentation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(confirmedServices[0].id);

  return (
    <div className="space-y-16">
      {/* Editorial Navigation Tabs for Desktop */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-white/10">
        {confirmedServices.map((service) => (
          <button
            key={service.id}
            onClick={() => {
              setActiveTab(service.id);
              const el = document.getElementById(`service-${service.id}`);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={cn(
              "px-4 py-2 font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all border",
              activeTab === service.id
                ? "bg-[#A3E635] text-[#050505] border-[#A3E635] font-semibold"
                : "bg-white/[0.02] text-[#A1A1AA] border-white/10 hover:border-white/30 hover:text-white"
            )}
          >
            <span>{service.number} // </span>
            <span>{service.title}</span>
          </button>
        ))}
      </div>

      {/* Asymmetric Service List */}
      <div className="space-y-12">
        {confirmedServices.map((service, index) => {
          const isEven = index % 2 === 0;
          const isLargeFeature = index === 0 || index === 1;

          return (
            <div
              key={service.id}
              id={`service-${service.id}`}
              className={cn(
                "relative bg-[#0B0D0B] border border-white/10 p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-[#A3E635]/40",
                isLargeFeature && "border-[#A3E635]/25 bg-[#0e110e]"
              )}
            >
              {/* CAD Grid Backdrop */}
              <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Content Section (7 or 6 cols depending on composition) */}
                <div
                  className={cn(
                    "flex flex-col justify-between space-y-6",
                    isEven ? "lg:col-span-7" : "lg:col-span-7 lg:order-2"
                  )}
                >
                  <div>
                    {/* Index & Badge */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-heading font-black text-2xl text-[#A3E635]">
                        {service.number}
                      </span>
                      <div className="h-4 w-[1px] bg-white/20" />
                      <TechnicalLabel variant="lime" size="sm">
                        {service.technicalBadge}
                      </TechnicalLabel>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#F5F5F5] leading-tight">
                      {service.title}
                    </h3>
                    <p className="font-mono text-xs text-[#A3E635] mt-1 uppercase tracking-wider">
                      // {service.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed mt-4 font-sans font-light">
                      {service.description}
                    </p>
                  </div>

                  {/* Key Deliverables */}
                  <div className="space-y-2 pt-2">
                    <span className="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-wider block">
                      // Key Engineering Deliverables
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.keyDeliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-white/[0.02] border border-white/5 flex items-start gap-2"
                        >
                          <Check className="w-3.5 h-3.5 text-[#A3E635] shrink-0 mt-0.5" />
                          <span className="font-mono text-[11px] text-[#F5F5F5] leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Direction Callout */}
                  <div className="p-3 bg-[#111411] border border-white/10 font-mono text-xs text-[#A1A1AA] flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#A3E635] shrink-0" />
                    <span>Visual Direction: {service.visualDirection}</span>
                  </div>

                  {/* Enquiry CTA */}
                  <div className="pt-2">
                    <EnquiryAction
                      variant="primary"
                      size="md"
                      label={service.enquiryPrompt}
                      serviceContext={service.title}
                    />
                  </div>
                </div>

                {/* Blueprint Graphic Presentation (5 cols) */}
                <div
                  className={cn(
                    "lg:col-span-5 h-[320px] sm:h-[380px] bg-[#050505] border border-white/15 overflow-hidden",
                    !isEven && "lg:order-1"
                  )}
                >
                  <ModelFallback
                    type={
                      service.modelType === "part"
                        ? "gear"
                        : service.modelType === "mould"
                        ? "mould"
                        : service.modelType === "sheetmetal"
                        ? "chassis"
                        : service.modelType === "product"
                        ? "handheld"
                        : service.modelType === "flow"
                        ? "flow"
                        : service.modelType === "optimization"
                        ? "bracket"
                        : "gear"
                    }
                    title={service.title}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

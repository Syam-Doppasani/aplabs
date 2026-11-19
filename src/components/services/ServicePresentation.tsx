"use client";

import React from "react";
import { confirmedServices } from "@/config/services";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { EnquiryAction } from "@/components/ui/EnquiryAction";
import { ArrowUpRight } from "lucide-react";

export const ServicePresentation: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {confirmedServices.map((service) => (
        <div
          key={service.id}
          id={`service-${service.id}`}
          className="group relative bg-[#0B0D0B] border border-white/10 hover:border-[#A3E635]/60 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.08)] crosshair-corner"
        >
          {/* Subtle grid backdrop */}
          <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

          <div className="relative z-10 space-y-4">
            {/* Header: Number & Badge */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#A3E635] tracking-widest">
                // {service.number}
              </span>
              <span className="text-[10px] font-mono text-[#A1A1AA]/60 uppercase px-2 py-0.5 bg-white/5 border border-white/5">
                {service.technicalBadge}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-heading text-lg font-bold uppercase text-[#F5F5F5] group-hover:text-white transition-colors leading-snug">
              {service.title}
            </h3>

            {/* Essential 1-line description */}
            <p className="text-xs text-[#A1A1AA] leading-relaxed font-sans font-light">
              {service.tagline}
            </p>

            {/* Deliverables Pills (Minimal) */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {service.keyDeliverables.slice(0, 2).map((item, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-white/[0.03] border border-white/10 font-mono text-[9px] text-[#A1A1AA]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-wider group-hover:text-[#A3E635] transition-colors">
              Enquire Capability
            </span>
            <div className="w-6 h-6 rounded-none border border-white/10 group-hover:border-[#A3E635] flex items-center justify-center text-[#A1A1AA] group-hover:text-[#A3E635] transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

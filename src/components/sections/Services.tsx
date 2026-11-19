import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicePresentation } from "@/components/services/ServicePresentation";

export const Services: React.FC = () => {
  return (
    <section id="services" className="relative py-20 bg-[#050505] overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="02 // CAPABILITIES"
          tagline="CONFIRMED DISCIPLINES"
          title="ENGINEERING CAPABILITIES."
          description="Specialized design solutions shaped around mechanical precision, manufacturability, and functional performance."
        />

        <ServicePresentation />
      </div>
    </section>
  );
};

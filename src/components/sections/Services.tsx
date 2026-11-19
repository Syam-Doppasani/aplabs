import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicePresentation } from "@/components/services/ServicePresentation";

export const Services: React.FC = () => {
  return (
    <section id="services" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="02 // CAPABILITIES"
          tagline="CONFIRMED SERVICES"
          title="ENGINEERING CAPABILITIES. DESIGNED FOR REAL-WORLD APPLICATIONS."
          description="AP Labs delivers specialized mechanical engineering and product design services for manufacturing enterprises, component producers, startup entrepreneurs, and independent product inventors."
        />

        <ServicePresentation />
      </div>
    </section>
  );
};

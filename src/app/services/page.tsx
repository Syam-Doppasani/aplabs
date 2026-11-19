import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicePresentation } from "@/components/services/ServicePresentation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnquiryAction } from "@/components/ui/EnquiryAction";

export const metadata = {
  title: "Services | AP Labs Mechanical Engineering",
  description:
    "Explore the 8 specialized mechanical engineering and product design disciplines offered by AP Labs.",
};

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-32 sm:pt-36 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeading
            label="01 // ENGINEERING SERVICES"
            tagline="8 CONFIRMED DISCIPLINES"
            title="ENGINEERING CAPABILITIES."
            description="Specialized design solutions shaped around mechanical precision, manufacturability, and functional performance. Select a service to explore deliverables or initiate a project enquiry."
          />

          <ServicePresentation />

          {/* Bottom Enquiry Callout with Generous Spacing */}
          <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-[#0B0D0B] border border-white/10 crosshair-corner">
            <div>
              <h3 className="font-heading text-xl font-bold uppercase text-white mb-1">
                Need a Custom Mechanical Design Package?
              </h3>
              <p className="text-xs text-[#A1A1AA] font-sans font-light">
                Submit component specifications, tooling requirements, or CAD conversion briefs.
              </p>
            </div>
            <EnquiryAction
              variant="primary"
              size="lg"
              label="Start a Project Enquiry"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

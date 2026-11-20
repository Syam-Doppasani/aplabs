import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  output: string;
}

const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Requirements",
    description: "Capture geometric constraints, operating loads, and manufacturing criteria.",
    output: "Design Specification Matrix",
  },
  {
    step: "02",
    title: "Concept Architecture",
    description: "Establish kinematic schemes, mechanical load paths, and tooling parting strategies.",
    output: "Architectural Layout",
  },
  {
    step: "03",
    title: "CAD Modelling",
    description: "Build robust parametric 3D solids with verified draft angles, wall thicknesses, and fillets.",
    output: "Parametric 3D Solid Model",
  },
  {
    step: "04",
    title: "Design Evaluation",
    description: "Execute interference checks, tolerance stack-ups, and DFM / additive print validation.",
    output: "Clash & DFM Report",
  },
  {
    step: "05",
    title: "Production Delivery",
    description: "Export agreed neutral CAD packages (STEP AP242, IGES), 2D drawings, and flat DXFs.",
    output: "Manufacturing Package",
  },
];

export const Process: React.FC = () => {
  return (
    <section id="process" className="relative py-20 bg-[#050505] overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="06 // METHODOLOGY"
          tagline="ENGINEERING WORKFLOW"
          title="STRUCTURED WORKFLOW."
          description="Five disciplined milestones from functional brief to production-ready CAD packages."
        />

        {/* 5-Step Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {processSteps.map((item) => (
            <div
              key={item.step}
              className="group relative bg-[#0B0D0B] border border-white/10 hover:border-[#A3E635]/60 p-5 flex flex-col justify-between transition-all duration-300 crosshair-corner"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading font-black text-xl text-[#A3E635]">
                    {item.step}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#A3E635] transition-colors" />
                </div>

                <h3 className="font-heading text-base font-bold uppercase text-[#F5F5F5] mb-2 group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#A1A1AA] leading-relaxed font-sans font-light mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 font-mono text-[9px] text-[#A3E635]">
                → {item.output}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

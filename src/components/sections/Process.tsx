import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ArrowRight, CheckCircle2, ClipboardList, Compass, Layers, Check, FileCheck } from "lucide-react";

interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Understand Requirements",
    tagline: "Boundary conditions & specifications",
    description:
      "Deep-dive into client functional criteria, target manufacturing methods, space constraints, environmental conditions, and mating component interfaces.",
    deliverables: ["Design Brief", "Constraint Matrix", "Target Standards (ISO/ASME)"],
  },
  {
    step: "02",
    title: "Concept Development",
    tagline: "Geometric architecture & strategy",
    description:
      "Establish the fundamental mechanical architecture, preliminary kinematic layouts, parting line strategies for tooling, and initial structural load paths.",
    deliverables: ["Kinematic Schemes", "Parting Line Concepts", "Material Pre-Selection"],
  },
  {
    step: "03",
    title: "CAD Modelling",
    tagline: "High-precision parametric solid design",
    description:
      "Build fully-constrained parametric solid models and surfaces. Apply draft angles, wall thicknesses, ribs, corner fillets, and fastener bosses.",
    deliverables: ["Parametric 3D Solid Model", "Surface Continuity Check", "Assembly Mates"],
  },
  {
    step: "04",
    title: "Design Evaluation",
    tagline: "Interference & manufacturability review",
    description:
      "Perform virtual assembly checks, clearance and clash analysis, tolerance stack-ups, and mould flow / structural validation where required.",
    deliverables: ["Clash & Interference Check", "Draft Analysis", "DFM / DFA Review"],
  },
  {
    step: "05",
    title: "Final Design Delivery",
    tagline: "Production-ready engineering packages",
    description:
      "Prepare and export agreed technical deliverables in neutral and native CAD formats, engineering 2D manufacturing drawings, and flat-pattern DXFs.",
    deliverables: ["STEP AP242 / IGES / Parasolid", "2D GD&T Drawings", "Flat-Pattern DXF"],
  },
];

export const Process: React.FC = () => {
  return (
    <section id="process" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="06 // METHODOLOGY"
          tagline="ENGINEERING WORKFLOW"
          title="STRUCTURED DISCIPLINE. PRECISION AT EVERY STEP."
          description="A sequential, methodical engineering workflow ensuring every mechanical parameter is validated prior to physical manufacturing."
        />

        {/* Desktop Horizontal Process Timeline / Mobile Vertical Stack */}
        <div className="relative">
          {/* Horizontal Connecting Rail (Desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-8 right-8 h-[2px] bg-gradient-to-r from-[#A3E635]/60 via-white/20 to-[#A3E635]/60 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {processSteps.map((item, index) => (
              <div
                key={item.step}
                className="group relative bg-[#0B0D0B] border border-white/10 hover:border-[#A3E635]/50 p-6 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  {/* Step Circle Marker */}
                  <div className="w-12 h-12 rounded-none bg-[#111411] border border-white/20 group-hover:border-[#A3E635] flex items-center justify-center font-heading font-black text-base text-[#A3E635] mb-6 shadow-[0_0_15px_rgba(163,230,53,0.1)] transition-colors">
                    {item.step}
                  </div>

                  <span className="font-mono text-[10px] text-[#A3E635] uppercase tracking-wider block mb-1">
                    // {item.tagline}
                  </span>

                  <h3 className="font-heading text-lg font-bold uppercase text-[#F5F5F5] leading-snug mb-3 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed font-sans font-light mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Deliverable Tags */}
                <div className="pt-4 border-t border-white/5 space-y-1.5 font-mono text-[10px]">
                  <span className="text-white/40 uppercase block mb-1">
                    Deliverables:
                  </span>
                  {item.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-1.5 text-[#F5F5F5]">
                      <span className="w-1 h-1 rounded-full bg-[#A3E635]" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

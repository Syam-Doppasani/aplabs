import React from "react";
import { ProjectItem } from "@/config/projects";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ModelViewer } from "@/components/three/ModelViewer";
import { Button } from "@/components/ui/Button";
import { EnquiryAction } from "@/components/ui/EnquiryAction";
import { ArrowUpRight, Cpu, Layers, ShieldCheck, Check } from "lucide-react";

interface FeaturedProjectProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  project,
  onOpenDetails,
}) => {
  return (
    <div className="relative bg-[#0B0D0B] border border-white/10 overflow-hidden mb-12">
      {/* CAD Grid Backdrop */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />

      {/* Top Banner */}
      <div className="p-4 sm:p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#111411]/60">
        <div className="flex items-center gap-3">
          <TechnicalLabel variant="lime" size="md">
            FEATURED PROJECT
          </TechnicalLabel>
          <span className="font-mono text-xs text-[#A1A1AA] uppercase">
            // {project.primaryCategory}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {project.cadFormats.map((fmt, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-white/5 border border-white/10 font-mono text-[10px] text-[#A1A1AA]"
            >
              {fmt}
            </span>
          ))}
        </div>
      </div>

      {/* Main Grid: Left 3D Viewer / Right Engineering Spec Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: 3D CAD Inspection Area (7 Cols) */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-white/10">
          <ModelViewer project={project} />
        </div>

        {/* Right: Technical Specification & Engineering Case (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#0B0D0B]/80">
          <div className="space-y-6">
            <div>
              <span className="font-mono text-[10px] text-[#A3E635] tracking-widest uppercase block mb-1">
                ENGINEERING FILE REF: {project.id}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-[#F5F5F5] leading-tight">
                {project.title}
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mt-3 font-sans font-light">
                {project.shortDescription}
              </p>
            </div>

            {/* Engineering Challenge & Approach */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-[#111411] border-l-2 border-[#A3E635] text-xs font-mono">
                <span className="text-[#A3E635] block font-semibold mb-1 uppercase">
                  Engineering Challenge:
                </span>
                <span className="text-[#F5F5F5] leading-relaxed block font-sans">
                  {project.engineeringChallenge}
                </span>
              </div>

              <div className="p-3.5 bg-[#111411] border-l-2 border-white/30 text-xs font-mono">
                <span className="text-white/70 block font-semibold mb-1 uppercase">
                  Design Approach:
                </span>
                <span className="text-[#A1A1AA] leading-relaxed block font-sans">
                  {project.designApproach}
                </span>
              </div>
            </div>

            {/* Technical Specifications Grid */}
            <div className="space-y-2 pt-2">
              <span className="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-wider block">
                // Critical Geometric Parameters
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {project.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-2 bg-white/[0.02] border border-white/5 flex flex-col"
                  >
                    <span className="text-[10px] text-[#A1A1AA]/60 uppercase">
                      {spec.label}
                    </span>
                    <span className="text-[#F5F5F5] font-semibold truncate">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-8 flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => onOpenDetails(project)}
              className="flex-1"
            >
              Examine Full Specs
            </Button>
            <EnquiryAction
              variant="primary"
              size="md"
              label="Discuss Similar Design"
              serviceContext={project.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

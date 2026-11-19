import React from "react";
import { ProjectItem } from "@/config/projects";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ModelViewer } from "@/components/three/ModelViewer";
import { Button } from "@/components/ui/Button";
import { EnquiryAction } from "@/components/ui/EnquiryAction";
import { ArrowUpRight } from "lucide-react";

interface FeaturedProjectProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  project,
  onOpenDetails,
}) => {
  return (
    <div className="relative bg-[#0B0D0B] border border-white/10 overflow-hidden mb-10">
      {/* CAD Grid Backdrop */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      {/* Top Banner */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#111411]/50">
        <div className="flex items-center gap-3">
          <TechnicalLabel variant="lime" size="sm">
            FEATURED CAD MODEL
          </TechnicalLabel>
          <span className="font-mono text-xs text-[#A1A1AA] uppercase">
            // {project.primaryCategory}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {project.cadFormats.slice(0, 3).map((fmt, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-white/5 border border-white/10 font-mono text-[10px] text-[#A1A1AA]"
            >
              {fmt}
            </span>
          ))}
        </div>
      </div>

      {/* Main Grid: Left 3D Viewer / Right Minimal Spec Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: 3D CAD Inspection Area (7 Cols) */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-white/10">
          <ModelViewer project={project} />
        </div>

        {/* Right: Technical Specification (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#0B0D0B]/70">
          <div className="space-y-5">
            <div>
              <span className="font-mono text-[10px] text-[#A3E635] tracking-widest uppercase block mb-1">
                REF: {project.id}
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase text-[#F5F5F5] leading-tight">
                {project.title}
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed mt-2 font-sans font-light">
                {project.shortDescription}
              </p>
            </div>

            {/* Essential Challenge Statement */}
            <div className="p-3 bg-[#111411] border-l-2 border-[#A3E635] text-xs font-mono">
              <span className="text-[#A3E635] block font-semibold mb-0.5 uppercase text-[10px]">
                Engineering Target:
              </span>
              <span className="text-[#F5F5F5] leading-relaxed block font-sans text-xs">
                {project.engineeringChallenge}
              </span>
            </div>

            {/* Minimal Specifications Grid */}
            <div className="space-y-1.5 pt-1">
              <span className="font-mono text-[9px] text-[#A1A1AA] uppercase tracking-wider block">
                // Critical Tolerances &amp; Parameters
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {project.specs.slice(0, 4).map((spec, i) => (
                  <div
                    key={i}
                    className="p-2 bg-white/[0.02] border border-white/5 flex flex-col"
                  >
                    <span className="text-[9px] text-[#A1A1AA]/60 uppercase">
                      {spec.label}
                    </span>
                    <span className="text-[#F5F5F5] font-semibold text-xs truncate">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => onOpenDetails(project)}
              className="flex-1 text-xs"
            >
              Inspect 3D Specs
            </Button>
            <EnquiryAction
              variant="primary"
              size="md"
              label="Enquire Similar"
              serviceContext={project.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

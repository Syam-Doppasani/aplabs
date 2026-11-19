import React from "react";
import { ProjectItem } from "@/config/projects";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ModelFallback } from "@/components/three/ModelFallback";
import { ArrowUpRight, Box } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  className,
}) => {
  return (
    <div
      onClick={() => onSelect(project)}
      className={cn(
        "group relative bg-[#0B0D0B] border border-white/10 hover:border-[#A3E635]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer crosshair-corner",
        className
      )}
      data-cursor="VIEW"
    >
      {/* Top Header */}
      <div className="p-4 pb-2.5 flex items-start justify-between gap-3 border-b border-white/5">
        <div className="flex flex-col">
          <span className="font-mono text-[9px] text-[#A3E635] uppercase font-bold tracking-wider">
            {project.primaryCategory}
          </span>
          <h3 className="font-heading text-base font-bold uppercase text-[#F5F5F5] group-hover:text-white transition-colors mt-0.5">
            {project.title}
          </h3>
        </div>

        <div className="w-7 h-7 rounded-none border border-white/10 flex items-center justify-center text-[#A1A1AA] group-hover:border-[#A3E635] group-hover:text-[#A3E635] transition-colors shrink-0">
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Schematic / Blueprint Graphic Preview */}
      <div className="relative h-48 bg-[#050505] overflow-hidden border-b border-white/5">
        <ModelFallback type={project.modelType} />

        {/* 3D Available Badge */}
        <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 px-2 py-0.5 bg-[#111411]/90 backdrop-blur-sm border border-white/10 text-[9px] font-mono text-[#A3E635]">
          <Box className="w-2.5 h-2.5" />
          <span>3D CAD</span>
        </div>
      </div>

      {/* Description & Technical Specs (Minimal) */}
      <div className="p-4 flex flex-col justify-between flex-grow gap-3">
        <p className="text-[11px] text-[#A1A1AA] leading-relaxed line-clamp-2 font-sans font-light">
          {project.shortDescription}
        </p>

        {/* 2 Key Specs */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 font-mono text-[9px]">
          {project.specs.slice(0, 2).map((spec, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[#A1A1AA]/50 uppercase">{spec.label}</span>
              <span className="text-[#F5F5F5] font-semibold truncate">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

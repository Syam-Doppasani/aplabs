import React from "react";
import { ProjectItem } from "@/config/projects";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ModelFallback } from "@/components/three/ModelFallback";
import { ArrowUpRight, Box, Cpu, FileCode } from "lucide-react";
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
        "group relative bg-[#0B0D0B] border border-white/10 hover:border-[#A3E635]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer",
        className
      )}
      data-cursor="VIEW"
    >
      {/* Top Header */}
      <div className="p-5 pb-3 flex items-start justify-between gap-3 border-b border-white/5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <TechnicalLabel variant="lime" size="sm">
              {project.primaryCategory}
            </TechnicalLabel>
            <span className="font-mono text-[10px] text-[#A1A1AA]/60 uppercase">
              ID: {project.id.slice(0, 10)}
            </span>
          </div>
          <h3 className="font-heading text-lg font-bold uppercase text-[#F5F5F5] group-hover:text-white transition-colors mt-1">
            {project.title}
          </h3>
        </div>

        <div className="w-8 h-8 rounded-none border border-white/10 flex items-center justify-center text-[#A1A1AA] group-hover:border-[#A3E635] group-hover:text-[#A3E635] transition-colors shrink-0">
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Schematic / Blueprint Graphic Preview */}
      <div className="relative h-56 bg-[#050505] overflow-hidden border-b border-white/5">
        <ModelFallback type={project.modelType} />

        {/* 3D Available Badge */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-[#111411]/90 backdrop-blur-sm border border-white/15 text-[10px] font-mono text-[#A3E635]">
          <Box className="w-3 h-3" />
          <span>3D CAD INSPECTION</span>
        </div>
      </div>

      {/* Description & Technical Specs */}
      <div className="p-5 flex flex-col justify-between flex-grow gap-4">
        <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-2 font-sans font-light">
          {project.shortDescription}
        </p>

        {/* Key Specs Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 font-mono text-[10px]">
          {project.specs.slice(0, 2).map((spec, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[#A1A1AA]/60 uppercase">{spec.label}</span>
              <span className="text-[#F5F5F5] font-semibold truncate">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Formats and Material Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {project.cadFormats.slice(0, 2).map((fmt, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-white/5 border border-white/10 text-[9px] font-mono text-[#A1A1AA]"
            >
              {fmt}
            </span>
          ))}
          {project.cadFormats.length > 2 && (
            <span className="text-[9px] font-mono text-[#A1A1AA]/50">
              +{project.cadFormats.length - 2} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

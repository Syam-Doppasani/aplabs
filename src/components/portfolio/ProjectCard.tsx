"use client";

import React, { useState } from "react";
import { ProjectItem } from "@/config/projects";
import { ModelFallback } from "@/components/three/ModelFallback";
import { ArrowUpRight, Box, Play, Layers, Eye } from "lucide-react";
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
  const [viewMode, setViewMode] = useState<"image" | "blueprint">("image");

  return (
    <div
      onClick={() => onSelect(project)}
      className={cn(
        "group relative bg-[#0B0D0B] border border-white/10 hover:border-[#A3E635]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer crosshair-corner hover:shadow-[0_0_35px_rgba(163,230,53,0.08)]",
        className
      )}
    >
      {/* Top Header */}
      <div className="p-4 pb-3 flex items-start justify-between gap-3 border-b border-white/5 bg-[#111411]/50">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-[#A3E635] uppercase font-bold tracking-wider">
              {project.primaryCategory}
            </span>
            {project.cadSoftwareName && (
              <span className="px-1.5 py-0.2 bg-white/5 border border-white/10 font-mono text-[8px] text-[#A1A1AA] uppercase">
                {project.cadSoftwareName.split(" ")[0]}
              </span>
            )}
          </div>
          <h3 className="font-heading text-base font-bold uppercase text-[#F5F5F5] group-hover:text-white transition-colors mt-1 leading-snug line-clamp-1">
            {project.title}
          </h3>
        </div>

        <div className="w-7 h-7 rounded-none border border-white/10 flex items-center justify-center text-[#A1A1AA] group-hover:border-[#A3E635] group-hover:text-[#A3E635] transition-colors shrink-0">
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Real CAD Image / Blueprint Preview Frame */}
      <div className="relative h-52 bg-[#050505] overflow-hidden border-b border-white/5 flex items-center justify-center">
        {/* Subtle CAD Grid */}
        <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />

        {/* View Mode: Real CAD Image */}
        {viewMode === "image" ? (
          <div className="relative w-full h-full p-2 flex items-center justify-center overflow-hidden">
            <img
              src={project.thumbnailImage}
              alt={project.title}
              className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105 filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
            />
            {/* Dark vignette gradient on edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        ) : (
          <div className="w-full h-full">
            <ModelFallback type={project.modelType} />
          </div>
        )}

        {/* Top-Right Toggle Pill (Image / Blueprint) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setViewMode(viewMode === "image" ? "blueprint" : "image");
          }}
          className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 px-2 py-0.5 bg-[#111411]/90 backdrop-blur-md border border-white/15 text-[9px] font-mono text-[#A1A1AA] hover:text-[#A3E635] hover:border-[#A3E635] transition-colors"
          title="Toggle between Native CAD Image and Vector Blueprint"
        >
          {viewMode === "image" ? (
            <>
              <Layers className="w-2.5 h-2.5" />
              <span>Blueprint</span>
            </>
          ) : (
            <>
              <Eye className="w-2.5 h-2.5" />
              <span>CAD Image</span>
            </>
          )}
        </div>

        {/* Badges on Bottom Bar */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            {project.mediaVideo && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-[#111411]/90 backdrop-blur-sm border border-[#A3E635]/40 text-[9px] font-mono text-[#A3E635]">
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>VIDEO CAD</span>
              </span>
            )}
            <span className="flex items-center gap-1 px-2 py-0.5 bg-[#111411]/90 backdrop-blur-sm border border-white/10 text-[9px] font-mono text-[#A1A1AA]">
              <Box className="w-2.5 h-2.5 text-[#A3E635]" />
              <span>3D INSPECT</span>
            </span>
          </div>

          <span className="font-mono text-[8px] text-white/40 uppercase hidden sm:inline">
            TOL: ±0.005mm
          </span>
        </div>
      </div>

      {/* Description & Technical Specs */}
      <div className="p-4 flex flex-col justify-between flex-grow gap-3">
        <p className="text-[11px] text-[#A1A1AA] leading-relaxed line-clamp-2 font-sans font-light">
          {project.shortDescription}
        </p>

        {/* 2 Key Specs */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 font-mono text-[9px]">
          {project.specs.slice(0, 2).map((spec, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[#A1A1AA]/50 uppercase truncate">{spec.label}</span>
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

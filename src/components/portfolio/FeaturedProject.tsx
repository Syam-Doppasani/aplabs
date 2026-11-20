"use client";

import React, { useState } from "react";
import { ProjectItem } from "@/config/projects";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ModelViewer } from "@/components/three/ModelViewer";
import { ModelFallback } from "@/components/three/ModelFallback";
import { Button } from "@/components/ui/Button";
import { EnquiryAction } from "@/components/ui/EnquiryAction";
import { ArrowUpRight, Box, Image as ImageIcon, Layers, Play, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedProjectProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  project,
  onOpenDetails,
}) => {
  const [activeTab, setActiveTab] = useState<"cad-capture" | "3d" | "blueprint">("cad-capture");

  return (
    <div className="relative bg-[#0B0D0B] border border-white/10 overflow-hidden mb-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] crosshair-corner">
      {/* CAD Grid Backdrop */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      {/* Top Banner with Mode Selector */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#111411]/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <TechnicalLabel variant="lime" size="sm">
            FEATURED ENGINEERING ARCHIVE
          </TechnicalLabel>
          <span className="font-mono text-xs text-[#A1A1AA] uppercase hidden sm:inline">
            // {project.primaryCategory}
          </span>
          {project.cadSoftwareName && (
            <span className="px-2 py-0.5 bg-[#A3E635]/10 border border-[#A3E635]/30 font-mono text-[10px] text-[#A3E635] uppercase font-semibold">
              {project.cadSoftwareName}
            </span>
          )}
        </div>

        {/* View Mode Switcher Pill */}
        <div className="flex items-center gap-1 p-1 bg-black/40 border border-white/10 rounded-none font-mono text-[11px]">
          <button
            onClick={() => setActiveTab("cad-capture")}
            className={cn(
              "px-3 py-1 flex items-center gap-1.5 transition-colors uppercase font-medium",
              activeTab === "cad-capture"
                ? "bg-[#A3E635] text-[#050505] font-bold"
                : "text-[#A1A1AA] hover:text-white"
            )}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>CAD Capture</span>
          </button>

          <button
            onClick={() => setActiveTab("3d")}
            className={cn(
              "px-3 py-1 flex items-center gap-1.5 transition-colors uppercase font-medium",
              activeTab === "3d"
                ? "bg-[#A3E635] text-[#050505] font-bold"
                : "text-[#A1A1AA] hover:text-white"
            )}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D WebGL</span>
          </button>

          <button
            onClick={() => setActiveTab("blueprint")}
            className={cn(
              "px-3 py-1 flex items-center gap-1.5 transition-colors uppercase font-medium",
              activeTab === "blueprint"
                ? "bg-[#A3E635] text-[#050505] font-bold"
                : "text-[#A1A1AA] hover:text-white"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Blueprint</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Visual Viewport / Right Technical Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Viewport Area (7 Cols) */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-white/10 relative min-h-[380px] sm:min-h-[440px] bg-[#050505] flex items-center justify-center overflow-hidden">
          {activeTab === "cad-capture" && (
            <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center bg-[#070907] p-4 sm:p-6 group">
              {project.mediaVideo ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <video
                    src={project.mediaVideo}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full max-h-[390px] object-contain shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#111411]/90 border border-white/10 text-[9px] font-mono text-[#A3E635] flex items-center gap-1">
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>60 FPS SIMULATION CAPTURE</span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={project.thumbnailImage}
                    alt={project.title}
                    className="w-full max-h-[390px] object-contain transition-transform duration-500 ease-out group-hover:scale-105 filter drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#111411]/90 border border-white/10 text-[9px] font-mono text-[#A3E635]">
                    ✦ NATIVE 3D CAD CAPTURE
                  </div>
                </div>
              )}

              {/* Blueprint Registration Marks */}
              <div className="absolute bottom-3 left-3 font-mono text-[9px] text-[#A1A1AA]/60 uppercase tracking-widest pointer-events-none">
                REF // {project.id.toUpperCase()}
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[#A3E635] uppercase tracking-widest pointer-events-none">
                VERIFIED STUDIO CAD IP
              </div>
            </div>
          )}

          {activeTab === "3d" && (
            <div className="w-full h-full min-h-[380px] sm:min-h-[440px]">
              <ModelViewer project={project} />
            </div>
          )}

          {activeTab === "blueprint" && (
            <div className="w-full h-full min-h-[380px] sm:min-h-[440px]">
              <ModelFallback type={project.modelType} />
            </div>
          )}
        </div>

        {/* Right: Technical Specification Dossier (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#0B0D0B]/80 space-y-6">
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] text-[#A3E635] tracking-widest uppercase">
                  PROJECT SPECIFICATION: {project.id}
                </span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase text-[#F5F5F5] leading-tight">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mt-2.5 font-sans font-light">
                {project.shortDescription}
              </p>
            </div>

            {/* Engineering Challenge Statement */}
            <div className="p-4 bg-[#111411] border-l-2 border-[#A3E635] text-xs font-mono">
              <span className="text-[#A3E635] block font-bold mb-1 uppercase text-[10px] tracking-wider">
                // Engineering Target &amp; Challenge:
              </span>
              <span className="text-[#F5F5F5] leading-relaxed block font-sans text-xs">
                {project.engineeringChallenge}
              </span>
            </div>

            {/* Tolerances & Parameters Grid */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#A1A1AA] uppercase tracking-wider block">
                  // Critical Tolerances &amp; Parameters
                </span>
                <span className="font-mono text-[9px] text-[#A3E635]">ISO 2768 / ASME Y14.5</span>
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {project.specs.slice(0, 4).map((spec, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-white/[0.02] border border-white/5 flex flex-col"
                  >
                    <span className="text-[9px] text-[#A1A1AA]/60 uppercase truncate">
                      {spec.label}
                    </span>
                    <span className="text-[#F5F5F5] font-semibold text-xs truncate mt-0.5">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CAD Formats */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1 font-mono text-[10px] text-[#A1A1AA]">
              <span className="text-white/40 uppercase">DELIVERABLES:</span>
              {project.cadFormats.map((fmt, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-white/5 border border-white/10 text-[#F5F5F5]"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-white/10 flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => onOpenDetails(project)}
              className="flex-1 text-xs"
            >
              Inspect Complete Dossier
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

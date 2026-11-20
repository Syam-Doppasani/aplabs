"use client";

import React, { useEffect } from "react";
import { ProjectItem } from "@/config/projects";
import { ModelViewer } from "@/components/three/ModelViewer";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { Button } from "@/components/ui/Button";
import { EnquiryAction } from "@/components/ui/EnquiryAction";
import {
  X,
  CheckCircle2,
  FileCode,
  Layers,
  Cpu,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

interface ProjectDetailProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-5xl bg-[#0B0D0B] border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.9)] my-auto max-h-[92vh] flex flex-col overflow-hidden crosshair-corner">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between gap-4 bg-[#111411]">
          <div className="flex items-center gap-3">
            <TechnicalLabel variant="lime" size="md">
              {project.primaryCategory}
            </TechnicalLabel>
            <span className="font-mono text-xs text-[#A1A1AA] uppercase hidden sm:inline">
              // DESIGN LOG: {project.id}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-none border border-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#A3E635] transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Title & Overview */}
          <div>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold uppercase text-[#F5F5F5] leading-tight">
              {project.title}
            </h2>
            <p className="text-base text-[#A1A1AA] leading-relaxed mt-3 font-sans font-light max-w-3xl">
              {project.fullDescription}
            </p>
          </div>

          {/* Interactive 3D CAD Viewer */}
          <div className="border border-white/15">
            <ModelViewer project={project} />
          </div>

          {/* Workproof Video & CAD Proof Assets (Native captures from studio archives) */}
          {(project.mediaVideo || (project.mediaImages && project.mediaImages.length > 0)) && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <TechnicalLabel variant="lime" size="sm">
                  WORKPROOF CAD ASSETS
                </TechnicalLabel>
                <span className="font-mono text-xs text-[#A1A1AA] uppercase">
                  // NATIVE CAD MODEL &amp; SIMULATION CAPTURE
                </span>
              </div>

              {/* 3D CAD Video Turnaround Simulation */}
              {project.mediaVideo && (
                <div className="border border-white/15 bg-black overflow-hidden">
                  <div className="flex items-center justify-between p-2.5 bg-[#111411] border-b border-white/10 font-mono text-[10px]">
                    <span className="text-[#A3E635] uppercase font-bold flex items-center gap-1.5">
                      ▶ 3D CAD Dynamic Simulation Turnaround (.MP4)
                    </span>
                    <span className="text-[#A1A1AA]">60 FPS CAD PLAYBACK</span>
                  </div>
                  <video
                    src={project.mediaVideo}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full max-h-[400px] object-contain bg-black"
                  />
                </div>
              )}

              {/* High-Resolution CAD Workproof Captures */}
              {project.mediaImages && project.mediaImages.length > 0 && (
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-[#A1A1AA] uppercase block">
                    // High-Resolution Engineering Workproof Captures ({project.mediaImages.length})
                  </span>
                  <div
                    className={`grid grid-cols-1 ${
                      project.mediaImages.length > 1
                        ? "sm:grid-cols-2 md:grid-cols-3"
                        : "sm:grid-cols-1"
                    } gap-3`}
                  >
                    {project.mediaImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="border border-white/15 bg-black overflow-hidden group flex flex-col"
                      >
                        <div className="p-2 bg-[#111411] border-b border-white/10 font-mono text-[9px] text-[#A3E635] truncate flex items-center justify-between">
                          <span>CAD_PROOF_0{idx + 1}</span>
                          <span className="text-[#A1A1AA]/60">VERIFIED</span>
                        </div>
                        <img
                          src={img}
                          alt={`${project.title} capture ${idx + 1}`}
                          className="w-full h-48 object-contain bg-[#080a08] p-2 transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Engineering Challenge & Design Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-[#111411] border-l-2 border-[#A3E635]">
              <span className="font-mono text-xs text-[#A3E635] uppercase font-semibold block mb-2">
                // Engineering Challenge
              </span>
              <p className="text-sm text-[#F5F5F5] leading-relaxed font-sans font-light">
                {project.engineeringChallenge}
              </p>
            </div>

            <div className="p-5 bg-[#111411] border-l-2 border-white/40">
              <span className="font-mono text-xs text-white/70 uppercase font-semibold block mb-2">
                // Design Approach & Execution
              </span>
              <p className="text-sm text-[#A1A1AA] leading-relaxed font-sans font-light">
                {project.designApproach}
              </p>
            </div>
          </div>

          {/* Technical Observations */}
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#A3E635] uppercase tracking-wider block">
              // Verified Technical Observations
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {project.technicalObservations.map((obs, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-white/[0.02] border border-white/10 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#A3E635] shrink-0 mt-0.5" />
                  <span className="font-mono text-xs text-[#A1A1AA] leading-relaxed">
                    {obs}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications & Materials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2 border-t border-white/10">
            {/* Specs Table */}
            <div>
              <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-wider block mb-3">
                // Dimensional & Engineering Specifications
              </span>
              <div className="divide-y divide-white/5 border border-white/10 bg-[#050505] font-mono text-xs">
                {project.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-3 flex items-center justify-between gap-4"
                  >
                    <span className="text-[#A1A1AA] uppercase">
                      {spec.label}
                    </span>
                    <span className="text-[#F5F5F5] font-semibold text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials & CAD Deliverables */}
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-wider block mb-2">
                  // Specified Materials
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#111411] border border-white/10 font-mono text-xs text-[#F5F5F5]"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-wider block mb-2">
                  // CAD Format Compatibility
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.cadFormats.map((fmt, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 border border-[#A3E635]/30 font-mono text-xs text-[#A3E635]"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-[#111411] flex flex-wrap items-center justify-between gap-4">
          <Button variant="secondary" size="md" onClick={onClose}>
            Close Inspection
          </Button>
          <EnquiryAction
            variant="primary"
            size="md"
            label="Discuss a Similar Project"
            serviceContext={project.title}
          />
        </div>
      </div>
    </div>
  );
};

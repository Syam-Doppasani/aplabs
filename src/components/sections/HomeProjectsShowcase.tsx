"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projectsData, ProjectItem } from "@/config/projects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ProjectDetail } from "@/components/portfolio/ProjectDetail";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Box, Layers, Play } from "lucide-react";

export const HomeProjectsShowcase: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Take the primary 4 flagship projects
  const flagshipProjects = projectsData.slice(0, 4);

  return (
    <section className="relative py-28 sm:py-36 bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <TechnicalLabel variant="lime" size="sm">
                VERIFIED ARCHIVES
              </TechnicalLabel>
              <span className="font-mono text-xs text-[#A1A1AA] uppercase">
                // STUDIO CAD ASSETS
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-[#F5F5F5] leading-tight">
              FEATURED ENGINEERING PROJECTS.
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] font-sans font-light leading-relaxed">
              Real mechanical components, assemblies, and additive designs engineered by AP Labs. Inspect native CAD captures, 60 FPS simulation videos, and interactive 3D geometry.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/projects">
              <Button
                variant="outline"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                View All {projectsData.length} Projects
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Flagship Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {flagshipProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setActiveProject}
            />
          ))}
        </div>

        {/* Bottom Context Banner */}
        <div className="p-6 bg-[#0B0D0B] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#A1A1AA] crosshair-corner">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#A3E635]" />
            <span className="text-white font-medium">AUTHENTIC CAD GEOMETRY:</span>
            <span>All models generated from Creo Parametric &amp; SolidWorks design trees.</span>
          </div>

          <Link
            href="/showcase"
            className="text-[#A3E635] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Enter Technical Exhibition</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Deep Inspection Modal */}
      <ProjectDetail
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};

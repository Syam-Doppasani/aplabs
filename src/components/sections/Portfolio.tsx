"use client";

import React, { useState, useMemo } from "react";
import {
  projectsData,
  portfolioCategories,
  ProjectItem,
} from "@/config/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeaturedProject } from "@/components/portfolio/FeaturedProject";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ProjectDetail } from "@/components/portfolio/ProjectDetail";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { cn } from "@/lib/utils";

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Projects");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Filter categories to only include those with available projects
  const availableCategories = useMemo(() => {
    return portfolioCategories.filter((category) => {
      if (category === "All Projects") return true;
      return projectsData.some((p) => p.categories.includes(category));
    });
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All Projects") {
      return projectsData;
    }
    return projectsData.filter((p) =>
      p.categories.includes(selectedCategory)
    );
  }, [selectedCategory]);

  // Designate the first featured project in the filtered list
  const featuredItem = filteredProjects.find((p) => p.isFeatured) || filteredProjects[0];
  const secondaryProjects = filteredProjects.filter((p) => p.id !== featuredItem?.id);

  return (
    <section id="projects" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="03 // PORTFOLIO"
          tagline="VERIFIED ENGINEERING ASSETS"
          title="ENGINEERED WITH PURPOSE. DESIGNED TO PERFORM."
          description="A selection of mechanical engineering and product design projects delivered by AP Labs — highlighting dimensional precision, functional geometry, mould tooling, and CAD craftsmanship."
        />

        {/* Dynamic Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {availableCategories.map((category) => {
            const isSelected = selectedCategory === category;
            const count =
              category === "All Projects"
                ? projectsData.length
                : projectsData.filter((p) => p.categories.includes(category)).length;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all border flex items-center gap-2",
                  isSelected
                    ? "bg-[#A3E635] text-[#050505] border-[#A3E635] font-semibold"
                    : "bg-white/[0.02] text-[#A1A1AA] border-white/10 hover:border-white/30 hover:text-white"
                )}
              >
                <span>{category}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-none",
                    isSelected
                      ? "bg-black/20 text-[#050505]"
                      : "bg-white/10 text-white/60"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Featured Project Showcase */}
        {featuredItem && (
          <FeaturedProject
            project={featuredItem}
            onOpenDetails={setActiveProject}
          />
        )}

        {/* Secondary Asymmetric Project Grid */}
        {secondaryProjects.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-[#A3E635] uppercase tracking-wider font-semibold">
                // Additional Engineering Records ({secondaryProjects.length})
              </span>
              <span className="font-mono text-[10px] text-[#A1A1AA] uppercase">
                CLICK ANY FILE FOR 3D INSPECTION
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setActiveProject}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Deep Inspection Modal */}
      <ProjectDetail
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};

import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projectsData } from "@/config/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = "2026-11-19T00:00:00.000Z";

  const routes = [
    { path: "", priority: 1.0 },
    { path: "/services", priority: 0.9 },
    { path: "/projects", priority: 0.9 },
    { path: "/showcase", priority: 0.8 },
    { path: "/about", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
  ].map((route) => ({
    url: `${siteConfig.domain}${route.path}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));

  const projectRoutes = projectsData.map((project) => ({
    url: `${siteConfig.domain}/projects#${project.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes];
}

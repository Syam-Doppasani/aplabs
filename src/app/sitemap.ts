import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projectsData } from "@/config/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = "2026-11-19T00:00:00.000Z";

  const routes = [
    "",
    "#services",
    "#projects",
    "#showcase",
    "#about",
    "#process",
    "#faq",
    "#contact",
  ].map((route) => ({
    url: `${siteConfig.domain}/${route}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectRoutes = projectsData.map((project) => ({
    url: `${siteConfig.domain}/#project-${project.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes];
}

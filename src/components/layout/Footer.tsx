"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig, isConfigPlaceholder } from "@/config/site";
import { confirmedServices } from "@/config/services";
import { Logo } from "@/components/ui/Logo";
import { GargantuaSingularityCard } from "@/components/ui/GargantuaSingularityCard";
import { EnquiryAction } from "@/components/ui/EnquiryAction";
import { ArrowUpRight, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

export const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(2026);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleCtaClick = () => {
    if (!isConfigPlaceholder(siteConfig.googleFormUrl)) {
      window.open(siteConfig.googleFormUrl, "_blank", "noopener,noreferrer");
    } else {
      // Trigger modal fallback
      setEnquiryModalOpen(true);
    }
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/10 pt-20 sm:pt-28 pb-12 overflow-hidden">
      {/* Subtle CAD Grid background */}
      <div className="absolute inset-0 bg-cad-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── 01. Gargantua Singularity Interactive 3D Card ── */}
        <div className="mb-20 sm:mb-28">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#A3E635] font-semibold">
                // RELATIVISTIC CAD HORIZON
              </span>
            </div>
            <span className="hidden sm:inline font-mono text-[10px] text-[#A1A1AA]/60 uppercase">
              WebGL2 Procedural Shader • 3D Gyroscopic Tilt
            </span>
          </div>

          <GargantuaSingularityCard
            badge="AP LABS ENGINEERING"
            title="ENGINEERING BEYOND LIMITS"
            subtitle="Precision mechanical component design, advanced 3D CAD modelling, and injection mould tooling engineered for real-world manufacturing."
            cta="Start a Project Enquiry"
            onCtaClick={handleCtaClick}
            colorA="#A3E635"
            colorB="#84CC16"
            colorC="#050505"
            speed={1.0}
            interactive={true}
            tilt={true}
            logoSrc="/images/ap-labs-logo.jpeg"
            className="w-full border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
          />
        </div>

        {/* ── 02. Navigation & Studio Details Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20 pt-8 border-t border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />

            <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-sm font-sans font-light">
              Precision mechanical engineering and product design studio. Specialized in CAD modelling, injection mould tooling, and component optimization.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <TechnicalLabel variant="gray" size="sm">
                CAD MODELLING
              </TechnicalLabel>
              <TechnicalLabel variant="gray" size="sm">
                MOULD DESIGN
              </TechnicalLabel>
              <TechnicalLabel variant="gray" size="sm">
                GD&amp;T PRECISION
              </TechnicalLabel>
            </div>
          </div>

          {/* Core Services Links */}
          <div className="space-y-3">
            <div className="font-mono text-xs text-[#A3E635] uppercase tracking-wider font-semibold">
              // Core Services
            </div>
            <ul className="space-y-2 text-xs font-mono text-[#A1A1AA]">
              {confirmedServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#service-${service.id}`}
                    className="hover:text-[#A3E635] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[10px] text-white/30">{service.number}</span>
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Header Pages Navigation */}
          <div className="space-y-3">
            <div className="font-mono text-xs text-[#A3E635] uppercase tracking-wider font-semibold">
              // Navigation
            </div>
            <ul className="space-y-2.5 text-xs font-mono text-[#A1A1AA]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  01 // Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  02 // Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  03 // Projects
                </Link>
              </li>
              <li>
                <Link href="/showcase" className="hover:text-white transition-colors">
                  04 // Technical Showcase
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  05 // About &amp; Process
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  06 // Project Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Configurable Business Information */}
          <div className="space-y-3">
            <div className="font-mono text-xs text-[#A3E635] uppercase tracking-wider font-semibold">
              // Studio Details
            </div>
            <div className="space-y-3 text-xs font-mono text-[#A1A1AA]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#A3E635] mt-0.5 shrink-0" />
                <div>
                  <span className="text-white/40 block text-[10px]">LOCATION</span>
                  <span>{siteConfig.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A3E635] mt-0.5 shrink-0" />
                <div>
                  <span className="text-white/40 block text-[10px]">EMAIL</span>
                  {!isConfigPlaceholder(siteConfig.email) ? (
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="hover:text-[#A3E635] transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  ) : (
                    <span>{siteConfig.email}</span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#A3E635] mt-0.5 shrink-0" />
                <div>
                  <span className="text-white/40 block text-[10px]">PHONE</span>
                  <span>{siteConfig.phone}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <span className="text-white/40 block text-[10px] mb-1">CHANNELS</span>
                <div className="flex flex-wrap gap-2 text-[10px]">
                  {Object.entries(siteConfig.social).map(([platform, url]) => (
                    <span
                      key={platform}
                      className="px-2 py-0.5 bg-white/5 border border-white/10 uppercase"
                    >
                      {!isConfigPlaceholder(url) ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#A3E635] flex items-center gap-1"
                        >
                          {platform} <ArrowUpRight className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span>{platform} [{platform.toUpperCase()}_URL]</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 03. AP LABS Monumental Bold Footer Typography ── */}
        <div className="pt-8 pb-10 border-t border-white/10 overflow-hidden select-none">
          <h1 className="font-heading font-black text-6xl sm:text-8xl md:text-9xl lg:text-[13vw] xl:text-[14vw] tracking-tighter uppercase text-center leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#F5F5F5] via-[#F5F5F5]/40 to-white/5 opacity-90 hover:opacity-100 transition-opacity duration-500 will-change-transform">
            AP LABS
          </h1>
        </div>

        {/* ── 04. Technical Footer Bottom Bar ── */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A1A1AA]/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A3E635]" />
            <span>
              &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>PRECISION MECHANICAL DESIGN</span>
            <span className="text-white/20">|</span>
            <span>PROPRIETARY CAD IP PROTECTED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

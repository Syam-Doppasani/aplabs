"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig, isConfigPlaceholder } from "@/config/site";
import { confirmedServices } from "@/config/services";
import { Logo } from "@/components/ui/Logo";
import { GargantuaSingularityCard } from "@/components/ui/GargantuaSingularityCard";
import { ArrowUpRight, Mail, MessageCircle, MapPin } from "lucide-react";
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
      window.open(siteConfig.whatsappUrl, "_blank", "noopener,noreferrer");
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
            subtitle="Precision mechanical component design, advanced 3D CAD modelling, and 3D printer designs engineered for real-world manufacturing."
            cta="Start a Project Enquiry"
            onCtaClick={handleCtaClick}
            colorA="#A3E635"
            colorB="#84CC16"
            colorC="#050505"
            speed={1.0}
            interactive={true}
            tilt={true}
            logoSrc="/images/logo-with-name.jpeg"
            className="w-full border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
          />
        </div>

        {/* ── 02. Navigation & Studio Details Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20 pt-8 border-t border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />

            <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-sm font-sans font-light">
              Precision mechanical engineering and product design studio. Specialized in CAD modelling, 3D printer designs, and component optimization.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <TechnicalLabel variant="gray" size="sm">
                CAD MODELLING
              </TechnicalLabel>
              <TechnicalLabel variant="gray" size="sm">
                3D PRINTER DESIGNS
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

          {/* Contact Details (WhatsApp only - No Call Button) */}
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
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-[#A3E635] transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* WhatsApp Only (No call button) */}
              <div className="flex items-start gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#A3E635] mt-0.5 shrink-0" />
                <div>
                  <span className="text-white/40 block text-[10px]">WHATSAPP ONLY</span>
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A3E635] hover:underline flex items-center gap-1 font-semibold"
                  >
                    {siteConfig.whatsappNumber}
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <span className="text-white/40 block text-[10px] mb-1">CHANNELS</span>
                <div className="flex flex-wrap gap-2 text-[10px]">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-white/5 border border-white/10 uppercase hover:border-[#A3E635] hover:text-[#A3E635] transition-colors flex items-center gap-1.5"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-white/5 border border-white/10 uppercase hover:border-[#A3E635] hover:text-[#A3E635] transition-colors flex items-center gap-1.5"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 03. AP LABS Shared Logo Photo Monumental Banner ── */}
        <div className="pt-10 pb-12 border-t border-white/10 flex items-center justify-center overflow-hidden select-none">
          <div className="relative w-full max-w-4xl px-4 flex justify-center">
            <img
              src="/images/logo-with-name.jpeg"
              alt="AP LABS"
              className="w-full max-w-2xl h-auto object-contain mix-blend-lighten opacity-95 hover:opacity-100 transition-opacity duration-500 filter drop-shadow-[0_0_40px_rgba(163,230,53,0.18)]"
            />
          </div>
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

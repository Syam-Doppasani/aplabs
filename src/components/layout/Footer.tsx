"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig, isConfigPlaceholder, displayOrPlaceholder } from "@/config/site";
import { confirmedServices } from "@/config/services";
import { Logo } from "@/components/ui/Logo";
import { ArrowUpRight, Mail, Phone, MapPin, ShieldCheck, Terminal } from "lucide-react";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

export const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-[#050505] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Subtle CAD Grid background */}
      <div className="absolute inset-0 bg-cad-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
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

        {/* Technical Footer Bottom Bar */}
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

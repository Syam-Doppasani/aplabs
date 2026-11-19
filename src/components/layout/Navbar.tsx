"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { EnquiryAction } from "@/components/ui/EnquiryAction";
import { Logo } from "@/components/ui/Logo";
import { Menu, X, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Showcase", href: "#showcase" },
  { name: "About", href: "#about" },
  { name: "Process", href: "#process" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section spy
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-6 lg:px-8",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div
          className={cn(
            "max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 px-4 sm:px-6 py-2.5",
            scrolled
              ? "glass-panel bg-[#111411]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.8)]"
              : "bg-transparent border border-transparent"
          )}
        >
          {/* Official AP Labs Logo */}
          <Logo size="sm" />

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors duration-200 select-none",
                    isActive
                      ? "text-[#A3E635] font-semibold"
                      : "text-[#A1A1AA] hover:text-[#F5F5F5]"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#A3E635] shadow-[0_0_8px_#A3E635]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-3">
            <EnquiryAction
              variant="primary"
              size="sm"
              label="Discuss Your Project"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#A1A1AA] hover:text-[#F5F5F5] focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#A3E635]" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl lg:hidden pt-24 px-6 flex flex-col justify-between pb-8 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col gap-4">
            <div className="font-mono text-xs text-[#A3E635] tracking-widest uppercase mb-2">
              // INDEX NAVIGATION
            </div>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "font-heading text-xl uppercase tracking-wider py-2 border-b border-white/5 flex items-center justify-between",
                    isActive ? "text-[#A3E635]" : "text-[#F5F5F5]"
                  )}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#A3E635] shadow-[0_0_8px_#A3E635]" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <div className="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-wider">
              {siteConfig.industry}
            </div>
            <EnquiryAction
              variant="primary"
              size="lg"
              className="w-full justify-center"
              label="Discuss Your Project"
            />
          </div>
        </div>
      )}
    </>
  );
};

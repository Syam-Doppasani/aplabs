import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { TechnicalShowcase } from "@/components/sections/TechnicalShowcase";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { Enquiry } from "@/components/sections/Enquiry";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col justify-between selection:bg-[#A3E635] selection:text-[#050505]">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 01. Hero Section */}
        <Hero />

        {/* 02. Confirmed Services (8 Services) */}
        <Services />

        {/* 03. Project Portfolio & 3D CAD Inspection */}
        <Portfolio />

        {/* 04. Technical CAD Exhibition & Visualizations */}
        <TechnicalShowcase />

        {/* 05. About AP Labs & Engineering Ethos */}
        <About />

        {/* 06. Structured Design Process */}
        <Process />

        {/* 07. Engineering FAQ */}
        <FAQ />

        {/* 08. Project Enquiry (Google Form Portal) */}
        <Enquiry />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

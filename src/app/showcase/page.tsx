import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TechnicalShowcase } from "@/components/sections/TechnicalShowcase";

export const metadata = {
  title: "Showcase | AP Labs Technical Exhibition",
  description:
    "Interactive 3D simulation of core mechanical engineering CAD workflows, kinematic mechanisms, and tooling architectures.",
};

export default function ShowcasePage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-24 sm:pt-28 pb-20 sm:pb-28">
        <TechnicalShowcase />
      </main>

      <Footer />
    </div>
  );
}

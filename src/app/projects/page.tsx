import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Portfolio } from "@/components/sections/Portfolio";

export const metadata = {
  title: "Projects | AP Labs Mechanical Engineering",
  description:
    "Verified mechanical engineering projects, 3D CAD models, and injection mould designs by AP Labs.",
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-24 sm:pt-28 pb-20 sm:pb-28">
        <Portfolio />
      </main>

      <Footer />
    </div>
  );
}

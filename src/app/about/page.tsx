import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";

export const metadata = {
  title: "About | AP Labs Mechanical Engineering",
  description:
    "Learn about AP Labs studio ethos, engineering methodology, and mechanical design principles.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-24 sm:pt-28 pb-20 sm:pb-28 space-y-16 sm:space-y-24">
        <About />
        <Process />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

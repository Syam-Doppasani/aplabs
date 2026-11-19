import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Enquiry } from "@/components/sections/Enquiry";

export const metadata = {
  title: "Contact & Enquiry | AP Labs Mechanical Engineering",
  description:
    "Submit your mechanical design, mould tooling, or 3D CAD project requirements to AP Labs.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-24 sm:pt-28 pb-20 sm:pb-28">
        <Enquiry />
      </main>

      <Footer />
    </div>
  );
}

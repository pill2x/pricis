"use client";

import { useEffect } from "react";
import WaitlistNavbar from "@/components/WaitlistNavbar";
import StitchHero from "@/components/StitchHero";
import StitchWorkflow from "@/components/StitchWorkflow";
import StitchCapabilities from "@/components/StitchCapabilities";
import StitchSabee from "@/components/StitchSabee";
import StitchBuiltFor from "@/components/StitchBuiltFor";
import StitchWaitlistCTA from "@/components/StitchWaitlistCTA";
import Footer from "@/components/Footer";

export default function WaitlistPage() {
  useEffect(() => {
    document.body.style.backgroundColor = "#FBFBFD";
    document.documentElement.style.backgroundColor = "#FBFBFD";

    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#0F172A] font-body selection:bg-blue-100 selection:text-blue-900 transition-colors">
      {/* 1. Stitch Navigation */}
      <WaitlistNavbar />

      {/* 2. Stitch Hero & Product UI Window */}
      <StitchHero />

      {/* 3. Stitch Workflow Transformation */}
      <StitchWorkflow />

      {/* 4. Stitch 7-Item Capabilities Editorial Grid */}
      <StitchCapabilities />

      {/* 5. Stitch SaBee Section */}
      <StitchSabee />

      {/* 6. Stitch Built-For Section */}
      <StitchBuiltFor />

      {/* 7. Stitch Waitlist CTA */}
      <StitchWaitlistCTA />

      {/* 8. Stitch Footer */}
      <Footer />
    </div>
  );
}

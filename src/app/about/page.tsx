import AboutBanner from "@/components/about/about-banner";
import AboutMissionVision from "@/components/about/AboutMissionVision";
import Testimonial from "@/components/about/testimonial";
import Achievement from "@/components/about/achivement";
import WorksSection from "@/components/about/work-section";
import React from "react";


export default function page() {
  return (
    <main>
      <AboutBanner />
      <AboutMissionVision />
      <div className="py-2 lg:py-20">
        <Achievement />
      </div>
      <Testimonial />

      <WorksSection />
    </main>
  );
}

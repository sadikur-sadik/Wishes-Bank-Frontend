import React from "react";
import { AboutHero } from "./AboutHero";
import { OurStory } from "./OurStory";
import { MissionVision } from "./MissionVision";
import { OurValues } from "./OurValues";
import { BankingApproach } from "./BankingApproach";
import { AboutCTA } from "./AboutCTA";
import Footer from "@/app/components/common/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-16">
      <AboutHero />
      <OurStory />
      <MissionVision />
      <OurValues />
      <BankingApproach />
      <AboutCTA />
      <Footer />
    </div>
  );
};

export { About };

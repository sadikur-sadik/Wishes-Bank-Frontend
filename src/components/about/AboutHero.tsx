import React from "react";
import { ChevronDown } from "lucide-react";
import { aboutBrandStatement } from "@/data/about";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-muted/30 via-background to-background py-20 lg:py-32">
      {/* Giant Monogram Background Element */}
      <div className="absolute right-[-2%] top-[-8%] select-none pointer-events-none opacity-[0.03] dark:opacity-[0.05] text-[28rem] font-serif font-black leading-none text-foreground -z-0">
        W
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Eyebrow with Monogram Icon */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-8">
            <span className="font-serif font-black text-sm">W</span>
            <span>{aboutBrandStatement.eyebrow}</span>
          </div>

          {/* Editorial Heading with intentional line breaks */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] mb-8 font-serif">
            {aboutBrandStatement.heading.split("\n").map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </h1>

          {/* Subheading & Description in an asymmetrical layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 items-start">
            <div className="lg:col-span-7">
              <p className="text-lg sm:text-xl font-medium text-foreground/90 leading-relaxed border-l-2 border-primary pl-5">
                {aboutBrandStatement.subheading}
              </p>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {aboutBrandStatement.description}
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-16 flex items-center gap-3 text-xs tracking-widest uppercase text-muted-foreground">
            <a href="#our-story" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
              <span>Explore Our Story</span>
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AboutHero };

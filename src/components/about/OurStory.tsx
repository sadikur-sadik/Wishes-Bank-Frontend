import React from "react";
import Image from "next/image";
import { Building2 } from "lucide-react";
import { aboutStory } from "@/data/about";

const OurStory = () => {
  return (
    <section id="our-story" className="py-20 lg:py-28 border-b border-border/40 bg-muted/15 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest text-primary uppercase">
                {aboutStory.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground font-serif leading-[1.15]">
                {aboutStory.heading}
              </h2>
            </div>

            <div className="space-y-4 text-base text-muted-foreground leading-relaxed pt-2">
              {aboutStory.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Stats Bar */}
            <div className="pt-8 border-t border-border/60 grid grid-cols-3 gap-6">
              {aboutStory.stats.map((s, idx) => (
                <div key={idx}>
                  <p className="text-2xl sm:text-3xl font-extrabold text-foreground font-serif">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 tracking-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Architectural Photograph / Composition */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-border/70 shadow-2xl bg-card aspect-[4/3] group">
              <Image
                src={aboutStory.imageSrc}
                alt={aboutStory.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl backdrop-blur-md bg-background/85 border border-border/50 text-xs text-foreground/90 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary shrink-0" />
                  <span>{aboutStory.caption}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                  HQ Facilities
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { OurStory };

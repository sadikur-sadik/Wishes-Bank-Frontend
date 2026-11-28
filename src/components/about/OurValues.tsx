import React from "react";
import { ShieldCheck, Lock, FileCheck, HeartHandshake, Sparkles } from "lucide-react";
import { aboutPrinciples } from "@/data/about";

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Lock,
  FileCheck,
  HeartHandshake,
  Sparkles,
};

const OurValues = () => {
  return (
    <section className="py-20 lg:py-28 border-b border-border/40 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            {aboutPrinciples.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mt-2 mb-4 font-serif">
            {aboutPrinciples.heading}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {aboutPrinciples.description}
          </p>
        </div>

        {/* Staggered Numbered Editorial List */}
        <div className="divide-y divide-border/70 border-y border-border/70">
          {aboutPrinciples.items.map((principle) => {
            const PrinIcon = iconMap[principle.iconName] || Sparkles;
            return (
              <div
                key={principle.number}
                className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group hover:bg-muted/40 transition-colors px-4 -mx-4 rounded-xl"
              >
                {/* Number & Icon */}
                <div className="md:col-span-2 flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl font-black font-serif text-muted-foreground group-hover:text-primary transition-colors">
                    {principle.number}
                  </span>
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <PrinIcon className="h-4 w-4" />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold text-foreground font-serif">
                    {principle.title}
                  </h3>
                  <p className="text-xs font-medium text-primary mt-1 tracking-wider uppercase">
                    {principle.subtitle}
                  </p>
                </div>

                {/* Description */}
                <div className="md:col-span-6">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { OurValues };

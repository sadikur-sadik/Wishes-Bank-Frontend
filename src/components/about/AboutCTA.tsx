import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutClosing } from "@/data/about";
import AppButton from "@/components/common/AppButton";

const AboutCTA = () => {
  return (
    <section className="py-20 lg:py-28 border-b border-border/40 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            {aboutClosing.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground font-serif leading-[1.18]">
            {aboutClosing.heading}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {aboutClosing.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <AppButton asChild size="lg" variant="default">
              <Link href={aboutClosing.primaryCtaHref}>
                {aboutClosing.primaryCtaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </AppButton>
            <AppButton asChild size="lg" variant="outline">
              <Link href={aboutClosing.secondaryCtaHref}>
                {aboutClosing.secondaryCtaText}
              </Link>
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AboutCTA };

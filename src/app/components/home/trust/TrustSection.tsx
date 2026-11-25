import React from "react";
import {
  ShieldCheck,
  Smartphone,
  Lock,
  HeartHandshake,
  LucideIcon,
} from "lucide-react";
import { TrustPillar } from "@/types/homepage";
import { defaultTrustPillars } from "@/data/homepage-content";
import { MotionStagger, MotionStaggerChild } from "@/components/common/MotionReveal";

const iconMap: Record<TrustPillar["iconName"], LucideIcon> = {
  ShieldCheck,
  Smartphone,
  Lock,
  HeartHandshake,
};

interface TrustSectionProps {
  pillars?: TrustPillar[];
}

export default function TrustSection({
  pillars = defaultTrustPillars,
}: TrustSectionProps) {
  return (
    <section className="relative w-full border-y border-border bg-card/60 backdrop-blur-xs py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = iconMap[pillar.iconName] || ShieldCheck;
            return (
              <MotionStaggerChild
                key={pillar.id}
                className="group flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 hover:bg-muted/50 border border-transparent hover:border-border/60 hover:-translate-y-1 hover:shadow-xs"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xs">
                  <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-tight text-foreground leading-snug">
                    {pillar.title}
                  </span>
                  <span className="text-xs text-muted-foreground leading-tight mt-0.5">
                    {pillar.subtitle}
                  </span>
                </div>
              </MotionStaggerChild>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}

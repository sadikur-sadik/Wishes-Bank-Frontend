"use client";

import React from "react";
import { Users, CreditCard, Activity, Briefcase, LucideIcon } from "lucide-react";
import { StatsSectionData, StatItem } from "@/types/stats-and-digital";
import { defaultStatsData } from "@/data/homepage/stats-and-digital";
import SectionContainer from "@/components/common/SectionContainer";
import CounterNumber from "@/components/common/CounterNumber";
import { MotionStagger, MotionStaggerChild } from "@/components/common/MotionReveal";

const iconMap: Record<StatItem["iconName"], LucideIcon> = {
  Users,
  CreditCard,
  Activity,
  Briefcase,
};

interface StatsSectionProps {
  data?: StatsSectionData;
}

export default function StatsSection({ data = defaultStatsData }: StatsSectionProps) {
  return (
    <SectionContainer
      id="stats"
      className="py-12 sm:py-16 bg-muted/40 border-b border-border"
    >
      <MotionStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {data.stats.map((item, idx) => {
          const Icon = iconMap[item.iconName] || Users;
          return (
            <MotionStaggerChild
              key={item.id}
              className="relative p-6 sm:p-7 rounded-3xl border border-border bg-card shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xs">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-bold font-mono text-muted-foreground/60">
                  0{idx + 1}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  <CounterNumber value={item.value} />
                </div>
                <div className="text-sm font-bold text-foreground leading-snug">
                  {item.label}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>
            </MotionStaggerChild>
          );
        })}
      </MotionStagger>
    </SectionContainer>
  );
}

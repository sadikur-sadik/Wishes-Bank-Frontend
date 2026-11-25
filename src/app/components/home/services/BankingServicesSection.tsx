import React from "react";
import Link from "next/link";
import {
  Wallet,
  PiggyBank,
  ArrowLeftRight,
  Landmark,
  UserCheck,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  LucideIcon,
  Sparkles,
} from "lucide-react";
import {
  BankingServicesSectionData,
  BankingServiceItem,
} from "@/types/services";
import { defaultBankingServicesData } from "@/data/homepage/services";
import { MotionReveal, MotionStagger, MotionStaggerChild } from "@/components/common/MotionReveal";

const iconMap: Record<BankingServiceItem["iconName"], LucideIcon> = {
  Wallet,
  PiggyBank,
  ArrowLeftRight,
  Landmark,
  UserCheck,
  Smartphone,
};

interface BankingServicesSectionProps {
  data?: BankingServicesSectionData;
}

export default function BankingServicesSection({
  data = defaultBankingServicesData,
}: BankingServicesSectionProps) {
  return (
    <section id="services" className="relative w-full py-16 sm:py-24 bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <MotionReveal className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="h-3.5 w-3.5" />
            {data.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            {data.heading}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {data.description}
          </p>
        </MotionReveal>

        {/* 3x2 Services Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.services.map((service) => {
            const Icon = iconMap[service.iconName] || Wallet;
            return (
              <MotionStaggerChild
                key={service.id}
                className="h-full flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 group hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  {/* Card Header: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xs">
                      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    {service.badge && (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features Bullet List */}
                  <div className="space-y-2 pt-2 border-t border-border/60">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-5 border-t border-border mt-5">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </MotionStaggerChild>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}

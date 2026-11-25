import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, TrendingUp } from "lucide-react";
import AppButton from "@/components/common/AppButton";
import SectionContainer from "@/components/common/SectionContainer";
import { MotionReveal } from "@/components/common/MotionReveal";
import { BankingOverviewData } from "@/types/homepage";
import { defaultBankingOverviewData } from "@/data/homepage-content";

interface BankingOverviewSectionProps {
  data?: BankingOverviewData;
}

export default function BankingOverviewSection({
  data = defaultBankingOverviewData,
}: BankingOverviewSectionProps) {
  return (
    <SectionContainer id="overview" className="py-16 sm:py-24 overflow-hidden bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Content Column */}
        <MotionReveal className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
              {data.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              {data.heading}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {data.description}
            </p>
          </div>

          {/* Key Benefits List */}
          <div className="space-y-3.5 pt-2">
            {data.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-1">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-normal">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Statistics Bar */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            {data.stats.map((stat, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <AppButton
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 h-11 rounded-xl shadow-xs"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              <Link href={data.ctaHref}>{data.ctaText}</Link>
            </AppButton>
            <AppButton
              asChild
              variant="outline"
              className="border-border hover:bg-muted font-semibold px-6 h-11 rounded-xl"
            >
              <Link href={data.secondaryCtaHref}>{data.secondaryCtaText}</Link>
            </AppButton>
          </div>
        </MotionReveal>

        {/* Right Visual Image Column */}
        <MotionReveal delay={0.15} className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Background Glow */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-primary/20 via-emerald-500/10 to-transparent blur-2xl opacity-70" />

            {/* Main Image Container */}
            <div className="relative rounded-3xl border border-border bg-card overflow-hidden shadow-xl">
              <Image
                src={data.imageSrc}
                alt={data.imageAlt}
                width={640}
                height={520}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.02]"
                priority={false}
              />
            </div>

            {/* Floating Stat Card */}
            <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 p-4 rounded-2xl bg-card/95 border border-border shadow-xl backdrop-blur-md max-w-[220px] hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-xs">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground font-medium">
                    High Yield APY
                  </span>
                  <span className="text-base font-bold text-foreground">
                    Up to 7.5%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </SectionContainer>
  );
}

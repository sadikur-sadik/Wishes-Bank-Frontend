import React from "react";
import Link from "next/link";
import {
  Eye,
  Clock,
  SlidersHorizontal,
  GlobeLock,
  UserPlus,
  ShieldCheck,
  WalletCards,
  ArrowRight,
  LucideIcon,
  Sparkles,
} from "lucide-react";
import SectionContainer from "@/components/common/SectionContainer";
import SectionHeading from "@/components/common/SectionHeading";
import AppButton from "@/components/common/AppButton";
import { MotionReveal, MotionStagger, MotionStaggerChild } from "@/components/common/MotionReveal";
import {
  DigitalBankingSectionData,
  DigitalBankingFeature,
  HowItWorksStep,
} from "@/types/stats-and-digital";
import { defaultDigitalBankingData } from "@/data/homepage/stats-and-digital";

const featureIconMap: Record<DigitalBankingFeature["iconName"], LucideIcon> = {
  Eye,
  Clock,
  SlidersHorizontal,
  GlobeLock,
};

const stepIconMap: Record<HowItWorksStep["iconName"], LucideIcon> = {
  UserPlus,
  ShieldCheck,
  WalletCards,
};

interface DigitalBankingSectionProps {
  data?: DigitalBankingSectionData;
}

export default function DigitalBankingSection({
  data = defaultDigitalBankingData,
}: DigitalBankingSectionProps) {
  return (
    <SectionContainer
      id="digital-banking"
      className="py-16 sm:py-24 bg-muted/20 border-t border-border"
    >
      <div className="space-y-16 lg:space-y-20">
        {/* Part 1: Digital Banking Capabilities */}
        <div className="space-y-12">
          <MotionReveal>
            <SectionHeading
              eyebrow={data.eyebrow}
              eyebrowIcon={<Sparkles className="h-3.5 w-3.5" />}
              title={data.heading}
              description={data.description}
              align="center"
            />
          </MotionReveal>

          <MotionStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.features.map((feat, idx) => {
              const Icon = featureIconMap[feat.iconName] || Eye;
              return (
                <MotionStaggerChild
                  key={idx}
                  className="rounded-3xl border border-border bg-card p-6 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-3 group hover:-translate-y-1.5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xs">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </MotionStaggerChild>
              );
            })}
          </MotionStagger>
        </div>

        {/* Part 2: How It Works in 3 Easy Steps */}
        <MotionReveal delay={0.1} className="rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/10 via-card to-card p-8 sm:p-12 shadow-lg space-y-10">
          <SectionHeading
            eyebrow={data.stepsEyebrow}
            eyebrowIcon={<ShieldCheck className="h-3.5 w-3.5" />}
            title={data.stepsHeading}
            description={data.stepsDescription}
            align="center"
          />

          <MotionStagger className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {data.steps.map((step) => {
              const StepIcon = stepIconMap[step.iconName] || UserPlus;
              return (
                <MotionStaggerChild
                  key={step.stepNumber}
                  className="relative p-6 rounded-2xl bg-card/90 border border-border shadow-xs hover:border-primary/50 transition-all flex flex-col items-center text-center space-y-3 group hover:-translate-y-1"
                >
                  {/* Step Number Badge */}
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold border border-primary/20">
                    {step.stepNumber}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <StepIcon className="h-6 w-6" />
                  </div>

                  <h4 className="text-lg font-bold text-foreground tracking-tight">
                    {step.title}
                  </h4>

                  <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </MotionStaggerChild>
              );
            })}
          </MotionStagger>

          <div className="flex justify-center pt-2">
            <AppButton
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-11 rounded-xl shadow-xs"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              <Link href="/register">Open Your Account Now</Link>
            </AppButton>
          </div>
        </MotionReveal>
      </div>
    </SectionContainer>
  );
}

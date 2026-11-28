import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  FileText,
  ShieldCheck,
  BadgeCheck,
  WalletCards,
  BarChart3,
  CalendarClock,
  SendHorizontal,
  SearchCheck,
  CheckCircle2,
  ArrowDownToLine,
  Clock,
  FileSpreadsheet,
  Calendar,
  TrendingDown,
  Receipt,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import {
  loanHeroData,
  loanOptionsData,
  loanBenefitsData,
  loanTimelineSteps,
  loanManagementFeatures,
  loanCtaData,
} from "@/data/loans";
import AppButton from "@/components/common/AppButton";
import Footer from "@/app/components/common/Footer";

export const metadata: Metadata = {
  title: "Loans & Financing | Wishes Bank LTD",
  description:
    "Explore transparent loan solutions designed to help you achieve your personal and professional ambitions. Simple online application, transparent review, and live repayment tracking.",
};

const iconMap: Record<string, React.ElementType> = {
  FileText,
  ShieldCheck,
  BadgeCheck,
  WalletCards,
  BarChart3,
  CalendarClock,
  SendHorizontal,
  SearchCheck,
  CheckCircle2,
  ArrowDownToLine,
  Clock,
  FileSpreadsheet,
  Calendar,
  TrendingDown,
  Receipt,
};

export default function LoansPage() {
  const featuredOption = loanOptionsData.options.find((opt) => opt.featured) || loanOptionsData.options[0];
  const secondaryOptions = loanOptionsData.options.filter((opt) => !opt.featured);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-16">
      {/* SECTION 1: HERO / COMPACT INTRO */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-muted/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase w-fit">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{loanHeroData.eyebrow}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                {loanHeroData.title}
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {loanHeroData.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <AppButton asChild size="lg" variant="default">
                  <a href={loanHeroData.primaryCtaHref}>
                    {loanHeroData.primaryCtaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </AppButton>
                <AppButton asChild size="lg" variant="outline">
                  <a href={loanHeroData.secondaryCtaHref}>
                    {loanHeroData.secondaryCtaText}
                  </a>
                </AppButton>
              </div>

              {/* Trust markers */}
              <div className="pt-6 border-t border-border/50 grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">100%</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Digital Workflow</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">Direct</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Account Credit</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">Real-Time</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Repayment Ledger</p>
                </div>
              </div>
            </div>

            {/* Right Portrait Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px] aspect-[9/11] rounded-2xl overflow-hidden border border-border/80 shadow-2xl bg-muted group">
                <Image
                  src={loanHeroData.imageSrc}
                  alt={loanHeroData.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md bg-background/80 border border-border/40 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-primary/20 text-primary">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Institutional Integrity</p>
                      <p className="text-[11px] text-muted-foreground">Regulated & auditable review steps</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: EXPLORE LOAN OPTIONS (EDITORIAL ASYMMETRIC LAYOUT) */}
      <section id="loan-options" className="py-20 md:py-28 border-b border-border/40 bg-muted/20 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              {loanOptionsData.heading.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-2 mb-4">
              {loanOptionsData.heading.title}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {loanOptionsData.heading.description}
            </p>
          </div>

          {/* Asymmetric layout: Large focal card on left (60%), 2 stacked cards on right (40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Focal Option */}
            <div className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-card border-2 border-primary/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-36 h-36 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground uppercase tracking-wider">
                    {featuredOption.tag}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">Standard Program</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-4">
                  {featuredOption.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {featuredOption.description}
                </p>

                <div className="space-y-3.5 mb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Program Highlights:</p>
                  {featuredOption.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 p-0.5 rounded-full bg-primary/20 text-primary">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-foreground/90 leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Recommended for: </span>
                  {featuredOption.audience}
                </div>
                <AppButton asChild variant="default">
                  <Link href={featuredOption.ctaHref}>
                    {featuredOption.ctaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </AppButton>
              </div>
            </div>

            {/* Secondary Options Stacked */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {secondaryOptions.map((opt) => (
                <div
                  key={opt.id}
                  className="flex-1 p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="text-xs font-bold text-primary tracking-wider uppercase">
                        {opt.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground mb-2">
                      {opt.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {opt.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {opt.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-foreground/80">
                          <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground line-clamp-1 mr-2">{opt.audience}</span>
                    <AppButton asChild variant="outline" size="sm">
                      <Link href={opt.ctaHref}>
                        {opt.ctaText}
                      </Link>
                    </AppButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE WISHES BANK LOANS? */}
      <section className="py-20 md:py-28 border-b border-border/40 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              {loanBenefitsData.heading.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-2 mb-4">
              {loanBenefitsData.heading.title}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {loanBenefitsData.heading.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanBenefitsData.benefits.map((benefit) => {
              const IconComp = iconMap[benefit.iconName] || ShieldCheck;
              return (
                <div
                  key={benefit.id}
                  className="p-6 sm:p-8 rounded-xl bg-card border border-border/70 hover:border-primary/50 transition-colors shadow-sm group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW THE APPLICATION PROCESS WORKS (TIMELINE) */}
      <section id="how-it-works" className="py-20 md:py-28 border-b border-border/40 bg-muted/20 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              {loanTimelineSteps.heading.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-2 mb-4">
              {loanTimelineSteps.heading.title}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {loanTimelineSteps.heading.description}
            </p>
          </div>

          {/* Timeline: Horizontal on Desktop, Vertical on Mobile */}
          <div className="relative">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-1/4 left-[8%] right-[8%] h-0.5 border-t-2 border-dashed border-border/80 -z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {loanTimelineSteps.steps.map((stepItem) => {
                const StepIcon = iconMap[stepItem.iconName] || SendHorizontal;
                return (
                  <div
                    key={stepItem.step}
                    className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/70 shadow-sm relative group"
                  >
                    {/* Number Badge */}
                    <div className="w-12 h-12 rounded-full bg-background border-2 border-primary text-primary font-extrabold text-sm flex items-center justify-center mb-4 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      {stepItem.step}
                    </div>

                    {/* Step Icon */}
                    <div className="p-3 rounded-xl bg-primary/10 text-primary mb-3">
                      <StepIcon className="h-6 w-6" />
                    </div>

                    <h3 className="text-lg font-bold text-card-foreground">
                      {stepItem.title}
                    </h3>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      {stepItem.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {stepItem.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: LOAN MANAGEMENT INFORMATION (DASHBOARD BLUEPRINT) */}
      <section className="py-20 md:py-28 border-b border-border/40 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text features */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold tracking-widest text-primary uppercase">
                  {loanManagementFeatures.heading.eyebrow}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-2 mb-4">
                  {loanManagementFeatures.heading.title}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {loanManagementFeatures.heading.description}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {loanManagementFeatures.features.map((feature, idx) => {
                  const FeatIcon = iconMap[feature.iconName] || Clock;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-3.5 rounded-xl border border-border/60 bg-muted/20">
                      <div className="p-2 rounded-lg bg-primary/15 text-primary shrink-0 mt-0.5">
                        <FeatIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Mock Dashboard Blueprint Card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-6 border-b border-border/60 mb-6">
                  <div>
                    <span className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Account Facility</span>
                    <h3 className="text-lg font-bold text-card-foreground">Personal Loan Account</h3>
                    <p className="text-xs text-muted-foreground">#LN-8842-WB</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    Active & Disbursed
                  </span>
                </div>

                {/* Balance & Progress */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-muted-foreground">Remaining Obligation</p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-foreground">$14,250.00</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Sanctioned Principal</p>
                      <p className="text-sm font-semibold text-foreground">$20,000.00</p>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div>
                    <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "28.75%" }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5">
                      <span>28.75% Repaid</span>
                      <span>14 of 48 Installments</span>
                    </div>
                  </div>
                </div>

                {/* Next Installment & Status */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-muted/40 border border-border/60 mb-6">
                  <div>
                    <p className="text-[11px] text-muted-foreground">Next Scheduled Due</p>
                    <p className="text-sm font-bold text-foreground">Dec 15, 2026</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">$485.00 / month</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Auto-Deduction</p>
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Enabled</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Primary Checking</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-between">
                  <span className="text-xs text-primary font-medium">Detailed schedule and receipts available in portal</span>
                  <Link href="/login" className="text-xs font-bold text-primary hover:underline">
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FINAL CTA */}
      <section className="py-20 border-b border-border/40 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-3xl border border-primary/30 bg-card p-8 sm:p-14 text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              {loanCtaData.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-card-foreground mt-3 mb-4">
              {loanCtaData.title}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              {loanCtaData.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <AppButton asChild size="lg" variant="default">
                <Link href={loanCtaData.primaryCtaHref}>
                  {loanCtaData.primaryCtaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </AppButton>
              <AppButton asChild size="lg" variant="outline">
                <Link href={loanCtaData.secondaryCtaHref}>
                  {loanCtaData.secondaryCtaText}
                </Link>
              </AppButton>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  WalletCards,
  ArrowLeftRight,
  History,
  ArrowDownToLine,
  FileText,
  PiggyBank,
  Wallet,
  Building2,
  UserPlus,
  LogIn,
  LineChart,
  Lock,
  ShieldCheck,
  UserCheck,
  KeyRound,
  DatabaseZap,
  LucideIcon,
} from "lucide-react";
import SectionContainer from "@/components/common/SectionContainer";
import AppButton from "@/components/common/AppButton";
import {
  MotionReveal,
  MotionStagger,
  MotionStaggerChild,
} from "@/components/common/MotionReveal";
import Footer from "@/app/components/common/Footer";
import { personalBankingData } from "@/data/personal-banking";

const benefitIconMap: Record<string, LucideIcon> = {
  SlidersHorizontal,
  WalletCards,
  ArrowLeftRight,
  History,
  ArrowDownToLine,
  FileText,
};

const accountTypeIconMap: Record<string, LucideIcon> = {
  PiggyBank,
  Wallet,
  Building2,
};

const stepIconMap: Record<string, LucideIcon> = {
  UserPlus,
  LogIn,
  LineChart,
};

const securityIconMap: Record<string, LucideIcon> = {
  Lock,
  ShieldCheck,
  UserCheck,
  KeyRound,
  DatabaseZap,
};

export const metadata = {
  title: "Personal Banking — Wishes Bank LTD",
  description:
    "Everyday banking solutions designed to manage multiple accounts, transfer funds, and oversee finances seamlessly.",
};

export default function PersonalBankingPage() {
  const data = personalBankingData;

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* ── Section 1: Hero Section ── */}
      <section className="relative w-full border-b border-border bg-gradient-to-b from-primary/5 via-background to-background py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <MotionReveal className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
                  <Sparkles className="h-3.5 w-3.5" />
                  {data.hero.eyebrow}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                  {data.hero.title}
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {data.hero.description}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <AppButton
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 h-11 rounded-xl shadow-xs"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  <Link href={data.hero.primaryCtaHref}>{data.hero.primaryCtaText}</Link>
                </AppButton>
                <AppButton
                  asChild
                  variant="outline"
                  className="border-border hover:bg-muted font-semibold px-6 h-11 rounded-xl"
                >
                  <Link href={data.hero.secondaryCtaHref}>{data.hero.secondaryCtaText}</Link>
                </AppButton>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 border-t border-border flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Zero minimum monthly charges</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Instant internal settlements</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Hardware & PIN verified</span>
                </div>
              </div>
            </MotionReveal>

            {/* Right Visual Image Column */}
            <MotionReveal delay={0.15} className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background Glow */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-primary/20 via-emerald-500/10 to-transparent blur-2xl opacity-70" />

                {/* Main Visual Frame */}
                <div className="relative rounded-3xl border border-border bg-card p-2 sm:p-3 overflow-hidden shadow-xl">
                  <div className="relative rounded-2xl overflow-hidden aspect-4/3 w-full bg-muted">
                    <Image
                      src={data.hero.imageSrc}
                      alt={data.hero.imageAlt}
                      width={640}
                      height={520}
                      priority
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* ── Section 2: Personal Banking Benefits ── */}
      <SectionContainer id="benefits" className="py-16 sm:py-24 border-b border-border">
        <div className="space-y-12 sm:space-y-16">
          <MotionReveal className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="h-3.5 w-3.5" />
              {data.benefitsEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              {data.benefitsTitle}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {data.benefitsDescription}
            </p>
          </MotionReveal>

          {/* Benefits Grid (3 columns desktop, 2 columns tablet, 1 column mobile) */}
          <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {data.benefits.map((benefit) => {
              const Icon = benefitIconMap[benefit.iconName] || SlidersHorizontal;
              return (
                <MotionStaggerChild
                  key={benefit.id}
                  className="h-full flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 group hover:-translate-y-1.5"
                >
                  <div className="space-y-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xs">
                      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </MotionStaggerChild>
              );
            })}
          </MotionStagger>
        </div>
      </SectionContainer>

      {/* ── Section 3: Account Types ── */}
      <SectionContainer id="account-types" className="py-16 sm:py-24 bg-muted/20 border-b border-border">
        <div className="space-y-12 sm:space-y-16">
          <MotionReveal className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
              <WalletCards className="h-3.5 w-3.5" />
              {data.accountTypesEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              {data.accountTypesTitle}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {data.accountTypesDescription}
            </p>
          </MotionReveal>

          {/* 3 Account Types Cards */}
          <MotionStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {data.accountTypes.map((item) => {
              const Icon = accountTypeIconMap[item.iconName] || Wallet;
              return (
                <MotionStaggerChild
                  key={item.id}
                  className="h-full flex flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-xs hover:shadow-lg hover:border-primary/50 transition-all duration-300 group relative hover:-translate-y-1.5"
                >
                  <div className="space-y-5">
                    {/* Header: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xs">
                        <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      {item.badge && (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Title & Tagline */}
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs font-medium text-primary">
                        {item.tagline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>

                    {/* Features Checklist */}
                    <div className="space-y-2 pt-3 border-t border-border">
                      {item.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-medium text-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-6 border-t border-border mt-6">
                    <AppButton
                      asChild
                      variant="outline"
                      className="w-full justify-center border-border hover:border-primary hover:bg-primary/5 text-foreground font-semibold h-10 rounded-xl"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      <Link href={item.ctaHref}>{item.ctaText}</Link>
                    </AppButton>
                  </div>
                </MotionStaggerChild>
              );
            })}
          </MotionStagger>
        </div>
      </SectionContainer>

      {/* ── Section 4: How Personal Banking Works ── */}
      <SectionContainer id="how-it-works" className="py-16 sm:py-24 border-b border-border">
        <div className="space-y-12 sm:space-y-16">
          <MotionReveal className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
              <LineChart className="h-3.5 w-3.5" />
              {data.howItWorksEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              {data.howItWorksTitle}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {data.howItWorksDescription}
            </p>
          </MotionReveal>

          {/* 3 Step Connected Cards */}
          <MotionStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
            {data.steps.map((step) => {
              const StepIcon = stepIconMap[step.iconName] || UserPlus;
              return (
                <MotionStaggerChild
                  key={step.step}
                  className="relative p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/50 transition-all flex flex-col items-center text-center space-y-3 group hover:-translate-y-1"
                >
                  {/* Step Number Badge */}
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold border border-primary/20">
                    {step.step}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <StepIcon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </MotionStaggerChild>
              );
            })}
          </MotionStagger>
        </div>
      </SectionContainer>

      {/* ── Section 5: Security and Protection ── */}
      <SectionContainer id="security" className="py-16 sm:py-24 bg-muted/20 border-b border-border">
        <div className="space-y-12 sm:space-y-16">
          <MotionReveal className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              {data.securityEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              {data.securityTitle}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {data.securityDescription}
            </p>
          </MotionReveal>

          {/* 5 Security Capability Cards */}
          <MotionStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.securityFeatures.map((sec) => {
              const Icon = securityIconMap[sec.iconName] || ShieldCheck;
              return (
                <MotionStaggerChild
                  key={sec.id}
                  className="rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-primary/40 transition-all flex items-start gap-4 hover:-translate-y-1"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary mt-0.5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-foreground">
                      {sec.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {sec.description}
                    </p>
                  </div>
                </MotionStaggerChild>
              );
            })}
          </MotionStagger>
        </div>
      </SectionContainer>

      {/* ── Section 6: Final Call to Action ── */}
      <section className="relative w-full py-16 sm:py-24 bg-background border-b border-border overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <MotionReveal className="rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/10 via-card to-card p-8 sm:p-12 shadow-lg text-center space-y-6">
            <div className="space-y-3 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="h-3.5 w-3.5" />
                GET STARTED
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                {data.cta.title}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {data.cta.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <AppButton
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-11 rounded-xl shadow-xs"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                <Link href={data.cta.primaryBtnHref}>{data.cta.primaryBtnText}</Link>
              </AppButton>
              <AppButton
                asChild
                variant="outline"
                className="border-border hover:bg-muted font-semibold px-8 h-11 rounded-xl"
              >
                <Link href={data.cta.secondaryBtnHref}>{data.cta.secondaryBtnText}</Link>
              </AppButton>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* ── Section 7: Footer ── */}
      <Footer />
    </div>
  );
}

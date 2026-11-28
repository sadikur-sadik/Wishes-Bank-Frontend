import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowRight,
  Sparkles,
  ArrowLeftRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  RefreshCcw,
  SendHorizontal,
  FileSpreadsheet,
  Receipt,
  BadgeCheck,
  WalletCards,
  ShieldAlert,
  Gauge,
  FileCheck,
  UserCheck,
  SlidersHorizontal,
  KeyRound,
  Check,
  Zap,
} from "lucide-react";

import {
  transferHeroData,
  transferJourneySteps,
  transferCapabilities,
  transferSecurityData,
  transferCtaData,
} from "@/data/money-transfer";
import AppButton from "@/components/common/AppButton";
import Footer from "@/app/components/common/Footer";

export const metadata: Metadata = {
  title: "Money Transfer | Wishes Bank LTD",
  description:
    "Move money simply and securely. Transfer between your own Wishes Bank accounts or send funds to any peer with instant settlement and transaction PIN protection.",
};

const iconMap: Record<string, React.ElementType> = {
  UserCheck,
  SlidersHorizontal,
  KeyRound,
  CheckCircle2,
  RefreshCcw,
  SendHorizontal,
  FileSpreadsheet,
  Receipt,
  BadgeCheck,
  WalletCards,
  ShieldAlert,
  Gauge,
  Lock,
  FileCheck,
};

export default function MoneyTransferPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-16">
      {/* SECTION 1: TRANSFER SHOWCASE (WIDE FINTECH DISPLAY, ADAPTS TO LIGHT AND DARK THEMES) */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background text-foreground dark:from-[#0a1411] dark:via-[#0d1c17] dark:to-background dark:text-white py-16 lg:py-24">
        {/* Glow backdrop effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-primary/10 dark:bg-primary/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary dark:border-emerald-500/30 dark:bg-emerald-950/60 dark:text-emerald-400 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5 text-primary dark:text-emerald-400" />
              <span>{transferHeroData.eyebrow}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground dark:text-white leading-[1.12]">
              {transferHeroData.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground dark:text-emerald-100/70 max-w-2xl mx-auto leading-relaxed">
              {transferHeroData.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <AppButton asChild size="lg" variant="default" className="shadow-lg shadow-primary/25">
                <Link href={transferHeroData.primaryCtaHref}>
                  {transferHeroData.primaryCtaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </AppButton>
              <AppButton
                asChild
                size="lg"
                variant="outline"
                className="border-border bg-card/60 text-foreground hover:bg-muted dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-emerald-950 backdrop-blur-sm shadow-xs transition-all font-medium"
              >
                <a href={transferHeroData.secondaryCtaHref}>
                  {transferHeroData.secondaryCtaText}
                </a>
              </AppButton>
            </div>
          </div>

          {/* Transfer Visual Showcase Card (Theme-Aware Fintech Simulation UI) */}
          <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card dark:border-emerald-500/30 dark:bg-slate-950/80 p-6 sm:p-10 shadow-xl backdrop-blur-xl relative">
            <div className="flex items-center justify-between pb-6 border-b border-border dark:border-emerald-900/40 mb-8">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-emerald-400">
                  Instant Clearing Network
                </span>
              </div>
              <span className="text-xs text-muted-foreground dark:text-emerald-200/50 font-mono">0.00% Intra-Bank Fee</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
              {/* Sender Account Card */}
              <div className="md:col-span-5 rounded-xl border border-border bg-muted/40 dark:border-emerald-500/20 dark:bg-emerald-950/30 p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground dark:text-emerald-300/70 font-semibold">
                    Origin Account
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-primary/10 text-primary dark:bg-emerald-900/60 dark:text-emerald-300 font-medium">
                    Primary Checking
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground dark:text-white">Austin R. Vance</p>
                  <p className="text-xs text-muted-foreground dark:text-emerald-200/60 font-mono mt-0.5">•••• 4892</p>
                </div>
                <div className="pt-2 border-t border-border dark:border-emerald-900/40 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] text-muted-foreground dark:text-emerald-300/60 uppercase">Cleared Balance</span>
                    <p className="text-base font-bold text-foreground dark:text-emerald-200">$24,850.00</p>
                  </div>
                  <span className="text-xs font-bold text-rose-500 dark:text-rose-400 font-mono">-$1,250.00</span>
                </div>
              </div>

              {/* Connecting Transfer Flow Indicator */}
              <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0">
                <div className="w-10 h-10 rounded-full border border-primary/30 bg-primary/10 text-primary dark:border-emerald-400/40 dark:bg-emerald-900/40 dark:text-emerald-400 flex items-center justify-center shadow-md">
                  <ArrowLeftRight className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-mono text-primary dark:text-emerald-400 mt-1 uppercase tracking-tight">Instant</span>
              </div>

              {/* Recipient Account Card */}
              <div className="md:col-span-5 rounded-xl border border-border bg-muted/40 dark:border-emerald-500/20 dark:bg-emerald-950/30 p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground dark:text-emerald-300/70 font-semibold">
                    Beneficiary Account
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-primary/10 text-primary dark:bg-emerald-900/60 dark:text-emerald-300 font-medium">
                    Verified Holder
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground dark:text-white">Elena Croft</p>
                  <p className="text-xs text-muted-foreground dark:text-emerald-200/60 font-mono mt-0.5">•••• 7304</p>
                </div>
                <div className="pt-2 border-t border-border dark:border-emerald-900/40 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] text-muted-foreground dark:text-emerald-300/60 uppercase">Received Credit</span>
                    <p className="text-base font-bold text-primary dark:text-emerald-400">+$1,250.00</p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-primary dark:text-emerald-300 font-semibold">
                    <Check className="h-3.5 w-3.5 text-primary dark:text-emerald-400" />
                    <span>Matched</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Footer inside Showcase Card */}
            <div className="mt-8 pt-5 border-t border-border dark:border-emerald-900/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-muted-foreground dark:text-emerald-200/70">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary dark:text-emerald-400 shrink-0" />
                <span>Protected by 4-Digit Security PIN</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary dark:text-emerald-400 shrink-0" />
                <span>Double-Entry Atomic Settlement</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary dark:text-emerald-400 shrink-0" />
                <span>Zero Latency Intra-Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRANSFER JOURNEY (PROGRESS STEPS: HORIZONTAL DESKTOP, VERTICAL MOBILE) */}
      <section id="transfer-flow" className="py-20 md:py-28 border-b border-border/40 bg-muted/20 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              {transferJourneySteps.heading.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-2 mb-4">
              {transferJourneySteps.heading.title}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {transferJourneySteps.heading.description}
            </p>
          </div>

          {/* Interactive Steps Visual */}
          <div className="relative">
            {/* Desktop continuous connecting rail */}
            <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-1 bg-border rounded-full -z-0">
              <div className="h-full bg-gradient-to-r from-primary/30 via-primary to-primary/30 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {transferJourneySteps.steps.map((item) => {
                const StepIcon = iconMap[item.iconName] || UserCheck;
                return (
                  <div
                    key={item.step}
                    className="flex flex-col items-center text-center p-6 sm:p-7 rounded-2xl bg-card border border-border/80 shadow-sm relative group hover:border-primary/50 transition-all"
                  >
                    {/* Circle Indicator */}
                    <div className="w-14 h-14 rounded-full bg-background border-2 border-primary text-primary font-black text-sm flex items-center justify-center mb-5 shadow-md group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      {item.step}
                    </div>

                    <div className="p-3 rounded-xl bg-primary/10 text-primary mb-3">
                      <StepIcon className="h-6 w-6" />
                    </div>

                    <h3 className="text-lg font-bold text-card-foreground">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      {item.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TRANSFER CAPABILITIES (ASYMMETRIC BENTO GRID) */}
      <section className="py-20 md:py-28 border-b border-border/40 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              {transferCapabilities.heading.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-2 mb-4">
              {transferCapabilities.heading.title}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {transferCapabilities.heading.description}
            </p>
          </div>

          {/* Asymmetric Bento Layout (7-col / 5-col / 5-col / 7-col) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {transferCapabilities.items.map((item) => {
              const CapIcon = iconMap[item.iconName] || RefreshCcw;
              return (
                <div
                  key={item.id}
                  className={`${item.gridSpan} p-8 sm:p-10 rounded-2xl bg-card border border-border/80 shadow-md hover:shadow-lg transition-all flex flex-col justify-between group relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-primary/15 text-primary border border-primary/20 uppercase tracking-wider">
                        {item.badge}
                      </span>
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                        <CapIcon className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="space-y-2.5 mb-6">
                      {item.points.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Included on all verified customer accounts</span>
                    <span className="font-semibold text-primary">Instant Setup</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: SECURITY AND VALIDATION (DEEP ATOMICITY EMPHASIS) */}
      <section className="py-20 md:py-28 border-b border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              {transferSecurityData.heading.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-2 mb-4">
              {transferSecurityData.heading.title}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {transferSecurityData.heading.description}
            </p>
          </div>

          {/* 6 Validation Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {transferSecurityData.checks.map((check, idx) => {
              const SecIcon = iconMap[check.iconName] || ShieldCheck;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-card border border-border/70 hover:border-primary/40 transition-colors shadow-sm"
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-fit mb-4">
                    <SecIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-card-foreground mb-1.5">
                    {check.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {check.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Double-Entry Atomicity Callout Banner */}
          <div className="max-w-4xl mx-auto rounded-2xl border-2 border-emerald-500/40 bg-card p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="p-4 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-card-foreground">
                  {transferSecurityData.atomicityNote.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {transferSecurityData.atomicityNote.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FINAL CTA */}
      <section className="py-20 border-b border-border/40 bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-3xl border border-primary/30 bg-card p-8 sm:p-14 text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              {transferCtaData.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-card-foreground mt-3 mb-4">
              {transferCtaData.title}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              {transferCtaData.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <AppButton asChild size="lg" variant="default">
                <Link href={transferCtaData.primaryCtaHref}>
                  {transferCtaData.primaryCtaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </AppButton>
              <AppButton asChild size="lg" variant="outline">
                <Link href={transferCtaData.secondaryCtaHref}>
                  {transferCtaData.secondaryCtaText}
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

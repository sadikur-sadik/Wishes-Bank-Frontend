import React from "react";
import Image from "next/image";
import {
  KeyRound,
  ShieldAlert,
  Fingerprint,
  DatabaseZap,
  ShieldCheck,
  LucideIcon,
  CheckCircle,
} from "lucide-react";
import { SecuritySectionData, SecurityFeature } from "@/types/homepage";
import { defaultSecurityData } from "@/data/homepage-content";
import { MotionReveal, MotionStagger, MotionStaggerChild } from "@/components/common/MotionReveal";

const iconMap: Record<SecurityFeature["iconName"], LucideIcon> = {
  KeyRound,
  ShieldAlert,
  Fingerprint,
  DatabaseZap,
};

interface SecuritySectionProps {
  data?: SecuritySectionData;
}

export default function SecuritySection({
  data = defaultSecurityData,
}: SecuritySectionProps) {
  return (
    <section id="security" className="relative w-full py-16 sm:py-24 bg-muted/30 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <MotionReveal className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            {data.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            {data.heading}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {data.description}
          </p>
        </MotionReveal>

        {/* Multi-Faceted Visual Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Security Image Card */}
          <MotionReveal delay={0.05} className="lg:col-span-4 relative flex flex-col rounded-3xl border border-border bg-card overflow-hidden shadow-lg group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-4/3 w-full overflow-hidden">
              <Image
                src={data.primaryImage.src}
                alt={data.primaryImage.alt}
                width={500}
                height={380}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-end">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Biometric & Passkey Ready
              </span>
              <h3 className="text-lg font-bold text-foreground mt-1">
                {data.primaryImage.caption}
              </h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Hardware-backed authenticator integration prevents account takeover attacks.
              </p>
            </div>
          </MotionReveal>

          {/* Central Feature Cards Area */}
          <MotionStagger className="lg:col-span-4 grid grid-cols-1 gap-4">
            {data.features.map((feat) => {
              const Icon = iconMap[feat.iconName] || KeyRound;
              return (
                <MotionStaggerChild
                  key={feat.id}
                  className="p-5 rounded-2xl border border-border bg-card hover:bg-card/80 transition-all duration-200 shadow-xs flex items-start gap-4 hover:-translate-y-0.5 hover:border-primary/40"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary mt-0.5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-foreground">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </MotionStaggerChild>
              );
            })}
          </MotionStagger>

          {/* Right Security Image Card */}
          <MotionReveal delay={0.15} className="lg:col-span-4 relative flex flex-col rounded-3xl border border-border bg-card overflow-hidden shadow-lg group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-4/3 w-full overflow-hidden">
              <Image
                src={data.secondaryImage.src}
                alt={data.secondaryImage.alt}
                width={500}
                height={380}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-end">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Continuous Governance
              </span>
              <h3 className="text-lg font-bold text-foreground mt-1">
                {data.secondaryImage.caption}
              </h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Bank officers actively monitor suspicious velocity surges and prevent unauthorized access.
              </p>
            </div>
          </MotionReveal>
        </div>

        {/* Security Trust Badges Strip */}
        <MotionReveal delay={0.2} className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-xs flex flex-wrap items-center justify-around gap-4 text-xs font-semibold text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>Encrypted Ledger Integrity</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>Strict RBAC Permission Isolation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>Atomic Balance Transaction Checks</span>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Headphones,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import AppButton from "@/components/common/AppButton";
import SectionContainer from "@/components/common/SectionContainer";
import { MotionReveal, MotionStagger, MotionStaggerChild } from "@/components/common/MotionReveal";
import { ContactSectionData, ContactChannel } from "@/types/homepage-extra";
import { defaultContactData } from "@/data/homepage/team-and-contact";

const iconMap: Record<ContactChannel["iconName"], LucideIcon> = {
  Mail,
  Phone,
  MapPin,
  Clock,
};

interface ContactSectionProps {
  data?: ContactSectionData;
}

export default function ContactSection({
  data = defaultContactData,
}: ContactSectionProps) {
  return (
    <SectionContainer
      id="contact"
      className="py-16 sm:py-24 bg-muted/30 border-t border-border"
    >
      <div className="space-y-12 sm:space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Visual Column */}
          <MotionReveal delay={0.1} className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glow Accent */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-primary/20 via-emerald-500/10 to-transparent blur-2xl opacity-70" />

              <div className="relative rounded-3xl border border-border bg-card overflow-hidden shadow-xl">
                <Image
                  src={data.imageSrc}
                  alt={data.imageAlt}
                  width={560}
                  height={520}
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 p-4 rounded-2xl bg-card/95 border border-border shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-semibold text-foreground">
                  Support Specialists Online
                </span>
              </div>
            </div>
          </MotionReveal>

          {/* Right Content Column */}
          <MotionReveal className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
                <Headphones className="h-3.5 w-3.5" />
                {data.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                {data.heading}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Channels Grid */}
            <MotionStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {data.channels.map((ch, idx) => {
                const Icon = iconMap[ch.iconName] || Mail;
                return (
                  <MotionStaggerChild
                    key={idx}
                    className="p-4 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors shadow-xs space-y-2 flex flex-col justify-between hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary mt-0.5">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {ch.title}
                        </h4>
                        <p className="text-sm font-semibold text-foreground break-all">
                          {ch.value}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                      <span className="text-muted-foreground text-[11px]">
                        {ch.description}
                      </span>
                      {ch.actionHref !== "#" && (
                        <a
                          href={ch.actionHref}
                          className="font-semibold text-primary hover:underline underline-offset-2 shrink-0 ml-2"
                        >
                          {ch.actionText}
                        </a>
                      )}
                    </div>
                  </MotionStaggerChild>
                );
              })}
            </MotionStagger>

            {/* Bottom CTA */}
            <div className="pt-4">
              <AppButton
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-7 h-11 rounded-xl shadow-xs"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                <Link href={data.ctaHref}>{data.ctaText}</Link>
              </AppButton>
            </div>
          </MotionReveal>
        </div>
      </div>
    </SectionContainer>
  );
}

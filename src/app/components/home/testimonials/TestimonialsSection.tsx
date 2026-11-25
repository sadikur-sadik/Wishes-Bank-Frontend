import React from "react";
import { Star, Quote, MessageSquareHeart } from "lucide-react";
import { TestimonialsSectionData } from "@/types/homepage-extra";
import { defaultTestimonialsData } from "@/data/homepage/team-and-contact";
import { MotionReveal, MotionStagger, MotionStaggerChild } from "@/components/common/MotionReveal";

interface TestimonialsSectionProps {
  data?: TestimonialsSectionData;
}

export default function TestimonialsSection({
  data = defaultTestimonialsData,
}: TestimonialsSectionProps) {
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return (name[0] || "U").toUpperCase();
  };

  return (
    <section id="testimonials" className="relative w-full py-16 sm:py-24 bg-muted/20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <MotionReveal className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
            <MessageSquareHeart className="h-3.5 w-3.5" />
            {data.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            {data.heading}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {data.description}
          </p>
        </MotionReveal>

        {/* Testimonials Cards Grid */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {data.testimonials.map((item) => (
            <MotionStaggerChild
              key={item.id}
              className="rounded-3xl border border-border bg-card p-7 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group relative hover:-translate-y-1.5"
            >
              <div className="space-y-4">
                {/* Header: Tag + Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <div className="relative pt-1">
                  <Quote className="h-6 w-6 text-primary/20 mb-2 rotate-180" />
                  <p className="text-sm text-foreground/90 leading-relaxed italic">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-border mt-6">
                <div className="h-10 w-10 rounded-full bg-primary/15 border border-primary/30 text-primary flex items-center justify-center font-bold text-xs font-mono shrink-0">
                  {getInitials(item.name)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground leading-snug">
                    {item.name}
                  </span>
                  <span className="text-xs text-muted-foreground leading-tight">
                    {item.role}
                  </span>
                </div>
              </div>
            </MotionStaggerChild>
          ))}
        </MotionStagger>

        {/* Transparent Prototype Notice */}
        <div className="text-center text-[11px] text-muted-foreground italic max-w-xl mx-auto">
          * {data.sampleNote}
        </div>
      </div>
    </section>
  );
}

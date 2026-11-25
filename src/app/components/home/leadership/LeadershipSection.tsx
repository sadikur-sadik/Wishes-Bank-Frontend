import React from "react";
import Image from "next/image";
import { Users2, Globe, Send, Mail } from "lucide-react";
import { LeadershipSectionData } from "@/types/homepage-extra";
import { defaultLeadershipData } from "@/data/homepage/team-and-contact";
import { MotionReveal, MotionStagger, MotionStaggerChild } from "@/components/common/MotionReveal";

interface LeadershipSectionProps {
  data?: LeadershipSectionData;
}

export default function LeadershipSection({
  data = defaultLeadershipData,
}: LeadershipSectionProps) {
  return (
    <section id="leadership" className="relative w-full py-16 sm:py-24 bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <MotionReveal className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
            <Users2 className="h-3.5 w-3.5" />
            {data.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            {data.heading}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {data.description}
          </p>
        </MotionReveal>

        {/* Team Grid */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.members.map((member) => (
            <MotionStaggerChild
              key={member.id}
              className="rounded-3xl border border-border bg-card p-6 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1.5"
            >
              {/* Circular Avatar Container */}
              <div className="relative h-44 w-44 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary transition-all duration-300 mb-6 shadow-md bg-muted">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  width={240}
                  height={240}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Bio & Details */}
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground tracking-tight">
                    {member.name}
                  </h3>
                  <span className="inline-block text-xs font-semibold text-primary mt-0.5">
                    {member.position}
                  </span>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Social Channels */}
                <div className="flex items-center justify-center gap-3 pt-5 border-t border-border mt-5">
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <Globe className="h-4 w-4" />
                    </a>
                  )}
                  {member.socials?.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                      aria-label="Social Profile"
                    >
                      <Send className="h-4 w-4" />
                    </a>
                  )}
                  {member.socials?.email && (
                    <a
                      href={member.socials.email}
                      className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                      aria-label="Send Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </MotionStaggerChild>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}

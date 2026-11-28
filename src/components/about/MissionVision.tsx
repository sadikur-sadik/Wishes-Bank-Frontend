import React from "react";
import { aboutMissionVision } from "@/data/about";

const MissionVision = () => {
  return (
    <section className="py-20 lg:py-28 border-b border-border/40 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Mission Panel (Light Editorial) */}
          <div className="p-8 sm:p-12 rounded-3xl border border-border/80 bg-card shadow-lg flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase mb-6 block">
                {aboutMissionVision.mission.label}
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-card-foreground mb-4 font-serif">
                {aboutMissionVision.mission.title}
              </h3>

              <p className="text-base text-muted-foreground leading-relaxed mb-8">
                {aboutMissionVision.mission.description}
              </p>
            </div>

            <div className="pt-6 border-t border-border/50">
              <blockquote className="italic text-sm text-foreground/80 font-serif border-l-2 border-primary pl-4">
                &ldquo;{aboutMissionVision.mission.quote}&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Vision Panel (Theme-Aware Surface) */}
          <div className="p-8 sm:p-12 rounded-3xl border border-border dark:border-emerald-500/30 bg-card dark:bg-gradient-to-br dark:from-[#0c1a15] dark:to-[#08120e] text-card-foreground dark:text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-44 h-44 bg-primary/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-primary dark:text-emerald-400 uppercase mb-6 block">
                {aboutMissionVision.vision.label}
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-card-foreground dark:text-white mb-4 font-serif">
                {aboutMissionVision.vision.title}
              </h3>

              <p className="text-base text-muted-foreground dark:text-emerald-100/75 leading-relaxed mb-8">
                {aboutMissionVision.vision.description}
              </p>
            </div>

            <div className="pt-6 border-t border-border/50 dark:border-emerald-900/60">
              <blockquote className="italic text-sm text-foreground/80 dark:text-emerald-200/90 font-serif border-l-2 border-primary dark:border-emerald-400 pl-4">
                &ldquo;{aboutMissionVision.vision.quote}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { MissionVision };

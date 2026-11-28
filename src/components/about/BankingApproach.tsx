import React from "react";
import { Laptop, Scale, KeyRound, Receipt, Users } from "lucide-react";
import { aboutApproach } from "@/data/about";

const iconMap: Record<string, React.ElementType> = {
  Laptop,
  Scale,
  KeyRound,
  Receipt,
  Users,
};

const BankingApproach = () => {
  return (
    <section className="py-20 lg:py-28 border-b border-border/40 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            {aboutApproach.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mt-2 mb-4 font-serif">
            {aboutApproach.heading}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {aboutApproach.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutApproach.pillars.map((pillar, idx) => {
            const PillarIcon = iconMap[pillar.iconName] || Users;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl border border-border/70 bg-card hover:border-primary/50 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <PillarIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2 font-serif">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-border/40 text-[11px] font-semibold text-primary uppercase tracking-wider">
                  Core Standard
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { BankingApproach };

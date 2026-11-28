export interface AboutBrandStatement {
  eyebrow: string;
  heading: string;
  subheading: string;
  description: string;
}

export interface AboutStory {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt: string;
  caption: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface AboutMissionVision {
  mission: {
    label: string;
    title: string;
    description: string;
    quote: string;
  };
  vision: {
    label: string;
    title: string;
    description: string;
    quote: string;
  };
}

export interface AboutPrinciple {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface AboutApproachPillar {
  title: string;
  description: string;
  iconName: string;
}

export interface AboutClosing {
  eyebrow: string;
  heading: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
}

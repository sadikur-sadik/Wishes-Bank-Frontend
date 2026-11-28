export interface LoanHeroData {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  imageSrc: string;
  imageAlt: string;
}

export interface LoanOptionItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  featured?: boolean;
  highlights: string[];
  audience: string;
  ctaText: string;
  ctaHref: string;
}

export interface LoanBenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface LoanTimelineStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface LoanManagementFeature {
  title: string;
  description: string;
  iconName: string;
}

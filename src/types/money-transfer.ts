export interface TransferHeroData {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
}

export interface TransferJourneyStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface TransferCapabilityItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  points: string[];
  gridSpan: string;
  iconName: string;
}

export interface SecurityCheckItem {
  title: string;
  description: string;
  iconName: string;
}

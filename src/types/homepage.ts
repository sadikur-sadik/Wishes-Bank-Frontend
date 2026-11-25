export interface TrustPillar {
  id: string;
  title: string;
  subtitle: string;
  iconName: "ShieldCheck" | "Smartphone" | "Lock" | "HeartHandshake";
}

export interface BankingBenefit {
  title: string;
  description: string;
}

export interface BankingStat {
  value: string;
  label: string;
}

export interface BankingOverviewData {
  eyebrow: string;
  heading: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  benefits: BankingBenefit[];
  stats: BankingStat[];
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
}

export interface SecurityFeature {
  id: string;
  title: string;
  description: string;
  iconName: "KeyRound" | "ShieldAlert" | "Fingerprint" | "DatabaseZap";
}

export interface SecuritySectionData {
  eyebrow: string;
  heading: string;
  description: string;
  features: SecurityFeature[];
  primaryImage: {
    src: string;
    alt: string;
    caption: string;
  };
  secondaryImage: {
    src: string;
    alt: string;
    caption: string;
  };
}

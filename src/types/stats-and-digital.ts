export interface StatItem {
  id: string;
  value: string;
  label: string;
  description: string;
  iconName: "Users" | "CreditCard" | "Activity" | "Briefcase";
}

export interface StatsSectionData {
  eyebrow?: string;
  heading?: string;
  stats: StatItem[];
}

export interface HowItWorksStep {
  stepNumber: string;
  title: string;
  description: string;
  iconName: "UserPlus" | "ShieldCheck" | "WalletCards";
}

export interface DigitalBankingFeature {
  title: string;
  description: string;
  iconName: "Eye" | "Clock" | "SlidersHorizontal" | "GlobeLock";
}

export interface DigitalBankingSectionData {
  eyebrow: string;
  heading: string;
  description: string;
  features: DigitalBankingFeature[];
  stepsEyebrow: string;
  stepsHeading: string;
  stepsDescription: string;
  steps: HowItWorksStep[];
}

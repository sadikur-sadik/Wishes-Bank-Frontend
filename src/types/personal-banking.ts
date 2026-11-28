export interface PersonalBenefitItem {
  id: string;
  title: string;
  description: string;
  iconName:
    | "SlidersHorizontal"
    | "WalletCards"
    | "ArrowLeftRight"
    | "History"
    | "ArrowDownToLine"
    | "FileText";
}

export interface AccountTypeItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  iconName: "PiggyBank" | "Wallet" | "Building2";
  ctaText: string;
  ctaHref: string;
  badge?: string;
}

export interface HowItWorksStepItem {
  step: string;
  title: string;
  description: string;
  iconName: "UserPlus" | "LogIn" | "LineChart";
}

export interface SecurityFeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: "Lock" | "ShieldCheck" | "UserCheck" | "KeyRound" | "DatabaseZap";
}

export interface PersonalBankingPageData {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCtaText: string;
    primaryCtaHref: string;
    secondaryCtaText: string;
    secondaryCtaHref: string;
    imageSrc: string;
    imageAlt: string;
  };
  benefitsEyebrow: string;
  benefitsTitle: string;
  benefitsDescription: string;
  benefits: PersonalBenefitItem[];
  accountTypesEyebrow: string;
  accountTypesTitle: string;
  accountTypesDescription: string;
  accountTypes: AccountTypeItem[];
  howItWorksEyebrow: string;
  howItWorksTitle: string;
  howItWorksDescription: string;
  steps: HowItWorksStepItem[];
  securityEyebrow: string;
  securityTitle: string;
  securityDescription: string;
  securityFeatures: SecurityFeatureItem[];
  cta: {
    title: string;
    description: string;
    primaryBtnText: string;
    primaryBtnHref: string;
    secondaryBtnText: string;
    secondaryBtnHref: string;
  };
}

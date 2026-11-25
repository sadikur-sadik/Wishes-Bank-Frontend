import {
  TrustPillar,
  BankingOverviewData,
  SecuritySectionData,
} from "@/types/homepage";

export const defaultTrustPillars: TrustPillar[] = [
  {
    id: "secure-digital-banking",
    title: "Secure Digital Banking",
    subtitle: "256-bit encrypted core banking",
    iconName: "ShieldCheck",
  },
  {
    id: "convenient-account-management",
    title: "Convenient Account Management",
    subtitle: "Real-time balances & control",
    iconName: "Smartphone",
  },
  {
    id: "protected-transactions",
    title: "Protected Transactions",
    subtitle: "Instant fraud & limit monitoring",
    iconName: "Lock",
  },
  {
    id: "customer-focused-services",
    title: "Customer-Focused Services",
    subtitle: "Dedicated 24/7 personal support",
    iconName: "HeartHandshake",
  },
];

export const defaultBankingOverviewData: BankingOverviewData = {
  eyebrow: "Modern Digital Experience",
  heading: "Banking Designed Around Your Needs",
  description:
    "Wishes Bank LTD empowers you with seamless digital account operations, low-friction transfers, transparent deposit planning, and flexible personal loans — engineered for simplicity and financial peace of mind.",
  imageSrc: "/images/homepage/banking-overview.webp",
  imageAlt: "Wishes Bank Digital Platform Overview",
  benefits: [
    {
      title: "Real-Time Fund Movement",
      description:
        "Execute internal and peer account transfers instantly with unique receipt tracking.",
    },
    {
      title: "Transparent Financial Growth",
      description:
        "Monitor your savings accumulation, view statement histories, and forecast loan terms.",
    },
    {
      title: "Zero Hidden Maintenance Costs",
      description:
        "Experience digital banking where fee schedules are clear and straightforward.",
    },
  ],
  stats: [
    { value: "99.98%", label: "Platform Uptime" },
    { value: "< 2 min", label: "Instant Transfers" },
    { value: "4.9 / 5", label: "Member Satisfaction" },
  ],
  ctaText: "Open an Account",
  ctaHref: "/register",
  secondaryCtaText: "Explore Accounts",
  secondaryCtaHref: "/services",
};

export const defaultSecurityData: SecuritySectionData = {
  eyebrow: "Safety & Asset Protection",
  heading: "Banking Security You Can Rely On",
  description:
    "Your financial assets and confidential data remain shielded through multi-tier verification, role-segregated authorization, and proactive operational monitoring.",
  features: [
    {
      id: "secure-account-access",
      title: "Secure Account Access",
      description:
        "Protected authentication pipelines, session timeouts, and biometric-ready credential protocols.",
      iconName: "KeyRound",
    },
    {
      id: "protected-transactions",
      title: "Protected Transactions",
      description:
        "Rigorous server-side balance validation, anti-duplicate controls, and verified transaction PIN workflows.",
      iconName: "ShieldAlert",
    },
    {
      id: "customer-data-protection",
      title: "Customer Data Protection",
      description:
        "End-to-end data encryption in transit and at rest with strict zero-leakage RBAC boundaries.",
      iconName: "DatabaseZap",
    },
    {
      id: "multi-factor-assurance",
      title: "Biometric & Step-Up Verification",
      description:
        "Step-up validation triggers for high-volume fund movements and administrative operations.",
      iconName: "Fingerprint",
    },
  ],
  primaryImage: {
    src: "/images/homepage/security-biometric.webp",
    alt: "Biometric and Device Protection",
    caption: "Biometric Protection Active",
  },
  secondaryImage: {
    src: "/images/homepage/security-professional.webp",
    alt: "Professional Security Oversight",
    caption: "24/7 Security Oversight",
  },
};

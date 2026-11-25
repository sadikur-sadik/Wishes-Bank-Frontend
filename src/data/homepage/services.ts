import { BankingServicesSectionData } from "@/types/services";

export const defaultBankingServicesData: BankingServicesSectionData = {
  eyebrow: "OUR SERVICES",
  heading: "Explore Our Services",
  description:
    "Discover convenient banking solutions designed to make managing your money easier.",
  services: [
    {
      id: "personal-banking",
      title: "Personal Banking",
      description:
        "Everyday checking with zero maintenance fees, instant statements, and real-time transaction alerts.",
      features: [
        "Free multi-device access",
        "Instant transaction alerts",
        "No hidden account fees",
      ],
      iconName: "Wallet",
      href: "/register",
      badge: "Popular",
    },
    {
      id: "savings-accounts",
      title: "Savings Accounts",
      description:
        "Grow your savings with competitive interest yields, automated deposits, and flexible terms.",
      features: [
        "Up to 7.5% APY yield",
        "Zero withdrawal penalties",
        "Automated recurring deposits",
      ],
      iconName: "PiggyBank",
      href: "/register",
    },
    {
      id: "money-transfers",
      title: "Money Transfers",
      description:
        "Fast internal and peer-to-peer transfers with instant settlement and downloadable receipts.",
      features: [
        "Instant ledger settlement",
        "Exportable PDF receipts",
        "Customizable daily limits",
      ],
      iconName: "ArrowLeftRight",
      href: "/register",
    },
    {
      id: "loans-and-financing",
      title: "Loans & Financing",
      description:
        "Flexible consumer financing and personal loans with fixed rates and fast underwriting review.",
      features: [
        "Fixed monthly interest",
        "Flexible repayment terms",
        "Quick online approval",
      ],
      iconName: "Landmark",
      href: "/register",
      badge: "Low Rates",
    },
    {
      id: "account-management",
      title: "Account Management",
      description:
        "Unified administrative control over your accounts, transaction limits, and personal security profiles.",
      features: [
        "Full account oversight",
        "Multi-account switching",
        "Fast profile & KYC updates",
      ],
      iconName: "UserCheck",
      href: "/register",
    },
    {
      id: "digital-banking",
      title: "Digital Banking",
      description:
        "Secure 24/7 self-service banking with biometric login support and encrypted data protection.",
      features: [
        "24/7 self-service portal",
        "Biometric & passkey support",
        "Encrypted communication",
      ],
      iconName: "Smartphone",
      href: "/register",
      badge: "24/7",
    },
  ],
};

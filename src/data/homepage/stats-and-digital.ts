import {
  StatsSectionData,
  DigitalBankingSectionData,
} from "@/types/stats-and-digital";

export const defaultStatsData: StatsSectionData = {
  eyebrow: "Our Growing Reach",
  heading: "Wishes Bank in Numbers",
  stats: [
    {
      id: "registered-customers",
      value: "45,000+",
      label: "Registered Customers",
      description: "Active digital account holders across the country",
      iconName: "Users",
    },
    {
      id: "active-accounts",
      value: "62,500+",
      label: "Active Accounts",
      description: "Checking, savings, and commercial portfolios",
      iconName: "CreditCard",
    },
    {
      id: "transactions-processed",
      value: "$180M+",
      label: "Transactions Processed",
      description: "Secure volume transferred with atomic ledger precision",
      iconName: "Activity",
    },
    {
      id: "banking-services",
      value: "99.98%",
      label: "Banking Services Uptime",
      description: "High-availability 24/7 digital platform resilience",
      iconName: "Briefcase",
    },
  ],
};

export const defaultDigitalBankingData: DigitalBankingSectionData = {
  eyebrow: "Modern Financial Control",
  heading: "The Digital Banking Experience Built for You",
  description:
    "Manage your complete banking lifecycle from any desktop or mobile device. Check live balances, monitor ledger history, update personal limits, and execute instant transfers effortlessly.",
  features: [
    {
      title: "Real-Time Balance Oversight",
      description:
        "Instantly monitor liquid checking, savings yields, and fixed deposits with zero synchronization latency.",
      iconName: "Eye",
    },
    {
      title: "Comprehensive Transaction History",
      description:
        "Filter, search, and download verified PDF receipts for every debit, credit, and peer transfer.",
      iconName: "Clock",
    },
    {
      title: "Flexible Account Controls",
      description:
        "Configure daily transfer limits, freeze cards, and manage multi-account preferences with one touch.",
      iconName: "SlidersHorizontal",
    },
    {
      title: "Encrypted 24/7 Digital Access",
      description:
        "Bank securely around the clock with hardware-backed passkeys, biometric support, and strict RBAC protection.",
      iconName: "GlobeLock",
    },
  ],
  stepsEyebrow: "Simple Onboarding",
  stepsHeading: "How It Works in 3 Easy Steps",
  stepsDescription:
    "Get started with Wishes Bank in minutes without visiting a physical branch.",
  steps: [
    {
      stepNumber: "01",
      title: "Create Your Account",
      description:
        "Fill out our streamlined online registration form with your email and basic personal details.",
      iconName: "UserPlus",
    },
    {
      stepNumber: "02",
      title: "Complete Account Verification",
      description:
        "Our automated verification pipeline validates your identity securely within moments.",
      iconName: "ShieldCheck",
    },
    {
      stepNumber: "03",
      title: "Start Banking",
      description:
        "Log in to your personalized digital portal, fund your account, and manage your wealth immediately.",
      iconName: "WalletCards",
    },
  ],
};

import { PersonalBankingPageData } from "@/types/personal-banking";

export const personalBankingData: PersonalBankingPageData = {
  hero: {
    eyebrow: "PERSONAL BANKING",
    title: "Banking That Moves With Your Life",
    description:
      "Manage your accounts, transfer funds with instant confirmation, and oversee your everyday banking activities through an intuitive and secure digital portal.",
    primaryCtaText: "Open an Account",
    primaryCtaHref: "/register",
    secondaryCtaText: "Explore Account Types",
    secondaryCtaHref: "#account-types",
    imageSrc: "/images/personal-banking/personal-banking.png",
    imageAlt: "Wishes Bank Personal Banking digital dashboard illustration",
  },
  benefitsEyebrow: "CORE CAPABILITIES",
  benefitsTitle: "Built for Everyday Convenience",
  benefitsDescription:
    "Everything you need to handle your personal finances seamlessly in one place.",
  benefits: [
    {
      id: "easy-account-management",
      title: "Easy Account Management",
      description:
        "View account information, account numbers, and live available balances with total clarity.",
      iconName: "SlidersHorizontal",
    },
    {
      id: "multiple-bank-accounts",
      title: "Multiple Bank Accounts",
      description:
        "Open and manage multiple checking or savings accounts under one single customer profile.",
      iconName: "WalletCards",
    },
    {
      id: "convenient-fund-transfers",
      title: "Convenient Fund Transfers",
      description:
        "Transfer money between your own accounts or send funds to other Wishes Bank customers with instant ledger updates.",
      iconName: "ArrowLeftRight",
    },
    {
      id: "transaction-history",
      title: "Transaction History",
      description:
        "Review previous financial transactions, filter activities by date, and track every credit and debit.",
      iconName: "History",
    },
    {
      id: "deposit-withdrawal-requests",
      title: "Deposit & Withdrawal Requests",
      description:
        "Submit new deposit and withdrawal requests online and monitor their review and approval status in real-time.",
      iconName: "ArrowDownToLine",
    },
    {
      id: "account-statements",
      title: "Account Statements",
      description:
        "Download official digital account statements whenever you need them for personal record-keeping or verification.",
      iconName: "FileText",
    },
  ],
  accountTypesEyebrow: "ACCOUNT OPTIONS",
  accountTypesTitle: "Choose the Account That Fits You",
  accountTypesDescription:
    "Explore our standard account categories designed to match your individual financial requirements.",
  accountTypes: [
    {
      id: "savings-account",
      name: "Savings Account",
      tagline: "Dedicated Capital Accumulation",
      description:
        "An interest-bearing account category focused on disciplined fund preservation and financial growth.",
      features: [
        "Primary account for personal reserve funds",
        "Automated recurring deposits support",
        "Zero maintenance penalty structure",
        "Instant statement generation",
      ],
      iconName: "PiggyBank",
      ctaText: "Learn More",
      ctaHref: "/register",
      badge: "Popular",
    },
    {
      id: "current-account",
      name: "Current Account",
      tagline: "Everyday Liquidity & Operations",
      description:
        "A highly liquid account category designed for daily financial operations, frequent transfers, and bill settlements.",
      features: [
        "Rapid internal peer-to-peer transfers",
        "High frequency transaction handling",
        "Live transaction notification alerts",
        "Integrated multi-account management",
      ],
      iconName: "Wallet",
      ctaText: "Learn More",
      ctaHref: "/register",
    },
    {
      id: "business-account",
      name: "Business Account",
      tagline: "Enterprise & Commercial Operations",
      description:
        "A structured account category tailored for entrepreneurs and organizations requiring commercial fund segregation.",
      features: [
        "Segregated business capital management",
        "Higher transactional velocity allowances",
        "Enhanced financial statement reporting",
        "Dedicated corporate operational support",
      ],
      iconName: "Building2",
      ctaText: "Learn More",
      ctaHref: "/register",
    },
  ],
  howItWorksEyebrow: "GETTING STARTED",
  howItWorksTitle: "How Personal Banking Works",
  howItWorksDescription:
    "Follow three simple steps to start managing your personal finances with Wishes Bank LTD.",
  steps: [
    {
      step: "01",
      title: "Open an Account",
      description:
        "Complete our streamlined registration process by entering your basic personal details.",
      iconName: "UserPlus",
    },
    {
      step: "02",
      title: "Access Digital Banking",
      description:
        "Sign in securely to your personal portal using your verified email and password credentials.",
      iconName: "LogIn",
    },
    {
      step: "03",
      title: "Manage Your Finances",
      description:
        "View live balances, execute internal transfers, initiate deposit requests, and download records.",
      iconName: "LineChart",
    },
  ],
  securityEyebrow: "PROTECTION",
  securityTitle: "Engineered With Strict Security",
  securityDescription:
    "Your financial assets and confidential data are shielded by institutional safeguards.",
  securityFeatures: [
    {
      id: "secure-auth",
      title: "Secure Authentication",
      description:
        "Cryptographically salted password hashing and protected server-side session management.",
      iconName: "Lock",
    },
    {
      id: "rbac",
      title: "Role-Based Access Control",
      description:
        "Rigid isolation ensuring customer, staff, and admin operations never cross boundaries.",
      iconName: "ShieldCheck",
    },
    {
      id: "ownership-check",
      title: "Account Ownership Verification",
      description:
        "Server-enforced checks ensuring customers can only access and transact on accounts they own.",
      iconName: "UserCheck",
    },
    {
      id: "pin-verification",
      title: "Transaction PIN Verification",
      description:
        "Secondary PIN verification required for confirming critical balance fund movements.",
      iconName: "KeyRound",
    },
    {
      id: "server-validation",
      title: "Server-Side Financial Validation",
      description:
        "Atomic balance recalculations ensuring transfers can never result in negative or invalid states.",
      iconName: "DatabaseZap",
    },
  ],
  cta: {
    title: "Ready to Experience Smarter Banking?",
    description:
      "Open your account and manage your banking activities through Wishes Bank LTD.",
    primaryBtnText: "Open an Account",
    primaryBtnHref: "/register",
    secondaryBtnText: "Sign In",
    secondaryBtnHref: "/login",
  },
};

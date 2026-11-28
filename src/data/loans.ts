import {
  LoanHeroData,
  LoanOptionItem,
  LoanBenefitItem,
  LoanTimelineStep,
  LoanManagementFeature,
} from "@/types/loans";

export const loanHeroData: LoanHeroData = {
  eyebrow: "LOAN SOLUTIONS",
  title: "A Smarter Way to Finance Your Next Step.",
  description:
    "Explore transparent loan solutions designed to help you achieve your personal and professional ambitions. Submit requests easily, track reviews in real-time, and manage repayments through a secure digital workflow.",
  primaryCtaText: "Explore Loan Options",
  primaryCtaHref: "#loan-options",
  secondaryCtaText: "How It Works",
  secondaryCtaHref: "#how-it-works",
  imageSrc: "/images/loans/loans.webp",
  imageAlt: "Professional loan financing consultation at Wishes Bank",
};

export const loanOptionsData: {
  heading: {
    eyebrow: string;
    title: string;
    description: string;
  };
  options: LoanOptionItem[];
} = {
  heading: {
    eyebrow: "FINANCING SUITE",
    title: "Find a Loan That Fits Your Goals",
    description:
      "Whether you are planning major personal milestones, managing unexpected liquidity needs, or expanding your enterprise, our structured loan programs offer transparent assessment and reliable support.",
  },
  options: [
    {
      id: "personal-financing",
      tag: "FLAGSHIP FINANCING",
      title: "Personal & Family Financing",
      description:
        "Flexible funding tailored for milestone events, home enhancements, educational pursuits, and consolidated debt management with predictable repayment schedules.",
      featured: true,
      highlights: [
        "Structured tenure with predictable installment plans",
        "Direct disbursement upon approval into your Wishes Bank checking or savings account",
        "Transparent fee breakdown with zero hidden administrative charges",
        "Automated repayment deduction options to prevent missed cycles",
      ],
      audience: "Individuals seeking tailored financing for life goals and personal investments.",
      ctaText: "Apply via Dashboard",
      ctaHref: "/login",
    },
    {
      id: "liquidity-support",
      tag: "SHORT-TERM LIQUIDITY",
      title: "Emergency & Liquidity Support",
      description:
        "Rapid review assistance created for urgent cash requirements and unexpected capital shortages, backed by expedited internal evaluation.",
      featured: false,
      highlights: [
        "Prioritized queue review by verified loan officers",
        "Simple digital document attachment and declaration",
        "Direct status notifications via your account portal",
      ],
      audience: "Existing account holders requiring timely short-term financial flexibility.",
      ctaText: "Request Support",
      ctaHref: "/login",
    },
    {
      id: "commercial-expansion",
      tag: "BUSINESS GROWTH",
      title: "Commercial & Business Capital",
      description:
        "Capital funding dedicated to operational cash flow, inventory upgrades, equipment acquisition, and business expansion initiatives.",
      featured: false,
      highlights: [
        "Comprehensive credit limit evaluation based on operating flow",
        "Milestone-based disbursement tracking",
        "Dedicated corporate portfolio manager oversight",
      ],
      audience: "Registered commercial entities and entrepreneurs scaling their operations.",
      ctaText: "Inquire for Business",
      ctaHref: "/login",
    },
  ],
};

export const loanBenefitsData: {
  heading: {
    eyebrow: string;
    title: string;
    description: string;
  };
  benefits: LoanBenefitItem[];
} = {
  heading: {
    eyebrow: "WHY WISHES BANK",
    title: "Engineered for Clarity and Control",
    description:
      "We replace convoluted lending jargon with structured workflows, clear verification milestones, and complete visibility into every stage of your loan journey.",
  },
  benefits: [
    {
      id: "digital-submission",
      title: "Simple Application Submission",
      description:
        "Submit your loan request directly through your customer dashboard with clear guidance on required amounts, intended tenures, and supporting documentation.",
      iconName: "FileText",
    },
    {
      id: "transparent-review",
      title: "Transparent Staff Review",
      description:
        "Every application undergoes methodical review by banking specialists. Track your verification progression live with status timestamps.",
      iconName: "ShieldCheck",
    },
    {
      id: "administrative-governance",
      title: "Administrative Approval Governance",
      description:
        "Dual-level checks ensure institutional integrity and fair credit evaluation, protecting both account holders and lending guidelines.",
      iconName: "BadgeCheck",
    },
    {
      id: "direct-disbursement",
      title: "Direct Account Disbursement",
      description:
        "Once approved and finalized, funds are credited immediately to your primary Wishes Bank account without third-party transit delays.",
      iconName: "WalletCards",
    },
    {
      id: "live-tracking",
      title: "Live Repayment Tracking",
      description:
        "Monitor your real-time balance reduction, upcoming installment dues, interest breakdowns, and complete payment ledgers 24/7.",
      iconName: "BarChart3",
    },
    {
      id: "early-settlement",
      title: "Flexible Settlement Terms",
      description:
        "Manage your liabilities effectively with clear pathways for partial prepayments and full early settlements under standard bank policies.",
      iconName: "CalendarClock",
    },
  ],
};

export const loanTimelineSteps: {
  heading: {
    eyebrow: string;
    title: string;
    description: string;
  };
  steps: LoanTimelineStep[];
} = {
  heading: {
    eyebrow: "FOUR-STEP JOURNEY",
    title: "How the Application Process Works",
    description:
      "From initial application submission to fund disbursement, experience a transparent and straightforward path.",
  },
  steps: [
    {
      step: "01",
      title: "Apply",
      subtitle: "Digital Submission",
      description:
        "Log in to your account, select your loan requirement, specify amount and term, and submit the structured application online.",
      iconName: "SendHorizontal",
    },
    {
      step: "02",
      title: "Review",
      subtitle: "Specialist Assessment",
      description:
        "Our credit and risk review team evaluates your financial profile, eligibility metrics, and submitted references with care.",
      iconName: "SearchCheck",
    },
    {
      step: "03",
      title: "Decision",
      subtitle: "Official Sanction",
      description:
        "Receive real-time notification of approval status along with finalized interest terms, repayment schedule, and loan agreement.",
      iconName: "CheckCircle2",
    },
    {
      step: "04",
      title: "Disbursement",
      subtitle: "Funds Credited",
      description:
        "Approved capital is directly credited into your designated bank account, ready for immediate utilization.",
      iconName: "ArrowDownToLine",
    },
  ],
};

export const loanManagementFeatures: {
  heading: {
    eyebrow: string;
    title: string;
    description: string;
  };
  features: LoanManagementFeature[];
} = {
  heading: {
    eyebrow: "CUSTOMER DASHBOARD",
    title: "Total Visibility Over Every Active Loan",
    description:
      "Once approved, your loan is seamlessly integrated into your Wishes Bank customer portal. Track every dollar, monitor installments, and review historical payments with ease.",
  },
  features: [
    {
      title: "Application Status Progression",
      description:
        "Watch your application transition smoothly through Pending, In Review, Approved, or Disbursed states with audit timestamps.",
      iconName: "Clock",
    },
    {
      title: "Detailed Sanction Breakdown",
      description:
        "Access your approved principal, sanctioned interest rate, start date, and maturity date in one unified summary card.",
      iconName: "FileSpreadsheet",
    },
    {
      title: "Interactive Repayment Schedule",
      description:
        "View upcoming installment deadlines, monthly payable breakdown (principal vs. interest), and remaining tenure cycles.",
      iconName: "Calendar",
    },
    {
      title: "Real-Time Balance Depletion",
      description:
        "Track your remaining loan obligation reducing with each completed payment through visual progress indicators.",
      iconName: "TrendingDown",
    },
    {
      title: "Comprehensive Payment History",
      description:
        "Download payment receipts and review every recorded debit transaction associated with your active loan account.",
      iconName: "Receipt",
    },
  ],
};

export const loanCtaData = {
  eyebrow: "START TODAY",
  title: "Ready to Take Your Next Step?",
  description:
    "Whether funding a new ambition or consolidating your commitments, Wishes Bank provides clear, reliable lending solutions. Submit your application or sign in to your existing account.",
  primaryCtaText: "Apply for a Loan",
  primaryCtaHref: "/login",
  secondaryCtaText: "Sign In to Account",
  secondaryCtaHref: "/login",
};

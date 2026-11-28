import {
  AboutBrandStatement,
  AboutStory,
  AboutMissionVision,
  AboutPrinciple,
  AboutApproachPillar,
  AboutClosing,
} from "@/types/about";

export const aboutBrandStatement: AboutBrandStatement = {
  eyebrow: "GET TO KNOW WISHES BANK",
  heading: "Banking with Purpose.\nBuilt Around People.",
  subheading:
    "We believe financial services should empower human ambitions, clarify daily decisions, and protect personal prosperity with uncompromising integrity.",
  description:
    "Wishes Bank LTD is a customer-focused financial institution built to make everyday banking seamless, secure, and accessible. By harmonizing intelligent technology with transparent personal service, we ensure every account holder moves forward with confidence.",
};

export const aboutStory: AboutStory = {
  eyebrow: "OUR PHILOSOPHY & STORY",
  heading: "More Than Banking. A Commitment to Progress.",
  paragraphs: [
    "Wishes Bank was conceived with a clear and disciplined conviction: that modern financial management should never feel opaque, complex, or detached from everyday life. From our inception, we set out to build an institution where individuals, families, and growing businesses could access institutional-grade financial tools with clarity and ease.",
    "Instead of layers of confusing terms and fragmented branch visits, we engineered a unified digital architecture. From opening a verified deposit account to sending funds instantly and securing milestone financing, our platform treats every interaction as a sacred trust.",
    "Today, Wishes Bank stands as an enduring financial partner. We remain committed to continuous innovation, disciplined regulatory adherence, and fostering lifelong financial health across our entire community of account holders.",
  ],
  imageSrc: "/images/about/bank-architecture.webp",
  imageAlt: "Wishes Bank headquarters and corporate architecture",
  caption: "Institutional integrity through transparent digital governance.",
  stats: [
    { label: "Institutional Security", value: "256-bit" },
    { label: "Audit & Ledger Accuracy", value: "100%" },
    { label: "Digital Availability", value: "24/7/365" },
  ],
};

export const aboutMissionVision: AboutMissionVision = {
  mission: {
    label: "01 / MISSION",
    title: "Empowering Everyday Financial Confidence",
    description:
      "To provide clear, secure, and dependable banking solutions that simplify financial management and enable customers to achieve their life and commercial ambitions without artificial barriers.",
    quote: "Democratizing financial clarity through thoughtful technology and unwavering responsibility.",
  },
  vision: {
    label: "02 / VISION",
    title: "Shaping the Future of Trustworthy Banking",
    description:
      "To become the benchmark for progressive digital banking—recognized for impeccable security, intuitive customer care, and sustainable financial stewardship that enriches every community we serve.",
    quote: "Building a transparent financial ecosystem where human ambition is nurtured and safeguarded.",
  },
};

export const aboutPrinciples: {
  eyebrow: string;
  heading: string;
  description: string;
  items: AboutPrinciple[];
} = {
  eyebrow: "WHAT WE STAND FOR",
  heading: "Principles Behind Every Decision.",
  description:
    "Our values are not abstract corporate statements; they dictate how we design software, evaluate risk, safeguard assets, and respect customer relationships.",
  items: [
    {
      number: "01",
      title: "Uncompromising Trust",
      subtitle: "The Foundation of Every Relationship",
      description:
        "Trust is earned through consistency, disciplined custodianship, and keeping our promises on every transaction, statement, and balance calculation.",
      iconName: "ShieldCheck",
    },
    {
      number: "02",
      title: "End-to-End Security",
      subtitle: "Multi-Tier Protection by Design",
      description:
        "From isolated database transactions and biometric authorization to dedicated transaction PINs, we engineer defense at every touchpoint.",
      iconName: "Lock",
    },
    {
      number: "03",
      title: "Absolute Transparency",
      subtitle: "Clarity Over Complexity",
      description:
        "No hidden fees, no opaque lending conditions, and no ambiguous status queues. What you see on your ledger is the absolute truth.",
      iconName: "FileCheck",
    },
    {
      number: "04",
      title: "Human-Centric Focus",
      subtitle: "Technology Serving Real Needs",
      description:
        "We build features that solve real daily challenges—whether that means instant peer transfers, flexible loan schedules, or rapid customer service.",
      iconName: "HeartHandshake",
    },
    {
      number: "05",
      title: "Continuous Innovation",
      subtitle: "Forward-Thinking Architecture",
      description:
        "We continuously refine our infrastructure to deliver faster settlements, smarter financial insights, and effortless digital convenience.",
      iconName: "Sparkles",
    },
  ],
};

export const aboutApproach: {
  eyebrow: string;
  heading: string;
  description: string;
  pillars: AboutApproachPillar[];
} = {
  eyebrow: "OUR METHODOLOGY",
  heading: "Our Approach to Modern Banking",
  description:
    "We approach banking as an essential public infrastructure: dependable, accessible, and designed to respect your time and financial security.",
  pillars: [
    {
      title: "Seamless Digital Banking",
      description:
        "Conduct deposits, withdrawals, transfers, and loan requests online from any modern device with immediate feedback.",
      iconName: "Laptop",
    },
    {
      title: "Responsible Custodianship",
      description:
        "Strict regulatory adherence, balanced liquidity reserves, and transparent audit trails preserve institutional solvency.",
      iconName: "Scale",
    },
    {
      title: "Secure Account Access",
      description:
        "Role-based access controls, session governance, and credential hashing safeguard sensitive identity records.",
      iconName: "KeyRound",
    },
    {
      title: "Clear Transaction Intelligence",
      description:
        "Comprehensive searchable statements, downloadable PDF receipts, and real-time ledger updates keep you informed.",
      iconName: "Receipt",
    },
    {
      title: "Equitable & Accessible Services",
      description:
        "Standardized account tiers and low-barrier onboarding ensure quality banking solutions remain within everyone's reach.",
      iconName: "Users",
    },
  ],
};

export const aboutClosing: AboutClosing = {
  eyebrow: "PARTNER WITH US",
  heading: "Your Financial Journey Deserves a Trusted Partner.",
  description:
    "Whether opening your primary personal account, exploring milestone loan options, or managing daily liquidity, Wishes Bank is ready to serve your financial future.",
  primaryCtaText: "Explore Personal Banking",
  primaryCtaHref: "/personal-banking",
  secondaryCtaText: "Open an Account",
  secondaryCtaHref: "/register",
};

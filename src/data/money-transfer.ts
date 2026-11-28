import {
  TransferHeroData,
  TransferJourneyStep,
  TransferCapabilityItem,
  SecurityCheckItem,
} from "@/types/money-transfer";

export const transferHeroData: TransferHeroData = {
  eyebrow: "INSTANT & SECURE TRANSFERS",
  title: "Move Money. Simply and Securely.",
  description:
    "Seamlessly transfer funds between your own personal accounts or send money to any Wishes Bank account holder in seconds. Enjoy zero friction, verified account resolution, and total transaction peace of mind.",
  primaryCtaText: "Start a Transfer",
  primaryCtaHref: "/login",
  secondaryCtaText: "Explore Flow",
  secondaryCtaHref: "#transfer-flow",
};

export const transferJourneySteps: {
  heading: {
    eyebrow: string;
    title: string;
    description: string;
  };
  steps: TransferJourneyStep[];
} = {
  heading: {
    eyebrow: "TRANSFER JOURNEY",
    title: "How Fund Transfers Work",
    description:
      "A guided, error-resilient four-step flow built to make sure every dollar goes to the exact right destination without unexpected friction.",
  },
  steps: [
    {
      step: "01",
      title: "Choose Recipient",
      subtitle: "Own Account or Peer",
      description:
        "Select from your own linked accounts or enter an external Wishes Bank account number with real-time beneficiary lookup.",
      iconName: "UserCheck",
    },
    {
      step: "02",
      title: "Enter Transfer Details",
      subtitle: "Amount & Note",
      description:
        "Specify the transfer amount within verified daily limits and optionally attach an audited transaction reference note.",
      iconName: "SlidersHorizontal",
    },
    {
      step: "03",
      title: "Verify with PIN",
      subtitle: "Two-Factor Auth",
      description:
        "Authenticate the transfer request securely using your confidential 4-digit transaction security PIN.",
      iconName: "KeyRound",
    },
    {
      step: "04",
      title: "Complete Transfer",
      subtitle: "Instant Settlement",
      description:
        "Funds are debited and credited simultaneously across both ledgers, instantly updating available balances and generating a downloadable receipt.",
      iconName: "CheckCircle2",
    },
  ],
};

export const transferCapabilities: {
  heading: {
    eyebrow: string;
    title: string;
    description: string;
  };
  items: TransferCapabilityItem[];
} = {
  heading: {
    eyebrow: "CORE CAPABILITIES",
    title: "Engineered for Complete Financial Flexibility",
    description:
      "Whether rebalancing your personal portfolios or executing time-sensitive peer payments, our transfer engine delivers reliability and speed.",
  },
  items: [
    {
      id: "own-account",
      badge: "INTERNAL LIQUIDITY",
      title: "Own-Account Instant Transfers",
      description:
        "Shift liquidity seamlessly between your checking, high-yield savings, and investment accounts with zero delays, 24/7/365.",
      points: [
        "Immediate balance availability across linked deposits",
        "Zero transfer fees or hidden servicing charges",
        "Configurable auto-rebalancing preferences",
      ],
      gridSpan: "lg:col-span-7",
      iconName: "RefreshCcw",
    },
    {
      id: "wishes-peer",
      badge: "INTRA-BANK PEER-TO-PEER",
      title: "Peer-to-Peer Within Wishes Bank",
      description:
        "Send funds directly to friends, family, or business partners holding accounts in Wishes Bank with verified account holder matching before confirmation.",
      points: [
        "Instant recipient name preview prevents mistyped accounts",
        "Immediate credit into recipient balance",
        "Real-time SMS and email notifications to both parties",
      ],
      gridSpan: "lg:col-span-5",
      iconName: "SendHorizontal",
    },
    {
      id: "descriptions-and-tags",
      badge: "AUDIT TRAILS",
      title: "Transaction References & Categorization",
      description:
        "Attach clean memo descriptions, payment tags, and structured reference numbers to simplify personal budgeting and commercial record keeping.",
      points: [
        "Custom reference notes stored permanently on ledger",
        "Smart tagging for personal accounting reconciliations",
        "Searchable transaction memos across mobile and desktop",
      ],
      gridSpan: "lg:col-span-5",
      iconName: "FileSpreadsheet",
    },
    {
      id: "history-and-status",
      badge: "TOTAL VISIBILITY",
      title: "Real-Time Ledger History & Receipts",
      description:
        "Access an unbroken chronological ledger tracking every debit and credit, complete with downloadable PDF receipts and live status verification.",
      points: [
        "Instant settlement status indicators (Completed, Pending, Reversed)",
        "Audit-compliant PDF receipts with cryptographic verification hash",
        "Complete historical statements exportable in CSV or PDF",
      ],
      gridSpan: "lg:col-span-7",
      iconName: "Receipt",
    },
  ],
};

export const transferSecurityData: {
  heading: {
    eyebrow: string;
    title: string;
    description: string;
  };
  checks: SecurityCheckItem[];
  atomicityNote: {
    title: string;
    description: string;
  };
} = {
  heading: {
    eyebrow: "SECURITY & VALIDATION",
    title: "Guaranteed Institutional Integrity",
    description:
      "Behind every transfer lies a multi-tiered security and transactional architecture designed to protect account holders and prevent partial state failures.",
  },
  checks: [
    {
      title: "Recipient Account Validation",
      description:
        "Automated lookup ensures the recipient account number is valid, active, and matches the intended account holder before funds are authorized.",
      iconName: "BadgeCheck",
    },
    {
      title: "Real-Time Balance Verification",
      description:
        "Pre-flight balance checks confirm adequate cleared funds, accounting for scheduled hold transactions and minimum threshold limits.",
      iconName: "WalletCards",
    },
    {
      title: "Account Status Verification",
      description:
        "Transfers are blocked if either sending or receiving accounts are flagged for security review, dormancy, or administrative holds.",
      iconName: "ShieldAlert",
    },
    {
      title: "Transfer Limit Enforcement",
      description:
        "Dynamic daily and per-transaction limits prevent unauthorized capital depletion, configurable according to verified customer tiers.",
      iconName: "Gauge",
    },
    {
      title: "Confidential Transaction PIN",
      description:
        "Every transfer requires independent confirmation through your hashed 4-digit PIN, separate from your primary portal login password.",
      iconName: "Lock",
    },
    {
      title: "Encrypted Audit Logging",
      description:
        "All API interactions, IP addresses, and authorization timestamps are permanently logged to an immutable compliance record.",
      iconName: "FileCheck",
    },
  ],
  atomicityNote: {
    title: "Strict Double-Entry Atomicity",
    description:
      "All transfer operations execute within isolated database transactions. The debit from the sender and credit to the recipient occur simultaneously: either both accounts update successfully, or the entire operation rolls back. A failed transfer will never leave one account debited without the corresponding credit.",
  },
};

export const transferCtaData = {
  eyebrow: "MOVE MONEY CONFIDENTLY",
  title: "Your Money, Moving with Confidence.",
  description:
    "Join thousands of Wishes Bank customers managing their day-to-day transfers with zero hesitation. Log in to start transferring or open your account today.",
  primaryCtaText: "Start Transferring",
  primaryCtaHref: "/login",
  secondaryCtaText: "Sign In to Account",
  secondaryCtaHref: "/login",
};

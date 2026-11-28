import { FooterData, NewsletterData } from "@/types/footer";

export const defaultNewsletterData: NewsletterData = {
  eyebrow: "Stay Ahead in Banking",
  heading: "Stay Updated with Wishes Bank",
  description:
    "Subscribe to our monthly banking digest for product updates, financial security insights, and competitive interest rate adjustments.",
  placeholderText: "Enter your email address...",
  buttonText: "Subscribe",
  disclaimer:
    "We respect your privacy. Unsubscribe at any time. No spam guaranteed.",
};

export const defaultFooterData: FooterData = {
  brandDescription:
    "Wishes Bank LTD is a modern digital banking platform providing secure financial accounts, fast transfers, competitive savings, and flexible personal loans.",
  copyrightText: `© ${new Date().getFullYear()} Wishes Bank LTD. All rights reserved. Member FDIC simulated institution.`,
  socials: [
    { platform: "Website", href: "/home", iconName: "Globe" },
    { platform: "Portal", href: "/login", iconName: "Shield" },
    { platform: "Contact", href: "mailto:support@wishesbank.com", iconName: "Mail" },
    { platform: "Telegram", href: "#", iconName: "Send" },
  ],
  quickLinks: {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/home" },
      { label: "About Us", href: "/home#overview" },
      { label: "Services", href: "/home#services" },
      { label: "Sign In", href: "/login" },
      { label: "Open Account", href: "/register" },
    ],
  },
  servicesLinks: {
    title: "Banking Services",
    links: [
      { label: "Personal Banking", href: "/personal-banking" },
      { label: "Savings Accounts", href: "/register" },
      { label: "Money Transfers", href: "/money-transfer" },
      { label: "Loans & Financing", href: "/loans" },
      { label: "Digital Management", href: "/login" },
    ],
  },
  supportLinks: {
    title: "Support & Legal",
    links: [
      { label: "Help Center", href: "/home#contact" },
      { label: "FAQs", href: "/home#contact" },
      { label: "Contact Us", href: "/home#contact" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
};

import {
  TestimonialsSectionData,
  LeadershipSectionData,
  ContactSectionData,
} from "@/types/homepage-extra";

export const defaultTestimonialsData: TestimonialsSectionData = {
  eyebrow: "Member Experiences",
  heading: "What Our Customers Say",
  description:
    "Discover how individuals and small business owners streamline day-to-day finances, deposit planning, and rapid internal transfers with Wishes Bank.",
  sampleNote: "Sample feedback illustrative of prototype testing scenarios.",
  testimonials: [
    {
      id: "test-1",
      name: "Marcus Vance",
      role: "Small Business Founder",
      rating: 5,
      content:
        "Switching our commercial checking and payroll distribution to Wishes Bank cut our monthly administrative time in half. Instant ledger confirmation and PDF receipts are game changers.",
      tag: "Business Account",
    },
    {
      id: "test-2",
      name: "Elena Rostova",
      role: "Senior Product Designer",
      rating: 5,
      content:
        "The personal dashboard is remarkably clean and intuitive. I can check savings interest accrual, schedule transfers, and adjust limits in seconds without clutter.",
      tag: "Savings & Checking",
    },
    {
      id: "test-3",
      name: "David Chen",
      role: "Independent Consultant",
      rating: 5,
      content:
        "Applying for an equipment expansion loan was fast and fully transparent. Clear fixed repayments and zero surprise fees gave me complete peace of mind.",
      tag: "Personal Financing",
    },
  ],
};

export const defaultLeadershipData: LeadershipSectionData = {
  eyebrow: "Executive Direction",
  heading: "Meet Our Leadership Team",
  description:
    "Guided by experienced financial architects, risk managers, and technology leaders committed to building secure digital banking systems.",
  members: [
    {
      id: "lead-1",
      name: "Jonathan Reynolds",
      position: "Chief Executive Officer",
      bio: "20+ years steering international digital banking transformations and compliance governance.",
      imageSrc: "/images/homepage/team-member-1.webp",
      socials: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "mailto:executive@wishesbank.com",
      },
    },
    {
      id: "lead-2",
      name: "Sophia Martinez",
      position: "Chief Risk & Compliance Officer",
      bio: "Specializing in AML protocols, consumer asset protection, and financial integrity auditing.",
      imageSrc: "/images/homepage/team-member-2.webp",
      socials: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "mailto:compliance@wishesbank.com",
      },
    },
    {
      id: "lead-3",
      name: "Alexander Kim",
      position: "Head of Digital Infrastructure",
      bio: "Cloud infrastructure architect focused on 256-bit transactional security and ledger resilience.",
      imageSrc: "/images/homepage/team-member-3.webp",
      socials: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "mailto:technology@wishesbank.com",
      },
    },
  ],
};

export const defaultContactData: ContactSectionData = {
  eyebrow: "Dedicated Assistance",
  heading: "Have a Question? We're Here to Help.",
  description:
    "Whether you need guidance opening an account, setting transaction limits, or checking loan eligibility, our banking support specialists are ready to assist you.",
  imageSrc: "/images/homepage/customer-support.webp",
  imageAlt: "Wishes Bank Customer Assistance Team",
  channels: [
    {
      title: "Direct Client Support",
      value: "support@wishesbank.com",
      description: "Fast responses within 1 business hour.",
      actionText: "Send Email",
      actionHref: "mailto:support@wishesbank.com",
      iconName: "Mail",
    },
    {
      title: "24/7 Telephone Line",
      value: "+1 (800) 555-WISH",
      description: "Toll-free customer hotline available round the clock.",
      actionText: "Call Now",
      actionHref: "tel:+18005559474",
      iconName: "Phone",
    },
    {
      title: "Corporate Headquarters",
      value: "Financial District, 100 Wall Street, Suite 400",
      description: "Scheduled consultation visits available.",
      actionText: "Get Directions",
      actionHref: "#",
      iconName: "MapPin",
    },
    {
      title: "Branch Support Hours",
      value: "Mon - Fri: 8:00 AM – 6:00 PM EST",
      description: "Weekend online digital transactions run 24/7 uninterrupted.",
      actionText: "Check Schedule",
      actionHref: "#",
      iconName: "Clock",
    },
  ],
  ctaText: "Open an Account Today",
  ctaHref: "/register",
};

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  rating: number;
  content: string;
  tag: string;
}

export interface TestimonialsSectionData {
  eyebrow: string;
  heading: string;
  description: string;
  sampleNote: string;
  testimonials: TestimonialItem[];
}

export interface TeamMemberItem {
  id: string;
  name: string;
  position: string;
  bio: string;
  imageSrc: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface LeadershipSectionData {
  eyebrow: string;
  heading: string;
  description: string;
  members: TeamMemberItem[];
}

export interface ContactChannel {
  title: string;
  value: string;
  description: string;
  actionText: string;
  actionHref: string;
  iconName: "Mail" | "Phone" | "MapPin" | "Clock";
}

export interface ContactSectionData {
  eyebrow: string;
  heading: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  channels: ContactChannel[];
  ctaText: string;
  ctaHref: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocial {
  platform: string;
  href: string;
  iconName: "Globe" | "Send" | "Mail" | "Shield";
}

export interface FooterData {
  brandDescription: string;
  copyrightText: string;
  socials: FooterSocial[];
  quickLinks: FooterColumn;
  servicesLinks: FooterColumn;
  supportLinks: FooterColumn;
}

export interface NewsletterData {
  eyebrow: string;
  heading: string;
  description: string;
  placeholderText: string;
  buttonText: string;
  disclaimer: string;
}

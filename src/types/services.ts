export interface BankingServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  iconName:
    | "Wallet"
    | "PiggyBank"
    | "ArrowLeftRight"
    | "Landmark"
    | "UserCheck"
    | "Smartphone";
  href: string;
  badge?: string;
  isFeatured?: boolean;
}

export interface BankingServicesSectionData {
  eyebrow: string;
  heading: string;
  description: string;
  services: BankingServiceItem[];
}

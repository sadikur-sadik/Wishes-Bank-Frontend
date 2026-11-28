export interface NavItem {
  title: string
  href: string
  badge?: string
}

export const NAV_LINKS: NavItem[] = [
  {
    title: "Home",
    href: "/home",
  },
  {
    title: "Personal Banking",
    href: "/personal-banking",
  },
  {
    title: "Loans",
    href: "/loans",
  },
  {
    title: "Money Transfer",
    href: "/money-transfer",
  },
  {
    title: "About Us",
    href: "/about",
  },
]

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
    href: "/home#personal",
  },
  {
    title: "Loans",
    href: "/home#loans",
  },
  {
    title: "Money Transfer",
    href: "/home#transfer",
  },
  {
    title: "About Us",
    href: "/home#about",
  },
]

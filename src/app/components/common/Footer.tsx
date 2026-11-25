import React from "react";
import Link from "next/link";
import { Landmark, Globe, Send, Mail, Shield, LucideIcon } from "lucide-react";
import { FooterData } from "@/types/footer";
import { defaultFooterData } from "@/data/homepage/footer";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Send,
  Mail,
  Shield,
};

interface FooterProps {
  data?: FooterData;
}

export default function Footer({ data = defaultFooterData }: FooterProps) {
  return (
    <footer className="w-full bg-card/80 border-t border-border transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-12 border-b border-border">
          {/* Column 1 — Brand Column (spans 2 columns on lg screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/home"
              className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg py-1 pr-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Landmark className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-foreground leading-none">
                  Wishes Bank
                </span>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-primary leading-tight mt-0.5">
                  LTD · Digital Banking
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              {data.brandDescription}
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {data.socials.map((social, idx) => {
                const Icon = iconMap[social.iconName] || Globe;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    aria-label={social.platform}
                    className="h-9 w-9 rounded-xl border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200 shadow-xs"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {data.quickLinks.title}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {data.quickLinks.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Banking Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {data.servicesLinks.title}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {data.servicesLinks.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Support & Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {data.supportLinks.title}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {data.supportLinks.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Regulatory Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>{data.copyrightText}</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-primary font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

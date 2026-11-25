"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Landmark, Menu, ShieldCheck, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet } from "@/components/ui/sheet"
import { NAV_LINKS } from "./nav-config"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  // Ensure only ONE navbar is rendered on dashboard pages
  if (pathname?.startsWith("/dashboard")) {
    return null
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 transition-colors">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Left Section: Logo & Brand ── */}
        <Link
          href="/home"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg py-1 pr-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Landmark className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-foreground leading-none">
              Wishes Bank
            </span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground leading-tight mt-0.5">
              LTD · Banking
            </span>
          </div>
        </Link>

        {/* ── Middle Section: Desktop Navigation Links ── */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/home" && (pathname === "/" || pathname === "/home"))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {item.title}
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* ── Right Section: Desktop CTAs ── */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="font-medium text-foreground hover:text-primary"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-sm transition-all"
            >
              Get Started
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* ── Mobile Menu Hamburger Trigger ── */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile navigation menu"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </Button>
        </div>
      </div>

      {/* ── Mobile Navigation Drawer (Sheet) ── */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <div className="flex h-full flex-col justify-between pt-2">
          <div className="flex flex-col gap-6">
            {/* Drawer Brand Header */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Landmark className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">
                  Wishes Bank LTD
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Digital Banking Platform
                </span>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              {NAV_LINKS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === "/home" && (pathname === "/" || pathname === "/home"))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{item.title}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Drawer Bottom Actions & Security Notice */}
          <div className="flex flex-col gap-3 pt-6 border-t border-border">
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              <Button className="w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
                Get Started
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-2">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span>256-Bit SSL Encrypted Banking</span>
            </div>
          </div>
        </div>
      </Sheet>
    </header>
  )
}

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Landmark,
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  FileText,
  Users,
  ShieldCheck,
  History,
  BarChart3,
  X,
  CreditCard,
  ArrowDownToLine,
  ArrowUpFromLine,
  Bell,
} from "lucide-react";
import { UserRole } from "@/types/user";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const customerNav: NavItem[] = [
  { label: "Dashboard Overview", href: "/dashboard/customer", icon: LayoutDashboard },
  { label: "My Accounts", href: "/dashboard/customer/accounts", icon: Wallet },
  { label: "Fund Transfers", href: "/dashboard/customer/transfers", icon: ArrowLeftRight },
  { label: "Deposit Requests", href: "/dashboard/customer/deposits", icon: ArrowDownToLine },
  { label: "Withdrawal Requests", href: "/dashboard/customer/withdrawals", icon: ArrowUpFromLine },
  { label: "Transaction History", href: "/dashboard/customer/transactions", icon: History },
  { label: "Loan Management", href: "/dashboard/customer/loans", icon: CreditCard },
  { label: "Account Statements", href: "/dashboard/customer/statements", icon: FileText },
  { label: "Notifications", href: "/dashboard/customer/notifications", icon: Bell },
];

const staffNav: NavItem[] = [
  { label: "Operations Overview", href: "/dashboard/staff", icon: LayoutDashboard },
  { label: "Customer Management", href: "/dashboard/staff/customers", icon: Users },
  { label: "Bank Accounts", href: "/dashboard/staff/accounts", icon: Wallet },
  { label: "Transaction Review", href: "/dashboard/staff/transactions", icon: ArrowLeftRight },
  { label: "Loan Assistance", href: "/dashboard/staff/loans", icon: CreditCard },
  { label: "Notifications", href: "/dashboard/staff/notifications", icon: Bell },
];

const adminNav: NavItem[] = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Customers", href: "/dashboard/admin/customers", icon: Users },
  { label: "Bank Accounts", href: "/dashboard/admin/accounts", icon: Wallet },
  { label: "Staff Management", href: "/dashboard/admin/staff", icon: ShieldCheck, badge: "Approvals" },
  { label: "Transactions", href: "/dashboard/admin/transactions", icon: ArrowLeftRight },
  { label: "Loan Management", href: "/dashboard/admin/loans", icon: CreditCard },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { label: "Notifications", href: "/dashboard/admin/notifications", icon: Bell },
];

export interface DashboardSidebarProps {
  role?: UserRole;
  isOpen?: boolean;
  onClose?: () => void;
}

export const DashboardSidebar = ({ role, isOpen, onClose }: DashboardSidebarProps) => {
  const pathname = usePathname();

  const navItems = React.useMemo(() => {
    switch (role) {
      case UserRole.ADMIN:
        return adminNav;
      case UserRole.STAFF:
        return staffNav;
      case UserRole.CUSTOMER:
      default:
        return customerNav;
    }
  }, [role]);

  const roleBadge = React.useMemo(() => {
    switch (role) {
      case UserRole.ADMIN:
        return { label: "System Admin", color: "bg-destructive/10 text-destructive border-destructive/20" };
      case UserRole.STAFF:
        return { label: "Bank Officer", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" };
      case UserRole.CUSTOMER:
      default:
        return { label: "Customer Portal", color: "bg-primary/10 text-primary border-primary/20" };
    }
  }, [role]);

  const content = (
    <div className="flex flex-col h-full bg-card border-r border-border select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-border">
        <Link
          href="/home"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          onClick={onClose}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Landmark className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground leading-none">
              Wishes Bank
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-primary leading-tight mt-0.5">
              LTD Banking
            </span>
          </div>
        </Link>

        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            aria-label="Close Sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Role Pill */}
      <div className="px-5 pt-4 pb-2">
        <div className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold tracking-wide flex items-center justify-between ${roleBadge.color}`}>
          <span>{roleBadge.label}</span>
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`h-4 w-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase ${
                  isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Shortcuts / Status */}
      <div className="p-4 border-t border-border mt-auto space-y-2">
        <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
          <p className="text-[11px] font-semibold text-foreground">Secure Banking Core</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">256-bit Encrypted Session</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};

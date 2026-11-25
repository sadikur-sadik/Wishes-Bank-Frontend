"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  History,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { UserRole } from "@/types/user";

export default function CustomerDashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Role Protection guard
  React.useEffect(() => {
    if (session?.user && session.user.role !== UserRole.CUSTOMER) {
      if (session.user.role === UserRole.ADMIN) {
        router.replace("/dashboard/admin");
      } else if (session.user.role === UserRole.STAFF) {
        router.replace("/dashboard/staff");
      }
    }
  }, [session, router]);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Verified Customer Account</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {session?.user?.fullName || "Valued Customer"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Access your personal digital banking services, balances, and quick transactions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-sm hover:bg-primary/90 transition-colors">
            <ArrowUpRight className="h-4 w-4" />
            <span>Send Money</span>
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:bg-muted transition-colors">
            <ArrowDownLeft className="h-4 w-4" />
            <span>Deposit Funds</span>
          </button>
        </div>
      </div>

      {/* Account Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-emerald-700 text-white shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-100">
              Primary Savings Account
            </span>
            <Wallet className="h-5 w-5 text-emerald-200" />
          </div>
          <div>
            <div className="text-3xl font-extrabold tracking-tight">$24,850.00</div>
            <p className="text-xs text-emerald-100 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> +4.2% interest earned this month
            </p>
          </div>
          <div className="pt-2 border-t border-white/20 text-xs text-emerald-100 font-mono">
            •••• •••• •••• 8492
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
              Checking Account
            </span>
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-3xl font-extrabold tracking-tight text-foreground">$5,420.50</div>
            <p className="text-xs text-muted-foreground mt-1">Available for daily spending</p>
          </div>
          <div className="pt-2 border-t border-border text-xs text-muted-foreground font-mono">
            •••• •••• •••• 3140
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
              Total Fixed Deposits
            </span>
            <TrendingUp className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <div className="text-3xl font-extrabold tracking-tight text-foreground">$50,000.00</div>
            <p className="text-xs text-muted-foreground mt-1">Maturing on Dec 2027 (7.5% APY)</p>
          </div>
          <div className="pt-2 border-t border-border text-xs text-muted-foreground font-mono">
            FD-REF-99201
          </div>
        </div>
      </div>

      {/* Recent Activity Skeleton */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Recent Transactions</h2>
          </div>
          <span className="text-xs text-muted-foreground">Viewing last 3 activities</span>
        </div>

        <div className="divide-y divide-border">
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ArrowDownLeft className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Salary Deposit</p>
                <p className="text-xs text-muted-foreground">Direct Deposit from Employer</p>
              </div>
            </div>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              +$4,500.00
            </span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
                <ArrowUpRight className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Online Merchant Payment</p>
                <p className="text-xs text-muted-foreground">E-Commerce Purchase</p>
              </div>
            </div>
            <span className="text-sm font-bold text-foreground">
              -$129.99
            </span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <ArrowUpRight className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Utility Bill Payment</p>
                <p className="text-xs text-muted-foreground">Electric Company</p>
              </div>
            </div>
            <span className="text-sm font-bold text-foreground">
              -$84.50
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

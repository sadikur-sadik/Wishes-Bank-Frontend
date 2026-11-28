"use client";

import * as React from "react";
import Link from "next/link";
import {
  Users,
  CreditCard,
  ArrowLeftRight,
  ShieldCheck,
  Building,
  RefreshCw,
  AlertCircle,
  Clock,
  ArrowUpRight,
  UserPlus,
  PlusCircle,
  FileCheck2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchStaffOverview } from "@/store/slices/staffSlice";

interface StaffOverviewProps {
  staffName: string;
}

export const StaffOverview = ({ staffName }: StaffOverviewProps) => {
  const dispatch = useAppDispatch();
  const { stats, queues, isLoading, error } = useAppSelector((state) => state.staff);

  React.useEffect(() => {
    dispatch(fetchStaffOverview());
  }, [dispatch]);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Authorized Bank Officer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Staff Operations Portal — Officer {staffName}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time depository operations, customer registrations, transaction queues, and credit underwriting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-foreground">Core Systems Nominal</span>
        </div>
      </div>

      {isLoading && !stats && (
        <div className="flex flex-col items-center justify-center p-12 border border-border rounded-2xl bg-card text-center gap-3">
          <RefreshCw className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Retrieving live operational queues from database...</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/10 text-xs text-destructive flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Customers */}
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Total Customers</span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {(stats?.totalCustomers ?? 0).toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Registered depository clients</div>
        </div>

        {/* Total Bank Accounts */}
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Total Bank Accounts</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Building className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {(stats?.totalAccounts ?? 0).toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Active depository facilities</div>
        </div>

        {/* Pending Transactions */}
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Pending Reviews</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <ArrowLeftRight className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {(stats?.pendingTransactions ?? 0).toLocaleString()}
          </div>
          <div className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">
            Deposits & withdrawals awaiting decision
          </div>
        </div>

        {/* Pending Loan Applications */}
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Pending Loans</span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <CreditCard className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {(stats?.pendingLoans ?? 0).toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Awaiting credit underwriting review</div>
        </div>
      </div>

      {/* Quick Actions Shortcuts */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Operational Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link href="/dashboard/staff/customers">
            <div className="p-4 rounded-xl border border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/40 transition-all flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <UserPlus className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-foreground group-hover:text-primary">
                  Register Customer
                </span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </div>
          </Link>

          <Link href="/dashboard/staff/accounts">
            <div className="p-4 rounded-xl border border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/40 transition-all flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <PlusCircle className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-foreground group-hover:text-primary">
                  Create Bank Account
                </span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </div>
          </Link>

          <Link href="/dashboard/staff/transactions">
            <div className="p-4 rounded-xl border border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/40 transition-all flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <ArrowLeftRight className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-foreground group-hover:text-primary">
                  Review Transactions
                </span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </div>
          </Link>

          <Link href="/dashboard/staff/loans">
            <div className="p-4 rounded-xl border border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/40 transition-all flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-foreground group-hover:text-primary">
                  Loan Applications
                </span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </div>
          </Link>
        </div>
      </div>

      {/* Two-Column Operational Queues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Customer Registrations */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="text-base font-bold text-foreground">Recent Customer Registrations</h3>
              <p className="text-xs text-muted-foreground">Latest verified customers added to the core bank</p>
            </div>
            <Link href="/dashboard/staff/customers">
              <Button variant="ghost" size="sm" className="text-xs font-bold text-primary gap-1">
                <span>View All</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {!queues || queues.recentCustomers.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              No recent customer registrations recorded.
            </div>
          ) : (
            <div className="divide-y divide-border/60">
              {queues.recentCustomers.map((c) => (
                <div key={c.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-foreground">{c.fullName}</div>
                    <div className="text-muted-foreground">{c.email}</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                      {c.accountStatus}
                    </span>
                    <div className="text-[10px] text-muted-foreground mt-1">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Requests Queue */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="text-base font-bold text-foreground">Pending Requests Queue</h3>
              <p className="text-xs text-muted-foreground">Deposit and withdrawal slips requiring officer approval</p>
            </div>
            <Link href="/dashboard/staff/transactions">
              <Button variant="ghost" size="sm" className="text-xs font-bold text-primary gap-1">
                <span>Review Queue</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {(!queues || (queues.pendingDeposits.length === 0 && queues.pendingWithdrawals.length === 0)) ? (
            <div className="py-12 text-center text-xs text-muted-foreground space-y-1">
              <Clock className="h-6 w-6 mx-auto text-muted-foreground/40" />
              <p className="font-semibold text-foreground">Queue is Clear</p>
              <p>No deposit or withdrawal requests currently require officer approval.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {queues.pendingDeposits.map((d) => (
                <div key={d.id} className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-foreground">Deposit Slip: {d.requestId}</div>
                    <div className="text-muted-foreground font-mono">{d.accountNumber} • {d.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">
                      +${d.amount.toFixed(2)}
                    </div>
                    <Link href="/dashboard/staff/transactions">
                      <span className="text-[10px] text-primary underline font-semibold">Review</span>
                    </Link>
                  </div>
                </div>
              ))}

              {queues.pendingWithdrawals.map((w) => (
                <div key={w.id} className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-foreground">Withdrawal Slip: {w.requestId}</div>
                    <div className="text-muted-foreground font-mono">{w.accountNumber} • {w.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-amber-600 dark:text-amber-400">
                      -${w.amount.toFixed(2)}
                    </div>
                    <Link href="/dashboard/staff/transactions">
                      <span className="text-[10px] text-primary underline font-semibold">Review</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffOverview;

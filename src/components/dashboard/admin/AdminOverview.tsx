"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAdminOverview, clearAdminMessages } from "@/store/slices/adminSlice";
import {
  Users,
  CreditCard,
  Building,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  ShieldCheck,
  BarChart3,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  X,
  FileSpreadsheet,
  ChevronRight,
} from "lucide-react";

export default function AdminOverview() {
  const dispatch = useAppDispatch();
  const { stats, recentActivity, isLoading, actionSuccessMessage, error } = useAppSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchAdminOverview());
  }, [dispatch]);

  const statCards = [
    {
      label: "Registered Customers",
      value: (stats?.totalCustomers ?? 0).toLocaleString(),
      subtext: "Verified personal & business accounts",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
      href: "/dashboard/admin/customers",
    },
    {
      label: "Total Bank Accounts",
      value: (stats?.totalAccounts ?? 0).toLocaleString(),
      subtext: "Savings, current, & business facilities",
      icon: CreditCard,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      href: "/dashboard/admin/accounts",
    },
    {
      label: "Total Depository Balance",
      value: `$${(stats?.totalBankBalance ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtext: "Aggregate vault reserves in MongoDB",
      icon: Building,
      color: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
      href: "/dashboard/admin/accounts",
    },
    {
      label: "Gross Cumulative Deposits",
      value: `$${(stats?.totalDeposits ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtext: "Completed credits across system",
      icon: ArrowDownLeft,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      href: "/dashboard/admin/transactions",
    },
    {
      label: "Gross Cumulative Withdrawals",
      value: `$${(stats?.totalWithdrawals ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtext: "Completed disbursements & debits",
      icon: ArrowUpRight,
      color: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
      href: "/dashboard/admin/transactions",
    },
    {
      label: "Bank-Wide Transactions",
      value: (stats?.totalTransactions ?? 0).toLocaleString(),
      subtext: "Total recorded ledger items",
      icon: ArrowLeftRight,
      color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
      href: "/dashboard/admin/transactions",
    },
    {
      label: "Pending Loan Applications",
      value: (stats?.pendingLoans ?? 0).toLocaleString(),
      subtext: "Awaiting administrative decision",
      icon: FileSpreadsheet,
      color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
      href: "/dashboard/admin/loans",
    },
    {
      label: "Pending Staff Approvals",
      value: (stats?.pendingStaff ?? 0).toLocaleString(),
      subtext: "Officers awaiting onboarding approval",
      icon: ShieldCheck,
      color: "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      href: "/dashboard/admin/staff",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Executive Console
            </span>
            <span className="text-muted-foreground text-sm">•</span>
            <span className="text-muted-foreground text-sm">System Administrator</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1 flex items-center gap-2">
            <Building className="w-6 h-6 text-primary" />
            Wishes Bank Executive Overview
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Real-time administrative telemetry, live database aggregates, and institutional compliance queues.
          </p>
        </div>

        <button
          onClick={() => dispatch(fetchAdminOverview())}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors border border-border w-fit cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-primary" : ""}`} />
          Refresh Metrics
        </button>
      </div>

      {/* Messages */}
      {actionSuccessMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-200 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{actionSuccessMessage}</span>
          </div>
          <button
            onClick={() => dispatch(clearAdminMessages())}
            className="text-emerald-600 dark:text-emerald-400 hover:opacity-80 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-200 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => dispatch(clearAdminMessages())}
            className="text-rose-600 dark:text-rose-400 hover:opacity-80 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Summary Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link key={idx} href={card.href} className="block group">
              <div className="bg-card border border-border rounded-2xl p-4 hover:border-primary/40 transition-all hover:bg-card/90 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {card.label}
                  </span>
                  <div className={`p-2 rounded-xl border ${card.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  {card.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{card.subtext}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions Shortcuts */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Executive Administrative Shortcuts
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/dashboard/admin/customers"
            className="p-3 rounded-xl bg-muted/40 border border-border hover:border-primary/40 hover:bg-muted/70 transition-all text-center group"
          >
            <Users className="w-5 h-5 mx-auto text-blue-500 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-foreground block">Customers</span>
            <span className="text-[10px] text-muted-foreground">Manage Profiles</span>
          </Link>
          <Link
            href="/dashboard/admin/accounts"
            className="p-3 rounded-xl bg-muted/40 border border-border hover:border-primary/40 hover:bg-muted/70 transition-all text-center group"
          >
            <CreditCard className="w-5 h-5 mx-auto text-primary mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-foreground block">Bank Accounts</span>
            <span className="text-[10px] text-muted-foreground">Limits & Freeze</span>
          </Link>
          <Link
            href="/dashboard/admin/staff"
            className="p-3 rounded-xl bg-muted/40 border border-border hover:border-primary/40 hover:bg-muted/70 transition-all text-center group"
          >
            <ShieldCheck className="w-5 h-5 mx-auto text-cyan-500 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-foreground block">Staff Board</span>
            <span className="text-[10px] text-muted-foreground">Approvals & Access</span>
          </Link>
          <Link
            href="/dashboard/admin/transactions"
            className="p-3 rounded-xl bg-muted/40 border border-border hover:border-primary/40 hover:bg-muted/70 transition-all text-center group"
          >
            <ArrowLeftRight className="w-5 h-5 mx-auto text-purple-500 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-foreground block">Transactions</span>
            <span className="text-[10px] text-muted-foreground">Ledger & Flags</span>
          </Link>
          <Link
            href="/dashboard/admin/loans"
            className="p-3 rounded-xl bg-muted/40 border border-border hover:border-primary/40 hover:bg-muted/70 transition-all text-center group"
          >
            <FileSpreadsheet className="w-5 h-5 mx-auto text-amber-500 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-foreground block">Loan Underwriting</span>
            <span className="text-[10px] text-muted-foreground">Approve & Disburse</span>
          </Link>
          <Link
            href="/dashboard/admin/analytics"
            className="p-3 rounded-xl bg-muted/40 border border-border hover:border-primary/40 hover:bg-muted/70 transition-all text-center group"
          >
            <BarChart3 className="w-5 h-5 mx-auto text-primary mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-foreground block">Analytics</span>
            <span className="text-[10px] text-muted-foreground">Growth Trends</span>
          </Link>
        </div>
      </div>

      {/* Recent Queues Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-primary" />
              Latest Institutional Transactions
            </h3>
            <Link
              href="/dashboard/admin/transactions"
              className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1"
            >
              View Ledger <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {!recentActivity?.recentTransactions || recentActivity.recentTransactions.length === 0 ? (
            <p className="text-muted-foreground text-xs italic py-6 text-center">No transactions recorded in database.</p>
          ) : (
            <div className="space-y-2.5">
              {recentActivity.recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-mono font-medium text-primary block">{tx.transactionId}</span>
                    <span className="text-muted-foreground text-[11px]">Acc: {tx.accountNumber} • {tx.type}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-foreground block">
                      ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Staff Applications */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-500" />
              Pending Staff Onboarding Applications
            </h3>
            <Link
              href="/dashboard/admin/staff"
              className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:opacity-80 flex items-center gap-1"
            >
              Review Board <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {!recentActivity?.pendingStaff || recentActivity.pendingStaff.length === 0 ? (
            <p className="text-muted-foreground text-xs italic py-6 text-center">No pending staff applications. All up to date!</p>
          ) : (
            <div className="space-y-2.5">
              {recentActivity.pendingStaff.map((staff) => (
                <div
                  key={staff.id}
                  className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-foreground block">{staff.fullName}</span>
                    <span className="text-muted-foreground text-[11px]">{staff.email}</span>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      PENDING
                    </span>
                    <span className="block text-[10px] text-muted-foreground mt-0.5">
                      {new Date(staff.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Loan Applications */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-amber-500" />
              Pending Loan Underwriting Requests
            </h3>
            <Link
              href="/dashboard/admin/loans"
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:opacity-80 flex items-center gap-1"
            >
              Review Loans <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {!recentActivity?.pendingLoans || recentActivity.pendingLoans.length === 0 ? (
            <p className="text-muted-foreground text-xs italic py-6 text-center">No pending loan applications awaiting review.</p>
          ) : (
            <div className="space-y-2.5">
              {recentActivity.pendingLoans.map((loan) => (
                <div
                  key={loan.id}
                  className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-mono font-medium text-amber-600 dark:text-amber-400 block">{loan.loanId}</span>
                    <span className="text-foreground font-medium">{loan.customerName}</span>
                    <span className="text-muted-foreground text-[11px] block">{loan.loanType}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-foreground block text-sm">
                      ${loan.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      {loan.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Customers */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              Recent Customer Registrations
            </h3>
            <Link
              href="/dashboard/admin/customers"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:opacity-80 flex items-center gap-1"
            >
              All Customers <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {!recentActivity?.recentCustomers || recentActivity.recentCustomers.length === 0 ? (
            <p className="text-muted-foreground text-xs italic py-6 text-center">No customers registered yet.</p>
          ) : (
            <div className="space-y-2.5">
              {recentActivity.recentCustomers.map((cust) => (
                <div
                  key={cust.id}
                  className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-foreground block">{cust.fullName}</span>
                    <span className="text-muted-foreground text-[11px]">{cust.email}</span>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {cust.accountStatus}
                    </span>
                    <span className="block text-[10px] text-muted-foreground mt-0.5">
                      {new Date(cust.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

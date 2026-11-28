"use client";

import * as React from "react";
import Link from "next/link";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  CreditCard,
  History,
  ShieldCheck,
  FileText,
  AlertCircle,
  RefreshCw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCustomerOverview, selectAccount } from "@/store/slices/accountSlice";

interface CustomerOverviewProps {
  userName: string;
}

export const CustomerOverview = ({ userName }: CustomerOverviewProps) => {
  const dispatch = useAppDispatch();
  const { summary, accounts, selectedAccount, charts, recentTransactions, isLoading, error } = useAppSelector(
    (state) => state.account
  );

  React.useEffect(() => {
    dispatch(fetchCustomerOverview());
  }, [dispatch]);

  const currentAccount = selectedAccount || accounts[0];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Verified Customer Account</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Welcome back, {userName}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time financial status, banking balances, and recent ledger activity from Wishes Bank LTD.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/customer/transfers">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm gap-2">
              <ArrowLeftRight className="h-4 w-4" />
              <span>Transfer Funds</span>
            </Button>
          </Link>
          <Link href="/dashboard/customer/statements">
            <Button variant="outline" className="font-semibold gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span>Statements</span>
            </Button>
          </Link>
        </div>
      </div>

      {isLoading && !summary && (
        <div className="flex flex-col items-center justify-center p-12 border border-border rounded-2xl bg-card text-center gap-3">
          <RefreshCw className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Retrieving authorized financial ledger...</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/10 text-xs text-destructive flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* SECTION 1: Summary Statistics (Database Aggregates) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Balance */}
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Total Balance</span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            ${(summary?.totalBalance ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Across all {accounts.length} depository accounts</span>
          </div>
        </div>

        {/* Total Deposits */}
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Total Deposits</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ArrowDownLeft className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            ${(summary?.totalDeposits ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground font-medium">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            <span>Cumulative completed deposits</span>
          </div>
        </div>

        {/* Total Withdrawals */}
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Total Withdrawals</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            ${(summary?.totalWithdrawals ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground font-medium">
            <TrendingDown className="h-3.5 w-3.5 text-amber-500" />
            <span>Cumulative outgoing payments</span>
          </div>
        </div>

        {/* Active Loans */}
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Active Loans</span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <CreditCard className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {summary?.activeLoans ?? 0}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground font-medium">
            <span>
              ${(summary?.totalActiveLoanBalance ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })} outstanding
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 2: Account Overview & Switcher */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
          <div>
            <h2 className="text-lg font-bold text-foreground">Depository Accounts</h2>
            <p className="text-xs text-muted-foreground">Select an account to view balance and transaction routing credentials</p>
          </div>
          <Link href="/dashboard/customer/accounts">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 gap-1 text-xs font-bold">
              <span>View All Accounts</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {accounts.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            No bank accounts detected on file. Please contact your branch administrator.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((acc) => {
              const isSelected = (currentAccount?.id === acc.id) || (currentAccount?.accountNumber === acc.accountNumber);
              return (
                <div
                  key={acc.id || acc.accountNumber}
                  onClick={() => dispatch(selectAccount(acc.id || acc.accountNumber))}
                  className={`p-4 rounded-xl border transition-all cursor-pointer select-none ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm"
                      : "border-border bg-card/60 hover:border-primary/40 hover:bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {acc.accountType}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                        acc.accountStatus === "ACTIVE"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                      }`}
                    >
                      {acc.accountStatus}
                    </span>
                  </div>
                  <div className="text-2xl font-black text-foreground">
                    ${acc.availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 mt-2 border-t border-border/60 font-mono">
                    <span>{acc.accountNumber}</span>
                    <span className="font-sans font-semibold text-primary">
                      {isSelected ? "Selected" : "Select"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION 3: Financial Aggregation Charts (Real DB Aggregations) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending History Chart */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="text-sm font-bold text-foreground">Monthly Spending History</h3>
              <p className="text-xs text-muted-foreground">Aggregated outgoing withdrawals and transfers (Last 6 Months)</p>
            </div>
            <TrendingDown className="h-4 w-4 text-amber-500" />
          </div>

          {!charts || charts.monthlySpending.every((p) => p.amount === 0) ? (
            <div className="h-44 flex flex-col items-center justify-center text-xs text-muted-foreground border border-dashed border-border rounded-xl">
              <TrendingDown className="h-6 w-6 text-muted-foreground/40 mb-1" />
              <span>No recorded spending in the past 6 months.</span>
            </div>
          ) : (
            <div className="h-48 flex items-end justify-between gap-2 pt-6">
              {(() => {
                const maxVal = Math.max(...charts.monthlySpending.map((p) => p.amount), 1);
                return charts.monthlySpending.map((pt) => {
                  const heightPercent = Math.max(10, Math.round((pt.amount / maxVal) * 100));
                  return (
                    <div key={pt.month} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="text-[10px] font-bold text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        ${pt.amount.toLocaleString()}
                      </div>
                      <div className="w-full bg-muted rounded-t-lg relative flex items-end overflow-hidden h-32">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-full bg-amber-500/80 group-hover:bg-amber-500 transition-all rounded-t-md"
                        />
                      </div>
                      <span className="text-[11px] font-medium text-muted-foreground">{pt.month}</span>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>

        {/* Monthly Deposit History Chart */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="text-sm font-bold text-foreground">Monthly Deposit History</h3>
              <p className="text-xs text-muted-foreground">Aggregated inflow deposits and incoming wire (Last 6 Months)</p>
            </div>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>

          {!charts || charts.monthlyDeposits.every((p) => p.amount === 0) ? (
            <div className="h-44 flex flex-col items-center justify-center text-xs text-muted-foreground border border-dashed border-border rounded-xl">
              <TrendingUp className="h-6 w-6 text-muted-foreground/40 mb-1" />
              <span>No recorded deposits in the past 6 months.</span>
            </div>
          ) : (
            <div className="h-48 flex items-end justify-between gap-2 pt-6">
              {(() => {
                const maxVal = Math.max(...charts.monthlyDeposits.map((p) => p.amount), 1);
                return charts.monthlyDeposits.map((pt) => {
                  const heightPercent = Math.max(10, Math.round((pt.amount / maxVal) * 100));
                  return (
                    <div key={pt.month} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="text-[10px] font-bold text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        ${pt.amount.toLocaleString()}
                      </div>
                      <div className="w-full bg-muted rounded-t-lg relative flex items-end overflow-hidden h-32">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-full bg-emerald-500/80 group-hover:bg-emerald-500 transition-all rounded-t-md"
                        />
                      </div>
                      <span className="text-[11px] font-medium text-muted-foreground">{pt.month}</span>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 4: Transaction Distribution & Recent Transactions Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Distribution */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 lg:col-span-1">
          <div className="pb-3 border-b border-border">
            <h3 className="text-sm font-bold text-foreground">Transaction Distribution</h3>
            <p className="text-xs text-muted-foreground">Volume proportion by banking category</p>
          </div>

          {!charts || charts.distribution.every((d) => d.count === 0) ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              No transactions on record to distribute.
            </div>
          ) : (
            <div className="space-y-3">
              {charts.distribution.map((cat) => {
                const totalVol = charts.distribution.reduce((acc, c) => acc + c.volume, 0) || 1;
                const percent = Math.round((cat.volume / totalVol) * 100);
                return (
                  <div key={cat.category} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">{cat.category}</span>
                      <span className="text-muted-foreground">{cat.count} txns ({percent}%)</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        style={{ width: `${percent}%` }}
                        className="h-full bg-primary rounded-full transition-all"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Transactions Table */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="text-sm font-bold text-foreground">Recent Transactions</h3>
              <p className="text-xs text-muted-foreground">Latest transactions processed for your accounts</p>
            </div>
            <Link href="/dashboard/customer/transactions">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 gap-1 text-xs font-bold">
                <span>View Full History</span>
                <History className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 text-muted-foreground uppercase font-bold text-[10px] tracking-wider border-b border-border">
                <tr>
                  <th className="py-2.5 px-3">Transaction ID</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {recentTransactions && recentTransactions.length > 0 ? (
                  recentTransactions.map((txn) => (
                    <tr key={txn.id || txn.transactionId} className="hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-foreground">{txn.transactionId}</td>
                      <td className="py-2.5 px-3 text-muted-foreground truncate max-w-xs">{txn.description}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-muted text-muted-foreground uppercase">
                          {txn.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-extrabold text-foreground">
                        ${txn.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                            txn.status === "COMPLETED"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                              : txn.status === "PENDING"
                              ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                              : "bg-destructive/10 text-destructive border-destructive/20"
                          }`}
                        >
                          {txn.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-muted-foreground">
                        {new Date(txn.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      <History className="h-6 w-6 mx-auto mb-2 text-muted-foreground/40" />
                      <p className="font-medium text-foreground">No recent transactions recorded</p>
                      <p className="text-[11px] mt-0.5">Execute your first fund transfer or submit a deposit request to begin.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOverview;

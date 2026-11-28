"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAdminAnalytics, clearAdminMessages } from "@/store/slices/adminSlice";
import {
  BarChart3,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  FileSpreadsheet,
  Users,
} from "lucide-react";

export default function AdminAnalytics() {
  const dispatch = useAppDispatch();
  const { analytics, isLoading, error } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminAnalytics());
  }, [dispatch]);

  const hasVolumeData =
    analytics?.monthlyTransactionVolume && analytics.monthlyTransactionVolume.length > 0;
  const hasAccountData =
    analytics?.accountDistribution && analytics.accountDistribution.length > 0;
  const hasLoanData =
    analytics?.loanApprovalStats && analytics.loanApprovalStats.length > 0;
  const hasActivityData =
    analytics?.monthlyBankingActivity && analytics.monthlyBankingActivity.length > 0;

  const maxVolume = hasVolumeData
    ? Math.max(...analytics.monthlyTransactionVolume.map((v) => v.totalVolume), 1)
    : 1;

  const totalDep = analytics?.depositVsWithdrawal?.totalDeposited ?? 0;
  const totalWith = analytics?.depositVsWithdrawal?.totalWithdrawn ?? 0;
  const netCashflow = analytics?.depositVsWithdrawal?.netCashflow ?? 0;
  const totalFlow = totalDep + totalWith;
  const depPercent = totalFlow > 0 ? (totalDep / totalFlow) * 100 : 50;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Admin Governance
            </span>
            <span className="text-muted-foreground/60 text-sm">•</span>
            <span className="text-muted-foreground text-sm">Business Intelligence</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            Banking Analytics & Portfolio Health
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Aggregated institutional financial indicators, deposit/withdrawal liquidity velocity, and loan underwriting throughput.
          </p>
        </div>

        <button
          onClick={() => dispatch(fetchAdminAnalytics())}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-background hover:bg-muted text-foreground text-xs font-medium transition-colors border border-border w-fit shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-emerald-600 dark:text-emerald-400" : ""}`} />
          Refresh Analytics
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-200 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => dispatch(clearAdminMessages())} className="text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-200 p-1">
            ✕
          </button>
        </div>
      )}

      {/* Metric 1 & 2: Cashflow Ratio & Monthly Transaction Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deposit vs Withdrawal Liquidity Ratio */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Liquidity Velocity & Net Flow
            </h3>
          </div>

          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
              <span className="text-muted-foreground text-xs block mb-1">Institutional Net Cashflow</span>
              <div
                className={`text-2xl font-bold tracking-tight ${
                  netCashflow >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {netCashflow >= 0 ? "+" : ""}${netCashflow.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {netCashflow >= 0 ? "Net positive liquidity accretion" : "Net negative vault reserve drawdown"}
              </p>
            </div>

            {/* Ratio Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  Deposits: ${totalDep.toLocaleString()}
                </span>
                <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  Withdrawals: ${totalWith.toLocaleString()}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden flex border border-border">
                <div
                  style={{ width: `${depPercent}%` }}
                  className="bg-emerald-500 transition-all duration-500"
                  title={`Deposits: ${depPercent.toFixed(1)}%`}
                />
                <div
                  style={{ width: `${100 - depPercent}%` }}
                  className="bg-rose-500 transition-all duration-500"
                  title={`Withdrawals: ${(100 - depPercent).toFixed(1)}%`}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>{depPercent.toFixed(1)}% Inflow</span>
                <span>{(100 - depPercent).toFixed(1)}% Outflow</span>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Transaction Volume Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Monthly Transaction Volume ($)
            </h3>
            <span className="text-xs text-muted-foreground">Aggregated from MongoDB Transactions</span>
          </div>

          {!hasVolumeData ? (
            <div className="py-16 text-center text-muted-foreground text-xs italic">
              No historical monthly transactions recorded in database.
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-6 gap-2 items-end h-40 pt-6">
                {analytics.monthlyTransactionVolume.map((item, idx) => {
                  const heightPercent = Math.max(12, Math.round((item.totalVolume / maxVolume) * 100));
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                      <div className="text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        ${Math.round(item.totalVolume / 1000)}k
                      </div>
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full max-w-[42px] bg-emerald-500/80 hover:bg-emerald-500 rounded-t-lg transition-all relative cursor-pointer"
                      >
                        <div className="absolute inset-x-0 bottom-0 top-0 rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400 opacity-90" />
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium truncate max-w-full text-center">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-muted-foreground pt-2 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded bg-emerald-500" />
                  <span>Gross Clearance Volume</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metric 3 & 4: Account Distribution & Loan Underwriting Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Distribution */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Account Facilities Distribution
            </h3>
            <span className="text-xs text-muted-foreground">By Facility Type</span>
          </div>

          {!hasAccountData ? (
            <div className="py-12 text-center text-muted-foreground text-xs italic">
              No bank accounts created yet in database.
            </div>
          ) : (
            <div className="space-y-3">
              {analytics.accountDistribution.map((acc, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">{acc.type}</span>
                    <span className="text-muted-foreground font-mono">{acc.count} active accounts</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Aggregate Stored Balance:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      ${acc.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Loan Underwriting Approval Statistics */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Loan Portfolio Decision Breakdown
            </h3>
            <span className="text-xs text-muted-foreground">By Application Status</span>
          </div>

          {!hasLoanData ? (
            <div className="py-12 text-center text-muted-foreground text-xs italic">
              No loan applications submitted yet in database.
            </div>
          ) : (
            <div className="space-y-3">
              {analytics.loanApprovalStats.map((loan, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">{loan.status}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-muted text-foreground border border-border">
                      {loan.count} application(s)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Cumulative Capital:</span>
                    <span className="font-bold text-foreground">
                      ${loan.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Metric 5: Monthly Banking Activity */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            Monthly Banking Velocity (Signups, Ledger Transactions, & Lending)
          </h3>
          <span className="text-xs text-muted-foreground">Multi-Stream Activity Metrics</span>
        </div>

        {!hasActivityData ? (
          <div className="py-12 text-center text-muted-foreground text-xs italic">
            No monthly banking telemetry data available.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-foreground">
              <thead className="bg-muted/60 uppercase tracking-wider text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-4 py-3">Reporting Month</th>
                  <th className="px-4 py-3">New Customer Onboardings</th>
                  <th className="px-4 py-3">Transactions Executed</th>
                  <th className="px-4 py-3">Financing Applications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {analytics.monthlyBankingActivity.map((act, idx) => (
                  <tr key={idx} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground">{act.month}</td>
                    <td className="px-4 py-3 text-blue-600 dark:text-blue-400 font-medium">+{act.newCustomers} users</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-medium">{act.transactionsCount} txs</td>
                    <td className="px-4 py-3 text-amber-600 dark:text-amber-400 font-medium">{act.loansRequested} requests</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

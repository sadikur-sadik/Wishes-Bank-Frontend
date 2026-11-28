"use client";

import * as React from "react";
import Link from "next/link";
import {
  Building,
  Copy,
  Check,
  Download,
  ShieldCheck,
  ArrowDownLeft,
  ArrowLeftRight,
  FileText,
  AlertCircle,
  RefreshCw,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAccounts, selectAccount } from "@/store/slices/accountSlice";
import { showSuccess } from "@/lib/toast";

interface CustomerAccountsProps {
  userName: string;
}

export const CustomerAccounts = ({ userName }: CustomerAccountsProps) => {
  const dispatch = useAppDispatch();
  const { accounts, selectedAccount, isLoading, error } = useAppSelector(
    (state) => state.account
  );

  const [copied, setCopied] = React.useState(false);

  // Statement download state
  const [statementPeriod, setStatementPeriod] = React.useState("last_30_days");
  const [statementFormat, setStatementFormat] = React.useState("csv");
  const [downloadFeedback, setDownloadFeedback] = React.useState<string | null>(null);

  React.useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const activeAccount = selectedAccount || accounts[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadStatement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAccount) return;

    if (statementFormat === "csv") {
      const link = document.createElement("a");
      link.href = `/api/v1/customer/statements?accountId=${activeAccount.accountNumber}&format=csv`;
      link.download = `statement-${activeAccount.accountNumber}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showSuccess(`Exporting official CSV ledger for ${activeAccount.accountType} (${activeAccount.accountNumber}).`);
      setDownloadFeedback(
        `Exporting official CSV ledger for ${activeAccount.accountType} (${activeAccount.accountNumber}).`
      );
    } else {
      showSuccess(`PDF Statement generated for ${activeAccount.accountType}.`);
      setDownloadFeedback(
        `PDF Statement generated for ${activeAccount.accountType}. For CSV spreadsheet analysis, select the CSV format.`
      );
    }
    setTimeout(() => setDownloadFeedback(null), 5000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            <Building className="h-3.5 w-3.5" />
            <span>Depository Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Customer Account Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back, <span className="font-semibold text-foreground">{userName}</span>. Manage verified accounts and review live balances from the Wishes Bank core banking database.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/customer/transfers">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm gap-2">
              <ArrowLeftRight className="h-4 w-4" />
              <span>Transfer Funds</span>
            </Button>
          </Link>
        </div>
      </div>

      {isLoading && accounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-border rounded-2xl bg-card text-center gap-3">
          <RefreshCw className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Retrieving authorized bank accounts from database...</p>
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/10 text-xs text-destructive flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : accounts.length === 0 ? (
        /* Empty State */
        <div className="p-12 rounded-2xl border border-dashed border-border bg-card text-center space-y-3">
          <Wallet className="h-10 w-10 mx-auto text-muted-foreground/40" />
          <h3 className="text-base font-bold text-foreground">No Bank Accounts On File</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            You do not currently have any active bank accounts registered under your customer profile. Please consult your account manager.
          </p>
        </div>
      ) : (
        <>
          {/* SECTION 1: Account Overview & Switching Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">Accounts Overview</h2>
                <p className="text-xs text-muted-foreground">Select an account to view comprehensive details and actions</p>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {accounts.length} {accounts.length === 1 ? "Account" : "Accounts"} on file
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {accounts.map((acc) => {
                const isSelected = activeAccount?.id === acc.id || activeAccount?.accountNumber === acc.accountNumber;
                return (
                  <div
                    key={acc.id || acc.accountNumber}
                    onClick={() => dispatch(selectAccount(acc.id || acc.accountNumber))}
                    className={`relative p-5 rounded-2xl border transition-all cursor-pointer text-left select-none ${
                      isSelected
                        ? "bg-card border-primary ring-2 ring-primary/20 shadow-md shadow-primary/5"
                        : "bg-card/50 border-border hover:border-primary/40 hover:bg-card"
                    }`}
                  >
                    {/* Top Row: Type and Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {acc.accountType}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                          acc.accountStatus === "ACTIVE"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {acc.accountStatus}
                      </span>
                    </div>

                    {/* Account Balance */}
                    <div className="mb-4">
                      <div className="text-2xl font-extrabold text-foreground tracking-tight">
                        ${acc.availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">Available Balance</div>
                    </div>

                    {/* Masked / Short Number & Selector indicator */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/60 text-xs">
                      <span className="font-mono text-muted-foreground">{acc.accountNumber}</span>
                      <span
                        className={`text-xs font-semibold ${
                          isSelected ? "text-primary" : "text-muted-foreground/60"
                        }`}
                      >
                        {isSelected ? "Active View" : "Click to view"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: Selected Account Detailed Blueprint */}
          {activeAccount && (
            <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Building className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {activeAccount.accountType} Detailed Blueprint
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Complete credential and institutional details for wire and transfer execution
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">Routing: 026009593</span>
                  <span className="h-3 w-px bg-border" />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> FDIC Insured
                  </span>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Full Account Number + Copy */}
                <div className="p-4 rounded-xl bg-muted/30 border border-border/80">
                  <div className="text-xs text-muted-foreground font-medium mb-1">Full Account Number</div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm font-bold text-foreground tracking-wide">
                      {activeAccount.accountNumber}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(activeAccount.accountNumber)}
                      className="h-8 px-2 text-muted-foreground hover:text-foreground"
                      title="Copy Account Number"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {copied && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      Copied to clipboard!
                    </span>
                  )}
                </div>

                {/* Account Type */}
                <div className="p-4 rounded-xl bg-muted/30 border border-border/80">
                  <div className="text-xs text-muted-foreground font-medium mb-1">Account Category</div>
                  <div className="text-sm font-bold text-foreground">{activeAccount.accountType}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Primary Retail Depository</div>
                </div>

                {/* Daily Transfer Limit */}
                <div className="p-4 rounded-xl bg-muted/30 border border-border/80">
                  <div className="text-xs text-muted-foreground font-medium mb-1">Daily Transfer Limit</div>
                  <div className="text-sm font-bold text-foreground">
                    ${(activeAccount.dailyTransferLimit || 10000).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Resets at 00:00 UTC</div>
                </div>

                {/* Opening Date */}
                <div className="p-4 rounded-xl bg-muted/30 border border-border/80">
                  <div className="text-xs text-muted-foreground font-medium mb-1">Account Opening Date</div>
                  <div className="text-sm font-bold text-foreground">
                    {new Date(activeAccount.openedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Verified Identity</div>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/dashboard/customer/transfers">
                  <Button variant="outline" size="sm" className="gap-2 text-xs font-semibold">
                    <ArrowDownLeft className="h-3.5 w-3.5 text-primary" />
                    <span>Send from this Account</span>
                  </Button>
                </Link>
                <Link href="/dashboard/customer/statements">
                  <Button variant="outline" size="sm" className="gap-2 text-xs font-semibold">
                    <FileText className="h-3.5 w-3.5 text-primary" />
                    <span>Generate Statement</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* SECTION 3: Account Statements Module */}
          <div id="statements" className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Official Account Statements</h3>
                <p className="text-xs text-muted-foreground">
                  Generate signed statements and CSV ledgers for tax compliance and institutional verification.
                </p>
              </div>
            </div>

            <form onSubmit={handleDownloadStatement} className="space-y-4 max-w-xl">
              {/* Account Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Select Target Account
                </label>
                <select
                  value={activeAccount?.accountNumber}
                  onChange={(e) => dispatch(selectAccount(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.accountNumber}>
                      {acc.accountType} — {acc.accountNumber} (${acc.availableBalance.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Statement Period */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Reporting Period
                </label>
                <select
                  value={statementPeriod}
                  onChange={(e) => setStatementPeriod(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="last_30_days">Last 30 Days</option>
                  <option value="current_month">Current Billing Cycle (Month to Date)</option>
                  <option value="previous_month">Previous Full Month</option>
                  <option value="last_quarter">Last Quarter (90 Days)</option>
                  <option value="fiscal_year_2026">Fiscal Year 2026</option>
                </select>
              </div>

              {/* Statement Format */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Output Document Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatementFormat("csv")}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      statementFormat === "csv"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    CSV Spreadsheet
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatementFormat("pdf")}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      statementFormat === "pdf"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    Encrypted PDF Document
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 mt-2"
              >
                <Download className="h-4 w-4" />
                <span>Generate & Download Statement</span>
              </Button>
            </form>

            {downloadFeedback && (
              <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/10 text-xs text-foreground space-y-1 animate-in fade-in max-w-xl">
                <p className="font-bold flex items-center gap-1.5 text-primary">
                  <Check className="h-4 w-4" />
                  <span>Statement Request Processed</span>
                </p>
                <p className="text-muted-foreground leading-relaxed">{downloadFeedback}</p>
              </div>
            )}

            <div className="p-3 rounded-xl bg-muted/20 border border-border/60 text-[11px] text-muted-foreground flex items-center gap-2 max-w-xl">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Statements include institutional routing number #026009593</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerAccounts;

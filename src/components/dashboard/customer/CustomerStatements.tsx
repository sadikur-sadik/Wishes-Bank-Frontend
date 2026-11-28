"use client";

import * as React from "react";
import {
  FileText,
  Download,
  ShieldCheck,
  RefreshCw,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAccounts } from "@/store/slices/accountSlice";
import { showSuccess, showError } from "@/lib/toast";

interface StatementRecord {
  id: string;
  transactionId: string;
  type: string;
  amount: number;
  fee: number;
  status: string;
  description: string;
  reference?: string;
  date: string;
}

interface StatementSummary {
  transactionCount: number;
  totalInflow: number;
  totalOutflow: number;
  netChange: number;
}

export const CustomerStatements = () => {
  const dispatch = useAppDispatch();
  const { accounts } = useAppSelector((state) => state.account);

  const [selectedAccount, setSelectedAccount] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [summary, setSummary] = React.useState<StatementSummary | null>(null);
  const [transactions, setTransactions] = React.useState<StatementRecord[]>([]);

  React.useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const activeAccount = selectedAccount || accounts[0]?.accountNumber || "";

  React.useEffect(() => {
    let isMounted = true;
    if (!activeAccount) return;

    const params = new URLSearchParams();
    params.append("accountId", activeAccount);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    fetch(`/api/v1/customer/statements?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (isMounted && json?.data) {
          setSummary(json.data.summary);
          setTransactions(json.data.transactions);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Statement fetch error:", err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeAccount, startDate, endDate]);

  const handleDownloadCsv = () => {
    if (!activeAccount) {
      showError("Please select a bank account to export statement.");
      return;
    }
    const params = new URLSearchParams();
    params.append("accountId", activeAccount);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    params.append("format", "csv");
    
    const link = document.createElement("a");
    link.href = `/api/v1/customer/statements?${params.toString()}`;
    link.download = `statement-${activeAccount}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSuccess(`Statement exported successfully for account ${activeAccount}.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            <FileText className="h-3.5 w-3.5" />
            <span>Audited Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Account Statements
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Generate and export official depository transaction records and CSV spreadsheets for financial auditing.
          </p>
        </div>

        <Button
          onClick={handleDownloadCsv}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2 text-xs"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV Ledger</span>
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Account Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Select Depository Account
            </label>
            <select
              value={activeAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.accountNumber}>
                  {acc.accountType} — {acc.accountNumber}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <span className="text-xs text-muted-foreground uppercase font-semibold">Total Inflow</span>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
              <TrendingUp className="h-5 w-5" />
              <span>${summary.totalInflow.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <span className="text-xs text-muted-foreground uppercase font-semibold">Total Outflow</span>
            <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1.5">
              <TrendingDown className="h-5 w-5" />
              <span>${summary.totalOutflow.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <span className="text-xs text-muted-foreground uppercase font-semibold">Net Account Change</span>
            <div className="text-xl font-black text-foreground mt-1">
              ${summary.netChange.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h2 className="text-base font-bold text-foreground">Statement Ledger Entries</h2>
          <span className="text-xs font-medium text-muted-foreground">
            {transactions.length} Transactions Found
          </span>
        </div>

        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="h-6 w-6 text-primary animate-spin" />
            <span>Compiling verified account statement...</span>
          </div>
        ) : transactions.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
            <p className="font-semibold text-foreground text-sm">No Transactions In Selected Range</p>
            <p className="text-xs mt-1">Adjust the date range or select another depository account.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 text-muted-foreground uppercase font-bold text-[10px] tracking-wider border-b border-border">
                <tr>
                  <th className="py-2.5 px-3">Transaction ID</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {transactions.map((t) => (
                  <tr key={t.id || t.transactionId} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-foreground">{t.transactionId}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-muted text-muted-foreground uppercase">
                        {t.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-foreground max-w-xs truncate">{t.description}</td>
                    <td className="py-3 px-3 font-extrabold text-foreground">
                      ${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                          t.status === "COMPLETED"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-3.5 rounded-xl bg-muted/20 border border-border text-[11px] text-muted-foreground flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>Statement verified under Wishes Bank LTD clearance ledger protocol. Routing #026009593</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerStatements;

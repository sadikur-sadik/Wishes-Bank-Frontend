"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAdminTransactions,
  fetchFlaggedTransactions,
  resolveFlaggedTransactionThunk,
  clearAdminMessages,
  AdminTransactionItem,
  AdminFlaggedItem,
} from "@/store/slices/adminSlice";
import { showSuccess, showError } from "@/lib/toast";
import {
  ArrowLeftRight,
  Search,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  Flag,
  FileText,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

export default function AdminTransactions() {
  const dispatch = useAppDispatch();
  const {
    transactions,
    transactionsTotal,
    flaggedTransactions,
    isLoading,
    actionLoading,
    actionSuccessMessage,
    error,
  } = useAppSelector((state) => state.admin);

  // Tabs: "ledger" | "flagged"
  const [activeTab, setActiveTab] = useState<"ledger" | "flagged">("ledger");

  // Ledger Search & Filter
  const [search, setSearch] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);

  // Selected Transaction for Details
  const [selectedTx, setSelectedTx] = useState<AdminTransactionItem | null>(null);

  // Flag Resolution Modal
  const [resolveItem, setResolveItem] = useState<AdminFlaggedItem | null>(null);
  const [outcome, setOutcome] = useState("RESOLVED_VALID");
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    if (activeTab === "ledger") {
      dispatch(
        fetchAdminTransactions({
          search,
          accountNumber,
          type: typeFilter,
          status: statusFilter,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          page,
        })
      );
    } else {
      dispatch(fetchFlaggedTransactions());
    }
  }, [dispatch, activeTab, search, accountNumber, typeFilter, statusFilter, startDate, endDate, page]);

  const handleResolveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolveItem) return;

    const result = await dispatch(
      resolveFlaggedTransactionThunk({
        id: resolveItem.id || resolveItem.transactionId,
        outcome,
        adminNotes: adminNotes.trim() || undefined,
      })
    );

    if (resolveFlaggedTransactionThunk.fulfilled.match(result)) {
      showSuccess(`Flagged transaction compliance review resolved as ${outcome}.`);
      setResolveItem(null);
      setAdminNotes("");
    } else if (resolveFlaggedTransactionThunk.rejected.match(result)) {
      showError(String(result.payload || "Failed to resolve compliance review."));
    }
  };

  const totalPages = Math.max(1, Math.ceil(transactionsTotal / 10));

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "DEPOSIT":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
      case "WITHDRAWAL":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20";
      case "TRANSFER":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
      case "LOAN_DISBURSEMENT":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20";
      case "LOAN_REPAYMENT":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
      default:
        return "bg-muted text-muted-foreground border border-border";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
      case "PENDING":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
      case "FAILED":
      case "REVERSED":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20";
      default:
        return "bg-muted text-muted-foreground border border-border";
    }
  };

  const getOutcomeBadge = (status: string) => {
    switch (status) {
      case "RESOLVED_VALID":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
      case "RESOLVED_FRAUDULENT":
        return "bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/40";
      case "DISMISSED":
        return "bg-muted text-muted-foreground border border-border";
      default:
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
    }
  };

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
            <span className="text-muted-foreground text-sm">Institutional Clearing</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1 flex items-center gap-2">
            <ArrowLeftRight className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            Transaction Ledger & Compliance Flags
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Audit the bank-wide double-entry ledger, track fee revenues, and resolve suspicious activity flagged by officers.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-muted/60 border border-border p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("ledger")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "ledger"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/20"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Bank Ledger
          </button>
          <button
            onClick={() => setActiveTab("flagged")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "flagged"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/20"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Flag className="w-3.5 h-3.5 text-rose-500" />
            Suspicious Flags
            {flaggedTransactions.filter((f) => f.status === "PENDING_REVIEW").length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px]">
                {flaggedTransactions.filter((f) => f.status === "PENDING_REVIEW").length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Messages */}
      {actionSuccessMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{actionSuccessMessage}</span>
          </div>
          <button
            onClick={() => dispatch(clearAdminMessages())}
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-200 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => dispatch(clearAdminMessages())}
            className="text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-200 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TAB 1: BANK-WIDE LEDGER */}
      {activeTab === "ledger" && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-card border border-border rounded-2xl p-4 flex flex-col md:flex-row flex-wrap gap-3 items-center justify-between shadow-sm">
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <div className="relative w-full sm:w-56">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search TxID or memo..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full bg-background border border-input rounded-xl pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <input
                type="text"
                placeholder="Account #..."
                value={accountNumber}
                onChange={(e) => {
                  setAccountNumber(e.target.value);
                  setPage(1);
                }}
                className="w-full sm:w-36 bg-background border border-input rounded-xl px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              />

              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-background border border-input rounded-xl px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="ALL">All Types</option>
                <option value="DEPOSIT">Deposit</option>
                <option value="WITHDRAWAL">Withdrawal</option>
                <option value="TRANSFER">Transfer</option>
                <option value="LOAN_DISBURSEMENT">Loan Disbursement</option>
                <option value="LOAN_REPAYMENT">Loan Repayment</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-background border border-input rounded-xl px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="COMPLETED">Completed</option>
                <option value="PENDING">Pending</option>
                <option value="FAILED">Failed</option>
                <option value="REVERSED">Reversed</option>
              </select>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setPage(1);
                }}
                className="bg-background border border-input rounded-xl px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <span className="text-xs text-muted-foreground">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setPage(1);
                }}
                className="bg-background border border-input rounded-xl px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              />

              <button
                onClick={() =>
                  dispatch(
                    fetchAdminTransactions({
                      search,
                      accountNumber,
                      type: typeFilter,
                      status: statusFilter,
                      startDate: startDate || undefined,
                      endDate: endDate || undefined,
                      page,
                    })
                  )
                }
                title="Refresh ledger"
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors border border-border"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-emerald-600 dark:text-emerald-400" : ""}`} />
              </button>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-foreground">
                <thead className="bg-muted/60 uppercase tracking-wider text-muted-foreground border-b border-border">
                  <tr>
                    <th className="px-4 py-3">Transaction ID</th>
                    <th className="px-4 py-3">Account</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Fee</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {isLoading && transactions.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                        <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                        Loading ledger transactions from database...
                      </td>
                    </tr>
                  ) : transactions.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                        <ArrowLeftRight className="w-7 h-7 mx-auto mb-2 opacity-40 text-muted-foreground" />
                        No transactions found for the specified filters.
                      </td>
                    </tr>
                  ) : (
                    transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-muted/40 transition-colors">
                        <td className="px-4 py-3 font-mono font-medium text-emerald-600 dark:text-emerald-400">
                          {tx.transactionId}
                        </td>
                        <td className="px-4 py-3 font-mono text-foreground">
                          {tx.accountNumber}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getTypeBadge(tx.type)}`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-foreground">
                          ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          ${(tx.fee || 0).toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getStatusBadge(tx.status)}`}>
                              {tx.status}
                            </span>
                            {tx.isFlagged && (
                              <span className="p-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30" title="Flagged Suspicious">
                                <Flag className="w-3 h-3 fill-rose-500" />
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-[11px]">
                          {new Date(tx.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => setSelectedTx(tx)}
                            className="p-1 rounded-lg bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border"
                            title="Inspect Details"
                          >
                            <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground bg-muted/20">
              <div>
                Showing <span className="font-semibold text-foreground">{transactions.length}</span> of{" "}
                <span className="font-semibold text-foreground">{transactionsTotal}</span> total transactions
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className="p-1 rounded-lg bg-background border border-border text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                  className="p-1 rounded-lg bg-background border border-border text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FLAGGED SUSPICIOUS TRANSACTIONS */}
      {activeTab === "flagged" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Flag className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                Transactions Flagged for Executive Review
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Staff compliance alerts requiring administrative adjudication. Adjudication does not alter historical ledger amounts.
              </p>
            </div>
            <button
              onClick={() => dispatch(fetchFlaggedTransactions())}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors border border-border"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-emerald-600 dark:text-emerald-400" : ""}`} />
            </button>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-foreground">
                <thead className="bg-muted/60 uppercase tracking-wider text-muted-foreground border-b border-border">
                  <tr>
                    <th className="px-4 py-3">Transaction ID</th>
                    <th className="px-4 py-3">Flagged By</th>
                    <th className="px-4 py-3">Suspicion Reason</th>
                    <th className="px-4 py-3">Adjudication Status</th>
                    <th className="px-4 py-3">Flagged Date</th>
                    <th className="px-4 py-3 text-right">Adjudicate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {isLoading && flaggedTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                        <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                        Loading flagged transactions...
                      </td>
                    </tr>
                  ) : flaggedTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                        <CheckCircle2 className="w-7 h-7 mx-auto mb-2 opacity-40 text-emerald-600 dark:text-emerald-400" />
                        No suspicious transaction flags on file. Compliance is clean!
                      </td>
                    </tr>
                  ) : (
                    flaggedTransactions.map((f) => (
                      <tr key={f.id} className="hover:bg-muted/40 transition-colors">
                        <td className="px-4 py-3 font-mono font-medium text-rose-600 dark:text-rose-400">
                          {f.transactionId}
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          {f.staffEmail}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">
                          &quot;{f.reason}&quot;
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getOutcomeBadge(f.status)}`}>
                            {f.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-[11px]">
                          {new Date(f.flaggedAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => {
                              setResolveItem(f);
                              setOutcome("RESOLVED_VALID");
                              setAdminNotes(f.adminNotes || "");
                            }}
                            className="px-2.5 py-1 rounded-lg bg-background hover:bg-muted text-foreground text-[11px] font-medium border border-border transition-colors"
                          >
                            Resolve
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Flag Resolution Adjudication Modal */}
      {resolveItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/40">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  <Flag className="w-5 h-5 fill-rose-500/30" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Adjudicate Compliance Flag</h4>
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-mono">{resolveItem.transactionId}</p>
                </div>
              </div>
              <button
                onClick={() => setResolveItem(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleResolveSubmit} className="p-5 space-y-4 text-xs">
              <div className="bg-muted/40 p-3 rounded-xl border border-border space-y-1 text-foreground">
                <div>
                  Flagged By: <span className="font-medium text-foreground">{resolveItem.staffEmail}</span>
                </div>
                <div>
                  Suspicion Reason: <span className="text-rose-600 dark:text-rose-300 italic">&quot;{resolveItem.reason}&quot;</span>
                </div>
              </div>

              <div>
                <label className="block text-foreground font-medium mb-1">
                  Administrative Outcome <span className="text-rose-500">*</span>
                </label>
                <select
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                  className="w-full bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="RESOLVED_VALID">RESOLVED VALID — Transaction verified legitimate</option>
                  <option value="RESOLVED_FRAUDULENT">RESOLVED FRAUDULENT — Confirmed illicit activity</option>
                  <option value="DISMISSED">DISMISSED — False positive / no violation found</option>
                </select>
              </div>

              <div>
                <label className="block text-foreground font-medium mb-1">Admin Audit Notes</label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Spoke with customer, verified signature card, compliance file #910..."
                  className="w-full bg-background border border-input rounded-xl p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setResolveItem(null)}
                  className="px-3 py-2 rounded-xl bg-background hover:bg-muted border border-border text-foreground text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-md shadow-emerald-950/20 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {actionLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  Submit Determination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transaction Inspection Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/40">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Transaction Ledger Entry</h3>
                  <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400">{selectedTx.transactionId}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-0.5">Account Number</span>
                  <span className="font-mono font-semibold text-foreground">{selectedTx.accountNumber}</span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-0.5">Type</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getTypeBadge(selectedTx.type)}`}>
                    {selectedTx.type}
                  </span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-0.5">Amount</span>
                  <span className="text-base font-bold text-foreground">
                    ${selectedTx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-0.5">Status</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getStatusBadge(selectedTx.status)}`}>
                    {selectedTx.status}
                  </span>
                </div>
              </div>

              <div className="bg-muted/40 p-3.5 rounded-xl border border-border space-y-1.5 text-foreground">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Institutional Revenue (Fee):</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">${(selectedTx.fee || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Memo / Description:</span>
                  <span className="text-foreground">{selectedTx.description}</span>
                </div>
                {selectedTx.reference && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">External Clearing Reference:</span>
                    <span className="font-mono text-foreground">{selectedTx.reference}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recorded Timestamp:</span>
                  <span className="text-foreground">{new Date(selectedTx.date).toLocaleString()}</span>
                </div>
              </div>

              {selectedTx.isFlagged && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-300 space-y-1">
                  <span className="font-semibold text-rose-700 dark:text-rose-200 flex items-center gap-1">
                    <Flag className="w-3.5 h-3.5 fill-rose-500" />
                    Flagged Suspicious by Staff
                  </span>
                  <p className="text-[11px] text-rose-700/80 dark:text-rose-300/80 italic">&quot;{selectedTx.flagReason}&quot;</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border bg-muted/20 flex justify-end">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 rounded-xl bg-background hover:bg-muted border border-border text-foreground text-xs font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

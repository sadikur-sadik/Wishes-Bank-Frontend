"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchStaffTransactions,
  fetchStaffPendingRequests,
  reviewStaffRequestThunk,
  flagSuspiciousTransactionThunk,
  clearStaffMessages,
  StaffTransactionItem,
  StaffPendingRequest,
} from "@/store/slices/staffSlice";
import { showSuccess, showError } from "@/lib/toast";
import {
  ArrowLeftRight,
  Search,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  Flag,
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  ArrowDownLeft,
  ArrowUpRight,
  AlertTriangle,
  FileText,
  ShieldAlert,
} from "lucide-react";

export default function StaffTransactions() {
  const dispatch = useAppDispatch();
  const {
    transactions,
    transactionsTotal,
    pendingDeposits,
    pendingWithdrawals,
    isLoading,
    actionLoading,
    actionSuccessMessage,
    error,
  } = useAppSelector((state) => state.staff);

  // Tab state: "pending" | "ledger"
  const [activeTab, setActiveTab] = useState<"pending" | "ledger">("pending");

  // Ledger Filter & Search
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);

  // Review Modal state
  const [reviewModalData, setReviewModalData] = useState<{
    type: "deposit" | "withdrawal";
    item: StaffPendingRequest;
    action: "APPROVE" | "REJECT";
  } | null>(null);
  const [decisionNote, setDecisionNote] = useState("");

  // Flag Modal state
  const [flagModalItem, setFlagModalItem] = useState<StaffTransactionItem | null>(null);
  const [flagReason, setFlagReason] = useState("");
  const [flagError, setFlagError] = useState("");

  // Details Modal
  const [selectedTx, setSelectedTx] = useState<StaffTransactionItem | null>(null);

  useEffect(() => {
    dispatch(fetchStaffPendingRequests());
  }, [dispatch]);

  useEffect(() => {
    if (activeTab === "ledger") {
      dispatch(
        fetchStaffTransactions({
          search,
          type: typeFilter,
          status: statusFilter,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          page,
        })
      );
    }
  }, [dispatch, activeTab, search, typeFilter, statusFilter, startDate, endDate, page]);

  const handleReviewSubmit = async () => {
    if (!reviewModalData) return;
    const result = await dispatch(
      reviewStaffRequestThunk({
        type: reviewModalData.type,
        id: (reviewModalData.item._id || reviewModalData.item.id || reviewModalData.item.requestId) as string,
        action: reviewModalData.action,
        decisionNote: decisionNote.trim() || undefined,
      })
    );
    if (reviewStaffRequestThunk.fulfilled.match(result)) {
      showSuccess(
        `${reviewModalData.type === "deposit" ? "Deposit" : "Withdrawal"} request ${reviewModalData.action.toLowerCase()}ed successfully.`
      );
      setReviewModalData(null);
      setDecisionNote("");
    } else if (reviewStaffRequestThunk.rejected.match(result)) {
      showError(String(result.payload || `Failed to ${reviewModalData.action.toLowerCase()} request.`));
    }
  };

  const handleFlagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFlagError("");
    if (!flagModalItem) return;
    if (flagReason.trim().length < 5) {
      const msg = "Please provide an explanatory reason for flagging (at least 5 characters).";
      setFlagError(msg);
      showError(msg);
      return;
    }

    const result = await dispatch(
      flagSuspiciousTransactionThunk({
        id: flagModalItem.id || flagModalItem.transactionId,
        reason: flagReason.trim(),
      })
    );
    if (flagSuspiciousTransactionThunk.fulfilled.match(result)) {
      showSuccess("Transaction flagged for compliance investigation.");
      setFlagModalItem(null);
      setFlagReason("");
    } else if (flagSuspiciousTransactionThunk.rejected.match(result)) {
      showError(String(result.payload || "Failed to flag transaction."));
    }
  };

  const totalPending = (pendingDeposits?.length || 0) + (pendingWithdrawals?.length || 0);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Staff Portal
            </span>
            <span className="text-muted-foreground text-sm">•</span>
            <span className="text-muted-foreground text-sm">Clearance & Audit</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1 flex items-center gap-2">
            <ArrowLeftRight className="w-6 h-6 text-primary" />
            Transaction Management
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Process pending counter requests, inspect the institutional ledger, and flag suspicious activity.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-muted/60 border border-border p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "pending"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Pending Approvals
            {totalPending > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px]">
                {totalPending}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("ledger")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "ledger"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Institutional Ledger
          </button>
        </div>
      </div>

      {/* Messages */}
      {actionSuccessMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-200 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{actionSuccessMessage}</span>
          </div>
          <button
            onClick={() => dispatch(clearStaffMessages())}
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
            onClick={() => dispatch(clearStaffMessages())}
            className="text-rose-600 dark:text-rose-400 hover:opacity-80 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TAB 1: PENDING APPROVALS */}
      {activeTab === "pending" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Deposit & Withdrawal Requests Awaiting Staff Verification
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Approving a request updates the customer balance and posts a double-entry transaction record.
              </p>
            </div>
            <button
              onClick={() => dispatch(fetchStaffPendingRequests())}
              title="Refresh requests"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors border border-border cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-primary" : ""}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Deposits */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ArrowDownLeft className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-card-foreground text-sm">Pending Deposit Slips</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-muted text-muted-foreground">
                  {pendingDeposits?.length || 0} queue items
                </span>
              </div>

              {!pendingDeposits || pendingDeposits.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground text-xs">
                  No pending deposit slips in queue. All clear!
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingDeposits.map((dep: StaffPendingRequest) => (
                    <div
                      key={dep._id || dep.id}
                      className="p-4 rounded-xl bg-muted/40 border border-border space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-primary">
                              {dep.requestId}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {dep.createdAt ? new Date(dep.createdAt).toLocaleDateString() : "Recent"}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Account: <span className="font-mono text-foreground font-medium">{dep.accountNumber}</span>
                          </p>
                          <p className="text-xs text-muted-foreground italic mt-0.5">&quot;{dep.description}&quot;</p>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                            +${dep.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                          <span className="block text-[10px] text-muted-foreground">
                            Method: {dep.paymentMethod || "Bank Transfer"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                        <button
                          onClick={() =>
                            setReviewModalData({ type: "deposit", item: dep, action: "REJECT" })
                          }
                          className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium border border-rose-500/20 transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() =>
                            setReviewModalData({ type: "deposit", item: dep, action: "APPROVE" })
                          }
                          className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Approve Deposit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pending Withdrawals */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-card-foreground text-sm">Pending Withdrawal Slips</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-muted text-muted-foreground">
                  {pendingWithdrawals?.length || 0} queue items
                </span>
              </div>

              {!pendingWithdrawals || pendingWithdrawals.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground text-xs">
                  No pending withdrawal slips in queue. All clear!
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingWithdrawals.map((w: StaffPendingRequest) => (
                    <div
                      key={w._id || w.id}
                      className="p-4 rounded-xl bg-muted/40 border border-border space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-rose-600 dark:text-rose-400">
                              {w.requestId}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {w.createdAt ? new Date(w.createdAt).toLocaleDateString() : "Recent"}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Account: <span className="font-mono text-foreground font-medium">{w.accountNumber}</span>
                          </p>
                          <p className="text-xs text-muted-foreground italic mt-0.5">&quot;{w.description}&quot;</p>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-bold text-rose-600 dark:text-rose-400">
                            -${w.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                          <span className="block text-[10px] text-muted-foreground">
                            Method: {w.withdrawalMethod || "Counter Cash"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                        <button
                          onClick={() =>
                            setReviewModalData({ type: "withdrawal", item: w, action: "REJECT" })
                          }
                          className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium border border-rose-500/20 transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() =>
                            setReviewModalData({ type: "withdrawal", item: w, action: "APPROVE" })
                          }
                          className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Approve Withdrawal
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INSTITUTIONAL LEDGER */}
      {activeTab === "ledger" && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-card border border-border rounded-2xl p-4 flex flex-col md:flex-row flex-wrap gap-3 items-center justify-between shadow-xs">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search transaction ID..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-background border border-input rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              {/* Type Filter */}
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-background border border-input rounded-xl px-2.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="ALL">All Types</option>
                <option value="DEPOSIT">Deposit</option>
                <option value="WITHDRAWAL">Withdrawal</option>
                <option value="TRANSFER">Transfer</option>
                <option value="LOAN_DISBURSEMENT">Loan Disbursement</option>
                <option value="LOAN_REPAYMENT">Loan Repayment</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-background border border-input rounded-xl px-2.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="ALL">All Statuses</option>
                <option value="COMPLETED">Completed</option>
                <option value="PENDING">Pending</option>
                <option value="FAILED">Failed</option>
                <option value="REVERSED">Reversed</option>
              </select>

              {/* Date Filters */}
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setPage(1);
                }}
                className="bg-background border border-input rounded-xl px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
              />
              <span className="text-xs text-muted-foreground">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setPage(1);
                }}
                className="bg-background border border-input rounded-xl px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
              />

              <button
                onClick={() =>
                  dispatch(
                    fetchStaffTransactions({
                      search,
                      type: typeFilter,
                      status: statusFilter,
                      startDate: startDate || undefined,
                      endDate: endDate || undefined,
                      page,
                    })
                  )
                }
                title="Refresh ledger"
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors border border-border cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-primary" : ""}`} />
              </button>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
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
                <tbody className="divide-y divide-border">
                  {isLoading && transactions.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                        <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-primary" />
                        Loading ledger transactions...
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
                      <tr key={tx.id || tx.transactionId} className="hover:bg-muted/40 transition-colors">
                        <td className="px-4 py-3 font-mono font-medium text-primary">
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
                              <span className="p-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20" title="Flagged Suspicious">
                                <Flag className="w-3 h-3 fill-rose-500" />
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-[11px]">
                          {new Date(tx.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedTx(tx)}
                              className="p-1 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors border border-border cursor-pointer"
                              title="View Details"
                            >
                              <Eye className="w-3.5 h-3.5 text-primary" />
                            </button>
                            {!tx.isFlagged ? (
                              <button
                                onClick={() => {
                                  setFlagModalItem(tx);
                                  setFlagReason("");
                                  setFlagError("");
                                }}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[11px] font-medium border border-rose-500/20 transition-colors cursor-pointer"
                                title="Flag for Admin Review"
                              >
                                <Flag className="w-3 h-3" />
                                Flag
                              </button>
                            ) : (
                              <span className="text-[10px] text-rose-600 dark:text-rose-400/80 italic">Flagged</span>
                            )}
                          </div>
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
                <span className="font-semibold text-foreground">{transactionsTotal}</span> total records
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className="p-1 rounded-lg bg-card border border-border text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                  className="p-1 rounded-lg bg-card border border-border text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decision Review Modal */}
      {reviewModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-xl ${
                    reviewModalData.action === "APPROVE"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                  }`}
                >
                  {reviewModalData.action === "APPROVE" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-card-foreground">
                    Confirm {reviewModalData.action === "APPROVE" ? "Approval" : "Rejection"}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    {reviewModalData.item.requestId} ({reviewModalData.type.toUpperCase()})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setReviewModalData(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="bg-muted/40 p-3 rounded-xl border border-border space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account:</span>
                  <span className="font-mono text-foreground font-semibold">
                    {reviewModalData.item.accountNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-bold text-foreground text-sm">
                    ${reviewModalData.item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Description:</span>
                  <span className="text-foreground italic">{reviewModalData.item.description}</span>
                </div>
              </div>

              <div>
                <label className="block text-foreground font-medium mb-1">
                  Staff Verification Note (Optional)
                </label>
                <textarea
                  rows={3}
                  value={decisionNote}
                  onChange={(e) => setDecisionNote(e.target.value)}
                  placeholder="e.g. Verified photo ID and deposit slip at counter..."
                  className="w-full bg-background border border-input rounded-xl p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border text-muted-foreground text-[11px]">
                {reviewModalData.action === "APPROVE" ? (
                  <p>
                    Approving will immediately credit/debit the account in MongoDB and write an audited transaction record.
                  </p>
                ) : (
                  <p>
                    Rejecting will mark the request as REJECTED. No account balances will be adjusted.
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-border bg-muted/20 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setReviewModalData(null)}
                className="px-3 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors border border-border cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={handleReviewSubmit}
                className={`px-4 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm cursor-pointer ${
                  reviewModalData.action === "APPROVE"
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-rose-600 hover:bg-rose-500"
                } disabled:opacity-50 flex items-center gap-1.5`}
              >
                {actionLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                Confirm {reviewModalData.action === "APPROVE" ? "Approval" : "Rejection"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flag Suspicious Transaction Modal */}
      {flagModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  <Flag className="w-5 h-5 fill-rose-500/30" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-card-foreground">Flag Suspicious Transaction</h3>
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-mono">{flagModalItem.transactionId}</p>
                </div>
              </div>
              <button
                onClick={() => setFlagModalItem(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFlagSubmit} className="p-5 space-y-4 text-xs">
              {flagError && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-300 text-[11px] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>{flagError}</span>
                </div>
              )}

              <div className="bg-muted/40 p-3 rounded-xl border border-border space-y-1 text-muted-foreground">
                <div>
                  Account: <span className="font-mono text-foreground font-semibold">{flagModalItem.accountNumber}</span>
                </div>
                <div>
                  Amount: <span className="font-bold text-foreground">${flagModalItem.amount.toFixed(2)}</span> ({flagModalItem.type})
                </div>
              </div>

              <div>
                <label className="block text-foreground font-medium mb-1">
                  Reason for Flagging <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={flagReason}
                  onChange={(e) => setFlagReason(e.target.value)}
                  placeholder="Detail why this transaction appears anomalous or illicit (e.g. rapid succession of large transfers, irregular beneficiary)..."
                  className="w-full bg-background border border-input rounded-xl p-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border text-muted-foreground text-[11px] flex gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Flagging alerts the Compliance & Admin Board. It does <strong>not</strong> alter balances or reverse transactions automatically.
                </span>
              </div>

              <div className="p-2 border-t border-border bg-muted/20 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFlagModalItem(null)}
                  className="px-3 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors border border-border cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-all shadow-sm disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  {actionLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  Submit Flag for Admin Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-card-foreground">Transaction Detail Record</h3>
                  <p className="text-xs font-mono text-primary">{selectedTx.transactionId}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs">
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

              <div className="bg-muted/40 p-3.5 rounded-xl border border-border space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Institutional Fee:</span>
                  <span className="text-foreground">${(selectedTx.fee || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Description:</span>
                  <span className="text-foreground">{selectedTx.description}</span>
                </div>
                {selectedTx.reference && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">External Reference:</span>
                    <span className="font-mono text-foreground">{selectedTx.reference}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timestamp:</span>
                  <span className="text-foreground">{new Date(selectedTx.date).toLocaleString()}</span>
                </div>
              </div>

              {selectedTx.isFlagged && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-300">
                  <p className="font-semibold text-rose-900 dark:text-rose-200 flex items-center gap-1.5 mb-1">
                    <Flag className="w-3.5 h-3.5 fill-rose-500" />
                    Flagged for Admin Review
                  </p>
                  <p className="text-[11px] text-rose-800/90 dark:text-rose-300/90 italic">Reason: &quot;{selectedTx.flagReason}&quot;</p>
                  {selectedTx.flaggedAt && (
                    <span className="block text-[10px] text-rose-700/70 dark:text-rose-400/60 mt-1">
                      Flagged on: {new Date(selectedTx.flaggedAt).toLocaleString()}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border bg-muted/20 flex justify-end">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors border border-border cursor-pointer"
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

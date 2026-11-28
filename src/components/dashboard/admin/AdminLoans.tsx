"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAdminLoans,
  reviewLoanDecisionThunk,
  disburseLoanThunk,
  clearAdminMessages,
  AdminLoanItem,
} from "@/store/slices/adminSlice";
import { showSuccess, showError } from "@/lib/toast";
import {
  FileSpreadsheet,
  Search,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  Eye,
  MessageSquare,
  DollarSign,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function AdminLoans() {
  const dispatch = useAppDispatch();
  const { loans, loansTotal, isLoading, actionLoading, actionSuccessMessage, error } =
    useAppSelector((state) => state.admin);

  // Filters & Search
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  // Selected Loan for review drawer / modal
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);

  // Decision Modal
  const [decisionModalLoan, setDecisionModalLoan] = useState<AdminLoanItem | null>(null);
  const [decisionAction, setDecisionAction] = useState<"APPROVE" | "REJECT">("APPROVE");
  const [decisionNote, setDecisionNote] = useState("");

  // Disbursement Modal
  const [disburseModalLoan, setDisburseModalLoan] = useState<AdminLoanItem | null>(null);
  const [targetAccount, setTargetAccount] = useState("");

  useEffect(() => {
    dispatch(fetchAdminLoans({ search, status: statusFilter, type: typeFilter, page }));
  }, [dispatch, search, statusFilter, typeFilter, page]);

  const selectedLoan = selectedLoanId
    ? loans.find((l) => l.id === selectedLoanId || l.loanId === selectedLoanId) || null
    : null;

  const handleDecisionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!decisionModalLoan) return;

    const result = await dispatch(
      reviewLoanDecisionThunk({
        id: decisionModalLoan.id || decisionModalLoan.loanId,
        action: decisionAction,
        decisionNote: decisionNote.trim() || undefined,
      })
    );

    if (reviewLoanDecisionThunk.fulfilled.match(result)) {
      showSuccess(
        `Loan application ${decisionAction === "APPROVE" ? "approved" : "rejected"} successfully.`
      );
      setDecisionModalLoan(null);
      setDecisionNote("");
    } else if (reviewLoanDecisionThunk.rejected.match(result)) {
      showError(String(result.payload || "Failed to record loan decision."));
    }
  };

  const handleDisburseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!disburseModalLoan) return;

    const result = await dispatch(
      disburseLoanThunk({
        id: disburseModalLoan.id || disburseModalLoan.loanId,
        targetAccountNumber: targetAccount.trim() || undefined,
      })
    );

    if (disburseLoanThunk.fulfilled.match(result)) {
      showSuccess("Loan funds disbursed successfully.");
      setDisburseModalLoan(null);
      setTargetAccount("");
    } else if (disburseLoanThunk.rejected.match(result)) {
      showError(String(result.payload || "Failed to disburse loan funds."));
    }
  };

  const totalPages = Math.max(1, Math.ceil(loansTotal / 10));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
      case "ACTIVE":
        return "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40";
      case "PENDING":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
      case "UNDER_REVIEW":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
      case "REJECTED":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20";
      default:
        return "bg-muted text-muted-foreground border border-border";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "PERSONAL":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
      case "HOME":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20";
      case "BUSINESS":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
      case "EDUCATION":
        return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20";
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
              Admin Governance
            </span>
            <span className="text-muted-foreground/60 text-sm">•</span>
            <span className="text-muted-foreground text-sm">Credit Underwriting Board</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1 flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            Loan Portfolio & Underwriting Decisions
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Sole authority for credit approvals, administrative rejections, and verified treasury disbursements.
          </p>
        </div>

        <button
          onClick={() => dispatch(fetchAdminLoans({ search, status: statusFilter, type: typeFilter, page }))}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-background hover:bg-muted text-foreground text-xs font-medium transition-colors border border-border w-fit shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-emerald-600 dark:text-emerald-400" : ""}`} />
          Refresh Applications
        </button>
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

      {/* Filters */}
      <div className="bg-card border border-border rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search loan ID or customer..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-background border border-input rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="ALL">All Application Statuses</option>
            <option value="PENDING">Pending Initial Review</option>
            <option value="UNDER_REVIEW">Under Admin Review</option>
            <option value="APPROVED">Approved (Pending Disbursement)</option>
            <option value="ACTIVE">Active (Disbursed)</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
            className="bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="ALL">All Loan Types</option>
            <option value="PERSONAL">Personal</option>
            <option value="HOME">Home Mortgage</option>
            <option value="BUSINESS">Business Expansion</option>
            <option value="EDUCATION">Education</option>
          </select>
        </div>
      </div>

      {/* Loans Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-foreground">
            <thead className="bg-muted/60 uppercase tracking-wider text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3">Loan ID</th>
                <th className="px-4 py-3">Customer Applicant</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Notes</th>
                <th className="px-4 py-3 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {isLoading && loans.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                    Loading loan records from MongoDB...
                  </td>
                </tr>
              ) : loans.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                    <FileSpreadsheet className="w-7 h-7 mx-auto mb-2 opacity-40 text-muted-foreground" />
                    No loan applications found matching criteria.
                  </td>
                </tr>
              ) : (
                loans.map((loan) => (
                  <tr key={loan.id || loan.loanId} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 font-mono font-medium text-emerald-600 dark:text-emerald-400">
                      {loan.loanId}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {loan.customerName}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getTypeBadge(loan.loanType)}`}>
                        {loan.loanType}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      ${loan.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {loan.durationMonths} mos
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getStatusBadge(loan.status)}`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                        <MessageSquare className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        {loan.internalNotes?.length || 0}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedLoanId(loan.id || loan.loanId)}
                          className="p-1 rounded-lg bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border"
                          title="Review Dossier"
                        >
                          <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        </button>
                        {(loan.status === "PENDING" || loan.status === "UNDER_REVIEW") && (
                          <>
                            <button
                              onClick={() => {
                                setDecisionModalLoan(loan);
                                setDecisionAction("APPROVE");
                                setDecisionNote("");
                              }}
                              className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-medium transition-all shadow-md shadow-emerald-950/20"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                setDecisionModalLoan(loan);
                                setDecisionAction("REJECT");
                                setDecisionNote("");
                              }}
                              className="px-2 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[11px] font-medium border border-rose-500/20 transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {loan.status === "APPROVED" && (
                          <button
                            onClick={() => {
                              setDisburseModalLoan(loan);
                              setTargetAccount("");
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-all shadow-md shadow-emerald-950/20 flex items-center gap-1"
                          >
                            <DollarSign className="w-3 h-3" />
                            Disburse
                          </button>
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
            Showing <span className="font-semibold text-foreground">{loans.length}</span> of{" "}
            <span className="font-semibold text-foreground">{loansTotal}</span> loan applications
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

      {/* Loan Dossier Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/40 sticky top-0 z-10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Loan Credit Dossier</h3>
                  <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400">{selectedLoan.loanId}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLoanId(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-0.5">Applicant</span>
                  <span className="font-semibold text-foreground block truncate">{selectedLoan.customerName}</span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-0.5">Type</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getTypeBadge(selectedLoan.loanType)}`}>
                    {selectedLoan.loanType}
                  </span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-0.5">Principal Amount</span>
                  <span className="font-bold text-foreground text-sm">
                    ${selectedLoan.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-0.5">Status</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getStatusBadge(selectedLoan.status)}`}>
                    {selectedLoan.status}
                  </span>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="bg-muted/40 p-4 rounded-xl border border-border space-y-2">
                <h4 className="font-semibold text-foreground text-xs pb-1.5 border-b border-border">
                  Financial Underwriting Metrics
                </h4>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-muted-foreground">Declared Monthly Income:</span>{" "}
                    <span className="font-semibold text-foreground">
                      ${selectedLoan.monthlyIncome?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Employment Status:</span>{" "}
                    <span className="text-foreground font-medium">{selectedLoan.employmentStatus}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Repayment Duration:</span>{" "}
                    <span className="text-foreground font-medium">{selectedLoan.durationMonths} months</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Calculated Interest Rate:</span>{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{selectedLoan.interestRate || 8.5}% APR</span>
                  </div>
                </div>
                {selectedLoan.description && (
                  <div className="pt-2 border-t border-border">
                    <span className="text-muted-foreground block mb-0.5">Declared Purpose:</span>
                    <p className="text-foreground italic">&quot;{selectedLoan.description}&quot;</p>
                  </div>
                )}
              </div>

              {/* Internal Notes Thread */}
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Staff Officer Assessment Notes
                </h4>
                <div className="bg-muted/40 rounded-xl border border-border p-3 space-y-2 max-h-36 overflow-y-auto">
                  {!selectedLoan.internalNotes || selectedLoan.internalNotes.length === 0 ? (
                    <p className="text-muted-foreground italic text-center py-2 text-xs">No staff notes on file.</p>
                  ) : (
                    selectedLoan.internalNotes.map((n, idx) => (
                      <div key={n.id || idx} className="p-2 rounded-lg bg-card border border-border text-xs space-y-0.5">
                        <div className="flex justify-between text-[11px] text-muted-foreground">
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">{n.staffName || n.staffEmail}</span>
                          <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-foreground">{n.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Repayment Schedule */}
              {selectedLoan.repaymentSchedule && selectedLoan.repaymentSchedule.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Amortization Repayment Schedule (First 6 Installments)
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedLoan.repaymentSchedule.slice(0, 6).map((item, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-muted/40 border border-border text-[11px]">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Inst. #{item.installmentNumber}</span>
                          <span className={item.status === "PAID" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}>
                            {item.status}
                          </span>
                        </div>
                        <div className="font-bold text-foreground mt-0.5">${item.amount.toFixed(2)}</div>
                        <div className="text-[10px] text-muted-foreground">Due: {item.dueDate}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border bg-muted/20 flex justify-end">
              <button
                onClick={() => setSelectedLoanId(null)}
                className="px-4 py-2 rounded-xl bg-background hover:bg-muted border border-border text-foreground text-xs font-medium transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decision Review Modal */}
      {decisionModalLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/40">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-xl border ${
                    decisionAction === "APPROVE"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                  }`}
                >
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">
                    {decisionAction === "APPROVE" ? "Approve Loan Application" : "Reject Loan Application"}
                  </h4>
                  <p className="text-xs text-muted-foreground font-mono">{decisionModalLoan.loanId}</p>
                </div>
              </div>
              <button
                onClick={() => setDecisionModalLoan(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDecisionSubmit} className="p-5 space-y-4 text-xs">
              <div className="bg-muted/40 p-3 rounded-xl border border-border space-y-1 text-foreground">
                <div>
                  Customer: <span className="font-medium text-foreground">{decisionModalLoan.customerName}</span>
                </div>
                <div>
                  Amount:{" "}
                  <span className="font-bold text-foreground">
                    ${decisionModalLoan.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>{" "}
                  ({decisionModalLoan.loanType})
                </div>
              </div>

              <div>
                <label className="block text-foreground font-medium mb-1">
                  Administrative Underwriting Note (Optional)
                </label>
                <textarea
                  rows={3}
                  value={decisionNote}
                  onChange={(e) => setDecisionNote(e.target.value)}
                  placeholder="e.g. Credit score verified > 720, income debt-ratio acceptable..."
                  className="w-full bg-background border border-input rounded-xl p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setDecisionModalLoan(null)}
                  className="px-3 py-2 rounded-xl bg-background hover:bg-muted border border-border text-foreground text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className={`px-4 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-md ${
                    decisionAction === "APPROVE"
                      ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/20"
                      : "bg-rose-600 hover:bg-rose-500 shadow-rose-950/20"
                  } disabled:opacity-50 flex items-center gap-1.5`}
                >
                  {actionLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  Confirm {decisionAction === "APPROVE" ? "Approval" : "Rejection"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Disbursement Modal */}
      {disburseModalLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/40">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Disburse Approved Loan</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">{disburseModalLoan.loanId}</p>
                </div>
              </div>
              <button
                onClick={() => setDisburseModalLoan(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDisburseSubmit} className="p-5 space-y-4 text-xs">
              <p className="text-foreground">
                Disbursing will credit{" "}
                <span className="font-bold text-foreground">
                  ${disburseModalLoan.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>{" "}
                directly to customer <strong>{disburseModalLoan.customerName}</strong> and record an institutional double-entry disbursement transaction in MongoDB.
              </p>

              <div>
                <label className="block text-foreground font-medium mb-1">
                  Destination Account Number (Optional — defaults to active customer facility)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1023849102 (leave blank for primary account)"
                  value={targetAccount}
                  onChange={(e) => setTargetAccount(e.target.value)}
                  className="w-full bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setDisburseModalLoan(null)}
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
                  Confirm Disbursement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

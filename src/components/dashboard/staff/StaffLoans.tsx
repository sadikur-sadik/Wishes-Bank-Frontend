"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchStaffLoans,
  addStaffLoanNoteThunk,
  forwardStaffLoanThunk,
  clearStaffMessages,
  InternalLoanNoteItem,
} from "@/store/slices/staffSlice";
import { showSuccess, showError } from "@/lib/toast";
import {
  FileSpreadsheet,
  Search,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquare,
  ArrowRight,
  Send,
  Lock,
  Briefcase,
  ShieldAlert,
} from "lucide-react";

export default function StaffLoans() {
  const dispatch = useAppDispatch();
  const {
    loans,
    loansTotal,
    isLoading,
    actionLoading,
    actionSuccessMessage,
    error,
  } = useAppSelector((state) => state.staff);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  // Note addition state
  const [newNote, setNewNote] = useState("");
  const [noteError, setNoteError] = useState("");

  // Modal state
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
  const [showForwardConfirm, setShowForwardConfirm] = useState(false);

  const selectedLoan = selectedLoanId
    ? loans.find((l) => l.id === selectedLoanId || l.loanId === selectedLoanId) || null
    : null;

  useEffect(() => {
    dispatch(fetchStaffLoans({ search, status: statusFilter, type: typeFilter, page }));
  }, [dispatch, search, statusFilter, typeFilter, page]);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setNoteError("");
    if (!selectedLoan || !newNote.trim()) {
      const msg = "Please enter a note before submitting.";
      setNoteError(msg);
      showError(msg);
      return;
    }

    const loanKey = (selectedLoan.id || selectedLoan.loanId) as string;
    const result = await dispatch(
      addStaffLoanNoteThunk({
        loanId: loanKey,
        content: newNote.trim(),
      })
    );

    if (addStaffLoanNoteThunk.fulfilled.match(result)) {
      showSuccess("Internal underwriting note added successfully.");
      setNewNote("");
      dispatch(fetchStaffLoans({ search, status: statusFilter, type: typeFilter, page }));
    } else if (addStaffLoanNoteThunk.rejected.match(result)) {
      showError(String(result.payload || "Failed to add underwriting note."));
    }
  };

  const handleForwardToAdmin = async () => {
    if (!selectedLoan) return;
    const loanKey = (selectedLoan.id || selectedLoan.loanId) as string;
    const result = await dispatch(forwardStaffLoanThunk(loanKey));

    if (forwardStaffLoanThunk.fulfilled.match(result)) {
      showSuccess("Loan dossier forwarded to Admin for final authorization.");
      setShowForwardConfirm(false);
      dispatch(fetchStaffLoans({ search, status: statusFilter, type: typeFilter, page }));
    } else if (forwardStaffLoanThunk.rejected.match(result)) {
      showError(String(result.payload || "Failed to forward loan dossier."));
    }
  };

  const totalPages = Math.max(1, Math.ceil(loansTotal / 10));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
      case "ACTIVE":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
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
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Staff Portal
            </span>
            <span className="text-muted-foreground text-sm">•</span>
            <span className="text-muted-foreground text-sm">Credit & Lending</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1 flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-primary" />
            Loan Assistance & Review
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Review loan applications, log staff notes, and forward verified dossiers to Admin for final approval.
          </p>
        </div>

        {/* Warning Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs w-fit">
          <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>Final loan approval & disbursement are Admin-exclusive</span>
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

      {/* Filter and Search */}
      <div className="bg-card border border-border rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search application ID or customer..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-background border border-input rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending Staff Review</option>
            <option value="UNDER_REVIEW">Under Admin Review</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="ACTIVE">Active / Disbursed</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
            className="bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="ALL">All Loan Types</option>
            <option value="PERSONAL">Personal Loan</option>
            <option value="HOME">Home Mortgage</option>
            <option value="BUSINESS">Business Expansion</option>
            <option value="EDUCATION">Education Loan</option>
          </select>

          <button
            onClick={() =>
              dispatch(fetchStaffLoans({ search, status: statusFilter, type: typeFilter, page }))
            }
            title="Refresh list"
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors border border-border cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-primary" : ""}`} />
          </button>
        </div>
      </div>

      {/* Loans Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-foreground">
            <thead className="bg-muted/60 uppercase tracking-wider text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3">Application ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Loan Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Notes</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading && loans.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-primary" />
                    Loading loan applications from database...
                  </td>
                </tr>
              ) : loans.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                    <FileSpreadsheet className="w-7 h-7 mx-auto mb-2 opacity-40 text-muted-foreground" />
                    No loan applications found matching filters.
                  </td>
                </tr>
              ) : (
                loans.map((loan) => (
                  <tr key={loan.id || loan.loanId} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 font-mono font-medium text-primary">
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
                      {loan.durationMonths} months
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getStatusBadge(loan.status)}`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                        <MessageSquare className="w-3 h-3 text-primary" />
                        {loan.internalNotes?.length || 0}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedLoanId(loan.id || loan.loanId)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors border border-border cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-primary" />
                        Review
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
            Showing <span className="font-semibold text-foreground">{loans.length}</span> of{" "}
            <span className="font-semibold text-foreground">{loansTotal}</span> applications
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

      {/* Loan Details & Review Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30 sticky top-0 z-10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-card-foreground">Loan Application Dossier</h3>
                  <p className="text-xs font-mono text-primary">{selectedLoan.loanId}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLoanId(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-1">Customer</span>
                  <span className="font-semibold text-foreground truncate block">{selectedLoan.customerName}</span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-1">Loan Type</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getTypeBadge(selectedLoan.loanType)}`}>
                    {selectedLoan.loanType}
                  </span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-1">Requested Amount</span>
                  <span className="font-bold text-foreground text-sm">
                    ${selectedLoan.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-1">Status</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getStatusBadge(selectedLoan.status)}`}>
                    {selectedLoan.status}
                  </span>
                </div>
              </div>

              {/* Financial & Underwriting Metrics */}
              <div className="bg-muted/40 p-4 rounded-xl border border-border space-y-2">
                <h4 className="font-semibold text-foreground text-xs flex items-center gap-1.5 pb-2 border-b border-border">
                  <Briefcase className="w-3.5 h-3.5 text-primary" />
                  Applicant Financial Profile
                </h4>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-muted-foreground">Monthly Income:</span>{" "}
                    <span className="font-semibold text-foreground">
                      ${selectedLoan.monthlyIncome?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Employment Status:</span>{" "}
                    <span className="text-foreground font-medium">{selectedLoan.employmentStatus || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tenure:</span>{" "}
                    <span className="text-foreground font-medium">{selectedLoan.durationMonths} months</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Interest Rate:</span>{" "}
                    <span className="text-primary font-semibold">{selectedLoan.interestRate || 8.5}% APR</span>
                  </div>
                </div>
                {selectedLoan.description && (
                  <div className="pt-2 border-t border-border">
                    <span className="text-muted-foreground block mb-0.5">Purpose / Description:</span>
                    <p className="text-foreground italic">&quot;{selectedLoan.description}&quot;</p>
                  </div>
                )}
              </div>

              {/* Internal Staff Notes Thread */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-primary" />
                  Internal Staff Notes Thread (Confidential - Hidden from Customer)
                </h4>

                <div className="bg-muted/30 rounded-xl border border-border p-4 space-y-3 max-h-48 overflow-y-auto">
                  {!selectedLoan.internalNotes || selectedLoan.internalNotes.length === 0 ? (
                    <p className="text-muted-foreground italic text-center py-4 text-xs">
                      No internal notes recorded yet. Add initial staff assessment below.
                    </p>
                  ) : (
                    selectedLoan.internalNotes.map((note: InternalLoanNoteItem, idx: number) => (
                      <div key={note.id || idx} className="p-2.5 rounded-lg bg-card border border-border space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-primary">{note.staffName || note.staffEmail}</span>
                          <span className="text-muted-foreground">{new Date(note.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-foreground">{note.content}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="space-y-2">
                  {noteError && <p className="text-rose-500 text-[11px]">{noteError}</p>}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add an internal observation, credit score check, or verification finding..."
                      className="flex-1 bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="px-3 py-2 rounded-xl bg-muted hover:bg-muted/80 text-primary font-semibold text-xs border border-primary/20 transition-colors disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      Add Note
                    </button>
                  </div>
                </form>
              </div>

              {/* Forward to Admin Action Banner */}
              <div className="p-4 rounded-xl bg-muted/40 border border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h5 className="font-bold text-foreground text-xs">Forward Application for Admin Review</h5>
                  <p className="text-muted-foreground text-[11px] mt-0.5">
                    Transition application to <strong>UNDER_REVIEW</strong> so the executive admin board can finalize approval or rejection.
                  </p>
                </div>

                {selectedLoan.status === "PENDING" ? (
                  <button
                    onClick={() => setShowForwardConfirm(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs transition-all shadow-sm w-fit shrink-0 cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    Forward to Admin
                  </button>
                ) : (
                  <span className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-mono shrink-0">
                    {selectedLoan.forwardedToAdmin ? "Forwarded to Admin" : `Status: ${selectedLoan.status}`}
                  </span>
                )}
              </div>

              {/* Admin Restrictions Reminder */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-[11px] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>
                  Staff members cannot approve, reject, or disburse loans. All final underwriting determinations require executive Administrator privileges.
                </span>
              </div>
            </div>

            <div className="p-4 border-t border-border bg-muted/20 flex justify-end">
              <button
                onClick={() => setSelectedLoanId(null)}
                className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors border border-border cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forward Confirmation Modal */}
      {showForwardConfirm && selectedLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-card-foreground text-sm">Confirm Forwarding to Admin</h4>
                <p className="text-xs text-muted-foreground font-mono">{selectedLoan.loanId}</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Are you sure you want to forward this loan application for <strong className="text-foreground">{selectedLoan.customerName}</strong> (${selectedLoan.amount.toLocaleString()}) to Administrator review? This indicates all preliminary staff checks have been satisfied.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <button
                onClick={() => setShowForwardConfirm(false)}
                className="px-3 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors border border-border cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={actionLoading}
                onClick={handleForwardToAdmin}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {actionLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                Confirm Forward
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

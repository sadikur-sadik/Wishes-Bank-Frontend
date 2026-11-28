"use client";

import * as React from "react";
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  PlusCircle,
  FileCheck2,
  ChevronDown,
  ChevronUp,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchLoans,
  applyLoanThunk,
  repayLoanThunk,
  clearLoanStatus,
  LoanItem,
} from "@/store/slices/loanSlice";
import { showSuccess, showError } from "@/lib/toast";

export const CustomerLoans = () => {
  const dispatch = useAppDispatch();
  const { loans, isLoading, isSubmitting, isRepaying, submitSuccess, repaySuccess, error } = useAppSelector(
    (state) => state.loan
  );

  const [activeTab, setActiveTab] = React.useState<"list" | "apply">("list");
  const [expandedLoanId, setExpandedLoanId] = React.useState<string | null>(null);

  // Form State
  const [loanType, setLoanType] = React.useState("Personal Loan");
  const [amount, setAmount] = React.useState("");
  const [durationMonths, setDurationMonths] = React.useState("12");
  const [monthlyIncome, setMonthlyIncome] = React.useState("");
  const [employmentStatus, setEmploymentStatus] = React.useState("Full-Time Employed");
  const [description, setDescription] = React.useState("");
  const [formValidation, setFormValidation] = React.useState<string | null>(null);

  React.useEffect(() => {
    dispatch(fetchLoans());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormValidation(null);

    const numAmount = parseFloat(amount);
    const numIncome = parseFloat(monthlyIncome);
    const numDuration = parseInt(durationMonths, 10);

    if (!numAmount || numAmount < 500) {
      const msg = "Minimum loan application amount is $500.";
      setFormValidation(msg);
      showError(msg);
      return;
    }

    if (!numIncome || numIncome <= 0) {
      const msg = "Please provide your verified monthly income.";
      setFormValidation(msg);
      showError(msg);
      return;
    }

    dispatch(
      applyLoanThunk({
        loanType,
        amount: numAmount,
        durationMonths: numDuration,
        monthlyIncome: numIncome,
        employmentStatus,
        description: description.trim() || `${loanType} financing application`,
      })
    ).then((action) => {
      if (applyLoanThunk.fulfilled.match(action)) {
        showSuccess(`Loan application for $${numAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} submitted successfully!`);
        setActiveTab("list");
        setAmount("");
        setMonthlyIncome("");
        setDescription("");
      } else if (applyLoanThunk.rejected.match(action)) {
        showError(String(action.payload || "Failed to submit loan application."));
      }
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedLoanId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            <CreditCard className="h-3.5 w-3.5" />
            <span>Credit Facilities</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Loan Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Apply for commercial and personal financing, view repayment schedules, and track institutional reviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={activeTab === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("list")}
            className="text-xs font-bold gap-1.5"
          >
            <FileCheck2 className="h-4 w-4" />
            <span>My Loans ({loans.length})</span>
          </Button>
          <Button
            variant={activeTab === "apply" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("apply")}
            className="text-xs font-bold gap-1.5"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Apply for Loan</span>
          </Button>
        </div>
      </div>

      {(submitSuccess || repaySuccess) && (
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-xs text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{submitSuccess || repaySuccess}</span>
          </div>
          <button
            type="button"
            onClick={() => dispatch(clearLoanStatus())}
            className="font-bold underline text-[10px]"
          >
            Dismiss
          </button>
        </div>
      )}

      {activeTab === "apply" ? (
        /* Loan Application Form */
        <div className="max-w-2xl mx-auto p-6 rounded-2xl border border-border bg-card shadow-sm space-y-5">
          <div className="pb-3 border-b border-border">
            <h2 className="text-lg font-bold text-foreground">Credit & Financing Application</h2>
            <p className="text-xs text-muted-foreground">Complete this form to submit your loan application to Wishes Bank credit officers.</p>
          </div>

          {formValidation && (
            <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/10 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{formValidation}</span>
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-xl border border-destructive/20 bg-destructive/10 text-xs text-destructive flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Loan Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Loan Facility Type
                </label>
                <select
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Commercial Business Loan">Commercial Business Loan</option>
                  <option value="Home Mortgage Financing">Home Mortgage Financing</option>
                  <option value="Education Financing">Education Financing</option>
                  <option value="Auto / Vehicle Financing">Auto / Vehicle Financing</option>
                </select>
              </div>

              {/* Requested Amount */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Requested Amount ($ USD)
                </label>
                <input
                  type="number"
                  step="100"
                  min="500"
                  placeholder="5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Duration Months */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Term Duration (Months)
                </label>
                <select
                  value={durationMonths}
                  onChange={(e) => setDurationMonths(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="6">6 Months</option>
                  <option value="12">12 Months (1 Year)</option>
                  <option value="24">24 Months (2 Years)</option>
                  <option value="36">36 Months (3 Years)</option>
                  <option value="60">60 Months (5 Years)</option>
                </select>
              </div>

              {/* Monthly Income */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Monthly Verified Income ($ USD)
                </label>
                <input
                  type="number"
                  step="50"
                  min="100"
                  placeholder="4500"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Employment Status */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Current Employment Status
              </label>
              <select
                value={employmentStatus}
                onChange={(e) => setEmploymentStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="Full-Time Employed">Full-Time Employed</option>
                <option value="Self-Employed / Business Owner">Self-Employed / Business Owner</option>
                <option value="Part-Time Employed">Part-Time Employed</option>
                <option value="Contractor / Freelancer">Contractor / Freelancer</option>
              </select>
            </div>

            {/* Purpose / Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Loan Purpose / Description
              </label>
              <textarea
                rows={3}
                placeholder="State the purpose of this loan facility and repayment strategy..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2 py-3 mt-2 shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Transmitting Application...</span>
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  <span>Submit Loan Application</span>
                </>
              )}
            </Button>
          </form>
        </div>
      ) : (
        /* My Loans List */
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h2 className="text-base font-bold text-foreground">Loan Facilities Portfolio</h2>
              <p className="text-xs text-muted-foreground">Active and submitted financing agreements</p>
            </div>
            <span className="text-xs font-semibold text-muted-foreground">
              {loans.length} Total Facilities
            </span>
          </div>

          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground">
              <RefreshCw className="h-6 w-6 text-primary animate-spin" />
              <span>Querying verified credit accounts...</span>
            </div>
          ) : loans.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground space-y-3">
              <CreditCard className="h-10 w-10 mx-auto text-muted-foreground/40" />
              <div>
                <p className="font-semibold text-foreground text-sm">No Active or Past Loans</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  You have not submitted any financing applications. Apply above to obtain institutional credit.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => setActiveTab("apply")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs"
              >
                Apply for First Loan
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {loans.map((loan: LoanItem) => {
                const isExpanded = expandedLoanId === loan.id;
                return (
                  <div
                    key={loan.id || loan.loanId}
                    className="p-5 rounded-xl border border-border/80 bg-muted/10 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-foreground">
                            {loan.loanId}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                              loan.status === "APPROVED" || loan.status === "ACTIVE"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                : loan.status === "COMPLETED"
                                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                                : loan.status === "REJECTED"
                                ? "bg-destructive/10 text-destructive border-destructive/20"
                                : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                            }`}
                          >
                            {loan.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-foreground">{loan.loanType}</h4>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-black text-foreground">
                          ${loan.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          Monthly Installment: <strong>${(loan.monthlyInstallment || 0).toLocaleString()}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border/40 text-xs">
                      <div>
                        <span className="text-muted-foreground block text-[10px] uppercase">Duration</span>
                        <span className="font-semibold text-foreground">{loan.durationMonths} Months</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[10px] uppercase">Interest APR</span>
                        <span className="font-semibold text-foreground">{loan.interestRate}% APR</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[10px] uppercase">Total Repayment</span>
                        <span className="font-semibold text-foreground">
                          ${((loan.monthlyInstallment || 0) * loan.durationMonths).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[10px] uppercase">Applied On</span>
                        <span className="font-semibold text-foreground">
                          {new Date(loan.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Repayment progress row for active/completed loans */}
                    {(loan.status === "ACTIVE" || loan.status === "COMPLETED") && (
                      <div className="space-y-2 pt-2 border-t border-border/40">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground block text-[10px] uppercase">Paid</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              ${(((loan.monthlyInstallment || 0) * loan.durationMonths) - (loan.remainingBalance ?? loan.amount)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-[10px] uppercase">Outstanding</span>
                            <span className="font-semibold text-foreground">
                              ${(loan.remainingBalance ?? loan.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-[10px] uppercase">Installments Paid</span>
                            <span className="font-semibold text-foreground">
                              {loan.repaymentSchedule?.filter((s) => s.status === "PAID").length || 0} / {loan.durationMonths}
                            </span>
                          </div>
                          {loan.status === "ACTIVE" && (
                            <div className="flex items-end">
                              <Button
                                size="sm"
                                disabled={isRepaying}
                                onClick={() => {
                                  dispatch(repayLoanThunk({ loanId: loan.loanId })).then((action) => {
                                    if (repayLoanThunk.fulfilled.match(action)) {
                                      showSuccess(`Repayment of $${(loan.monthlyInstallment || 0).toLocaleString()} submitted successfully!`);
                                    } else if (repayLoanThunk.rejected.match(action)) {
                                      showError(String(action.payload || "Loan repayment failed."));
                                    }
                                  });
                                }}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-1.5"
                              >
                                {isRepaying ? (
                                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <DollarSign className="h-3.5 w-3.5" />
                                )}
                                <span>Pay ${(loan.monthlyInstallment || 0).toLocaleString()}</span>
                              </Button>
                            </div>
                          )}
                        </div>

                        {loan.status === "ACTIVE" && (() => {
                          const nextPending = loan.repaymentSchedule?.find((s) => s.status === "PENDING");
                          if (!nextPending) return null;
                          return (
                            <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-xs">
                              <span className="text-muted-foreground text-[11px]">
                                Next Installment: <strong className="text-foreground">#{nextPending.installmentNumber}</strong> due on <strong className="text-foreground">{new Date(nextPending.dueDate).toLocaleDateString()}</strong>
                              </span>
                              <span className="font-mono font-bold text-primary text-xs">
                                ${nextPending.amount.toFixed(2)}
                              </span>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {/* Schedule Accordion Toggle */}
                    {loan.repaymentSchedule && loan.repaymentSchedule.length > 0 && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => toggleExpand(loan.id)}
                          className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                        >
                          <span>{isExpanded ? "Hide Repayment Schedule" : "View Repayment Schedule"}</span>
                          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 p-3 rounded-lg border border-border bg-card overflow-x-auto animate-in fade-in">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-muted text-muted-foreground text-[10px] uppercase font-bold">
                                <tr>
                                  <th className="py-1.5 px-2">#</th>
                                  <th className="py-1.5 px-2">Due Date</th>
                                  <th className="py-1.5 px-2">Installment</th>
                                  <th className="py-1.5 px-2">Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border/60">
                                {loan.repaymentSchedule.map((item) => (
                                  <tr key={item.installmentNumber}>
                                    <td className="py-2 px-2 font-bold">{item.installmentNumber}</td>
                                    <td className="py-2 px-2 text-muted-foreground">
                                      {new Date(item.dueDate).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 px-2 font-mono font-semibold">
                                      ${item.amount.toFixed(2)}
                                    </td>
                                    <td className="py-2 px-2">
                                      <span
                                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                                          item.status === "PAID"
                                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                                        }`}
                                      >
                                        {item.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerLoans;

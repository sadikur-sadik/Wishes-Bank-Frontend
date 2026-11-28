"use client";

import * as React from "react";
import {
  ArrowUpFromLine,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Clock,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchWithdrawalRequests,
  createWithdrawalThunk,
  clearRequestStatus,
} from "@/store/slices/requestSlice";
import { fetchAccounts } from "@/store/slices/accountSlice";
import { showSuccess, showError } from "@/lib/toast";

export const CustomerWithdrawals = () => {
  const dispatch = useAppDispatch();
  const { withdrawals, isLoading, isSubmitting, submitSuccess, error } = useAppSelector(
    (state) => state.request
  );
  const { accounts } = useAppSelector((state) => state.account);

  const [debitAccount, setDebitAccount] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [formValidation, setFormValidation] = React.useState<string | null>(null);

  React.useEffect(() => {
    dispatch(fetchWithdrawalRequests());
    dispatch(fetchAccounts());
  }, [dispatch]);

  const activeDebitAccount = debitAccount || accounts[0]?.accountNumber || "";
  const selectedAccount = accounts.find((a) => a.accountNumber === activeDebitAccount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormValidation(null);

    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      const msg = "Please enter a valid withdrawal amount greater than $0.";
      setFormValidation(msg);
      showError(msg);
      return;
    }

    if (!activeDebitAccount) {
      const msg = "Please select a debit depository account.";
      setFormValidation(msg);
      showError(msg);
      return;
    }

    if (selectedAccount && numAmount > selectedAccount.availableBalance) {
      const msg = `Insufficient available funds. Current balance in ${selectedAccount.accountType} is $${selectedAccount.availableBalance.toFixed(2)}.`;
      setFormValidation(msg);
      showError(msg);
      return;
    }

    dispatch(
      createWithdrawalThunk({
        accountNumber: activeDebitAccount,
        amount: numAmount,
        description: description.trim() || "Customer electronic cash withdrawal",
      })
    ).then((action) => {
      if (createWithdrawalThunk.fulfilled.match(action)) {
        showSuccess(`Withdrawal request for $${numAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} submitted successfully!`);
        setAmount("");
        setDescription("");
      } else if (createWithdrawalThunk.rejected.match(action)) {
        showError(String(action.payload || "Failed to submit withdrawal request."));
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-border">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-2">
          <ArrowUpFromLine className="h-3.5 w-3.5" />
          <span>Disbursement Facilities</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Withdrawal Requests
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Submit official withdrawal requests for verification by bank officers and track clearing statuses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Withdrawal Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-1 p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <h3 className="text-base font-bold text-foreground pb-2 border-b border-border flex items-center gap-2">
            <Building className="h-4 w-4 text-primary" />
            <span>New Withdrawal Request</span>
          </h3>

          {formValidation && (
            <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/10 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{formValidation}</span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl border border-destructive/20 bg-destructive/10 text-xs text-destructive flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {submitSuccess && (
            <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-xs text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{submitSuccess}</span>
              </div>
              <button
                type="button"
                onClick={() => dispatch(clearRequestStatus())}
                className="font-bold underline text-[10px]"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Account Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Debit Account
            </label>
            <select
              value={activeDebitAccount}
              onChange={(e) => setDebitAccount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.accountNumber}>
                  {acc.accountType} — {acc.accountNumber}
                </option>
              ))}
            </select>
            {selectedAccount && (
              <span className="text-[11px] text-muted-foreground mt-1 block px-1">
                Available: <strong className="text-foreground">${selectedAccount.availableBalance.toFixed(2)}</strong>
              </span>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Withdrawal Amount ($ USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-muted-foreground font-bold text-sm">$</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-input bg-background text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Withdrawal Purpose / Memo
            </label>
            <input
              type="text"
              placeholder="e.g. Branch counter withdrawal, teller cash out"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2 py-2.5 mt-2 shadow-sm"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Transmitting Request...</span>
              </>
            ) : (
              <>
                <ArrowUpFromLine className="h-4 w-4" />
                <span>Submit Withdrawal Slip</span>
              </>
            )}
          </Button>

          <p className="text-[11px] text-muted-foreground leading-relaxed flex items-center gap-1.5 pt-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Withdrawals are audited against reserve thresholds prior to dispatch.</span>
          </p>
        </form>

        {/* Withdrawal Requests Table */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="text-base font-bold text-foreground">Withdrawal Requests Ledger</h3>
              <p className="text-xs text-muted-foreground">Historical withdrawal requests and officer audit records</p>
            </div>
            <span className="text-xs font-semibold text-muted-foreground">
              {withdrawals.length} Records
            </span>
          </div>

          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground">
              <RefreshCw className="h-6 w-6 text-primary animate-spin" />
              <span>Loading withdrawal records...</span>
            </div>
          ) : withdrawals.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
              <p className="font-semibold text-foreground text-sm">No Withdrawal Requests On File</p>
              <p className="text-xs mt-1">Submit your first withdrawal request above to begin.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/40 text-muted-foreground uppercase font-bold text-[10px] tracking-wider border-b border-border">
                  <tr>
                    <th className="py-2.5 px-3">Request ID</th>
                    <th className="py-2.5 px-3">Account</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {withdrawals.map((req) => (
                    <tr key={req.id || req.requestId} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-foreground">{req.requestId}</td>
                      <td className="py-3 px-3 font-mono text-muted-foreground">{req.accountNumber}</td>
                      <td className="py-3 px-3 font-bold text-foreground">
                        ${req.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                            req.status === "APPROVED"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                              : req.status === "REJECTED"
                              ? "bg-destructive/10 text-destructive border-destructive/20"
                              : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-muted-foreground">
                        {new Date(req.requestDate).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-3 text-muted-foreground max-w-xs truncate">{req.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerWithdrawals;

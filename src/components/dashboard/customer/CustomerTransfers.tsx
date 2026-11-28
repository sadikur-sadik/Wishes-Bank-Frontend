"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowUpRight,
  Building,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAccounts, transferFundsThunk, clearTransferResult } from "@/store/slices/accountSlice";
import { showSuccess, showError } from "@/lib/toast";

export const CustomerTransfers = () => {
  const dispatch = useAppDispatch();
  const { accounts, isTransferring, transferResult, error } = useAppSelector(
    (state) => state.account
  );

  const [senderAccount, setSenderAccount] = React.useState("");
  const [recipientAccount, setRecipientAccount] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [transactionPin, setTransactionPin] = React.useState("");
  const [formValidation, setFormValidation] = React.useState<string | null>(null);

  React.useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const activeSenderNumber = senderAccount || accounts[0]?.accountNumber || "";
  const selectedSender = accounts.find((a) => a.accountNumber === activeSenderNumber);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormValidation(null);

    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      const msg = "Please enter a valid transfer amount greater than $0.";
      setFormValidation(msg);
      showError(msg);
      return;
    }

    if (!recipientAccount.trim()) {
      const msg = "Please provide a valid recipient account number.";
      setFormValidation(msg);
      showError(msg);
      return;
    }

    if (activeSenderNumber === recipientAccount.trim()) {
      const msg = "Sender and recipient account numbers cannot be identical.";
      setFormValidation(msg);
      showError(msg);
      return;
    }

    if (selectedSender && numAmount > selectedSender.availableBalance) {
      const msg = `Insufficient balance. Available funds in ${selectedSender.accountType} are $${selectedSender.availableBalance.toFixed(2)}.`;
      setFormValidation(msg);
      showError(msg);
      return;
    }

    if (transactionPin.length !== 4) {
      const msg = "A 4-digit Transaction Authorization PIN is required.";
      setFormValidation(msg);
      showError(msg);
      return;
    }

    dispatch(
      transferFundsThunk({
        senderAccountNumber: activeSenderNumber,
        recipientAccountNumber: recipientAccount.trim(),
        amount: numAmount,
        description: description.trim() || "Account fund transfer",
        transactionPin: transactionPin.trim(),
      })
    ).then((action) => {
      if (transferFundsThunk.fulfilled.match(action)) {
        showSuccess(`Transfer of $${numAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} completed successfully!`);
      } else if (transferFundsThunk.rejected.match(action)) {
        showError(String(action.payload || "Fund transfer failed. Please verify recipient and PIN."));
      }
    });
  };

  const handleResetForm = () => {
    dispatch(clearTransferResult());
    setAmount("");
    setRecipientAccount("");
    setDescription("");
    setTransactionPin("");
    setFormValidation(null);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            <ArrowLeftRight className="h-3.5 w-3.5" />
            <span>Real-time Settlement</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Fund Transfers
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Instantly transfer funds between your own depository accounts or send money to another Wishes Bank account.
          </p>
        </div>

        <Link href="/dashboard/customer/transactions">
          <Button variant="outline" size="sm" className="font-semibold text-xs gap-1.5">
            <span>Transfer History</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      {transferResult ? (
        /* Transfer Success View */
        <div className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 shadow-sm text-center space-y-6">
          <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">Transfer Executed Successfully</h2>
            <p className="text-sm text-muted-foreground">
              Funds have been debited from your account and credited to the beneficiary.
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 rounded-xl bg-card border border-border text-left space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-muted-foreground">Transaction ID:</span>
              <span className="font-mono font-bold text-foreground">{transferResult.transactionId}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-muted-foreground">Reference Code:</span>
              <span className="font-mono text-foreground">{transferResult.reference}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-muted-foreground">Transferred Amount:</span>
              <span className="font-extrabold text-foreground text-sm text-emerald-600 dark:text-emerald-400">
                ${transferResult.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-muted-foreground">Sender Account:</span>
              <span className="font-mono text-foreground">{transferResult.senderAccountNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-muted-foreground">Recipient Account:</span>
              <span className="font-mono text-foreground">{transferResult.recipientAccountNumber}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Remaining Balance:</span>
              <span className="font-bold text-foreground">
                ${transferResult.newBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <Button onClick={handleResetForm} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs">
              Make Another Transfer
            </Button>
            <Link href="/dashboard/customer/transactions">
              <Button variant="outline" className="text-xs font-semibold">
                View in Ledger
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* Transfer Form */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form onSubmit={handleSubmit} className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card shadow-sm space-y-5">
            <h3 className="text-base font-bold text-foreground pb-3 border-b border-border flex items-center gap-2">
              <Building className="h-4 w-4 text-primary" />
              <span>Transfer Instructions</span>
            </h3>

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

            {/* Sender Account */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                From Account (Debit)
              </label>
              <select
                value={activeSenderNumber}
                onChange={(e) => setSenderAccount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.accountNumber}>
                    {acc.accountType} — {acc.accountNumber} (${acc.availableBalance.toLocaleString()})
                  </option>
                ))}
              </select>
              {selectedSender && (
                <div className="flex justify-between items-center text-[11px] text-muted-foreground mt-1 px-1">
                  <span>Available Balance: <strong className="text-foreground">${selectedSender.availableBalance.toFixed(2)}</strong></span>
                  <span>Daily limit: ${(selectedSender.dailyTransferLimit || 10000).toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Recipient Account Number */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Recipient Account Number (Wishes Bank LTD)
              </label>
              <input
                type="text"
                placeholder="e.g. WB-4892-7310-91"
                value={recipientAccount}
                onChange={(e) => setRecipientAccount(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <span className="text-[11px] text-muted-foreground mt-1 block px-1">
                Enter your secondary account number for internal transfer, or another client&apos;s account.
              </span>
            </div>

            {/* Transfer Amount */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Transfer Amount ($ USD)
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

            {/* Description / Memo */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Transfer Purpose / Memo
              </label>
              <input
                type="text"
                placeholder="e.g. Rent share, savings reallocation, invoice payment"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Authorization PIN */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center justify-between">
                <span>Authorization PIN</span>
                <span className="text-[10px] lowercase text-primary font-normal">default demo pin: 1234</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  maxLength={4}
                  placeholder="••••"
                  value={transactionPin}
                  onChange={(e) => setTransactionPin(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <KeyRound className="absolute right-3.5 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isTransferring}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2 py-3 mt-3 shadow-md"
            >
              {isTransferring ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Settling Transaction with Backend...</span>
                </>
              ) : (
                <>
                  <ArrowLeftRight className="h-4 w-4" />
                  <span>Execute Authorized Transfer</span>
                </>
              )}
            </Button>
          </form>

          {/* Transfer Info Side Panel */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wide">
                <ShieldCheck className="h-4 w-4" />
                <span>Security & Compliance</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold">•</span>
                  <span>Transfers settle immediately inside the Wishes Bank intra-bank clearing network.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold">•</span>
                  <span>Backend checks account eligibility, balance solvency, and daily thresholds atomically.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold">•</span>
                  <span>Every successful transfer issues an official compliance reference code.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quick Switcher</h4>
              <div className="space-y-2">
                {accounts.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => setRecipientAccount(acc.accountNumber)}
                    className="w-full p-2.5 rounded-xl border border-border/70 hover:border-primary/50 text-left text-xs transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-foreground">{acc.accountType}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{acc.accountNumber}</div>
                    </div>
                    <span className="text-[11px] text-primary font-bold">Use as recipient</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerTransfers;

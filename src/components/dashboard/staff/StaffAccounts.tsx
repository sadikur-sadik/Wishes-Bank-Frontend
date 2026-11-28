"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchStaffAccounts,
  createStaffAccountThunk,
  fetchStaffCustomers,
  clearStaffMessages,
  StaffAccountItem,
} from "@/store/slices/staffSlice";
import { showSuccess, showError } from "@/lib/toast";
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  Eye,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";

export default function StaffAccounts() {
  const dispatch = useAppDispatch();
  const {
    accounts,
    accountsTotal,
    customers,
    isLoading,
    actionLoading,
    actionSuccessMessage,
    error,
  } = useAppSelector((state) => state.staff);

  // Search & Filter state
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<StaffAccountItem | null>(null);

  // Create form state
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [accountType, setAccountType] = useState("SAVINGS");
  const [initialDeposit, setInitialDeposit] = useState("0");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    dispatch(fetchStaffAccounts({ search, type: typeFilter, status: statusFilter, page }));
  }, [dispatch, search, typeFilter, statusFilter, page]);

  // Load customer list when opening creation modal
  const handleOpenCreateModal = () => {
    dispatch(fetchStaffCustomers({ page: 1 }));
    setSelectedCustomerId("");
    setAccountType("SAVINGS");
    setInitialDeposit("0");
    setFormError("");
    setShowCreateModal(true);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!selectedCustomerId) {
      const msg = "Please select a customer for this bank account.";
      setFormError(msg);
      showError(msg);
      return;
    }

    const depositNum = parseFloat(initialDeposit);
    if (isNaN(depositNum) || depositNum < 0) {
      const msg = "Initial deposit must be 0 or a positive amount.";
      setFormError(msg);
      showError(msg);
      return;
    }

    const result = await dispatch(
      createStaffAccountThunk({
        userId: selectedCustomerId,
        accountType,
        initialDeposit: depositNum > 0 ? depositNum : undefined,
      })
    );

    if (createStaffAccountThunk.fulfilled.match(result)) {
      showSuccess("Customer bank account opened successfully.");
      setShowCreateModal(false);
    } else if (createStaffAccountThunk.rejected.match(result)) {
      showError(String(result.payload || "Failed to create bank account."));
    }
  };

  const totalPages = Math.max(1, Math.ceil(accountsTotal / 10));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
      case "INACTIVE":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
      case "BLOCKED":
      case "FROZEN":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20";
      default:
        return "bg-muted text-muted-foreground border border-border";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "SAVINGS":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
      case "CURRENT":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20";
      case "BUSINESS":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
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
            <span className="text-muted-foreground text-sm">Account Operations</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary" />
            Bank Account Management
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Open, inspect, and manage official customer banking accounts backed by MongoDB records.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-all shadow-md active:scale-[0.98] w-fit cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create Bank Account
        </button>
      </div>

      {/* Alerts */}
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

      {/* Filter and Search Controls */}
      <div className="bg-card border border-border rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search account # or customer..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-background border border-input rounded-xl pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Account Type Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
              className="bg-background border border-input rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="ALL">All Types</option>
              <option value="SAVINGS">Savings Account</option>
              <option value="CURRENT">Current Account</option>
              <option value="BUSINESS">Business Account</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
            }}
            className="bg-background border border-input rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="BLOCKED">Blocked</option>
            <option value="FROZEN">Frozen</option>
          </select>

          <button
            onClick={() =>
              dispatch(fetchStaffAccounts({ search, type: typeFilter, status: statusFilter, page }))
            }
            title="Refresh list"
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors border border-border cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-primary" : ""}`} />
          </button>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-foreground">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
              <tr>
                <th className="px-5 py-3.5">Account Number</th>
                <th className="px-5 py-3.5">Customer Name</th>
                <th className="px-5 py-3.5">Account Type</th>
                <th className="px-5 py-3.5">Available Balance</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Opened Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading && accounts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                    Loading bank accounts from database...
                  </td>
                </tr>
              ) : accounts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">
                    <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-40 text-muted-foreground" />
                    No bank accounts found matching criteria.
                  </td>
                </tr>
              ) : (
                accounts.map((acc) => (
                  <tr key={acc.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-4 font-mono font-medium text-primary">
                      {acc.accountNumber}
                    </td>
                    <td className="px-5 py-4 font-medium text-foreground flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span>{acc.customerName}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${getTypeBadge(acc.accountType)}`}>
                        {acc.accountType}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-foreground">
                      ${acc.availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadge(acc.accountStatus)}`}>
                        {acc.accountStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground text-xs">
                      {new Date(acc.openedAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedAccount(acc)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors border border-border cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-primary" />
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground bg-muted/20">
          <div>
            Showing <span className="font-semibold text-foreground">{accounts.length}</span> of{" "}
            <span className="font-semibold text-foreground">{accountsTotal}</span> total accounts
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="p-1.5 rounded-lg bg-card border border-border text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className="p-1.5 rounded-lg bg-card border border-border text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Account Details Modal */}
      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in duration-200">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-card-foreground">Bank Account Details</h3>
                  <p className="text-xs font-mono text-primary">{selectedAccount.accountNumber}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAccount(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-xs text-muted-foreground block mb-1">Account Holder</span>
                  <span className="font-semibold text-foreground">{selectedAccount.customerName}</span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-xs text-muted-foreground block mb-1">Account Type</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${getTypeBadge(selectedAccount.accountType)}`}>
                    {selectedAccount.accountType}
                  </span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-xs text-muted-foreground block mb-1">Available Balance</span>
                  <span className="text-lg font-bold text-primary">
                    ${selectedAccount.availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-xs text-muted-foreground block mb-1">Account Status</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${getStatusBadge(selectedAccount.accountStatus)}`}>
                    {selectedAccount.accountStatus}
                  </span>
                </div>
              </div>

              <div className="bg-muted/40 p-4 rounded-xl border border-border space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Customer Reference ID:</span>
                  <span className="font-mono text-foreground">{selectedAccount.userId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Daily Transfer Limit:</span>
                  <span className="font-semibold text-foreground">
                    ${selectedAccount.dailyTransferLimit?.toLocaleString() || "5,000"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Account Opening Date:</span>
                  <span className="text-foreground">{new Date(selectedAccount.openedAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Security & Regulatory Notice */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex gap-2.5">
                <ShieldAlert className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
                <div>
                  <p className="font-semibold text-amber-900 dark:text-amber-200">Staff Operational Boundaries</p>
                  <p className="mt-0.5 text-amber-800/80 dark:text-amber-300/80">
                    Staff officers cannot arbitrarily change account balances or configure global overdraft limits.
                    All balance alterations must occur through audited institutional deposit/withdrawal transactions.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border bg-muted/20 flex justify-end">
              <button
                onClick={() => setSelectedAccount(null)}
                className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-sm font-medium transition-colors border border-border cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Bank Account Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in duration-200">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-card-foreground">Open New Bank Account</h3>
                  <p className="text-xs text-muted-foreground">Select an existing verified customer to provision an account</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Select Customer */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Target Customer <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="w-full bg-background border border-input rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">-- Choose verified customer --</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} ({c.email}) - Status: {c.accountStatus}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Only customers with verified profiles in Wishes Bank LTD can have new accounts provisioned.
                </p>
              </div>

              {/* Account Type */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Account Type <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  className="w-full bg-background border border-input rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="SAVINGS">Savings Account (Standard interest-bearing account)</option>
                  <option value="CURRENT">Current Account (Daily transactional account)</option>
                  <option value="BUSINESS">Business Account (Corporate operations account)</option>
                </select>
              </div>

              {/* Initial Deposit */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Initial Deposit Amount ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-background border border-input rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  Enter 0 for zero-balance opening or specify cash received at counter.
                </p>
              </div>

              {/* System Note */}
              <div className="p-3 rounded-xl bg-muted/40 border border-border text-muted-foreground text-xs">
                <p className="font-semibold text-foreground mb-0.5">Automated Generation</p>
                A globally unique 10-digit account number (starting with 102...) will be automatically minted by the Wishes Bank backend engine.
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-sm font-medium transition-colors border border-border cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-all shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {actionLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Confirm & Open Account
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAdminAccounts,
  createAdminAccountThunk,
  updateAccountStatusThunk,
  updateAccountLimitThunk,
  fetchAdminCustomers,
  clearAdminMessages,
  AdminAccountItem,
} from "@/store/slices/adminSlice";
import { showSuccess, showError } from "@/lib/toast";
import {
  CreditCard,
  Plus,
  Search,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  Eye,
  ChevronLeft,
  ChevronRight,
  User,
  Sliders,
  Snowflake,
  Flame,
} from "lucide-react";

export default function AdminAccounts() {
  const dispatch = useAppDispatch();
  const {
    accounts,
    accountsTotal,
    customers,
    isLoading,
    actionLoading,
    actionSuccessMessage,
    error,
  } = useAppSelector((state) => state.admin);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  // Selected account for details modal
  const [selectedAccount, setSelectedAccount] = useState<AdminAccountItem | null>(null);

  // Account creation modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [accountType, setAccountType] = useState("SAVINGS");
  const [initialDeposit, setInitialDeposit] = useState("0");
  const [dailyTransferLimit, setDailyTransferLimit] = useState("5000");
  const [createError, setCreateError] = useState("");

  // Account limit/controls modal
  const [controlAccount, setControlAccount] = useState<AdminAccountItem | null>(null);
  const [newLimit, setNewLimit] = useState("");
  const [limitError, setLimitError] = useState("");

  useEffect(() => {
    dispatch(fetchAdminAccounts({ search, type: typeFilter, status: statusFilter, page }));
  }, [dispatch, search, typeFilter, statusFilter, page]);

  const handleOpenCreateModal = () => {
    dispatch(fetchAdminCustomers({ page: 1 }));
    setSelectedCustomerId("");
    setAccountType("SAVINGS");
    setInitialDeposit("0");
    setDailyTransferLimit("5000");
    setCreateError("");
    setShowCreateModal(true);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");

    if (!selectedCustomerId) {
      const msg = "Please select an existing customer.";
      setCreateError(msg);
      showError(msg);
      return;
    }

    const depNum = parseFloat(initialDeposit);
    if (isNaN(depNum) || depNum < 0) {
      const msg = "Initial deposit cannot be negative.";
      setCreateError(msg);
      showError(msg);
      return;
    }

    const limitNum = parseFloat(dailyTransferLimit);
    if (isNaN(limitNum) || limitNum <= 0) {
      const msg = "Daily transfer limit must be a positive number.";
      setCreateError(msg);
      showError(msg);
      return;
    }

    const result = await dispatch(
      createAdminAccountThunk({
        userId: selectedCustomerId,
        accountType,
        initialDeposit: depNum,
        dailyTransferLimit: limitNum,
      })
    );

    if (createAdminAccountThunk.fulfilled.match(result)) {
      showSuccess("Bank account opened successfully.");
      setShowCreateModal(false);
    } else if (createAdminAccountThunk.rejected.match(result)) {
      showError(String(result.payload || "Failed to create bank account."));
    }
  };

  const handleToggleFreeze = async (acc: AdminAccountItem) => {
    const nextStatus = acc.accountStatus === "FROZEN" ? "ACTIVE" : "FROZEN";
    const reason = nextStatus === "FROZEN" ? "Administrative freeze applied by Admin" : "Administrative unfreeze applied by Admin";
    const result = await dispatch(updateAccountStatusThunk({ id: acc.id, status: nextStatus, reason }));
    if (updateAccountStatusThunk.fulfilled.match(result)) {
      showSuccess(`Account status updated to ${nextStatus}.`);
    } else if (updateAccountStatusThunk.rejected.match(result)) {
      showError(String(result.payload || "Failed to update account status."));
    }
  };

  const handleLimitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLimitError("");
    if (!controlAccount) return;

    const num = parseFloat(newLimit);
    if (isNaN(num) || num <= 0) {
      const msg = "Please enter a valid positive dollar amount.";
      setLimitError(msg);
      showError(msg);
      return;
    }

    const result = await dispatch(
      updateAccountLimitThunk({
        id: controlAccount.id,
        dailyTransferLimit: num,
      })
    );

    if (updateAccountLimitThunk.fulfilled.match(result)) {
      showSuccess(`Daily transfer limit updated to $${num.toLocaleString()}.`);
      setControlAccount(null);
    } else if (updateAccountLimitThunk.rejected.match(result)) {
      showError(String(result.payload || "Failed to update daily transfer limit."));
    }
  };

  const totalPages = Math.max(1, Math.ceil(accountsTotal / 10));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
      case "FROZEN":
        return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20";
      case "BLOCKED":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20";
      case "INACTIVE":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
      default:
        return "bg-muted text-muted-foreground border border-border";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "SAVINGS":
      case "Savings Account":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
      case "CURRENT":
      case "Current Account":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20";
      case "BUSINESS":
      case "Business Account":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
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
            <span className="text-muted-foreground text-sm">Depository Controls</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            Bank Account Management
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Provision facilities, configure regulatory transfer limits, and manage administrative freeze sanctions.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-all shadow-md shadow-emerald-950/20 w-fit"
        >
          <Plus className="w-4 h-4" />
          Open Bank Account
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

      {/* Search & Filter Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search account number or customer..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-background border border-input rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
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
            className="bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="ALL">All Types</option>
            <option value="SAVINGS">Savings Account</option>
            <option value="CURRENT">Current Account</option>
            <option value="BUSINESS">Business Account</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="FROZEN">Frozen (Sanctioned)</option>
            <option value="BLOCKED">Blocked</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          <button
            onClick={() =>
              dispatch(fetchAdminAccounts({ search, type: typeFilter, status: statusFilter, page }))
            }
            title="Refresh accounts"
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors border border-border"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-emerald-600 dark:text-emerald-400" : ""}`} />
          </button>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-foreground">
            <thead className="bg-muted/60 uppercase tracking-wider text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3">Account Number</th>
                <th className="px-4 py-3">Account Holder</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Available Balance</th>
                <th className="px-4 py-3">Daily Limit</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Opened</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {isLoading && accounts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                    Loading depository accounts from database...
                  </td>
                </tr>
              ) : accounts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                    <CreditCard className="w-7 h-7 mx-auto mb-2 opacity-40 text-muted-foreground" />
                    No bank accounts found matching criteria.
                  </td>
                </tr>
              ) : (
                accounts.map((acc) => (
                  <tr key={acc.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 font-mono font-medium text-emerald-600 dark:text-emerald-400">
                      {acc.accountNumber}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span>{acc.customerName}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getTypeBadge(acc.accountType)}`}>
                        {acc.accountType}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      ${acc.availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      ${(acc.dailyTransferLimit || 5000).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getStatusBadge(acc.accountStatus)}`}>
                        {acc.accountStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-[11px]">
                      {new Date(acc.openedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedAccount(acc)}
                          className="p-1 rounded-lg bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        </button>
                        <button
                          onClick={() => {
                            setControlAccount(acc);
                            setNewLimit(acc.dailyTransferLimit?.toString() || "5000");
                            setLimitError("");
                          }}
                          className="p-1 rounded-lg bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border"
                          title="Configure Transfer Limit"
                        >
                          <Sliders className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleToggleFreeze(acc)}
                          className={`p-1 rounded-lg transition-colors border ${
                            acc.accountStatus === "FROZEN"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 hover:bg-amber-500/20"
                              : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20"
                          }`}
                          title={acc.accountStatus === "FROZEN" ? "Unfreeze Account" : "Freeze Account"}
                        >
                          {acc.accountStatus === "FROZEN" ? (
                            <Flame className="w-3.5 h-3.5" />
                          ) : (
                            <Snowflake className="w-3.5 h-3.5" />
                          )}
                        </button>
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
            Showing <span className="font-semibold text-foreground">{accounts.length}</span> of{" "}
            <span className="font-semibold text-foreground">{accountsTotal}</span> total accounts
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

      {/* Account Details Modal */}
      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/40">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Facility Audit Record</h3>
                  <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400">{selectedAccount.accountNumber}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAccount(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-0.5">Customer Name</span>
                  <span className="font-semibold text-foreground">{selectedAccount.customerName}</span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-0.5">Account Type</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getTypeBadge(selectedAccount.accountType)}`}>
                    {selectedAccount.accountType}
                  </span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-0.5">Available Balance</span>
                  <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                    ${selectedAccount.availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-0.5">Status</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getStatusBadge(selectedAccount.accountStatus)}`}>
                    {selectedAccount.accountStatus}
                  </span>
                </div>
              </div>

              <div className="bg-muted/40 p-3.5 rounded-xl border border-border space-y-1.5 text-foreground">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer Reference:</span>
                  <span className="font-mono text-foreground">{selectedAccount.userId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Daily Transfer Limit:</span>
                  <span className="font-semibold text-foreground">${selectedAccount.dailyTransferLimit?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Opening Date:</span>
                  <span className="text-foreground">{new Date(selectedAccount.openedAt).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border bg-muted/20 flex justify-end">
              <button
                onClick={() => setSelectedAccount(null)}
                className="px-4 py-2 rounded-xl bg-background hover:bg-muted border border-border text-foreground text-xs font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Limit Configuration Modal */}
      {controlAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/40">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Configure Daily Limit</h4>
                  <p className="text-xs text-muted-foreground font-mono">{controlAccount.accountNumber}</p>
                </div>
              </div>
              <button
                onClick={() => setControlAccount(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLimitSubmit} className="p-5 space-y-4 text-xs">
              {limitError && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 text-[11px] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>{limitError}</span>
                </div>
              )}

              <div>
                <label className="block text-foreground font-medium mb-1">
                  New Daily Transfer Limit ($) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  step="100"
                  required
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  className="w-full bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  Enforces the maximum aggregate amount this account can wire out within a 24-hour clearing window.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setControlAccount(null)}
                  className="px-3 py-2 rounded-xl bg-background hover:bg-muted border border-border text-foreground text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md shadow-blue-950/20 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {actionLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  Save Daily Limit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Account Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/40">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Open Official Bank Facility</h3>
                  <p className="text-xs text-muted-foreground">Admin provision of accounts backed by MongoDB</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 space-y-4 text-xs">
              {createError && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 text-[11px] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>{createError}</span>
                </div>
              )}

              <div>
                <label className="block text-foreground font-medium mb-1">
                  Customer <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="w-full bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">-- Choose verified customer --</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} ({c.email}) - {c.accountStatus}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-foreground font-medium mb-1">Account Type</label>
                <select
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  className="w-full bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="SAVINGS">Savings Account (Interest Bearing)</option>
                  <option value="CURRENT">Current Account (Operational)</option>
                  <option value="BUSINESS">Business Account (Commercial Vault)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-foreground font-medium mb-1">Initial Deposit ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(e.target.value)}
                    className="w-full bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-foreground font-medium mb-1">Daily Limit ($)</label>
                  <input
                    type="number"
                    min="500"
                    step="500"
                    value={dailyTransferLimit}
                    onChange={(e) => setDailyTransferLimit(e.target.value)}
                    className="w-full bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
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
                  Confirm & Provision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

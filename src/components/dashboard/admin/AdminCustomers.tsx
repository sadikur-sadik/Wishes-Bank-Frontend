"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAdminCustomers,
  updateCustomerStatusThunk,
  clearAdminMessages,
  AdminCustomerItem,
} from "@/store/slices/adminSlice";
import { showSuccess, showError } from "@/lib/toast";
import {
  Users,
  Search,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  Eye,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Wallet,
} from "lucide-react";

export default function AdminCustomers() {
  const dispatch = useAppDispatch();
  const {
    customers,
    customersTotal,
    isLoading,
    actionLoading,
    actionSuccessMessage,
    error,
  } = useAppSelector((state) => state.admin);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  // Selected customer for inspection modal
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  // Status Change Modal
  const [statusModalCust, setStatusModalCust] = useState<AdminCustomerItem | null>(null);
  const [targetStatus, setTargetStatus] = useState("ACTIVE");
  const [statusReason, setStatusReason] = useState("");

  useEffect(() => {
    dispatch(fetchAdminCustomers({ search, status: statusFilter, page }));
  }, [dispatch, search, statusFilter, page]);

  const selectedCust = selectedCustomerId
    ? customers.find((c) => c.id === selectedCustomerId) || null
    : null;

  const handleStatusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusModalCust) return;

    const result = await dispatch(
      updateCustomerStatusThunk({
        id: statusModalCust.id,
        status: targetStatus,
        reason: statusReason.trim() || undefined,
      })
    );

    if (updateCustomerStatusThunk.fulfilled.match(result)) {
      showSuccess(`Customer account status updated to ${targetStatus}.`);
      setStatusModalCust(null);
      setStatusReason("");
    } else if (updateCustomerStatusThunk.rejected.match(result)) {
      showError(String(result.payload || "Failed to update customer status."));
    }
  };

  const totalPages = Math.max(1, Math.ceil(customersTotal / 10));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
      case "INACTIVE":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
      case "BLOCKED":
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
              Admin Governance
            </span>
            <span className="text-muted-foreground text-sm">•</span>
            <span className="text-muted-foreground text-sm">Customer Master</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1 flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Customer Directory & Account Status
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Full administrative control over all customer accounts, active facilities, and regulatory compliance statuses.
          </p>
        </div>

        <button
          onClick={() => dispatch(fetchAdminCustomers({ search, status: statusFilter, page }))}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors border border-border w-fit cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-primary" : ""}`} />
          Refresh Customers
        </button>
      </div>

      {/* Messages */}
      {actionSuccessMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-200 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{actionSuccessMessage}</span>
          </div>
          <button
            onClick={() => dispatch(clearAdminMessages())}
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
            onClick={() => dispatch(clearAdminMessages())}
            className="text-rose-600 dark:text-rose-400 hover:opacity-80 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filters and Search Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customer name, email, or phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-background border border-input rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="ALL">All Account Statuses</option>
            <option value="ACTIVE">Active Customers</option>
            <option value="INACTIVE">Inactive Customers</option>
            <option value="BLOCKED">Blocked Customers</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-foreground">
            <thead className="bg-muted/60 uppercase tracking-wider text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3">Customer Profile</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Accounts</th>
                <th className="px-4 py-3">Total Balance</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Registered</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading && customers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-primary" />
                    Loading customers from MongoDB...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                    <Users className="w-7 h-7 mx-auto mb-2 opacity-40 text-muted-foreground" />
                    No customers found matching criteria.
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-foreground">{c.fullName}</div>
                      <span className="font-mono text-[10px] text-muted-foreground">ID: {c.id}</span>
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      <div>{c.email}</div>
                      <span className="text-muted-foreground text-[11px]">{c.phoneNumber}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                        <Wallet className="w-3 h-3 text-primary" />
                        {c.accountCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      ${c.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getStatusBadge(c.accountStatus)}`}>
                        {c.accountStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-[11px]">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedCustomerId(c.id)}
                          className="p-1 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors border border-border cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5 text-primary" />
                        </button>
                        <button
                          onClick={() => {
                            setStatusModalCust(c);
                            setTargetStatus(c.accountStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE");
                            setStatusReason("");
                          }}
                          className="px-2 py-1 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-[11px] font-medium transition-colors border border-border cursor-pointer"
                        >
                          Status
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
            Showing <span className="font-semibold text-foreground">{customers.length}</span> of{" "}
            <span className="font-semibold text-foreground">{customersTotal}</span> total customers
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

      {/* Customer Details Modal */}
      {selectedCust && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in duration-200">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-card-foreground">{selectedCust.fullName}</h3>
                  <p className="text-xs font-mono text-muted-foreground">{selectedCust.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomerId(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-0.5">Email</span>
                  <span className="text-foreground font-medium">{selectedCust.email}</span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-0.5">Phone Number</span>
                  <span className="text-foreground font-medium">{selectedCust.phoneNumber || "N/A"}</span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-0.5">Total Balance</span>
                  <span className="text-base font-bold text-primary">
                    ${selectedCust.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="bg-muted/40 p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block mb-0.5">Account Status</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getStatusBadge(selectedCust.accountStatus)}`}>
                    {selectedCust.accountStatus}
                  </span>
                </div>
              </div>

              <div className="bg-muted/40 p-3.5 rounded-xl border border-border space-y-1.5 text-foreground">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Residential Address:</span>
                  <span className="text-foreground">{selectedCust.address || "Dhaka, Bangladesh"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Facilities Count:</span>
                  <span className="text-foreground font-semibold">{selectedCust.accountCount} Accounts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Onboarding Date:</span>
                  <span className="text-foreground">{new Date(selectedCust.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border bg-muted/20 flex justify-end">
              <button
                onClick={() => setSelectedCustomerId(null)}
                className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors border border-border cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Status Management Modal */}
      {statusModalCust && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in duration-200">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-card-foreground text-sm">Update Account Status</h4>
                  <p className="text-xs text-muted-foreground">{statusModalCust.fullName}</p>
                </div>
              </div>
              <button
                onClick={() => setStatusModalCust(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStatusSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-foreground font-medium mb-1">Target Account Status</label>
                <select
                  value={targetStatus}
                  onChange={(e) => setTargetStatus(e.target.value)}
                  className="w-full bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="ACTIVE">ACTIVE — Restore all banking privileges</option>
                  <option value="INACTIVE">INACTIVE — Temporarily pause account access</option>
                  <option value="BLOCKED">BLOCKED — Immediately terminate authentication & operations</option>
                </select>
              </div>

              <div>
                <label className="block text-foreground font-medium mb-1">
                  Administrative Reason / Compliance Justification (Optional)
                </label>
                <textarea
                  rows={3}
                  value={statusReason}
                  onChange={(e) => setStatusReason(e.target.value)}
                  placeholder="e.g. KYC audit requested, suspicious multiple failed transfers, or customer request..."
                  className="w-full bg-background border border-input rounded-xl p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setStatusModalCust(null)}
                  className="px-3 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors border border-border cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-all shadow-sm disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  {actionLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

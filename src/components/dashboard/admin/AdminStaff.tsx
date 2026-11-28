"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAdminStaff,
  updateStaffStatusThunk,
  clearAdminMessages,
  AdminStaffItem,
} from "@/store/slices/adminSlice";
import { showSuccess, showError } from "@/lib/toast";
import {
  ShieldCheck,
  Search,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  Check,
  User,
  Clock,
} from "lucide-react";

export default function AdminStaff() {
  const dispatch = useAppDispatch();
  const { staff, isLoading, actionLoading, actionSuccessMessage, error } = useAppSelector(
    (state) => state.admin
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Approval or status modal
  const [selectedStaff, setSelectedStaff] = useState<AdminStaffItem | null>(null);
  const [statusAction, setStatusAction] = useState<"APPROVE" | "REJECT" | "BLOCK" | "INACTIVE" | "ACTIVE">("APPROVE");
  const [reason, setReason] = useState("");

  useEffect(() => {
    dispatch(fetchAdminStaff({ status: statusFilter, search }));
  }, [dispatch, statusFilter, search]);

  const handleActionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff) return;

    let targetStatus = "ACTIVE";
    if (statusAction === "APPROVE") targetStatus = "ACTIVE";
    else if (statusAction === "REJECT") targetStatus = "REJECTED";
    else if (statusAction === "BLOCK") targetStatus = "BLOCKED";
    else if (statusAction === "INACTIVE") targetStatus = "INACTIVE";
    else if (statusAction === "ACTIVE") targetStatus = "ACTIVE";

    const result = await dispatch(
      updateStaffStatusThunk({
        id: selectedStaff.id,
        status: targetStatus,
        reason: reason.trim() || undefined,
      })
    );

    if (updateStaffStatusThunk.fulfilled.match(result)) {
      showSuccess(`Staff credentials status updated to ${targetStatus}.`);
      setSelectedStaff(null);
      setReason("");
    } else if (updateStaffStatusThunk.rejected.match(result)) {
      showError(String(result.payload || "Failed to update staff credentials status."));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
      case "PENDING":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
      case "REJECTED":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20";
      case "BLOCKED":
        return "bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/40";
      case "INACTIVE":
        return "bg-muted text-muted-foreground border border-border";
      default:
        return "bg-muted text-muted-foreground border border-border";
    }
  };

  const pendingCount = staff.filter((s) => s.accountStatus === "PENDING").length;

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
            <span className="text-muted-foreground text-sm">Staff Credentials Board</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            Staff Management & Approvals
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Evaluate pending staff applications, grant active officer privileges, or revoke administrative access.
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs w-fit">
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>{pendingCount} staff application(s) awaiting your decision</span>
          </div>
        )}
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

      {/* Search & Filter */}
      <div className="bg-card border border-border rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search staff name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-input rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-background border border-input rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="ALL">All Staff Statuses</option>
            <option value="PENDING">Pending Approval</option>
            <option value="ACTIVE">Active Officers</option>
            <option value="REJECTED">Rejected</option>
            <option value="BLOCKED">Blocked</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          <button
            onClick={() => dispatch(fetchAdminStaff({ status: statusFilter, search }))}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors border border-border cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-primary" : ""}`} />
          </button>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-foreground">
            <thead className="bg-muted/60 uppercase tracking-wider text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3">Staff Officer</th>
                <th className="px-4 py-3">Email Address</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Applied Date</th>
                <th className="px-4 py-3 text-right">Administrative Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading && staff.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-primary" />
                    Loading staff records from database...
                  </td>
                </tr>
              ) : staff.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                    <ShieldCheck className="w-7 h-7 mx-auto mb-2 opacity-40 text-muted-foreground" />
                    No staff members found matching criteria.
                  </td>
                </tr>
              ) : (
                staff.map((s) => (
                  <tr key={s.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span>{s.fullName}</span>
                    </td>
                    <td className="px-4 py-3 text-foreground font-mono">
                      {s.email}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {s.phoneNumber || "N/A"}
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {s.role}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getStatusBadge(s.accountStatus)}`}>
                        {s.accountStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-[11px]">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {s.accountStatus === "PENDING" ? (
                          <>
                            <button
                              onClick={() => {
                                setSelectedStaff(s);
                                setStatusAction("APPROVE");
                                setReason("");
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-[11px] font-medium transition-all shadow-sm cursor-pointer"
                            >
                              <Check className="w-3 h-3" />
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                setSelectedStaff(s);
                                setStatusAction("REJECT");
                                setReason("");
                              }}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[11px] font-medium border border-rose-500/20 transition-colors cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                              Reject
                            </button>
                          </>
                        ) : (
                          <div className="flex items-center gap-1">
                            {s.accountStatus !== "ACTIVE" && (
                              <button
                                onClick={() => {
                                  setSelectedStaff(s);
                                  setStatusAction("ACTIVE");
                                  setReason("");
                                }}
                                className="px-2 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium border border-emerald-500/20 transition-colors cursor-pointer"
                              >
                                Activate
                              </button>
                            )}
                            {s.accountStatus !== "INACTIVE" && (
                              <button
                                onClick={() => {
                                  setSelectedStaff(s);
                                  setStatusAction("INACTIVE");
                                  setReason("");
                                }}
                                className="px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-medium border border-amber-500/20 transition-colors cursor-pointer"
                              >
                                Deactivate
                              </button>
                            )}
                            {s.accountStatus !== "BLOCKED" && (
                              <button
                                onClick={() => {
                                  setSelectedStaff(s);
                                  setStatusAction("BLOCK");
                                  setReason("");
                                }}
                                className="px-2 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[11px] font-medium border border-rose-500/20 transition-colors cursor-pointer"
                              >
                                Block
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status / Approval Confirmation Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-xl border ${
                    statusAction === "APPROVE" || statusAction === "ACTIVE"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                  }`}
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-card-foreground text-sm">
                    {statusAction === "APPROVE"
                      ? "Approve Staff Application"
                      : statusAction === "REJECT"
                      ? "Reject Staff Application"
                      : `Set Account to ${statusAction}`}
                  </h4>
                  <p className="text-xs text-muted-foreground">{selectedStaff.fullName} ({selectedStaff.email})</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStaff(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleActionSubmit} className="p-5 space-y-4 text-xs">
              <p className="text-foreground">
                Are you sure you want to proceed with <strong>{statusAction}</strong> for this staff officer?
                {statusAction === "APPROVE"
                  ? " This will grant immediate access to customer and transaction management."
                  : " Any restricted privileges will be immediately barred."}
              </p>

              <div>
                <label className="block text-foreground font-medium mb-1">
                  Administrative Note / Reason (Optional)
                </label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Identity verified by HR or security clearance updated..."
                  className="w-full bg-background border border-input rounded-xl p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setSelectedStaff(null)}
                  className="px-3 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors border border-border cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className={`px-4 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm ${
                    statusAction === "APPROVE" || statusAction === "ACTIVE"
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-rose-600 hover:bg-rose-500"
                  } disabled:opacity-50 flex items-center gap-1.5 cursor-pointer`}
                >
                  {actionLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  Confirm {statusAction}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

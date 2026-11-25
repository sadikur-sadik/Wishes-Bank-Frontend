"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  Users,
  Check,
  X,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Mail,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserRole, AccountStatus } from "@/types/user";
import {
  useGetPendingStaffQuery,
  useUpdateStaffApprovalMutation,
} from "@/store/api/authApi";

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Role Protection guard
  React.useEffect(() => {
    if (session?.user && session.user.role !== UserRole.ADMIN) {
      if (session.user.role === UserRole.STAFF) {
        router.replace("/dashboard/staff");
      } else if (session.user.role === UserRole.CUSTOMER) {
        router.replace("/dashboard/customer");
      }
    }
  }, [session, router]);

  // RTK Query for Staff Approvals
  const {
    data: staffData,
    isLoading: isStaffLoading,
    refetch,
  } = useGetPendingStaffQuery();

  const [updateStaffApproval, { isLoading: isUpdating }] =
    useUpdateStaffApprovalMutation();

  const [actionFeedback, setActionFeedback] = React.useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleApprovalAction = async (
    userId: string,
    action: "APPROVE" | "REJECT"
  ) => {
    try {
      setActionFeedback(null);
      const res = await updateStaffApproval({ userId, action }).unwrap();
      setActionFeedback({
        message: res.message,
        type: "success",
      });
      refetch();
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to process approval action.";
      setActionFeedback({
        message: errorMsg,
        type: "error",
      });
    }
  };

  const pendingStaff =
    staffData?.staff.filter((s) => s.accountStatus === AccountStatus.PENDING) || [];
  const activeStaff =
    staffData?.staff.filter((s) => s.accountStatus === AccountStatus.ACTIVE) || [];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold mb-2">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Master Administration Console</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Wishes Bank Administrator Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            System administration, staff role authorizations, and overall security governance.
          </p>
        </div>

        <Button
          onClick={() => refetch()}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Refresh Data</span>
        </Button>
      </div>

      {actionFeedback && (
        <div
          className={`p-4 rounded-xl border text-sm flex items-center gap-2 font-medium ${
            actionFeedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
              : "bg-destructive/10 border-destructive/20 text-destructive"
          }`}
        >
          {actionFeedback.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertTriangle className="h-4 w-4 shrink-0" />
          )}
          <span>{actionFeedback.message}</span>
        </div>
      )}

      {/* Staff Management Section */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Staff Registration Approvals
              </h2>
              <p className="text-xs text-muted-foreground">
                Review and approve staff applicants before they are granted access to staff portals.
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            {pendingStaff.length} Pending Approval
          </span>
        </div>

        {isStaffLoading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-xs text-muted-foreground">Loading staff applications...</p>
          </div>
        ) : pendingStaff.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-border rounded-xl text-muted-foreground space-y-1">
            <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2 opacity-80" />
            <p className="text-sm font-semibold text-foreground">
              No Pending Staff Applications
            </p>
            <p className="text-xs">
              When new users register with the Staff role, their applications will appear here for review.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
            {pendingStaff.map((staff) => (
              <div
                key={staff.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground text-sm">
                      {staff.fullName}
                    </span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      Pending Review
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" />
                      {staff.email}
                    </span>
                    {staff.phoneNumber && (
                      <span>Phone: {staff.phoneNumber}</span>
                    )}
                    {staff.createdAt && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(staff.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Button
                    size="sm"
                    disabled={isUpdating}
                    onClick={() => handleApprovalAction(staff.id, "APPROVE")}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs gap-1.5 h-8 font-semibold"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isUpdating}
                    onClick={() => handleApprovalAction(staff.id, "REJECT")}
                    className="text-destructive hover:bg-destructive/10 border-destructive/30 text-xs gap-1.5 h-8 font-semibold"
                  >
                    <X className="h-3.5 w-3.5" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Approved Staff Members List */}
        {activeStaff.length > 0 && (
          <div className="pt-4 border-t border-border space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Approved Staff Members ({activeStaff.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {activeStaff.map((staff) => (
                <div
                  key={staff.id}
                  className="p-3 rounded-xl border border-border bg-muted/20 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      {staff.fullName}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate max-w-[180px]">
                      {staff.email}
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

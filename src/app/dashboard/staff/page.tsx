"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Users,
  CheckCircle,
  Clock,
  ShieldCheck,
  Search,
  FileText,
} from "lucide-react";
import { UserRole } from "@/types/user";

export default function StaffDashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Role Protection guard
  React.useEffect(() => {
    if (session?.user && session.user.role !== UserRole.STAFF) {
      if (session.user.role === UserRole.ADMIN) {
        router.replace("/dashboard/admin");
      } else if (session.user.role === UserRole.CUSTOMER) {
        router.replace("/dashboard/customer");
      }
    }
  }, [session, router]);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            <Briefcase className="h-3.5 w-3.5" />
            <span>Bank Operations Staff Portal</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Staff Operations Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Officer {session?.user?.fullName || "Staff Member"} — Review customer requests, verify KYC, and inspect accounts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <ShieldCheck className="h-4 w-4" />
            <span>Authorized Staff Member</span>
          </div>
        </div>
      </div>

      {/* Staff Operational Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Pending KYC
            </span>
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
          <div className="text-3xl font-bold text-foreground">14</div>
          <p className="text-xs text-muted-foreground">Customer applications to verify</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Loan Inquiries
            </span>
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-foreground">8</div>
          <p className="text-xs text-muted-foreground">Underwriting reviews pending</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Verified Today
            </span>
            <CheckCircle className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-bold text-foreground">26</div>
          <p className="text-xs text-muted-foreground">Accounts reviewed and cleared</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Assigned Customers
            </span>
            <Users className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-foreground">152</div>
          <p className="text-xs text-muted-foreground">Active branch clients</p>
        </div>
      </div>

      {/* Customer Lookup & Operational Tools */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Customer Verification Queue</h2>
            <p className="text-xs text-muted-foreground">
              Review and verify submitted customer documentation.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by customer name or email..."
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-input bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="p-8 text-center text-muted-foreground border border-dashed border-border rounded-xl">
          <p className="text-sm font-medium">All pending KYC applications are currently up to date.</p>
          <p className="text-xs text-muted-foreground mt-1">
            New customer submissions will appear here automatically.
          </p>
        </div>
      </div>
    </div>
  );
}

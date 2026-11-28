"use client";

import * as React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountStatus, UserRole } from "@/types/user";
import { DashboardSidebar } from "@/components/dashboard/shared/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/shared/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  const role = (session?.user?.role as UserRole) || UserRole.CUSTOMER;

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    if (status === "authenticated" && session?.user) {
      const userRole = session.user.role as UserRole;
      if (pathname.startsWith("/dashboard/admin") && userRole !== UserRole.ADMIN) {
        router.replace(userRole === UserRole.STAFF ? "/dashboard/staff" : "/dashboard/customer");
      } else if (pathname.startsWith("/dashboard/staff") && userRole !== UserRole.STAFF) {
        router.replace(userRole === UserRole.ADMIN ? "/dashboard/admin" : "/dashboard/customer");
      } else if (pathname.startsWith("/dashboard/customer") && userRole !== UserRole.CUSTOMER) {
        router.replace(userRole === UserRole.ADMIN ? "/dashboard/admin" : "/dashboard/staff");
      }
    }
  }, [status, session, pathname, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground font-medium">
            Loading Wishes Bank Portal...
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session?.user) {
    return null;
  }

  // Handle suspended or blocked accounts
  if (
    session?.user?.accountStatus === AccountStatus.BLOCKED ||
    session?.user?.accountStatus === AccountStatus.INACTIVE ||
    session?.user?.accountStatus === AccountStatus.REJECTED
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full bg-card border border-destructive/20 p-8 rounded-2xl text-center space-y-4 shadow-xl">
          <ShieldAlert className="h-12 w-12 text-destructive mx-auto" />
          <h1 className="text-xl font-bold text-foreground">Account Access Restricted</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your account status is currently{" "}
            <span className="font-semibold text-destructive">{session.user.accountStatus}</span>. Access has been restricted by system administrators. Please contact bank compliance.
          </p>
          <Button
            onClick={() => signOut({ callbackUrl: "/login" })}
            variant="destructive"
            className="w-full"
          >
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Shared Responsive Sidebar */}
      <DashboardSidebar
        role={role}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          onMenuToggle={() => setIsMobileSidebarOpen(true)}
          title={
            role === UserRole.ADMIN
              ? "Administrator Executive Console"
              : role === UserRole.STAFF
              ? "Bank Operations Staff Portal"
              : "Personal Banking Dashboard"
          }
          breadcrumb={role.toLowerCase()}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

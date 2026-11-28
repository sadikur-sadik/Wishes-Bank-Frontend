"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/user";
import { StaffOverview } from "@/components/dashboard/staff/StaffOverview";

export default function StaffDashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Role Protection guard
  React.useEffect(() => {
    if (session?.user && session.user.role !== UserRole.STAFF) {
      if (session.user.role === UserRole.ADMIN) {
        router.replace("/dashboard/admin");
      } else {
        router.replace("/dashboard/customer");
      }
    }
  }, [session, router]);

  return <StaffOverview staffName={session?.user?.fullName || "Staff Member"} />;
}

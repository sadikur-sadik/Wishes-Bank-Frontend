"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/user";
import AdminOverview from "@/components/dashboard/admin/AdminOverview";

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Role Protection guard
  React.useEffect(() => {
    if (session?.user && session.user.role !== UserRole.ADMIN) {
      if (session.user.role === UserRole.STAFF) {
        router.replace("/dashboard/staff");
      } else {
        router.replace("/dashboard/customer");
      }
    }
  }, [session, router]);

  return <AdminOverview />;
}

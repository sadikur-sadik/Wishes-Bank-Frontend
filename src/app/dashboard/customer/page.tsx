"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/user";
import { CustomerOverview } from "@/components/dashboard/customer/CustomerOverview";

export default function CustomerDashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Role Protection guard
  React.useEffect(() => {
    if (session?.user && session.user.role !== UserRole.CUSTOMER) {
      if (session.user.role === UserRole.ADMIN) {
        router.replace("/dashboard/admin");
      } else if (session.user.role === UserRole.STAFF) {
        router.replace("/dashboard/staff");
      }
    }
  }, [session, router]);

  return <CustomerOverview userName={session?.user?.fullName || "Valued Customer"} />;
}

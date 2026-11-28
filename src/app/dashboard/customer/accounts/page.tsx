"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CustomerAccounts } from "@/components/dashboard/customer/CustomerAccounts";

export default function CustomerAccountsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.role !== "CUSTOMER") {
      router.push(`/dashboard/${session.user.role?.toLowerCase() || "customer"}`);
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent dark:border-emerald-400" />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading your accounts...</p>
        </div>
      </div>
    );
  }

  const userName = session?.user?.fullName || "Valued Customer";

  return <CustomerAccounts userName={userName} />;
}

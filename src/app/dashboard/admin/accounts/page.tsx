import React from "react";
import AdminAccounts from "@/components/dashboard/admin/AdminAccounts";

export const metadata = {
  title: "Bank Accounts | Admin Dashboard | Wishes Bank LTD",
  description: "Bank account management, transfer limits, and freeze controls.",
};

export default function AdminAccountsPage() {
  return <AdminAccounts />;
}

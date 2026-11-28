import React from "react";
import StaffAccounts from "@/components/dashboard/staff/StaffAccounts";

export const metadata = {
  title: "Bank Accounts | Staff Dashboard | Wishes Bank LTD",
  description: "Customer bank accounts directory and creation for Wishes Bank staff officers.",
};

export default function StaffAccountsPage() {
  return <StaffAccounts />;
}

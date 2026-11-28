import React from "react";
import StaffTransactions from "@/components/dashboard/staff/StaffTransactions";

export const metadata = {
  title: "Transactions | Staff Dashboard | Wishes Bank LTD",
  description: "Transaction clearing, approvals, and ledger monitoring for Wishes Bank staff.",
};

export default function StaffTransactionsPage() {
  return <StaffTransactions />;
}

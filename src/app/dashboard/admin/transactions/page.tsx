import React from "react";
import AdminTransactions from "@/components/dashboard/admin/AdminTransactions";

export const metadata = {
  title: "Transactions | Admin Dashboard | Wishes Bank LTD",
  description: "Bank-wide transaction ledger and compliance review.",
};

export default function AdminTransactionsPage() {
  return <AdminTransactions />;
}

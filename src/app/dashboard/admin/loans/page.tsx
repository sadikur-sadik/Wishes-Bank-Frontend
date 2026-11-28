import React from "react";
import AdminLoans from "@/components/dashboard/admin/AdminLoans";

export const metadata = {
  title: "Loans | Admin Dashboard | Wishes Bank LTD",
  description: "Loan underwriting approvals, rejections, and disbursements.",
};

export default function AdminLoansPage() {
  return <AdminLoans />;
}

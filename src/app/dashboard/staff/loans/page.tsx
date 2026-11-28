import React from "react";
import StaffLoans from "@/components/dashboard/staff/StaffLoans";

export const metadata = {
  title: "Loans | Staff Dashboard | Wishes Bank LTD",
  description: "Loan application review, internal underwriting notes, and admin forwarding.",
};

export default function StaffLoansPage() {
  return <StaffLoans />;
}

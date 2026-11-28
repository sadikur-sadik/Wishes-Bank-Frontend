import React from "react";
import AdminCustomers from "@/components/dashboard/admin/AdminCustomers";

export const metadata = {
  title: "Customers | Admin Dashboard | Wishes Bank LTD",
  description: "Customer management and account status governance.",
};

export default function AdminCustomersPage() {
  return <AdminCustomers />;
}

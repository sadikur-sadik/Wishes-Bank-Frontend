"use client";

import * as React from "react";
import {
  Users,
  Search,
  UserPlus,
  X,
  RefreshCw,
  Building,
  CheckCircle2,
  AlertCircle,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchStaffCustomers,
  createStaffCustomerThunk,
  clearStaffMessages,
  StaffCustomer,
} from "@/store/slices/staffSlice";
import { showSuccess, showError } from "@/lib/toast";

export const StaffCustomers = () => {
  const dispatch = useAppDispatch();
  const { customers, customersTotal, isLoading, actionLoading, actionSuccessMessage, error } =
    useAppSelector((state) => state.staff);

  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("ALL");
  const [page, setPage] = React.useState(1);

  // Registration Modal State
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [validationError, setValidationError] = React.useState<string | null>(null);

  // Customer Details View State
  const [selectedCustomer, setSelectedCustomer] = React.useState<StaffCustomer | null>(null);

  React.useEffect(() => {
    dispatch(fetchStaffCustomers({ search, status, page }));
  }, [dispatch, search, status, page]);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      const msg = "Full Name, Email address, and Password are required.";
      setValidationError(msg);
      showError(msg);
      return;
    }

    dispatch(
      createStaffCustomerThunk({
        fullName: fullName.trim(),
        email: email.trim(),
        password: password.trim(),
        phoneNumber: phoneNumber.trim() || undefined,
        address: address.trim() || undefined,
      })
    ).then((action) => {
      if (createStaffCustomerThunk.fulfilled.match(action)) {
        showSuccess(`Customer ${fullName.trim()} registered successfully.`);
        setRegisterModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setAddress("");
      } else if (createStaffCustomerThunk.rejected.match(action)) {
        showError(String(action.payload || "Failed to register customer."));
      }
    });
  };

  const totalPages = Math.ceil(customersTotal / 10) || 1;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            <Users className="h-3.5 w-3.5" />
            <span>Customer Master Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Customer Directory
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Search depository clients, audit customer profiles, and register verified banking customers.
          </p>
        </div>

        <Button
          onClick={() => {
            dispatch(clearStaffMessages());
            setRegisterModalOpen(true);
          }}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2 text-xs"
        >
          <UserPlus className="h-4 w-4" />
          <span>Register New Customer</span>
        </Button>
      </div>

      {actionSuccessMessage && (
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-xs text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{actionSuccessMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => dispatch(clearStaffMessages())}
            className="font-bold underline text-[10px]"
          >
            Dismiss
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/10 text-xs text-destructive flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search customers by name, email, or telephone..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-input bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="ALL">All Account Statuses</option>
              <option value="ACTIVE">Active Customers</option>
              <option value="INACTIVE">Inactive Customers</option>
              <option value="BLOCKED">Blocked Customers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h2 className="text-base font-bold text-foreground">Registered Customers</h2>
          <span className="text-xs font-medium text-muted-foreground">
            Showing {customers.length} of {customersTotal} customers
          </span>
        </div>

        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="h-6 w-6 text-primary animate-spin" />
            <span>Retrieving customer directory from database...</span>
          </div>
        ) : customers.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            <Users className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
            <p className="font-semibold text-foreground text-sm">No Customers Found</p>
            <p className="text-xs mt-1">Try adjusting your search query or register a new customer above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 text-muted-foreground uppercase font-bold text-[10px] tracking-wider border-b border-border">
                <tr>
                  <th className="py-3 px-3">Customer ID</th>
                  <th className="py-3 px-3">Full Name</th>
                  <th className="py-3 px-3">Email Address</th>
                  <th className="py-3 px-3">Phone</th>
                  <th className="py-3 px-3">Bank Accounts</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Registered</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-foreground">{c.id.slice(-8)}</td>
                    <td className="py-3 px-3 font-bold text-foreground">{c.fullName}</td>
                    <td className="py-3 px-3 text-muted-foreground">{c.email}</td>
                    <td className="py-3 px-3 text-muted-foreground">{c.phoneNumber || "N/A"}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                        {c.accountCount} {c.accountCount === 1 ? "Account" : "Accounts"}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                          c.accountStatus === "ACTIVE"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-destructive/10 text-destructive border-destructive/20"
                        }`}
                      >
                        {c.accountStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCustomer(c)}
                        className="h-7 text-xs font-semibold text-primary gap-1"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Details</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-border text-xs">
            <span className="text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="text-xs h-8"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="text-xs h-8"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Register New Customer Modal */}
      {registerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Register New Verified Customer</h3>
              </div>
              <button
                onClick={() => setRegisterModalOpen(false)}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {validationError && (
              <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/10 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="customer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Initial Login Password *
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Telephone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    placeholder="City, State"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-muted/20 border border-border text-[11px] text-muted-foreground">
                Notice: Registered user will be granted standard <strong>CUSTOMER</strong> privileges and an initial retail savings depository facility.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRegisterModalOpen(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-1.5"
                >
                  {actionLoading ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Registering...</span>
                    </>
                  ) : (
                    <span>Confirm Registration</span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Customer Profile Summary</h3>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs divide-y divide-border/60">
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Full Name:</span>
                <span className="font-bold text-foreground">{selectedCustomer.fullName}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-mono text-foreground">{selectedCustomer.email}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Phone Number:</span>
                <span className="text-foreground">{selectedCustomer.phoneNumber || "N/A"}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Account Status:</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                  {selectedCustomer.accountStatus}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Depository Accounts:</span>
                <span className="font-bold text-foreground">{selectedCustomer.accountCount} Accounts</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Onboarded Date:</span>
                <span className="text-foreground">{new Date(selectedCustomer.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button size="sm" onClick={() => setSelectedCustomer(null)} className="text-xs">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffCustomers;

"use client";

import * as React from "react";
import {
  History,
  Search,
  Filter,
  X,
  Printer,
  RefreshCw,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchTransactions,
  fetchTransactionById,
  setFilters,
  clearSelectedTransaction,
  TransactionItem,
} from "@/store/slices/transactionSlice";

export const CustomerTransactions = () => {
  const dispatch = useAppDispatch();
  const { transactions, selectedTransaction, pagination, filters, isLoading } =
    useAppSelector((state) => state.transaction);

  const [receiptModalOpen, setReceiptModalOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchTransactions(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (key: string, value: string) => {
    dispatch(setFilters({ [key]: value, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setFilters({ page: newPage }));
  };

  const handleOpenDetails = (txn: TransactionItem) => {
    dispatch(fetchTransactionById(txn.id || txn.transactionId));
    setReceiptModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            <History className="h-3.5 w-3.5" />
            <span>Audit Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Transaction History
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Search, filter, and review all settled depository operations with verifiable receipt documentation.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border">
          <Filter className="h-3.5 w-3.5" />
          <span>Search & Filter Criteria</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* Search Box */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by ID, memo, or account..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-input bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="ALL">All Transaction Types</option>
              <option value="TRANSFER">Fund Transfer</option>
              <option value="DEPOSIT">Deposit</option>
              <option value="WITHDRAWAL">Withdrawal</option>
              <option value="LOAN_DISBURSEMENT">Loan Disbursement</option>
              <option value="LOAN_REPAYMENT">Loan Repayment</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="ALL">All Settlement Statuses</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
              <option value="REVERSED">Reversed</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="relative">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
              title="Start Date"
            />
          </div>

          {/* End Date */}
          <div className="relative">
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
              title="End Date"
            />
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h2 className="text-base font-bold text-foreground">Settlement Records</h2>
          <span className="text-xs font-medium text-muted-foreground">
            Showing {transactions.length} of {pagination.total} entries
          </span>
        </div>

        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="h-6 w-6 text-primary animate-spin" />
            <span>Querying verified banking transactions...</span>
          </div>
        ) : transactions.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            <History className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
            <p className="font-semibold text-foreground text-sm">No Transactions Found</p>
            <p className="text-xs mt-1">
              No transactions match the selected filter criteria or no records have been settled yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 text-muted-foreground uppercase font-bold text-[10px] tracking-wider border-b border-border">
                <tr>
                  <th className="py-3 px-3">Transaction ID</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Description</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {transactions.map((t) => (
                  <tr
                    key={t.id || t.transactionId}
                    onClick={() => handleOpenDetails(t)}
                    className="hover:bg-muted/30 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-3 font-mono font-bold text-foreground group-hover:text-primary">
                      {t.transactionId}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-muted text-muted-foreground border border-border uppercase">
                        {t.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-foreground font-medium max-w-xs truncate">
                      {t.description}
                    </td>
                    <td className="py-3.5 px-3 font-extrabold text-foreground">
                      ${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                          t.status === "COMPLETED"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : t.status === "PENDING"
                            ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                            : "bg-destructive/10 text-destructive border-destructive/20"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-muted-foreground">
                      {new Date(t.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold text-primary">
                        Receipt
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-border text-xs">
            <span className="text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page <= 1}
                onClick={() => handlePageChange(pagination.page - 1)}
                className="text-xs h-8"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => handlePageChange(pagination.page + 1)}
                className="text-xs h-8"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Details & Printable Receipt Modal */}
      {receiptModalOpen && selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-6 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase tracking-wide text-foreground">
                  Official Transaction Receipt
                </span>
              </div>
              <button
                onClick={() => {
                  setReceiptModalOpen(false);
                  dispatch(clearSelectedTransaction());
                }}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Receipt Body */}
            <div id="printable-receipt" className="p-6 rounded-xl border border-border/80 bg-muted/20 space-y-4">
              <div className="text-center pb-3 border-b border-border/60">
                <h3 className="text-lg font-black text-foreground">Wishes Bank LTD</h3>
                <p className="text-[11px] text-muted-foreground font-mono">Routing #026009593 • FDIC Insured</p>
                <div className="mt-3">
                  <span className="text-2xl font-black text-foreground">
                    ${selectedTransaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <div className="mt-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                      selectedTransaction.status === "COMPLETED"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : selectedTransaction.status === "PENDING"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                        : selectedTransaction.status === "REVERSED"
                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                        : "bg-destructive/10 text-destructive border-destructive/20"
                    }`}>
                      {selectedTransaction.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs divide-y divide-border/40">
                <div className="flex justify-between pt-1.5">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-mono font-bold text-foreground">{selectedTransaction.transactionId}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-muted-foreground">Reference:</span>
                  <span className="font-mono text-foreground">{selectedTransaction.reference || "N/A"}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-muted-foreground">Transaction Type:</span>
                  <span className="font-bold text-foreground">{selectedTransaction.type}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-muted-foreground">Description:</span>
                  <span className="text-foreground text-right">{selectedTransaction.description}</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-muted-foreground">Settlement Date:</span>
                  <span className="text-foreground">
                    {new Date(selectedTransaction.date).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-muted-foreground">Service Fee:</span>
                  <span className="text-foreground">${(selectedTransaction.fee || 0).toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2 text-center text-[10px] text-muted-foreground border-t border-border/60">
                This document serves as an institutional electronic receipt generated by Wishes Bank LTD.
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="gap-2 text-xs font-semibold"
              >
                <Printer className="h-4 w-4" />
                <span>Print Receipt</span>
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setReceiptModalOpen(false);
                  dispatch(clearSelectedTransaction());
                }}
                className="text-xs font-semibold"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerTransactions;

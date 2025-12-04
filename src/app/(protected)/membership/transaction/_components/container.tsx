"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { Transaction, TransactionStatus } from "../types";
import { DeleteTransactionDialog } from "./dialogs/delete-transaction-dialog";
import { ViewTransactionDialog } from "./dialogs/view-transaction-dialog";
import { FilterTransactionDialog } from "./dialogs/filter-transaction-dialog";

// Mock data - replace with actual API call
const mockTransactions: Transaction[] = [
  {
    id: "1",
    transactionId: "TXN-2025-001",
    userId: "1",
    userName: "Ahmad Budi",
    userEmail: "ahmad.budi@email.com",
    planId: "1",
    planName: "Plan Premium",
    amount: 300000,
    discount: 60000,
    total: 240000,
    paymentMethod: "Bank Transfer",
    status: "completed",
    date: new Date("2025-01-20"),
    createdAt: new Date("2025-01-20"),
    updatedAt: new Date("2025-01-20"),
  },
  {
    id: "2",
    transactionId: "TXN-2025-002",
    userId: "2",
    userName: "Siti Nurhaliza",
    userEmail: "siti.nurhaliza@email.com",
    planId: "1",
    planName: "Plan Basic",
    amount: 100000,
    discount: 20000,
    total: 80000,
    paymentMethod: "E-Wallet",
    status: "pending",
    date: new Date("2025-01-21"),
    createdAt: new Date("2025-01-21"),
    updatedAt: new Date("2025-01-21"),
  },
  {
    id: "3",
    transactionId: "TXN-2025-003",
    userId: "3",
    userName: "Budi Santoso",
    userEmail: "budi.santoso@email.com",
    planId: "2",
    planName: "Plan Premium",
    amount: 300000,
    discount: 0,
    total: 300000,
    paymentMethod: "Credit Card",
    status: "canceled",
    date: new Date("2025-01-19"),
    createdAt: new Date("2025-01-19"),
    updatedAt: new Date("2025-01-19"),
  },
];

export default function TransactionContainer() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<TransactionStatus | null>(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [viewingTransaction, setViewingTransaction] =
    useState<Transaction | null>(null);
  const [deletingTransaction, setDeletingTransaction] =
    useState<Transaction | null>(null);
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);

  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      item.userName.toLowerCase().includes(search.toLowerCase()) ||
      item.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      item.planName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !selectedStatus || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate summary
  const summary = useMemo(() => {
    const totalTransaction = transactions.length;
    const totalSuccess = transactions.filter(
      (t) => t.status === "completed",
    ).length;
    const totalPending = transactions.filter(
      (t) => t.status === "pending",
    ).length;
    const totalCanceled = transactions.filter(
      (t) => t.status === "canceled",
    ).length;
    const totalRevenue = transactions
      .filter((t) => t.status === "completed")
      .reduce((sum, t) => sum + t.total, 0);
    const totalDiscount = transactions
      .filter((t) => t.status === "completed")
      .reduce((sum, t) => sum + t.discount, 0);
    const successRate =
      totalTransaction > 0
        ? ((totalSuccess / totalTransaction) * 100).toFixed(1)
        : "0";
    const canceledRate =
      totalTransaction > 0
        ? ((totalCanceled / totalTransaction) * 100).toFixed(1)
        : "0";

    return {
      totalTransaction,
      totalSuccess,
      totalPending,
      totalCanceled,
      totalRevenue,
      totalDiscount,
      successRate,
      canceledRate,
    };
  }, [transactions]);

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "date",
      header: "Tanggal",
      cell: ({ row }) => {
        const date = row.original.date;
        return date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      },
    },
    {
      accessorKey: "transactionId",
      header: "ID Transaksi",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.transactionId}</div>
      ),
    },
    {
      accessorKey: "userName",
      header: "User",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.userName}</div>
          <div className="text-muted-foreground text-xs">
            {row.original.userEmail}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "planName",
      header: "Plan",
    },
    {
      accessorKey: "amount",
      header: "Jumlah",
      cell: ({ row }) => {
        const amount = row.original.amount;
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);
      },
    },
    {
      accessorKey: "discount",
      header: "Diskon",
      cell: ({ row }) => {
        const discount = row.original.discount;
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(discount);
      },
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => {
        const total = row.original.total;
        return (
          <div className="font-semibold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(total)}
          </div>
        );
      },
    },
    {
      accessorKey: "paymentMethod",
      header: "Metode Pembayaran",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusConfig = {
          completed: {
            label: "Completed",
            className: "bg-green-100 text-green-800",
          },
          pending: {
            label: "Pending",
            className: "bg-yellow-100 text-yellow-800",
          },
          canceled: {
            label: "Canceled",
            className: "bg-red-100 text-red-800",
          },
        };
        const config = statusConfig[status];
        return (
          <span
            className={`rounded-full px-3 py-1 text-xs ${config.className}`}
          >
            {config.label}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewingTransaction(row.original)}
          >
            <Icon icon="lucide:eye" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeletingTransaction(row.original)}
          >
            <Icon icon="lucide:trash" className="text-destructive h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = () => {
    if (!deletingTransaction) return;
    setTransactions(
      transactions.filter((item) => item.id !== deletingTransaction.id),
    );
    setDeletingTransaction(null);
  };

  return (
    <div className="bg-background space-y-6 rounded-lg p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Transaction Management</h1>
        <p className="text-muted-foreground">
          Kelola transaksi dan pembayaran dengan mudah.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Card className="!py-2">
          <div className="flex items-center justify-between p-3">
            <div>
              <p className="text-muted-foreground text-xs">Total Transaction</p>
              <p className="text-lg font-bold">{summary.totalTransaction}</p>
            </div>
            <Icon icon="lucide:receipt" className="h-6 w-6 text-blue-500" />
          </div>
        </Card>

        <Card className="!py-2">
          <div className="flex items-center justify-between p-3">
            <div>
              <p className="text-muted-foreground text-xs">Total Pending</p>
              <p className="text-lg font-bold text-yellow-600">
                {summary.totalPending}
              </p>
            </div>
            <Icon icon="lucide:clock" className="h-6 w-6 text-yellow-500" />
          </div>
        </Card>
        <Card className="!py-2">
          <div className="flex items-center justify-between p-3">
            <div>
              <p className="text-muted-foreground text-xs">Total Sukses</p>
              <p className="text-lg font-bold text-green-600">
                {summary.totalSuccess}
              </p>
            </div>
            <Icon
              icon="lucide:check-circle"
              className="h-6 w-6 text-green-500"
            />
          </div>
        </Card>
        <Card className="!py-2">
          <div className="flex items-center justify-between p-3">
            <div>
              <p className="text-muted-foreground text-xs">Total Canceled</p>
              <p className="text-lg font-bold text-red-600">
                {summary.totalCanceled}
              </p>
            </div>
            <Icon icon="lucide:x-circle" className="h-6 w-6 text-red-500" />
          </div>
        </Card>
        <Card className="!py-2">
          <div className="flex items-center justify-between p-3">
            <div>
              <p className="text-muted-foreground text-xs">Total Revenue</p>
              <p className="text-sm font-bold text-green-600">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(summary.totalRevenue)}
              </p>
            </div>
            <Icon
              icon="lucide:dollar-sign"
              className="h-6 w-6 text-green-500"
            />
          </div>
        </Card>
        <Card className="!py-2">
          <div className="flex items-center justify-between p-3">
            <div>
              <p className="text-muted-foreground text-xs">Total Diskon</p>
              <p className="text-sm font-bold text-blue-600">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(summary.totalDiscount)}
              </p>
            </div>
            <Icon icon="lucide:tag" className="h-6 w-6 text-blue-500" />
          </div>
        </Card>
        <Card className="!py-2">
          <div className="flex items-center justify-between p-3">
            <div>
              <p className="text-muted-foreground text-xs">Success Rate</p>
              <p className="text-lg font-bold text-green-600">
                {summary.successRate}%
              </p>
            </div>
            <Icon
              icon="lucide:trending-up"
              className="h-6 w-6 text-green-500"
            />
          </div>
        </Card>
        <Card className="!py-2">
          <div className="flex items-center justify-between p-3">
            <div>
              <p className="text-muted-foreground text-xs">Canceled Rate</p>
              <p className="text-lg font-bold text-red-600">
                {summary.canceledRate}%
              </p>
            </div>
            <Icon icon="lucide:alert-circle" className="h-6 w-6 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Icon
            icon="lucide:search"
            className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
          />
          <Input
            placeholder="Search by transaction ID, user, plan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setIsFilterDialogOpen(true)}>
          <Icon icon="lucide:filter" className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredTransactions}
        columns={columns}
        rowsPerPage={10}
      />

      {/* Dialogs */}
      <ViewTransactionDialog
        open={!!viewingTransaction}
        onOpenChange={(open) => !open && setViewingTransaction(null)}
        transaction={viewingTransaction}
      />
      <DeleteTransactionDialog
        open={!!deletingTransaction}
        onOpenChange={(open) => !open && setDeletingTransaction(null)}
        transaction={deletingTransaction}
        onConfirm={handleDelete}
      />
      <FilterTransactionDialog
        open={isFilterDialogOpen}
        onOpenChange={setIsFilterDialogOpen}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
    </div>
  );
}

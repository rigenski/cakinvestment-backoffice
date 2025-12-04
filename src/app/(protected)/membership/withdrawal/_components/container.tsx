"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Withdrawal, WithdrawalStatus } from "../types";
import { ViewWithdrawalDialog } from "./dialogs/view-withdrawal-dialog";
import { ApproveWithdrawalDialog } from "./dialogs/approve-withdrawal-dialog";
import { RejectWithdrawalDialog } from "./dialogs/reject-withdrawal-dialog";
import { FilterWithdrawalDialog } from "./dialogs/filter-withdrawal-dialog";

// Mock data - replace with actual API call
const mockWithdrawals: Withdrawal[] = [
  {
    id: "1",
    date: new Date("2025-01-20"),
    userId: "1",
    userName: "Ahmad Budi",
    userEmail: "ahmad.budi@email.com",
    phoneNumber: "081234567890",
    amount: 500000,
    bankType: "BCA",
    accountNumber: "1234567890",
    accountName: "Ahmad Budi",
    status: "pending",
    createdAt: new Date("2025-01-20"),
    updatedAt: new Date("2025-01-20"),
  },
  {
    id: "2",
    date: new Date("2025-01-21"),
    userId: "2",
    userName: "Siti Nurhaliza",
    userEmail: "siti.nurhaliza@email.com",
    phoneNumber: "081987654321",
    amount: 750000,
    bankType: "BNI",
    accountNumber: "0987654321",
    accountName: "Siti Nurhaliza",
    status: "approved",
    paymentProofUrl: "https://example.com/proof1.jpg",
    createdAt: new Date("2025-01-21"),
    updatedAt: new Date("2025-01-21"),
  },
  {
    id: "3",
    date: new Date("2025-01-19"),
    userId: "3",
    userName: "Budi Santoso",
    userEmail: "budi.santoso@email.com",
    phoneNumber: "081112223334",
    amount: 300000,
    bankType: "BRI",
    accountNumber: "1122334455",
    accountName: "Budi Santoso",
    status: "rejected",
    rejectionReason: "Data rekening tidak valid",
    createdAt: new Date("2025-01-19"),
    updatedAt: new Date("2025-01-19"),
  },
];

export default function WithdrawalContainer() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<WithdrawalStatus | null>(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [viewingWithdrawal, setViewingWithdrawal] =
    useState<Withdrawal | null>(null);
  const [approvingWithdrawal, setApprovingWithdrawal] =
    useState<Withdrawal | null>(null);
  const [rejectingWithdrawal, setRejectingWithdrawal] =
    useState<Withdrawal | null>(null);
  const [withdrawals, setWithdrawals] =
    useState<Withdrawal[]>(mockWithdrawals);

  const filteredWithdrawals = withdrawals.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.userName.toLowerCase().includes(search.toLowerCase()) ||
      item.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      item.phoneNumber.toLowerCase().includes(search.toLowerCase()) ||
      item.accountNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !selectedStatus || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const columns: ColumnDef<Withdrawal>[] = [
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
      accessorKey: "phoneNumber",
      header: "No. HP",
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
      accessorKey: "bankType",
      header: "Tipe Bank",
    },
    {
      accessorKey: "accountNumber",
      header: "No. Rekening",
    },
    {
      accessorKey: "accountName",
      header: "Atas Nama",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusConfig = {
          pending: {
            label: "Pending",
            className: "bg-yellow-100 text-yellow-800",
          },
          approved: {
            label: "Approved",
            className: "bg-green-100 text-green-800",
          },
          rejected: {
            label: "Rejected",
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
      cell: ({ row }) => {
        const withdrawal = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewingWithdrawal(withdrawal)}
            >
              <Icon icon="lucide:eye" className="h-4 w-4" />
            </Button>
            {withdrawal.status === "pending" && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setApprovingWithdrawal(withdrawal)}
                  className="text-green-600 hover:text-green-700"
                >
                  <Icon icon="lucide:check" className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRejectingWithdrawal(withdrawal)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Icon icon="lucide:x" className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const handleApprove = (withdrawalId: string, paymentProofUrl: string) => {
    setWithdrawals(
      withdrawals.map((w) =>
        w.id === withdrawalId
          ? { ...w, status: "approved" as WithdrawalStatus, paymentProofUrl }
          : w,
      ),
    );
    setApprovingWithdrawal(null);
  };

  const handleReject = (withdrawalId: string, reason: string) => {
    setWithdrawals(
      withdrawals.map((w) =>
        w.id === withdrawalId
          ? {
              ...w,
              status: "rejected" as WithdrawalStatus,
              rejectionReason: reason,
            }
          : w,
      ),
    );
    setRejectingWithdrawal(null);
  };

  return (
    <div className="bg-background space-y-6 rounded-lg p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Withdrawal Management</h1>
        <p className="text-muted-foreground">
          Kelola permintaan penarikan dana dari user.
        </p>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Icon
            icon="lucide:search"
            className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
          />
          <Input
            placeholder="Search by user, phone, account number..."
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
        data={filteredWithdrawals}
        columns={columns}
        rowsPerPage={10}
      />

      {/* Dialogs */}
      <ViewWithdrawalDialog
        open={!!viewingWithdrawal}
        onOpenChange={(open) => !open && setViewingWithdrawal(null)}
        withdrawal={viewingWithdrawal}
      />
      <ApproveWithdrawalDialog
        open={!!approvingWithdrawal}
        onOpenChange={(open) => !open && setApprovingWithdrawal(null)}
        withdrawal={approvingWithdrawal}
        onConfirm={handleApprove}
      />
      <RejectWithdrawalDialog
        open={!!rejectingWithdrawal}
        onOpenChange={(open) => !open && setRejectingWithdrawal(null)}
        withdrawal={rejectingWithdrawal}
        onConfirm={handleReject}
      />
      <FilterWithdrawalDialog
        open={isFilterDialogOpen}
        onOpenChange={setIsFilterDialogOpen}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
    </div>
  );
}



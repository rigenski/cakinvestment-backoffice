"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Transaction } from "../../types";

interface ViewTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
}

export function ViewTransactionDialog({
  open,
  onOpenChange,
  transaction,
}: ViewTransactionDialogProps) {
  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{transaction.transactionId}</DialogTitle>
          <DialogDescription>Detail informasi transaksi</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Tanggal
                </p>
                <p className="text-sm font-semibold">
                  {transaction.date.toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  ID Transaksi
                </p>
                <p className="text-sm font-semibold">{transaction.transactionId}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  User
                </p>
                <p className="text-sm font-semibold">{transaction.userName}</p>
                <p className="text-muted-foreground text-xs">{transaction.userEmail}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Plan
                </p>
                <p className="text-sm font-semibold">{transaction.planName}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Jumlah
                </p>
                <p className="text-sm font-semibold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(transaction.amount)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Diskon
                </p>
                <p className="text-sm font-semibold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(transaction.discount)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Total
                </p>
                <p className="text-lg font-bold text-green-600">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(transaction.total)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Metode Pembayaran
                </p>
                <p className="text-sm font-semibold">{transaction.paymentMethod}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Status
                </p>
                <div className="mt-1">
                  {transaction.status === "completed" && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">
                      Completed
                    </span>
                  )}
                  {transaction.status === "pending" && (
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-800">
                      Pending
                    </span>
                  )}
                  {transaction.status === "canceled" && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-800">
                      Canceled
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}






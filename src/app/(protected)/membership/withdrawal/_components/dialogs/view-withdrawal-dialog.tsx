"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Withdrawal } from "../../types";

interface ViewWithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  withdrawal: Withdrawal | null;
}

export function ViewWithdrawalDialog({
  open,
  onOpenChange,
  withdrawal,
}: ViewWithdrawalDialogProps) {
  if (!withdrawal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Detail Withdrawal</DialogTitle>
          <DialogDescription>Informasi lengkap permintaan penarikan</DialogDescription>
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
                  {withdrawal.date.toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  User
                </p>
                <p className="text-sm font-semibold">{withdrawal.userName}</p>
                <p className="text-muted-foreground text-xs">
                  {withdrawal.userEmail}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  No. HP
                </p>
                <p className="text-sm font-semibold">{withdrawal.phoneNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Jumlah
                </p>
                <p className="text-sm font-semibold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(withdrawal.amount)}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Tipe Bank
                </p>
                <p className="text-sm font-semibold">{withdrawal.bankType}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  No. Rekening
                </p>
                <p className="text-sm font-semibold">{withdrawal.accountNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Atas Nama
                </p>
                <p className="text-sm font-semibold">{withdrawal.accountName}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Status
                </p>
                <div className="mt-1">
                  {withdrawal.status === "pending" && (
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-800">
                      Pending
                    </span>
                  )}
                  {withdrawal.status === "approved" && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">
                      Approved
                    </span>
                  )}
                  {withdrawal.status === "rejected" && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-800">
                      Rejected
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {withdrawal.rejectionReason && (
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Alasan Penolakan
              </p>
              <p className="text-sm font-semibold text-red-600">
                {withdrawal.rejectionReason}
              </p>
            </div>
          )}

          {withdrawal.paymentProofUrl && (
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-2">
                Bukti Pembayaran
              </p>
              <img
                src={withdrawal.paymentProofUrl}
                alt="Bukti Pembayaran"
                className="rounded-lg border max-w-md"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}











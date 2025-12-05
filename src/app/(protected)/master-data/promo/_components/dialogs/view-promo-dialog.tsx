"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Promo } from "../../types";

interface ViewPromoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promo: Promo | null;
}

export function ViewPromoDialog({
  open,
  onOpenChange,
  promo,
}: ViewPromoDialogProps) {
  if (!promo) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{promo.code}</DialogTitle>
          <DialogDescription>Detail informasi kode promo</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Tipe Diskon
              </p>
              <p className="text-sm">
                {promo.discountType === "percentage" ? "Percentage (%)" : "Fixed Amount"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Diskon
              </p>
              <p className="text-sm">
                {promo.discountType === "percentage"
                  ? `${promo.discount}%`
                  : new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(promo.discount)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Min. Pembelian
              </p>
              <p className="text-sm">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(promo.minPurchase)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Max. Diskon
              </p>
              <p className="text-sm">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(promo.maxDiscount)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Valid From
              </p>
              <p className="text-sm">
                {promo.validFrom.toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Valid Until
              </p>
              <p className="text-sm">
                {promo.validUntil.toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Usage Limit
              </p>
              <p className="text-sm">{promo.usageLimit}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Last Updated
              </p>
              <p className="text-sm">
                {promo.updatedAt.toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}









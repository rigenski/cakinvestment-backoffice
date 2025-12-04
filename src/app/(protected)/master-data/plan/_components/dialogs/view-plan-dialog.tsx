"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plan } from "../../types";

interface ViewPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: Plan | null;
}

export function ViewPlanDialog({
  open,
  onOpenChange,
  plan,
}: ViewPlanDialogProps) {
  if (!plan) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{plan.title}</DialogTitle>
          <DialogDescription>Detail informasi paket langganan</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground mb-2 text-sm font-medium">
              Deskripsi
            </p>
            <p className="text-sm">{plan.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Durasi
              </p>
              <p className="text-sm">{plan.duration} bulan</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Harga Awal
              </p>
              <p className="text-sm">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(plan.originalPrice)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Harga Discount
              </p>
              <p className="text-sm">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(plan.discountPrice)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Rekomendasi
              </p>
              <p className="text-sm">
                {plan.isRecommended ? (
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                    Ya
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">
                    Tidak
                  </span>
                )}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Status
              </p>
              <p className="text-sm">
                {plan.status === "active" ? (
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                    Active
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                    Inactive
                  </span>
                )}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Last Updated
              </p>
              <p className="text-sm">
                {plan.updatedAt.toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground mb-2 text-sm font-medium">
              List Fitur
            </p>
            <ul className="list-disc list-inside space-y-1">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-sm">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


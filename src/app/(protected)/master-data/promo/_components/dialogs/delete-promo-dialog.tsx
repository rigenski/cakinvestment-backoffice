"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Promo } from "../../types";

interface DeletePromoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promo: Promo | null;
  onConfirm: () => void;
}

export function DeletePromoDialog({
  open,
  onOpenChange,
  promo,
  onConfirm,
}: DeletePromoDialogProps) {
  if (!promo) return null;

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Promo</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus promo "{promo.code}"? Tindakan
            ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


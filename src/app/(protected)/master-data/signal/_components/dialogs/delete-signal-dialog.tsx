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
import { Signal } from "../../types";

interface DeleteSignalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  signal: Signal | null;
  onConfirm: () => void;
}

export function DeleteSignalDialog({
  open,
  onOpenChange,
  signal,
  onConfirm,
}: DeleteSignalDialogProps) {
  if (!signal) return null;

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Signal</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus sinyal "{signal.emitenCode} - {signal.emitenName}"? Tindakan
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





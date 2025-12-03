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
import { News } from "../../types";

interface DeleteNewsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  news: News | null;
  onConfirm: () => void;
}

export function DeleteNewsDialog({
  open,
  onOpenChange,
  news,
  onConfirm,
}: DeleteNewsDialogProps) {
  if (!news) return null;

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete News</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus berita "{news.title}"? Tindakan
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


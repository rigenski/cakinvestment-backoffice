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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TransactionStatus } from "../../types";

interface FilterTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStatus: TransactionStatus | null;
  onStatusChange: (status: TransactionStatus | null) => void;
}

export function FilterTransactionDialog({
  open,
  onOpenChange,
  selectedStatus,
  onStatusChange,
}: FilterTransactionDialogProps) {
  const handleClear = () => {
    onStatusChange(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Transaction</DialogTitle>
          <DialogDescription>
            Filter transaksi berdasarkan status
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={selectedStatus || "all"}
              onValueChange={(value) =>
                onStatusChange(value === "all" ? null : (value as TransactionStatus))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClear}>
            Clear Filter
          </Button>
          <Button variant="default" onClick={() => onOpenChange(false)}>
            Apply Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}






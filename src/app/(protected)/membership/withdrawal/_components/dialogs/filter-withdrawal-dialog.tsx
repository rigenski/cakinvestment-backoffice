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
import { WithdrawalStatus } from "../../types";

interface FilterWithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStatus: WithdrawalStatus | null;
  onStatusChange: (status: WithdrawalStatus | null) => void;
}

export function FilterWithdrawalDialog({
  open,
  onOpenChange,
  selectedStatus,
  onStatusChange,
}: FilterWithdrawalDialogProps) {
  const handleClear = () => {
    onStatusChange(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Withdrawal</DialogTitle>
          <DialogDescription>
            Filter withdrawal berdasarkan status
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={selectedStatus || "all"}
              onValueChange={(value) =>
                onStatusChange(value === "all" ? null : (value as WithdrawalStatus))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
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




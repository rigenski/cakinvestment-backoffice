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
import { MemberType, ParticipantStatus } from "../../types";

interface FilterParticipantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMemberType: MemberType | null;
  selectedStatus: ParticipantStatus | null;
  onMemberTypeChange: (memberType: MemberType | null) => void;
  onStatusChange: (status: ParticipantStatus | null) => void;
}

export function FilterParticipantDialog({
  open,
  onOpenChange,
  selectedMemberType,
  selectedStatus,
  onMemberTypeChange,
  onStatusChange,
}: FilterParticipantDialogProps) {
  const handleClear = () => {
    onMemberTypeChange(null);
    onStatusChange(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Participant</DialogTitle>
          <DialogDescription>
            Filter participant berdasarkan tipe member dan status
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="memberType">Tipe Member</Label>
            <Select
              value={selectedMemberType || "all"}
              onValueChange={(value) =>
                onMemberTypeChange(value === "all" ? null : (value as MemberType))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih tipe member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe Member</SelectItem>
                <SelectItem value="Active Member">Active Member</SelectItem>
                <SelectItem value="Member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={selectedStatus || "all"}
              onValueChange={(value) =>
                onStatusChange(value === "all" ? null : (value as ParticipantStatus))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
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


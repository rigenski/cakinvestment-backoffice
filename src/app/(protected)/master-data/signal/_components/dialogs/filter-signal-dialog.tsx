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

interface FilterSignalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
}

export function FilterSignalDialog({
  open,
  onOpenChange,
  selectedType,
  onTypeChange,
}: FilterSignalDialogProps) {
  const handleClear = () => {
    onTypeChange(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Signal</DialogTitle>
          <DialogDescription>
            Filter sinyal berdasarkan type
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={selectedType || "all"}
              onValueChange={(value) =>
                onTypeChange(value === "all" ? null : value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Type</SelectItem>
                <SelectItem value="short term">Short Term</SelectItem>
                <SelectItem value="swing">Swing</SelectItem>
                <SelectItem value="long term">Long Term</SelectItem>
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


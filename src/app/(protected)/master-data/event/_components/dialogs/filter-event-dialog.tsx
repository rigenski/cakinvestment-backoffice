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

interface FilterEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function FilterEventDialog({
  open,
  onOpenChange,
  selectedCategory,
  onCategoryChange,
}: FilterEventDialogProps) {
  const handleClear = () => {
    onCategoryChange(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Event</DialogTitle>
          <DialogDescription>
            Filter event berdasarkan kategori
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select
              value={selectedCategory || "all"}
              onValueChange={(value) =>
                onCategoryChange(value === "all" ? null : value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="gratis">Gratis</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
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


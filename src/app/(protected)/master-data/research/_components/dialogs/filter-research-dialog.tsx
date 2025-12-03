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

interface FilterResearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function FilterResearchDialog({
  open,
  onOpenChange,
  selectedCategory,
  onCategoryChange,
}: FilterResearchDialogProps) {
  const handleClear = () => {
    onCategoryChange(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Research</DialogTitle>
          <DialogDescription>
            Filter penelitian berdasarkan kategori
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
                <SelectItem value="Sektor Perbankan">
                  Sektor Perbankan
                </SelectItem>
                <SelectItem value="Sektor Teknologi">
                  Sektor Teknologi
                </SelectItem>
                <SelectItem value="Market Overview">Market Overview</SelectItem>
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


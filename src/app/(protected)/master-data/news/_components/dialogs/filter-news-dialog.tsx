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
import { NewsCategory } from "../../types";

interface FilterNewsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function FilterNewsDialog({
  open,
  onOpenChange,
  selectedCategory,
  onCategoryChange,
}: FilterNewsDialogProps) {
  const handleClear = () => {
    onCategoryChange(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter News</DialogTitle>
          <DialogDescription>
            Filter berita berdasarkan kategori
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
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="Market Update">Market Update</SelectItem>
                <SelectItem value="Analisis">Analisis</SelectItem>
                <SelectItem value="Tips & Trick">Tips & Trick</SelectItem>
                <SelectItem value="Lainya">Lainya</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClear}>
            Clear Filter
          </Button>
          <Button variant="gradient" onClick={() => onOpenChange(false)}>
            Apply Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


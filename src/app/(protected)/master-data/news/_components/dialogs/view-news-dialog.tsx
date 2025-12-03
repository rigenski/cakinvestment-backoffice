"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { News } from "../../types";

interface ViewNewsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  news: News | null;
}

export function ViewNewsDialog({
  open,
  onOpenChange,
  news,
}: ViewNewsDialogProps) {
  if (!news) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{news.title}</DialogTitle>
          <DialogDescription>Detail informasi berita</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Kategori
              </p>
              <p className="text-sm">{news.category}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Author
              </p>
              <p className="text-sm">{news.author}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Tanggal
              </p>
              <p className="text-sm">
                {news.date.toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Last Updated
              </p>
              <p className="text-sm">
                {news.updatedAt.toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground mb-2 text-sm font-medium">
              Banner
            </p>
            {news.banner && (
              <img
                src={news.banner}
                alt={news.title}
                className="mb-4 h-64 max-w-full rounded-lg border object-cover"
              />
            )}
          </div>
          <div>
            <p className="text-muted-foreground mb-2 text-sm font-medium">
              Konten
            </p>
            <div
              className="prose prose-sm max-w-none rounded-lg border p-4"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Research } from "../../types";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

interface ViewResearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  research: Research | null;
}

export function ViewResearchDialog({
  open,
  onOpenChange,
  research,
}: ViewResearchDialogProps) {
  if (!research) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{research.title}</DialogTitle>
          <DialogDescription>Detail informasi penelitian</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Subtitle</p>
            <p className="text-sm">{research.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Kategori
              </p>
              <p className="text-sm">{research.category}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Author
              </p>
              <p className="text-sm">{research.author}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Tanggal
              </p>
              <p className="text-sm">
                {research.date.toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Last Updated
              </p>
              <p className="text-sm">
                {research.updatedAt.toLocaleDateString("id-ID", {
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
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Dokumen
            </p>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:file" className="h-5 w-5 text-muted-foreground" />
              <a
                href={research.document}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {research.document}
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(research.document, "_blank")}
              >
                <Icon icon="lucide:download" className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


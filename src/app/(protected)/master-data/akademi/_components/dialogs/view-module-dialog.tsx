"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Module } from "../../types";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

interface ViewModuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  module: Module | null;
}

export function ViewModuleDialog({
  open,
  onOpenChange,
  module,
}: ViewModuleDialogProps) {
  if (!module) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{module.title}</DialogTitle>
          <DialogDescription>Detail informasi modul pembelajaran</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Pengajar
              </p>
              <p className="text-sm">{module.instructor}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Kategori
              </p>
              <p className="text-sm">{module.category}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Durasi
              </p>
              <p className="text-sm">{module.duration}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Video
              </p>
              <p className="text-sm">{module.totalVideo} video</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Last Updated
              </p>
              <p className="text-sm">
                {module.updatedAt.toLocaleDateString("id-ID", {
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
              Deskripsi
            </p>
            <div
              className="prose prose-sm max-w-none rounded-lg border p-4"
              dangerouslySetInnerHTML={{ __html: module.description }}
            />
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Video ({module.videos.length})
            </p>
            <div className="space-y-2">
              {module.videos.map((video, index) => (
                <div
                  key={video.id || index}
                  className="border rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="font-medium">{video.title}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon icon="lucide:clock" className="h-4 w-4" />
                        {video.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon icon="lucide:link" className="h-4 w-4" />
                        <a
                          href={video.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Buka Video
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


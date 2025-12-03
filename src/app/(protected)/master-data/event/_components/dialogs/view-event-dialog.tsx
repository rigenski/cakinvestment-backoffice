"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Event } from "../../types";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

interface ViewEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: Event | null;
}

export function ViewEventDialog({
  open,
  onOpenChange,
  event,
}: ViewEventDialogProps) {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>Detail informasi event</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Pembicara
              </p>
              <p className="text-sm">{event.speaker}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Kategori
              </p>
              <p className="text-sm capitalize">
                {event.category === "gratis" ? "Gratis" : "Premium"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Tanggal
              </p>
              <p className="text-sm">
                {event.date.toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Waktu
              </p>
              <p className="text-sm">{event.time}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Last Updated
              </p>
              <p className="text-sm">
                {event.updatedAt.toLocaleDateString("id-ID", {
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
              Link Registrasi
            </p>
            <div className="flex items-center gap-2">
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {event.registrationLink}
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(event.registrationLink, "_blank")}
              >
                <Icon icon="lucide:external-link" className="h-4 w-4 mr-2" />
                Buka Link
              </Button>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Banner
            </p>
            <img
              src={event.banner}
              alt={event.title}
              className="max-w-full h-64 object-cover rounded-lg border"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Deskripsi
            </p>
            <p className="text-sm whitespace-pre-wrap">{event.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Participant } from "../../types";

interface ViewParticipantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participant: Participant | null;
}

export function ViewParticipantDialog({
  open,
  onOpenChange,
  participant,
}: ViewParticipantDialogProps) {
  if (!participant) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{participant.name}</DialogTitle>
          <DialogDescription>Detail informasi participant</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Nama
                </p>
                <p className="text-sm font-semibold">{participant.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  WhatsApp
                </p>
                <p className="text-sm font-semibold">{participant.whatsapp}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Range Penghasilan
                </p>
                <p className="text-sm font-semibold">{participant.incomeRange}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Tanggal Terdaftar
                </p>
                <p className="text-sm font-semibold">
                  {participant.registrationDate.toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Tipe Member
                </p>
                <div className="mt-1">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800">
                    {participant.memberType}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Email
                </p>
                <p className="text-sm font-semibold">{participant.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Umur
                </p>
                <p className="text-sm font-semibold">{participant.age} tahun</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Status
                </p>
                <div className="mt-1">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">
                    {participant.status}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Last Login
                </p>
                <p className="text-sm font-semibold">
                  {participant.lastLogin.toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


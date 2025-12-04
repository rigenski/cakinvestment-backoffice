"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Signal } from "../../types";

interface ViewSignalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  signal: Signal | null;
}

export function ViewSignalDialog({
  open,
  onOpenChange,
  signal,
}: ViewSignalDialogProps) {
  if (!signal) return null;

  const getTps = () => {
    const tps = [];
    if (signal.tp1 !== undefined) tps.push({ label: "TP 1", value: signal.tp1 });
    if (signal.tp2 !== undefined) tps.push({ label: "TP 2", value: signal.tp2 });
    if (signal.tp3 !== undefined) tps.push({ label: "TP 3", value: signal.tp3 });
    if (signal.tp4 !== undefined) tps.push({ label: "TP 4", value: signal.tp4 });
    if (signal.tp5 !== undefined) tps.push({ label: "TP 5", value: signal.tp5 });
    return tps;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {signal.emitenCode} - {signal.emitenName}
          </DialogTitle>
          <DialogDescription>Detail informasi sinyal investasi</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Kode Emiten
              </p>
              <p className="text-sm">{signal.emitenCode}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Nama Emiten
              </p>
              <p className="text-sm">{signal.emitenName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Type</p>
              <p className="text-sm capitalize">
                {signal.type === "short term"
                  ? "Short Term"
                  : signal.type === "swing"
                    ? "Swing"
                    : "Long Term"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Last Updated
              </p>
              <p className="text-sm">
                {signal.updatedAt.toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Short Term Details */}
          {signal.type === "short term" && (
            <div className="grid grid-cols-2 gap-4">
              {signal.stopLoss !== undefined && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Stop Loss
                  </p>
                  <p className="text-sm">{signal.stopLoss.toLocaleString("id-ID")}</p>
                </div>
              )}
              {signal.takeProfit !== undefined && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Take Profit
                  </p>
                  <p className="text-sm">
                    {signal.takeProfit.toLocaleString("id-ID")}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Swing Details */}
          {signal.type === "swing" && (
            <div className="space-y-4">
              {signal.stopLoss !== undefined && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Stop Loss
                  </p>
                  <p className="text-sm">{signal.stopLoss.toLocaleString("id-ID")}</p>
                </div>
              )}
              {getTps().length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Take Profit
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {getTps().map((tp) => (
                      <div key={tp.label}>
                        <p className="text-sm font-medium text-muted-foreground">
                          {tp.label}
                        </p>
                        <p className="text-sm">{tp.value.toLocaleString("id-ID")}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Long Term Details */}
          {signal.type === "long term" && (
            <div>
              {signal.target !== undefined && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Target
                  </p>
                  <p className="text-sm">{signal.target.toLocaleString("id-ID")}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}





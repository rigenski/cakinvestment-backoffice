"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Withdrawal } from "../../types";
import { Icon } from "@iconify/react";

const rejectFormSchema = z.object({
  reason: z.string().min(1, "Alasan penolakan harus diisi"),
});

interface RejectWithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  withdrawal: Withdrawal | null;
  onConfirm: (withdrawalId: string, reason: string) => void;
}

export function RejectWithdrawalDialog({
  open,
  onOpenChange,
  withdrawal,
  onConfirm,
}: RejectWithdrawalDialogProps) {
  const form = useForm<z.infer<typeof rejectFormSchema>>({
    resolver: zodResolver(rejectFormSchema),
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = (data: z.infer<typeof rejectFormSchema>) => {
    if (!withdrawal) return;
    onConfirm(withdrawal.id, data.reason);
    form.reset();
  };

  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  if (!withdrawal) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Withdrawal</DialogTitle>
          <DialogDescription>
            Masukkan alasan penolakan untuk permintaan penarikan dari{" "}
            <strong>{withdrawal.userName}</strong> sebesar{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(withdrawal.amount)}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alasan Penolakan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan alasan penolakan..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="destructive">
                <Icon icon="lucide:x" className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}





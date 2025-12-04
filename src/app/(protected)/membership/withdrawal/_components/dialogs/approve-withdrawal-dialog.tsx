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
import { Input } from "@/components/ui/input";
import { Withdrawal } from "../../types";
import { useState } from "react";
import { Icon } from "@iconify/react";

const approveFormSchema = z.object({
  paymentProof: z
    .instanceof(File, { message: "Bukti pembayaran harus diupload" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Ukuran file maksimal 5MB",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type,
        ),
      { message: "File harus berupa gambar (JPEG, PNG, atau WebP)" },
    ),
});

interface ApproveWithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  withdrawal: Withdrawal | null;
  onConfirm: (withdrawalId: string, paymentProofUrl: string) => void;
}

export function ApproveWithdrawalDialog({
  open,
  onOpenChange,
  withdrawal,
  onConfirm,
}: ApproveWithdrawalDialogProps) {
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  const form = useForm<z.infer<typeof approveFormSchema>>({
    resolver: zodResolver(approveFormSchema),
    defaultValues: {
      paymentProof: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof approveFormSchema>) => {
    if (!withdrawal) return;

    // In a real app, you would upload the file to a server and get the URL
    // For now, we'll use a mock URL
    const mockPaymentProofUrl = paymentProof
      ? URL.createObjectURL(paymentProof)
      : "https://example.com/payment-proof.jpg";
    onConfirm(withdrawal.id, mockPaymentProofUrl);
    form.reset();
    setPaymentProof(null);
  };

  const handleClose = () => {
    form.reset();
    setPaymentProof(null);
    onOpenChange(false);
  };

  if (!withdrawal) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Withdrawal</DialogTitle>
          <DialogDescription>
            Upload bukti pembayaran untuk menyetujui permintaan penarikan dari{" "}
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
              name="paymentProof"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Bukti Pembayaran</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setPaymentProof(file);
                            onChange(file);
                          }
                        }}
                        className="cursor-pointer"
                        {...field}
                      />
                      {paymentProof && (
                        <div className="mt-2">
                          <p className="text-muted-foreground mb-2 text-sm">
                            Preview:
                          </p>
                          <img
                            src={URL.createObjectURL(paymentProof)}
                            alt="Preview"
                            className="rounded-lg border max-w-xs"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Icon icon="lucide:check" className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Promo } from "../../types";
import { useEffect } from "react";

const promoFormSchema = z.object({
  code: z.string().min(1, "Kode promo harus diisi"),
  discountType: z.enum(["percentage", "fixed"]),
  discount: z.number().min(0, "Diskon harus diisi"),
  minPurchase: z.number().min(0, "Min. pembelian tidak boleh negatif").optional(),
  maxDiscount: z.number().min(0, "Max. diskon tidak boleh negatif").optional(),
  validFrom: z.string().min(1, "Valid from harus diisi"),
  validUntil: z.string().min(1, "Valid until harus diisi"),
  usageLimit: z.number().min(1, "Usage limit harus diisi"),
});

interface EditPromoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promo: Promo | null;
  onSubmit: (data: Omit<Promo, "id" | "createdAt">) => void;
}

export function EditPromoDialog({
  open,
  onOpenChange,
  promo,
  onSubmit,
}: EditPromoDialogProps) {
  const form = useForm<z.infer<typeof promoFormSchema>>({
    resolver: zodResolver(promoFormSchema),
    defaultValues: {
      code: "",
      discountType: "percentage",
      discount: 0,
      minPurchase: 0,
      maxDiscount: 0,
      validFrom: "",
      validUntil: "",
      usageLimit: 0,
    },
  });

  useEffect(() => {
    if (promo) {
      // Format datetime for datetime-local input (YYYY-MM-DDTHH:mm)
      const formatDateTime = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };

      form.reset({
        code: promo.code,
        discountType: promo.discountType,
        discount: promo.discount,
        minPurchase: promo.minPurchase,
        maxDiscount: promo.maxDiscount,
        validFrom: formatDateTime(promo.validFrom),
        validUntil: formatDateTime(promo.validUntil),
        usageLimit: promo.usageLimit,
      });
    }
  }, [promo, form]);

  const onOpenChangeHandler = (v: boolean) => {
    onOpenChange(v);
    if (!v && promo) {
      const formatDateTime = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };
      form.reset({
        code: promo.code,
        discountType: promo.discountType,
        discount: promo.discount,
        minPurchase: promo.minPurchase,
        maxDiscount: promo.maxDiscount,
        validFrom: formatDateTime(promo.validFrom),
        validUntil: formatDateTime(promo.validUntil),
        usageLimit: promo.usageLimit,
      });
    }
  };

  const onFormSubmit = (data: z.infer<typeof promoFormSchema>) => {
    onSubmit({
      code: data.code,
      discountType: data.discountType,
      discount: data.discount,
      minPurchase: data.minPurchase || 0,
      maxDiscount: data.maxDiscount || 0,
      validFrom: new Date(data.validFrom),
      validUntil: new Date(data.validUntil),
      usageLimit: data.usageLimit,
      updatedAt: new Date(),
    });
    onOpenChangeHandler(false);
  };

  if (!promo) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Promo</DialogTitle>
          <DialogDescription>Edit kode promo yang sudah ada.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-4"
          >
            <div className="flex flex-col gap-4">
              {/* Kode Promo */}
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Kode Promo<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan kode promo"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                {/* Tipe Diskon */}
                <FormField
                  control={form.control}
                  name="discountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Tipe Diskon<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih tipe diskon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">Percentage (%)</SelectItem>
                            <SelectItem value="fixed">Fixed Amount</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Diskon */}
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Diskon<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="Masukkan nilai diskon"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Min. Pembelian */}
                <FormField
                  control={form.control}
                  name="minPurchase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min. Pembelian</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Max. Diskon */}
                <FormField
                  control={form.control}
                  name="maxDiscount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max. Diskon</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Valid From */}
                <FormField
                  control={form.control}
                  name="validFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Valid From<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Valid Until */}
                <FormField
                  control={form.control}
                  name="validUntil"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Valid Until<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Usage Limit */}
              <FormField
                control={form.control}
                name="usageLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Usage Limit<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="Masukkan batas penggunaan"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChangeHandler(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  Update Promo
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


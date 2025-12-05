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
import { PromoFormData } from "../../types";

const promoFormSchema = z.object({
  code: z.string().min(1, "Kode promo harus diisi"),
  discountType: z.enum(["percentage", "fixed"]),
  discount: z.number().min(0, "Diskon harus diisi"),
  minPurchase: z.number().min(0, "Min. pembelian tidak boleh negatif").optional(),
  maxDiscount: z.number().min(0, "Max. diskon tidak boleh negatif").optional(),
  validFrom: z.string().min(1, "Valid from harus diisi"),
  validUntil: z.string().min(1, "Valid until harus diisi"),
  usageLimit: z.number().min(1, "Usage limit harus diisi"),
}).refine(
  (data) => {
    if (data.discountType === "percentage" && data.discount > 100) {
      return false;
    }
    return true;
  },
  {
    message: "Diskon tidak boleh lebih dari 100%",
    path: ["discount"],
  }
);

interface CreatePromoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PromoFormData) => void;
}

export function CreatePromoDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreatePromoDialogProps) {
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

  const onOpenChangeHandler = (v: boolean) => {
    onOpenChange(v);
    if (!v) {
      form.reset();
    }
  };

  const onFormSubmit = (data: z.infer<typeof promoFormSchema>) => {
    // Convert datetime-local format to ISO string
    const formatToISO = (datetimeLocal: string) => {
      // datetime-local format: YYYY-MM-DDTHH:mm
      // Convert to ISO format: YYYY-MM-DDTHH:mm:ss.sssZ
      return new Date(datetimeLocal).toISOString();
    };

    onSubmit({
      code: data.code,
      discountType: data.discountType,
      discount: data.discount,
      minPurchase: data.minPurchase || 0,
      maxDiscount: data.maxDiscount || 0,
      validFrom: formatToISO(data.validFrom),
      validUntil: formatToISO(data.validUntil),
      usageLimit: data.usageLimit,
    });
    onOpenChangeHandler(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create Promo</DialogTitle>
          <DialogDescription>
            Tambahkan kode promo baru ke sistem.
          </DialogDescription>
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
                          max={form.watch("discountType") === "percentage" ? 100 : undefined}
                          placeholder="Masukkan nilai diskon"
                          {...field}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            if (form.watch("discountType") === "percentage" && val > 100) {
                              field.onChange(100);
                            } else {
                              field.onChange(val || 0);
                            }
                          }}
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
                  Create Promo
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


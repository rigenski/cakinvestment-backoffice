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
import { SignalFormData, SignalType } from "../../types";
import { useState } from "react";
import { Icon } from "@iconify/react";

const signalFormSchema = z.object({
  emitenCode: z.string().min(1, "Kode emiten harus diisi"),
  emitenName: z.string().min(1, "Nama emiten harus diisi"),
  type: z.enum(["short term", "swing", "long term"]),
  stopLoss: z.number().optional(),
  takeProfit: z.number().optional(),
  tp1: z.number().optional(),
  tp2: z.number().optional(),
  tp3: z.number().optional(),
  tp4: z.number().optional(),
  tp5: z.number().optional(),
  target: z.number().optional(),
});

interface CreateSignalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SignalFormData) => void;
}

export function CreateSignalDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateSignalDialogProps) {
  const [tpCount, setTpCount] = useState(3);

  const form = useForm<z.infer<typeof signalFormSchema>>({
    resolver: zodResolver(signalFormSchema),
    defaultValues: {
      emitenCode: "",
      emitenName: "",
      type: "short term",
      stopLoss: undefined,
      takeProfit: undefined,
      tp1: undefined,
      tp2: undefined,
      tp3: undefined,
      tp4: undefined,
      tp5: undefined,
      target: undefined,
    },
  });

  const signalType = form.watch("type");

  const onOpenChangeHandler = (v: boolean) => {
    onOpenChange(v);
    if (!v) {
      form.reset();
      setTpCount(3);
    }
  };

  const onFormSubmit = (data: z.infer<typeof signalFormSchema>) => {
    // Validate based on type
    if (data.type === "short term") {
      if (!data.stopLoss || !data.takeProfit) {
        if (!data.stopLoss) {
          form.setError("stopLoss", { message: "Stop Loss harus diisi" });
        }
        if (!data.takeProfit) {
          form.setError("takeProfit", { message: "Take Profit harus diisi" });
        }
        return;
      }
    } else if (data.type === "swing") {
      if (!data.stopLoss) {
        form.setError("stopLoss", { message: "Stop Loss harus diisi" });
        return;
      }
      const hasTp = [data.tp1, data.tp2, data.tp3, data.tp4, data.tp5].some(
        (tp) => tp !== undefined,
      );
      if (!hasTp) {
        form.setError("tp1", { message: "Minimal satu TP harus diisi" });
        return;
      }
    } else if (data.type === "long term") {
      if (!data.target) {
        form.setError("target", { message: "Target harus diisi" });
        return;
      }
    }

    onSubmit({
      emitenCode: data.emitenCode,
      emitenName: data.emitenName,
      type: data.type,
      stopLoss: data.stopLoss,
      takeProfit: data.takeProfit,
      tp1: data.tp1,
      tp2: data.tp2,
      tp3: data.tp3,
      tp4: data.tp4,
      tp5: data.tp5,
      target: data.target,
    });
    onOpenChangeHandler(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create Signal</DialogTitle>
          <DialogDescription>
            Tambahkan sinyal investasi baru ke sistem.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-4"
          >
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Emiten Code */}
                <FormField
                  control={form.control}
                  name="emitenCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Kode Emiten<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan kode emiten"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Emiten Name */}
                <FormField
                  control={form.control}
                  name="emitenName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nama Emiten<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama emiten"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Type<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          // Reset conditional fields when type changes
                          form.setValue("stopLoss", undefined);
                          form.setValue("takeProfit", undefined);
                          form.setValue("tp1", undefined);
                          form.setValue("tp2", undefined);
                          form.setValue("tp3", undefined);
                          form.setValue("tp4", undefined);
                          form.setValue("tp5", undefined);
                          form.setValue("target", undefined);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short term">Short Term</SelectItem>
                          <SelectItem value="swing">Swing</SelectItem>
                          <SelectItem value="long term">Long Term</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Short Term Fields */}
              {signalType === "short term" && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="stopLoss"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Stop Loss<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Masukkan stop loss"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseFloat(e.target.value)
                                  : undefined,
                              )
                            }
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="takeProfit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Take Profit<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Masukkan take profit"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseFloat(e.target.value)
                                  : undefined,
                              )
                            }
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Swing Fields */}
              {signalType === "swing" && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="stopLoss"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Stop Loss<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Masukkan stop loss"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseFloat(e.target.value)
                                  : undefined,
                              )
                            }
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-between">
                    <FormLabel>Take Profit</FormLabel>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setTpCount(Math.max(1, tpCount - 1))}
                      >
                        <Icon icon="lucide:minus" className="h-4 w-4" />
                      </Button>
                      <span className="text-sm">{tpCount} TP</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setTpCount(Math.min(5, tpCount + 1))}
                        disabled={tpCount >= 5}
                      >
                        <Icon icon="lucide:plus" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: Math.min(tpCount, 5) }, (_, i) => {
                      const tpKey = `tp${i + 1}` as
                        | "tp1"
                        | "tp2"
                        | "tp3"
                        | "tp4"
                        | "tp5";
                      return (
                        <FormField
                          key={i}
                          control={form.control}
                          name={tpKey}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                TP {i + 1}
                                {i === 0 && (
                                  <span className="text-red-500">*</span>
                                )}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder={`Masukkan TP ${i + 1}`}
                                  value={field.value || ""}
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.value
                                        ? parseFloat(e.target.value)
                                        : undefined,
                                    )
                                  }
                                  required={i === 0}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Long Term Fields */}
              {signalType === "long term" && (
                <FormField
                  control={form.control}
                  name="target"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Target<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Masukkan target"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                            )
                          }
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

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
                  Create Signal
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


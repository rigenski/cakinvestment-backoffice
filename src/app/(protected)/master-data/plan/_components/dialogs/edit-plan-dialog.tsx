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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plan, PlanFormData } from "../../types";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const planFormSchema = z.object({
  title: z.string().min(1, "Judul harus diisi"),
  description: z.string().min(1, "Deskripsi harus diisi"),
  duration: z.number().min(1, "Durasi harus minimal 1 bulan"),
  originalPrice: z.number().min(0, "Harga awal harus diisi"),
  discountPrice: z.number().min(0, "Harga discount harus diisi"),
  features: z.array(z.string().min(1, "Fitur tidak boleh kosong")).min(1, "Minimal harus ada 1 fitur"),
  isRecommended: z.boolean(),
  status: z.enum(["active", "inactive"]),
});

interface EditPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: Plan | null;
  onSubmit: (data: Omit<Plan, "id" | "createdAt">) => void;
}

export function EditPlanDialog({
  open,
  onOpenChange,
  plan,
  onSubmit,
}: EditPlanDialogProps) {
  const [features, setFeatures] = useState<string[]>([""]);

  const form = useForm<z.infer<typeof planFormSchema>>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 1,
      originalPrice: 0,
      discountPrice: 0,
      features: [""],
      isRecommended: false,
      status: "active",
    },
  });

  useEffect(() => {
    if (plan) {
      form.reset({
        title: plan.title,
        description: plan.description,
        duration: plan.duration,
        originalPrice: plan.originalPrice,
        discountPrice: plan.discountPrice,
        features: plan.features.length > 0 ? plan.features : [""],
        isRecommended: plan.isRecommended,
        status: plan.status,
      });
      setFeatures(plan.features.length > 0 ? plan.features : [""]);
    }
  }, [plan, form]);

  const onOpenChangeHandler = (v: boolean) => {
    onOpenChange(v);
    if (!v && plan) {
      form.reset({
        title: plan.title,
        description: plan.description,
        duration: plan.duration,
        originalPrice: plan.originalPrice,
        discountPrice: plan.discountPrice,
        features: plan.features,
        isRecommended: plan.isRecommended,
        status: plan.status,
      });
      setFeatures(plan.features);
    }
  };

  const addFeature = () => {
    const newFeatures = [...features, ""];
    setFeatures(newFeatures);
    form.setValue("features", newFeatures);
  };

  const removeFeature = (index: number) => {
    if (features.length > 1) {
      const newFeatures = features.filter((_, i) => i !== index);
      setFeatures(newFeatures);
      form.setValue("features", newFeatures);
    }
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
    form.setValue("features", newFeatures);
  };

  const onFormSubmit = (data: z.infer<typeof planFormSchema>) => {
    const validFeatures = data.features.filter((f) => f.trim() !== "");
    if (validFeatures.length === 0) {
      form.setError("features", { message: "Minimal harus ada 1 fitur yang diisi" });
      return;
    }
    onSubmit({
      title: data.title,
      description: data.description,
      duration: data.duration,
      originalPrice: data.originalPrice,
      discountPrice: data.discountPrice,
      features: validFeatures,
      isRecommended: data.isRecommended,
      status: data.status,
      updatedAt: new Date(),
    });
    onOpenChangeHandler(false);
  };

  if (!plan) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Plan</DialogTitle>
          <DialogDescription>Edit paket langganan yang sudah ada.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-4"
          >
            <div className="flex flex-col gap-4">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Judul<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan judul plan"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Deskripsi<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukkan deskripsi plan"
                        rows={3}
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                {/* Duration */}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Durasi (Bulan)<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="Masukkan durasi dalam bulan"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Original Price */}
                <FormField
                  control={form.control}
                  name="originalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Harga Awal<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="Masukkan harga awal"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Discount Price */}
              <FormField
                control={form.control}
                name="discountPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Harga Discount<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Masukkan harga setelah discount"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Features List */}
              <FormField
                control={form.control}
                name="features"
                render={() => (
                  <FormItem>
                    <FormLabel>
                      List Fitur<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              placeholder="Masukkan fitur"
                              value={feature}
                              onChange={(e) => updateFeature(index, e.target.value)}
                              className="flex-1"
                            />
                            {features.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFeature(index)}
                              >
                                <Icon icon="lucide:trash" className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addFeature}
                          className="w-full"
                        >
                          <Icon icon="lucide:plus" className="mr-2 h-4 w-4" />
                          Tambah Fitur
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                {/* Is Recommended */}
                <FormField
                  control={form.control}
                  name="isRecommended"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Rekomendasi<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ? "yes" : "no"}
                          onValueChange={(value) => field.onChange(value === "yes")}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih rekomendasi" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Ya</SelectItem>
                            <SelectItem value="no">Tidak</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Status<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                  Update Plan
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


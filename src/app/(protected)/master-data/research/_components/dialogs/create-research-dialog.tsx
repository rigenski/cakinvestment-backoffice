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
import { ResearchFormData, ResearchCategory } from "../../types";
import { useState } from "react";
import { Icon } from "@iconify/react";

const researchFormSchema = z.object({
  title: z.string().min(1, "Judul harus diisi"),
  subtitle: z.string().min(1, "Subtitle harus diisi"),
  category: z.enum(["Sektor Perbankan", "Sektor Teknologi", "Market Overview"]),
  author: z.string().min(1, "Author harus diisi"),
  date: z.string().min(1, "Tanggal harus diisi"),
  document: z.any(),
});

interface CreateResearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ResearchFormData) => void;
}

export function CreateResearchDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateResearchDialogProps) {
  const [document, setDocument] = useState<File | null>(null);

  const form = useForm<z.infer<typeof researchFormSchema>>({
    resolver: zodResolver(researchFormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      category: "Sektor Perbankan",
      author: "",
      date: new Date().toISOString().split("T")[0],
      document: null,
    },
  });

  const onOpenChangeHandler = (v: boolean) => {
    onOpenChange(v);
    if (!v) {
      form.reset();
      setDocument(null);
    }
  };

  const onFormSubmit = (data: z.infer<typeof researchFormSchema>) => {
    if (!document) {
      form.setError("document", { message: "Dokumen harus diupload" });
      return;
    }
    onSubmit({
      title: data.title,
      subtitle: data.subtitle,
      category: data.category,
      author: data.author,
      date: data.date,
      document: document,
    });
    onOpenChangeHandler(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create Research</DialogTitle>
          <DialogDescription>
            Tambahkan penelitian baru ke sistem.
          </DialogDescription>
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
                        placeholder="Masukkan judul penelitian"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subtitle */}
              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Subtitle<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan subtitle penelitian"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Kategori<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sektor Perbankan">
                              Sektor Perbankan
                            </SelectItem>
                            <SelectItem value="Sektor Teknologi">
                              Sektor Teknologi
                            </SelectItem>
                            <SelectItem value="Market Overview">
                              Market Overview
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Author */}
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Author<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama author"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tanggal<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Document Upload */}
              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Upload Dokumen<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setDocument(file);
                              field.onChange(file);
                            }
                          }}
                          className="cursor-pointer"
                        />
                      </div>
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
                  Create Research
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

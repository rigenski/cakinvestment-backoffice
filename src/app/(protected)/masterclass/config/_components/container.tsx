"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SEOConfig } from "../types";

const seoFormSchema = z.object({
  metaTitle: z
    .string()
    .min(1, "Meta Title harus diisi")
    .max(60, "Meta Title maksimal 60 karakter"),
  metaDescription: z
    .string()
    .min(1, "Meta Description harus diisi")
    .max(160, "Meta Description maksimal 160 karakter"),
  metaKeywords: z.string().optional(),
  metaPixelId: z.string().optional(),
});

// Mock data - replace with actual API call
const mockSEOConfig: SEOConfig = {
  metaTitle:
    "CAK Investment Club - Platform Belajar Investasi Saham Terpercaya",
  metaDescription:
    "Belajar investasi saham dari analis profesional. Modul lengkap, webinar live, riset detail, dan komunitas aktif untuk membantu Anda mencapai tujuan finansial.",
  metaKeywords:
    "investasi saham, belajar saham, analisis fundamental, analisis teknikal, portfolio management, edukasi investasi",
  metaPixelId: "",
};

export default function ConfigContainer() {
  const seoForm = useForm<z.infer<typeof seoFormSchema>>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: mockSEOConfig,
  });

  const metaTitleValue = seoForm.watch("metaTitle");
  const metaDescriptionValue = seoForm.watch("metaDescription");

  const onSEOSubmit = (data: z.infer<typeof seoFormSchema>) => {
    console.log("SEO Config:", data);
    // TODO: Implement API call to save SEO config
  };

  return (
    <div className="bg-background space-y-6 rounded-lg p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Masterclass Configuration</h1>
        <p className="text-muted-foreground">
          Kelola konfigurasi SEO untuk masterclass.
        </p>
      </div>

      {/* SEO Config Form */}
      <Form {...seoForm}>
        <form
          onSubmit={seoForm.handleSubmit(onSEOSubmit)}
          className="space-y-6"
        >
          {/* Meta Title */}
          <FormField
            control={seoForm.control}
            name="metaTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Meta Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <div className="flex items-center justify-between">
                  <FormMessage />
                  <p
                    className={`text-xs ${
                      metaTitleValue.length > 60
                        ? "text-red-500"
                        : "text-muted-foreground"
                    }`}
                  >
                    {metaTitleValue.length}/60 karakter
                  </p>
                </div>
              </FormItem>
            )}
          />

          {/* Meta Description */}
          <FormField
            control={seoForm.control}
            name="metaDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Meta Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea {...field} className="min-h-[100px]" rows={4} />
                </FormControl>
                <div className="flex items-center justify-between">
                  <FormMessage />
                  <p
                    className={`text-xs ${
                      metaDescriptionValue.length > 160
                        ? "text-red-500"
                        : "text-muted-foreground"
                    }`}
                  >
                    {metaDescriptionValue.length}/160 karakter
                  </p>
                </div>
              </FormItem>
            )}
          />

          {/* Meta Keywords */}
          <FormField
            control={seoForm.control}
            name="metaKeywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Keywords</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Pisahkan keywords dengan koma
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Meta Pixel ID */}
          <FormField
            control={seoForm.control}
            name="metaPixelId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Pixel ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Masukkan Meta Pixel ID (contoh: 123456789012345)"
                  />
                </FormControl>
                <FormDescription>
                  ID dari Facebook Meta Pixel untuk tracking
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit">Simpan SEO Config</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}


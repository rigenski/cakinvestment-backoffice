"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { SEOConfig, ReferralConfig } from "../types";
import { Icon } from "@iconify/react";

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

const referralFormSchema = z.object({
  inviterPercentage: z
    .number()
    .min(0, "Persentase harus minimal 0")
    .max(100, "Persentase harus maksimal 100"),
  inviteePercentage: z
    .number()
    .min(0, "Persentase harus minimal 0")
    .max(100, "Persentase harus maksimal 100"),
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

const mockReferralConfig: ReferralConfig = {
  inviterPercentage: 10,
  inviteePercentage: 5,
};

export default function ConfigContainer() {
  const [activeTab, setActiveTab] = useState("seo");

  const seoForm = useForm<z.infer<typeof seoFormSchema>>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: mockSEOConfig,
  });

  const referralForm = useForm<z.infer<typeof referralFormSchema>>({
    resolver: zodResolver(referralFormSchema),
    defaultValues: mockReferralConfig,
  });

  const metaTitleValue = seoForm.watch("metaTitle");
  const metaDescriptionValue = seoForm.watch("metaDescription");

  const onSEOSubmit = (data: z.infer<typeof seoFormSchema>) => {
    console.log("SEO Config:", data);
    // TODO: Implement API call to save SEO config
  };

  const onReferralSubmit = (data: z.infer<typeof referralFormSchema>) => {
    console.log("Referral Config:", data);
    // TODO: Implement API call to save referral config
  };

  return (
    <div className="bg-background space-y-6 rounded-lg p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Configuration</h1>
        <p className="text-muted-foreground">
          Kelola konfigurasi SEO dan referral system.
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="seo">SEO Config</TabsTrigger>
          <TabsTrigger value="referral">Referral</TabsTrigger>
        </TabsList>

        {/* SEO Config Tab */}
        <TabsContent value="seo" className="mt-6">
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
        </TabsContent>

        {/* Referral Tab */}
        <TabsContent value="referral" className="mt-6">
          <Form {...referralForm}>
            <form
              onSubmit={referralForm.handleSubmit(onReferralSubmit)}
              className="space-y-6"
            >
              {/* Inviter Percentage */}
              <FormField
                control={referralForm.control}
                name="inviterPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Orang yang Mengajak (Persentase){" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                          className="pr-8"
                        />
                        <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2">
                          %
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Invitee Percentage */}
              <FormField
                control={referralForm.control}
                name="inviteePercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Orang yang Diajak (Persentase){" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                          className="pr-8"
                        />
                        <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2">
                          %
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit">Simpan Referral Config</Button>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

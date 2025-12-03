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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TiptapEditor } from "../tiptap-editor";
import { News, NewsCategory } from "../../types";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const newsFormSchema = z.object({
  title: z.string().min(1, "Judul harus diisi"),
  category: z.enum(["Market Update", "Analisis", "Tips & Trick", "Lainya"]),
  author: z.string().min(1, "Author harus diisi"),
  date: z.string().min(1, "Tanggal harus diisi"),
  content: z.string().min(1, "Konten harus diisi"),
  banner: z.any(),
});

interface EditNewsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  news: News | null;
  onSubmit: (data: Omit<News, "id" | "createdAt">) => void;
}

export function EditNewsDialog({
  open,
  onOpenChange,
  news,
  onSubmit,
}: EditNewsDialogProps) {
  const [content, setContent] = useState("");
  const [banner, setBanner] = useState<File | null>(null);

  const form = useForm<z.infer<typeof newsFormSchema>>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: "",
      category: "Market Update",
      author: "",
      date: "",
      content: "",
      banner: null,
    },
  });

  useEffect(() => {
    if (news) {
      form.reset({
        title: news.title,
        category: news.category,
        author: news.author,
        date: news.date.toISOString().split("T")[0],
        content: news.content,
        banner: news.banner,
      });
      setContent(news.content);
    }
  }, [news, form]);

  const onOpenChangeHandler = (v: boolean) => {
    onOpenChange(v);
    if (!v) {
      form.reset();
      setContent("");
      setBanner(null);
    }
  };

  const onFormSubmit = (data: z.infer<typeof newsFormSchema>) => {
    if (!news) return;
    onSubmit({
      title: data.title,
      category: data.category,
      author: data.author,
      date: new Date(data.date),
      content: content,
      banner: banner ? URL.createObjectURL(banner) : news.banner || "",
      updatedAt: new Date(),
    });
    onOpenChangeHandler(false);
  };

  if (!news) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit News</DialogTitle>
          <DialogDescription>Edit berita yang sudah ada.</DialogDescription>
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
                        placeholder="Masukkan judul berita"
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
                            <SelectItem value="Market Update">
                              Market Update
                            </SelectItem>
                            <SelectItem value="Analisis">Analisis</SelectItem>
                            <SelectItem value="Tips & Trick">
                              Tips & Trick
                            </SelectItem>
                            <SelectItem value="Lainya">Lainya</SelectItem>
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

              {/* Banner Upload */}
              <FormField
                control={form.control}
                name="banner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Banner</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setBanner(file);
                              field.onChange(file);
                            }
                          }}
                          className="cursor-pointer"
                        />
                        <div>
                          {banner ? (
                            <div className="mt-2">
                              <img
                                src={URL.createObjectURL(banner)}
                                alt="Banner preview"
                                className="h-48 max-w-full rounded-lg border object-cover"
                              />
                            </div>
                          ) : (
                            news.banner && (
                              <div className="mt-2">
                                <p className="text-muted-foreground mb-2 text-sm">
                                  Banner saat ini:
                                </p>
                                <img
                                  src={news.banner}
                                  alt="Current banner"
                                  className="h-48 max-w-full rounded-lg border object-cover"
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Content */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Konten<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <TiptapEditor
                        content={content}
                        onChange={(html) => {
                          setContent(html);
                          field.onChange(html);
                        }}
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
                  Update News
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

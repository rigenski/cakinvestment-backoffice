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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TiptapEditor } from "../tiptap-editor";
import { News, NewsFormData, NewsCategory } from "../../types";
import { useState, useEffect } from "react";

const newsFormSchema = z.object({
  title: z.string().min(1, "Judul harus diisi"),
  category: z.enum(["Market Update", "Analisis", "Tips & Trick", "Lainya"]),
  author: z.string().min(1, "Author harus diisi"),
  date: z.string().min(1, "Tanggal harus diisi"),
  content: z.string().min(1, "Konten harus diisi"),
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(newsFormSchema),
  });

  const category = watch("category");

  useEffect(() => {
    if (news) {
      setValue("title", news.title);
      setValue("category", news.category);
      setValue("author", news.author);
      setValue("date", news.date.toISOString().split("T")[0]);
      setContent(news.content);
      setValue("content", news.content);
    }
  }, [news, setValue]);

  const onFormSubmit = (data: any) => {
    if (!news) return;
    onSubmit({
      title: data.title,
      category: data.category,
      author: data.author,
      date: new Date(data.date),
      content: content,
      updatedAt: new Date(),
    });
    onOpenChange(false);
  };

  if (!news) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit News</DialogTitle>
          <DialogDescription>Edit berita yang sudah ada.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Masukkan judul berita"
            />
            {errors.title && (
              <p className="text-destructive text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select
                value={category}
                onValueChange={(value) =>
                  setValue("category", value as NewsCategory)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Market Update">Market Update</SelectItem>
                  <SelectItem value="Analisis">Analisis</SelectItem>
                  <SelectItem value="Tips & Trick">Tips & Trick</SelectItem>
                  <SelectItem value="Lainya">Lainya</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-destructive text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                {...register("author")}
                placeholder="Masukkan nama author"
              />
              {errors.author && (
                <p className="text-destructive text-sm">
                  {errors.author.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Tanggal</Label>
            <Input id="date" type="date" {...register("date")} />
            {errors.date && (
              <p className="text-destructive text-sm">{errors.date.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Konten</Label>
            <TiptapEditor
              content={content}
              onChange={(html) => {
                setContent(html);
                setValue("content", html);
              }}
            />
            {errors.content && (
              <p className="text-destructive text-sm">
                {errors.content.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="gradient">
              Update News
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TiptapEditor } from "../../news/_components/tiptap-editor";
import { ModuleFormData, Video } from "@/app/(protected)/master-data/akademi/types";
import { useState } from "react";
import { Icon } from "@iconify/react";

const moduleFormSchema = z.object({
  title: z.string().min(1, "Judul harus diisi"),
  instructor: z.string().min(1, "Pengajar harus diisi"),
  description: z.string().min(1, "Deskripsi harus diisi"),
  category: z.string().min(1, "Kategori harus diisi"),
  videos: z
    .array(
      z.object({
        title: z.string().min(1, "Judul video harus diisi"),
        duration: z.string().min(1, "Durasi harus diisi"),
        videoUrl: z.string().url("URL video harus valid").min(1, "URL video harus diisi"),
      }),
    )
    .min(1, "Minimal satu video harus ditambahkan"),
});

interface CreateModuleFormProps {
  onSubmit: (data: ModuleFormData) => void;
  onCancel: () => void;
}

export function CreateModuleForm({
  onSubmit,
  onCancel,
}: CreateModuleFormProps) {
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);

  const form = useForm<z.infer<typeof moduleFormSchema>>({
    resolver: zodResolver(moduleFormSchema),
    defaultValues: {
      title: "",
      instructor: "",
      description: "",
      category: "",
      videos: [],
    },
  });

  const addVideo = () => {
    setVideos([
      ...videos,
      {
        title: "",
        duration: "",
        videoUrl: "",
      },
    ]);
  };

  const removeVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const updateVideo = (index: number, field: keyof Video, value: string) => {
    const updatedVideos = [...videos];
    updatedVideos[index] = {
      ...updatedVideos[index],
      [field]: value,
    };
    setVideos(updatedVideos);
    form.setValue("videos", updatedVideos);
  };

  const onFormSubmit = (data: z.infer<typeof moduleFormSchema>) => {
    if (videos.length === 0) {
      form.setError("videos", { message: "Minimal satu video harus ditambahkan" });
      return;
    }

    // Validate all videos are filled
    const invalidVideos = videos.some(
      (video) => !video.title || !video.duration || !video.videoUrl,
    );
    if (invalidVideos) {
      form.setError("videos", {
        message: "Semua field video harus diisi",
      });
      return;
    }

    onSubmit({
      title: data.title,
      instructor: data.instructor,
      description,
      category: data.category,
      videos,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
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
                    placeholder="Masukkan judul modul"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Instructor */}
            <FormField
              control={form.control}
              name="instructor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Pengajar<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan nama pengajar"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <Input
                      placeholder="Masukkan kategori"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                  <TiptapEditor
                    content={description}
                    onChange={(html) => {
                      setDescription(html);
                      field.onChange(html);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Videos Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormLabel>
                Video<span className="text-red-500">*</span>
              </FormLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addVideo}
              >
                <Icon icon="lucide:plus" className="mr-2 h-4 w-4" />
                Add Video
              </Button>
            </div>

            {videos.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Belum ada video. Klik "Add Video" untuk menambahkan.
              </p>
            )}

            <div className="space-y-4">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Video {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeVideo(index)}
                    >
                      <Icon
                        icon="lucide:trash"
                        className="h-4 w-4 text-destructive"
                      />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <Input
                      placeholder="Judul video"
                      value={video.title}
                      onChange={(e) =>
                        updateVideo(index, "title", e.target.value)
                      }
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        placeholder="Durasi (HH:MM:SS atau MM:SS)"
                        value={video.duration}
                        onChange={(e) =>
                          updateVideo(index, "duration", e.target.value)
                        }
                        required
                      />
                      <Input
                        type="url"
                        placeholder="URL Video"
                        value={video.videoUrl}
                        onChange={(e) =>
                          updateVideo(index, "videoUrl", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {form.formState.errors.videos && (
              <p className="text-sm text-destructive">
                {form.formState.errors.videos.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Create Module
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}


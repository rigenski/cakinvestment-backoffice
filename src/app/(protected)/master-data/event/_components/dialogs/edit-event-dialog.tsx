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
import { Event, EventCategory } from "../../types";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const eventFormSchema = z.object({
  title: z.string().min(1, "Judul harus diisi"),
  speaker: z.string().min(1, "Pembicara harus diisi"),
  category: z.enum(["gratis", "premium"]),
  date: z.string().min(1, "Tanggal harus diisi"),
  time: z.string().min(1, "Waktu harus diisi"),
  registrationLink: z.string().url("Link registrasi harus valid").min(1, "Link registrasi harus diisi"),
  banner: z.any(),
  description: z.string().min(1, "Deskripsi harus diisi"),
});

interface EditEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: Event | null;
  onSubmit: (data: Omit<Event, "id" | "createdAt">) => void;
}

export function EditEventDialog({
  open,
  onOpenChange,
  event,
  onSubmit,
}: EditEventDialogProps) {
  const [banner, setBanner] = useState<File | null>(null);

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      speaker: "",
      category: "gratis",
      date: "",
      time: "",
      registrationLink: "",
      banner: null,
      description: "",
    },
  });

  useEffect(() => {
    if (event) {
      form.reset({
        title: event.title,
        speaker: event.speaker,
        category: event.category,
        date: event.date.toISOString().split("T")[0],
        time: event.time,
        registrationLink: event.registrationLink,
        banner: event.banner,
        description: event.description,
      });
    }
  }, [event, form]);

  const onOpenChangeHandler = (v: boolean) => {
    onOpenChange(v);
    if (!v) {
      form.reset();
      setBanner(null);
    }
  };

  const onFormSubmit = (data: z.infer<typeof eventFormSchema>) => {
    if (!event) return;
    onSubmit({
      title: data.title,
      speaker: data.speaker,
      category: data.category,
      date: new Date(data.date),
      time: data.time,
      registrationLink: data.registrationLink,
      banner: banner ? URL.createObjectURL(banner) : event.banner,
      description: data.description,
      updatedAt: new Date(),
    });
    onOpenChangeHandler(false);
  };

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>Edit event yang sudah ada.</DialogDescription>
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
                        placeholder="Masukkan judul event"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                {/* Speaker */}
                <FormField
                  control={form.control}
                  name="speaker"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Pembicara<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama pembicara"
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
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gratis">Gratis</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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

                {/* Time */}
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Waktu<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          placeholder="HH:MM"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Registration Link */}
              <FormField
                control={form.control}
                name="registrationLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Link Registrasi<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/register"
                        {...field}
                        required
                      />
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
                    <FormLabel>
                      Upload Banner<span className="text-red-500">*</span>
                    </FormLabel>
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
                                className="max-w-full h-48 object-cover rounded-lg border"
                              />
                            </div>
                          ) : (
                            event.banner && (
                              <div className="mt-2">
                                <p className="text-muted-foreground text-sm mb-2">
                                  Banner saat ini:
                                </p>
                                <img
                                  src={event.banner}
                                  alt="Current banner"
                                  className="max-w-full h-48 object-cover rounded-lg border"
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
                        placeholder="Masukkan deskripsi event"
                        rows={4}
                        {...field}
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
                  Update Event
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


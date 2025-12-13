"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { TAkademiRequest } from "@/services/master-data/akademi/type";
import { TiptapEditor } from "@/components/tiptap-editor";

export function AkademiForm() {
    const form = useFormContext<TAkademiRequest>();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "videoModules",
    });

    const addVideo = () => {
        append({
            title: "",
            duration: "",
            videoUrl: "",
        });
    };

    return (
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
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-2 gap-4">
                {/* Teacher (changed from instructor) */}
                <FormField
                    control={form.control}
                    name="teacher"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Pengajar
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Masukkan nama pengajar"
                                    {...field}
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
                                Kategori
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Masukkan kategori"
                                    {...field}
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
                            Deskripsi
                            <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                            <TiptapEditor
                                content={field.value || ""}
                                onChange={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Video Modules Section */}
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

                {fields.length === 0 && (
                    <p className="text-muted-foreground text-sm">
                        Belum ada video. Klik &quot;Add Video&quot; untuk
                        menambahkan.
                    </p>
                )}

                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="space-y-4 rounded-lg border p-4"
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium">
                                    Video {index + 1}
                                </h4>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => remove(index)}
                                >
                                    <Icon
                                        icon="lucide:trash"
                                        className="text-destructive h-4 w-4"
                                    />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {/* Video Title */}
                                <FormField
                                    control={form.control}
                                    name={`videoModules.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Judul video"
                                                    {...field}
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
                                        name={`videoModules.${index}.duration`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Durasi (HH:MM:SS atau MM:SS)"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Video URL */}
                                    <FormField
                                        control={form.control}
                                        name={`videoModules.${index}.videoUrl`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="url"
                                                        placeholder="URL Video"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show root error for videoModules array */}
                {form.formState.errors.videoModules?.root && (
                    <p className="text-destructive text-sm">
                        {form.formState.errors.videoModules.root.message}
                    </p>
                )}
                {form.formState.errors.videoModules?.message && (
                    <p className="text-destructive text-sm">
                        {form.formState.errors.videoModules.message}
                    </p>
                )}
            </div>
        </div>
    );
}

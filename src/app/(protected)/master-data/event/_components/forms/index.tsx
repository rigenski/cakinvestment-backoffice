import { SingleSelect } from "@/components/single-select";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TEventRequest } from "@/services/master-data/event/type";
import { useFormContext } from "react-hook-form";
import { CATEGORY_OPTIONS } from "../table";
import DatePicker from "@/components/date-picker";
import { DateTime } from "luxon";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { services } from "@/services";
import { toast } from "sonner";

export default function EventForm() {
    const form = useFormContext<TEventRequest>();

    const uploadFn = useMutation(services.storage.upload());

    const onUpload = (file: File) => {
        uploadFn.mutate(
            { file, directory: "cakinvestment/event" },
            {
                onSuccess: (res) => {
                    if (res.content?.fileUrl) {
                        form.setValue("bannerUrl", res.content?.fileUrl);
                    }
                },
                onError: (err) => {
                    toast.error(err.message);
                },
            }
        );
    };

    return (
        <div className="space-y-4">
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
                                <SingleSelect
                                    options={CATEGORY_OPTIONS}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Pilih kategori"
                                />
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
                                <DatePicker
                                    mode="single"
                                    selected={
                                        field.value
                                            ? new Date(field.value)
                                            : undefined
                                    }
                                    onSelect={(date: any) => {
                                        if (date) {
                                            field.onChange(
                                                DateTime.fromJSDate(
                                                    date
                                                ).toFormat("yyyy-MM-dd")
                                            );
                                        }
                                    }}
                                    placeholder="Pilih tanggal"
                                />
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

            <FormField
                control={form.control}
                name="registrationLink"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Link Registrasi
                            <span className="text-red-500">*</span>
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

            <FormField
                control={form.control}
                name="bannerUrl"
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
                                            onUpload(file);
                                        }
                                    }}
                                    className="cursor-pointer"
                                />
                                <div>
                                    {field.value ? (
                                        <div className="mt-2">
                                            <img
                                                src={field.value}
                                                alt="Banner preview"
                                                className="max-w-full h-48 object-cover rounded-lg border"
                                            />
                                        </div>
                                    ) : (
                                        form.getValues("bannerUrl") && (
                                            <div className="mt-2">
                                                <p className="text-muted-foreground text-sm mb-2">
                                                    Banner saat ini:
                                                </p>
                                                <img
                                                    src={form.getValues(
                                                        "bannerUrl"
                                                    )}
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
        </div>
    );
}

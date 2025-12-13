import { SingleSelect } from "@/components/single-select";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import DatePicker from "@/components/date-picker";
import { DateTime } from "luxon";
import { useMutation } from "@tanstack/react-query";
import { services } from "@/services";
import { toast } from "sonner";
import { TNewsRequest } from "@/services/master-data/news/type";
import { TiptapEditor } from "@/components/tiptap-editor";

export const CATEGORY_OPTIONS = [
    {
        label: "Market Update",
        value: "MARKET_UPDATE",
    },
    {
        label: "Analisis",
        value: "ANALISIS",
    },
    {
        label: "Tips & Trick",
        value: "TIPS_TRICK",
    },
    {
        label: "Lainya",
        value: "LAINYA",
    },
];

export default function NewsForm() {
    const form = useFormContext<TNewsRequest>();

    const uploadFn = useMutation(services.storage.upload());

    const onUpload = (file: File) => {
        uploadFn.mutate(
            { file, directory: "cakinvestment/news" },
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

                {/* Speaker */}
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
                                            DateTime.fromJSDate(date).toFormat(
                                                "yyyy-MM-dd"
                                            )
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
                name="content"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Konten<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                            <TiptapEditor
                                content={field.value}
                                onChange={(html: string) => {
                                    field.onChange(html);
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}

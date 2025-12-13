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
import { TResearchRequest } from "@/services/master-data/research/type";

export const CATEGORY_OPTIONS = [
    {
        label: "Sektor Perbankan",
        value: "SEKTOR_PERBANKAN",
    },
    {
        label: "Sektor Teknologi",
        value: "SEKTOR_TEKNOLOGI",
    },
    {
        label: "Market Overview",
        value: "MARKET_OVERVIEW",
    },
];

export default function ResearchForm() {
    const form = useFormContext<TResearchRequest>();

    const uploadFn = useMutation(services.storage.upload());

    const onUpload = (file: File) => {
        uploadFn.mutate(
            { file, directory: "cakinvestment/research" },
            {
                onSuccess: (res) => {
                    if (res.content?.fileUrl) {
                        form.setValue("documentUrl", res.content?.fileUrl);
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
                            Judul
                            <span className="text-red-500">*</span>
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

            <FormField
                control={form.control}
                name="subTitle"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Subtitle
                            <span className="text-red-500">*</span>
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
                                Kategori
                                <span className="text-red-500">*</span>
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

                {/* Author */}
                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Author
                                <span className="text-red-500">*</span>
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
                name="documentUrl"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Upload Dokumen
                            <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                            <div className="flex items-center gap-4">
                                <Input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            onUpload(file);
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
        </div>
    );
}

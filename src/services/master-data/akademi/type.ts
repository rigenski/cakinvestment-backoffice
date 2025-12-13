import z from "zod";

export type TVideoModule = {
    id: string;
    title: string;
    videoUrl: string;
    duration: string;
    createdAt: string;
    updatedAt: string;
    moduleId: string;
};

export type TAkademi = {
    id: string;
    title: string;
    teacher: string;
    category: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    videoModules: TVideoModule[];
};

export const schemaAkademi = z.object({
    title: z.string().min(1, "Judul harus diisi"),
    teacher: z.string().min(1, "Guru harus diisi"),
    category: z.string().min(1, "Kategori harus diisi"),
    description: z.string().min(1, "Deskripsi harus diisi"),
    videoModules: z
        .array(
            z.object({
                title: z.string().min(1, "Judul video harus diisi"),
                videoUrl: z.string().url("URL video harus valid"),
                duration: z.string().min(1, "Durasi harus diisi"),
            })
        )
        .min(1, "Minimal 1 video module"),
});

export type TAkademiRequest = z.infer<typeof schemaAkademi>;

export function akademiToRequest(akademi?: TAkademi | null): TAkademiRequest {
    if (!akademi) {
        return {
            title: "",
            teacher: "",
            category: "",
            description: "",
            videoModules: [],
        };
    }

    return {
        title: akademi.title,
        teacher: akademi.teacher,
        category: akademi.category,
        description: akademi.description,
        videoModules: akademi.videoModules.map((video) => ({
            title: video.title,
            videoUrl: video.videoUrl,
            duration: video.duration,
        })),
    };
}

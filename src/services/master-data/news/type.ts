import z from "zod";

export type TNews = {
    id: string;
    title: string;
    category: string;
    author: string;
    date: string;
    bannerUrl: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

export const schemaNews = z.object({
    title: z.string(),
    category: z.string(),
    author: z.string(),
    date: z.string(),
    bannerUrl: z.string().url(),
    content: z.string(),
});

export type TNewsRequest = z.infer<typeof schemaNews>;

export function newsToRequest(data?: TNews | null): TNewsRequest {
    if (!data) {
        return {
            title: "",
            category: "",
            author: "",
            date: "",
            bannerUrl: "",
            content: "",
        };
    }

    return {
        title: data.title,
        category: data.category,
        author: data.author,
        date: data.date,
        bannerUrl: data.bannerUrl,
        content: data.content,
    };
}

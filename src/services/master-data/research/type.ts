import z from "zod";

export type TResearch = {
    id: string;
    title: string;
    subTitle: string;
    category: string;
    author: string;
    date: string;
    documentUrl: string;
    createdAt: string;
    updatedAt: string;
};

export const schemaResearch = z.object({
    title: z.string(),
    subTitle: z.string(),
    category: z.string(),
    author: z.string(),
    date: z.string(),
    documentUrl: z.string().url(),
});

export type TResearchRequest = z.infer<typeof schemaResearch>;

export function researchToRequest(data?: TResearch | null): TResearchRequest {
    if (!data) {
        return {
            title: "",
            subTitle: "",
            category: "",
            author: "",
            date: "",
            documentUrl: "",
        };
    }

    return {
        title: data.title,
        subTitle: data.subTitle,
        category: data.category,
        author: data.author,
        date: data.date,
        documentUrl: data.documentUrl,
    };
}

import z from "zod";

export type TEvent = {
    id: string;
    title: string;
    speaker: string;
    category: "GRATIS";
    date: string;
    time: string;
    registrationLink: string;
    bannerUrl: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};

export const schemaEvent = z.object({
    title: z.string(),
    speaker: z.string(),
    date: z.string(), // ISO date string, could use z.string().regex(/^\d{4}-\d{2}-\d{2}$/) for stricter validation
    time: z.string(), // Could use z.string().regex(/^\d{2}:\d{2}$/) for HH:mm
    registrationLink: z.string().url(),
    bannerUrl: z.string().url(),
    description: z.string(),
    category: z.enum(["GRATIS"]),
});

export type TEventRequest = z.infer<typeof schemaEvent>;

export function eventToRequest(event?: TEvent | null): TEventRequest {
    if (!event) {
        return {
            title: "",
            speaker: "",
            date: "",
            time: "",
            registrationLink: "",
            bannerUrl: "",
            description: "",
            category: "GRATIS",
        };
    }

    return {
        title: event.title,
        speaker: event.speaker,
        date: event.date,
        time: event.time,
        registrationLink: event.registrationLink,
        bannerUrl: event.bannerUrl,
        description: event.description,
        category: event.category,
    };
}

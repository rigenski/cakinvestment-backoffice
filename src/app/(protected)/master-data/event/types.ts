export type EventCategory = "gratis" | "premium";

export interface Event {
  id: string;
  title: string;
  speaker: string;
  category: EventCategory;
  date: Date;
  time: string;
  registrationLink: string;
  banner: string; // URL or file path
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventFormData {
  title: string;
  speaker: string;
  category: EventCategory;
  date: string;
  time: string;
  registrationLink: string;
  banner: File | string;
  description: string;
}


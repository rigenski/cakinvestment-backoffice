export type NewsCategory = "Market Update" | "Analisis" | "Tips & Trick" | "Lainya";

export interface News {
  id: string;
  title: string;
  category: NewsCategory;
  author: string;
  date: Date;
  content: string; // HTML content from Tiptap
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsFormData {
  title: string;
  category: NewsCategory;
  author: string;
  date: string;
  content: string;
}


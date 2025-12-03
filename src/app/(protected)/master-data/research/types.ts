export type ResearchCategory = "Sektor Perbankan" | "Sektor Teknologi" | "Market Overview";

export interface Research {
  id: string;
  title: string;
  subtitle: string;
  category: ResearchCategory;
  author: string;
  date: Date;
  document: string; // URL or file path
  createdAt: Date;
  updatedAt: Date;
}

export interface ResearchFormData {
  title: string;
  subtitle: string;
  category: ResearchCategory;
  author: string;
  date: string;
  document: File | string;
}


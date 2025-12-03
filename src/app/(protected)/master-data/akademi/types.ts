export interface Video {
  id?: string;
  title: string;
  duration: string; // Format: "HH:MM:SS" or "MM:SS"
  videoUrl: string;
}

export interface Module {
  id: string;
  title: string;
  instructor: string;
  description: string; // HTML content from Tiptap
  category: string;
  duration: string; // Total duration calculated from videos
  totalVideo: number;
  videos: Video[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ModuleFormData {
  title: string;
  instructor: string;
  description: string;
  category: string;
  videos: Video[];
}


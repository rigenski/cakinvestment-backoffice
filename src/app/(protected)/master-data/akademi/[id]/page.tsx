"use client";

import { useRouter, useParams } from "next/navigation";
import { ViewModuleContent } from "@/app/(protected)/master-data/akademi/_components/view-module-content";
import { Module } from "@/app/(protected)/master-data/akademi/types";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

// Mock data - replace with actual API call
const mockModules: Module[] = [
  {
    id: "1",
    title: "Dasar-dasar Investasi Saham",
    instructor: "John Doe",
    description: "<p>Pelajari dasar-dasar investasi saham dari awal.</p>",
    category: "Investasi",
    duration: "02:30:00",
    totalVideo: 5,
    videos: [
      {
        id: "v1",
        title: "Pengenalan Saham",
        duration: "00:15:00",
        videoUrl: "https://example.com/video1",
      },
      {
        id: "v2",
        title: "Cara Membaca Grafik",
        duration: "00:20:00",
        videoUrl: "https://example.com/video2",
      },
    ],
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    title: "Analisis Teknikal untuk Pemula",
    instructor: "Jane Smith",
    description: "<p>Pelajari teknik analisis teknikal untuk trading.</p>",
    category: "Trading",
    duration: "03:45:00",
    totalVideo: 8,
    videos: [
      {
        id: "v3",
        title: "Support dan Resistance",
        duration: "00:25:00",
        videoUrl: "https://example.com/video3",
      },
    ],
    createdAt: new Date("2025-01-14"),
    updatedAt: new Date("2025-01-14"),
  },
];

export default function ViewModulePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // TODO: Replace with actual API call to fetch module by id
  const module = mockModules.find((m) => m.id === id);

  if (!module) {
    return (
      <div className="bg-background space-y-6 rounded-lg p-6">
        <div>
          <h1 className="text-2xl font-bold">Module Not Found</h1>
          <p className="text-muted-foreground">
            Module dengan ID {id} tidak ditemukan.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/master-data/akademi")}
        >
          <Icon icon="lucide:arrow-left" className="mr-2 h-4 w-4" />
          Kembali ke list
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background space-y-6 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">View Module</h1>
          <p className="text-muted-foreground">
            Detail informasi modul pembelajaran
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/master-data/akademi")}
        >
          <Icon icon="lucide:arrow-left" className="size-4" />
          Kembali
        </Button>
      </div>
      <ViewModuleContent module={module} />
    </div>
  );
}

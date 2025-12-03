"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Module } from "../types";
import { DeleteModuleDialog } from "./dialogs/delete-module-dialog";
import { FilterModuleDialog } from "./dialogs/filter-module-dialog";

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

export default function AkademiContainer() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [deletingModule, setDeletingModule] = useState<Module | null>(null);
  const [modules, setModules] = useState<Module[]>(mockModules);

  const filteredModules = modules.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.instructor.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const columns: ColumnDef<Module>[] = [
    {
      accessorKey: "title",
      header: "Judul",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.title}</div>
      ),
    },
    {
      accessorKey: "instructor",
      header: "Pengajar",
    },
    {
      accessorKey: "category",
      header: "Kategori",
    },
    {
      accessorKey: "duration",
      header: "Durasi",
    },
    {
      accessorKey: "totalVideo",
      header: "Total Video",
      cell: ({ row }) => `${row.original.totalVideo} video`,
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      cell: ({ row }) => {
        const date = row.original.updatedAt;
        return date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/master-data/akademi/${row.original.id}`)}
          >
            <Icon icon="lucide:eye" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/master-data/akademi/${row.original.id}/edit`)}
          >
            <Icon icon="lucide:pencil" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeletingModule(row.original)}
          >
            <Icon icon="lucide:trash" className="text-destructive h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];


  const handleDelete = () => {
    if (!deletingModule) return;
    setModules(modules.filter((item) => item.id !== deletingModule.id));
    setDeletingModule(null);
  };

  // Get unique categories for filter
  const categories = Array.from(
    new Set(modules.map((m) => m.category)),
  ).sort();

  return (
    <div className="bg-background space-y-6 rounded-lg p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Akademi Management</h1>
        <p className="text-muted-foreground">
          Kelola modul pembelajaran dengan mudah.
        </p>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Icon
            icon="lucide:search"
            className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
          />
          <Input
            placeholder="Search by title, instructor, description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setIsFilterDialogOpen(true)}>
          <Icon icon="lucide:filter" className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="default" onClick={() => router.push("/master-data/akademi/create")}>
          <Icon icon="lucide:plus" className="mr-2 h-4 w-4" />
          Add Module
        </Button>
      </div>

      {/* Data Table */}
      <DataTable data={filteredModules} columns={columns} rowsPerPage={10} />

      {/* Dialogs */}
      <DeleteModuleDialog
        open={!!deletingModule}
        onOpenChange={(open) => !open && setDeletingModule(null)}
        module={deletingModule}
        onConfirm={handleDelete}
      />
      <FilterModuleDialog
        open={isFilterDialogOpen}
        onOpenChange={setIsFilterDialogOpen}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />
    </div>
  );
}


"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Research, ResearchFormData } from "../types";
import { CreateResearchDialog } from "./dialogs/create-research-dialog";
import { DeleteResearchDialog } from "./dialogs/delete-research-dialog";
import { EditResearchDialog } from "./dialogs/edit-research-dialog";
import { FilterResearchDialog } from "./dialogs/filter-research-dialog";
import { ViewResearchDialog } from "./dialogs/view-research-dialog";

// Mock data - replace with actual API call
const mockResearch: Research[] = [
  {
    id: "1",
    title: "Analisis Sektor Perbankan Q1 2025",
    subtitle: "Tinjauan mendalam tentang performa sektor perbankan",
    category: "Sektor Perbankan",
    author: "John Doe",
    date: new Date("2025-01-15"),
    document: "/documents/research-1.pdf",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    title: "Market Overview Teknologi",
    subtitle: "Laporan lengkap tentang tren teknologi terkini",
    category: "Sektor Teknologi",
    author: "Jane Smith",
    date: new Date("2025-01-14"),
    document: "/documents/research-2.pdf",
    createdAt: new Date("2025-01-14"),
    updatedAt: new Date("2025-01-14"),
  },
];

export default function ResearchContainer() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [editingResearch, setEditingResearch] = useState<Research | null>(null);
  const [viewingResearch, setViewingResearch] = useState<Research | null>(null);
  const [deletingResearch, setDeletingResearch] = useState<Research | null>(null);
  const [research, setResearch] = useState<Research[]>(mockResearch);

  const filteredResearch = research.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const columns: ColumnDef<Research>[] = [
    {
      accessorKey: "title",
      header: "Judul",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.title}</div>
      ),
    },
    {
      accessorKey: "subtitle",
      header: "Subtitle",
    },
    {
      accessorKey: "category",
      header: "Kategori",
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "date",
      header: "Tanggal",
      cell: ({ row }) => {
        const date = row.original.date;
        return date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
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
            onClick={() => setViewingResearch(row.original)}
          >
            <Icon icon="lucide:eye" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingResearch(row.original)}
          >
            <Icon icon="lucide:pencil" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeletingResearch(row.original)}
          >
            <Icon icon="lucide:trash" className="text-destructive h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleCreate = (data: ResearchFormData) => {
    const newResearch: Research = {
      title: data.title,
      subtitle: data.subtitle,
      category: data.category,
      author: data.author,
      date: typeof data.date === "string" ? new Date(data.date) : data.date,
      document: typeof data.document === "string" ? data.document : URL.createObjectURL(data.document),
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setResearch([newResearch, ...research]);
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (data: Omit<Research, "id" | "createdAt">) => {
    if (!editingResearch) return;
    setResearch(
      research.map((item) =>
        item.id === editingResearch.id
          ? {
              ...data,
              id: editingResearch.id,
              createdAt: editingResearch.createdAt,
              updatedAt: new Date(),
            }
          : item,
      ),
    );
    setEditingResearch(null);
  };

  const handleDelete = () => {
    if (!deletingResearch) return;
    setResearch(research.filter((item) => item.id !== deletingResearch.id));
    setDeletingResearch(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Research Management</h1>
        <p className="text-muted-foreground mt-2">
          Kelola penelitian dan analisis dengan mudah. Tambah, edit, dan hapus
          dokumen penelitian untuk memberikan informasi terbaru kepada pengguna.
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
            placeholder="Search by title, subtitle, author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setIsFilterDialogOpen(true)}>
          <Icon icon="lucide:filter" className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="default" onClick={() => setIsCreateDialogOpen(true)}>
          <Icon icon="lucide:plus" className="mr-2 h-4 w-4" />
          Add Research
        </Button>
      </div>

      {/* Data Table */}
      <DataTable data={filteredResearch} columns={columns} rowsPerPage={10} />

      {/* Dialogs */}
      <CreateResearchDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
      />
      <EditResearchDialog
        open={!!editingResearch}
        onOpenChange={(open) => !open && setEditingResearch(null)}
        research={editingResearch}
        onSubmit={handleEdit}
      />
      <ViewResearchDialog
        open={!!viewingResearch}
        onOpenChange={(open) => !open && setViewingResearch(null)}
        research={viewingResearch}
      />
      <DeleteResearchDialog
        open={!!deletingResearch}
        onOpenChange={(open) => !open && setDeletingResearch(null)}
        research={deletingResearch}
        onConfirm={handleDelete}
      />
      <FilterResearchDialog
        open={isFilterDialogOpen}
        onOpenChange={setIsFilterDialogOpen}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </div>
  );
}


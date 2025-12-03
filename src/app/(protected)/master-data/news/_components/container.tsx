"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { News, NewsFormData } from "../types";
import { CreateNewsDialog } from "./dialogs/create-news-dialog";
import { DeleteNewsDialog } from "./dialogs/delete-news-dialog";
import { EditNewsDialog } from "./dialogs/edit-news-dialog";
import { FilterNewsDialog } from "./dialogs/filter-news-dialog";
import { ViewNewsDialog } from "./dialogs/view-news-dialog";

// Mock data - replace with actual API call
const mockNews: News[] = [
  {
    id: "1",
    title: "Market Update: Analisis Pasar Saham Hari Ini",
    category: "Market Update",
    author: "John Doe",
    date: new Date("2025-01-15"),
    content: "<p>Konten berita lengkap...</p>",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    title: "Tips Investasi untuk Pemula",
    category: "Tips & Trick",
    author: "Jane Smith",
    date: new Date("2025-01-14"),
    content: "<p>Konten berita lengkap...</p>",
    createdAt: new Date("2025-01-14"),
    updatedAt: new Date("2025-01-14"),
  },
];

export default function NewsContainer() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [viewingNews, setViewingNews] = useState<News | null>(null);
  const [deletingNews, setDeletingNews] = useState<News | null>(null);
  const [news, setNews] = useState<News[]>(mockNews);

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const columns: ColumnDef<News>[] = [
    {
      accessorKey: "title",
      header: "Judul",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.title}</div>
      ),
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
            onClick={() => setViewingNews(row.original)}
          >
            <Icon icon="lucide:eye" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingNews(row.original)}
          >
            <Icon icon="lucide:pencil" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeletingNews(row.original)}
          >
            <Icon icon="lucide:trash" className="text-destructive h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleCreate = (data: NewsFormData) => {
    const newNews: News = {
      title: data.title,
      category: data.category,
      author: data.author,
      date: typeof data.date === "string" ? new Date(data.date) : data.date,
      content: data.content,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNews([newNews, ...news]);
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (data: Omit<News, "id" | "createdAt">) => {
    if (!editingNews) return;
    setNews(
      news.map((item) =>
        item.id === editingNews.id
          ? {
              ...data,
              id: editingNews.id,
              createdAt: editingNews.createdAt,
              updatedAt: new Date(),
            }
          : item,
      ),
    );
    setEditingNews(null);
  };

  const handleDelete = () => {
    if (!deletingNews) return;
    setNews(news.filter((item) => item.id !== deletingNews.id));
    setDeletingNews(null);
  };

  return (
    <div className="bg-background space-y-6 rounded-lg p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">News Management</h1>
        <p className="text-muted-foreground">
          Kelola berita dan artikel dengan mudah.
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
            placeholder="Search by title, author..."
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
          Add News
        </Button>
      </div>

      {/* Data Table */}
      <DataTable data={filteredNews} columns={columns} rowsPerPage={10} />

      {/* Dialogs */}
      <CreateNewsDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
      />
      <EditNewsDialog
        open={!!editingNews}
        onOpenChange={(open) => !open && setEditingNews(null)}
        news={editingNews}
        onSubmit={handleEdit}
      />
      <ViewNewsDialog
        open={!!viewingNews}
        onOpenChange={(open) => !open && setViewingNews(null)}
        news={viewingNews}
      />
      <DeleteNewsDialog
        open={!!deletingNews}
        onOpenChange={(open) => !open && setDeletingNews(null)}
        news={deletingNews}
        onConfirm={handleDelete}
      />
      <FilterNewsDialog
        open={isFilterDialogOpen}
        onOpenChange={setIsFilterDialogOpen}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </div>
  );
}

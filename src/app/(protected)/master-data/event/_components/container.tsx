"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Event, EventFormData } from "../types";
import { CreateEventDialog } from "./dialogs/create-event-dialog";
import { DeleteEventDialog } from "./dialogs/delete-event-dialog";
import { EditEventDialog } from "./dialogs/edit-event-dialog";
import { FilterEventDialog } from "./dialogs/filter-event-dialog";
import { ViewEventDialog } from "./dialogs/view-event-dialog";

// Mock data - replace with actual API call
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Webinar Investasi untuk Pemula",
    speaker: "John Doe",
    category: "gratis",
    date: new Date("2025-02-15"),
    time: "10:00",
    registrationLink: "https://example.com/register/1",
    banner: "/banners/event-1.jpg",
    description: "Webinar tentang dasar-dasar investasi untuk pemula",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    title: "Workshop Trading Advanced",
    speaker: "Jane Smith",
    category: "premium",
    date: new Date("2025-02-20"),
    time: "14:00",
    registrationLink: "https://example.com/register/2",
    banner: "/banners/event-2.jpg",
    description: "Workshop lanjutan tentang teknik trading",
    createdAt: new Date("2025-01-14"),
    updatedAt: new Date("2025-01-14"),
  },
];

export default function EventContainer() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const filteredEvents = events.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.speaker.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "title",
      header: "Judul",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.title}</div>
      ),
    },
    {
      accessorKey: "speaker",
      header: "Pembicara",
    },
    {
      accessorKey: "category",
      header: "Kategori",
      cell: ({ row }) => {
        const category = row.original.category;
        return (
          <span className="capitalize">
            {category === "gratis" ? "Gratis" : "Premium"}
          </span>
        );
      },
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
      accessorKey: "time",
      header: "Waktu",
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
            onClick={() => setViewingEvent(row.original)}
          >
            <Icon icon="lucide:eye" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingEvent(row.original)}
          >
            <Icon icon="lucide:pencil" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeletingEvent(row.original)}
          >
            <Icon icon="lucide:trash" className="text-destructive h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleCreate = (data: EventFormData) => {
    const newEvent: Event = {
      title: data.title,
      speaker: data.speaker,
      category: data.category,
      date: typeof data.date === "string" ? new Date(data.date) : data.date,
      time: data.time,
      registrationLink: data.registrationLink,
      banner:
        typeof data.banner === "string"
          ? data.banner
          : URL.createObjectURL(data.banner),
      description: data.description,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setEvents([newEvent, ...events]);
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (data: Omit<Event, "id" | "createdAt">) => {
    if (!editingEvent) return;
    setEvents(
      events.map((item) =>
        item.id === editingEvent.id
          ? {
              ...data,
              id: editingEvent.id,
              createdAt: editingEvent.createdAt,
              updatedAt: new Date(),
            }
          : item,
      ),
    );
    setEditingEvent(null);
  };

  const handleDelete = () => {
    if (!deletingEvent) return;
    setEvents(events.filter((item) => item.id !== deletingEvent.id));
    setDeletingEvent(null);
  };

  return (
    <div className="bg-background space-y-6 rounded-lg p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Event Management</h1>
        <p className="text-muted-foreground">
          Kelola event dan webinar dengan mudah.
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
            placeholder="Search by title, speaker, description..."
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
          Add Event
        </Button>
      </div>

      {/* Data Table */}
      <DataTable data={filteredEvents} columns={columns} rowsPerPage={10} />

      {/* Dialogs */}
      <CreateEventDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
      />
      <EditEventDialog
        open={!!editingEvent}
        onOpenChange={(open) => !open && setEditingEvent(null)}
        event={editingEvent}
        onSubmit={handleEdit}
      />
      <ViewEventDialog
        open={!!viewingEvent}
        onOpenChange={(open) => !open && setViewingEvent(null)}
        event={viewingEvent}
      />
      <DeleteEventDialog
        open={!!deletingEvent}
        onOpenChange={(open) => !open && setDeletingEvent(null)}
        event={deletingEvent}
        onConfirm={handleDelete}
      />
      <FilterEventDialog
        open={isFilterDialogOpen}
        onOpenChange={setIsFilterDialogOpen}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </div>
  );
}

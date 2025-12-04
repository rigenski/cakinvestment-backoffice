"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Signal, SignalFormData } from "../types";
import { CreateSignalDialog } from "./dialogs/create-signal-dialog";
import { DeleteSignalDialog } from "./dialogs/delete-signal-dialog";
import { EditSignalDialog } from "./dialogs/edit-signal-dialog";
import { FilterSignalDialog } from "./dialogs/filter-signal-dialog";
import { ViewSignalDialog } from "./dialogs/view-signal-dialog";

// Mock data - replace with actual API call
const mockSignals: Signal[] = [
  {
    id: "1",
    emitenCode: "BBCA",
    emitenName: "Bank Central Asia",
    type: "short term",
    stopLoss: 8500,
    takeProfit: 9000,
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    emitenCode: "TLKM",
    emitenName: "Telkom Indonesia",
    type: "swing",
    stopLoss: 3500,
    tp1: 3800,
    tp2: 4000,
    tp3: 4200,
    createdAt: new Date("2025-01-14"),
    updatedAt: new Date("2025-01-14"),
  },
  {
    id: "3",
    emitenCode: "BBRI",
    emitenName: "Bank Rakyat Indonesia",
    type: "long term",
    target: 5000,
    createdAt: new Date("2025-01-13"),
    updatedAt: new Date("2025-01-13"),
  },
];

export default function SignalContainer() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [editingSignal, setEditingSignal] = useState<Signal | null>(null);
  const [viewingSignal, setViewingSignal] = useState<Signal | null>(null);
  const [deletingSignal, setDeletingSignal] = useState<Signal | null>(null);
  const [signals, setSignals] = useState<Signal[]>(mockSignals);

  const filteredSignals = signals.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.emitenCode.toLowerCase().includes(search.toLowerCase()) ||
      item.emitenName.toLowerCase().includes(search.toLowerCase());
    const matchesType = !selectedType || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const columns: ColumnDef<Signal>[] = [
    {
      accessorKey: "emitenCode",
      header: "Kode Emiten",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.emitenCode}</div>
      ),
    },
    {
      accessorKey: "emitenName",
      header: "Nama Emiten",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.original.type;
        return (
          <span className="capitalize">
            {type === "short term"
              ? "Short Term"
              : type === "swing"
                ? "Swing"
                : "Long Term"}
          </span>
        );
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
            onClick={() => setViewingSignal(row.original)}
          >
            <Icon icon="lucide:eye" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingSignal(row.original)}
          >
            <Icon icon="lucide:pencil" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeletingSignal(row.original)}
          >
            <Icon icon="lucide:trash" className="text-destructive h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleCreate = (data: SignalFormData) => {
    const newSignal: Signal = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSignals([newSignal, ...signals]);
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (data: Omit<Signal, "id" | "createdAt">) => {
    if (!editingSignal) return;
    setSignals(
      signals.map((item) =>
        item.id === editingSignal.id
          ? {
              ...data,
              id: editingSignal.id,
              createdAt: editingSignal.createdAt,
              updatedAt: new Date(),
            }
          : item,
      ),
    );
    setEditingSignal(null);
  };

  const handleDelete = () => {
    if (!deletingSignal) return;
    setSignals(signals.filter((item) => item.id !== deletingSignal.id));
    setDeletingSignal(null);
  };

  return (
    <div className="bg-background space-y-6 rounded-lg p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Signal Management</h1>
        <p className="text-muted-foreground">
          Kelola sinyal investasi dengan mudah.
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
            placeholder="Search by kode emiten, nama emiten..."
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
          Add Signal
        </Button>
      </div>

      {/* Data Table */}
      <DataTable data={filteredSignals} columns={columns} rowsPerPage={10} />

      {/* Dialogs */}
      <CreateSignalDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
      />
      <EditSignalDialog
        open={!!editingSignal}
        onOpenChange={(open) => !open && setEditingSignal(null)}
        signal={editingSignal}
        onSubmit={handleEdit}
      />
      <ViewSignalDialog
        open={!!viewingSignal}
        onOpenChange={(open) => !open && setViewingSignal(null)}
        signal={viewingSignal}
      />
      <DeleteSignalDialog
        open={!!deletingSignal}
        onOpenChange={(open) => !open && setDeletingSignal(null)}
        signal={deletingSignal}
        onConfirm={handleDelete}
      />
      <FilterSignalDialog
        open={isFilterDialogOpen}
        onOpenChange={setIsFilterDialogOpen}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />
    </div>
  );
}




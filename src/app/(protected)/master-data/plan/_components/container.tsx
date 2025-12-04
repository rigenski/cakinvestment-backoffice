"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Plan, PlanFormData } from "../types";
import { CreatePlanDialog } from "./dialogs/create-plan-dialog";
import { DeletePlanDialog } from "./dialogs/delete-plan-dialog";
import { EditPlanDialog } from "./dialogs/edit-plan-dialog";
import { ViewPlanDialog } from "./dialogs/view-plan-dialog";

// Mock data - replace with actual API call
const mockPlans: Plan[] = [
  {
    id: "1",
    title: "Plan Basic",
    description: "Paket dasar untuk pemula yang ingin memulai investasi",
    duration: 1,
    originalPrice: 100000,
    discountPrice: 80000,
    features: ["Akses semua artikel", "Notifikasi harian", "Support email"],
    isRecommended: false,
    status: "active",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    title: "Plan Premium",
    description: "Paket premium dengan fitur lengkap untuk investor berpengalaman",
    duration: 3,
    originalPrice: 300000,
    discountPrice: 240000,
    features: [
      "Akses semua artikel",
      "Notifikasi harian",
      "Support email",
      "Analisis mendalam",
      "Webinar eksklusif",
    ],
    isRecommended: true,
    status: "active",
    createdAt: new Date("2025-01-14"),
    updatedAt: new Date("2025-01-14"),
  },
];

export default function PlanContainer() {
  const [search, setSearch] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [viewingPlan, setViewingPlan] = useState<Plan | null>(null);
  const [deletingPlan, setDeletingPlan] = useState<Plan | null>(null);
  const [plans, setPlans] = useState<Plan[]>(mockPlans);

  const filteredPlans = plans.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const columns: ColumnDef<Plan>[] = [
    {
      accessorKey: "title",
      header: "Judul",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.title}</div>
      ),
    },
    {
      accessorKey: "duration",
      header: "Durasi",
      cell: ({ row }) => (
        <div>{row.original.duration} bulan</div>
      ),
    },
    {
      accessorKey: "originalPrice",
      header: "Harga Awal",
      cell: ({ row }) => {
        const price = row.original.originalPrice;
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(price);
      },
    },
    {
      accessorKey: "discountPrice",
      header: "Harga Discount",
      cell: ({ row }) => {
        const price = row.original.discountPrice;
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(price);
      },
    },
    {
      accessorKey: "features",
      header: "Jumlah Fitur",
      cell: ({ row }) => (
        <div>{row.original.features.length} fitur</div>
      ),
    },
    {
      accessorKey: "isRecommended",
      header: "Rekomendasi",
      cell: ({ row }) => (
        <div>
          {row.original.isRecommended ? (
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
              Ya
            </span>
          ) : (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">
              Tidak
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div>
          {row.original.status === "active" ? (
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
              Active
            </span>
          ) : (
            <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
              Inactive
            </span>
          )}
        </div>
      ),
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
            onClick={() => setViewingPlan(row.original)}
          >
            <Icon icon="lucide:eye" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingPlan(row.original)}
          >
            <Icon icon="lucide:pencil" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeletingPlan(row.original)}
          >
            <Icon icon="lucide:trash" className="text-destructive h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleCreate = (data: PlanFormData) => {
    const newPlan: Plan = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setPlans([newPlan, ...plans]);
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (data: Omit<Plan, "id" | "createdAt">) => {
    if (!editingPlan) return;
    setPlans(
      plans.map((item) =>
        item.id === editingPlan.id
          ? {
              ...data,
              id: editingPlan.id,
              createdAt: editingPlan.createdAt,
              updatedAt: new Date(),
            }
          : item,
      ),
    );
    setEditingPlan(null);
  };

  const handleDelete = () => {
    if (!deletingPlan) return;
    setPlans(plans.filter((item) => item.id !== deletingPlan.id));
    setDeletingPlan(null);
  };

  return (
    <div className="bg-background space-y-6 rounded-lg p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Plan Management</h1>
        <p className="text-muted-foreground">
          Kelola paket langganan dan pricing dengan mudah.
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
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="default" onClick={() => setIsCreateDialogOpen(true)}>
          <Icon icon="lucide:plus" className="mr-2 h-4 w-4" />
          Add Plan
        </Button>
      </div>

      {/* Data Table */}
      <DataTable data={filteredPlans} columns={columns} rowsPerPage={10} />

      {/* Dialogs */}
      <CreatePlanDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
      />
      <EditPlanDialog
        open={!!editingPlan}
        onOpenChange={(open) => !open && setEditingPlan(null)}
        plan={editingPlan}
        onSubmit={handleEdit}
      />
      <ViewPlanDialog
        open={!!viewingPlan}
        onOpenChange={(open) => !open && setViewingPlan(null)}
        plan={viewingPlan}
      />
      <DeletePlanDialog
        open={!!deletingPlan}
        onOpenChange={(open) => !open && setDeletingPlan(null)}
        plan={deletingPlan}
        onConfirm={handleDelete}
      />
    </div>
  );
}


"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Promo, PromoFormData } from "../types";
import { CreatePromoDialog } from "./dialogs/create-promo-dialog";
import { DeletePromoDialog } from "./dialogs/delete-promo-dialog";
import { EditPromoDialog } from "./dialogs/edit-promo-dialog";
import { ViewPromoDialog } from "./dialogs/view-promo-dialog";

// Mock data - replace with actual API call
const mockPromos: Promo[] = [
  {
    id: "1",
    code: "WELCOME10",
    discountType: "percentage",
    discount: 10,
    minPurchase: 0,
    maxDiscount: 100000,
    validFrom: new Date("2025-01-01T00:00:00"),
    validUntil: new Date("2025-01-31T23:59:59"),
    usageLimit: 100,
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    code: "NEWYEAR50K",
    discountType: "fixed",
    discount: 50000,
    minPurchase: 200000,
    maxDiscount: 50000,
    validFrom: new Date("2025-01-01T00:00:00"),
    validUntil: new Date("2025-01-31T23:59:59"),
    usageLimit: 50,
    createdAt: new Date("2025-01-14"),
    updatedAt: new Date("2025-01-14"),
  },
];

export default function PromoContainer() {
  const [search, setSearch] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promo | null>(null);
  const [viewingPromo, setViewingPromo] = useState<Promo | null>(null);
  const [deletingPromo, setDeletingPromo] = useState<Promo | null>(null);
  const [promos, setPromos] = useState<Promo[]>(mockPromos);

  const filteredPromos = promos.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.code.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const columns: ColumnDef<Promo>[] = [
    {
      accessorKey: "code",
      header: "Kode Promo",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.code}</div>
      ),
    },
    {
      accessorKey: "discountType",
      header: "Tipe Diskon",
      cell: ({ row }) => {
        const type = row.original.discountType;
        return type === "percentage" ? "Percentage (%)" : "Fixed Amount";
      },
    },
    {
      accessorKey: "discount",
      header: "Diskon",
      cell: ({ row }) => {
        const promo = row.original;
        return promo.discountType === "percentage"
          ? `${promo.discount}%`
          : new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(promo.discount);
      },
    },
    {
      accessorKey: "minPurchase",
      header: "Min. Pembelian",
      cell: ({ row }) => {
        const price = row.original.minPurchase;
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(price);
      },
    },
    {
      accessorKey: "validFrom",
      header: "Valid From",
      cell: ({ row }) => {
        const date = row.original.validFrom;
        return date.toLocaleString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      accessorKey: "validUntil",
      header: "Valid Until",
      cell: ({ row }) => {
        const date = row.original.validUntil;
        return date.toLocaleString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      accessorKey: "usageLimit",
      header: "Usage Limit",
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
            onClick={() => setViewingPromo(row.original)}
          >
            <Icon icon="lucide:eye" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingPromo(row.original)}
          >
            <Icon icon="lucide:pencil" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeletingPromo(row.original)}
          >
            <Icon icon="lucide:trash" className="text-destructive h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleCreate = (data: PromoFormData) => {
    const newPromo: Promo = {
      code: data.code,
      discountType: data.discountType,
      discount: data.discount,
      minPurchase: data.minPurchase,
      maxDiscount: data.maxDiscount,
      validFrom: new Date(data.validFrom),
      validUntil: new Date(data.validUntil),
      usageLimit: data.usageLimit,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setPromos([newPromo, ...promos]);
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (data: Omit<Promo, "id" | "createdAt">) => {
    if (!editingPromo) return;
    setPromos(
      promos.map((item) =>
        item.id === editingPromo.id
          ? {
              ...data,
              id: editingPromo.id,
              createdAt: editingPromo.createdAt,
              updatedAt: new Date(),
            }
          : item,
      ),
    );
    setEditingPromo(null);
  };

  const handleDelete = () => {
    if (!deletingPromo) return;
    setPromos(promos.filter((item) => item.id !== deletingPromo.id));
    setDeletingPromo(null);
  };

  return (
    <div className="bg-background space-y-6 rounded-lg p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Promo Management</h1>
        <p className="text-muted-foreground">
          Kelola kode promo dan diskon dengan mudah.
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
            placeholder="Search by code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="default" onClick={() => setIsCreateDialogOpen(true)}>
          <Icon icon="lucide:plus" className="mr-2 h-4 w-4" />
          Add Promo
        </Button>
      </div>

      {/* Data Table */}
      <DataTable data={filteredPromos} columns={columns} rowsPerPage={10} />

      {/* Dialogs */}
      <CreatePromoDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
      />
      <EditPromoDialog
        open={!!editingPromo}
        onOpenChange={(open) => !open && setEditingPromo(null)}
        promo={editingPromo}
        onSubmit={handleEdit}
      />
      <ViewPromoDialog
        open={!!viewingPromo}
        onOpenChange={(open) => !open && setViewingPromo(null)}
        promo={viewingPromo}
      />
      <DeletePromoDialog
        open={!!deletingPromo}
        onOpenChange={(open) => !open && setDeletingPromo(null)}
        promo={deletingPromo}
        onConfirm={handleDelete}
      />
    </div>
  );
}


"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Participant, MemberType, ParticipantStatus } from "../types";
import { DeleteParticipantDialog } from "./dialogs/delete-participant-dialog";
import { ViewParticipantDialog } from "./dialogs/view-participant-dialog";
import { FilterParticipantDialog } from "./dialogs/filter-participant-dialog";

// Mock data - replace with actual API call
const mockParticipants: Participant[] = [
  {
    id: "1",
    name: "Ahmad Budi",
    email: "ahmad.budi@email.com",
    whatsapp: "081234567890",
    age: 28,
    incomeRange: "Rp 10 - 25 Juta",
    registrationDate: new Date("2025-01-15"),
    memberType: "Active Member",
    status: "Active",
    lastLogin: new Date("2025-01-20"),
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@email.com",
    whatsapp: "081987654321",
    age: 32,
    incomeRange: "Rp 25 - 50 Juta",
    registrationDate: new Date("2025-01-10"),
    memberType: "Member",
    status: "Active",
    lastLogin: new Date("2025-01-18"),
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-10"),
  },
];

export default function ParticipantContainer() {
  const [search, setSearch] = useState("");
  const [selectedMemberType, setSelectedMemberType] = useState<MemberType | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ParticipantStatus | null>(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [viewingParticipant, setViewingParticipant] = useState<Participant | null>(null);
  const [deletingParticipant, setDeletingParticipant] = useState<Participant | null>(null);
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants);

  const filteredParticipants = participants.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.whatsapp.toLowerCase().includes(search.toLowerCase());
    const matchesMemberType =
      !selectedMemberType || item.memberType === selectedMemberType;
    const matchesStatus =
      !selectedStatus || item.status === selectedStatus;
    return matchesSearch && matchesMemberType && matchesStatus;
  });

  const columns: ColumnDef<Participant>[] = [
    {
      accessorKey: "name",
      header: "Nama",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "whatsapp",
      header: "WhatsApp",
    },
    {
      accessorKey: "age",
      header: "Umur",
      cell: ({ row }) => (
        <div>{row.original.age} tahun</div>
      ),
    },
    {
      accessorKey: "incomeRange",
      header: "Range Penghasilan",
    },
    {
      accessorKey: "memberType",
      header: "Tipe Member",
      cell: ({ row }) => {
        const memberType = row.original.memberType;
        return (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800">
            {memberType}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "registrationDate",
      header: "Tanggal Terdaftar",
      cell: ({ row }) => {
        const date = row.original.registrationDate;
        return date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      },
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ row }) => {
        const date = row.original.lastLogin;
        return date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
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
            onClick={() => setViewingParticipant(row.original)}
          >
            <Icon icon="lucide:eye" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeletingParticipant(row.original)}
          >
            <Icon icon="lucide:trash" className="text-destructive h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = () => {
    if (!deletingParticipant) return;
    setParticipants(participants.filter((item) => item.id !== deletingParticipant.id));
    setDeletingParticipant(null);
  };

  return (
    <div className="bg-background space-y-6 rounded-lg p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Participant Management</h1>
        <p className="text-muted-foreground">
          Kelola data peserta dan member dengan mudah.
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
            placeholder="Search by name, email, whatsapp..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setIsFilterDialogOpen(true)}>
          <Icon icon="lucide:filter" className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Data Table */}
      <DataTable data={filteredParticipants} columns={columns} rowsPerPage={10} />

      {/* Dialogs */}
      <ViewParticipantDialog
        open={!!viewingParticipant}
        onOpenChange={(open) => !open && setViewingParticipant(null)}
        participant={viewingParticipant}
      />
      <DeleteParticipantDialog
        open={!!deletingParticipant}
        onOpenChange={(open) => !open && setDeletingParticipant(null)}
        participant={deletingParticipant}
        onConfirm={handleDelete}
      />
      <FilterParticipantDialog
        open={isFilterDialogOpen}
        onOpenChange={setIsFilterDialogOpen}
        selectedMemberType={selectedMemberType}
        selectedStatus={selectedStatus}
        onMemberTypeChange={setSelectedMemberType}
        onStatusChange={setSelectedStatus}
      />
    </div>
  );
}


"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { services } from "@/services";
import TableLayout from "@/components/table-layout";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import { SingleSelect } from "@/components/single-select";
import Link from "next/link";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { toast } from "sonner";
import { IModalRef } from "@/components/modal";
import { createColumns } from "./columns";

export default function TableAkademi() {
    const queryClient = useQueryClient();
    const deleteRef = useRef<IModalRef>(null);

    const [moduleId, setModuleId] = useState<string | null>(null);

    const {
        setPage,
        setRows,
        setSearch,
        page,
        rows,
        setFilter,
        filters,
        params,
    } = useQueryBuilder({
        defaultRows: 10,
        defaultSearchKeys: ["title", "teacher", "description"],
    });

    const { data, isLoading } = useQuery(
        services.masterData.akademi.getAll(params)
    );

    const deleteFn = useMutation(services.masterData.akademi.remove());

    const onDelete = () => {
        if (!moduleId) return;

        deleteFn.mutate(moduleId, {
            onSuccess: (res) => {
                toast.success(res.message);
                queryClient.invalidateQueries({
                    queryKey: services.masterData.akademi.getAll().queryKey,
                });

                deleteRef.current?.close();
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    };

    const columns = createColumns({
        onDelete: (id: string) => {
            setModuleId(id);
            deleteRef.current?.open();
        },
    });

    const entries = data?.content?.entries || [];
    const totalData = data?.content?.totalData || 0;
    const totalPages = data?.content?.totalPage || 1;

    const categories = Array.from(
        new Set(entries.map((m) => m.category))
    ).sort();

    const onSelectCategory = (value: string) => {
        setFilter("category", value);
    };

    return (
        <TableLayout
            title="Akademi Management"
            description="Kelola modul pembelajaran dengan mudah."
            search={{
                placeholder: "Search by title, instructor, description...",
                onChange: (value) => setSearch(value),
            }}
            actions={
                <div className="flex items-center gap-4">
                    <SingleSelect
                        options={categories.map((category) => ({
                            label: category,
                            value: category,
                        }))}
                        value={filters?.category as string}
                        onChange={(value) => onSelectCategory(value as string)}
                        allOption={{
                            label: "Semua Kategori",
                            value: "all",
                        }}
                    />

                    <Link href="/master-data/akademi/create">
                        <Button variant="default">
                            <Icon icon="lucide:plus" className="mr-2 h-4 w-4" />
                            Add Module
                        </Button>
                    </Link>
                </div>
            }
        >
            {/* Data Table */}
            <DataTable
                data={entries}
                columns={columns}
                rowsPerPage={rows}
                totalData={totalData}
                pagination={{
                    currentPage: page,
                    totalPages,
                    onPageChange: setPage,
                    isFetching: isLoading,
                }}
                onRowsPerPageChange={setRows}
            />

            <ConfirmationDialog
                dialogRef={deleteRef}
                title="Delete Module"
                description="Are you sure you want to delete this module?"
                onConfirm={onDelete}
                isLoading={deleteFn.isPending}
            />
        </TableLayout>
    );
}

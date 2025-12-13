"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { services } from "@/services";
import TableLayout from "@/components/table-layout";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import { SingleSelect } from "@/components/single-select";
import { createColumns } from "./columns";
import DialogEvent, { IEventDialogRef } from "../dialogs";

export const CATEGORY_OPTIONS = [
    {
        label: "Gratis",
        value: "GRATIS",
    },
    {
        label: "Premium",
        value: "PREMIUM",
    },
];

export default function TableEvent() {
    const dialogEventRef = useRef<IEventDialogRef>(null);

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
        defaultSearchKeys: ["title", "speaker", "description"],
    });

    const { data, isLoading } = useQuery(
        services.masterData.event.getAll(params)
    );

    const columns = createColumns({
        onDetail: (id: string) => dialogEventRef.current?.openDialogDetail(id),
        onEdit(id) {
            dialogEventRef.current?.openDialogEdit(id);
        },
        onDelete: (id: string) => {
            dialogEventRef.current?.openDialogDelete(id);
        },
    });

    const entries = data?.content?.entries || [];
    const totalData = data?.content?.totalData || 0;
    const totalPages = data?.content?.totalPage || 1;

    const onSelectCategory = (value: string) => {
        setFilter("category", value);
    };

    const onAdd = () => dialogEventRef.current?.openDialogAdd();

    return (
        <TableLayout
            title="Event Management"
            description="Kelola event dan webinar dengan mudah."
            search={{
                placeholder: "Search by title, speaker, description...",
                onChange: (value) => setSearch(value),
            }}
            actions={
                <div className="flex items-center gap-4">
                    <SingleSelect
                        options={CATEGORY_OPTIONS}
                        value={filters?.category as string}
                        onChange={(value) => onSelectCategory(value as string)}
                        allOption={{
                            label: "Semua Kategori",
                            value: "all",
                        }}
                    />

                    <Button variant="default" onClick={onAdd}>
                        <Icon icon="lucide:plus" className="mr-2 h-4 w-4" />
                        Add Event
                    </Button>
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

            <DialogEvent ref={dialogEventRef} />
        </TableLayout>
    );
}

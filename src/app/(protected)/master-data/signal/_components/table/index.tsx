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
import { TYPE_OPTIONS } from "../forms";
import DialogSignal, { ISignalDialogRef } from "../dialogs";

export default function TableSignal() {
    const dialogSignalRef = useRef<ISignalDialogRef>(null);

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
        defaultSearchKeys: ["code", "name"],
    });

    const { data, isLoading } = useQuery(
        services.masterData.signal.getAll(params)
    );

    const columns = createColumns({
        onDetail: (id: string) => dialogSignalRef.current?.openDialogDetail(id),
        onEdit(id) {
            dialogSignalRef.current?.openDialogEdit(id);
        },
        onDelete: (id: string) => {
            dialogSignalRef.current?.openDialogDelete(id);
        },
    });

    const entries = data?.content?.entries || [];
    const totalData = data?.content?.totalData || 0;
    const totalPages = data?.content?.totalPage || 1;

    const onSelectCategory = (value: string) => {
        setFilter("type", value);
    };

    const onAdd = () => dialogSignalRef.current?.openDialogAdd();

    return (
        <TableLayout
            title="Signal Management"
            description="Kelola sinyal investasi dengan mudah."
            search={{
                placeholder: "Search by kode emiten, nama emiten...",
                onChange: (value) => setSearch(value),
            }}
            actions={
                <div className="flex items-center gap-4">
                    <SingleSelect
                        options={TYPE_OPTIONS}
                        value={filters?.type as string}
                        onChange={(value) => onSelectCategory(value as string)}
                        allOption={{
                            label: "Semua Kategori",
                            value: "all",
                        }}
                    />

                    <Button variant="default" onClick={onAdd}>
                        <Icon icon="lucide:plus" className="mr-2 h-4 w-4" />
                        Add Signal
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

            <DialogSignal ref={dialogSignalRef} />
        </TableLayout>
    );
}

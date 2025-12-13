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
import DialogResearch, { IResearchRef } from "../dialogs";
import { CATEGORY_OPTIONS } from "../forms";

export default function TableResearch() {
    const dialogResearchRef = useRef<IResearchRef>(null);

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
        defaultSearchKeys: ["title", "subTitle", "author"],
    });

    const { data, isLoading } = useQuery(
        services.masterData.research.getAll(params)
    );

    const columns = createColumns({
        onDetail: (id: string) =>
            dialogResearchRef.current?.openDialogDetail(id),
        onEdit(id) {
            dialogResearchRef.current?.openDialogEdit(id);
        },
        onDelete: (id: string) => {
            dialogResearchRef.current?.openDialogDelete(id);
        },
    });

    const entries = data?.content?.entries || [];
    const totalData = data?.content?.totalData || 0;
    const totalPages = data?.content?.totalPage || 1;

    const onSelectCategory = (value: string) => {
        setFilter("category", value);
    };

    const onAdd = () => dialogResearchRef.current?.openDialogAdd();

    return (
        <TableLayout
            title="Research Management"
            description="Kelola penelitian dan analisis dengan mudah."
            search={{
                placeholder: "Search by title, subtitle, author...",
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
                        Add Research
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

            <DialogResearch ref={dialogResearchRef} />
        </TableLayout>
    );
}

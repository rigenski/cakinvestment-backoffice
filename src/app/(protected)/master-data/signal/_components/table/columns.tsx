import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { TSignal } from "@/services/master-data/signal/type";

interface ICreateColumnsProps {
    onEdit: (id: string) => void;
    onDetail: (id: string) => void;
    onDelete: (id: string) => void;
}

export const createColumns = ({
    onEdit,
    onDetail,
    onDelete,
}: ICreateColumnsProps): ColumnDef<TSignal>[] => {
    return [
        {
            accessorKey: "emitenCode",
            header: "Kode Emiten",
            cell: ({ row }) => (
                <div className="font-medium">{row.original?.code ?? "-"}</div>
            ),
        },
        {
            accessorKey: "emitenName",
            header: "Nama Emiten",
            cell: ({ row }) => (
                <div className="font-medium">{row.original?.name ?? "-"}</div>
            ),
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                const type = row.original?.type ?? "";

                const format = {
                    SHORT_TERM: "Short Term",
                    SWING: "Swing",
                    LONG_TERM: "Long Term",
                };

                return (
                    <span className="capitalize">
                        {format[type as keyof typeof format] ?? "-"}
                    </span>
                );
            },
        },
        {
            accessorKey: "updatedAt",
            header: "Last Updated",
            cell: ({ row }) => {
                const date = row.original.updatedAt;
                return (
                    <span>
                        {DateTime.fromISO(date).toFormat("dd/MM/yyyy HH:mm")}
                    </span>
                );
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
                        onClick={() => onDetail(row.original.id)}
                    >
                        <Icon icon="lucide:eye" className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(row.original.id)}
                    >
                        <Icon icon="lucide:pencil" className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(row.original.id)}
                    >
                        <Icon
                            icon="lucide:trash"
                            className="text-destructive h-4 w-4"
                        />
                    </Button>
                </div>
            ),
        },
    ];
};

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { TResearch } from "@/services/master-data/research/type";

interface ICreateColumnsProps {
    onEdit: (id: string) => void;
    onDetail: (id: string) => void;
    onDelete: (id: string) => void;
}

export const createColumns = ({
    onEdit,
    onDetail,
    onDelete,
}: ICreateColumnsProps): ColumnDef<TResearch>[] => {
    return [
        {
            accessorKey: "title",
            header: "Judul",
            cell: ({ row }) => (
                <span className="font-medium">{row.original.title}</span>
            ),
        },
        {
            accessorKey: "subtitle",
            header: "Subtitle",
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.original.subTitle}
                </span>
            ),
        },
        {
            accessorKey: "category",
            header: "Kategori",
            cell: ({ row }) => (
                <span className="capitalize">{row.original.category}</span>
            ),
        },
        {
            accessorKey: "author",
            header: "Author",
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.original.author}
                </span>
            ),
        },
        {
            accessorKey: "date",
            header: "Tanggal",
            cell: ({ row }) => {
                const date = row.original.date;
                return <span>{date}</span>;
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

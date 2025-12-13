import { Button } from "@/components/ui/button";
import { TAkademi } from "@/services/master-data/akademi/type";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DateTime } from "luxon";

interface ICreateColumnsProps {
    onDelete: (id: string) => void;
}

export const createColumns = (
    { onDelete }: ICreateColumnsProps = {
        onDelete: () => {},
    }
): ColumnDef<TAkademi>[] => {
    return [
        {
            accessorKey: "title",
            header: "Judul",
            cell: ({ row }) => (
                <div className="font-medium">{row.original.title}</div>
            ),
        },
        {
            accessorKey: "instructor",
            header: "Pengajar",
            cell: ({ row }) => <span>{row.original.teacher}</span>,
        },
        {
            accessorKey: "category",
            header: "Kategori",
            cell: ({ row }) => <span>{row.original.category}</span>,
        },
        {
            accessorKey: "duration",
            header: "Durasi",
            cell: ({ row }) => {
                const duration =
                    row.original?.videoModules?.reduce((acc, curr) => {
                        return (
                            acc +
                            Number(curr.duration.split(":")[0]) * 60 +
                            Number(curr.duration.split(":")[1])
                        );
                    }, 0) || 0;

                return <span>{Math.floor(duration / 60)} minutes</span>;
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
                    <Link href={`/master-data/akademi/${row.original.id}`}>
                        <Button variant="ghost" size="sm">
                            <Icon icon="lucide:eye" className="h-4 w-4" />
                        </Button>
                    </Link>

                    <Link href={`/master-data/akademi/${row.original.id}/edit`}>
                        <Button variant="ghost" size="sm">
                            <Icon icon="lucide:pencil" className="h-4 w-4" />
                        </Button>
                    </Link>

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

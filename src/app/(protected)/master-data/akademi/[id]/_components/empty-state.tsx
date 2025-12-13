import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

interface IEmptyStateProps {
    id: string;
}

export default function EmptyState({ id }: IEmptyStateProps) {
    const router = useRouter();

    const onBack = () => router.back();

    return (
        <div className="bg-background space-y-6 rounded-lg p-6">
            <div>
                <h1 className="text-2xl font-bold">Module Not Found</h1>
                <p className="text-muted-foreground">
                    Module dengan ID {id} tidak ditemukan.
                </p>
            </div>
            <Button variant="outline" onClick={onBack}>
                <Icon icon="lucide:arrow-left" className="mr-2 h-4 w-4" />
                Kembali ke list
            </Button>
        </div>
    );
}

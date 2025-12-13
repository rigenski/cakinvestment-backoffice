"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { services } from "@/services";
import {
    schemaAkademi,
    TAkademiRequest,
} from "@/services/master-data/akademi/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AkademiForm } from "../../_components/forms";

export default function Container() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const form = useForm<TAkademiRequest>({
        resolver: zodResolver(schemaAkademi),
    });

    const onCancel = () => router.back();

    const createFn = useMutation(services.masterData.akademi.create());

    const onSubmit = form.handleSubmit((value) => {
        createFn.mutate(value, {
            onSuccess: (res) => {
                toast.success(res.message);

                queryClient.invalidateQueries({
                    queryKey: services.masterData.akademi.getAll().queryKey,
                });
                router.push("/master-data/akademi");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    });

    return (
        <div className="bg-background space-y-6 rounded-lg p-6">
            <div>
                <h1 className="text-2xl font-bold">Create Module</h1>
                <p className="text-muted-foreground">
                    Tambahkan modul pembelajaran baru ke sistem.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-4">
                    <AkademiForm />

                    <div className="flex justify-end gap-2 border-t pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={createFn.isPending}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="default"
                            disabled={createFn.isPending}
                            isLoading={createFn.isPending}
                        >
                            Create Module
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

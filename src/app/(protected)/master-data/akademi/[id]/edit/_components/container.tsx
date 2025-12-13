"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { services } from "@/services";
import {
    akademiToRequest,
    schemaAkademi,
} from "@/services/master-data/akademi/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AkademiForm } from "../../../_components/forms";
import SkeletonLoading from "../../../_components/partials/skeleton-loading";

export default function Container() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const params = useParams();
    const { id } = params as { id: string };

    const { data, isLoading } = useQuery({
        ...services.masterData.akademi.getById(id),
        enabled: !!id,
    });

    const form = useForm({
        resolver: zodResolver(schemaAkademi),
        defaultValues: akademiToRequest(data?.content),
        values: akademiToRequest(data?.content),
    });

    const updateFn = useMutation(services.masterData.akademi.update());

    const onSubmit = form.handleSubmit((value) => {
        updateFn.mutate(
            {
                id,
                data: value,
            },
            {
                onSuccess: (res) => {
                    toast.success(res.message);
                    queryClient.invalidateQueries({
                        queryKey:
                            services.masterData.akademi.getById(id).queryKey,
                    });
                    queryClient.invalidateQueries({
                        queryKey: services.masterData.akademi.getAll().queryKey,
                    });
                    router.push("/master-data/akademi");
                },
                onError: (err) => {
                    toast.error(err.message);
                },
            }
        );
    });

    const onCancel = () => router.back();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Edit Module</CardTitle>
                <CardDescription>
                    Edit modul pembelajaran yang sudah ada.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-4">
                        {isLoading ? <SkeletonLoading /> : <AkademiForm />}

                        <div className="flex justify-end gap-2 border-t pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                disabled={updateFn.isPending}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="default"
                                disabled={updateFn.isPending}
                                isLoading={updateFn.isPending}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

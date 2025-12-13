import { IModalRef, Modal } from "@/components/modal";
import { Form } from "@/components/ui/form";
import { services } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    newsToRequest,
    schemaNews,
    TNewsRequest,
} from "@/services/master-data/news/type";
import NewsForm from "../forms";

interface IDialogEditProps {
    dialogRef?: React.RefObject<IModalRef | null>;
    id: string;
}

export default function DialogEdit({ dialogRef, id }: IDialogEditProps) {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        ...services.masterData.news.getById(id),
        enabled: !!id,
    });

    const form = useForm<TNewsRequest>({
        resolver: zodResolver(schemaNews),
        values: newsToRequest(data?.content),
        defaultValues: newsToRequest(data?.content),
    });

    const updateFn = useMutation(services.masterData.news.update());

    const onSubmit = form.handleSubmit((value) => {
        updateFn.mutate(
            { id, data: value },
            {
                onSuccess: (res) => {
                    toast.success(res.message);
                    queryClient.invalidateQueries({
                        queryKey: services.masterData.news.getAll().queryKey,
                    });
                    queryClient.invalidateQueries({
                        queryKey: services.masterData.news.getById(id).queryKey,
                    });

                    dialogRef?.current?.close();
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            }
        );
    });

    const onCancel = () => dialogRef?.current?.close();

    return (
        <Modal
            ref={dialogRef}
            title="Edit News"
            description="Edit berita yang sudah ada."
            className="max-w-4xl!"
        >
            <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-4">
                    <NewsForm />

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
        </Modal>
    );
}

import { IModalRef, Modal } from "@/components/modal";
import { Form } from "@/components/ui/form";
import { services } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ResearchForm from "../../../research/_components/forms";
import { schemaEvent, TEventRequest } from "@/services/master-data/event/type";

interface IDialogAddProps {
    dialogRef?: React.RefObject<IModalRef | null>;
}

export default function DialogAdd({ dialogRef }: IDialogAddProps) {
    const queryClient = useQueryClient();

    const form = useForm<TEventRequest>({
        resolver: zodResolver(schemaEvent),
    });

    const createFn = useMutation(services.masterData.event.create());

    const onSubmit = form.handleSubmit((value) => {
        createFn.mutate(value, {
            onSuccess: (res) => {
                toast.success(res.message);
                queryClient.invalidateQueries({
                    queryKey: services.masterData.event.getAll().queryKey,
                });

                dialogRef?.current?.close();
                form.reset({
                    title: "",
                    speaker: "",
                    category: "GRATIS",
                    date: new Date().toISOString().split("T")[0],
                    time: "",
                    registrationLink: "",
                    bannerUrl: "",
                    description: "",
                } as TEventRequest);
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    });

    const onCancel = () => dialogRef?.current?.close();

    return (
        <Modal
            ref={dialogRef}
            title="Create Event"
            description="Tambahkan event baru ke sistem."
            className="max-w-4xl!"
        >
            <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-4">
                    <ResearchForm />

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
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    );
}

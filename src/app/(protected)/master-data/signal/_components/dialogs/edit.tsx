import { IModalRef, Modal } from "@/components/modal";
import { Form } from "@/components/ui/form";
import { services } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    schemaSignal,
    signalToRequest,
    TSignalRequest,
} from "@/services/master-data/signal/type";
import SignalForm from "../forms";

interface IDialogEditProps {
    dialogRef?: React.RefObject<IModalRef | null>;
    id: string;
}

export default function DialogEdit({ dialogRef, id }: IDialogEditProps) {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        ...services.masterData.signal.getById(id),
        enabled: !!id,
    });

    const form = useForm<TSignalRequest>({
        resolver: zodResolver(schemaSignal),
        values: signalToRequest(data?.content),
        defaultValues: signalToRequest(data?.content),
    });

    const updateFn = useMutation(services.masterData.signal.update());

    const onSubmit = form.handleSubmit((value) => {
        updateFn.mutate(
            { id, data: value },
            {
                onSuccess: (res) => {
                    toast.success(res.message);
                    queryClient.invalidateQueries({
                        queryKey: services.masterData.signal.getAll().queryKey,
                    });
                    queryClient.invalidateQueries({
                        queryKey:
                            services.masterData.signal.getById(id).queryKey,
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

    console.log("Errors : ", form.formState.errors);
    console.log("Errors : ", form.watch());

    return (
        <Modal
            ref={dialogRef}
            title="Edit Signal"
            description="Edit sinyal yang sudah ada."
            className="max-w-4xl!"
        >
            <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-4">
                    <SignalForm />

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

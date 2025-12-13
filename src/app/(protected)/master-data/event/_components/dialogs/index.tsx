import { IModalRef } from "@/components/modal";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import DialogAdd from "./add";
import DialogEdit from "./edit";
import DialogDetail from "./detail";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { services } from "@/services";
import { toast } from "sonner";

export interface IEventDialogRef {
    openDialogAdd: () => void;
    openDialogEdit: (id: string) => void;
    openDialogDetail: (id: string) => void;
    openDialogDelete: (id: string) => void;
}

interface IEventDialogProps {
    ref?: React.Ref<IEventDialogRef>;
}

const DialogEvent = forwardRef<IEventDialogRef, IEventDialogProps>(
    (_props, ref) => {
        const queryClient = useQueryClient();

        const [eventId, setEventId] = useState("");

        const dialogAddRef = useRef<IModalRef>(null);
        const dialogEditRef = useRef<IModalRef>(null);
        const dialogDetailRef = useRef<IModalRef>(null);
        const dialogDeleteRef = useRef<IModalRef>(null);

        useImperativeHandle(ref, () => ({
            openDialogAdd: () => dialogAddRef.current?.open(),
            openDialogEdit: (id: string) => {
                setEventId(id);
                dialogEditRef.current?.open();
            },
            openDialogDetail: (id: string) => {
                setEventId(id);
                dialogDetailRef.current?.open();
            },
            openDialogDelete: (id: string) => {
                setEventId(id);
                dialogDeleteRef.current?.open();
            },
        }));

        const deleteFn = useMutation(services.masterData.event.remove());

        const onDelete = () => {
            if (!eventId) return;

            deleteFn.mutate(eventId, {
                onSuccess: (res) => {
                    toast.success(res.message);
                    queryClient.invalidateQueries({
                        queryKey: services.masterData.event.getAll().queryKey,
                    });

                    dialogDeleteRef.current?.close();
                    setEventId("");
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            });
        };

        return (
            <>
                <DialogAdd dialogRef={dialogAddRef} />

                <DialogEdit dialogRef={dialogEditRef} id={eventId} />

                <DialogDetail dialogRef={dialogDetailRef} id={eventId} />

                <ConfirmationDialog
                    dialogRef={dialogDeleteRef}
                    title="Delete Event"
                    description={`Apakah Anda yakin ingin menghapus event ini? Tindakan ini tidak dapat dibatalkan.`}
                    onConfirm={onDelete}
                    isLoading={deleteFn.isPending}
                />
            </>
        );
    }
);

export default DialogEvent;

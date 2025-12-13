import { IModalRef } from "@/components/modal";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import DialogAdd from "./add";
import DialogEdit from "./edit";
import DialogDetail from "./detail";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { services } from "@/services";
import { toast } from "sonner";

export interface ISignalDialogRef {
    openDialogAdd: () => void;
    openDialogEdit: (id: string) => void;
    openDialogDetail: (id: string) => void;
    openDialogDelete: (id: string) => void;
}

interface ISignalDialogProps {
    ref?: React.Ref<ISignalDialogRef>;
}

const DialogSignal = forwardRef<ISignalDialogRef, ISignalDialogProps>(
    (_props, ref) => {
        const queryClient = useQueryClient();

        const [signalId, setSignalId] = useState("");

        const dialogAddRef = useRef<IModalRef>(null);
        const dialogEditRef = useRef<IModalRef>(null);
        const dialogDetailRef = useRef<IModalRef>(null);
        const dialogDeleteRef = useRef<IModalRef>(null);

        useImperativeHandle(ref, () => ({
            openDialogAdd: () => dialogAddRef.current?.open(),
            openDialogEdit: (id: string) => {
                setSignalId(id);
                dialogEditRef.current?.open();
            },
            openDialogDetail: (id: string) => {
                setSignalId(id);
                dialogDetailRef.current?.open();
            },
            openDialogDelete: (id: string) => {
                setSignalId(id);
                dialogDeleteRef.current?.open();
            },
        }));

        const deleteFn = useMutation(services.masterData.signal.remove());

        const onDelete = () => {
            if (!signalId) return;

            deleteFn.mutate(signalId, {
                onSuccess: (res) => {
                    toast.success(res.message);
                    queryClient.invalidateQueries({
                        queryKey: services.masterData.signal.getAll().queryKey,
                    });

                    dialogDeleteRef.current?.close();
                    setSignalId("");
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            });
        };

        return (
            <>
                <DialogAdd dialogRef={dialogAddRef} />

                <DialogEdit dialogRef={dialogEditRef} id={signalId} />

                <DialogDetail dialogRef={dialogDetailRef} id={signalId} />

                <ConfirmationDialog
                    dialogRef={dialogDeleteRef}
                    title="Delete Signal"
                    description={`Apakah Anda yakin ingin menghapus Sinyal ini? Tindakan ini tidak dapat dibatalkan.`}
                    onConfirm={onDelete}
                    isLoading={deleteFn.isPending}
                />
            </>
        );
    }
);

export default DialogSignal;

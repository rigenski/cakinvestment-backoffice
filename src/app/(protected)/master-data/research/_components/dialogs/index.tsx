import { IModalRef } from "@/components/modal";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import DialogAdd from "./add";
import DialogEdit from "./edit";
import DialogDetail from "./detail";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { services } from "@/services";
import { toast } from "sonner";

export interface IResearchRef {
    openDialogAdd: () => void;
    openDialogEdit: (id: string) => void;
    openDialogDetail: (id: string) => void;
    openDialogDelete: (id: string) => void;
}

interface IResearchDialogProps {
    ref?: React.Ref<IResearchRef>;
}

const DialogResearch = forwardRef<IResearchRef, IResearchDialogProps>(
    (_props, ref) => {
        const queryClient = useQueryClient();

        const [researchId, setResearchId] = useState("");

        const dialogAddRef = useRef<IModalRef>(null);
        const dialogEditRef = useRef<IModalRef>(null);
        const dialogDetailRef = useRef<IModalRef>(null);
        const dialogDeleteRef = useRef<IModalRef>(null);

        useImperativeHandle(ref, () => ({
            openDialogAdd: () => dialogAddRef.current?.open(),
            openDialogEdit: (id: string) => {
                setResearchId(id);
                dialogEditRef.current?.open();
            },
            openDialogDetail: (id: string) => {
                setResearchId(id);
                dialogDetailRef.current?.open();
            },
            openDialogDelete: (id: string) => {
                setResearchId(id);
                dialogDeleteRef.current?.open();
            },
        }));

        const deleteFn = useMutation(services.masterData.research.remove());

        const onDelete = () => {
            if (!researchId) return;

            deleteFn.mutate(researchId, {
                onSuccess: (res) => {
                    toast.success(res.message);
                    queryClient.invalidateQueries({
                        queryKey:
                            services.masterData.research.getAll().queryKey,
                    });

                    dialogDeleteRef.current?.close();
                    setResearchId("");
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            });
        };

        return (
            <>
                <DialogAdd dialogRef={dialogAddRef} />

                <DialogEdit dialogRef={dialogEditRef} id={researchId} />

                <DialogDetail dialogRef={dialogDetailRef} id={researchId} />

                <ConfirmationDialog
                    dialogRef={dialogDeleteRef}
                    title="Delete Research"
                    description={`Apakah Anda yakin ingin menghapus Penelitian ini? Tindakan ini tidak dapat dibatalkan.`}
                    onConfirm={onDelete}
                    isLoading={deleteFn.isPending}
                />
            </>
        );
    }
);

export default DialogResearch;

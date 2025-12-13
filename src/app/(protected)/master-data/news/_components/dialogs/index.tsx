import { IModalRef } from "@/components/modal";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import DialogAdd from "./add";
import DialogEdit from "./edit";
import DialogDetail from "./detail";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { services } from "@/services";
import { toast } from "sonner";

export interface INewsDialogRef {
    openDialogAdd: () => void;
    openDialogEdit: (id: string) => void;
    openDialogDetail: (id: string) => void;
    openDialogDelete: (id: string) => void;
}

interface INewsDialogProps {
    ref?: React.Ref<INewsDialogRef>;
}

const DialogNews = forwardRef<INewsDialogRef, INewsDialogProps>(
    (_props, ref) => {
        const queryClient = useQueryClient();

        const [newsId, setNewsId] = useState("");

        const dialogAddRef = useRef<IModalRef>(null);
        const dialogEditRef = useRef<IModalRef>(null);
        const dialogDetailRef = useRef<IModalRef>(null);
        const dialogDeleteRef = useRef<IModalRef>(null);

        useImperativeHandle(ref, () => ({
            openDialogAdd: () => dialogAddRef.current?.open(),
            openDialogEdit: (id: string) => {
                setNewsId(id);
                dialogEditRef.current?.open();
            },
            openDialogDetail: (id: string) => {
                setNewsId(id);
                dialogDetailRef.current?.open();
            },
            openDialogDelete: (id: string) => {
                setNewsId(id);
                dialogDeleteRef.current?.open();
            },
        }));

        const deleteFn = useMutation(services.masterData.news.remove());

        const onDelete = () => {
            if (!newsId) return;

            deleteFn.mutate(newsId, {
                onSuccess: (res) => {
                    toast.success(res.message);
                    queryClient.invalidateQueries({
                        queryKey: services.masterData.news.getAll().queryKey,
                    });

                    dialogDeleteRef.current?.close();
                    setNewsId("");
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            });
        };

        return (
            <>
                <DialogAdd dialogRef={dialogAddRef} />

                <DialogEdit dialogRef={dialogEditRef} id={newsId} />

                <DialogDetail dialogRef={dialogDetailRef} id={newsId} />

                <ConfirmationDialog
                    dialogRef={dialogDeleteRef}
                    title="Delete News"
                    description={`Apakah Anda yakin ingin menghapus Berita ini? Tindakan ini tidak dapat dibatalkan.`}
                    onConfirm={onDelete}
                    isLoading={deleteFn.isPending}
                />
            </>
        );
    }
);

export default DialogNews;

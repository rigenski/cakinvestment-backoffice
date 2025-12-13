import { IModalRef, Modal } from "./modal";
import { Button } from "./ui/button";

interface IConfirmationDialogProps {
    title: string;
    description: string;
    onConfirm: () => void;
    isLoading: boolean;
    dialogRef?: React.RefObject<IModalRef | null>;
}

export default function ConfirmationDialog({
    title,
    description,
    onConfirm,
    isLoading,
    dialogRef,
}: IConfirmationDialogProps) {
    const onCancel = () => dialogRef?.current?.close();

    return (
        <Modal ref={dialogRef}>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center flex-col gap-1">
                    <h1 className="text-xl text-center font-bold">{title}</h1>
                    <p className="text-sm text-center text-gray-500">
                        {description}
                    </p>
                </div>
                <div className="flex justify-center gap-2">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isLoading}
                        isLoading={isLoading}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

import { IModalRef, Modal } from "@/components/modal";
import { services } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { DateTime } from "luxon";

interface IDialogDetailProps {
    dialogRef?: React.RefObject<IModalRef | null>;
    id: string;
}

export default function DialogDetail({ dialogRef, id }: IDialogDetailProps) {
    const { data, isLoading } = useQuery({
        ...services.masterData.signal.getById(id),
        enabled: !!id,
    });

    const content = data?.content;

    const TYPE_FORMAT = {
        SHORT_TERM: "Short Term",
        SWING: "Swing",
        LONG_TERM: "Long Term",
    };

    return (
        <Modal
            ref={dialogRef}
            title={`${content?.code} - ${content?.name}`}
            description="Detail Informasi sinyal yang sudah ada."
            className="max-w-4xl!"
        >
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Kode Emiten
                        </p>
                        {isLoading ? (
                            <Skeleton className="h-4 w-full" />
                        ) : (
                            <p className="text-sm capitalize">
                                {content?.code ?? "-"}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Nama Emiten
                        </p>

                        {isLoading ? (
                            <Skeleton className="h-4 w-full" />
                        ) : (
                            <p className="text-sm">{content?.name ?? "-"}</p>
                        )}
                    </div>

                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Type
                        </p>

                        {isLoading ? (
                            <Skeleton className="h-4 w-full" />
                        ) : (
                            <p className="text-sm">
                                {TYPE_FORMAT[
                                    content?.type as keyof typeof TYPE_FORMAT
                                ] ?? "-"}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Last Updated
                        </p>
                        {isLoading ? (
                            <Skeleton className="h-4 w-full" />
                        ) : (
                            <p className="text-sm">
                                {DateTime.fromISO(
                                    content?.updatedAt || ""
                                ).toFormat("dd/MM/yyyy HH:mm")}
                            </p>
                        )}
                    </div>
                </div>

                {content?.type === "SHORT_TERM" && (
                    <div className="grid grid-cols-2 gap-4">
                        {content?.stopLoss !== undefined && (
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Stop Loss
                                </p>
                                <p className="text-sm">
                                    {content?.stopLoss ?? "-"}
                                </p>
                            </div>
                        )}
                        {content?.takeProfitSignals?.length > 0 && (
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Take Profit
                                </p>
                                <p className="text-sm">
                                    {content?.takeProfitSignals?.[0]
                                        ?.takeProfit ?? "-"}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {content?.type === "SWING" && (
                    <div className="space-y-4">
                        {content?.stopLoss !== undefined && (
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Stop Loss
                                </p>
                            </div>
                        )}

                        {content?.takeProfitSignals?.length > 0 && (
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">
                                    Take Profit
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    {content?.takeProfitSignals?.map((tp) => (
                                        <div key={tp.id}>
                                            <p className="text-sm font-medium text-muted-foreground">
                                                TP {tp.order}
                                            </p>
                                            <p className="text-sm">
                                                {tp.takeProfit ?? "-"}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {content?.type === "LONG_TERM" && (
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Target
                        </p>
                        <p className="text-sm">{content?.target ?? "-"}</p>
                    </div>
                )}
            </div>
        </Modal>
    );
}

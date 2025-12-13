import { IModalRef, Modal } from "@/components/modal";
import { services } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DateTime } from "luxon";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { getFilenameFromUrl } from "@/utils/string";

interface IDialogDetailProps {
    dialogRef?: React.RefObject<IModalRef | null>;
    id: string;
}

export default function DialogDetail({ dialogRef, id }: IDialogDetailProps) {
    const { data, isLoading } = useQuery({
        ...services.masterData.research.getById(id),
        enabled: !!id,
    });

    const content = data?.content;

    return (
        <Modal
            ref={dialogRef}
            title={content?.title}
            description="Detail Informasi penelitian yang sudah ada."
            className="max-w-4xl!"
        >
            <div className="space-y-4">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">
                        Subtitle
                    </p>
                    {isLoading ? (
                        <Skeleton className="h-4 w-full" />
                    ) : (
                        <p className="text-sm">{content?.subTitle ?? "-"}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Kategori
                        </p>
                        {isLoading ? (
                            <Skeleton className="h-4 w-full" />
                        ) : (
                            <p className="text-sm capitalize">
                                {content?.category ?? "-"}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Tanggal
                        </p>

                        {isLoading ? (
                            <Skeleton className="h-4 w-full" />
                        ) : (
                            <p className="text-sm">
                                {DateTime.fromISO(content?.date || "").toFormat(
                                    "dd/MM/yyyy"
                                )}
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

                <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                        Dokumen
                    </p>
                    <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                            <Icon
                                icon="lucide:file"
                                className="h-5 w-5 text-muted-foreground"
                            />
                            <Link
                                href={content?.documentUrl ?? ""}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                            >
                                {getFilenameFromUrl(content?.documentUrl ?? "")}
                            </Link>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                window.open(
                                    content?.documentUrl ?? "",
                                    "_blank"
                                )
                            }
                        >
                            <Icon
                                icon="lucide:download"
                                className="h-4 w-4 mr-2"
                            />
                            Download
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

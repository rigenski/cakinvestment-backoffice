import { IModalRef, Modal } from "@/components/modal";
import { services } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { DateTime } from "luxon";
import Image from "next/image";

interface IDialogDetailProps {
    dialogRef?: React.RefObject<IModalRef | null>;
    id: string;
}

export default function DialogDetail({ dialogRef, id }: IDialogDetailProps) {
    const { data, isLoading } = useQuery({
        ...services.masterData.news.getById(id),
        enabled: !!id,
    });

    const content = data?.content;

    return (
        <Modal
            ref={dialogRef}
            title={content?.title}
            description="Detail Informasi berita."
            className="max-w-4xl!"
        >
            <div className="space-y-4">
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
                            Author
                        </p>
                        {isLoading ? (
                            <Skeleton className="h-4 w-full" />
                        ) : (
                            <p className="text-sm capitalize">
                                {content?.author ?? "-"}
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
                    <p className="text-muted-foreground mb-2 text-sm font-medium">
                        Banner
                    </p>
                    {content?.bannerUrl && (
                        <Image
                            src={content?.bannerUrl}
                            alt={content?.title ?? ""}
                            width={1000}
                            height={1000}
                            className="mb-4 h-64 max-w-full rounded-lg border object-cover"
                        />
                    )}
                </div>

                <div>
                    <p className="text-muted-foreground mb-2 text-sm font-medium">
                        Konten
                    </p>

                    {isLoading ? (
                        <Skeleton className="h-4 w-full" />
                    ) : (
                        <div
                            className="prose prose-sm max-w-none rounded-lg border p-4"
                            dangerouslySetInnerHTML={{
                                __html: content?.content || "",
                            }}
                        />
                    )}
                </div>
            </div>
        </Modal>
    );
}

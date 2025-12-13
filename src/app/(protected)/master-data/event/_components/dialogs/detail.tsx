import { IModalRef, Modal } from "@/components/modal";
import { services } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DateTime } from "luxon";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface IDialogDetailProps {
    dialogRef?: React.RefObject<IModalRef | null>;
    id: string;
}

export default function DialogDetail({ dialogRef, id }: IDialogDetailProps) {
    const { data, isLoading } = useQuery({
        ...services.masterData.event.getById(id),
        enabled: !!id,
    });

    const content = data?.content;

    return (
        <Modal
            ref={dialogRef}
            title={content?.title}
            description="Detail event yang sudah ada."
            className="max-w-4xl!"
        >
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Pembicara
                        </p>
                        {isLoading ? (
                            <Skeleton className="h-4 w-full" />
                        ) : (
                            <p className="text-sm">{content?.speaker}</p>
                        )}
                    </div>

                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Kategori
                        </p>
                        {isLoading ? (
                            <Skeleton className="h-4 w-full" />
                        ) : (
                            <p className="text-sm capitalize">
                                {content?.category}
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
                            <p className="text-sm">{content?.date}</p>
                        )}
                    </div>

                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Waktu
                        </p>

                        {isLoading ? (
                            <Skeleton className="h-4 w-full" />
                        ) : (
                            <p className="text-sm">{content?.time}</p>
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
                        Link Registrasi
                    </p>
                    <div className="flex items-center justify-between gap-2">
                        <Link
                            href={content?.registrationLink || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            {content?.registrationLink}
                        </Link>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                window.open(
                                    content?.registrationLink || "#",
                                    "_blank"
                                )
                            }
                        >
                            <Icon
                                icon="lucide:external-link"
                                className="h-4 w-4 mr-2"
                            />
                            Buka Link
                        </Button>
                    </div>
                </div>

                <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                        Banner
                    </p>
                    {isLoading ? (
                        <Skeleton className="h-64 w-full" />
                    ) : (
                        <Image
                            src={content?.bannerUrl || ""}
                            alt={content?.title || ""}
                            width={500}
                            height={500}
                            className="max-w-full h-64 object-cover rounded-lg border"
                        />
                    )}
                </div>

                <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                        Deskripsi
                    </p>
                    {isLoading ? (
                        <Skeleton className="h-4 w-full" />
                    ) : (
                        <p className="text-sm whitespace-pre-wrap">
                            {content?.description}
                        </p>
                    )}
                </div>
            </div>
        </Modal>
    );
}

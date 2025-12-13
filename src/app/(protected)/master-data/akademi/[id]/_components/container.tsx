"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { services } from "@/services";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import SkeletonLoading from "../../_components/partials/skeleton-loading";
import { DateTime } from "luxon";
import EmptyState from "./empty-state";

export default function Container() {
    const router = useRouter();
    const params = useParams();
    const { id } = params as { id: string };

    const onBack = () => router.back();

    const { data, isLoading } = useQuery(
        services.masterData.akademi.getById(id)
    );

    const content = data?.content;

    if (!content) {
        return <EmptyState id={id} />;
    }

    return (
        <Card>
            <CardHeader className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                    <CardTitle className="text-2xl">View Module</CardTitle>
                    <CardDescription>
                        Detail informasi modul pembelajaran
                    </CardDescription>
                </div>

                <Button variant="outline" onClick={onBack}>
                    <Icon icon="lucide:arrow-left" className="size-4" />
                    Kembali
                </Button>
            </CardHeader>

            {isLoading ? (
                <SkeletonLoading />
            ) : (
                <CardContent className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Pengajar
                            </p>
                            <p className="text-sm">{content?.teacher || "-"}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Kategori
                            </p>
                            <p className="text-sm">
                                {content?.category || "-"}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Durasi
                            </p>
                            <p className="text-sm">
                                {content?.videoModules.reduce((acc, curr) => {
                                    return (
                                        acc +
                                        Number(curr.duration.split(":")[0]) *
                                            60 +
                                        Number(curr.duration.split(":")[1])
                                    );
                                }, 0) || 0}{" "}
                                minutes
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Total Video
                            </p>
                            <p className="text-sm">
                                {content?.videoModules.length || 0} video
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Last Updated
                            </p>
                            <p className="text-sm">
                                {DateTime.fromISO(
                                    content?.updatedAt || ""
                                ).toFormat("dd/MM/yyyy HH:mm")}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                            Deskripsi
                        </p>
                        <div
                            className="prose prose-sm max-w-none rounded-lg border p-4"
                            dangerouslySetInnerHTML={{
                                __html: content?.description || "",
                            }}
                        />
                    </div>

                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                            Video ({content?.videoModules.length || 0})
                        </p>
                        <div className="space-y-2">
                            {content?.videoModules.map((video, index) => (
                                <div
                                    key={video.id || index}
                                    className="border rounded-lg p-4 flex items-center justify-between"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium">
                                            {video.title}
                                        </p>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Icon
                                                    icon="lucide:clock"
                                                    className="h-4 w-4"
                                                />
                                                {video.duration}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Icon
                                                    icon="lucide:link"
                                                    className="h-4 w-4"
                                                />
                                                <a
                                                    href={video.videoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline"
                                                >
                                                    Buka Video
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}

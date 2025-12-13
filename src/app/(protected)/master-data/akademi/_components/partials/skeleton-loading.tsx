import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoadingProps {
    videoCount?: number;
}

export default function SkeletonLoading({
    videoCount = 2,
}: SkeletonLoadingProps) {
    return (
        <div className="flex flex-col gap-4">
            {/* Title Field */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-9 w-full" />
            </div>

            {/* Teacher & Category - 2 columns */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-full" />
                </div>
            </div>

            {/* Description Field */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-40 w-full" />
            </div>

            {/* Video Modules Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-14" />
                    <Skeleton className="h-8 w-28" />
                </div>

                {/* Video Cards */}
                {Array.from({ length: videoCount }).map((_, index) => (
                    <div
                        key={index}
                        className="space-y-4 rounded-lg border p-4"
                    >
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-8 w-8" />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Skeleton className="h-9 w-full" />
                            <div className="grid grid-cols-2 gap-4">
                                <Skeleton className="h-9 w-full" />
                                <Skeleton className="h-9 w-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function getFilenameFromUrl(url: string): string {
    return url.split("/").pop() || "";
}

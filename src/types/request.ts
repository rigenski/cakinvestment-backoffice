export type TPaginationRequest = {
    page?: number;
    rows?: number;
    searchFilters?: {
        [key: string]: string;
    };
    filters?: {
        [key: string]: string | number | boolean;
    };
    rangedFilters?: {
        key: string;
        start: string;
        end: string;
    }[];
    orderKey?: string;
    orderRule?: "asc" | "desc";
};

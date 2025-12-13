import { TPaginationRequest } from "@/types/request";
import { TResponse, TResponseGetAll } from "@/types/response";
import { api, getError, transformParams } from "@/utils/api";
import { TNews, TNewsRequest } from "./type";

const getAll = (params?: TPaginationRequest) => ({
    queryKey: ["news", transformParams(params)],
    queryFn: async () => {
        try {
            const response = await api.get<TResponseGetAll<TNews>>("/news", {
                params: transformParams(params),
            });

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const getById = (id: string) => ({
    queryKey: ["news", id],
    queryFn: async () => {
        try {
            const response = await api.get<TResponse<TNews>>(`/news/${id}`);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const create = () => ({
    mutationFn: async (data: TNewsRequest) => {
        try {
            const response = await api.post<TResponse<TNews>>("/news", data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const update = () => ({
    mutationFn: async ({ id, data }: { id: string; data: TNewsRequest }) => {
        try {
            const response = await api.put<TResponse<TNews>>(
                `/news/${id}`,
                data
            );

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const remove = () => ({
    mutationFn: async (id: string) => {
        try {
            const response = await api.delete<TResponse<TNews>>(`/news/${id}`);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

export { getAll, getById, create, update, remove };

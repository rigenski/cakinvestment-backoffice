import { TPaginationRequest } from "@/types/request";
import { TResponse, TResponseGetAll } from "@/types/response";
import { api, getError, transformParams } from "@/utils/api";
import { TAkademi, TAkademiRequest } from "./type";

const getAll = (params?: TPaginationRequest) => ({
    queryKey: ["akademi", transformParams(params)],
    queryFn: async () => {
        try {
            const response = await api.get<TResponseGetAll<TAkademi>>(
                "/module",
                {
                    params: transformParams(params),
                }
            );

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const getById = (id: string) => ({
    queryKey: ["akademi", id],
    queryFn: async () => {
        try {
            const response = await api.get<TResponse<TAkademi>>(
                `/module/${id}`
            );

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const create = () => ({
    mutationFn: async (data: TAkademiRequest) => {
        try {
            const response = await api.post<TResponse<TAkademi>>(
                "/module",
                data
            );

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const update = () => ({
    mutationFn: async ({ id, data }: { id: string; data: TAkademiRequest }) => {
        try {
            const response = await api.put<TResponse<TAkademi>>(
                `/module/${id}`,
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
            const response = await api.delete<TResponse<TAkademi>>(
                `/module/${id}`
            );

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

export { getAll, getById, create, update, remove };

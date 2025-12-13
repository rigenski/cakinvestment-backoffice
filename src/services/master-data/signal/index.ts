import { TPaginationRequest } from "@/types/request";
import { TResponse, TResponseGetAll } from "@/types/response";
import { api, getError, transformParams } from "@/utils/api";
import { TSignal, TSignalRequest } from "./type";

const getAll = (params?: TPaginationRequest) => ({
    queryKey: ["signal", transformParams(params)],
    queryFn: async () => {
        try {
            const response = await api.get<TResponseGetAll<TSignal>>(
                "/signal",
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
    queryKey: ["signal", id],
    queryFn: async () => {
        try {
            const response = await api.get<TResponse<TSignal>>(`/signal/${id}`);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const create = () => ({
    mutationFn: async (data: TSignalRequest) => {
        try {
            const response = await api.post<TResponse<TSignal>>(
                "/signal",
                data
            );

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const update = () => ({
    mutationFn: async ({ id, data }: { id: string; data: TSignalRequest }) => {
        try {
            const response = await api.put<TResponse<TSignal>>(
                `/signal/${id}`,
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
            const response = await api.delete<TResponse<TSignal>>(
                `/signal/${id}`
            );

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

export { getAll, getById, create, update, remove };

import { TPaginationRequest } from "@/types/request";
import { TResponse, TResponseGetAll } from "@/types/response";
import { api, getError, transformParams } from "@/utils/api";
import { TEvent, TEventRequest } from "./type";

const getAll = (params?: TPaginationRequest) => ({
    queryKey: ["event", transformParams(params)],
    queryFn: async () => {
        try {
            const response = await api.get<TResponseGetAll<TEvent>>("/event", {
                params: transformParams(params),
            });

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const getById = (id: string) => ({
    queryKey: ["event", id],
    queryFn: async () => {
        try {
            const response = await api.get<TResponse<TEvent>>(`/event/${id}`);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const create = () => ({
    mutationFn: async (data: TEventRequest) => {
        try {
            const response = await api.post<TResponse<TEvent>>("/event", data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const update = () => ({
    mutationFn: async ({ id, data }: { id: string; data: TEventRequest }) => {
        try {
            const response = await api.put<TResponse<TEvent>>(
                `/event/${id}`,
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
            const response = await api.delete<TResponse<TEvent>>(
                `/event/${id}`
            );

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

export { getAll, getById, create, update, remove };

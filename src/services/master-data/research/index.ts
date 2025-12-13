import { TPaginationRequest } from "@/types/request";
import { TResponse, TResponseGetAll } from "@/types/response";
import { api, getError, transformParams } from "@/utils/api";
import { TResearch, TResearchRequest } from "./type";

const getAll = (params?: TPaginationRequest) => ({
    queryKey: ["research", transformParams(params)],
    queryFn: async () => {
        try {
            const response = await api.get<TResponseGetAll<TResearch>>(
                "/research",
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
    queryKey: ["research", id],
    queryFn: async () => {
        try {
            const response = await api.get<TResponse<TResearch>>(
                `/research/${id}`
            );

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const create = () => ({
    mutationFn: async (data: TResearchRequest) => {
        try {
            const response = await api.post<TResponse<TResearch>>(
                "/research",
                data
            );

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const update = () => ({
    mutationFn: async ({
        id,
        data,
    }: {
        id: string;
        data: TResearchRequest;
    }) => {
        try {
            const response = await api.put<TResponse<TResearch>>(
                `/research/${id}`,
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
            const response = await api.delete<TResponse<TResearch>>(
                `/research/${id}`
            );

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

export { getAll, getById, create, update, remove };

import { TResponse } from "@/types/response";
import { getError } from "@/utils/api";
import axios from "axios";

export const upload = () => ({
    mutationFn: async (data: { file: File; directory?: string | null }) => {
        try {
            const formData = new FormData();
            formData.append("file", data.file);
            formData.append(
                "directory",
                data.directory || "radikari/knowledges"
            );

            const response = await axios.post<
                TResponse<{ fileUrl: string; objectKey: string }>
            >("https://api.iamtaxi.nwappservice.com/storage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

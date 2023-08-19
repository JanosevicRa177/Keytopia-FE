import { toast } from "react-toastify";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import { useAxios } from "../../utils/axios.hook";

export const useRemoveUnusedKeyboards = () => {
    const { axios } = useAxios();
    const removeUnusedKeyboards = async (): Promise<ApiResponse<null>> => {
        try {
            await axios.delete(`/keyboard/unused`);
            toast.success(`Unused keyboards removed!`);
            return {
                data: null,
                error: null,
                status: "SUCCESS",
            };
        } catch (e: any) {
            toast.error(e.response.data.message);
            return {
                data: null,
                error: e.response.data.message,
                status: "ERROR",
            };
        }
    };

    return {
        removeUnusedKeyboards,
    };
};

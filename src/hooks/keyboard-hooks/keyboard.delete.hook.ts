import { toast } from "react-toastify";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import { useAxios } from "../../utils/axios.hook";

export const useDeleteKeyboard = () => {
    const { axios } = useAxios();
    const deleteKeyboard = async (name: String): Promise<ApiResponse<null>> => {
        try {
            await axios.delete(`/keyboard/${name}`);
            toast.success(`Keyboard successfuly deleted!`);
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
        deleteKeyboard,
    };
};

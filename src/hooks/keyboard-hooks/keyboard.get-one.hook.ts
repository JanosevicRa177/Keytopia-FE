import { toast } from "react-toastify";
import { Keyboard } from "../../model/part.model";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import { useAxios } from "../../utils/axios.hook";

export const useGetOneKeyboard = () => {
    const { axios } = useAxios();
    const getKeyboard = async (name: String): Promise<ApiResponse<Keyboard | null>> => {
        try {
            const res = await axios.get(`/keyboard/${name}`);
            return {
                data: res.data,
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
        getKeyboard,
    };
};

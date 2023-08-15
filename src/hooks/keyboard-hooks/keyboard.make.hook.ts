import { toast } from "react-toastify";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import { useAxios } from "../../utils/axios.hook";

export const useMakeKeyboard = () => {
    const { axios } = useAxios();
    const makeKeyboard = async (name: String, quantity: number): Promise<ApiResponse<null>> => {
        try {
            await axios.put(`/keyboard/make/${name}/${quantity}`);
            toast.success(`Keyboards successfuly added!`);
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
        makeKeyboard,
    };
};

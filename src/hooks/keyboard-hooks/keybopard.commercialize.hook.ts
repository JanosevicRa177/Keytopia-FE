import { toast } from "react-toastify";
import { CommercializeKeyboard } from "../../model/part.model";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import { useAxios } from "../../utils/axios.hook";

export const useCommercializeKeyboard = () => {
    const { axios } = useAxios();
    const commercializeKeyboard = async (name: string, newName: string, image: File): Promise<ApiResponse<null>> => {
        try {
            const body = { image: image, newName: newName } as CommercializeKeyboard
            await axios.patch(`/keyboard/commercialize/${name}`, body, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Keyboard commercialized!");
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
        commercializeKeyboard,
    };
};

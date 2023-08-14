import { toast } from "react-toastify";
import { useAxios } from "../../../utils/axios.hook";
import { ApiResponse } from "../../../store/auth-store/types/response.type";

export const useFetchDeliveryServices = () => {
    const { axios } = useAxios();
    const getDeliveryServices = async (): Promise<ApiResponse<string[] | null>> => {
        try {
            const res = await axios.get(`/delivery-service`);
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
        getDeliveryServices,
    };
};

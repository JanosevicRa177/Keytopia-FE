import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";

export const useDeleteDeliveryService = () => {
    const { axios } = useAxios();
    const deleteDeliveryService = async (
        name: string
    ): Promise<ApiResponse<null>> => {
        try {
            await axios.delete(`/delivery-service/${name}`);
            toast.success("Delivery service successfuly deleted!");
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
        deleteDeliveryService,
    };
};

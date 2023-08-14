import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { DeliveryService } from "../../../model/sales.model";

export const useUpdateDeliveryService = () => {
    const { axios } = useAxios();
    const updateDeliveryService = async (values: DeliveryService, oldName: string): Promise<ApiResponse<null>> => {
        try {
            await axios.put(`/delivery-service/${oldName}`, values);
            toast.success("Delivery service successfuly updated!");
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
        updateDeliveryService,
    };
};

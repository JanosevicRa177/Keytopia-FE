import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { DeliveryService } from "../../../model/sales.model";

export const useCreateDeliveryService = () => {
    const { axios } = useAxios();
    const createDeliveryService = async (values: DeliveryService): Promise<ApiResponse<null>> => {
        try {
            await axios.post(`/delivery-service`, values);
            toast.success("Delivery service successfuly created!");
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
        createDeliveryService,
    };
};

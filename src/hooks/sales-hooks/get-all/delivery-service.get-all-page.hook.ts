import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { Page } from "../../../utils/types";
import { useAxios } from "../../../utils/axios.hook";
import { DeliveryService } from "../../../model/sales.model";

export const useFetchDeliveryServicesPage = () => {
    const { axios } = useAxios();
    const {
        setError,
        setSuccess,
        state: getDeliveryServicesPageRes,
    } = useResponseState<Page<DeliveryService>>({ totalPages: 0, content: [] });
    const getDeliveryServicesPage = async (pageNumber: number) => {
        try {
            const res = await axios.get(
                `/delivery-service/5/${pageNumber}`
            );
            setSuccess(res.data);
        } catch (e: any) {
            toast.error(e.response.data.message);
            setError(e.response.data.message);
        }
    };

    return {
        getDeliveryServicesPageRes,
        getDeliveryServicesPage,
    };
};

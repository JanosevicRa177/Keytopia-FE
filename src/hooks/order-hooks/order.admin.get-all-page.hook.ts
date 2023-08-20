import { toast } from "react-toastify";
import { useAxios } from "../../utils/axios.hook";
import { Page } from "../../utils/types";
import { useResponseState } from "../util-hooks/response-state.hook";
import { SortDirection } from "../../utils/enum";
import { Order } from "../../model/sales.model";

export const useFetchOrdersAdmin = () => {
    const { axios } = useAxios();
    const {
        setError,
        setSuccess,
        state: getOrdersPageAdminRes,
    } = useResponseState<Page<Order>>({ totalPages: 0, content: [] });
    const getOrdersPageAdmin = async (
        pageNumber: number,
        sortDirection: SortDirection,
        idString?: string
    ) => {
        try {
            const res = await axios.get(`/order/admin/page`, {
                params: {
                    pageSize: 5,
                    pageNumber: pageNumber,
                    idString: idString,
                    sortDirection: sortDirection
                },
            });
            setSuccess(res.data);
        } catch (e: any) {
            toast.error(e.response.data.message);
            setError(e.response.data.message);
        }
    };

    return {
        getOrdersPageAdminRes,
        getOrdersPageAdmin,
    };
};

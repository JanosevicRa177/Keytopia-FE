import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { Page } from "../../../utils/types";
import { useAxios } from "../../../utils/axios.hook";
import { GetProcurementDto } from "../../../model/warehouse.model";
import { ProcurementState, SortDirection } from "../../../utils/enum";

export const useFetchProcurementsPage = () => {
    const { axios } = useAxios();
    const {
        setError,
        setSuccess,
        state: getProcurementsPageRes,
    } = useResponseState<Page<GetProcurementDto>>({
        totalPages: 0,
        content: [],
    });
    const getProcurementsPage = async (pageNumber: number,
        state: ProcurementState,
        sortDirection: SortDirection) => {
        try {
            const res = await axios.get(`/procurement/page`, {
                params: {
                    pageSize: 8,
                    pageNumber: pageNumber,
                    state: state,
                    sortDirection: sortDirection,
                },
            });
            setSuccess(res.data);
        } catch (e: any) {
            toast.error(e.response.data.message);
            setError(e.response.data.message);
        }
    };

    return {
        getProcurementsPage,
        getProcurementsPageRes,
    };
};

import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { useAxios } from "../../../utils/axios.hook";
import { PriceWeight } from "../../../utils/enum";
import { Page } from "../../../utils/types";
import { PartData } from "../../../store/keyboard-store/types/keyboard.type";

export const useFetchCablePage = () => {
    const { axios } = useAxios();
    const {
        setError,
        setSuccess,
        state: getCablePageRes,
    } = useResponseState<Page<PartData>>({ totalPages: 0, content: [] });
    const getCablePage = async (
        pageNumber: number,
        name: string = "",
        color?: string,
        priceWeight?: PriceWeight
    ) => {
        try {
            const res = await axios.get(`part/cable/page`, {
                params: {
                    pageSize: 12,
                    pageNumber: pageNumber,
                    name: name,
                    priceWeight: priceWeight,
                    color: color
                },
            });
            setSuccess(res.data);
        } catch (e: any) {
            toast.error(e.response.data.message);
            setError(e.response.data.message);
        }
    };

    return {
        getCablePage,
        getCablePageRes,
    };
};

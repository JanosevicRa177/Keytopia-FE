import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { useAxios } from "../../../utils/axios.hook";
import { PriceWeight } from "../../../utils/enum";
import { Page } from "../../../utils/types";
import { PartData } from "../../../store/keyboard-store/types/keyboard.type";

export const useFetchCasePage = () => {
    const { axios } = useAxios();
    const {
        setError,
        setSuccess,
        state: getCasePageRes,
    } = useResponseState<Page<PartData>>({ totalPages: 0, content: [] });
    const getCasePage = async (
        pageNumber: number,
        name: string = "",
        sizeName?: string,
        priceWeight?: PriceWeight,
        color?: string
    ) => {
        try {
            const res = await axios.get(`part/case/page`, {
                params: {
                    pageSize: 12,
                    pageNumber: pageNumber,
                    name: name,
                    sizeName: sizeName,
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
        getCasePage,
        getCasePageRes,
    };
};

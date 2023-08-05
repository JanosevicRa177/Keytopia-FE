import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { useAxios } from "../../../utils/axios.hook";
import { PriceWeight } from "../../../utils/enum";
import { Page } from "../../../utils/types";
import { PartData } from "../../../store/keyboard-store/types/keyboard.type";

export const useFetchPlatePage = () => {
    const { axios } = useAxios();
    const {
        setError,
        setSuccess,
        state: getPlatePageRes,
    } = useResponseState<Page<PartData>>({ totalPages: 0, content: [] });
    const getPlatePage = async (
        pageNumber: number,
        name: string = "",
        color?: string,
        sizeName?: string,
        priceWeight?: PriceWeight
    ) => {
        try {
            const res = await axios.get(`part/plate/page`, {
                params: {
                    pageSize: 12,
                    pageNumber: pageNumber,
                    name: name,
                    priceWeight: priceWeight,
                    color: color,
                    sizeName: sizeName
                },
            });
            setSuccess(res.data);
        } catch (e: any) {
            toast.error(e.response.data.message);
            setError(e.response.data.message);
        }
    };

    return {
        getPlatePage,
        getPlatePageRes,
    };
};

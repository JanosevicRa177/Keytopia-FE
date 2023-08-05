import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { useAxios } from "../../../utils/axios.hook";
import { PriceWeight } from "../../../utils/enum";
import { Page } from "../../../utils/types";
import { PartData } from "../../../store/keyboard-store/types/keyboard.type";

export const useFetchKeycapSetPage = () => {
    const { axios } = useAxios();
    const {
        setError,
        setSuccess,
        state: getKeycapSetPageRes,
    } = useResponseState<Page<PartData>>({ totalPages: 0, content: [] });
    const getKeycapSetPage = async (
        pageNumber: number,
        name: string = "",
        priceWeight?: PriceWeight,
        color?: string,
        sizeName?: string
    ) => {
        try {
            const res = await axios.get(`part/keycap-set/page`, {
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
        getKeycapSetPage,
        getKeycapSetPageRes,
    };
};

import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { useAxios } from "../../../utils/axios.hook";
import { PriceWeight } from "../../../utils/enum";
import { Page } from "../../../utils/types";
import { PartData } from "../../../store/keyboard-store/types/keyboard.type";

export const useFetchKeycapPage = () => {
    const { axios } = useAxios();
    const {
        setError,
        setSuccess,
        state: getKeycapPageRes,
    } = useResponseState<Page<PartData>>({ totalPages: 0, content: [] });
    const getKeycapPage = async (
        pageNumber: number,
        name: string = "",
        priceWeight?: PriceWeight,
    ) => {
        try {
            const res = await axios.get(`part/keycap/page`, {
                params: {
                    pageSize: 12,
                    pageNumber: pageNumber,
                    name: name,
                    priceWeight: priceWeight,
                },
            });
            setSuccess(res.data);
        } catch (e: any) {
            toast.error(e.response.data.message);
            setError(e.response.data.message);
        }
    };

    return {
        getKeycapPage,
        getKeycapPageRes,
    };
};

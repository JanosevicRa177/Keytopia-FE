import { StabilizerType } from './../../../utils/enum';
import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { useAxios } from "../../../utils/axios.hook";
import { PriceWeight } from "../../../utils/enum";
import { Page } from "../../../utils/types";
import { PartData } from "../../../store/keyboard-store/types/keyboard.type";

export const useFetchStabilizersPage = () => {
    const { axios } = useAxios();
    const {
        setError,
        setSuccess,
        state: getStabilizersPageRes,
    } = useResponseState<Page<PartData>>({ totalPages: 0, content: [] });
    const getStabilizersPage = async (
        pageNumber: number,
        name: string = "",
        stabilizerType?: StabilizerType,
        priceWeight?: PriceWeight
    ) => {
        try {
            const res = await axios.get(`part/stabilizers/page`, {
                params: {
                    pageSize: 12,
                    pageNumber: pageNumber,
                    name: name,
                    priceWeight: priceWeight,
                    stabilizerType: stabilizerType,
                },
            });
            setSuccess(res.data);
        } catch (e: any) {
            toast.error(e.response.data.message);
            setError(e.response.data.message);
        }
    };

    return {
        getStabilizersPage,
        getStabilizersPageRes,
    };
};

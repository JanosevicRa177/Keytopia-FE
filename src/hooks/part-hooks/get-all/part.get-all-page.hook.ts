import { SortDirection, PartType } from './../../../utils/enum';
import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { useAxios } from "../../../utils/axios.hook";
import { Page } from "../../../utils/types";
import { PartData } from "../../../store/keyboard-store/types/keyboard.type";

export const useFetchPartPage = () => {
    const { axios } = useAxios();
    const {
        setError,
        setSuccess,
        state: getPartPageRes,
    } = useResponseState<Page<PartData>>({ totalPages: 0, content: [] });
    const getPartPage = async (
        pageNumber: number,
        name: string = "",
        sortDirection: SortDirection,
        partType?: PartType
    ) => {
        try {
            const res = await axios.get(`part/page`, {
                params: {
                    pageSize: 12,
                    pageNumber: pageNumber,
                    name: name,
                    sortDirection: sortDirection,
                    partType: partType,
                },
            });
            setSuccess(res.data);
        } catch (e: any) {
            toast.error(e.response.data.message);
            setError(e.response.data.message);
        }
    };

    return {
        getPartPage,
        getPartPageRes,
    };
};

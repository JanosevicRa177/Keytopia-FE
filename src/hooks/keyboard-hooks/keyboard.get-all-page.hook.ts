import { toast } from "react-toastify";
import { PartData } from "../../store/keyboard-store/types/keyboard.type";
import { useAxios } from "../../utils/axios.hook";
import { Page } from "../../utils/types";
import { useResponseState } from "../util-hooks/response-state.hook";
import { SortDirection } from "../../utils/enum";

export const useFetchKeyboardPage = () => {
    const { axios } = useAxios();
    const {
        setError,
        setSuccess,
        state: getKeyboardPageRes,
    } = useResponseState<Page<PartData>>({ totalPages: 0, content: [] });
    const getKeyboardPage = async (
        pageNumber: number,
        name: string = "",
        sortDirection: SortDirection,
        generatedByAdmin?: boolean,
    ) => {
        try {
            const res = await axios.get(`keyboard/page`, {
                params: {
                    pageSize: 12,
                    pageNumber: pageNumber,
                    name: name,
                    generatedByAdmin: generatedByAdmin,
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
        getKeyboardPage,
        getKeyboardPageRes,
    };
};

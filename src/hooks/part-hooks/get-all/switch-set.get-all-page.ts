import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { useAxios } from "../../../utils/axios.hook";
import { PinType, PriceWeight, SwitchType } from "../../../utils/enum";
import { Page } from "../../../utils/types";
import { PartData } from "../../../store/keyboard-store/types/keyboard.type";

export const useFetchSwitchSetPage = () => {
    const { axios } = useAxios();
    const {
        setError,
        setSuccess,
        state: getSwitchSetPageRes,
    } = useResponseState<Page<PartData>>({ totalPages: 0, content: [] });
    const getSwitchSetPage = async (
        pageNumber: number,
        name: string = "",
        priceWeight?: PriceWeight,
        pinType?: PinType,
        switchType?: SwitchType,
        sizeName?: string,
    ) => {
        try {
            const res = await axios.get(`part/switch-set/page`, {
                params: {
                    pageSize: 12,
                    pageNumber: pageNumber,
                    name: name,
                    priceWeight: priceWeight,
                    pinType: pinType,
                    switchType: switchType,
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
        getSwitchSetPage,
        getSwitchSetPageRes,
    };
};

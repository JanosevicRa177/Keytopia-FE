import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { PartType } from "../../../utils/enum";
import { Case } from "../../../model/part.model";

export const useGetOneCase = () => {
    const { axios } = useAxios();
    const getCase = async (name: String): Promise<ApiResponse<Case | null>> => {
        try {
            const res = await axios.get(`/part/${PartType.CASE}/${encodeURIComponent(name.toString())}`);
            return {
                data: res.data,
                error: null,
                status: "SUCCESS",
            };
        } catch (e: any) {
            toast.error(e.response.data.message);
            return {
                data: null,
                error: e.response.data.message,
                status: "ERROR",
            };
        }
    };

    return {
        getCase,
    };
};

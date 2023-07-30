import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { PartType } from "../../../utils/enum";
import { SwitchSetShowMore } from "../../../model/part.model";

export const useGetOneSwitchSet = () => {
	const { axios } = useAxios();
	const getSwitchSet = async (name: String): Promise<ApiResponse<SwitchSetShowMore | null>> => {
		try {
			const res = await axios.get(`/part/${PartType.SWITCH_SET}/${name}`);
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
		getSwitchSet,
	};
};

import { toast } from "react-toastify";
import { useAxios } from "../../../utils/axios.hook";
import { ApiResponse } from "../../../store/auth-store/types/response.type";

export const useFetchSwitches = () => {
	const { axios } = useAxios();
	const getSwitches = async (): Promise<ApiResponse<string[] | null>> => {
		try {
			const res = await axios.get(`/part-data/switch`);
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
		getSwitches,
	};
};

import { toast } from "react-toastify";
import { useAxios } from "../../../utils/axios.hook";
import { ApiResponse } from "../../../store/auth-store/types/response.type";

export const useFetchKeycapProfiles = () => {
	const { axios } = useAxios();
	const getKeycapProfiles = async (): Promise<
		ApiResponse<String[] | null>
	> => {
		try {
			const res = await axios.get(`/part-data/keycap-profile/`);
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
		getKeycapProfiles,
	};
};

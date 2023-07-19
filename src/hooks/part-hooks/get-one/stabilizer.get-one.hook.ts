import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { PartType } from "../../../utils/enum";
import { Stabilizer } from "../../../model/part.model";

export const useGetOneStabilizer = () => {
	const { axios } = useAxios();
	const getStabilizer = async (
		name: String
	): Promise<ApiResponse<Stabilizer | null>> => {
		try {
			const res = await axios.get(`/part/${PartType.STABILIZER}/${name}`);
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
		getStabilizer,
	};
};

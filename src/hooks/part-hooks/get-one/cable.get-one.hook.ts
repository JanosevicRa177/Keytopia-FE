import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { PartType } from "../../../utils/enum";
import { Cable } from "../../../model/part.model";

export const useGetOnePart = () => {
	const { axios } = useAxios();
	const getPart = async (
		name: String,
		partType: PartType
	): Promise<ApiResponse<Cable | null>> => {
		try {
			const res = await axios.get(`/part/${partType}/${name}`);
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
		getPart,
	};
};

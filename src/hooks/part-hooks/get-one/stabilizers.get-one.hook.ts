import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { PartType } from "../../../utils/enum";
import { Stabilizers } from "../../../model/part.model";

export const useGetOneStabilizers = () => {
	const { axios } = useAxios();
	const getStabilizers = async (name: String): Promise<ApiResponse<Stabilizers | null>> => {
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
		getStabilizers,
	};
};

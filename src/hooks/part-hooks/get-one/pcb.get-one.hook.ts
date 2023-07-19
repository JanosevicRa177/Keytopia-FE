import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { PartType } from "../../../utils/enum";
import { PCB } from "../../../model/part.model";

export const useGetOnePCB = () => {
	const { axios } = useAxios();
	const getPCB = async (name: String): Promise<ApiResponse<PCB | null>> => {
		try {
			const res = await axios.get(`/part/${PartType.PCB}/${name}`);
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
		getPCB,
	};
};

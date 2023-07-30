import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { toast } from "react-toastify";

export const useRealizeProcurement = () => {
	const { axios } = useAxios();
	const realizeProcurement = async (procurementId: number): Promise<ApiResponse<null>> => {
		try {
			await axios.patch(`procurement/realize/${procurementId}`, {});
			toast.success("Procurement realized!");
			return {
				data: null,
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
		realizeProcurement,
	};
};

import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";

export const usePenalizeProcurement = () => {
	const { axios } = useAxios();
	const penalizeProcurement = async (procurementId: number): Promise<ApiResponse<null>> => {
		try {
			await axios.patch(`procurement/penalize/${procurementId}`, {});
			toast.success("Procurement supplier penalized!");
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
		penalizeProcurement,
	};
};

import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";

export const useDeleteProcurement = () => {
	const { axios } = useAxios();
	const deleteProcurement = async (name: number): Promise<ApiResponse<null>> => {
		try {
			await axios.delete(`/procurement/${name}`);
			toast.success("Procurement successfuly deleted!");
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
		deleteProcurement,
	};
};

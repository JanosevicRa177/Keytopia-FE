import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";

export const useDeleteCable = () => {
	const { axios } = useAxios();
	const deleteCable = async (name: String): Promise<ApiResponse<null>> => {
		try {
			await axios.delete(`/part/cable/${name}`);
			toast.success("Cable successfuly deleted!");
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
		deleteCable,
	};
};

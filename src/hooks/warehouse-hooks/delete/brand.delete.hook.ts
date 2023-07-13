import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";

export const useDeleteBrand = () => {
	const { axios } = useAxios();
	const deleteBrand = async (name: String): Promise<ApiResponse<null>> => {
		try {
			await axios.delete(`/brand/${name}`);
			toast.success("Supplier successfuly deleted!");
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
		deleteBrand,
	};
};

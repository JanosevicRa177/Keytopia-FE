import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { PartType } from "../../../utils/enum";

export const useDeletePart = () => {
	const { axios } = useAxios();
	const deletePart = async (
		name: String,
		partType: PartType
	): Promise<ApiResponse<null>> => {
		try {
			await axios.delete(`/part/${partType}/${name}`);
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
		deletePart,
	};
};

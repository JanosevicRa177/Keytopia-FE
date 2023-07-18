import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { Cable } from "../../../model/part.model";

export const useCreateCable = () => {
	const { axios } = useAxios();
	const createCable = async (
		values: Cable,
		image: File
	): Promise<ApiResponse<null>> => {
		try {
			values.image = image;
			await axios.post(`/part/cable`, values, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			toast.success("Cable successfuly created!");
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
		createCable,
	};
};

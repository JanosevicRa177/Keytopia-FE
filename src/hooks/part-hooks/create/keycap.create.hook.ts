import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { Keycap } from "../../../model/part.model";

export const useCreateKeycap = () => {
	const { axios } = useAxios();
	const createKeycap = async (
		values: Keycap,
		image: File
	): Promise<ApiResponse<null>> => {
		try {
			values.image = image;
			await axios.post(`/part/keycap`, values, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			toast.success("Keycap successfuly created!");
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
		createKeycap,
	};
};

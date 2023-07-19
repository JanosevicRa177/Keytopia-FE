import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { Stabilizers } from "../../../model/part.model";

export const useCreateStabilizers = () => {
	const { axios } = useAxios();
	const createStabilizers = async (
		values: Stabilizers,
		image: File
	): Promise<ApiResponse<null>> => {
		try {
			values.image = image;
			await axios.post(`/part/stabilizers`, values, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			toast.success("Stabilizers successfuly created!");
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
		createStabilizers,
	};
};

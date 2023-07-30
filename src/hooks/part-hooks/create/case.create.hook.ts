import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { Case } from "../../../model/part.model";

export const useCreateCase = () => {
	const { axios } = useAxios();
	const createCase = async (values: Case, image: File): Promise<ApiResponse<null>> => {
		try {
			values.image = image;
			await axios.post(`/part/case`, values, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			toast.success("Case successfuly created!");
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
		createCase,
	};
};

import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { Plate } from "../../../model/part.model";

export const useCreatePlate = () => {
	const { axios } = useAxios();
	const createPlate = async (values: Plate, image: File): Promise<ApiResponse<null>> => {
		try {
			values.image = image;
			await axios.post(`/part/plate`, values, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			toast.success("Plate successfuly created!");
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
		createPlate,
	};
};

import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { PCB } from "../../../model/part.model";

export const useCreatePCB = () => {
	const { axios } = useAxios();
	const createPCB = async (
		values: PCB,
		image: File
	): Promise<ApiResponse<null>> => {
		try {
			values.image = image;
			await axios.post(`/part/pcb`, values, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			toast.success("PCB successfuly created!");
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
		createPCB,
	};
};

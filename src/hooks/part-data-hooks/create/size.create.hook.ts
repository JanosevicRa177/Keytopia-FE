import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { Size } from "../../../model/part-data.model";
import { useAxios } from "../../../utils/axios.hook";

export const useCreateSize = () => {
	const { axios } = useAxios();
	const createSize = async (values: Size): Promise<ApiResponse<null>> => {
		try {
			await axios.post(`/part-data/size`, values);
			toast.success("Size successfuly created!");
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
		createSize,
	};
};

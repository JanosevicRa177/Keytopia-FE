import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { Layout } from "../../../model/part-data";
import { useAxios } from "../../../utils/axios.hook";

export const useCreateLayout = () => {
	const { axios } = useAxios();
	const createLayout = async (values: Layout): Promise<ApiResponse<null>> => {
		try {
			await axios.post(`/part-data/layout`, values);
			toast.success("Layout successfuly created!");
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
		createLayout,
	};
};

import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { Switch } from "../../../model/part-data";
import { useAxios } from "../../../utils/axios.hook";

export const useCreateSwitch = () => {
	const { axios } = useAxios();
	const createSwitch = async (values: Switch): Promise<ApiResponse<null>> => {
		try {
			await axios.post(`/part-data/switch`, values);
			toast.success("Switch successfuly created!");
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
		createSwitch,
	};
};

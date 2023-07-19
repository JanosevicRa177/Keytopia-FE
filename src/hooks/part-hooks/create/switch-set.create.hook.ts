import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { SwitchSet } from "../../../model/part.model";

export const useCreateSwitchSet = () => {
	const { axios } = useAxios();
	const createSwitchSet = async (
		values: SwitchSet,
		image: File
	): Promise<ApiResponse<null>> => {
		try {
			values.image = image;
			await axios.post(`/part/switch-set`, values, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			toast.success("Switch set successfuly created!");
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
		createSwitchSet,
	};
};

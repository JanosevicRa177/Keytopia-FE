import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { KeycapProfile } from "../../../model/part-data.model";
import { useAxios } from "../../../utils/axios.hook";

export const useCreateKeycapProfile = () => {
	const { axios } = useAxios();
	const createKeycapProfile = async (values: KeycapProfile): Promise<ApiResponse<null>> => {
		try {
			await axios.post(`/part-data/keycap-profile`, values);
			toast.success("Keycap profile successfuly created!");
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
		createKeycapProfile,
	};
};

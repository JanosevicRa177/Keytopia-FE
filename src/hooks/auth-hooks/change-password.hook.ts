import { toast } from "react-toastify";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import { useAxios } from "../../utils/axios.hook";
import { ChangePasswordFormValues } from "../../components/form/auth-form/change-password.form";

export const useChangePassword = () => {
	const { axios } = useAxios();
	const changePassword = async (values: ChangePasswordFormValues): Promise<ApiResponse<null>> => {
		try {
			await axios.put(`/user/change-password`, values);
			toast.success("Your password successfuly changed!");
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
		changePassword,
	};
};

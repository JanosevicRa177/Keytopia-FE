import { toast } from "react-toastify";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import { useAxios } from "../../utils/axios.hook";
import { RegisterAdminFormValues } from "../../components/form/auth-form/register-admin.form";

export const useRegisterUserAdmin = () => {
	const { axios } = useAxios();
	const registerUserAdmin = async (
		values: RegisterAdminFormValues
	): Promise<ApiResponse<null>> => {
		try {
			await axios.post(`/auth/register/admin`, values);
			toast.success("Admin registered!");
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
		registerUserAdmin,
	};
};

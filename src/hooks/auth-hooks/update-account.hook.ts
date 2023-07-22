import { toast } from "react-toastify";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import { useAxios } from "../../utils/axios.hook";
import { UpdateAccountFormValues } from "../../components/form/auth-form/update-account.form";

export const useUpdateAccount = () => {
	const { axios } = useAxios();
	const updateAccount = async (
		values: UpdateAccountFormValues
	): Promise<ApiResponse<null>> => {
		try {
			await axios.put(`/user/update`, values);
			toast.success("Your account updated!");
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
		updateAccount,
	};
};

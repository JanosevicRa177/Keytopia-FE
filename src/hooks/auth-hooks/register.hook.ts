import { toast } from "react-toastify";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import axios from "axios";
import { RegisterFormValues } from "../../components/auth-form/register-form";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const useRegisterUser = () => {
	const registerUser = async (
		values: RegisterFormValues
	): Promise<ApiResponse<null>> => {
		try {
			await axios.post(`${BASE_URL}/auth/register/buyer`, values);
			toast.success(
				"You registered successfuly! Activate your account so you can login!"
			);
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
		registerUser,
	};
};

import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";

export const useUpdateSupplierBrands = () => {
	const { axios } = useAxios();
	const updateSupplierBrands = async (
		supplier: String,
		brands: String[]
	): Promise<ApiResponse<null>> => {
		try {
			await axios.patch(`supplier/${supplier}/brands`, brands);
			return {
				data: null,
				error: null,
				status: "SUCCESS",
			};
		} catch (e: any) {
			return {
				data: null,
				error: e.response.data.message,
				status: "ERROR",
			};
		}
	};

	return {
		updateSupplierBrands,
	};
};

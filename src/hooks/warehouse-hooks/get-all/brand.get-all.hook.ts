import { toast } from "react-toastify";
import { useAxios } from "../../../utils/axios.hook";
import { Brand } from "../../../model/warehouse.model";
import { ApiResponse } from "../../../store/auth-store/types/response.type";

export const useFetchBrands = () => {
	const { axios } = useAxios();
	const getBrands = async (): Promise<ApiResponse<Brand[] | null>> => {
		try {
			const res = await axios.get(`/brand`);
			return {
				data: res.data,
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
		getBrands,
	};
};

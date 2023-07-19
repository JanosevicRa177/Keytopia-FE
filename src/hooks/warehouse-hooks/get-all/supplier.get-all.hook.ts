import { toast } from "react-toastify";
import { useAxios } from "../../../utils/axios.hook";
import { Supplier } from "../../../model/warehouse.model";
import { ApiResponse } from "../../../store/auth-store/types/response.type";

export const useFetchSupplier = () => {
	const { axios } = useAxios();
	const getSuppliers = async (): Promise<ApiResponse<Supplier[] | null>> => {
		try {
			const res = await axios.get(`/supplier`);
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
		getSuppliers,
	};
};

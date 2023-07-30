import { toast } from "react-toastify";
import { ApiResponse } from "../../../store/auth-store/types/response.type";
import { useAxios } from "../../../utils/axios.hook";
import { Supplier } from "../../../model/warehouse.model";

export const useCreateSupplier = () => {
	const { axios } = useAxios();
	const createSupplier = async (values: Supplier): Promise<ApiResponse<null>> => {
		try {
			await axios.post(`/supplier`, values);
			toast.success("Brand successfuly created!");
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
		createSupplier,
	};
};

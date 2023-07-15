import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { Page } from "../../../utils/types";
import { useAxios } from "../../../utils/axios.hook";
import { Supplier } from "../../../model/warehouse.model";

export const useFetchSuppliersPage = () => {
	const { axios } = useAxios();
	const {
		setError,
		setSuccess,
		state: getSuppliersPageRes,
	} = useResponseState<Page<Supplier>>({
		totalPages: 0,
		content: [],
	});
	const getSuppliersPage = async (pageNumber: number) => {
		try {
			const res = await axios.get(`/supplier/5/${pageNumber}`);
			setSuccess(res.data);
		} catch (e: any) {
			toast.error(e.response.data.message);
			setError(e.response.data.message);
		}
	};

	return {
		getSuppliersPage,
		getSuppliersPageRes,
	};
};

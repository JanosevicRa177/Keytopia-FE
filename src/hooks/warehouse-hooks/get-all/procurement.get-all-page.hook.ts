import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { Page } from "../../../utils/types";
import { useAxios } from "../../../utils/axios.hook";
import { GetProcurementDto } from "../../../model/warehouse.model";

export const useFetchProcurementsPage = () => {
	const { axios } = useAxios();
	const {
		setError,
		setSuccess,
		state: getProcurementsPageRes,
	} = useResponseState<Page<GetProcurementDto>>({
		totalPages: 0,
		content: [],
	});
	const getProcurementsPage = async (pageNumber: number) => {
		try {
			const res = await axios.get(`/procurement/8/${pageNumber}`);
			setSuccess(res.data);
		} catch (e: any) {
			toast.error(e.response.data.message);
			setError(e.response.data.message);
		}
	};

	return {
		getProcurementsPage,
		getProcurementsPageRes,
	};
};

import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { Page } from "../../../utils/types";
import { useAxios } from "../../../utils/axios.hook";
import { Brand } from "../../../model/warehouse.model";

export const useFetchBrandsPage = () => {
	const { axios } = useAxios();
	const {
		setError,
		setSuccess,
		state: getBrandsPageRes,
	} = useResponseState<Page<Brand>>({ totalPages: 0, content: [] });
	const getBrandsPage = async (pageNumber: number) => {
		try {
			const res = await axios.get(`/brand/5/${pageNumber}`);
			setSuccess(res.data);
		} catch (e: any) {
			toast.error(e.response.data.message);
			setError(e.response.data.message);
		}
	};

	return {
		getBrandsPage,
		getBrandsPageRes,
	};
};

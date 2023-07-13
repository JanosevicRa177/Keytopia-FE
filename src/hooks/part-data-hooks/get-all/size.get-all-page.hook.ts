import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { Page } from "../../../utils/types";
import { Size } from "../../../model/part-data.model";
import { useAxios } from "../../../utils/axios.hook";

export const useFetchSizesPage = () => {
	const { axios } = useAxios();
	const {
		setError,
		setSuccess,
		state: getSizesPageRes,
	} = useResponseState<Page<Size>>({ totalPages: 0, content: [] });
	const getSizesPage = async (pageNumber: number) => {
		try {
			const res = await axios.get(`/part-data/size/5/${pageNumber}`);
			setSuccess(res.data);
		} catch (e: any) {
			toast.error(e.response.data.message);
			setError(e.response.data.message);
		}
	};

	return {
		getSizesPage,
		getSizesPageRes,
	};
};

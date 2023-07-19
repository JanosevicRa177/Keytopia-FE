import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { useAxios } from "../../../utils/axios.hook";
import { Part } from "../../../model/part.model";
import { PartType } from "../../../utils/enum";
import { Page } from "../../../utils/types";

export const useFetchPartPage = () => {
	const { axios } = useAxios();
	const {
		setError,
		setSuccess,
		state: getPartPageRes,
	} = useResponseState<Page<Part>>({ totalPages: 0, content: [] });
	const getPartPage = async (pageNumber: number, partType: PartType) => {
		try {
			const res = await axios.get(`/part/${partType}/12/${pageNumber}`);
			setSuccess(res.data);
		} catch (e: any) {
			toast.error(e.response.data.message);
			setError(e.response.data.message);
		}
	};

	return {
		getPartPage,
		getPartPageRes,
	};
};

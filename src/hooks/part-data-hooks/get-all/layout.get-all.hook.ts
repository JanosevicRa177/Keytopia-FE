import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { Page } from "../../../utils/types";
import { Layout } from "../../../model/part-data";
import { useAxios } from "../../../utils/axios.hook";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const useFetchLayouts = () => {
	const { axios } = useAxios();
	const {
		setError,
		setSuccess,
		state: getLayoutsRes,
	} = useResponseState<Page<Layout>>({ totalPages: 0, content: [] });
	const getLayouts = async (pageNumber: number) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/part-data/layout/5/${pageNumber}`
			);
			setSuccess(res.data);
		} catch (e: any) {
			toast.error(e.response.data.message);
			setError(e.response.data.message);
		}
	};

	return {
		getLayoutsRes,
		getLayouts,
	};
};

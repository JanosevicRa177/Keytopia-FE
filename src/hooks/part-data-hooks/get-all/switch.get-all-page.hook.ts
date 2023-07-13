import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { Page } from "../../../utils/types";
import { Switch } from "../../../model/part-data.model";
import { useAxios } from "../../../utils/axios.hook";

export const useFetchSwitchesPage = () => {
	const { axios } = useAxios();
	const {
		setError,
		setSuccess,
		state: getSwitchesPageRes,
	} = useResponseState<Page<Switch>>({ totalPages: 0, content: [] });
	const getSwitchesPage = async (pageNumber: number) => {
		try {
			const res = await axios.get(`/part-data/switch/5/${pageNumber}`);
			setSuccess(res.data);
		} catch (e: any) {
			toast.error(e.response.data.message);
			setError(e.response.data.message);
		}
	};

	return {
		getSwitchesPage,
		getSwitchesPageRes,
	};
};

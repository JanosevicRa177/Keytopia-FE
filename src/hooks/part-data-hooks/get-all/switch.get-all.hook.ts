import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { Page } from "../../../utils/types";
import { Switch } from "../../../model/part-data";
import { useAxios } from "../../../utils/axios.hook";

export const useFetchSwitches = () => {
	const { axios } = useAxios();
	const {
		setError,
		setSuccess,
		state: getSwitchesRes,
	} = useResponseState<Page<Switch>>({ totalPages: 0, content: [] });
	const getSwitches = async (pageNumber: number) => {
		try {
			const res = await axios.get(`/part-data/switch/5/${pageNumber}`);
			setSuccess(res.data);
		} catch (e: any) {
			toast.error(e.response.data.message);
			setError(e.response.data.message);
		}
	};

	return {
		getSwitches,
		getSwitchesRes,
	};
};

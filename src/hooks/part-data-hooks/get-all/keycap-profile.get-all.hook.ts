import { toast } from "react-toastify";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { Page } from "../../../utils/types";
import { KeycapProfile } from "../../../model/part-data";
import { useAxios } from "../../../utils/axios.hook";

export const useFetchKeycapProfiles = () => {
	const { axios } = useAxios();
	const {
		setError,
		setSuccess,
		state: getKeycapProfilesRes,
	} = useResponseState<Page<KeycapProfile>>({ totalPages: 0, content: [] });
	const getKeycapProfiles = async (pageNumber: number) => {
		try {
			const res = await axios.get(
				`/part-data/keycap-profile/5/${pageNumber}`
			);
			setSuccess(res.data);
		} catch (e: any) {
			toast.error(e.response.data.message);
			setError(e.response.data.message);
		}
	};

	return {
		getKeycapProfilesRes,
		getKeycapProfiles,
	};
};

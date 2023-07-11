import { toast } from "react-toastify";
import axios from "axios";
import { useApplicationStore } from "../../../store/store";
import { useResponseState } from "../../util-hooks/response-state.hook";
import { KeycapProfileFormValues } from "../../../components/add-part-component/form/keycap-profile.form";
import { Page } from "../../../utils/types";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const useFetchKeycapProfiles = () => {
  const token = useApplicationStore((state) => state.token);
  const {
    setError,
    setSuccess,
    state: getKeycapProfilesRes,
  } = useResponseState<Page<KeycapProfileFormValues>>({ totalPages: 0, content: [] });
  const getKeycapProfiles = async ( pageNumber: number
  ) => {
    try {
      const res = await axios.get(`${BASE_URL}/part-data/keycap-profile/5/${pageNumber}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
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

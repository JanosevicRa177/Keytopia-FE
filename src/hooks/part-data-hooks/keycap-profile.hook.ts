import { toast } from "react-toastify";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import axios from "axios";
import { KeycapProfileFormValues } from "../../components/add-part-comonent/keycap-profile.form";
import { useApplicationStore } from "../../store/store";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const useCreateKeycapProfile = () => {
  const token = useApplicationStore((state) => state.token);
  const createKeycapProfile = async (
    values: KeycapProfileFormValues
  ): Promise<ApiResponse<null>> => {
    try {
      await axios.post(`${BASE_URL}/part-data/create/keycap-profile`, values, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      toast.success("Keycap profile successfuly created!");
      return {
        data: null,
        error: null,
        status: "SUCCESS",
      };
    } catch (e: any) {
      toast.error(e.response.data.message);
      return {
        data: null,
        error: e.response.data.message,
        status: "ERROR",
      };
    }
  };

  return {
    createKeycapProfile,
  };
};

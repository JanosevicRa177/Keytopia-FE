import { toast } from "react-toastify";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import axios from "axios";
import { useApplicationStore } from "../../store/store";
import { SwitchFormValues } from "../../components/add-part-comonent/switch.form";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const useCreateSwitch = () => {
  const token = useApplicationStore((state) => state.token);
  const createSwitch = async (
    values: SwitchFormValues
  ): Promise<ApiResponse<null>> => {
    try {
      await axios.post(`${BASE_URL}/part-data/create/switch`, values, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      toast.success("Switch successfuly created!");
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
    createSwitch,
  };
};

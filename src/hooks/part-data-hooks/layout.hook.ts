import { toast } from "react-toastify";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import axios from "axios";
import { useApplicationStore } from "../../store/store";
import { LayoutFormValues } from "../../components/add-part-comonent/layout.form";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const useCreateLayout = () => {
  const token = useApplicationStore((state) => state.token);
  const createLayout = async (
    values: LayoutFormValues
  ): Promise<ApiResponse<null>> => {
    try {
      await axios.post(`${BASE_URL}/part-data/create/layout`, values, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      toast.success("Layout successfuly created!");
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
    createLayout,
  };
};

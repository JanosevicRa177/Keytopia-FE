import axios from 'axios';
import { toast } from 'react-toastify';
import { ApiResponse } from '../../store/auth-store/types/response.type';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const useUserActivation = () => {

  const userActivation = async (token: string): Promise<ApiResponse<null>> => {
    try {
      await axios.patch(`${BASE_URL}/user/activate/${token}`, {});
      toast.success('Your account is activated!');
      return {
        data: null,
        error: null,
        status: 'SUCCESS',
      };
    } catch (e: any) {
        console.log(e)
      toast.error(e.response.data.message);
      return {
        data: null,
        error: null,
        status: 'ERROR',
      };
    }
  };

  return {
    userActivation,
  };
};

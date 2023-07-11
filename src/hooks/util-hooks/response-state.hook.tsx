import { useState } from "react";
import { toast } from "react-toastify";
import { ApiResponse } from "../../store/auth-store/types/response.type";

export function useResponseState<T>(defaultVal: T) {
  const [state, setState] = useState<ApiResponse<T>>({
    error: null,
    status: "IDLE",
    data: defaultVal,
  });

  const setSuccess = (data?: T) => {
    setState({
      ...state,
      status: "SUCCESS",
      data: data ?? state.data,
    });
  };

  const setError = (error?: string | null) => {
    console.error(error);
    setState({
      ...state,
      status: "ERROR",
      error: error ?? state.error,
    });
  };

  const setSuccessWithToast = (message: string, data?: T) => {
    setSuccess(data);
    toast.success(message);
  };
  const setErrorWithToast = (message: string, error?: string | null) => {
    setError(error);
    toast.error(message);
  };

  return {
    state,
    setState,
    setError,
    setSuccess,
    setErrorWithToast,
    setSuccessWithToast,
  };
}

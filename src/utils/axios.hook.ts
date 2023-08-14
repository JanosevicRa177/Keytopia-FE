import axios from "axios";
import { useApplicationStore } from "../store/store";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
export const useAxios = () => {
    const getToken = useApplicationStore((state) => state.getToken);
    const logout = useApplicationStore((state) => state.logout);

    axiosInstance.interceptors.request.use((request) => {
        const token = getToken();
        if (token != null)
            request.headers.setAuthorization(`Bearer ${token}`);
        return request;
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error?.response?.status === 401) {
                logout();
                return Promise.reject(error);
            }
            return Promise.reject(error);
        }
    );

    return { axios: axiosInstance };
};

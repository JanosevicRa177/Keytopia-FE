import { AuthOpenFormState } from "./types/state.type";
import { produce } from "immer";
import { StateCreator } from "zustand";
import { Login } from "./types/login.type";
import { toast } from "react-toastify";
import axios from "axios";
import { Store } from "../store";
import { User } from "../../model/auth.model";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export type AuthStoreState = {
	user: User | null;
	token: string | null;
	formState: AuthOpenFormState;
};

export type AuthActions = {
	login: (data: Login) => Promise<void>;
	logout: () => void;
	fetchLoggedUser: (token: string) => Promise<void>;
	showLogin: () => Promise<void>;
	showRegister: () => Promise<void>;
	setLoginData: (token: string) => void;
};

export const state: AuthStoreState = {
	user: null,
	token: null,
	formState: { state: "LOGIN" },
};

export type AuthStore = AuthStoreState & AuthActions;

export const authStoreSlice: StateCreator<Store, [], [], AuthStore> = (set, get) => ({
	...state,
	login: async (loginData: Login) => {
		try {
			const resp = await axios.post(`${BASE_URL}/auth/login`, loginData, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			await get().fetchLoggedUser(resp.data);
			set(
				produce((state: AuthStoreState) => {
					state.token = resp.data;
					return state;
				})
			);
			toast.success("Successfully logged in!");
		} catch (e: any) {
			set(
				produce((state: AuthStoreState) => {
					state.token = null;
					return state;
				})
			);
			toast.error(e.response.data.message);
		}
	},
	showLogin: async () => {
		set(
			produce((state: AuthStore) => {
				state.formState.state = "LOGIN";
				return state;
			})
		);
	},
	showRegister: async () => {
		set(
			produce((state: AuthStore) => {
				state.formState.state = "REGISTER";
				state.user = null;
				return state;
			})
		);
	},
	logout: () => {
		set(
			produce((state: AuthStore) => {
				state.token = null;
				state.user = null;
				return state;
			})
		);
	},
	fetchLoggedUser: async (token: string) => {
		try {
			const resp = await axios.get(`${BASE_URL}/auth/current`, {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			set(
				produce((state) => {
					state.user = resp.data;
					return state;
				})
			);
		} catch (e: any) {
			set(
				produce((state) => {
					state.user = null;
					return state;
				})
			);
		}
	},
	setLoginData: (token: string) => {
		set(
			produce((state) => {
				state.loginStateRes.data = token;
				return state;
			})
		);
	},
});
